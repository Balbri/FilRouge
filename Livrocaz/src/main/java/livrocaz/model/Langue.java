package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity (name="langue")
@Table(name = "Langue")
public class Langue {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int idLangue;
    private String nomLangue;
    
    public Langue() {
	}
    
	public int getIdLangue() {
        return idLangue;
    }
    public void setIdLangue(int idLangue) {
        this.idLangue = idLangue;
    }
    public String getNomLangue() {
        return nomLangue;
    }
    public void setNomLangue(String nomLangue) {
        this.nomLangue = nomLangue;
    }

}
