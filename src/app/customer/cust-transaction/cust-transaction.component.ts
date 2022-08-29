import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'pp-cust-transaction',
  templateUrl: './cust-transaction.component.html',
  styleUrls: ['./cust-transaction.component.css']
})
export class CustTransactionComponent implements OnInit {
  custTransactionForm = this.formBuilder.group({
    receiverAccountHolderNumber: ['', Validators.required],
    receiverBic:['', Validators.required],
    currencyAmount: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your transaction has been submitted', this.custTransactionForm.value);
    this.sweetAlert();
    this.custTransactionForm.reset();
  }


  sweetAlert() {
    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, proceed!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Transaction Successful!',
        'Your transaction has been recorded.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your transaction has been cancelled :)',
        'error'
      )
    }
  })
  }
}
