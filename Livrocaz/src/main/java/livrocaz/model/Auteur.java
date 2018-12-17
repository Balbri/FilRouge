package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


// au 17/12/2018 attributs, G/S, H/E, tString done
/**
 * 
 * @author Nico
 *TODO: @annotations de relation
 *  Forçage des colonnes pour éviter qu'Hibernate crée de lui même des colonnes qui feraient doublon
 */


@Entity
@Table(name = "Auteur")
public class Auteur {

	@Id
	private int idAuteur;
	private String nomAuteur;
	private String prenomAuteur;
	
	
	public int getIdAuteur() {
		return idAuteur;
	}
	public void setIdAuteur(int idAuteur) {
		this.idAuteur = idAuteur;
	}
	public String getNomAuteur() {
		return nomAuteur;
	}
	public void setNomAuteur(String nomAuteur) {
		this.nomAuteur = nomAuteur;
	}
	public String getPrenomAuteur() {
		return prenomAuteur;
	}
	public void setPrenomAuteur(String prenomAuteur) {
		this.prenomAuteur = prenomAuteur;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + idAuteur;
		result = prime * result + ((nomAuteur == null) ? 0 : nomAuteur.hashCode());
		result = prime * result + ((prenomAuteur == null) ? 0 : prenomAuteur.hashCode());
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
		Auteur other = (Auteur) obj;
		if (idAuteur != other.idAuteur)
			return false;
		if (nomAuteur == null) {
			if (other.nomAuteur != null)
				return false;
		} else if (!nomAuteur.equals(other.nomAuteur))
			return false;
		if (prenomAuteur == null) {
			if (other.prenomAuteur != null)
				return false;
		} else if (!prenomAuteur.equals(other.prenomAuteur))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Auteur [idAuteur=" + idAuteur + ", nomAuteur=" + nomAuteur + ", prenomAuteur=" + prenomAuteur + "]";
	}
	
	
}
