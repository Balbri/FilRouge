package livrocaz.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CAMensuel")
public class CAMensuel {

	@Id
	private int idCaMensuel;
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(caMensuel);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + idCaMensuel;
		result = prime * result + ((moisCaMensuel == null) ? 0 : moisCaMensuel.hashCode());
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
		CAMensuel other = (CAMensuel) obj;
		if (Double.doubleToLongBits(caMensuel) != Double.doubleToLongBits(other.caMensuel))
			return false;
		if (idCaMensuel != other.idCaMensuel)
			return false;
		if (moisCaMensuel == null) {
			if (other.moisCaMensuel != null)
				return false;
		} else if (!moisCaMensuel.equals(other.moisCaMensuel))
			return false;
		return true;
	}
	public int getIdCaMensuel() {
		return idCaMensuel;
	}
	public void setIdCaMensuel(int idCaMensuel) {
		this.idCaMensuel = idCaMensuel;
	}
	public String getMoisCaMensuel() {
		return moisCaMensuel;
	}
	public void setMoisCaMensuel(String moisCaMensuel) {
		this.moisCaMensuel = moisCaMensuel;
	}
	public double getCaMensuel() {
		return caMensuel;
	}
	public void setCaMensuel(double caMensuel) {
		this.caMensuel = caMensuel;
	}
	private String moisCaMensuel;
	private double caMensuel;
	@Override
	public String toString() {
		return "CAMensuel [idCaMensuel=" + idCaMensuel + ", moisCaMensuel=" + moisCaMensuel + ", caMensuel=" + caMensuel
				+ "]";
	}
	
	
}
