package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity (name = "commande")
@Table(name = "Commande")
public class Commande {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idCommande;
	
	@ManyToOne
	@JoinColumn(name="idClient")
	private Client client;
	
	private String date;
	private Double fraisDePort;
	private Double tva;
	private Double ttc;
	private int valide;
	
	
	public Commande() {
	}

	public Commande(Client client, String date, Double fraisDePort, Double tva, Double ttc, int valide) {
		this.client = client;
		this.date = date;
		this.fraisDePort = fraisDePort;
		this.tva = tva;
		this.ttc = ttc;
		this.valide = valide;
	}

	public int getIdCommande() {
		return idCommande;
	}


	public void setIdCommande(int idCommande) {
		this.idCommande = idCommande;
	}


	public Client getClient() {
		return client;
	}


	public void setClient(Client client) {
		this.client = client;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	public Double getFraisDePort() {
		return fraisDePort;
	}


	public void setFraisDePort(Double fraisDePort) {
		this.fraisDePort = fraisDePort;
	}


	public Double getTva() {
		return tva;
	}


	public void setTva(Double tva) {
		this.tva = tva;
	}


	public Double getTtc() {
		return ttc;
	}


	public void setTtc(Double ttc) {
		this.ttc = ttc;
	}

	public int getValide() {
		return valide;
	}

	public void setValide(int valide) {
		this.valide = valide;
	}
	
	
}
