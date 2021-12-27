import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { DialogService } from 'src/app/services/dialog.service';
import { AppState, selectUserList } from 'src/app/store/app.state';
import { CreateUserAction } from 'src/app/store/user.actions';

@Component({
  selector: 'pkm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  existingUserList: UserModel[] = [];

  pageSubscriptionHandler = new Subscription();

  invalidEmail = false;

  signupForm = this.formBuilder.group({
    fullName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userStore: Store<AppState>,
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) { }

  ngOnInit( ): void {
    this.getUserList();
    this.setFormEvents();
  }

  setFormEvents() {
    this.pageSubscriptionHandler.add(
      this.signupForm.controls['email'].valueChanges.pipe(
        debounceTime(500)
      ).subscribe(
        (email: string) => {
          if(email === undefined || email.length === 0){
            this.invalidEmail = false;
          }

          this.checkForValidUserEmail(email);
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

  submitTrainer(){
    this.invalidEmail = false;

    if(this.signupForm.invalid){
      this.signupForm.markAllAsTouched();
      return;
    }

    const formValues = this.signupForm.value;

    if(this.invalidEmail) {
      return;
    }

    this.userStore.dispatch(CreateUserAction({
      user: {
        email: formValues.email,
        fullName: formValues.fullName,
        password: formValues.password
      }
    }));

    this.onCreationSuccess();
  }

  checkForValidUserEmail(email: string) {
    const lowerEmail = email.toLowerCase();

    this.invalidEmail = this.existingUserList.some(w => w.email.toLowerCase() === lowerEmail);
  }

  onCreationSuccess() {
    this.dialogService.showDialog(
      'New trainer',
      'Trainer created successfully',
      'success',
      () => { this.router.navigate(['/']); }
    );
  }

}
