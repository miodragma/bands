import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Band } from '../model/band.model';
import { AboutBand } from '../../../about/shared/model/aboutBand.model';
import { Member } from '../../../members/shared/model/member.model';

@Injectable()
export class BandsService {

  constructor(private httpClient: HttpClient) {}

  API_URL = 'https://search-bands.herokuapp.com';

  getBands(name: string) {
    return this.httpClient.get<Band[]>(`${this.API_URL}/bands-list/${name}`)
      .map(bands => bands);
  }

  getBand(id: number) {
    return this.httpClient.get<AboutBand[]>(`${this.API_URL}/band/${id}`)
      .map(band => band);
  }

  getMembers(id: number) {
    return this.httpClient.get<Member[]>(`${this.API_URL}/members/${id}`)
      .map(members => members);
  }

  getGallery(id: number) {
    return this.httpClient.get<{image: string}[]>(`${this.API_URL}/gallery/${id}`)
      .map(gallery => gallery);
  }

  getByGenre(genre: string) {
    return this.httpClient.get<Band[]>(`${this.API_URL}/genre/${genre}`)
      .map(bands => bands);
  }

  getAllGenres() {
    return this.httpClient.get<any>(`${this.API_URL}/all-genres`)
      .map(genres => genres);
  }

  addNewBand(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Request-Method': 'POST',
      })
    };
    return this.httpClient.post(`https://search-bands.herokuapp.com/addNewBand`, body, httpOptions)
      .map(res => res);
  }

}
