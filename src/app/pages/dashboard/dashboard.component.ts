import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSignDivVisiable: boolean  = true;
  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router,private http: HttpClient){}



  onRegister() {
 
    this.http.post<any>('http://localhost:3000/auth/api/employee/sign-up', this.signUpObj).subscribe({
      next: (response) => {
        // Handle response accordingly
        if (response.status == 200) {
          localStorage.setItem('loggedUser', JSON.stringify(response.response));
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (error: HttpErrorResponse) => { 
        if (error.status === 400) {
          if (error.error && error.error.response) {
            alert(`${error.error.response[0].msg}`);
          }
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }

    });
  }

  onLogin() {

    // Make HTTP POST request to your backend server
    this.http.post<any>('http://localhost:3000/auth/api/employee/login', this.loginObj).subscribe({
      next: (response) => {

        console.log(">>>>",response)
        // Handle response accordingly
        if (response.status == 200) {
          localStorage.setItem('loggedUser', JSON.stringify(response.response));
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (error) => {
        console.error('There was an error!', error.error);
        alert("invalid_credentials");
      }
    });
  }

}

export class SignUpModel  {
  firstName: string;
  email: string;
  phone:string;
  password: string;

  constructor() {
    this.email = "";
    this.phone = "";
    this.firstName = "";
    this.password= ""
  }
}

export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }
}
 