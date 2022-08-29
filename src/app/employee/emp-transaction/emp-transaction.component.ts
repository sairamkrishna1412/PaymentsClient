import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'pp-emp-transaction',
  templateUrl: './emp-transaction.component.html',
  styleUrls: ['./emp-transaction.component.css']
})
export class EmpTransactionComponent implements OnInit {

  empTransactionForm = this.formBuilder.group({
    customerId: "83020817828620",
    receiverAccountHolderNumber: "71319440983198",
    senderBic: "ABBLINBBXXX",
    receiverBic: "ACBLINBBXXX",
    currencyAmount: "123"
  });
  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // console.warn('Your order has been submitted', this.empTransactionForm.value);
    this.empService.transferCtc(this.empTransactionForm.value).subscribe({
      next : (data) => {
        if(data.status == 200){
          data = data.data;
          console.log("successful", data);
          this.router.navigate(["/emp/dashboard"]);
          this.empTransactionForm.reset();
        }
      },
      error : (err) => {
        console.log("error", err);
      }
    });
  }
}
