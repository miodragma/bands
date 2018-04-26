import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';

import * as fromApp from '../../../store/app.reducers';
import * as fromBands from '../../components/shared/store/bands.reducers';
import { Observable } from 'rxjs/Observable';
import { AddBandComponent } from '../../components/add-band/add-band.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bandsState: Observable<fromBands.State>;

  constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog) { }

  ngOnInit() {
    this.bandsState = this.store.select('bands');
  }

  onAddNewBand() {
    this.dialog.open(AddBandComponent, {
      width: '1500px',
      minHeight: '250px'
    });
  }

}
