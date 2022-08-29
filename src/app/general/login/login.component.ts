import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from 'src/app/customer/customer.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { GeneralService } from '../general.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'pp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username:  'akrishnamohan',
    password: '1234'
  });

  constructor(private generalService : GeneralService,
    private customerService : CustomerService,
    private employeeService : EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    console.log('Login form submitted', this.loginForm.value);
    this.generalService.loginUser(this.loginForm.value).subscribe({
      next : (data) => {
        if(data.status == 200){
          if(data.data?.user){
            const role = data.data.user.roles;
            if(role == "employee"){
              this.employeeService.userData = data.data;
              this.router.navigate(['/emp/dashboard']);
            }else if(data.data.user.hasOwnProperty("customerId")){
              this.customerService.userData = data.data;
              this.router.navigate(['/cust/dashboard']);
            }
            
            // document.cookie = `jwt=${data.data.jwt}; expires=${new Date(Date.now() + 1000*60*60*10)}; Domain=localhost; SameSite=None;`;
          }
        }
        console.log("User log in response: ", data);
      },
      error : (err) => {
        // console.log("err : ", err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Credentials!',
          })
      }
    });
  }

  
}
