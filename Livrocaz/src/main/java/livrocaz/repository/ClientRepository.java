package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer>{

}
