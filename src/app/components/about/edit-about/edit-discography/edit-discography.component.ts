import { Component, DoCheck, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
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

  @ViewChildren('currentAlbum') currentAlbum;
  isDiscographyValid = true;
  discography: FormGroup;
  newBandDiscography = {};

  constructor(
    private store: Store<fromApp.AppState>,
    private dialogRef: MatDialogRef<EditDiscographyComponent>,
    private aboutService: AboutService,
    private bandsService: BandsService,
    private snackBar: MatSnackBar,
    private render: Renderer2
  ) {
  }

  ngOnInit() {
    this.initDiscography();
    this.store.select('bands')
      .subscribe(data => this.newBandDiscography['bandId'] = data.bandId);
  }

  ngDoCheck() {
    this.isDiscographyValid = this.discography.valid;
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

  onDiscographyForm(stepper) {
    this.newBandDiscography['discography'] = this.discography.value.newAlbum;
    stepper.selectedIndex = 0;
    if (this.discography.controls.newAlbum['controls'].length === 0) {
      stepper.selectedIndex = 0;
      this.onSnackBar('You have not added new album yet!!!');
    } else {
      const existsValues = [];
      this.discography.controls.newAlbum['controls'].map((album, index) => {
        this.aboutService.checkIsAlbumInDB(album.controls.album.value.trim(), this.newBandDiscography['bandId'])
          .subscribe(res => {
            existsValues.push(res[0].exists);
            res[0].exists ?
              this.render.addClass(this.currentAlbum._results[index].nativeElement[0], 'isExistsName') :
              this.render.removeClass(this.currentAlbum._results[index].nativeElement[0], 'isExistsName');
            if (index === this.discography.controls.newAlbum['controls'].length - 1) {
              setTimeout(() => {
                if (existsValues.includes(true)) {
                  stepper.selectedIndex = 0;
                  this.onSnackBar('Some Album Name is exists!!!');
                } else {
                  stepper.selectedIndex = 1;
                }
              }, 500);
            }
          });
      });
    }
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

  // Snack

  onSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

}
