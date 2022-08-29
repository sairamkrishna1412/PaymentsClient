import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustDashboardComponent } from './customer/cust-dashboard/cust-dashboard.component';
import {CustTransactionComponent } from './customer/cust-transaction/cust-transaction.component';
import { EmpDashboardComponent } from './employee/emp-dashboard/emp-dashboard.component';
import { EmpTransactionComponent } from './employee/emp-transaction/emp-transaction.component';
import { HomeComponent } from './general/home/home.component';
import { LoginComponent } from './general/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path: 'logout', component:HomeComponent},
  { path: 'emp/dashboard', component: EmpDashboardComponent },
  { path: 'emp/transaction', component: EmpTransactionComponent },
  { path: 'cust/dashboard', component: CustDashboardComponent },
  {path: 'cust/transaction', component: CustTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
