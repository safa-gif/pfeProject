import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateComponent } from './components/date/date.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StockComponent } from './components/stock/stock.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommandeComponent } from './components/commande/commande.component';
import { TableDComponent } from './components/tables/table-d/table-d.component';
const routes: Routes = [
  {path: '',  pathMatch: 'full', redirectTo: 'login'},
  {path: 'home', component: HomeComponent},
  {path: 'stock', component:StockComponent},
  {path: 'date', component:DateComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'add-event', component: AddEventComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'commande', component: CommandeComponent},
  {path: 'table', component: TableDComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
