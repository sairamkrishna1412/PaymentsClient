import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'pp-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {

  empName: string = 'Vikram';
  empData : any;
  user : any;
  pendingTransactions : any = [];
  finalizedTransactions : any = [];
  constructor(private empService: EmployeeService) {}

  addTofinalizedTransactions(transaction : object){
    this.finalizedTransactions.unshift(transaction);
  }

  onFinalize(transactionId : string, isAccepted:boolean){
    console.log("heread");
    let data;
    if(isAccepted){
     data = {
        transactionId,
        employeeRemarks : "Secure transaction",
        status : "ACCEPTED"
      }
    }else{
      data = {
        transactionId,
        employeeRemarks : "Employee fought with wife.",
        status : "REJECTED"
      }
    }
    console.log(data);
    this.empService.finalizeTransaction(data).subscribe({
      next : (data) => {
        if(data.status == 200){
          console.log(data);
          data = data.data;
        }
      },
      error: (err) => {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message,
        })
      }
    });
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
        error: (err) => {
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          })
        }
      })
    }
    // console.log(this.empData);
    // this.empDetails = 
  }
}
