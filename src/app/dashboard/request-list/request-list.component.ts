import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import {role_settings} from "../../app_settings";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})

export class RequestListComponent implements OnInit {

  // receive requests from dashboard and emit approve and decline operations
  @Input() requests;
  @Input() dashboardStatus;
  @Input() pageSize;
  @Input() pageIndex;
  @Input() authRole;
  @Output() requestApproved = new EventEmitter<any>();
  @Output() requestDeclined = new EventEmitter<any>();
  @Output() requestComplete = new EventEmitter<any>();
  @Output() addToInventory = new EventEmitter<any>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() sortData = new EventEmitter<any>();
  @Output() viewDetail = new EventEmitter<any>();

  role: {
    manager: string,
    accounting: string,
    admin: string
  }

  constructor() { }

  ngOnInit() {
    // get user roles settings
    this.role = {
      manager: role_settings.manager,
      accounting: role_settings.accounting,
      admin: role_settings.admin
    }
  }
}
