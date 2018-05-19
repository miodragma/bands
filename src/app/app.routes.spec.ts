import { appRoutes } from './app-routing.module';

import { AboutComponent } from './components/about/about.component';
import { ContentComponent } from './core/content/content.component';
import { GuardService } from './shared/guard.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MembersComponent } from './components/members/members.component';

describe('routes', () => {

  it('should contain a route for ""', () => {
    expect(appRoutes).toContain({ path: '', component: ContentComponent});
  });

  it('should contain a route for about', () => {
    expect(appRoutes).toContain({ path: 'about', component: AboutComponent, canActivate: [GuardService] });
  });

  it('should contain a route for gallery', () => {
    expect(appRoutes).toContain({ path: 'gallery', component: GalleryComponent, canActivate: [GuardService] });
  });

  it('should contain a route for members', () => {
    expect(appRoutes).toContain({ path: 'members', component: MembersComponent, canActivate: [GuardService]  });
  });
});
