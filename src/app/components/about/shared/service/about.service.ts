import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AboutService {

  API_URL = 'https://search-bands.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

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
