import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromApp from '../../shared/store/app.reducers';
import * as fromBands from '../bands/shared/store/bands.reducers';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  bandsState: Observable<fromBands.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.bandsState = this.store.select('bands');
  }

}
