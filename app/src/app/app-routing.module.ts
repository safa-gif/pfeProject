import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateComponent } from './components/date/date.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { LoginComponent } from './components/login/login.component';
import { CommandeComponent } from './components/commande/commande.component';
// import { PdpComponent } from './components/pdp/pdp.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { RegisterComponent } from './components/register/register.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
const routes: Routes = [
  {path: '',  pathMatch: 'full', redirectTo: 'login'},
    {path: 'home', component:HomeComponent},
    {
      path: 'stock', component:StocksComponent
    },
    {path: 'commande',component:CommandeComponent
    },
     {path: 'add-event',component:AddEventComponent 
    },
     {path:'profile',component:ProfileComponent 
     },
     {path:'users',component:ListUsersComponent
     },
     {path: 'date',component:DateComponent},
  
  {path: 'login', component: LoginComponent},
   {path: 'register',component:RegisterComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
