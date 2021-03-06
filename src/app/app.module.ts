import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CookieService} from 'ngx-cookie-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RequestListComponent} from './dashboard/request-list/request-list.component';
import {FormRequestComponent} from './form-request/form-request.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {SearchComponent} from './search/search.component';
import {RequestListSearchComponent} from './search/request-list-search/request-list-search.component';
import {FormCategoryComponent} from './form-category/form-category.component';
import {RequestDetailComponent} from './dashboard/request-detail/request-detail.component';
import {RequestManagerNoteComponent} from './dashboard/request-manager-note/request-manager-note.component';
import {RequestAccountingNoteComponent} from './dashboard/request-accounting-note/request-accounting-note.component';
import {AgGridModule} from 'ag-grid-angular';
import { InventoryComponent } from './inventory/inventory.component';
import { RequestManagerDeclineComponent } from './dashboard/request-manager-decline/request-manager-decline.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RequestListComponent,
    FormRequestComponent,
    SearchComponent,
    RequestListSearchComponent,
    FormCategoryComponent,
    RequestDetailComponent,
    RequestManagerNoteComponent,
    RequestAccountingNoteComponent,
    InventoryComponent,
    RequestManagerDeclineComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    AgGridModule.withComponents([]),
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  // Need to add mat dialog components here:
  entryComponents: [
    RequestDetailComponent,
    RequestManagerNoteComponent,
    RequestAccountingNoteComponent,
    RequestManagerDeclineComponent,
  ]
})
export class AppModule {
}
