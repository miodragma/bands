import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { GuardService } from './shared/guard.service';

import { GroupService } from './components/shared/service/groupService.service';
import { BandsService } from './components/shared/service/bands.service';


const appRoutes: Routes = [
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
    BandsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    RouterModule.forRoot(appRoutes),
    RouterTestingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    BandsComponent,
    RouterTestingModule
  ],
  providers: [GuardService, GroupService, BandsService]
})

export class AppRoutingModule {}
