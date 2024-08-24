import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryWidgetComponent } from './country-widget.component';

describe('CountryWidgetComponent', () => {
  let component: CountryWidgetComponent;
  let fixture: ComponentFixture<CountryWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
