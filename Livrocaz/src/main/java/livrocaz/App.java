package livrocaz;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import livrocaz.model.Auteur;
import livrocaz.model.Client;
import livrocaz.model.Genre;
import livrocaz.model.Langue;
import livrocaz.model.Livre;
import livrocaz.repository.AuteurRepository;
import livrocaz.repository.ClientRepository;
import livrocaz.repository.GenreRepository;
import livrocaz.repository.LangueRepository;
import livrocaz.repository.LivreRepository;


@SpringBootApplication
public class App implements CommandLineRunner {
	
	//.....Autowired des Repository....//
	
    @Autowired
    private LivreRepository livreRepo;
    
    @Autowired
    private ClientRepository clientRepo;
    
    @Autowired
    private AuteurRepository auteurRepo;
    
    @Autowired
    private GenreRepository genreRepo;
    
    @Autowired
    private LangueRepository langueRepo;
    
    //.....etc......//

    public static void main(String[] args)  {
        SpringApplication.run(App.class, args);
    }

    public void run(String... args) throws Exception {
    	
        livreRepo.deleteAll();;
        clientRepo.deleteAll();
        auteurRepo.deleteAll();
        genreRepo.deleteAll();
        langueRepo.deleteAll();
        
        //.....etc........//
        
        
       Livre fondation = new Livre();
       Livre robots = new Livre();
       Auteur azimov = new Auteur();
       Collection<Auteur>hashAuteurs = new HashSet<Auteur>();
       Collection<Livre>hashLivres = new ArrayList<Livre>();

       
       fondation.setAnneeParution("1986");
       fondation.setDescriptionLivre("desc fondation");
       fondation.setImageCouverture("fondation couv");
       fondation.setIsbn("1111");
       fondation.setPrixNeuf(10);
       fondation.setPrixOccas(5);
       fondation.setStock(20);
       fondation.setSujetLivre("Sujet de Fondation");
       fondation.setTitreLivre("Fondation");
       fondation =livreRepo.save(fondation);
      
       robots.setAnneeParution("1975");
       robots.setDescriptionLivre("desc robots");
       robots.setImageCouverture("robots couv");
       robots.setIsbn("1112");
       robots.setPrixNeuf(6);
       robots.setPrixOccas(3);
       robots.setStock(10);
       robots.setSujetLivre("Sujet de robots");
       robots.setTitreLivre("robots");
       robots=livreRepo.save(robots);
       

       azimov.setNameAuteur("Azimov");
       azimov.setSurnameAuteur("Isaac");
       azimov= auteurRepo.save(azimov);
       
       hashAuteurs.add(azimov);
       fondation.setAuteurs(hashAuteurs);
       robots.setAuteurs(hashAuteurs);
       hashLivres.add(robots);
       hashLivres.add(fondation);
       azimov.setLivres(hashLivres);
      
      
      Genre roman = new Genre();
      Genre sf = new Genre();
      Collection<Genre> genres = new HashSet<Genre>();
      roman.setNomGenre("Roman");
      sf.setNomGenre("Science-fiction");
      roman = genreRepo.save(roman);
      sf = genreRepo.save(sf);
      genres.add(roman);
      genres.add(sf);
      fondation.setGenres(genres);
      robots.setGenres(genres);
      roman.setLivres(hashLivres);
      sf.setLivres(hashLivres);
      
      Langue fr = new Langue();
      fr.setNomLangue("Francais");
      fr = langueRepo.save(fr);
      fondation.setLangue(fr);
      robots.setLangue(fr);
      
      langueRepo.save(fr);
      genreRepo.save(roman);
      genreRepo.save(sf);
      livreRepo.save(fondation);
      livreRepo.save(robots);
      auteurRepo.save(azimov);
      
      
       
       Client c1 = new Client("toto", "tata", 1, "Rue Hoche", "Bat A", 75000, "Paris", "1234", "toto@toto", "tototata");
       clientRepo.save(c1);
       
    }
}

