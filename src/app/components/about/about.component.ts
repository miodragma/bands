import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';

import * as fromApp from '../../shared/store/app.reducers';
import * as fromBands from '../bands/shared/store/bands.reducers';

import { EditDiscographyComponent } from './edit-discography/edit-discography.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  editDiscography = false;

  bandsState: Observable<fromBands.State>;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.bandsState = this.store.select('bands');
  }

  showEdit() {
    this.editDiscography = true;
  }

  hideEdit() {
    setTimeout(() => this.editDiscography = false, 2000);
  }

  onEditDiscography() {
    this.dialog.open(EditDiscographyComponent, {
      width: '1500px',
      minHeight: '250px'
    });
  }

}

