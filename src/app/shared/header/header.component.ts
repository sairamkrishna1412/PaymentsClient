import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() class: string = '';
  constructor() {}

  ngOnInit(): void {}
}
