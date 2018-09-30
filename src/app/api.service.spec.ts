import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import {BaseRequestOptions, ConnectionBackend, Http} from "@angular/http";
import {RequestOptions} from "https";

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService,Http,ConnectionBackend,RequestOptions]
    });
  });

  it('should ...', inject([ApiService,Http], (service: ApiService,api:Http) => {
    expect(service).toBeTruthy();
  }));
});
