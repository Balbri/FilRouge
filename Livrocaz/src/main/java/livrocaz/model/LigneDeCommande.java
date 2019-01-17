package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
	
	@ManyToOne
	@JoinColumn(name="idCommande")
	private Commande commande;


	public LigneDeCommande() {
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
