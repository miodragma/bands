import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { AppState, reducers } from './shared/store/app.reducers';
import { enableBatchReducer } from 'ngrx-batch-action-reducer';
import { environment } from '../environments/environment.prod';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ?
  [enableBatchReducer] :
  [enableBatchReducer];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
