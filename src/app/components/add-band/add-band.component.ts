import { Component, DoCheck, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { BandsService } from '../bands/shared/service/bands.service';

@Component({
  selector: 'app-add-band',
  templateUrl: './add-band.component.html',
  styleUrls: ['./add-band.component.css']
})
export class AddBandComponent implements OnInit, DoCheck {

  @ViewChildren('members') membersF;
  genreGroups = [];

  newBandData = {};

  // Form Group
  newMembers: FormGroup;
  discography: FormGroup;
  gallery: FormGroup;

  // Validation;
  isMemberValid = true;
  isDiscographyValid = true;
  isGalleryValid = true;

  constructor(
    private dialogRef: MatDialogRef<AddBandComponent>,
    private bandsService: BandsService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.bandsService.getAllGenres()
      .subscribe(genres => this.genreGroups = genres);
    this.initMembers();
    this.initDiscography();
    this.initGallery();
  }

  ngDoCheck() {
    this.isMemberValid = this.newMembers.valid;
    this.isDiscographyValid = this.discography.valid;
    this.isGalleryValid = this.gallery.valid;
  }

  // Get controls

  get membersCtrl() {
    return <FormArray>this.newMembers.get('members');
  }

  get discographyCtrl() {
    return <FormArray>this.discography.get('newAlbum');
  }

  get galleryCtrl() {
    return <FormArray>this.gallery.get('images');
  }

  // Initialization array forms

  initMembers() {
    this.newMembers = new FormGroup({
      'members': new FormArray([])
    });
  }

  initDiscography() {
    this.discography = new FormGroup({
      'newAlbum': new FormArray([])
    });
  }

  initGallery() {
    this.gallery = new FormGroup({
      'images': new FormArray([])
    });
  }

  // Band form

  onBandForm(form: NgForm, stepper) {
    stepper.selectedIndex = 0;
    this.newBandData['band'] = {
      name: form.value.band.trim(),
      image: form.value.bandImage.trim(),
      about: form.value.about.trim()
    };
    this.bandsService.checkIsBandInDB(this.newBandData['band'].name)
      .subscribe(res => {
        if (res[0].exists === true) {
          stepper.selectedIndex = 0;
          this.snackBar.open(`This band ${this.newBandData['band'].name} is exist!!!`, '', {
            duration: 3000
          });
        } else {
          stepper.selectedIndex = 1;
        }
      });
  }

  // Genre form

  onGenreForm(genreForm) {
    this.newBandData['genres'] = genreForm.value.genre;
  }

  // Members form

  onAddNewMember() {
    (<FormArray>this.newMembers.get('members')).push(
      new FormGroup({
        'firstName': new FormControl(null),
        'lastName': new FormControl(null),
        'image': new FormControl(null),
        'profession': new FormControl(null),
        'former': new FormControl(false)
      })
    );
    setTimeout(() => this.isMemberValid = this.newMembers.valid);
  }

  onRemoveMember(index: number) {
    (<FormArray>this.newMembers.get('members')).removeAt(index);
  }

  onMembersForm() {
    this.newBandData['members'] = this.newMembers.value.members;
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
    this.newBandData['discography'] = this.discography.value.newAlbum;
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
    this.newBandData['gallery'] = this.gallery.value.images;
  }

  // Submit form

  onSubmitForm() {
    const newFullBand = this.newBandData;
    this.bandsService.addNewBand(newFullBand)
      .subscribe(data => console.log('Done'));
    this.dialogRef.close();
  }

}
