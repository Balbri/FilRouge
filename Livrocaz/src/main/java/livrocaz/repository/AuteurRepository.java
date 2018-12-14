package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Auteur;

@Repository
public interface AuteurRepository extends JpaRepository<Auteur, Integer>{

}
