import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'pp-cust-transaction',
  templateUrl: './cust-transaction.component.html',
  styleUrls: ['./cust-transaction.component.css']
})
export class CustTransactionComponent implements OnInit {
  custTransactionForm = this.formBuilder.group({
    receiverAccountHolderNumber: "",
    receiverBic: "",
    currencyAmount: ""
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your transaction has been submitted', this.custTransactionForm.value);
    this.custTransactionForm.reset();
  }
}
