package livrocaz;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.sql.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import livrocaz.model.Auteur;
import livrocaz.model.Client;
import livrocaz.model.Livre;
import livrocaz.repository.AuteurRepository;
import livrocaz.repository.ClientRepository;
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
    
    //.....etc......//

    public static void main(String[] args)  {
        SpringApplication.run(App.class, args);
    }

    public void run(String... args) throws Exception {
    	
        livreRepo.deleteAll();;
        clientRepo.deleteAll();
        auteurRepo.deleteAll();
        
        //.....etc........//
       Livre fondation = new Livre();
       Livre robots = new Livre();
       Auteur azimov = new Auteur();
       Collection<Auteur>hashAuteurs = new HashSet<Auteur>();
       Collection<Livre>hashLivres = new ArrayList<Livre>();
       livreRepo.save(robots);
       livreRepo.save(fondation);
       auteurRepo.save(azimov);
       
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
      
      auteurRepo.save(azimov);
      livreRepo.save(fondation);
      livreRepo.save(robots);
       
       Client c1 = new Client("toto", "tata", 1, "Rue Hoche", "Bat A", 75000, "Paris", "1234", "toto@toto", "tototata");
       clientRepo.save(c1);
       
;
    }
}

