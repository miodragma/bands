import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../../store/app.reducers';
import * as fromBands from '../shared/store/bands.reducers';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  bandsStore: Observable<fromBands.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.bandsStore = this.store.select('bands');
  }

}
