import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DataComponent } from './components/data/data.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { DataserviceService } from './services/dataservice.service';
import { StockComponent } from './components/stock/stock.component';
import { CommandeComponent } from './components/commande/commande.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DateComponent } from './components/date/date.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {GridModule} from '@angular/flex-layout/grid';
import {FlexModule} from '@angular/flex-layout/flex';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataComponent,
    StockComponent,
    CommandeComponent,
    ProfileComponent,
    DateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    GridModule,
    FlexModule,
    MatTableExporterModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DataserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
