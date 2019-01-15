package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.Id;
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
	private int idLangue;
	private String nomLangue;
	
	
	
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
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + idLangue;
		result = prime * result + ((nomLangue == null) ? 0 : nomLangue.hashCode());
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
		Langue other = (Langue) obj;
		if (idLangue != other.idLangue)
			return false;
		if (nomLangue == null) {
			if (other.nomLangue != null)
				return false;
		} else if (!nomLangue.equals(other.nomLangue))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Langue [idLangue=" + idLangue + ", nomLangue=" + nomLangue + "]";
	}
	
	
}
