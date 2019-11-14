import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from './request';
import {Inventory} from "./inventory";
import {Observable, timer} from 'rxjs';
import {tap, map, retryWhen, delayWhen} from 'rxjs/operators';
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // ORDER_API = 'http://localhost:3000/orders';
  // ITEM_API = 'http://localhost:3000/items';
  // VENDOR = 'http://localhost:4200/assets/vendors.json';

  ORDER_API = 'https://hq-web4.carnegiescience.edu:3000/orders';
  ITEM_API = 'https://hq-web4.carnegiescience.edu:3000/items';
  VENDOR = './assets/vendors.json';

  // "Request" means the gas cylinder order, which can contain multiple cylinders, the "Item" means each gas cylinder record generated from the order.
  constructor(private httpClient: HttpClient) {
  }

  readRequests(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(this.ORDER_API).pipe(
      // sort by created date
      tap(requests => {
        requests.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        });
      }),
      retryWhen(errors => {
        return errors
          .pipe(
            delayWhen(() => timer(2000)),
            tap(() => console.log('retrying...'))
          );
      } )
    );
  }

  createRequest(request: Object): Observable<Object> {
    return this.httpClient.post<Object>(this.ORDER_API, request);
  }

  updateRequest(request: Request) {
    return this.httpClient.put<Request>(`${this.ORDER_API}/${request._id}`, request);
  }

  searchRequests(term: string): Observable<Request[]> {
    return this.httpClient.post<Request[]>(`${this.ORDER_API}/read.php`, term).pipe(
      // sort by granted date
      tap(requests => {
        requests.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      })
    );
  }

  deleteRequest(id: number) {
    return this.httpClient.delete<Request>(`${this.ORDER_API}/delete.php/?id=${id}`);
  }

  readVendors(): Observable<any> {
    return this.httpClient.get<any>(this.VENDOR).pipe();
  }

  readItems(): Observable<Inventory[]> {
    return this.httpClient.get<Inventory[]>(this.ITEM_API).pipe(
      // sort by created date
      tap(items => {
        items.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        });
      }),
      tap(items => {
        return items.map(item => {
          return item.createdAt = dateFormatter(item.createdAt);
        })
      }),
      retryWhen(errors => {
        return errors
          .pipe(
            delayWhen(() => timer(2000)),
            tap(() => console.log('retrying...'))
          );
      } )
    );
  }

  createItems(request: Object): Observable<Object> {
    return this.httpClient.post<Object>(this.ITEM_API, request);
  }

  updateItem(item: Inventory) {
    return this.httpClient.put<Inventory>(`${this.ITEM_API}/${item._id}`, item);
  }
}
// format date here for inventory component that uses ag grid
function dateFormatter(date) {
  const format = 'short';
  const locale = 'en-US';
  const formattedDate = formatDate(date, format, locale);
  return formattedDate;
}
