package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Administrateur;

@Repository
public interface AdministrateurRepository extends JpaRepository<Administrateur, Integer>{

}
