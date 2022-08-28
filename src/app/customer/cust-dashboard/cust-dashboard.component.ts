import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-cust-dashboard',
  templateUrl: './cust-dashboard.component.html',
  styleUrls: ['./cust-dashboard.component.css'],
})
export class CustDashboardComponent implements OnInit {
  custName: string = 'Rolex';
  custBalance: number = 2300.0;

  constructor() {}

  ngOnInit(): void {}
}
