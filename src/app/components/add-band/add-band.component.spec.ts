import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from '../../shared/app-material.module';
import { AddBandComponent } from './add-band.component';

import { BandsService } from '../bands/shared/service/bands.service';

describe('AddBandComponent', () => {
  let component: AddBandComponent;
  let fixture: ComponentFixture<AddBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBandComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        BandsService,
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AddBand Component', () => {
    expect(component).toBeTruthy();
  });
});
