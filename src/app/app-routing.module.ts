import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormRequestComponent} from './form-request/form-request.component'
import {InventoryComponent} from "./inventory/inventory.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  // { path: 'dashboard-search', component: SearchComponent },
  {path: 'form', component: FormRequestComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: '', redirectTo: '/form', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
