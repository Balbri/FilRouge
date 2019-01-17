package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Authorities;

@Repository
public interface AuthoritiesRepository extends JpaRepository<Authorities, Integer>{

}
