import { Component, OnInit } from '@angular/core';
import { JobOpening } from '../job-opening.model';
import { JobOpeningService } from '../job-opening.service';

@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrls: ['./job-openings.component.css']
})
export class JobOpeningsComponent implements OnInit {
  jobOpenings: JobOpening[] = [];

  constructor(private _jobOpeningService:JobOpeningService) { }

  ngOnInit(): void {
    this._jobOpeningService.getAllJobOpenings().subscribe(jobOpenings=>this.jobOpenings=jobOpenings);
  }

}
