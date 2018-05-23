import {Component, DoCheck, OnInit} from "@angular/core";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../shared/store/app.reducers';
import * as BandsActions from '../../../bands/shared/store/bands.actions';

import { AboutService } from '../../shared/service/about.service';
import { BandsService } from '../../../bands/shared/service/bands.service';

@Component({
  selector: 'app-edit-discography',
  templateUrl: './edit-discography.component.html',
  styleUrls: ['./edit-discography.component.css']
})
export class EditDiscographyComponent implements OnInit, DoCheck {

  isDiscographyValid = true;
  discography: FormGroup;
  newBandDiscography = {};

  constructor(
    private store: Store<fromApp.AppState>,
    private dialogRef: MatDialogRef<EditDiscographyComponent>,
    private aboutService: AboutService,
    private bandsService: BandsService
    ) { }

  ngOnInit() {
    this.initDiscography();
    this.store.select('bands')
      .subscribe(data => this.newBandDiscography['bandId'] = data.bandId);
  }

  ngDoCheck() {
    this.isDiscographyValid = this.discography.valid;
    console.log(this.discography)
  }

  // Initialization Discography Array

  initDiscography() {
    this.discography = new FormGroup({
      'newAlbum': new FormArray([
        new FormGroup({
          'album': new FormControl(null),
          'year': new FormControl(null),
          'tracks': new FormControl(null),
          'image': new FormControl(null)
        })
      ])
    });
  }

  // Discography form

  onAddNewAlbum() {
    (<FormArray>this.discography.get('newAlbum')).push(
      new FormGroup({
        'album': new FormControl(null),
        'year': new FormControl(null),
        'tracks': new FormControl(null),
        'image': new FormControl(null)
      })
    );
    setTimeout(() => this.isDiscographyValid = this.discography.valid);
  }

  onRemoveAlbum(index: number) {
    (<FormArray>this.discography.get('newAlbum')).removeAt(index);
  }

  onDiscographyForm() {
    this.newBandDiscography['discography'] = this.discography.value.newAlbum;
  }

  // Get Controls

  get discographyCtrl() {
    return <FormArray>this.discography.get('newAlbum');
  }

  // Submit form

  onSubmitForm() {
    const newDiscography = this.newBandDiscography;
    this.aboutService.addNewDiscography(newDiscography)
      .subscribe(data => {
        this.bandsService.getBand(this.newBandDiscography['bandId'])
          .subscribe(band => this.store.dispatch(new BandsActions.GetBand(band)));
      });
    this.dialogRef.close();
  }

}
