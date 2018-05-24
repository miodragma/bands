import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { GalleryService } from '../shared/service/gallery.service';
import { BandsService } from '../../bands/shared/service/bands.service';

import * as fromApp from '../../../shared/store/app.reducers';
import * as BandsActions from '../../bands/shared/store/bands.actions';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.css']
})
export class EditGalleryComponent implements OnInit, DoCheck {

  isGalleryValid = true;

  gallery: FormGroup;
  newBandGallery = {};

  constructor(
    private dialogRef: MatDialogRef<EditGalleryComponent>,
    private store: Store<fromApp.AppState>,
    private galleryService: GalleryService,
    private bandsService: BandsService
  ) { }

  ngOnInit() {
    this.initGallery();
    this.store.select('bands')
      .subscribe(data => this.newBandGallery['bandId'] = data.bandId);
  }

  ngDoCheck() {
    this.isGalleryValid = this.gallery.valid;
  }

  // Initialization Gallery array

  initGallery() {
    this.gallery = new FormGroup({
      'images': new FormArray([
        new FormGroup({
          'image': new FormControl(null)
        })
      ])
    });
  }

  // Gallery form

  onAddNewImage() {
    (<FormArray>this.gallery.get('images')).push(
      new FormGroup({
        'image': new FormControl(null)
      })
    );
    setTimeout(() => this.isGalleryValid = this.gallery.valid);
  }

  onRemoveImage(index: number) {
    (<FormArray>this.gallery.get('images')).removeAt(index);
  }

  onGalleryForm() {
    this.newBandGallery['gallery'] = this.gallery.value.images;
  }

  // Get controls

  get galleryCtrl() {
    return <FormArray>this.gallery.get('images');
  }

  // Submit form

  onSubmitForm() {
    const newGallery = this.newBandGallery;
    this.galleryService.addNewGallery(newGallery)
      .subscribe(data => {
        this.bandsService.getGallery(this.newBandGallery['bandId'])
          .subscribe(gallery => this.store.dispatch(new BandsActions.GetGallery(gallery)));
      });
    this.dialogRef.close();
  }

}
