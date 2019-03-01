package livrocaz.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity (name = "lignedecommande")
@Table(name = "LigneDeCommande")
public class LigneDeCommande {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idLigneCommande;

	private int quantite;
	
	@ManyToOne
	@JoinColumn(name="idLivre")
	private Livre livre;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	@JoinColumn(name="idCommande")
	private Commande commande;


	public LigneDeCommande() {
	}


	public LigneDeCommande(int quantite, Livre livre, Commande commande) {
		super();
		this.quantite = quantite;
		this.livre = livre;
		this.commande = commande;
	}




	public int getIdLigneCommande() {
		return idLigneCommande;
	}


	public void setIdLigneCommande(int idLigneCommande) {
		this.idLigneCommande = idLigneCommande;
	}


	public int getQuantite() {
		return quantite;
	}


	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}


	public Livre getLivre() {
		return livre;
	}


	public void setLivre(Livre livre) {
		this.livre = livre;
	}


	public Commande getCommande() {
		return commande;
	}


	public void setCommande(Commande commande) {
		this.commande = commande;
	}
	
}
