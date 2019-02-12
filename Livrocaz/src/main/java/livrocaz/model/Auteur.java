package livrocaz.model;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
 
@Entity
public class Auteur {
 
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idAuteur;
	private String nameAuteur;
	private String surnameAuteur;
 
	@ManyToMany(cascade = CascadeType.REMOVE, mappedBy = "auteurs")
	@JsonIgnore
	private Collection<Livre> livres; 
	
	public Auteur() {
	}

	public int getIdAuteur() {
		return idAuteur;
	}

	public void setIdAuteur(int idAuteur) {
		this.idAuteur = idAuteur;
	}

	public String getNameAuteur() {
		return nameAuteur;
	}

	public void setNameAuteur(String nameAuteur) {
		this.nameAuteur = nameAuteur;
	}

	public String getSurnameAuteur() {
		return surnameAuteur;
	}

	public void setSurnameAuteur(String surnameAuteur) {
		this.surnameAuteur = surnameAuteur;
	}

	public Collection<Livre> getLivres() {
		return livres;
	}

	public void setLivres(Collection<Livre> hashLivres) {
		this.livres = hashLivres;
	}
 
	
}