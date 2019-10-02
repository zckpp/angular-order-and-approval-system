import {Component} from '@angular/core';
import {role_settings} from "./app_settings";
import {CookieAuthService} from './cookie-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideOpen: boolean;
  auth_role: string;
  // local variable for user roles settings
  role: {
    manager: string,
    accounting: string,
    admin: string
  }

  constructor(
    private cookieService: CookieAuthService,
  ) {
    this.auth_role = 'invalid';
    // get cookie value from cookieAuth service
    this.cookieService.cookie_role.subscribe(role => {
        this.auth_role = role;
      }
    );
    // get user roles settings
    this.role = {
      manager: role_settings.manager,
      accounting: role_settings.accounting,
      admin: role_settings.admin
    }
  }
}
