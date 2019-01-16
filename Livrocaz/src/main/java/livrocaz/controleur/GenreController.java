package livrocaz.controleur;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import livrocaz.model.Genre;
import livrocaz.repository.GenreRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GenreController {

    @Autowired
    private GenreRepository genreRepo;

    @RequestMapping(method = RequestMethod.GET, value = "/genres")
    public ResponseEntity<Collection<Genre>> getAllGenres(){
        return new ResponseEntity<Collection<Genre>>(genreRepo.findAll(), HttpStatus.OK);
    }
}

