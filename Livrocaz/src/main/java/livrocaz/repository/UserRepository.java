package livrocaz.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import livrocaz.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer>{
	
	@Query(value = "SELECT * FROM users WHERE users.username like ?1", nativeQuery = true)
	Optional<Users> findByUsername(String username);

}
