package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Editeur;

@Repository
public interface EditeurRepository extends JpaRepository<Editeur, Integer>{

}
