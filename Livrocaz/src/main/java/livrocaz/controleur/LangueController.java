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

import livrocaz.model.Langue;
import livrocaz.repository.LangueRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LangueController {

	@Autowired
	private LangueRepository langueRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/langues", produces = "application/json")
	public ResponseEntity<Collection<Langue>> getAllLangues(){
		return new ResponseEntity<Collection<Langue>>(langueRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/langues/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getLangue(@PathVariable Integer id){
		Optional<Langue> langue = null;
				
		try {
			langue =(langueRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(langue == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(langue);
	}
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/langues", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addLangue(@RequestBody Langue langue){
		Langue resultLangue = null;				
		try {
			resultLangue = langueRepo.saveAndFlush(langue);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultLangue);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/langues/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyLangue(@RequestBody Langue langue) {
	        Langue langueamodifier = null;
	        try {
	           langueamodifier = langueRepo.saveAndFlush(langue);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(langueamodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/langues/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteLangue(@PathVariable Integer id){
			try {
			langueRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
}
