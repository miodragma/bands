import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../store/app.reducers';
import * as fromOverlay from './shared/store/overlay.reducers';
import * as OverlayActions from './shared/store/overlay.actions';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit, OnDestroy {

  overlayState: Observable<fromOverlay.State>;

  // Url path
  path: string;
  index = -1;
  // Genres offset
  top: number;
  left: number;

  subscription: Subscription;

  constructor(private render: Renderer2, private store: Store<fromApp.AppState>, private router: Router) {
    // setTimeout(() => {
    //   this.setOffset();
    //   this.render.addClass(document.body, 'cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing');
    // });
    // window.onresize = (e) => {
    //   ngZone.run will help to run change detection
      // this.ngZone.run(() => {
      //   this.setOffset();
      //   console.log('Genres: ', this.genres._elementRef.nativeElement.getBoundingClientRect().left)
      //   console.log('Width: ' + window.innerWidth);
      //   console.log('Height: ' + window.innerHeight);
      // });
    // };
  }

  ngOnInit() {
    this.overlayState = this.store.select('overlay');
    this.subscription = this.store.select('overlay')
      .subscribe(data => {
        this.index = -1;
        setTimeout(() => {
         if (this.router.url === '/') {
           this.path = 'bands';
         } else {
           this.path = this.router.url.replace(/^\/|\/$/g, '');
         }
         data.overlay.map((item, index) => item['overlay'] === this.path ? this.index = index : null);
        });
      });
    this.render.setStyle(document.body, 'overflow', 'hidden');
  }

  // setOffset() {
  //   this.top = this.genres._elementRef.nativeElement.getBoundingClientRect().top - 70;
  //   this.left = this.genres._elementRef.nativeElement.getBoundingClientRect().left;
  // }


  // Close Overlay

  closeOverlay() {
    // this.store.dispatch(new OverlayActions.SetToTrue(false));
    this.store.dispatch(new OverlayActions.ControlOverlay({overlay: this.path, isOverlay: false}));
    this.render.removeStyle(document.body, 'overflow');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
