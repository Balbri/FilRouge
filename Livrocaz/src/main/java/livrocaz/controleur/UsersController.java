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

import livrocaz.model.Users;
import livrocaz.repository.UserRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UsersController {

	@Autowired
	private UserRepository userRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/admin/users", produces = "application/json")
	public ResponseEntity<Collection<Users>> getAllUsers(){
		return new ResponseEntity<Collection<Users>>(userRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/admin/users/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@PathVariable Integer id){
		Optional<Users> user = null;
				
		try {
			user =(userRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(user == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/admin/users", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addUser(@RequestBody Users user){
		 Users resultUser = null;				
		try {
			resultUser = userRepo.saveAndFlush(user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultUser);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/admin/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyUser(@RequestBody Users user) {
	        Users useramodifier = null;
	        try {
	           useramodifier = userRepo.saveAndFlush(user);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(useramodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/admin/users/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteUser(@PathVariable Integer id){
			try {
			userRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
}
