package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;



@Entity (name = "authorities")
@Table(name = "Authorities")
public class Authorities {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idAuth;

	@OneToOne
	@JoinColumn(name = "username")
	private Users users;
	
	private String authority;
	

	public Authorities() {
	}


	public Users getUsers() {
		return users;
	}


	public void setUsers(Users users) {
		this.users = users;
	}


	public String getAuthority() {
		return authority;
	}


	public void setAuthority(String authority) {
		this.authority = authority;
	}
	
}
