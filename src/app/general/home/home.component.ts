import { GeneralService } from './../general.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLive: any;
  sub! : Subscription

  constructor(private generalService: GeneralService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.generalService.getIsLive().subscribe({
      next: (data) => {
        console.log(data);
        this.isLive = data.data.isLive;
      },
    });
  }
}
