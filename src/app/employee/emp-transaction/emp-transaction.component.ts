import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'pp-emp-transaction',
  templateUrl: './emp-transaction.component.html',
  styleUrls: ['./emp-transaction.component.css']
})
export class EmpTransactionComponent implements OnInit {

  empTransactionForm = this.formBuilder.group({
    customerId: ['', Validators.required],
    receiverAccountHolderNumber: ['', Validators.required],
    senderBic: ['', Validators.required],
    receiverBic: ['', Validators.required],
    currencyAmount: ['', Validators.required],

  
  });

  

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.empTransactionForm.value);
    // if (this.empTransactionForm.value){
      this.sweetAlert()
    // }
    this.empTransactionForm.reset();
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
