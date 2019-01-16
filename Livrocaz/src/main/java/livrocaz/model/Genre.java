package livrocaz.model;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 * 
 * @author Nico et Ced
 * Forçage des colonnes pour éviter qu'Hibernate crée de lui même des colonnes qui feraient doublon
 *
 */

@Entity (name = "genre")
@Table(name = "Genre")
public class Genre {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idGenre;
	private String nomGenre;
	
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, mappedBy = "genres")
	private Collection<Livre> livres; 
	
	
	public Genre() {
	}
	
	public int getIdGenre() {
		return idGenre;
	}
	public void setIdGenre(int idGenre) {
		this.idGenre = idGenre;
	}
	public String getNomGenre() {
		return nomGenre;
	}
	public void setNomGenre(String nomGenre) {
		this.nomGenre = nomGenre;
	}
	
	public Collection<Livre> getLivres() {
		return livres;
	}
	public void setLivres(Collection<Livre> livres) {
		this.livres = livres;
	}
		
}
