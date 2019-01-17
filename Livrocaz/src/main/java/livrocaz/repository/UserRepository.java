package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer>{

}
