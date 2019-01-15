package livrocaz.controleur;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import livrocaz.model.Livre;
import livrocaz.repository.LivreRepository;


@Controller
public class LivreController {
	@RestController
	@RequestMapping("/api")
	@CrossOrigin(origins = "*")
	public class TitulaireController {

	    @Autowired
	    private LivreRepository livreRepo;

	    @RequestMapping(method = RequestMethod.GET, value = "/livres")
	    public ResponseEntity<Collection<Livre>> getAllLivres(){
	        return new ResponseEntity<Collection<Livre>>(livreRepo.findAll(), HttpStatus.OK);
	    }
	}
}
