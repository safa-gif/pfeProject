import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';
import { HttpClientModule } from '@angular/common/http';
import { DataserviceService } from './services/dataservice.service';
import { StockComponent } from './components/stock/stock.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DateComponent } from './components/date/date.component';
import { ToastrModule } from 'ngx-toastr';

//Angular Material Imports
import {FlexLayoutModule} from '@angular/flex-layout';
import {GridModule} from '@angular/flex-layout/grid';
import {FlexModule} from '@angular/flex-layout/flex';
import { MatTableExporterModule } from 'mat-table-exporter';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
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
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataComponent,
    StockComponent,
    ProfileComponent,
    DateComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    // MatFormFieldModule,
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
    // A11yModule,
    // MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    // PortalModule,
    ScrollingModule,
  ],
  providers: [
    DataserviceService
  ],
  bootstrap: [AppComponent],
  // schemas : [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class AppModule { }
