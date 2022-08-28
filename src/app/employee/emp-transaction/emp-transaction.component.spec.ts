import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTransactionComponent } from './emp-transaction.component';

describe('EmpTransactionComponent', () => {
  let component: EmpTransactionComponent;
  let fixture: ComponentFixture<EmpTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
