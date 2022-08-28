import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './general/login/login.component';
import { EmpDashboardComponent } from './employee/emp-dashboard/emp-dashboard.component';
import { EmpTransactionComponent } from './employee/emp-transaction/emp-transaction.component';
import { CustDashboardComponent } from './customer/cust-dashboard/cust-dashboard.component';
import { CustTransactionComponent } from './customer/cust-transaction/cust-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EmpDashboardComponent,
    EmpTransactionComponent,
    CustDashboardComponent,
    CustTransactionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
