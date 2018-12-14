package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.GenreLivre;

@Repository
public interface GenreLivreRepository extends JpaRepository<GenreLivre, Integer>{

}
