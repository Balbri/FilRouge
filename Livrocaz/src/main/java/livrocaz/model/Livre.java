package livrocaz.model;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
 
@Entity
public class Livre {
 
	@TableGenerator(name = "livre_gen", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "gen_val", allocationSize = 100)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "livre_gen")
	private int idLivre;
	private String isbn;
	private String titreLivre;
	private String imageCouverture;
	private String sujetLivre;
	private String descriptionLivre;
	private String anneeParution;
	private double prixNeuf;
	private double prixOccas;
	private int stock;
 
	@ManyToMany(cascade={CascadeType.ALL})
	@JoinTable(name = "livre_auteur", 
	joinColumns = @JoinColumn(name = "idLivre"), inverseJoinColumns = @JoinColumn(name = "idAuteur"))
	@JsonIgnore
	private Collection<Auteur> auteurs;

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getTitreLivre() {
		return titreLivre;
	}

	public void setTitreLivre(String titreLivre) {
		this.titreLivre = titreLivre;
	}

	public String getImageCouverture() {
		return imageCouverture;
	}

	public void setImageCouverture(String imageCouverture) {
		this.imageCouverture = imageCouverture;
	}

	public String getSujetLivre() {
		return sujetLivre;
	}

	public void setSujetLivre(String sujetLivre) {
		this.sujetLivre = sujetLivre;
	}

	public String getDescriptionLivre() {
		return descriptionLivre;
	}

	public void setDescriptionLivre(String descriptionLivre) {
		this.descriptionLivre = descriptionLivre;
	}

	public String getAnneeParution() {
		return anneeParution;
	}

	public void setAnneeParution(String anneeParution) {
		this.anneeParution = anneeParution;
	}

	public double getPrixNeuf() {
		return prixNeuf;
	}

	public void setPrixNeuf(double prixNeuf) {
		this.prixNeuf = prixNeuf;
	}

	public double getPrixOccas() {
		return prixOccas;
	}

	public void setPrixOccas(double prixOccas) {
		this.prixOccas = prixOccas;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public Collection<Auteur> getAuteurs() {
		return auteurs;
	}

	public void setAuteurs(Collection<Auteur> auteurs) {
		this.auteurs = auteurs;
	}
 
	
}