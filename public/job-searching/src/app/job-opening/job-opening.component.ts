import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOpening } from '../job-opening.model';
import { JobOpeningService } from '../job-opening.service';

@Component({
  selector: 'app-job-opening',
  templateUrl: './job-opening.component.html',
  styleUrls: ['./job-opening.component.css']
})
export class JobOpeningComponent implements OnInit {
  jobOpening: JobOpening =  new JobOpening();
  pageMessage!:string;

  constructor(private _jobOpeningService: JobOpeningService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    let jobOpeningId = this._route.snapshot.params['jobOpeningId'];
    this._jobOpeningService.getOneJobOpenings(jobOpeningId).subscribe(jobOpening=>{
      console.log(jobOpening);
      this.jobOpening = jobOpening;
    });
  }
  
  onDeleteClick(jobOpeningId:string): void {
    this._jobOpeningService.deleteOneJobOpenings(jobOpeningId).subscribe({
      next: (deletedJobOpening)=>{
        console.log('delete job opening', deletedJobOpening);
        this._router.navigate(['job-openings']);
      },
      'error': (err)=>{
        console.log(err);
        this.pageMessage = 'Delete failed';
      }
    });
  }
}
