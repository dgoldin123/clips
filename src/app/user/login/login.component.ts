import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }
  showAlert: boolean = false;
  alertMsg: string = 'Logging In ...';
  alertColor: string = 'blue';
  inSubmission: boolean = false;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void { }
  
  async login() {
    this.showAlert = true;
    this.alertMsg = 'Logging In ...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try{
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      );
    }
    catch(e){
      this.inSubmission = false;
      console.error(e);
      this.alertMsg = 'Error Logging In';
      this.alertColor = 'red';     
      return 
    }
    this.alertMsg = 'Your Are Logged In';
    this.alertColor = 'green';
    //console.log("this.credentials");
    //console.log(this.credentials);
  }

}
