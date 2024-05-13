import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

// let URL = "https://hr-portal-nd68.onrender.com";
let URL = "http://localhost:3000";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  isSignDivVisiable: boolean  = true;

  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router,private http: HttpClient){}


  // onRegister() {

  //   console.log(">>>>>>",this.signUpObj)
  //   const localUser = localStorage.getItem('angular17users');
  //   if(localUser != null) {
  //     const users =  JSON.parse(localUser);
  //     users.push(this.signUpObj);
  //     localStorage.setItem('angular17users', JSON.stringify(users))
  //   } else {
  //     const users = [];
  //     users.push(this.signUpObj);
  //     localStorage.setItem('angular17users', JSON.stringify(users))
  //   }
  //   alert('Registration Success')
  // }

  onRegister() {
 
    this.http.post<any>(`${URL}/auth/api/employee/sign-up`, this.signUpObj).subscribe({
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
    this.http.post<any>(`${URL}/auth/api/employee/login`, this.loginObj).subscribe({
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
