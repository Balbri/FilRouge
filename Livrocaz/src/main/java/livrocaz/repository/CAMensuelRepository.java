package livrocaz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import livrocaz.model.CAMensuel;

@Repository
public interface CAMensuelRepository extends JpaRepository<CAMensuel, Integer>{

}
