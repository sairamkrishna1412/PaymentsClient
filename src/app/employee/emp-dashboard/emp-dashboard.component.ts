import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'pp-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  empData : any;
  user : any;
  pendingTransactions : any = [];
  finalizedTransactions : any = [];
  constructor(private empService: EmployeeService) {}

  addTofinalizedTransactions(transaction : object){
    this.finalizedTransactions.unshift(transaction);
  }

  ngOnInit(): void {
    this.empData = this.empService.userData;
    if(this.empData.hasOwnProperty('user') 
    && this.empData.hasOwnProperty('pendingTransactions') 
    && this.empData.hasOwnProperty('finalizedTransactions')){
      this.user = this.empData.user;
      this.pendingTransactions = this.empData.pendingTransactions;
      this.finalizedTransactions = this.empData.finalizedTransactions;
      console.log(this.user, this.pendingTransactions, this.finalizedTransactions);
    }else{
      // make a request to get user details
      this.empService.getMe().subscribe({
        next : (data) => {
          if(data.status == 200){
            data = data.data;
            if(data.hasOwnProperty('user') 
              && data.hasOwnProperty('pendingTransactions') 
              && data.hasOwnProperty('finalizedTransactions')){
                this.user = data.user;
                this.pendingTransactions = data.pendingTransactions;
                this.finalizedTransactions = data.finalizedTransactions;
            }
          }
        },
        error : (err) => {console.log(err)}
      })
    }
    // console.log(this.empData);
    // this.empDetails = 
  }
}
