package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Commande;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Integer>{

}
