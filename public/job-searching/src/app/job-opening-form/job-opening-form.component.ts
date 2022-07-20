import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobOpening } from '../job-opening.model';
import { JobOpeningService } from '../job-opening.service';

@Component({
  selector: 'app-job-opening-form',
  templateUrl: './job-opening-form.component.html',
  styleUrls: ['./job-opening-form.component.css']
})
export class JobOpeningFormComponent implements OnInit {
  jobOpening!:JobOpening;
  jobOpeningId!:string;
  #jobOpeningForm!:FormGroup;
  get jobOpeningForm(){return this.#jobOpeningForm;}
  pageMessage!:string;
  pageTitle:string = 'Add';

  constructor(private _jobOpeningService: JobOpeningService, private _route:ActivatedRoute) {
    this.#jobOpeningForm = new FormGroup({
      title: new FormControl(),
      salary: new FormControl(),
      description: new FormControl(),
      experience: new FormControl(),
      skills: new FormControl(),
      postDate: new FormControl(),
    });

    this.jobOpeningId = _route.snapshot.params['jobOpeningId'];
    if(this.jobOpeningId){
      this.pageTitle = 'Update';
      _jobOpeningService.getOneJobOpenings(this.jobOpeningId).subscribe(jobOpening=>{
        this.#jobOpeningForm = new FormGroup({
          title: new FormControl(jobOpening.title),
          salary: new FormControl(jobOpening.salary),
          description: new FormControl(jobOpening.description),
          experience: new FormControl(jobOpening.experience),
          skills: new FormControl(jobOpening.skills),
          postDate: new FormControl(jobOpening.postDate),
        });
      });
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('submit clicked');
    if(this.jobOpeningId){
      this._jobOpeningService.updateJobOpening(this.jobOpeningId, this.#jobOpeningForm.value).subscribe({
        next: (jobOpening)=>{
          console.log(jobOpening);
          this.pageMessage = 'Job opening updated';
        },
        error: (err)=>{
          console.log(err);
          this.pageMessage = 'Job opening update failed';
        },
      });
    }
    else{
      this._jobOpeningService.addJobOpening(this.#jobOpeningForm.value).subscribe({
        next: (jobOpening)=>{
          console.log(jobOpening);
          this.pageMessage = 'Job opening added';
        },
        error: (err)=>{
          console.log(err);
          this.pageMessage = 'Job opening add failed';
        },
      });
    }
  }
}
