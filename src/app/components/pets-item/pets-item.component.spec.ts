import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsItemComponent } from './pets-item.component';

describe('PetsItemComponent', () => {
  let component: PetsItemComponent;
  let fixture: ComponentFixture<PetsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
