import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSelectorComponent } from './option-selector.component';

describe('OptionSelectorComponent', () => {
  let component: OptionSelectorComponent;
  let fixture: ComponentFixture<OptionSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionSelectorComponent]
    });
    fixture = TestBed.createComponent(OptionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
