import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() requestApproved = new EventEmitter<any>();
  @Output() requestDeclined = new EventEmitter<any>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() sortData = new EventEmitter<any>();
  @Output() viewDetail = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
}
