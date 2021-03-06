import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/User';
import { userInfo } from 'os';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();

  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authservice: AuthService, private alertify: AlertifyService , private fb: FormBuilder , private router: Router) { }

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('' , [Validators.required , Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('' , Validators.required),
    // }, this.passwordMatchValidator);+
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

createRegisterForm() {
  this.registerForm = this.fb.group({
    gender: ['male'],
    username: ['' , Validators.required],
    knownAs: ['' , Validators.required],
    dateOfBirth: ['' , Validators.required],
    city: ['' , Validators.required],
    country: ['' , Validators.required],
    password: ['' , [Validators.required , Validators.minLength(4), Validators.maxLength(8)]],
    confirmPassword: ['', Validators.required]
  }, {validator: this.passwordMatchValidator});
}

passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
}

register() {
  if (this.registerForm.valid) {
    this.user = Object.assign({}, this.registerForm.value);
    this.authservice.register(this.user).subscribe(() => {
      this.alertify.success('Registration successful.');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.authservice.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      });
    });
  }
}

cancel() {
  this.cancelRegister.emit(false);
  this.alertify.message('Logout success');
}

}
