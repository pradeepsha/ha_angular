import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
let URL = "https://hr-portal-nd68.onrender.com";

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class SalaryComponent {
  array =  new Array();

  constructor(
   
    private router: Router,private http: HttpClient){
   
  }
  ngOnInit(): void {

    this.http.get<any>(`${URL}/auth/api/employee/list`).subscribe({
      next: (response) => {
  
        // Handle response accordingly
        if (response.status == 200) {
         this.array = response.response
        console.log(response)
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
        alert("invalid_credentials");
      }
    });


  }
}

