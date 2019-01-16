package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity (name = "editeur")
@Table(name = "Editeur")
public class Editeur {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idEditeur;
	private String nomEditeur;
	
	
	public Editeur() {
	}
	
	public int getIdEditeur() {
		return idEditeur;
	}
	public void setIdEditeur(int idEditeur) {
		this.idEditeur = idEditeur;
	}
	public String getNomEditeur() {
		return nomEditeur;
	}
	public void setNomEditeur(String nomEditeur) {
		this.nomEditeur = nomEditeur;
	}
	
}
