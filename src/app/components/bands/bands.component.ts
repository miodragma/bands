import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { PageEvent } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { BandsService } from './shared/service/bands.service';

import * as fromApp from '../../shared/store/app.reducers';
import * as fromBands from './shared/store/bands.reducers';
import * as BandsActions from './shared/store/bands.actions';
import { AboutBand } from '../about/shared/model/aboutBand.model';
import { Member } from '../members/shared/model/member.model';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {

  @ViewChild('pagin') pagin;
  @ViewChild('container') container: ElementRef;

  band = '';

  genreGroups = [];
  keyUp = new Subject<any>();
  notExist = '';

  // pagination
  pageSize;

  // Counters
  countFrom: number;
  countTo: number;

  bandsState: Observable<fromBands.State>;

  constructor(
    private bandsService: BandsService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private render: Renderer2
  ) {
    this.keyUp
      .map(event => event)
      .debounceTime(250)
      .distinctUntilChanged()
      .subscribe(val => {
        if (val.target.value.trim() === '') {
          this.notExist = '';
          this.store.dispatch(new BandsActions.GetBands([]));
          this.store.dispatch(new BandsActions.GetBandId(null));
          this.store.dispatch(new BandsActions.SearchInput(''));
          return;
        } else {
          this.store.dispatch(new BandsActions.SearchInput(val.target.value));
          this.bandsService.getBands(val.target.value.trim())
            .subscribe(bands => {
              bands.length ? this.notExist = '' : this.notExist = `No data for '${val.target.value.trim()}' band`;
              this.store.dispatch(new BandsActions.GetBands(bands));
              this.countFrom = 0;
              this.countTo = 10;
            });
        }
      });
  }

  ngOnInit() {
    this.bandsService.getAllGenres()
      .subscribe(genres => this.genreGroups = genres);
    this.bandsState = this.store.select('bands');
    this.countFrom = 0;
    this.countTo = 10;
  }

  onClickBand(bandId: number) {
    this.render.addClass(this.container.nativeElement, 'containerAnime');
    let clickedBand: AboutBand[] = [];
    let clickedMember: Member[] = [];
    let clickedGallery: {image: string}[] = [];
    this.bandsService.getBand(bandId)
      .subscribe(band => clickedBand = band);
    this.bandsService.getMembers(bandId)
      .subscribe(members => clickedMember = members);
    this.bandsService.getGallery(bandId)
      .subscribe(gallery => clickedGallery = gallery);
    setTimeout(() => {
      this.store.dispatch(new BandsActions.MultyTwo([
        new BandsActions.GetBandId(bandId),
        new BandsActions.GetBand(clickedBand),
        new BandsActions.GetMembers(clickedMember),
        new BandsActions.GetGallery(clickedGallery)
      ]));
      this.router.navigate(['about']);
    }, 500);
  }

  onChangeGenre(event) {
    if (event.source.value === undefined) {
      this.notExist = '';
      this.store.dispatch(new BandsActions.MultyOne([
        new BandsActions.GetBands([]),
        new BandsActions.GetBandId(null),
        new BandsActions.SearchGenre('')
      ]));
      return;
    } else {
      this.store.dispatch(new BandsActions.SearchGenre(event.source.value));
      this.bandsService.getByGenre(event.source.value.name)
        .subscribe(bands => {
          if (Object.keys(bands).length === 0) {
            this.notExist = `No data from ${event.source.value.name} genre`;
            this.store.dispatch(new BandsActions.Multy([
              new BandsActions.GetBands([]),
              new BandsActions.GetBandId(null),
              new BandsActions.SearchInput('')
            ]));
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
