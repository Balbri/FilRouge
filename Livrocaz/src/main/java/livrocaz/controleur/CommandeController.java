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
import livrocaz.model.Commande;
import livrocaz.repository.ClientRepository;
import livrocaz.repository.CommandeRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CommandeController {

	@Autowired
	private CommandeRepository commandeRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/commandes", produces = "application/json")
	public ResponseEntity<Collection<Commande>> getAllCommandes(){
		return new ResponseEntity<Collection<Commande>>(commandeRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/commandes/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getCommande(@PathVariable Integer id){
		Optional<Commande> commande = null;
				
		try {
			commande =(commandeRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(commande == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(commande);
	}
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/commandes", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addCommande(@RequestBody Commande commande){
		Commande resultCommande = null;				
		try {
			resultCommande = commandeRepo.saveAndFlush(commande);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultCommande);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/commandes/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyCommande(@RequestBody Commande commande) {
	        Commande commandeamodifier = null;
	        try {
	           commandeamodifier = commandeRepo.saveAndFlush(commande);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(commandeamodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/commandes/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteCommande(@PathVariable Integer id){
			try {
			commandeRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
}
