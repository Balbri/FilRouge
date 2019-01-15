package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * @author Nico
 * TODO: @annotations de relation
 * Forçage des colonnes pour éviter qu'Hibernate crée de lui même des colonnes qui feraient doublon
 *
 */

@Entity (name = "genre")
@Table(name = "Genre")
public class Genre {

	@Id
	private int idGenre;
	private String nomGenre;
	
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
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + idGenre;
		result = prime * result + ((nomGenre == null) ? 0 : nomGenre.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Genre other = (Genre) obj;
		if (idGenre != other.idGenre)
			return false;
		if (nomGenre == null) {
			if (other.nomGenre != null)
				return false;
		} else if (!nomGenre.equals(other.nomGenre))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Genre [idGenre=" + idGenre + ", nomGenre=" + nomGenre + "]";
	}
	
	
}
