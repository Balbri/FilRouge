package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Gestionnaire")
public class Gestionnaire {

	/**
	 * @Author: Nico
	 * Reste à implémenter les méthodes propres à son activité.
	 * Forçage des colonnes
	 * Constructeurs
	 */
	
	@Id
	@GeneratedValue
	private int idGestionnaire;
	private String nomGestionnaire;
	private String mdpGestionnaire;
	private String emailGestionnaire;
	private String loginGestionnaire;
	
	
	public int getIdGestionnaire() {
		return idGestionnaire;
	}
	public void setIdGestionnaire(int idGestionnaire) {
		this.idGestionnaire = idGestionnaire;
	}
	public String getNomGestionnaire() {
		return nomGestionnaire;
	}
	public void setNomGestionnaire(String nomGestionnaire) {
		this.nomGestionnaire = nomGestionnaire;
	}
	public String getMdpGestionnaire() {
		return mdpGestionnaire;
	}
	public void setMdpGestionnaire(String mdpGestionnaire) {
		this.mdpGestionnaire = mdpGestionnaire;
	}
	public String getEmailGestionnaire() {
		return emailGestionnaire;
	}
	public void setEmailGestionnaire(String emailGestionnaire) {
		this.emailGestionnaire = emailGestionnaire;
	}
	public String getLoginGestionnaire() {
		return loginGestionnaire;
	}
	public void setLoginGestionnaire(String loginGestionnaire) {
		this.loginGestionnaire = loginGestionnaire;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((emailGestionnaire == null) ? 0 : emailGestionnaire.hashCode());
		result = prime * result + idGestionnaire;
		result = prime * result + ((loginGestionnaire == null) ? 0 : loginGestionnaire.hashCode());
		result = prime * result + ((mdpGestionnaire == null) ? 0 : mdpGestionnaire.hashCode());
		result = prime * result + ((nomGestionnaire == null) ? 0 : nomGestionnaire.hashCode());
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
		Gestionnaire other = (Gestionnaire) obj;
		if (emailGestionnaire == null) {
			if (other.emailGestionnaire != null)
				return false;
		} else if (!emailGestionnaire.equals(other.emailGestionnaire))
			return false;
		if (idGestionnaire != other.idGestionnaire)
			return false;
		if (loginGestionnaire == null) {
			if (other.loginGestionnaire != null)
				return false;
		} else if (!loginGestionnaire.equals(other.loginGestionnaire))
			return false;
		if (mdpGestionnaire == null) {
			if (other.mdpGestionnaire != null)
				return false;
		} else if (!mdpGestionnaire.equals(other.mdpGestionnaire))
			return false;
		if (nomGestionnaire == null) {
			if (other.nomGestionnaire != null)
				return false;
		} else if (!nomGestionnaire.equals(other.nomGestionnaire))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Gestionnaire [idGestionnaire=" + idGestionnaire + ", nomGestionnaire=" + nomGestionnaire
				+ ", mdpGestionnaire=" + mdpGestionnaire + ", emailGestionnaire=" + emailGestionnaire
				+ ", loginGestionnaire=" + loginGestionnaire + "]";
	}
	
	
}
