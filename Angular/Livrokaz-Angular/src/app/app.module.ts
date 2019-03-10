import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './Angular-Material';
import { HeaderComponent } from './header/header.component';
import { PubComponent } from './pub/pub.component';
import { ListeComponent } from './liste/liste.component';
import { LivreDetailComponent } from './livre-detail/livre-detail.component';
import { GestionLivresComponent } from './gestion-livres/gestion-livres.component';
import { GestionDetailLivreComponent } from './gestion-detail-livre/gestion-detail-livre.component';
import { GestionAuteursComponent } from './gestion-auteurs/gestion-auteurs.component';
import { GestionLanguesComponent } from './gestion-langues/gestion-langues.component';
import { GestionDetailLangueComponent } from './gestion-detail-langue/gestion-detail-langue.component';
import { GestionGenresComponent } from './gestion-genres/gestion-genres.component';
import { GestionDetailGenreComponent } from './gestion-detail-genre/gestion-detail-genre.component';
import { GestionUsersComponent } from './gestion-users/gestion-users.component';
import { GestionDetailUserComponent } from './gestion-detail-user/gestion-detail-user.component';
import { GestionDetailAuteurComponent } from './gestion-detail-auteur/gestion-detail-auteur.component';
import { GestionEditeursComponent } from './gestion-editeurs/gestion-editeurs.component';
import { GestionDetailEditeurComponent } from './gestion-detail-editeur/gestion-detail-editeur.component';
import { GestionClientsComponent } from './gestion-clients/gestion-clients.component';
import { GestionDetailClientComponent } from './gestion-detail-client/gestion-detail-client.component';
import { GestionCommandesComponent } from './gestion-commandes/gestion-commandes.component';
import { GestionNewCommandeComponent } from './gestion-new-commande/gestion-new-commande.component';
import { GestionDetailCommandeComponent } from './gestion-detail-commande/gestion-detail-commande.component';
import { GestionDetailLigneDeCommandeComponent } from './gestion-detail-ligne-de-commande/gestion-detail-ligne-de-commande.component';
import { GestionCaComponent } from './gestion-ca/gestion-ca.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PubComponent,
    ListeComponent,
    LivreDetailComponent,
    GestionLivresComponent,
    GestionDetailLivreComponent,
    GestionAuteursComponent,
    GestionLanguesComponent,
    GestionDetailLangueComponent,
    GestionGenresComponent,
    GestionDetailGenreComponent,
    GestionUsersComponent,
    GestionDetailUserComponent,
    GestionDetailAuteurComponent,
    GestionEditeursComponent,
    GestionDetailEditeurComponent,
    GestionClientsComponent,
    GestionDetailClientComponent,
    GestionCommandesComponent,
    GestionNewCommandeComponent,
    GestionDetailCommandeComponent,
    GestionDetailLigneDeCommandeComponent,
    GestionCaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
