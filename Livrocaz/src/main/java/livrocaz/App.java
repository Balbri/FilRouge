package livrocaz;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import livrocaz.model.Auteur;
import livrocaz.model.Authorities;
import livrocaz.model.Client;
import livrocaz.model.Commande;
import livrocaz.model.Editeur;
import livrocaz.model.Livre;
import livrocaz.model.Users;
import livrocaz.model.Genre;
import livrocaz.model.Langue;
import livrocaz.model.LigneDeCommande;
import livrocaz.repository.AuteurRepository;
import livrocaz.repository.AuthoritiesRepository;
import livrocaz.repository.ClientRepository;
import livrocaz.repository.CommandeRepository;
import livrocaz.repository.EditeurRepository;
import livrocaz.repository.GenreRepository;
import livrocaz.repository.LangueRepository;
import livrocaz.repository.LigneDeCommandeRepository;
import livrocaz.repository.LivreRepository;
import livrocaz.repository.UserRepository;

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
    
    @Autowired
    private EditeurRepository editeurRepo;
    
    @Autowired
    private LigneDeCommandeRepository ligneCommandeRepo;
    
    @Autowired
    private CommandeRepository commandeRepo;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private AuthoritiesRepository AuthRepo;

    //.....etc......//

    public static void main(String[] args)  {
        SpringApplication.run(App.class, args);
    }

    public void run(String... args) throws Exception {

    	
    	ligneCommandeRepo.deleteAll();
    	commandeRepo.deleteAll();
        livreRepo.deleteAll();;
        clientRepo.deleteAll();
        auteurRepo.deleteAll();
        genreRepo.deleteAll();
        langueRepo.deleteAll();
        editeurRepo.deleteAll();
        AuthRepo.deleteAll(); 
        userRepo.deleteAll(); 
         
        
             

        //.....etc........//


       Livre fondation = new Livre();
       Livre robots = new Livre();
       Auteur azimov = new Auteur();
       Auteur nico = new Auteur();
       Collection<Auteur>hashAuteurs = new HashSet<Auteur>();
       Collection<Auteur>hashAuteurs2 = new HashSet<Auteur>();
       Collection<Livre>hashLivres = new ArrayList<Livre>();
       Collection<Livre>bioLivres = new ArrayList<Livre>();
       fondation.setAnneeParution("1986");
       fondation.setDescriptionLivre("Quare talis improborum consensio non modo excusatione amicitiae tegenda non est sed potius supplicio omni vindicanda est, ut ne quis concess.");
       fondation.setImageCouverture("fondation couv");
       fondation.setIsbn("1111");
       fondation.setPrixNeuf(10);
       fondation.setPrixOccas(5);
       fondation.setStock(20);
       fondation.setSujetLivre("En ce début de treizième millénaire, l’Empire n’a jamais été aussi puissant, aussi étendu à travers toute la galaxie. C’est dans sa capitale, Trantor, que l’éminent savant Hari Seldon invente la psychohistoire, une science nouvelle permettant de prédire l’avenir. Grâce à elle, Seldon prévoit l’effondrement de l’Empire d’ici cinq siècles, suivi d’une ère de ténèbres de trente mille ans. Réduire cette période à mille ans est peut-être possible, à condition de mener à terme son projet : la Fondation, chargée de rassembler toutes les connaissances humaines. Une entreprise visionnaire qui rencontre de nombreux et puissants détracteurs…");
       fondation.setTitreLivre("Fondation");
       fondation.setImageCouverture("https://images-na.ssl-images-amazon.com/images/I/81o5-cz-KOL.jpg");
       fondation =livreRepo.save(fondation);

       Livre napoleon = new Livre();
       napoleon.setAnneeParution("2009");
       napoleon.setDescriptionLivre("Une biographie de Napoleon");
       napoleon.setImageCouverture("https://images-eu.ssl-images-amazon.com/images/I/51tjLAtoXyL.jpg");
       napoleon.setIsbn("999-2222");
       napoleon.setTitreLivre("Napoleon Bonaparte");
       napoleon.setStock(77);
       napoleon.setPrixNeuf(99);
       napoleon.setPrixOccas(23);
       napoleon =livreRepo.save(napoleon);
       
       
       robots.setAnneeParution("1975");
       robots.setDescriptionLivre("desc robots");
       robots.setImageCouverture("robots couv");
       robots.setIsbn("1112");
       robots.setPrixNeuf(6);
       robots.setPrixOccas(3);
       robots.setStock(10);
       robots.setSujetLivre("Sujet de robots");
       robots.setTitreLivre("Robots");
       robots.setImageCouverture("https://media.senscritique.com/media/000000171713/source_big/Les_Robots_Le_Cycle_des_robots_tome_1.jpg");
       robots=livreRepo.save(robots);


       azimov.setNameAuteur("Azimov");
       azimov.setSurnameAuteur("Isaac");
       azimov= auteurRepo.save(azimov);
       nico.setNameAuteur("Nico");
       nico.setSurnameAuteur("Filine");
       nico = auteurRepo.save(nico);

       hashAuteurs.add(azimov);
       hashAuteurs2.add(nico);
       fondation.setAuteurs(hashAuteurs);
       robots.setAuteurs(hashAuteurs);
       napoleon.setAuteurs(hashAuteurs2);
       hashLivres.add(robots);
       hashLivres.add(fondation);
       azimov.setLivres(hashLivres);
       
       bioLivres.add(napoleon);
       nico.setLivres(bioLivres);


      Genre roman = new Genre();
      Genre sf = new Genre();
      Genre bio = new Genre();
      Collection<Genre> genres = new HashSet<Genre>();
      Collection<Genre> genres2 = new HashSet<Genre>();
      roman.setNomGenre("Roman");
      sf.setNomGenre("Science-fiction");
      bio.setNomGenre("Biographie");
      roman = genreRepo.save(roman);
      sf = genreRepo.save(sf);
      bio = genreRepo.save(bio);
      genres.add(roman);
      genres.add(sf);
      genres2.add(bio);
      fondation.setGenres(genres);
      robots.setGenres(genres);
      napoleon.setGenres(genres2);
      roman.setLivres(hashLivres);
      sf.setLivres(hashLivres);
      bio.setLivres(bioLivres);

      Langue fr = new Langue();
      fr.setNomLangue("Francais");
      fr = langueRepo.save(fr);
      fondation.setLangue(fr);
      robots.setLangue(fr);
      napoleon.setLangue(fr);
      
      Editeur gp = new Editeur();
      gp.setNomEditeur("Gnome Press");
      gp = editeurRepo.save(gp);
      fondation.setEditeur(gp);
      robots.setEditeur(gp);
      napoleon.setEditeur(gp);
      
      LigneDeCommande lc = new LigneDeCommande();
      lc.setQuantite(1);
      lc.setLivre(robots);
      lc = ligneCommandeRepo.save(lc);
      
      LigneDeCommande lc2 = new LigneDeCommande();
      lc2.setQuantite(2);
      lc2.setLivre(fondation);
      lc2 = ligneCommandeRepo.save(lc2);

      langueRepo.save(fr);
      genreRepo.save(roman);
      genreRepo.save(sf);
      genreRepo.save(bio);
      livreRepo.save(fondation);
      livreRepo.save(robots);
      livreRepo.save(napoleon);
      auteurRepo.save(azimov);
      auteurRepo.save(nico);
      Users us1 = new Users();
      us1.setUsername("toto33");
      us1.setPassword("{bcrypt}$2a$04$3oa5XGzGArd2DnRv3.ax7OxGxnvCisSuWWGxYM2xNE99UFLCgQXYS");
      us1.setEnabled(1);
      us1.setAuthority("INSCRIT");
      
      
      Users us2 = new Users();
      us2.setUsername("Riri77");
      us2.setPassword("{bcrypt}$2a$04$CZsnHi2Jg/Z0dmBWEE3BKehk9MkLQsQAMtVgsepayT1WdIEx5GTIq");
      us2.setEnabled(1);
      us2.setAuthority("GESTIONNAIRE");
      userRepo.save(us2);
      
      Users us3 = new Users();
      us3.setUsername("Loulou88");
      us3.setPassword("{noop}simplon");
      us3.setEnabled(1);
      us3.setAuthority("ADMIN");
      userRepo.save(us3);
      
      
      Authorities rol = new Authorities();
      rol.setAuthority("INSCRIT");
      rol.setUsername(us1.getUsername());
      AuthRepo.save(rol);
      
      
      Authorities rol2 = new Authorities();
      rol2.setAuthority("GESTIONNAIRE");
      rol2.setUsername(us2.getUsername());
      AuthRepo.save(rol2);
      
      
      Authorities rol3 = new Authorities();
      rol3.setAuthority("ADMIN");
      rol3.setUsername(us3.getUsername());
      AuthRepo.save(rol3);
      
      
      
      Client c1 = new Client("toto", "tata", 1, "Rue Hoche", "Bat A", 75000, "Paris", "toto@toto", us1);
      clientRepo.save(c1);
      userRepo.save(us1);
      
      Commande cmd = new Commande();
      cmd.setClient(c1);
      cmd.setDate(new Date());
      cmd.setFraisDePort(20.2);
      cmd.setTva(0.0);
      cmd.setValide(0);
      cmd.setTtc(0.0);
      cmd.setTotal(0.0);
      cmd.setNbreArticles(3);
      commandeRepo.save(cmd);
      lc.setCommande(cmd);
      ligneCommandeRepo.save(lc);
      lc2.setCommande(cmd);
      ligneCommandeRepo.save(lc2);
      
      
      
    }
}