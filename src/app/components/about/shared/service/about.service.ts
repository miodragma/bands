import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AboutService {

  API_URL = 'https://search-bands.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  checkIsAlbumInDB(albumName: string, bandId: number) {
    return this.httpClient.get<{exists: boolean}>(`${this.API_URL}/isExistAlbum/${albumName}/${bandId}`)
      .map(value => value);
  }

  addNewDiscography(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Request-Method': 'POST',
      })
    };
    return this.httpClient.post(`${this.API_URL}/addNewDiscography`, body, httpOptions)
      .map(res => res);
  }

}
