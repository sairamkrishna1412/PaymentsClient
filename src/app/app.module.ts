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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './general/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EmpDashboardComponent,
    EmpTransactionComponent,
    CustDashboardComponent,
    CustTransactionComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
