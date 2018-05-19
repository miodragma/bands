import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { BandsService } from '../bands/shared/service/bands.service';

@Component({
  selector: 'app-add-band',
  templateUrl: './add-band.component.html',
  styleUrls: ['./add-band.component.css']
})
export class AddBandComponent implements OnInit {

  genreGroups = [];

  newBandData = {};

  newMembers: FormGroup;
  discography: FormGroup;
  gallery: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddBandComponent>,
    private bandsService: BandsService) { }

  ngOnInit() {
    this.bandsService.getAllGenres()
      .subscribe(genres => this.genreGroups = genres);
    this.initMembers();
    this.initDiscography();
    this.initGallery();
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
      'members': new FormArray([
        new FormGroup({
          'firstName': new FormControl(null),
          'lastName': new FormControl(null),
          'image': new FormControl(null),
          'profession': new FormControl(null),
          'former': new FormControl(false)
        })
      ])
    });
  }

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

  initGallery() {
    this.gallery = new FormGroup({
      'images': new FormArray([
        new FormGroup({
          'image': new FormControl(null)
        })
      ])
    });
  }

  // Band form

  onBandForm(form: NgForm) {
    this.newBandData['band'] = {
      name: form.value.band,
      image: form.value.bandImage,
      about: form.value.about
    };
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
      .subscribe(data => console.log(data));
    this.dialogRef.close();
  }

}
