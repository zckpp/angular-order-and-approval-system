import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject} from 'rxjs';
import {cookie_settings} from "./app_settings";

@Injectable({
  providedIn: 'root'
})
export class CookieAuthService {
  cookie_name: BehaviorSubject<string>;
  cookie_role: BehaviorSubject<string>;

  constructor(private cookieService: CookieService) {
    this.cookie_name = new BehaviorSubject(this.cookieService.get(cookie_settings.name).replace('+', ' '));
    this.cookie_role = new BehaviorSubject(this.cookieService.get(cookie_settings.role));
  }
}
