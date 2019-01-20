package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import livrocaz.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer>{
	
	@Query(value = "SELECT * FROM client WHERE username = ?1", nativeQuery = true)
	Client findClientByUsername(String username);
	
}
