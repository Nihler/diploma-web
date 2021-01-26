import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../common/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent
  ) {
    if (authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  get f(): any {
    return this.registerForm.controls;
  }

  onSubmit(): any {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log(
      this.f.username.value,
      this.f.password.value,
      this.f.email.value
    );
    this.loading = true;
    this.authService
      .register(
        this.f.email.value,
        this.f.username.value,
        this.f.password.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.loading = false;
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.router.navigate(['/register']);
        }
      );
  }
}
