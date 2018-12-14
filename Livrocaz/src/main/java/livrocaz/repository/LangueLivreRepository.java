package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.LangueLivre;

@Repository
public interface LangueLivreRepository extends JpaRepository<LangueLivre, Integer>{

}
