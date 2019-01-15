package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


/**
 * 
 * @author Nico
 * TODO: @annotations relation
 * Forçage des colonnes pour éviter qu'Hibernate crée de lui même des colonnes qui feraient doublon
 *
 */

@Entity (name = "editeur")
@Table(name = "Editeur")
public class Editeur {

	@Id
	@GeneratedValue
	private int idEditeur;
	private String nomEditeur;
	
//	@OneToMany(mappedBy="isbn")
//	private List<Livre>livres;
//	
}
