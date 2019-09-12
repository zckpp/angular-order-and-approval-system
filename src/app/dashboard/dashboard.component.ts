import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Request} from '../request';
import {map, tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from "rxjs";
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {cookie_settings} from "../cookie_settings";
import {RequestDetailComponent} from "./request-detail/request-detail.component";

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
  auth: string = null;
  user_email: string;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    // start with request list with pending status
    this.changeStatus('pending');
    this.auth = this.cookieService.get(cookie_settings.auth);
    console.log(this.auth);
    this.user_email = this.cookieService.get('email_cookie');
  }

  // methods
  updateRequest(request: Request, value) {
    request.status = value;
    // use any here so that the condition statement won't generate error
    this.apiService.updateRequest(request).subscribe((response: any) => {
      // status response configured in php app
      console.log(response);
      // if succeed, then update request list view
      if (response.status == "succeed") {
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
        }
      } else alert("Operation failed on database, please try again.");
    });
  }

  approveRequest(request: Request) {
    this.updateRequest(request, 'approved');
  }

  declineRequest(request: Request) {
    this.updateRequest(request, 'declined');
  }

  // get different view based on status then pass it down to request list display
  changeStatus(status) {
    this.requests$ = this.apiService.readRequests().pipe(
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
                return compare(a.order_requester, b.order_requester, isAsc);
              case 'order_vendor':
                return compare(a.order_vendor, b.order_vendor, isAsc);
              case 'order_manager_note':
                return compare(a.order_manager_note, b.order_manager_note, isAsc);
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

  // Mat dialog for view request detail
  openDialog(request: any): void {
    const dialogRef = this.dialog.open(RequestDetailComponent, {
      width: '950px',
      data: request
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.updateRequest(result, 'note');
      }
    });
  }
}
