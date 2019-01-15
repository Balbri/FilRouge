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

import livrocaz.model.Auteur;
import livrocaz.repository.AuteurRepository;

@Controller
public class AuteurController {
	
		@RestController
		@RequestMapping("/api")
		@CrossOrigin(origins = "*")
		public class TitulaireController {

		    @Autowired
		    private AuteurRepository auteurRepo;

		    @RequestMapping(method = RequestMethod.GET, value = "/auteurs")
		    public ResponseEntity<Collection<Auteur>> getAllAuteurs(){
		        return new ResponseEntity<Collection<Auteur>>(auteurRepo.findAll(), HttpStatus.OK);
		    }
		}
	}

