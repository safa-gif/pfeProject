import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateComponent } from './components/date/date.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CommandeComponent } from './components/commande/commande.component';
import { TableDComponent } from './components/tables/table-d/table-d.component';
import { PdpComponent } from './components/pdp/pdp.component';
import { StocksComponent } from './components/stocks/stocks.component';
const routes: Routes = [
  // {path: '',  pathMatch: 'full', redirectTo: 'login'},
  // {path: '', component: HomeComponent }, 
  // children : [
    {path: 'home', component:HomeComponent},
    {
     path :'',component:LoginComponent
    },
    {
      path: 'stock', component:StocksComponent
    },
    {path: 'commande',component:CommandeComponent
    },
     {path: 'add-event',component:AddEventComponent 
    },
     {path:'profile',component:ProfileComponent 
     },
     {path:'pdp',component:PdpComponent
     },
     {path: 'date',component:DateComponent},
  // ]
  
  {path: 'login', component: LoginComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
