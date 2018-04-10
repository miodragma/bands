import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Band } from '../models/band.model';
import { AboutBand } from '../models/aboutBand.model';
import { Member } from '../models/member.model';

@Injectable()
export class BandsService {

  constructor(private httpClient: HttpClient) {}

  getBands(name: string) {
    return this.httpClient.get<Band[]>(`https://search-bands.herokuapp.com/bands-list/${name}`)
      .map(bands => bands);
  }

  getBand(id: number) {
    return this.httpClient.get<AboutBand[]>(`https://search-bands.herokuapp.com/band/${id}`)
      .map(band => band);
  }

  getMembers(id: number) {
    return this.httpClient.get<Member[]>(`https://search-bands.herokuapp.com/members/${id}`)
      .map(members => members);
  }

  getGallery(id: number) {
    return this.httpClient.get<{image: string}[]>(`https://search-bands.herokuapp.com/gallery/${id}`)
      .map(gallery => gallery);
  }

  getByGenre(genre: string) {
    return this.httpClient.get<Band[]>(`https://search-bands.herokuapp.com/genre/${genre}`)
      .map(bands => bands);
  }

}
