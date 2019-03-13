package livrocaz.model;

import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity (name = "commande")
@Table(name = "Commande")
public class Commande {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idCommande;
	
	@ManyToOne
	@JoinColumn(name="idClient")
	private Client client;
	
	@OneToMany(mappedBy="commande", cascade = {CascadeType.REMOVE})
	@JsonIgnore
	private  Collection<LigneDeCommande> ldc;
	
	private Date date;
	private Double fraisDePort;
	private Double tva;
	private Double ttc;
	private Double total;
	private int nbreArticles;
	private int valide;
	
	
	public Commande() {
	}

	public Commande(Client client, Date date, Double fraisDePort, Double tva, Double ttc, int valide) {
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


	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
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

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public int getNbreArticles() {
		return nbreArticles;
	}

	public void setNbreArticles(int nbreArticles) {
		this.nbreArticles = nbreArticles;
	}

	public int getValide() {
		return valide;
	}

	public void setValide(int valide) {
		this.valide = valide;
	}

	public Collection<LigneDeCommande> getLdc() {
		return ldc;
	}

	public void setLdc(Collection<LigneDeCommande> ldc) {
		this.ldc = ldc;
	}
	
}
