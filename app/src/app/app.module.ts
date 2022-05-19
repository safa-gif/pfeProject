import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { DateComponent } from './components/date/date.component';
import { ToastrModule } from 'ngx-toastr';

//Angular Material Imports + PrimeNg imports +primeFlexs
import {FlexLayoutModule} from '@angular/flex-layout';
import {GridModule} from '@angular/flex-layout/grid';
import {FlexModule} from '@angular/flex-layout/flex';
import { MatTableExporterModule } from 'mat-table-exporter';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddEventComponent } from './components/add-event/add-event.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {ChartModule} from 'primeng/chart';
import {InplaceModule} from 'primeng/inplace';
import {CardModule} from 'primeng/card';
import { CommandeComponent } from './components/commande/commande.component';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { StocksComponent } from './components/stocks/stocks.component';




FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
])
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    DateComponent,
    AddEventComponent,
    LoginComponent,
    RegisterComponent,
    CommandeComponent,
    StocksComponent,


  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    GridModule,
    FlexLayoutModule,
    MatTableExporterModule,
    FlexModule,
    MatTooltipModule,
    MatInputModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    ScrollingModule,
    FormsModule,
    FullCalendarModule,
    MatSnackBarModule,
    ChartModule,
    InplaceModule,
    CardModule,
    DialogModule, 
    CheckboxModule,
    InplaceModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule
  ],
  providers: [
    DatePipe, ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
