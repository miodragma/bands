import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AppMaterialModule } from './shared/app-material.module';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from './core/main/main.component';
import { ContentComponent } from './core/content/content.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MembersComponent } from './components/members/members.component';
import { BandsComponent } from './components/bands/bands.component';
import { AddBandComponent } from './components/add-band/add-band.component';
import { EditDiscographyComponent } from './components/about/edit-discography/edit-discography.component';

import { GuardService } from './shared/guard.service';
import { BandsService } from './components/bands/shared/service/bands.service';
import { AboutService } from './components/about/shared/service/about.service';



export const appRoutes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'about', component: AboutComponent, canActivate: [GuardService] },
  { path: 'gallery', component: GalleryComponent, canActivate: [GuardService]  },
  { path: 'members', component: MembersComponent, canActivate: [GuardService]  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ContentComponent,
    AboutComponent,
    GalleryComponent,
    MembersComponent,
    BandsComponent,
    AddBandComponent,
    EditDiscographyComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    BandsComponent,
    AddBandComponent,
    EditDiscographyComponent,
    RouterTestingModule
  ],
  entryComponents: [AddBandComponent, EditDiscographyComponent],
  providers: [GuardService, BandsService, AboutService]
})

export class AppRoutingModule {}
