import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { EditGalleryComponent } from './edit-gallery/edit-gallery.component';
import { ImageComponent } from './image/image.component';

import * as fromApp from '../../shared/store/app.reducers';
import * as fromBands from '../bands/shared/store/bands.reducers';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @ViewChildren('image') image;

  editGallery = false;

  bandsState: Observable<fromBands.State>;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog) { }

  ngOnInit() {
    this.bandsState = this.store.select('bands');
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
    console.log(this.image);
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

}
