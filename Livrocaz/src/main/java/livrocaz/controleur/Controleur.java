package livrocaz.controleur;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import livrocaz.model.Livre;
import livrocaz.repository.ClientRepository;
import livrocaz.repository.LivreRepository;

@RestController
@RequestMapping("/livrocaz")
public class Controleur {
	
    //.....Autowired des Repository....//
	
    @Autowired
    private LivreRepository livreRepo;
    
    @Autowired
    private ClientRepository clientRepo;
    
    //.....etc......//

    
    //...................Mappings................///
    
    /**
	 * Retourne tous les livres
	 */
	@GetMapping("/livres")
	public ResponseEntity<?> getAllJedis(){
		List<Livre> listeLivres = null;
		try {
			listeLivres = livreRepo.findAll(); // Pour faire un "SELECT * FROM livre;"
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeLivres);
	}
	
	
	//...........etc...........//
	
	
}
