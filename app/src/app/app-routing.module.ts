import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from './components/commande/commande.component';
import { DateComponent } from './components/date/date.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StockComponent } from './components/stock/stock.component';

const routes: Routes = [
  {path: '',  pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'commande', component:CommandeComponent},
  {path: 'stock', component:StockComponent},
  {path: 'date', component:DateComponent},
  {path: 'profile', component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
