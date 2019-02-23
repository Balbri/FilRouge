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

import livrocaz.model.Authorities;
import livrocaz.repository.AuthoritiesRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

	@Autowired
	private AuthoritiesRepository authRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/admin/auths", produces = "application/json")
	public ResponseEntity<Collection<Authorities>> getAllUsers(){
		return new ResponseEntity<Collection<Authorities>>(authRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/admin/auths/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getAuths(@PathVariable Integer id){
		Optional<Authorities> auths = null;
				
		try {
			auths =(authRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(auths == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(auths);
	}
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/admin/auths", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addAuth(@RequestBody Authorities auths){
		 Authorities authResult = null;				
		try {
			authResult = authRepo.saveAndFlush(auths);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(authResult);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/admin/auths/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyAuths(@RequestBody Authorities auth) {
	        Authorities authamodifier = null;
	        try {
	           authamodifier = authRepo.saveAndFlush(auth);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(	authamodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/admin/auths/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteAuth(@PathVariable Integer id){
			try {
			authRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
}
