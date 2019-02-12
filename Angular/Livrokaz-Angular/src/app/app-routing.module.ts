import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { LivreDetailComponent } from './livre-detail/livre-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/liste', pathMatch: 'full' },
  { path: 'liste', component: ListeComponent },
  { path: 'detail/:id', component: LivreDetailComponent },
  { path: '**', component: ListeComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
