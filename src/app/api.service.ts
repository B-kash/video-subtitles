import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ApiService {

  constructor(private http:Http) { }

  getSubtitle(url) {
    return this.http.get(url);
  }
}
