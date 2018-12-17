package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Langue;

@Repository
public interface LangueRepository extends JpaRepository<Langue, Integer>{

}
