import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EditMembersComponent } from './edit-members/edit-members.component';

import * as fromApp from '../../shared/store/app.reducers';
import * as fromBands from '../bands/shared/store/bands.reducers';
import * as OverlayActions from '../../shared/overlay/shared/store/overlay.actions';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  @ViewChild('membersComment') membersComment;

  editMembers = false;

  bandsStore: Observable<fromBands.State>;

  isOverlay: boolean;

  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog, private render: Renderer2) { }

  ngOnInit() {
    this.bandsStore = this.store.select('bands');
    this.subscription = this.store.select('overlay')
      .subscribe(data => {
        this.isOverlay = data.overlay[3]['isOverlay'];
      });
    if (this.isOverlay) {
      this.render.setStyle(document.body, 'overflow', 'hidden');
      this.store.dispatch(new OverlayActions.SetToTrue());
    }
    const comments = [
      {
        top: this.membersComment.nativeElement.getBoundingClientRect().top - 145,
        left: this.membersComment.nativeElement.getBoundingClientRect().left
      }
    ];
    this.store.dispatch(new OverlayActions.SetComments({name: 'members', comments: comments}));
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
