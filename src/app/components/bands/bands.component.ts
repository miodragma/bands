import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PageEvent } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BandsService } from '../shared/service/bands.service';
import { GroupService } from '../shared/service/groupService.service';

import * as fromApp from '../../../store/app.reducers';
import * as fromBands from '../shared/store/bands.reducers';
import * as BandsActions from '../shared/store/bands.actions';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {

  @ViewChild('pagin') pagin;

  genreGroups = [];
  keyUp = new Subject<any>();
  notExist = '';

  // pagination
  pageSize;

  // Counters
  countFrom: number;
  countTo: number;
  idBand: number;

  bandsState: Observable<fromBands.State>;

  constructor(private groupService: GroupService, private bandsService: BandsService, private store: Store<fromApp.AppState>) {
    this.keyUp
      .map(event => event)
      .debounceTime(250)
      .distinctUntilChanged()
      .subscribe(val => {
        if (val.target.value.trim() === '') {
          this.notExist = '';
          this.store.dispatch(new BandsActions.GetBands([]));
          this.store.dispatch(new BandsActions.GetBandId(null));
          return;
        } else {
          this.bandsService.getBands(val.target.value.trim())
            .subscribe(bands => {
              this.store.dispatch(new BandsActions.GetBands(bands));
              this.countFrom = 0;
              this.countTo = 10;
            });
        }
      });
  }

  ngOnInit() {
    this.genreGroups = this.groupService.genreGroups;
    this.idBand = null;
    this.bandsState = this.store.select('bands');
    this.countFrom = 0;
    this.countTo = 10;
  }

  onClickBand(bandId: number, listId: number) {
    this.idBand = listId;
    this.store.dispatch(new BandsActions.GetBandId(bandId));
    this.bandsService.getBand(bandId)
      .subscribe(band => this.store.dispatch(new BandsActions.GetBand(band)));
    this.bandsService.getMembers(bandId)
      .subscribe(members => this.store.dispatch(new BandsActions.GetMembers(members)));
    this.bandsService.getGallery(bandId)
      .subscribe(gallery => this.store.dispatch(new BandsActions.GetGallery(gallery)));
  }

  onChangeGenre(event) {
    if (event.value === undefined) {
      this.notExist = '';
      this.store.dispatch(new BandsActions.GetBands([]));
      this.store.dispatch(new BandsActions.GetBandId(null));
      return;
    } else {
      this.bandsService.getByGenre(event.value)
        .subscribe(bands => {
          if (~typeof bands.length) {
            this.notExist = `No data from ${event.value} genre`;
          }
          this.store.dispatch(new BandsActions.GetBands(bands));
          this.countFrom = 0;
          this.countTo = 10;
        });
    }
  }

  // pagination
  onChangePage(pageEvent: PageEvent) {
    pageEvent.length = Math.max(pageEvent.length, 0);
    this.countFrom = pageEvent.pageIndex * pageEvent.pageSize;
    this.countTo = this.countFrom < pageEvent.length ?
      Math.min(this.countFrom + pageEvent.pageSize, pageEvent.length) :
      this.countFrom + pageEvent.pageSize;
  }

}
