import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  empName: string = 'Vikram';
  constructor() {}

  ngOnInit(): void {}
}
