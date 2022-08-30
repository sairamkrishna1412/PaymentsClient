import Swal from 'sweetalert2';
import { GeneralService } from './../../general/general.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'pp-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css'],
})
export class DashHeaderComponent implements OnInit {
  @Input() class: string = '';
  constructor(private generalService: GeneralService, private router: Router) {}

  onLogout() {
    this.generalService.logoutUser().subscribe({
      next: (data) => {
        console.log(data);
        if (data.status == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Done!',
            text: 'Logout Successful!',
          }).then((result: any) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/']);
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}
}
