import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromOverlay from './shared/store/overlay.reducers';
import * as OverlayActions from './shared/store/overlay.actions';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  overlayState: Observable<fromOverlay.State>;

  // Genres offset
  top: number;
  left: number;

  constructor(private render: Renderer2, private store: Store<fromApp.AppState>) {
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
    this.store.select('overlay')
      .subscribe(data => console.log(data))
    this.render.setStyle(document.body, 'overflow', 'hidden');
  }

  // setOffset() {
  //   this.top = this.genres._elementRef.nativeElement.getBoundingClientRect().top - 70;
  //   this.left = this.genres._elementRef.nativeElement.getBoundingClientRect().left;
  // }


  // Close Overlay

  closeOverlay() {
    this.store.dispatch(new OverlayActions.ControlOverlay({overlay: 'bands', isOverlay: false}));
    this.render.removeStyle(document.body, 'overflow');
  }

}
