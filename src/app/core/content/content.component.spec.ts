import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { BandsComponent } from '../../components/bands/bands.component';
import { AppMaterialModule } from '../../shared/app-material.module';
import { BandsService } from '../../components/bands/shared/service/bands.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../shared/store/app.reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContentComponent,
        BandsComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot(reducers),
        HttpClientTestingModule,
        AppMaterialModule
      ],
      providers: [BandsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Content Component', () => {
    expect(component).toBeTruthy();
  });
});
