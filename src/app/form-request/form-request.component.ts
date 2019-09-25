import {Component, OnInit} from '@angular/core';
import {managers, Manager} from '../manager';
import {FormControl, Validators, FormBuilder, FormArray, FormGroup} from '@angular/forms';
import {Observable,} from 'rxjs';
import {map, startWith, debounceTime, tap, distinctUntilChanged, filter, switchMap, mergeMap} from 'rxjs/operators';
import {ApiService} from '../api.service';

// making sure user choose from the manager list
export function validateManager(input: FormControl) {
  const managerName = input.value;
  for (let manager of managers) {
    if (manager.name == managerName) return null;
  }
  return {notInList: true};
}

@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss']
})
export class FormRequestComponent implements OnInit {

  requestForm: FormGroup;
  items: FormArray;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
  }

  // variables
  // import manager and category field data
  managers: Manager[] = managers;
  vendors$: Observable<any>;
  // init autocomplete field: manager
  filteredOptions: Observable<Manager[]>;
  // variable if request is successfully submitted
  succeed: boolean = null;

  ngOnInit() {
    this.vendors$ = this.apiService.readVendors();

    this.requestForm = this.fb.group({
      requester: ['', Validators.required],
      requester_phone: ['', Validators.required],
      vendor: this.fb.group({
        vendor_name: [''],
        vendor_address: [''],
        vendor_phone: [''],
        vendor_fax: ['']
      }),
      manager: ['', [Validators.required, validateManager]],
      shipment_cost: [''],
      total_cost: [{value: ''}],
      authorized: [''],
      po: [''],
      payment_terms: [''],
      accounts: [''],
      order_items: this.fb.array([this.createItem()]),
      status: [''],
    });

    this.filteredOptions = this.requestForm.get('manager').valueChanges.pipe(
      startWith<string | Manager>(""),
      debounceTime(500),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.managers.slice()),
    );

    // auto calculate total price, and init total price with 0 otherwise it will show [object object]
    this.calculateTotalPrice();
    this.vendorInfo();
    this.requestForm.get('total_cost').setValue(0, {emitEvent: false});
  }

  // methods
  // manager field auto-complete method
  private _filter(name: string): Manager[] {
    const filterValue = name.toLowerCase();
    return this.managers.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }

  // dynamically add order fields
  createItem(): FormGroup {
    return this.fb.group({
      order_name: '',
      order_quantity: '',
      order_unit_price: '',
      order_description: ''
    });
  }
  addItem(): void {
    this.items = this.requestForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  // auto fill vendor info
  vendorInfo() {
    this.requestForm.get('vendor.vendor_name').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => this.vendors$.pipe(
        // TODO: tried using filter instead of map but did not work
        map(vendors => {
          return vendors.filter(vendor => {
            return vendor.vendor_name == value
          })[0];
        })
        )
      )
    ).subscribe(val => {
      this.requestForm.get('vendor.vendor_address').setValue(val.vendor_address, {emitEvent: false});
      this.requestForm.get('vendor.vendor_phone').setValue(val.vendor_phone, {emitEvent: false});
      this.requestForm.get('vendor.vendor_fax').setValue(val.vendor_fax, {emitEvent: false});
    });
  }

  // calculate total price when value of order cost or shipment cost changes
  calculateTotalPrice() {
    this.requestForm.get('order_items').valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(val => this.totalPrice());
    this.requestForm.get('shipment_cost').valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(val => this.totalPrice());
  }
  totalPrice() {
    let cost = 0;
    this.requestForm.get('order_items').value.forEach(item => {
      cost += item.order_quantity * item.order_unit_price;
    });
    cost += this.requestForm.get('shipment_cost').value;
    // Use emitEvent: false option to avoid triggering form valueChanges
    this.requestForm.get('total_cost').setValue(cost, {emitEvent: false});
  }

  // form on submit
  onSubmit() {
    let newRequest = this.requestForm.value;
    newRequest.status = 'pending';
    console.log(newRequest);
    this.apiService.createRequest(newRequest).subscribe((response: any) => {
      // status response configured in php app
      console.log(response.status);
      // if succeed, display success alert
      if (response.status == 200) {
        this.succeed = true;
        // refresh page in 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else this.succeed = false;
    });
  }
}
