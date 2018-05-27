import { Component, DoCheck, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
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
export class EditMembersComponent implements OnInit, DoCheck {

  @ViewChildren('currentMember') currentMember;
  isMembersValid = true;

  newMembers: FormGroup;
  newBandMembers = {};

  constructor(
    private store: Store<fromApp.AppState>,
    private dialogRef: MatDialogRef<EditMembersComponent>,
    private membersService: MembersService,
    private bandsService: BandsService,
    private snackBar: MatSnackBar,
    private render: Renderer2
    ) {
  }

  ngOnInit() {
    this.initMembers();
    this.store.select('bands')
      .subscribe(data => this.newBandMembers['bandId'] = data.bandId);
  }

  ngDoCheck() {
    this.isMembersValid = this.newMembers.valid;
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
    setTimeout(() => this.isMembersValid = this.newMembers.valid);
  }

  onRemoveMember(index: number) {
    (<FormArray>this.newMembers.get('members')).removeAt(index);
  }

  onMembersForm(stepper) {
    this.newBandMembers['members'] = this.newMembers.value.members;
    stepper.selectedIndex = 0;
    if (this.newMembers.controls.members['controls'].length === 0) {
      stepper.selectedIndex = 0;
      this.onSnackBar('You have not added new member yet!!!');
    } else {
      const existsValues = [];
      this.newMembers.controls.members['controls'].map((member, index) => {
        const fullName = `${member.controls.firstName.value.trim()} ${member.controls.lastName.value.trim()}`;
        this.membersService.checkIsMemberInDB(fullName, this.newBandMembers['bandId'])
          .subscribe(res => {
            existsValues.push(res[0].exists);
            res[0].exists ?
              this.render.addClass(this.currentMember._results[index].nativeElement[0], 'isExistsName') :
              this.render.removeClass(this.currentMember._results[index].nativeElement[0], 'isExistsName');
            if (index === this.newMembers.controls.members['controls'].length - 1) {
              setTimeout(() => {
                if (existsValues.includes(true)) {
                  stepper.selectedIndex = 0;
                  this.onSnackBar('Some Member Name is exists!!!');
                } else {
                  stepper.selectedIndex = 1;
                }
              }, 500);
            }
          });
      });
    }
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

  // Snack

  onSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

}
