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

import livrocaz.model.Livre;
import livrocaz.repository.LivreRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LivreController {

	@Autowired
	private LivreRepository livreRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/livres", produces = "application/json")
	public ResponseEntity<Collection<Livre>> getAllLivres(){
		return new ResponseEntity<Collection<Livre>>(livreRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/livres/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getLivre(@PathVariable Integer id){
		Optional<Livre> livre = null;
				
		try {
			livre =(livreRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(livre == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(livre);
	}
	
/*
 * Methode Get par Nom de livre
 */
	
	@RequestMapping(value= "/livres/nom/{nom}", method = RequestMethod.GET)
	public ResponseEntity<?>getLivreByName(@PathVariable String nom){
		Optional<Livre> livre = null;
		try {
			livre=(livreRepo.findLivreByName(nom));
		
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(livre == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(livre);
	}
		
	
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/livres", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addLivre(@RequestBody Livre livre){
		Livre resultLivre = null;				
		try {
			resultLivre = livreRepo.saveAndFlush(livre);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultLivre);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/livres/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyBook(@RequestBody Livre livre) {
	        Livre livreamodifier = null;
	        try {
	           livreamodifier = livreRepo.saveAndFlush(livre);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(livreamodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/livres/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteLivre(@PathVariable Integer id){
		 	Livre livreToDelete = null;
			try {
				livreToDelete = livreRepo.findById(id).get();
				livreRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(livreToDelete);
		}
}
