import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

register() {
  this.authservice.register(this.model).subscribe(() => {
   console.log('registration successful.');
  }, error => {
    console.log(error);
  });
}

cancel() {
  this.cancelRegister.emit(false);
}

}
