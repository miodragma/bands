import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from './core/main/main.component';
import { ContentComponent } from './core/content/content.component';
import { AboutComponent } from './pages/about/about.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { MembersComponent } from './pages/members/members.component';

const appRoutes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'members', component: MembersComponent }
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ContentComponent,
    AboutComponent,
    GalleryComponent,
    MembersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    RouterTestingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RouterTestingModule
  ]
})

export class AppRoutingModule {}
