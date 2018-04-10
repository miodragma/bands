import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as fromBands from '../shared/store/bands.reducers';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  bandsState: Observable<fromBands.State>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.bandsState = this.store.select('bands');
  }

}

