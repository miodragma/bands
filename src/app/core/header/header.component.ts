import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as fromBands from '../../components/shared/store/bands.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bandsState: Observable<fromBands.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.bandsState = this.store.select('bands');
  }

}
