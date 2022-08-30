import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

let firstLoad = true;
@Component({
  selector: 'pp-cust-dashboard',
  templateUrl: './cust-dashboard.component.html',
  styleUrls: ['./cust-dashboard.component.css'],
})
export class CustDashboardComponent implements OnInit {
  userData: any;
  user: any;
  pendingTransactions: any;
  completedTransactions: any;

  constructor(private custService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.userData = this.custService.userData;
    if (
      this.userData.hasOwnProperty('user') &&
      this.userData.hasOwnProperty('transactions')
      && firstLoad
    ) {
      firstLoad = false;
      this.user = this.userData.user;
      this.pendingTransactions = this.userData.transactions.filter(
        (t: any) => t.status == 'PENDING'
      ).sort((a:any,b:any)=> a.transferDate - b.transferDate);
      this.completedTransactions = this.userData.transactions.filter(
        (t: any) => t.status == 'ACCEPTED' || t.status == 'REJECTED'
      ).sort((a:any,b:any)=> a.transferDate - b.transferDate);
      console.log(
        this.user,
        this.pendingTransactions,
        this.completedTransactions
      );
    } else {
      // make a request to get user details
      this.custService.getMe().subscribe({
        next: (data) => {
          if (data.status == 200) {
            console.log(data);
            data = data.data;
            if (
              data.hasOwnProperty('user') &&
              data.hasOwnProperty('transactions')
            ) {
              this.user = data.user;
              this.pendingTransactions = data.transactions.filter(
                (t: any) => t.status == 'PENDING'
              ).sort((a:any,b:any)=> a.transferDate - b.transferDate);
              this.completedTransactions = data.transactions.filter(
                (t: any) => t.status == 'ACCEPTED' || t.status == 'REJECTED'
              ).sort((a:any,b:any)=> a.transferDate - b.transferDate);
              console.log(
                this.user,
                this.pendingTransactions,
                this.completedTransactions
              );
            }
          }
        },
        error: (err) => {
          console.log('error', err);
          let text = 'Something went wrong!';
          if (err.error.status == 403) {
            text = 'You are not allowed to this page!';
          } else {
            text = err.error.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text,
          }).then((result) => {
            if (result.isConfirmed && err.error.status == 403) {
              this.router.navigate(['/emp/dashboard']);
            }
          });
        },
      });
    }
  }
}
