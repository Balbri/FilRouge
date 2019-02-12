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
import javax.persistence.ManyToOne;
 
@Entity
public class Livre {
 
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
 
	@ManyToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
	@JoinTable(name = "livre_auteur", joinColumns = @JoinColumn(name = "idLivre"), inverseJoinColumns = @JoinColumn(name = "idAuteur"))
	private Collection<Auteur> auteurs;
	
	@ManyToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
	@JoinTable(name = "livre_genre", joinColumns = @JoinColumn(name = "idLivre"), inverseJoinColumns = @JoinColumn(name = "idGenre"))
	private Collection<Genre> genres;
	
	@ManyToOne
	@JoinColumn(name="idLangue")
	private Langue langue; 
	
	@ManyToOne
	@JoinColumn(name="idEditeur")
	private Editeur editeur; 
	
	
	
	public Livre() {
	}

	public int getIdLivre() {
		return idLivre;
	}

	public void setIdLivre(int idLivre) {
		this.idLivre = idLivre;
	}

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

	public Collection<Genre> getGenres() {
		return genres;
	}

	public void setGenres(Collection<Genre> genres) {
		this.genres = genres;
	}

	public Langue getLangue() {
		return langue;
	}

	public void setLangue(Langue langue) {
		this.langue = langue;
	}

	public Editeur getEditeur() {
		return editeur;
	}

	public void setEditeur(Editeur editeur) {
		this.editeur = editeur;
	}
		
}