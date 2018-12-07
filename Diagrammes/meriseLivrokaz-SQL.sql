#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Editeur
#------------------------------------------------------------

CREATE TABLE Editeur(
        nomEditeur Text NOT NULL
	,CONSTRAINT Editeur_PK PRIMARY KEY (nomEditeur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: livre
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
        nomEditeur        Text NOT NULL
	,CONSTRAINT livre_PK PRIMARY KEY (ISBN)

	,CONSTRAINT livre_Editeur_FK FOREIGN KEY (nomEditeur) REFERENCES Editeur(nomEditeur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Auteur
#------------------------------------------------------------

CREATE TABLE Auteur(
        nomAuteur    Varchar (50) NOT NULL ,
        prenomAuteur Varchar (50) NOT NULL
	,CONSTRAINT Auteur_PK PRIMARY KEY (nomAuteur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: genreLivre
#------------------------------------------------------------

CREATE TABLE genreLivre(
        nomGenre Text NOT NULL
	,CONSTRAINT genreLivre_PK PRIMARY KEY (nomGenre)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: langueLivre
#------------------------------------------------------------

CREATE TABLE langueLivre(
        nomLangue Text NOT NULL
	,CONSTRAINT langueLivre_PK PRIMARY KEY (nomLangue)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: client
#------------------------------------------------------------

CREATE TABLE client(
        numeroClient Varchar (50) NOT NULL ,
        nomClient    Text NOT NULL
	,CONSTRAINT client_PK PRIMARY KEY (numeroClient)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: CA Mensuel
#------------------------------------------------------------

CREATE TABLE CA_Mensuel(
        caMensuel Double NOT NULL
	,CONSTRAINT CA_Mensuel_PK PRIMARY KEY (caMensuel)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Gestionnaire
#------------------------------------------------------------

CREATE TABLE Gestionnaire(
        nomGestionnaire Varchar (50) NOT NULL ,
        ISBN            Int NOT NULL ,
        caMensuel       Double NOT NULL
	,CONSTRAINT Gestionnaire_PK PRIMARY KEY (nomGestionnaire)

	,CONSTRAINT Gestionnaire_livre_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)
	,CONSTRAINT Gestionnaire_CA_Mensuel0_FK FOREIGN KEY (caMensuel) REFERENCES CA_Mensuel(caMensuel)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Commande
#------------------------------------------------------------

CREATE TABLE Commande(
        numeroCommande  Int NOT NULL ,
        numeroClient    Varchar (50) NOT NULL ,
        nomGestionnaire Varchar (50) NOT NULL
	,CONSTRAINT Commande_PK PRIMARY KEY (numeroCommande)

	,CONSTRAINT Commande_client_FK FOREIGN KEY (numeroClient) REFERENCES client(numeroClient)
	,CONSTRAINT Commande_Gestionnaire0_FK FOREIGN KEY (nomGestionnaire) REFERENCES Gestionnaire(nomGestionnaire)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Admin
#------------------------------------------------------------

CREATE TABLE Admin(
        nomGestionnaire Varchar (50) NOT NULL ,
        nomAdmin        Varchar (50) NOT NULL ,
        numeroClient    Varchar (50) NOT NULL ,
        ISBN            Int NOT NULL ,
        caMensuel       Double NOT NULL
	,CONSTRAINT Admin_PK PRIMARY KEY (nomGestionnaire,nomAdmin)

	,CONSTRAINT Admin_Gestionnaire_FK FOREIGN KEY (nomGestionnaire) REFERENCES Gestionnaire(nomGestionnaire)
	,CONSTRAINT Admin_client0_FK FOREIGN KEY (numeroClient) REFERENCES client(numeroClient)
	,CONSTRAINT Admin_livre1_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)
	,CONSTRAINT Admin_CA_Mensuel2_FK FOREIGN KEY (caMensuel) REFERENCES CA_Mensuel(caMensuel)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Ecrit
#------------------------------------------------------------

CREATE TABLE Ecrit(
        ISBN      Int NOT NULL ,
        nomAuteur Varchar (50) NOT NULL
	,CONSTRAINT Ecrit_PK PRIMARY KEY (ISBN,nomAuteur)

	,CONSTRAINT Ecrit_livre_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)
	,CONSTRAINT Ecrit_Auteur0_FK FOREIGN KEY (nomAuteur) REFERENCES Auteur(nomAuteur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: classifie
#------------------------------------------------------------

CREATE TABLE classifie(
        ISBN     Int NOT NULL ,
        nomGenre Text NOT NULL
	,CONSTRAINT classifie_PK PRIMARY KEY (ISBN,nomGenre)

	,CONSTRAINT classifie_livre_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)




	=======================================================================
	   Désolé, il faut activer cette version pour voir la suite du script ! 
	=======================================================================
