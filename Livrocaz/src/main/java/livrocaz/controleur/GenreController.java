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

import livrocaz.model.Genre;
import livrocaz.repository.GenreRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GenreController {

	@Autowired
	private GenreRepository genreRepo;
/*
 * Methode Get All
 */
	@RequestMapping(method = {RequestMethod.GET}, value = "/genres", produces = "application/json")
	public ResponseEntity<Collection<Genre>> getAllGenres(){
		return new ResponseEntity<Collection<Genre>>(genreRepo.findAll(), HttpStatus.OK);
	}

/*
 * Methode get par ID
 */
	@RequestMapping(value = "/genres/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getGenre(@PathVariable Integer id){
		Optional<Genre> genre = null;
				
		try {
			genre =(genreRepo.findById(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if(genre == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		return ResponseEntity.status(HttpStatus.OK).body(genre);
	}
	
/*
 * Methode POST
 */
	 @RequestMapping(value = "/genres", method = RequestMethod.POST, produces= "application/json", consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<?> addgenre(@RequestBody Genre genre){
		Genre resultGenre = null;				
		try {
			resultGenre = genreRepo.saveAndFlush(genre);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(resultGenre);
	}
	
/*
 * Methode PUT
 */

	 @PutMapping(value = "/genres/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	    @ResponseBody
	    public ResponseEntity<?> modifyGenre(@RequestBody Genre genre) {
	        Genre genreamodifier = null;
	        try {
	        	genreamodifier = genreRepo.saveAndFlush(genre);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	        return ResponseEntity.status(HttpStatus.CREATED).body(genreamodifier);
	    }
	 
	 /*
	  * Methode DELETE
	  */
	 @RequestMapping(value = "/genres/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<?> deleteGenre(@PathVariable Integer id){
		 	Genre genreToDelete = null;
			try {
				genreToDelete = genreRepo.findById(id).get();
				genreRepo.deleteById(id);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(genreToDelete);
		}
}
