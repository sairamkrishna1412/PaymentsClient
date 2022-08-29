import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pp-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit {
  @Input() class: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
