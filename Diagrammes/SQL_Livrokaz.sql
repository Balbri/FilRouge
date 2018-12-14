#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table Editeur
#------------------------------------------------------------

CREATE TABLE Editeur(
        idEditeur  Int NOT NULL ,
        nomEditeur Text NOT NULL
	,CONSTRAINT Editeur_PK PRIMARY KEY (idEditeur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table livre
#------------------------------------------------------------

CREATE TABLE livre(
        ISBN              Int NOT NULL ,
        titreLivre        Text NOT NULL ,
        imageCouverture   Varchar (50) NOT NULL ,
        sujetLivre        Text NOT NULL ,
        descriptionLivre  Text NOT NULL ,
        anneeParution     Date NOT NULL ,
        prixVenteNeuf     Int NOT NULL ,
        prixVenteOccasion Int NOT NULL ,
        qttStockLivre     Int NOT NULL ,
        idEditeur         Int NOT NULL
	,CONSTRAINT livre_PK PRIMARY KEY (ISBN)

	,CONSTRAINT livre_Editeur_FK FOREIGN KEY (idEditeur) REFERENCES Editeur(idEditeur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table Auteur
#------------------------------------------------------------

CREATE TABLE Auteur(
        idAuteur     Int NOT NULL ,
        nomAuteur    Varchar (50) NOT NULL ,
        prenomAuteur Varchar (50) NOT NULL
	,CONSTRAINT Auteur_PK PRIMARY KEY (idAuteur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table genreLivre
#------------------------------------------------------------

CREATE TABLE genreLivre(
        idGenre  Int NOT NULL ,
        nomGenre Text NOT NULL
	,CONSTRAINT genreLivre_PK PRIMARY KEY (idGenre)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table langueLivre
#------------------------------------------------------------

CREATE TABLE langueLivre(
        idLangue  Int NOT NULL ,
        nomLangue Text NOT NULL
	,CONSTRAINT langueLivre_PK PRIMARY KEY (idLangue)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table client
#------------------------------------------------------------

CREATE TABLE client(
        numeroClient  Int  Auto_increment  NOT NULL ,
        nomClient     Text NOT NULL ,
        prenomClient  Varchar (50) NOT NULL ,
        adresseClient Varchar (50) NOT NULL ,
        cpClient      Int NOT NULL ,
        villeClient   Varchar (50) NOT NULL ,
        mdpClient     Varchar (50) NOT NULL ,
        emailClient   Varchar (50) NOT NULL ,
        loginClient   Varchar (50) NOT NULL
	,CONSTRAINT client_PK PRIMARY KEY (numeroClient)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table Commande
#------------------------------------------------------------

CREATE TABLE Commande(
        numeroCommande Int NOT NULL ,
        numeroClient   Int NOT NULL
	,CONSTRAINT Commande_PK PRIMARY KEY (numeroCommande)

	,CONSTRAINT Commande_client_FK FOREIGN KEY (numeroClient) REFERENCES client(numeroClient)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table CA Mensuel
#------------------------------------------------------------

CREATE TABLE CA_Mensuel(
        idCaMensuel   Int NOT NULL ,
        moisCaMensuel Varchar (50) NOT NULL ,
        caMensuel     Double NOT NULL
	,CONSTRAINT CA_Mensuel_PK PRIMARY KEY (idCaMensuel)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table Gestionnaire
#------------------------------------------------------------

CREATE TABLE Gestionnaire(
        idGestionnaire    Int NOT NULL ,
        nomGestionnaire   Varchar (50) NOT NULL ,
        mdpGestionnaire   Varchar (50) NOT NULL ,
        emailGestionnaire Varchar (50) NOT NULL ,
        loginGestionnaire Varchar (50) NOT NULL ,
        ISBN              Int NOT NULL ,
        idCaMensuel       Int NOT NULL
	,CONSTRAINT Gestionnaire_PK PRIMARY KEY (idGestionnaire)

	,CONSTRAINT Gestionnaire_livre_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)
	,CONSTRAINT Gestionnaire_CA_Mensuel0_FK FOREIGN KEY (idCaMensuel) REFERENCES CA_Mensuel(idCaMensuel)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table Admin
#------------------------------------------------------------

CREATE TABLE Admin(
        idGestionnaire    Int NOT NULL ,
        nomGestionnaire   Varchar (50) NOT NULL ,
        mdpGestionnaire   Varchar (50) NOT NULL ,
        emailGestionnaire Varchar (50) NOT NULL ,
        loginGestionnaire Varchar (50) NOT NULL ,
        ISBN              Int NOT NULL ,
        idCaMensuel       Int NOT NULL
	,CONSTRAINT Admin_PK PRIMARY KEY (idGestionnaire)

	,CONSTRAINT Admin_Gestionnaire_FK FOREIGN KEY (idGestionnaire) REFERENCES Gestionnaire(idGestionnaire)
	,CONSTRAINT Admin_livre0_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)
	,CONSTRAINT Admin_CA_Mensuel1_FK FOREIGN KEY (idCaMensuel) REFERENCES CA_Mensuel(idCaMensuel)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table Ecrit
#------------------------------------------------------------

CREATE TABLE Ecrit(
        ISBN     Int NOT NULL ,
        idAuteur Int NOT NULL
	,CONSTRAINT Ecrit_PK PRIMARY KEY (ISBN,idAuteur)




	=======================================================================
	   Désolé, il faut activer cette version pour voir la suite du script ! 
	=======================================================================
