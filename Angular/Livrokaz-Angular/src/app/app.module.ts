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
import { GestionLanguesComponent } from './gestion-langues/gestion-langues.component';
import { GestionDetailLangueComponent } from './gestion-detail-langue/gestion-detail-langue.component';
import { GestionGenresComponent } from './gestion-genres/gestion-genres.component';
import { GestionDetailGenreComponent } from './gestion-detail-genre/gestion-detail-genre.component';
import { GestionUsersComponent } from './gestion-users/gestion-users.component';
import { GestionDetailUserComponent } from './gestion-detail-user/gestion-detail-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PubComponent,
    ListeComponent,
    LivreDetailComponent,
    GestionLivresComponent,
    GestionDetailLivreComponent,
    GestionLanguesComponent,
    GestionDetailLangueComponent,
    GestionGenresComponent,
    GestionDetailGenreComponent,
    GestionUsersComponent,
    GestionDetailUserComponent
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
