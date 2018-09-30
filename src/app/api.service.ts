import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class ApiService {

  constructor(private http:Http) { }

  getSubtitle() {
    return this.http.get('http://127.0.0.1:8000/sub.vtt');
  }
}
