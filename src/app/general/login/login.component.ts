import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from 'src/app/customer/customer.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { GeneralService } from '../general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username:  '',
    password: ''
  });

  constructor(private generalService : GeneralService,
    private customerService : CustomerService,
    private employeeService : EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    console.log('Login form submitted', this.loginForm.value);
    this.generalService.loginUser(this.loginForm.value).subscribe({
      next : (data) => {
        if(data.status == 200){
          if(data.data?.hasOwnProperty("roles")){
            const role = data.data.roles;
            if(role == "employee"){
              this.employeeService.userData = data.data;
              this.router.navigate(['/emp/dashbaord']);
            }else{
              this.customerService.userData = data.data;
              this.router.navigate(['/cust/dashbaord']);
            }
          }
        }
        console.log("User log in response: ", data);
      },
      error : (err) => {
        console.log("err : ", err);
      }
    });
  }

  
}
