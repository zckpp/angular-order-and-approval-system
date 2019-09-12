import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Request } from '../request';
import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {cookie_settings} from "../cookie_settings";
import {Sort} from "@angular/material";

@Component({
  selector: 'app-dashboard-grant',
  templateUrl: './dashboard-grant.component.html',
  styleUrls: ['./dashboard-grant.component.scss']
})
export class DashboardGrantComponent implements OnInit {

  // variables

  // postfix dollar sign for observables
  requests$: Observable<Request[]>;
  dashboardStatus: string;
  auth: string = null;
  user_email: string;

  constructor(
      private apiService: ApiService,
      private cookieService: CookieService,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // start with request list with pending status
    this.requests$ = this.getRequest();
    this.changeStatus("approved");
    this.auth = this.cookieService.get(cookie_settings.auth);
    console.log(this.auth);
    this.user_email = this.cookieService.get('email_cookie');
  }

  // methods
  // only need status with "approved" or "granted"
  getRequest() {
    return this.apiService.readRequests().pipe(
        map(
            (requests) => {
              return requests.filter((request) => { return (request.status.includes('granted') || request.status.includes('approved')); });
            }
        ),
    );
  }

  updateRequest(request: Request, value){
    request.id = request.id;
    request.status = value;
    // use any here so that the condition statement won't generate error
    this.apiService.updateRequest(request).subscribe((response: any) => {
      // status response configured in php app
      console.log(response);
      // if succeed, then update request list view
      if (response.status == "succeed") {
        this.changeStatus(this.dashboardStatus);
        this.snackBar.open('Request is granted!', 'close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'grant'
        });
      }
      else alert("Operation failed on database, please try again.");
    });
  }

  grantRequest(request: Request){
    this.updateRequest(request, 'granted');
  }

  // get different view based on status then pass it down to request list display
  changeStatus(status) {
    this.requests$ = this.getRequest().pipe(
        map(
            (requests) => {
              return requests.filter((request) => { return request.status.includes(status); });
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
              case 'created_date': return compare(a.created_date, b.created_date, isAsc);
              case 'first_name': return compare(a.first_name, b.first_name, isAsc);
              case 'last_name': return compare(a.last_name, b.last_name, isAsc);
              case 'category': return compare(a.category, b.category, isAsc);
              default: return 0;
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
