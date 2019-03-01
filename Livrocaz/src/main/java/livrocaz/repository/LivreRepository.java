package livrocaz.repository;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import livrocaz.model.Livre;

@Repository
public interface LivreRepository extends JpaRepository<Livre, Integer>{

	
	@Query(value = "SELECT * FROM livre WHERE id_livre = ?1", nativeQuery = true)
	Livre findLivreById(int id);
	
	@Query(value = "SELECT * FROM livre WHERE livre.titre_livre LIKE ?1%", nativeQuery = true)
	Optional<Livre> findLivreByName(String nom);
	
	
	/*
	 * Requête custom pour faire fonctionner le champs de recherche par titre, auteur, ou genre.
	 */
	
	
	@Query(value = "SELECT  l.id_livre, l.annee_parution, l.description_livre, l.image_couverture, l.isbn, l.prix_neuf," + 
			"l.prix_occas, l.stock, l.sujet_livre, l.titre_livre, l.id_editeur, l.id_langue\r\n, l.date_modif " + 
			 
			"FROM db_livrocaz.livre l, db_livrocaz.genre g, db_livrocaz.auteur a,  db_livrocaz.livre_genre lg,  db_livrocaz.livre_auteur la " + 
			" WHERE " + 
			"((lg.id_genre = g.id_genre " + 
			"AND" + 
			" lg.id_livre = l.id_livre)" + 
			" AND" + 
			"(la.id_auteur = a.id_auteur " + 
			"AND " + 
			" la.id_livre = l.id_livre)) " + 
			"AND " + 
			" (g.nom_genre LIKE %?1% " + 
			"OR " + 
			"  a.surname_auteur LIKE %?1% " + 
			"OR " + 
			"a.name_auteur LIKE %?1% " + 
			"OR " + 
			"l.titre_livre LIKE %?1% " + 
			 
			") " + 
			"group by l.isbn", nativeQuery = true)
	Collection<Livre>findLivresBySearchtext(String nom);
}
