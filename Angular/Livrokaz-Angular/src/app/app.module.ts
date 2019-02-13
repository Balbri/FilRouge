import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Angular-Material';
import { HeaderComponent } from './header/header.component';
import { PubComponent } from './pub/pub.component';
import { ListeComponent } from './liste/liste.component';
import { HttpClientModule } from '@angular/common/http';
import { LivreDetailComponent } from './livre-detail/livre-detail.component';
import { GestionLivresComponent } from './gestion-livres/gestion-livres.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PubComponent,
    ListeComponent,
    LivreDetailComponent,
    GestionLivresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
