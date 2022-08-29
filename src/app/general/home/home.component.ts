import { GeneralService } from './../general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLive: any;

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.generalService.getIsLive().subscribe({
      next: (data) => {
        console.log(data);
        this.isLive = data.data.isLive;
      },
    });
  }
}
