import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BandsService } from './components/bands/shared/service/bands.service';

import * as fromApp from './shared/store/app.reducers';
import * as BandsActions from './components/bands/shared/store/bands.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>, private bandsService: BandsService) {}

  ngOnInit() {
    this.bandsService.getAllGenres()
      .subscribe(data => this.store.dispatch(new BandsActions.AllGenres(data)));
  }
}
