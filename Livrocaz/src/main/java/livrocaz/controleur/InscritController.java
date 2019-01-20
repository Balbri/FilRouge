package livrocaz.controleur;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import livrocaz.model.Client;
import livrocaz.model.Commande;
import livrocaz.model.LigneDeCommande;
import livrocaz.model.Livre;
import livrocaz.repository.ClientRepository;
import livrocaz.repository.LivreRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class InscritController {

	    
	@Autowired
	private CommandeController commandeController;
	
	@Autowired
	private LdCController ldcController;
	
	@Autowired
	private ClientRepository clientRepo;
	
	@Autowired
	private LivreRepository livreRepo;
	
	    /*
	     * Methode AjouterPanier
	     */
	    @PostMapping("/panier/{username}/{idLivre}/{quantite}")
	    public void ajouterPanier(@PathVariable String username, @PathVariable int idLivre, @PathVariable int quantite){
	    	
	    	Client client = clientRepo.findClientByUsername(username);
	    	
	    	LocalDate today = LocalDateTime.now().toLocalDate();
	    	int jour = today.getDayOfMonth();
	    	int mois = today.getMonthValue();
	    	int annee = today.getYear();
	    	String date = "" + (jour<10?("0"+jour):(jour)) + "/" + (mois<10?("0"+mois):(mois)) + "/" + annee;
	    	
	        Commande cmd = new Commande(client, date, 15.0, 5.5, 0.0, 0);
	        commandeController.addCommande(cmd);
	        
	        Livre livre = livreRepo.findLivreById(idLivre);
	        LigneDeCommande lc = new LigneDeCommande(quantite, livre, cmd);
	        ldcController.addLdc(lc);
	    }
	    
	    
	    
}

