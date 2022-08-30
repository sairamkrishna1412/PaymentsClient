import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

let firstLoad = true;
@Component({
  selector: 'pp-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  empName: string = 'Vikram';
  empData: any;
  user: any;
  pendingTransactions: any = [];
  finalizedTransactions: any = [];
  constructor(private empService: EmployeeService, private router: Router) {}

  addTofinalizedTransactions(transaction: object) {
    this.finalizedTransactions.unshift(transaction);
  }

  onFinalize(transactionId: string, isAccepted: boolean) {
    console.log('heread');
    let data: any;
    if (isAccepted) {
      data = {
        transactionId,
        employeeRemarks: 'Secure transaction',
        status: 'ACCEPTED',
      };
    } else {
      data = {
        transactionId,
        employeeRemarks: 'Employee fought with wife.',
        status: 'REJECTED',
      };
    }
    console.log(data);
    this.empService.finalizeTransaction(data).subscribe({
      next: (resData) => {
        if (resData.status == 200) {
          console.log(resData);
          resData = resData.data;
          Swal.fire({
          icon: 'success',
          title:'Done',
          text: `Transaction ${data.status.toLowerCase()}`,
          }).then((result) => {
            window.location.reload();
            // this.router.navigate(['/emp/dashboard']);
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message,
        }).then((result) => {
            window.location.reload();
            // this.router.navigate(['/emp/dashboard']);
          });;
      },
    });
  }

  ngOnInit(): void {
    this.empData = this.empService.userData;
    if (
      this.empData.hasOwnProperty('user') &&
      this.empData.hasOwnProperty('pendingTransactions') &&
      this.empData.hasOwnProperty('finalizedTransactions') && 
      firstLoad
    ) {
      firstLoad = false;
      this.user = this.empData.user;
      this.pendingTransactions = this.empData.pendingTransactions.sort((a:any,b:any)=> b.transferDate - a.transferDate);
      this.finalizedTransactions = this.empData.finalizedTransactions.sort((a:any,b:any)=> b.transferDate - a.transferDate);
      console.log(
        this.user,
        this.pendingTransactions,
        this.finalizedTransactions
      );
    } else {
      // make a request to get user details
      this.empService.getMe().subscribe({
        next: (data) => {
          if (data.status == 200) {
            data = data.data;
            if (
              data.hasOwnProperty('user') &&
              data.hasOwnProperty('pendingTransactions') &&
              data.hasOwnProperty('finalizedTransactions')
            ) {
              this.user = data.user;
              this.pendingTransactions = data.pendingTransactions.sort((a:any,b:any)=> b.transferDate - a.transferDate);
              this.finalizedTransactions = data.finalizedTransactions.sort((a:any,b:any)=> b.transferDate - a.transferDate);
            }
          }
        },
        error: (err) => {
          console.log('error', err);
          let text = 'Something went wrong!';
          if (err.error.status == 403) {
            text = 'You are not allowed to this page!';
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text,
          }).then((result) => {
            if (result.isConfirmed && err.error.status == 403) {
              this.router.navigate(['/cust/dashboard']);
            }
          });
        },
      });
    }
    // console.log(this.empData);
    // this.empDetails =
  }
}
