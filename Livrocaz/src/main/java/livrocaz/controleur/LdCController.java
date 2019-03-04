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

import livrocaz.model.LigneDeCommande;
import livrocaz.repository.LigneDeCommandeRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LdCController {

	@Autowired
	private LigneDeCommandeRepository ldcRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/ldc", produces = "application/json")
	public ResponseEntity<Collection<LigneDeCommande>> getAllLdc(){
		return new ResponseEntity<Collection<LigneDeCommande>>(ldcRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/ldc/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getLdc(@PathVariable Integer id){
		Optional<LigneDeCommande> ldc = null;
				
		try {
			ldc =(ldcRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(ldc == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(ldc);
	}
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/ldc", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addLdc(@RequestBody LigneDeCommande ldc){
		LigneDeCommande resultLdc = null;				
		try {
			resultLdc = ldcRepo.saveAndFlush(ldc);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultLdc);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/ldc/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyLdc(@RequestBody LigneDeCommande ldc) {
	        LigneDeCommande ldcamodifier = null;
	        try {
	           ldcamodifier = ldcRepo.saveAndFlush(ldc);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(ldcamodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/ldc/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteLdc(@PathVariable Integer id){
		 	LigneDeCommande ldcToDelete = null;
			try {
				ldcToDelete = ldcRepo.findById(id).get();
				ldcRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(ldcToDelete);
		}
}
