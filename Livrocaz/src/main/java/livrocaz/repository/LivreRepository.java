package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Livre;

@Repository
public interface LivreRepository extends JpaRepository<Livre, Integer>{

	

		

}
