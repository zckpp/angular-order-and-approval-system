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
  API_SERVER = "http://localhost:3000/orders";

  constructor(private httpClient: HttpClient) {
  }

  readRequests(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(this.API_SERVER).pipe(
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
    return this.httpClient.post<Object>(this.API_SERVER, request);
  }

  searchRequests(term: string): Observable<Request[]> {
    return this.httpClient.post<Request[]>(`${this.API_SERVER}/read.php`, term).pipe(
      // sort by granted date
      tap(requests => {
        requests.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      })
    );
  }

  updateRequest(request: Request) {
    return this.httpClient.put<Request>(`${this.API_SERVER}/update.php`, request);
  }

  deleteRequest(id: number) {
    return this.httpClient.delete<Request>(`${this.API_SERVER}/delete.php/?id=${id}`);
  }

  readCategories(): Observable<CategoryGroup[]> {
    return this.httpClient.get<any>(`${this.API_SERVER}/readCategory.php`).pipe(
      // sort alphabetically by category
      tap(categoryGroups => {
        categoryGroups.forEach(function (categoryGroup) {
          categoryGroup.category.sort((a, b) => {
            if (a.label < b.label) {
              return -1;
            }
            if (a.label > b.label) {
              return 1;
            }
            return 0;
          });
        });
      })
    );
  }

}
