import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //constructor(private authService: AuthService) { }
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    console.log('inside on signup');
    const email = form.value.email;
    const password = form.value.password;
    //this.authService.signupUser(email, password);
    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));
  }

}
