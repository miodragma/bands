import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../../shared/store/app.reducers';
import * as fromBands from '../bands/shared/store/bands.reducers';
import * as OverlayActions from '../../shared/overlay/shared/store/overlay.actions';

import { EditDiscographyComponent } from './edit-about/edit-discography/edit-discography.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  @ViewChild('discographyComment') discographyComment;

  editDiscography = false;

  bandsState: Observable<fromBands.State>;

  isOverlay: boolean;

  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog, private render: Renderer2) {
  }

  ngOnInit() {
    this.bandsState = this.store.select('bands');
    this.subscription = this.store.select('overlay')
      .subscribe(data => {
        this.isOverlay = data.overlay[1]['isOverlay'];
      });
    if (this.isOverlay) {
      this.render.setStyle(document.body, 'overflow', 'hidden');
      this.store.dispatch(new OverlayActions.SetToTrue());
    }
    const comments = [
      {
        top: this.discographyComment.nativeElement.getBoundingClientRect().top - 8,
        left: this.discographyComment.nativeElement.getBoundingClientRect().left - 265
      }
    ];
    this.store.dispatch(new OverlayActions.SetComments({name: 'about', comments: comments}));
  }

  showEdit() {
    this.editDiscography = true;
  }

  hideEdit() {
    setTimeout(() => this.editDiscography = false, 2000);
  }

  onEditDiscography() {
    this.dialog.open(EditDiscographyComponent, {
      width: '1500px',
      minHeight: '250px'
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

