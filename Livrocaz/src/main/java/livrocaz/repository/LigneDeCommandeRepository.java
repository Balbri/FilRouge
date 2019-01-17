package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.LigneDeCommande;

@Repository
public interface LigneDeCommandeRepository extends JpaRepository<LigneDeCommande, Integer>{

}
