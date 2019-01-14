package livrocaz.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * 
 * @author Nico
 * TODO: @Annotations
 * Forçage des colonnes pour éviter qu'Hibernate crée de lui même des colonnes qui feraient doublon
 *
 */


@Entity
@Table(name = "Client")
public class Client {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	private String mdpClient;
	private String emailClient;
	private String loginClient;


	public Client(String nomClient, String prenomClient, int numeroL, String rueL, String complementL,
			int cpL, String villeL, String mdpClient, String emailClient, String loginClient) {
		super();
		
		this.nomClient = nomClient;
		this.prenomClient = prenomClient;
		this.numeroL = numeroL;
		this.rueL = rueL;
		this.complementL = complementL;
		this.cpL = cpL;
		this.villeL = villeL;
		this.mdpClient = mdpClient;
		this.emailClient = emailClient;
		this.loginClient = loginClient;
	}
	
	public Client() {
		super();
	}

	// getters and setters
	@Column(name="idClient")
	public int getNumeroClient() {
		return idClient;
	}
	public void setNumeroClient(int numeroClient) {
		this.idClient = numeroClient;
	}
	@Column (name="nomClient")
	public String getNomClient() {
		return nomClient;
	}
	public void setNomClient(String nomClient) {
		this.nomClient = nomClient;
	}
	@Column (name="prenomClient")
	public String getPrenomClient() {
		return prenomClient;
	}
	public void setPrenomClient(String prenomClient) {
		this.prenomClient = prenomClient;
	}
	@Column (name="numeroL")
	public int getNumeroL() {
		return numeroL;
	}
	public void setNumeroL(int numeroL) {
		this.numeroL = numeroL;
	}
	@Column (name="rueL")
	public String getRueL() {
		return rueL;
	}
	public void setRueL(String rueL) {
		this.rueL = rueL;
	}
	@Column (name="complementL")
	public String getComplementL() {
		return complementL;
	}
	public void setComplementL(String complementL) {
		this.complementL = complementL;
	}
	@Column (name="cpL")
	public int getCpL() {
		return cpL;
	}
	public void setCpL(int cpL) {
		this.cpL = cpL;
	}
	@Column (name="villeL")
	public String getVilleL() {
		return villeL;
	}
	public void setVilleL(String villeL) {
		this.villeL = villeL;
	}
	@Column (name="numeroF")
	public int getNumeroF() {
		return numeroF;
	}
	public void setNumeroF(int numeroF) {
		this.numeroF = numeroF;
	}
	@Column (name="rueF")
	public String getRueF() {
		return rueF;
	}
	public void setRueF(String rueF) {
		this.rueF = rueF;
	}
	@Column (name="complementF")
	public String getComplementF() {
		return complementF;
	}
	public void setComplementF(String complementF) {
		this.complementF = complementF;
	}
	@Column (name="cpF")
	public int getCpF() {
		return cpF;
	}
	public void setCpF(int cpF) {
		this.cpF = cpF;
	}
	@Column (name="villeF")
	public String getVilleF() {
		return villeF;
	}
	public void setVilleF(String villeF) {
		this.villeF = villeF;
	}
	@Column (name="mdpClient")
	public String getMdpClient() {
		return mdpClient;
	}
	public void setMdpClient(String mdpClient) {
		this.mdpClient = mdpClient;
	}
	@Column (name="emailClient")
	public String getEmailClient() {
		return emailClient;
	}
	public void setEmailClient(String emailClient) {
		this.emailClient = emailClient;
	}
	@Column (name="loginClient")
	public String getLoginClient() {
		return loginClient;
	}
	public void setLoginClient(String loginClient) {
		this.loginClient = loginClient;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((complementF == null) ? 0 : complementF.hashCode());
		result = prime * result + ((complementL == null) ? 0 : complementL.hashCode());
		result = prime * result + cpF;
		result = prime * result + cpL;
		result = prime * result + ((emailClient == null) ? 0 : emailClient.hashCode());
		result = prime * result + ((loginClient == null) ? 0 : loginClient.hashCode());
		result = prime * result + ((mdpClient == null) ? 0 : mdpClient.hashCode());
		result = prime * result + ((nomClient == null) ? 0 : nomClient.hashCode());
		result = prime * result + idClient;
		result = prime * result + numeroF;
		result = prime * result + numeroL;
		result = prime * result + ((prenomClient == null) ? 0 : prenomClient.hashCode());
		result = prime * result + ((rueF == null) ? 0 : rueF.hashCode());
		result = prime * result + ((rueL == null) ? 0 : rueL.hashCode());
		result = prime * result + ((villeF == null) ? 0 : villeF.hashCode());
		result = prime * result + ((villeL == null) ? 0 : villeL.hashCode());
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
		Client other = (Client) obj;
		if (complementF == null) {
			if (other.complementF != null)
				return false;
		} else if (!complementF.equals(other.complementF))
			return false;
		if (complementL == null) {
			if (other.complementL != null)
				return false;
		} else if (!complementL.equals(other.complementL))
			return false;
		if (cpF != other.cpF)
			return false;
		if (cpL != other.cpL)
			return false;
		if (emailClient == null) {
			if (other.emailClient != null)
				return false;
		} else if (!emailClient.equals(other.emailClient))
			return false;
		if (loginClient == null) {
			if (other.loginClient != null)
				return false;
		} else if (!loginClient.equals(other.loginClient))
			return false;
		if (mdpClient == null) {
			if (other.mdpClient != null)
				return false;
		} else if (!mdpClient.equals(other.mdpClient))
			return false;
		if (nomClient == null) {
			if (other.nomClient != null)
				return false;
		} else if (!nomClient.equals(other.nomClient))
			return false;
		if (idClient != other.idClient)
			return false;
		if (numeroF != other.numeroF)
			return false;
		if (numeroL != other.numeroL)
			return false;
		if (prenomClient == null) {
			if (other.prenomClient != null)
				return false;
		} else if (!prenomClient.equals(other.prenomClient))
			return false;
		if (rueF == null) {
			if (other.rueF != null)
				return false;
		} else if (!rueF.equals(other.rueF))
			return false;
		if (rueL == null) {
			if (other.rueL != null)
				return false;
		} else if (!rueL.equals(other.rueL))
			return false;
		if (villeF == null) {
			if (other.villeF != null)
				return false;
		} else if (!villeF.equals(other.villeF))
			return false;
		if (villeL == null) {
			if (other.villeL != null)
				return false;
		} else if (!villeL.equals(other.villeL))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Client [numeroClient=" + idClient + ", nomClient=" + nomClient + ", prenomClient=" + prenomClient
				+ ", numeroL=" + numeroL + ", rueL=" + rueL + ", complementL=" + complementL + ", cpL=" + cpL
				+ ", villeL=" + villeL + ", numeroF=" + numeroF + ", rueF=" + rueF + ", complementF=" + complementF
				+ ", cpF=" + cpF + ", villeF=" + villeF + ", mdpClient=" + mdpClient + ", emailClient=" + emailClient
				+ ", loginClient=" + loginClient + "]";
	}



}
