import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'pp-cust-dashboard',
  templateUrl: './cust-dashboard.component.html',
  styleUrls: ['./cust-dashboard.component.css'],
})
export class CustDashboardComponent implements OnInit {
  custName: string = 'Rolex';
  custBalance: number = 2300.0;
  userData : any;
  user : any;
  pendingTransactions : any;
  completedTransactions : any;

  constructor(private custService: CustomerService) {}

  ngOnInit(): void {
    this.userData = this.custService.userData;
    if(this.userData.hasOwnProperty('user') 
    && this.userData.hasOwnProperty('transactions') ){
      this.user = this.userData.user;
      this.pendingTransactions = this.userData.transactions.filter((t : any) => t.status == "PENDING");
      this.completedTransactions = this.userData.transactions.filter((t : any) => t.status == "ACCEPTED" || t.status == "REJECTED");
      console.log(this.user, this.pendingTransactions, this.completedTransactions);
    }else{
      // make a request to get user details
      this.custService.getMe().subscribe({
        next : (data) => {
          if(data.status == 200){
            console.log(data);
            data = data.data;
            if(data.hasOwnProperty('user') 
              && data.hasOwnProperty('transactions') ){
              this.user = data.user;
              this.pendingTransactions = data.transactions.filter((t : any) => t.status == "PENDING");
              this.completedTransactions = data.transactions.filter((t : any) => t.status == "ACCEPTED" || t.status == "REJECTED");
              console.log(this.user, this.pendingTransactions, this.completedTransactions);
            }
          }
        },
        error : (err) => {console.log(err)}
      })
    }
}
}
