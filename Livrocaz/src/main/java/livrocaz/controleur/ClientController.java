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

import livrocaz.model.Client;
import livrocaz.repository.ClientRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ClientController {

	@Autowired
	private ClientRepository clientRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/admin/clients", produces = "application/json")
	public ResponseEntity<Collection<Client>> getAllClients(){
		return new ResponseEntity<Collection<Client>>(clientRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/admin/clients/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getClient(@PathVariable Integer id){
		Optional<Client> client = null;
				
		try {
			client =(clientRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(client == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(client);
	}
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/admin/clients", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addClient(@RequestBody Client client){
		Client resultClient = null;				
		try {
			resultClient = clientRepo.saveAndFlush(client);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultClient);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/admin/clients/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyClient(@RequestBody Client client) {
	        Client clientamodifier = null;
	        try {
	           clientamodifier = clientRepo.saveAndFlush(client);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(clientamodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/admin/clients/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteClient(@PathVariable Integer id){
			try {
			clientRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
}
