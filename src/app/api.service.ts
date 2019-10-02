import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from './request';
import {CategoryGroup} from './category';
import {Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ORDER_API = 'http://localhost:3000/orders';
  ITEM_API = 'http://localhost:3000/items';
  VENDOR = 'http://localhost:4200/assets/vendors.json';
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
      })
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

  createItems(request: Object): Observable<Object> {
    return this.httpClient.post<Object>(this.ITEM_API, request);
  }
}
