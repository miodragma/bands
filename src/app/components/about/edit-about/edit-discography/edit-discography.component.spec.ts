import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscographyComponent } from './edit-discography.component';

describe('EditDiscographyComponent', () => {
  let component: EditDiscographyComponent;
  let fixture: ComponentFixture<EditDiscographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiscographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiscographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
