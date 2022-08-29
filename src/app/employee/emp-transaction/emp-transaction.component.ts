import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
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
    customerId: ['83020817828620', Validators.required],
    receiverAccountHolderNumber: ['71319440983198', Validators.required],
    senderBic: ['ABBLINBBXXX', Validators.required],
    receiverBic: ['ACBLINBBXXX', Validators.required],
    currencyAmount: ['123', Validators.required]
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
