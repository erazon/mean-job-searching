import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOpening } from './job-opening.model';

@Injectable({
  providedIn: 'root'
})
export class JobOpeningService {
  _baseUrl = 'http://localhost:3000/api/';

  constructor(private _http:HttpClient) { }

  public addJobOpening(jobOpeningData:JobOpening): Observable<JobOpening>{
    const url = this._baseUrl + 'job-openings';
    return this._http.post<JobOpening>(url, jobOpeningData);
  }
  
  public updateJobOpening(jobOpeningId:string, jobOpeningData:JobOpening): Observable<JobOpening>{
    const url = this._baseUrl + 'job-openings/' + jobOpeningId;
    return this._http.put<JobOpening>(url, jobOpeningData);
  }

  public getAllJobOpenings(): Observable<JobOpening[]>{
    const url = this._baseUrl + 'job-openings/';
    return this._http.get<JobOpening[]>(url);
  }
  
  public getOneJobOpenings(jobOpeningId:string): Observable<JobOpening>{
    const url = this._baseUrl + 'job-openings/' + jobOpeningId;
    return this._http.get<JobOpening>(url);
  }
  
  public deleteOneJobOpenings(jobOpeningId:string): Observable<JobOpening>{
    const url = this._baseUrl + 'job-openings/' + jobOpeningId;
    return this._http.delete<JobOpening>(url);
  }
}
