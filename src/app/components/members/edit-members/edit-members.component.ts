import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { MembersService } from '../shared/service/members.service';
import { BandsService } from '../../bands/shared/service/bands.service';

import * as fromApp from '../../../shared/store/app.reducers';
import * as BandsActions from '../../bands/shared/store/bands.actions';

@Component({
  selector: 'app-edit-members',
  templateUrl: './edit-members.component.html',
  styleUrls: ['./edit-members.component.css']
})
export class EditMembersComponent implements OnInit {

  newMembers: FormGroup;
  newBandMembers = {};

  constructor(
    private store: Store<fromApp.AppState>,
    private dialogRef: MatDialogRef<EditMembersComponent>,
    private membersService: MembersService,
    private bandsService: BandsService) {
  }

  ngOnInit() {
    this.initMembers();
    this.store.select('bands')
      .subscribe(data => this.newBandMembers['bandId'] = data.bandId);
  }

  // Initialization Members array

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
    this.newBandMembers['members'] = this.newMembers.value.members;
  }

  // Get controls

  get membersCtrl() {
    return <FormArray>this.newMembers.get('members');
  }

  // Submit form

  onSubmitForm() {
    const newMembers = this.newBandMembers;
    console.log(newMembers);
    this.membersService.addNewMembers(newMembers)
      .subscribe(data => {
        console.log(data);
        this.bandsService.getMembers(this.newBandMembers['bandId'])
          .subscribe(members => this.store.dispatch(new BandsActions.GetMembers(members)));
      });
    this.dialogRef.close();
  }

}
