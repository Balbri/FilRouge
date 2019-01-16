package livrocaz.model;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


/**
 * 
 * @author Nico
 * TODO: @annotations de relation
 * Forçage des colonnes pour éviter qu'Hibernate crée de lui même des colonnes qui feraient doublon

 */

@Entity (name="langue")
@Table(name = "Langue")
public class Langue {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idLangue;
	private String nomLangue;
	
	@OneToMany(mappedBy = "langue")
	private Collection<Livre> livres;
	
	
	
	public int getIdLangue() {
		return idLangue;
	}
	public void setIdLangue(int idLangue) {
		this.idLangue = idLangue;
	}
	public String getNomLangue() {
		return nomLangue;
	}
	public void setNomLangue(String nomLangue) {
		this.nomLangue = nomLangue;
	}
	public Collection<Livre> getLivres() {
		return livres;
	}
	public void setLivres(Collection<Livre> livres) {
		this.livres = livres;
	}
		
}
