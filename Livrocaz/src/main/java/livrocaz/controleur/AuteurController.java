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

import livrocaz.model.Auteur;
import livrocaz.repository.AuteurRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuteurController {

	    @Autowired
	    private AuteurRepository auteurRepo;

	    @RequestMapping(method = RequestMethod.GET, value = "/auteurs")
	    public ResponseEntity<Collection<Auteur>> getAllAuteurs(){
	        return new ResponseEntity<Collection<Auteur>>(auteurRepo.findAll(), HttpStatus.OK);
	    }
	    
	    /*
	     * Methode get par ID
	     */
    	@RequestMapping(value = "/auteurs/{id}", method = RequestMethod.GET)
    	public ResponseEntity<?> getAuteur(@PathVariable Integer id){
    		Optional<Auteur> auteur = null;
    				
    		try {
    			auteur =(auteurRepo.findById(id));
    			
    		} catch (Exception e) {
    			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    		}
    		
    		if(auteur == null)
    			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    		
    		return ResponseEntity.status(HttpStatus.OK).body(auteur);
    	}
    	
	    /*
	     * Methode POST
	     */
    	@RequestMapping(value = "/auteurs", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
    	public ResponseEntity<?> addAuteur(@RequestBody Auteur auteur){
    		Auteur resultAuteur = null;				
    		try {
    			resultAuteur = auteurRepo.saveAndFlush(auteur);
    		} catch (Exception e) {
    			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    		}

    		return ResponseEntity.status(HttpStatus.CREATED).body(resultAuteur);
    	}
    	
	    /*
	     * Methode PUT
	     */
    	@PutMapping(value = "/auteurs/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyBook(@RequestBody Auteur auteur) {
	        Auteur auteuramodifier = null;
	        try {
	           auteuramodifier = auteurRepo.saveAndFlush(auteur);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(auteuramodifier);
	    }
    	 
}

