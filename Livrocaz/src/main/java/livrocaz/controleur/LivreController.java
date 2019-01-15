package livrocaz.controleur;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javafx.scene.media.Media;
import livrocaz.model.Livre;
import livrocaz.repository.LivreRepository;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LivreController {

	@Autowired
	private LivreRepository livreRepo;

	@RequestMapping(method = {RequestMethod.GET}, value = "/livres", produces = "application/json")
	public ResponseEntity<Collection<Livre>> getAllLivres(){
		return new ResponseEntity<Collection<Livre>>(livreRepo.findAll(), HttpStatus.OK);
	}



	 @RequestMapping(value = "/livres", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addLivre(@RequestBody Livre livre){
		Livre resultLivre = null;				
		try {
			resultLivre = livreRepo.saveAndFlush(livre);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultLivre);
	}
	



}
