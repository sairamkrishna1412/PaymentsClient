import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'pp-emp-transaction',
  templateUrl: './emp-transaction.component.html',
  styleUrls: ['./emp-transaction.component.css']
})
export class EmpTransactionComponent implements OnInit {

  empTransactionForm = this.formBuilder.group({
    customerId: "",
    receiverAccountHolderNumber: "",
    senderBic: "",
    receiverBic: "",
    currencyAmount: ""
  });
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.empTransactionForm.value);
    this.empTransactionForm.reset();
  }


}
