import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  onHomeClick(): void {
    console.log('home clicked');
    
    this._router.navigate(['']);
  }
  
  onJobOpeningsClick(): void {
    console.log('jobOpeningsClick');
    
    this._router.navigate(['job-openings']);
  }
  
  onAddJobOpeningClick(): void {
    this._router.navigate(['job-opening/add']);
  }

}
