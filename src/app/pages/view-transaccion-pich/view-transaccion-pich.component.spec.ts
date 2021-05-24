import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransaccionPichComponent } from './view-transaccion-pich.component';

describe('ViewTransaccionPichComponent', () => {
  let component: ViewTransaccionPichComponent;
  let fixture: ComponentFixture<ViewTransaccionPichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransaccionPichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransaccionPichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
