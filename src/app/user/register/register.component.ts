import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}
  
  inSubmission: boolean = false;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email], [this.emailTaken.validate]);
  age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]);
  confirmPassword = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]);
  showAlert: boolean = false;
  alertMsg: string = 'Your Account Is Being Created';
  alertColor: string = 'blue';
  
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  }, [RegisterValidators.match('password', 'confirmPassword')] );
 
  async register() {
    this.showAlert = true;
    this.alertMsg = 'Your Account Is Being Created';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try{
     await this.auth.createUser(this.registerForm.value);
    }
    catch(e){
      console.error(e);
      this.alertMsg = 'Error With Your Account Creation';
      this.alertColor = 'red';
      this.inSubmission = false;
      return 
    }
    this.alertMsg = 'Your Account Has Been Created';
    this.alertColor = 'green';
  }

}
