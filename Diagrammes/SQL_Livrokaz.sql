#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Editeur
#------------------------------------------------------------

CREATE TABLE Editeur(
        idEditeur  Int NOT NULL ,
        nomEditeur Varchar (255) NOT NULL
	,CONSTRAINT Editeur_PK PRIMARY KEY (idEditeur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Auteur
#------------------------------------------------------------

CREATE TABLE Auteur(
        idAuteur     Int NOT NULL ,
        nomAuteur    Varchar (50) NOT NULL ,
        prenomAuteur Varchar (50) NOT NULL
	,CONSTRAINT Auteur_PK PRIMARY KEY (idAuteur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Genre
#------------------------------------------------------------

CREATE TABLE Genre(
        idGenre  Int NOT NULL ,
        nomGenre Varchar (255) NOT NULL
	,CONSTRAINT Genre_PK PRIMARY KEY (idGenre)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: langue
#------------------------------------------------------------

CREATE TABLE langue(
        idLangue  Int NOT NULL ,
        nomLangue Varchar (255) NOT NULL
	,CONSTRAINT langue_PK PRIMARY KEY (idLangue)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: livre
#------------------------------------------------------------

CREATE TABLE livre(
        ISBN              Int NOT NULL ,
        titreLivre        Varchar (100) NOT NULL ,
        imageCouverture   Varchar (100) NOT NULL ,
        sujetLivre        Varchar (100) NOT NULL ,
        descriptionLivre  Varchar (255) NOT NULL ,
        anneeParution     Date NOT NULL ,
        prixVenteNeuf     Float NOT NULL ,
        prixVenteOccasion Float NOT NULL ,
        qttStockLivre     Float NOT NULL ,
        idEditeur         Int NOT NULL ,
        idLangue          Int NOT NULL
	,CONSTRAINT livre_PK PRIMARY KEY (ISBN)

	,CONSTRAINT livre_Editeur_FK FOREIGN KEY (idEditeur) REFERENCES Editeur(idEditeur)
	,CONSTRAINT livre_langue0_FK FOREIGN KEY (idLangue) REFERENCES langue(idLangue)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: authorities
#------------------------------------------------------------

CREATE TABLE authorities(
        username    Varchar (50) NOT NULL ,
        authorities Varchar (50) NOT NULL
	,CONSTRAINT authorities_PK PRIMARY KEY (username)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Users
#------------------------------------------------------------

CREATE TABLE Users(
        username             Varchar (50) NOT NULL ,
        password             Varchar (50) NOT NULL ,
        enabled              TinyINT NOT NULL ,
        username_authorities Varchar (50) NOT NULL
	,CONSTRAINT Users_PK PRIMARY KEY (username)

	,CONSTRAINT Users_authorities_FK FOREIGN KEY (username_authorities) REFERENCES authorities(username)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Client
#------------------------------------------------------------

CREATE TABLE Client(
        userID         Int  Auto_increment  NOT NULL ,
        nom            Varchar (255) NOT NULL ,
        prenom         Varchar (50) NOT NULL ,
        numeroL        Int NOT NULL ,
        rueL           Varchar (255) NOT NULL ,
        complementL    Varchar (255) NOT NULL ,
        CPL            Int NOT NULL ,
        VilleL         Varchar (255) NOT NULL ,
        numeroF        Int NOT NULL ,
        rueF           Varchar (255) NOT NULL ,
        complementF    Varchar (255) NOT NULL ,
        CPF            Int NOT NULL ,
        VilleF         Varchar (255) NOT NULL ,
        email          Varchar (50) NOT NULL ,
        username       Varchar (50) NOT NULL ,
        username_Users Varchar (50) NOT NULL
	,CONSTRAINT Client_PK PRIMARY KEY (userID)

	,CONSTRAINT Client_Users_FK FOREIGN KEY (username_Users) REFERENCES Users(username)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Commande
#------------------------------------------------------------

CREATE TABLE Commande(
        numeroCommande Int NOT NULL ,
        date           Varchar (50) NOT NULL ,
        fraisdeport    Double NOT NULL ,
        montantTVA55   Double NOT NULL ,
        TTC            Double NOT NULL ,
        userID         Int NOT NULL
	,CONSTRAINT Commande_PK PRIMARY KEY (numeroCommande)

	,CONSTRAINT Commande_Client_FK FOREIGN KEY (userID) REFERENCES Client(userID)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: auteur_Livre
#------------------------------------------------------------

CREATE TABLE auteur_Livre(
        ISBN     Int NOT NULL ,
        idAuteur Int NOT NULL
	,CONSTRAINT auteur_Livre_PK PRIMARY KEY (ISBN,idAuteur)

	,CONSTRAINT auteur_Livre_livre_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)
	,CONSTRAINT auteur_Livre_Auteur0_FK FOREIGN KEY (idAuteur) REFERENCES Auteur(idAuteur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: genre_livre
#------------------------------------------------------------

CREATE TABLE genre_livre(
        ISBN    Int NOT NULL ,
        idGenre Int NOT NULL
	,CONSTRAINT genre_livre_PK PRIMARY KEY (ISBN,idGenre)

	,CONSTRAINT genre_livre_livre_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)
	,CONSTRAINT genre_livre_Genre0_FK FOREIGN KEY (idGenre) REFERENCES Genre(idGenre)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Lignes de commande
#------------------------------------------------------------

CREATE TABLE Lignes_de_commande(
        ISBN           Int NOT NULL ,
        numeroCommande Int NOT NULL ,
        qte            Int NOT NULL
	,CONSTRAINT Lignes_de_commande_PK PRIMARY KEY (ISBN,numeroCommande)

	,CONSTRAINT Lignes_de_commande_livre_FK FOREIGN KEY (ISBN) REFERENCES livre(ISBN)
	,CONSTRAINT Lignes_de_commande_Commande0_FK FOREIGN KEY (numeroCommande) REFERENCES Commande(numeroCommande)
)ENGINE=InnoDB;

