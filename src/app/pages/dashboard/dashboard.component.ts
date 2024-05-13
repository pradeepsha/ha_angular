import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

let URL = "https://hr-portal-nd68.onrender.com";
// let URL = "http://localhost:3000";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalAmount:Number = 0;
  total_detuction:number=0;
  net_pay:number=0;
  loggedUser = new Object()
  obj = new Object()

  isSignDivVisiable: boolean  = true;


  isFormDivVisible: boolean = true;
  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router,private http: HttpClient, private formBuilder: FormBuilder){
   
  }

  

  addNumbers(): void {



    // console.log("loggedUser",loggedUser)

    this.isFormDivVisible = !this.isFormDivVisible;
    this.total_detuction = parseFloat(this.signUpObj.loan )+ parseFloat(this.signUpObj.tax)
    this.net_pay = parseFloat(this.signUpObj.basic_salary) -  this.total_detuction;
    this.obj = {
      "net_pay":this.net_pay, 
      "total_detuction": this.total_detuction,
      "basic_salary":this.signUpObj.basic_salary,
    }

    let loggedUser = localStorage.getItem('loggedUser');


    if (loggedUser !== null) {
      let data = JSON.parse(loggedUser)
        this.obj ={
          ...this.obj,
          "email":data.email,
          "phone":data.phone,
          "firstName":data.firstName,
          "employee_id":data._id

        }
    } else {
        console.log('No logged user found in local storage.');
    }
    
  }

  onRegister() {
 
    this.http.post<any>(`${URL}/auth/api/employee/add-salary`, this.signUpObj).subscribe({
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

  pay() {

    this.http.post<any>(`${URL}/auth/api/employee/add-salary`, this.obj).subscribe({
      next: (response) => {
        // Handle response accordingly
        if (response.status == 200) {
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
   
    this.router.navigateByUrl('/salary');
  }

}

export class SignUpModel  {
  basic_salary: string;
  loan: string;
  tax: string;

  constructor() {
    this.basic_salary =""
    this.loan = ""
    this.tax = ""
    
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
 