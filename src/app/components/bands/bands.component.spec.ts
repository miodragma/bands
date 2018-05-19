import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

import { reducers } from '../../shared/store/app.reducers';

import { AppMaterialModule } from '../../shared/app-material.module';

import { BandsComponent } from './bands.component';

import { BandsService } from './shared/service/bands.service';

describe('BandsComponent', () => {
  let component: BandsComponent;
  let fixture: ComponentFixture<BandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandsComponent ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        StoreModule.forRoot(reducers),
        AppMaterialModule
      ],
      providers: [ BandsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Bands Component', () => {
    expect(component).toBeTruthy();
  });
});
