import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { EditMembersComponent } from './edit-members/edit-members.component';

import * as fromApp from '../../shared/store/app.reducers';
import * as fromBands from '../bands/shared/store/bands.reducers';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  editMembers = false;

  bandsStore: Observable<fromBands.State>;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog) { }

  ngOnInit() {
    this.bandsStore = this.store.select('bands');
  }

  showEdit() {
    this.editMembers = true;
  }

  hideEdit() {
    setTimeout(() => this.editMembers = false, 2000);
  }

  onEditMembers() {
    this.dialog.open(EditMembersComponent, {
      width: '1500px',
      minHeight: '250px'
    });
  }

}
