import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {CookieAuthService} from '../cookie-auth.service';
import {role_settings} from "../app_settings";
import {Observable} from "rxjs";
import {Inventory} from "../inventory";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  // local variable for cookie auth settings
  auth: {
    name: string,
    role: string
  }
  // local variable for user roles settings
  role: {
    admin: string
  }
  // read inventory from database
  inventory$: Observable<Inventory[]>;
  // ag-grid variables
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieAuthService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.inventory$ = this.apiService.readItems();
    this.auth = {
      name: 'invalid',
      role: 'invalid'
    };
    // get cookie value from cookieAuth service
    this.cookieService.cookie_name.subscribe(name => {
        this.auth.name = name;
      }
    );
    this.cookieService.cookie_role.subscribe(role => {
        this.auth.role = role;
      }
    );
    // get user roles settings
    this.role = {
      admin: role_settings.admin
    }

    // init ag grid
    this.columnDefs = [
      {headerName: 'Created Date', field: 'createdAt', sortable: true},
      {headerName: 'Item ID (editable)', field: 'item_id', sortable: true, editable: true},
      {headerName: 'Item Name', field: 'item_name', sortable: true},
      {headerName: 'Unit Price', field: 'item_unit_price', sortable: true, valueFormatter: currencyFormatter},
      {headerName: 'Supervisor', field: 'manager', sortable: true},
      {headerName: 'Requester', field: 'requester', sortable: true},
    ];
    this.defaultColDef = {
      resizable: true
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  onCellValueChanged(event) {
    if (event.oldValue !== event.newValue) {
      this.apiService.updateItem(event.data).subscribe((response: any) => {
        console.log(response);
        // if succeed, then update request list view
        if (response.status == 200) {
          // set up snackBar pop up
          this.snackBar.open('Item is updated successfully!', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'approve'
          });
        } else {
          alert("Operation failed on database, please try again or contact admin.");
          window.location.reload();
        };
      });
    }
  }
}
// currency formatter for ng-grid
function currencyFormatter(params) {
  return "$" + formatNumber(params.value);
}
function formatNumber(number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
