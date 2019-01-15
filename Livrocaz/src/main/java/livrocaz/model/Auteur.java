package livrocaz.model;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
 
@Entity
public class Auteur {
 
	@TableGenerator(name = "auteur_gen", allocationSize = 1, pkColumnName = "gen_name", valueColumnName = "gen_val", table = "id_gen")
	@Id
	@GeneratedValue(generator = "auteur_gen", strategy = GenerationType.TABLE)
	private int idAuteur;
	private String nameAuteur;
	private String surnameAuteur;
 
	@ManyToMany(mappedBy = "auteurs")
	private Collection<Livre> livres; 

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