import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Request } from '../../request';

@Component({
  selector: 'app-request-list-grant',
  templateUrl: './request-list-grant.component.html',
  styleUrls: ['./request-list-grant.component.scss']
})
export class RequestListGrantComponent implements OnInit {

  // receive requests from dashboard and emit approve and decline operations
  @Input() requests;
  @Input() dashboardStatus;
  @Input() pageSize;
  @Input() pageIndex;
  @Output() requestGranted = new EventEmitter<Request>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() sortData = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
