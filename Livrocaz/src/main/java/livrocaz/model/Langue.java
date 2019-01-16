package livrocaz.model;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity (name="langue")
@Table(name = "Langue")
public class Langue {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idLangue;
	private String nomLangue;
	
	@OneToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, mappedBy = "langue")
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
