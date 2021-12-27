import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AppState, selectCurrentUser, selectUserList } from 'src/app/store/app.state';
import { LoginAction } from 'src/app/store/user.actions';

@Component({
  selector: 'pkm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pageSubscriptionHandler = new Subscription();

  existingUserList: UserModel[] = [];

  invalidLogin = false;

  loginForm = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userStore: Store<AppState>,
    private readonly router: Router
  ) {
    this.getUserList();
    this.setLoggedUserSelector();
  }

  ngOnInit(): void {
  }

  setLoggedUserSelector() {
    this.pageSubscriptionHandler.add(
      this.userStore.select(selectCurrentUser).subscribe(
        (currentUser) => {
          if(currentUser) {
            this.router.navigate(['/main']);
          }
        }
      )
    )
  }

  getUserList() {
    this.pageSubscriptionHandler.add(
      this.userStore.select(selectUserList).subscribe(
        (userList: UserModel[]) => {
          this.existingUserList = userList;
        }
      )
    )
  }

  submitLogin() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.invalidLogin = false;
    const loginFormValues = this.loginForm.value;

    const loggedUser = this.tryLogin(loginFormValues.user, loginFormValues.password);
    if(loggedUser) {
      this.userStore.dispatch(LoginAction({user: loggedUser}));
      return;
    }

    this.invalidLogin = true;

  }

  tryLogin(user: string, password: string) {
    const lowerEmail = user.toLowerCase();

    return this.existingUserList.find(w =>
      w.email.toLowerCase() === lowerEmail &&
      w.password === password
    );
  }
}
