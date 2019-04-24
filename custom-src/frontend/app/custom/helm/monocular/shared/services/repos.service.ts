import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoggerService } from '../../../../../core/logger.service';
import { RepoAttributes } from '../models/repo';
import { ConfigService } from './config.service';



@Injectable()
export class ReposService {

  hostname: string;

  constructor(
    private http: Http,
    private config: ConfigService,
    private loggerService: LoggerService
  ) {
    this.hostname = `/pp/v1/chartrepos`;
  }

  /**
   * Get all repos from the API
   *
   * @return An observable that will an array with all repos
   */
  getRepos(): Observable<RepoAttributes[]> {
    return this.http.get(`${this.hostname}`).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    const errMsg = (error.json().message) ? error.json().message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    this.loggerService.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
