import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';
import { Locations } from '../models/locations';
import { Path } from '../models/path';
import { AuthService } from './auth.service';

@Injectable()
export class PathsService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  getPathsList(): any {
    const accessToken = this.authService.userValue.accessToken;
    const userId = this.authService.userValue.userId;
    console.log('Paths');

    return this.http
      .post<any>('https://api-diploma.herokuapp.com/myRoutes', {
        userId,
        accessToken,
      })
      .pipe(
        map((paths) => {
          // console.log(paths);
          return paths;
        })
      );
  }

  getPathDetails(routeId: string): any{
    const accessToken = this.authService.userValue.accessToken;
    const url = 'https://api-diploma.herokuapp.com/details/' + routeId;

    return this.http
    .post<any>(url, {
      routeId,
      accessToken,
    })
    .pipe(
      map((details) => {
        // console.log(details);
        return details;
      })
    );
  }
}
