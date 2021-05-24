import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransaccionBanComponent } from './view-transaccion-ban.component';

describe('ViewTransaccionBanComponent', () => {
  let component: ViewTransaccionBanComponent;
  let fixture: ComponentFixture<ViewTransaccionBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransaccionBanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransaccionBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
