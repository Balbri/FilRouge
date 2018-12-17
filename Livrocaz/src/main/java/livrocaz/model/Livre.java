package livrocaz.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
// au 17/12/2018: attributs, getters and setters, hash/equals, and toString done


/**
 * 
 * @author Nico
 * TODO: @annotations de relation
 * Forçage des colonnes pour éviter qu'Hibernate crée de lui même des colonnes qui feraient doublon

 */

@Entity
@Table(name = "Livre")
public class Livre {
	@Id
	private String isbn;
	private String titre;
	private String couvertureURL;
	private String sujet;
	private String description;
	private String genre;
	private Date date;
	private float prixNeuf;
	private float prixOccas;
	private int stock;


	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	public String getIsbn() {
		return isbn;
	}
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	public String getCouvertureURL() {
		return couvertureURL;
	}
	public void setCouvertureURL(String couvertureURL) {
		this.couvertureURL = couvertureURL;
	}
	public String getSujet() {
		return sujet;
	}
	public void setSujet(String sujet) {
		this.sujet = sujet;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getGenre() {
		return genre;
	}
	public void setGenre(String genre) {
		this.genre = genre;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public float getPrixNeuf() {
		return prixNeuf;
	}
	public void setPrixNeuf(float prixNeuf) {
		this.prixNeuf = prixNeuf;
	}
	public float getPrixOccas() {
		return prixOccas;
	}
	public void setPrixOccas(float prixOccas) {
		this.prixOccas = prixOccas;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((couvertureURL == null) ? 0 : couvertureURL.hashCode());
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((genre == null) ? 0 : genre.hashCode());
		result = prime * result + ((isbn == null) ? 0 : isbn.hashCode());
		result = prime * result + Float.floatToIntBits(prixNeuf);
		result = prime * result + Float.floatToIntBits(prixOccas);
		result = prime * result + stock;
		result = prime * result + ((sujet == null) ? 0 : sujet.hashCode());
		result = prime * result + ((titre == null) ? 0 : titre.hashCode());
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
		Livre other = (Livre) obj;
		if (couvertureURL == null) {
			if (other.couvertureURL != null)
				return false;
		} else if (!couvertureURL.equals(other.couvertureURL))
			return false;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (genre == null) {
			if (other.genre != null)
				return false;
		} else if (!genre.equals(other.genre))
			return false;
		if (isbn == null) {
			if (other.isbn != null)
				return false;
		} else if (!isbn.equals(other.isbn))
			return false;
		if (Float.floatToIntBits(prixNeuf) != Float.floatToIntBits(other.prixNeuf))
			return false;
		if (Float.floatToIntBits(prixOccas) != Float.floatToIntBits(other.prixOccas))
			return false;
		if (stock != other.stock)
			return false;
		if (sujet == null) {
			if (other.sujet != null)
				return false;
		} else if (!sujet.equals(other.sujet))
			return false;
		if (titre == null) {
			if (other.titre != null)
				return false;
		} else if (!titre.equals(other.titre))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Livre [titre=" + titre + ", isbn=" + isbn + ", couvertureURL=" + couvertureURL + ", sujet=" + sujet
				+ ", description=" + description + ", genre=" + genre + ", date=" + date + ", prixNeuf=" + prixNeuf
				+ ", prixOccas=" + prixOccas + ", stock=" + stock + "]";
	}





}
