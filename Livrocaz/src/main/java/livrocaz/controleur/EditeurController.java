package livrocaz.controleur;


import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import livrocaz.model.Editeur;
import livrocaz.repository.EditeurRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EditeurController {

	@Autowired
	private EditeurRepository editeurRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/editeurs", produces = "application/json")
	public ResponseEntity<Collection<Editeur>> getAllEditeurs(){
		return new ResponseEntity<Collection<Editeur>>(editeurRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/editeurs/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getLivre(@PathVariable Integer id){
		Optional<Editeur> editeur = null;
				
		try {
			editeur =(editeurRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(editeur == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(editeur);
	}
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/editeurs", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addLivre(@RequestBody Editeur editeur){
		Editeur resultEditeur = null;				
		try {
			resultEditeur = editeurRepo.saveAndFlush(editeur);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultEditeur);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/editeurs/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyEditeur(@RequestBody Editeur editeur) {
	        Editeur editeuramodifier = null;
	        try {
	           editeuramodifier = editeurRepo.saveAndFlush(editeur);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(editeuramodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/editeurs/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteEditeur(@PathVariable Integer id){
		 Editeur editeurToDelete = null;
			try {
				editeurToDelete = editeurRepo.findById(id).get();
				editeurRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(editeurToDelete);
		}
}
