import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EditGalleryComponent } from './edit-gallery/edit-gallery.component';
import { ImageComponent } from './image/image.component';

import * as fromApp from '../../shared/store/app.reducers';
import * as fromBands from '../bands/shared/store/bands.reducers';
import * as OverlayActions from '../../shared/overlay/shared/store/overlay.actions';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  @ViewChild('galleryComment') galleryComment;
  @ViewChildren('image') image;

  editGallery = false;

  bandsState: Observable<fromBands.State>;

  isOverlay: boolean;

  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog, private render: Renderer2) { }

  ngOnInit() {
    this.bandsState = this.store.select('bands');
    this.subscription = this.store.select('overlay')
      .subscribe(data => {
        this.isOverlay = data.overlay[2]['isOverlay'];
      });
    if (this.isOverlay) {
      this.render.setStyle(document.body, 'overflow', 'hidden');
      this.store.dispatch(new OverlayActions.SetToTrue());
    }
    const comments = [
      {
        top: this.galleryComment.nativeElement.getBoundingClientRect().top - 145,
        left: this.galleryComment.nativeElement.getBoundingClientRect().left - 55
      }
    ];
    this.store.dispatch(new OverlayActions.SetComments({name: 'gallery', comments: comments}));
  }

  showEdit() {
    this.editGallery = true;
  }

  hideEdit() {
    setTimeout(() => this.editGallery = false, 2000);
  }

  onEditGallery() {
    this.dialog.open(EditGalleryComponent, {
      width: '1500px',
      minHeight: '250px'
    });
  }

  onOpenModal(image: string, index: number) {
    const dataImage = {
      src: image,
      index: index,
      data: this.image
    };
    this.dialog.open(ImageComponent, {
      data: dataImage,
      minWidth: '100%'
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
