import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Request} from '../request';
import {map, tap} from 'rxjs/operators';
import {CookieAuthService} from '../cookie-auth.service';
import {Observable} from "rxjs";
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {role_settings} from "../app_settings";
import {RequestDetailComponent} from "./request-detail/request-detail.component";
import {RequestManagerNoteComponent} from "./request-manager-note/request-manager-note.component";
import {RequestAccountingNoteComponent} from "./request-accounting-note/request-accounting-note.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // variables
  // postfix dollar sign for observables
  requests$: Observable<Request[]>;
  dashboardStatus: string;
  // local variable for cookie auth settings
  auth: {
    name: string,
    role: string
  }
  // local variable for user roles settings
  role: {
    manager: string,
    accounting: string,
    admin: string
  }
  user_email: string;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieAuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.auth = {
      name: 'invalid',
      role: 'invalid'
    }
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
      manager: role_settings.manager,
      accounting: role_settings.accounting,
      admin: role_settings.admin
    }
    // start with request list with pending for manger and approved for accounting
    if (this.auth.role === this.role.manager || this.auth.role === this.role.admin) this.changeStatus('pending');
    else if (this.auth.role === this.role.accounting) this.changeStatus('approved');
    console.log(this.auth);
  }

  // methods
  updateRequest(request: Request, value) {
    request.status = value;
    // use any here so that the condition statement won't generate error
    this.apiService.updateRequest(request).subscribe((response: any) => {
      console.log(response);
      // if succeed, then update request list view
      if (response.status == 200) {
        this.changeStatus(this.dashboardStatus);
        // set up snackBar pop up
        if ('approved' === value) {
          this.snackBar.open('Request is approved!', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'approve'
          });
        } else if ('declined' === value) {
          this.snackBar.open('Request is declined!', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'decline'
          });
        } else if ('complete' === value) {
          this.snackBar.open('Request is complete!', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: 'approve'
          });
        }
      } else alert("Operation failed on database, please try again.");
    });
  }

  declineRequest(request: Request) {
    this.updateRequest(request, 'declined');
  }

  // get different view based on status then pass it down to request list display
  changeStatus(status) {
    this.requests$ = this.apiService.readRequests().pipe(
      map(
        (requests) => {
          // filter by manager's name
          if (this.auth.role == this.role.manager) {
            return requests.filter((request) => {
              return request.manager == this.auth.name;
            });
          } else return requests;
        }
      ),
      map(
        (requests) => {
          return requests.filter((request) => {
            return request.status.includes(status);
          });
        }
      ),
    );
    this.dashboardStatus = status;
  }

  // generate individual purchased items from order request
  addItems(request: Request): void {
    this.apiService.createItems(request).subscribe((response: any) => {
      console.log(response);
      // if succeed, then update request list view
      if (response.status == 200) {
        this.changeStatus(this.dashboardStatus);
        this.snackBar.open('Items from order request ares generated!', 'close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'approve'
        });
      } else alert("Operation failed on database, please try again.");
    });
  }

  // Mat dialog for view request detail
  openDialog(request: Request): void {
    const dialogRef = this.dialog.open(RequestDetailComponent, {
      width: '1000px',
      data: request
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Mat dialog for approve request with adding a manager note
  approveRequest(request: Request): void {
    const dialogRefNote = this.dialog.open(RequestManagerNoteComponent, {
      width: '1000px',
      data: request
    });
    dialogRefNote.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.updateRequest(result, 'approved');
      }
    });
  }

  // Mat dialog for accounting adding info and complete the request
  completeRequest(request: Request): void {
    const dialogRefNote = this.dialog.open(RequestAccountingNoteComponent, {
      width: '1000px',
      data: request
    });
    dialogRefNote.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.updateRequest(result, 'complete');
      }
    });
  }

  // Mat Sort
  sortDataControl(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    this.requests$ = this.requests$.pipe(
      tap(
        requests => {
          requests.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
              case 'createdAt':
                return compare(a.createdAt, b.createdAt, isAsc);
              case 'order_requester':
                return compare(a.requester, b.requester, isAsc);
              case 'order_vendor':
                return compare(a.vendor.vendor_name, b.vendor.vendor_name, isAsc);
              case 'order_manager_note':
                return compare(a.manager_note, b.manager_note, isAsc);
              default:
                return 0;
            }
          });
        }
      )
    );
  }

  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];

}
