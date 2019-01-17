package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Entity (name = "client")
@Table(name = "Client")
public class Client {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idClient;
	private String nomClient;
	private String prenomClient;
	private int numeroL;
	private String rueL;
	private String complementL;
	private int cpL;
	private String villeL;
	private int numeroF;
	private String rueF;
	private String complementF;
	private int cpF;
	private String villeF;
	private String emailClient;
	
	@OneToOne
	@JoinColumn(name = "username")
	private Users users;

	public Client() {
	}
	
	

	public Client(String nomClient, String prenomClient, int numeroL, String rueL, String complementL,
			int cpL, String villeL, String emailClient, Users users) {
		this.nomClient = nomClient;
		this.prenomClient = prenomClient;
		this.numeroL = numeroL;
		this.rueL = rueL;
		this.complementL = complementL;
		this.cpL = cpL;
		this.villeL = villeL;
		this.emailClient = emailClient;
		this.users = users;
	}



	public int getIdClient() {
		return idClient;
	}

	public void setIdClient(int idClient) {
		this.idClient = idClient;
	}

	public String getNomClient() {
		return nomClient;
	}

	public void setNomClient(String nomClient) {
		this.nomClient = nomClient;
	}

	public String getPrenomClient() {
		return prenomClient;
	}

	public void setPrenomClient(String prenomClient) {
		this.prenomClient = prenomClient;
	}

	public int getNumeroL() {
		return numeroL;
	}

	public void setNumeroL(int numeroL) {
		this.numeroL = numeroL;
	}

	public String getRueL() {
		return rueL;
	}

	public void setRueL(String rueL) {
		this.rueL = rueL;
	}

	public String getComplementL() {
		return complementL;
	}

	public void setComplementL(String complementL) {
		this.complementL = complementL;
	}

	public int getCpL() {
		return cpL;
	}

	public void setCpL(int cpL) {
		this.cpL = cpL;
	}

	public String getVilleL() {
		return villeL;
	}

	public void setVilleL(String villeL) {
		this.villeL = villeL;
	}

	public int getNumeroF() {
		return numeroF;
	}

	public void setNumeroF(int numeroF) {
		this.numeroF = numeroF;
	}

	public String getRueF() {
		return rueF;
	}

	public void setRueF(String rueF) {
		this.rueF = rueF;
	}

	public String getComplementF() {
		return complementF;
	}

	public void setComplementF(String complementF) {
		this.complementF = complementF;
	}

	public int getCpF() {
		return cpF;
	}

	public void setCpF(int cpF) {
		this.cpF = cpF;
	}

	public String getVilleF() {
		return villeF;
	}

	public void setVilleF(String villeF) {
		this.villeF = villeF;
	}

	public String getEmailClient() {
		return emailClient;
	}

	public void setEmailClient(String emailClient) {
		this.emailClient = emailClient;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}
	
}
