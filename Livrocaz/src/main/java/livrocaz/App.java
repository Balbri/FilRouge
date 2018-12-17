package livrocaz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import livrocaz.model.Client;
import livrocaz.repository.ClientRepository;
import livrocaz.repository.LivreRepository;


@SpringBootApplication
public class App implements CommandLineRunner {
	
	//.....Autowired des Repository....//
	
    @Autowired
    private LivreRepository livreRepo;
    
    @Autowired
    private ClientRepository clientRepo;
    
    //.....etc......//

    public static void main(String[] args)  {
        SpringApplication.run(App.class, args);
    }

    public void run(String... args) throws Exception {
    	
        //.....Nettoyage des tables....//
    	
        livreRepo.deleteAll();;
        clientRepo.deleteAll();
        
        //.....etc........//
       
        Client c1 = new Client("toto", "tata", 21, "rue honor", "bat A", 65423, "Lanion", "azerty", "toto@tata.fr", "totothebest");
        clientRepo.save(c1);
        
    }
}

