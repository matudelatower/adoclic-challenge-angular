import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  submitted = false;
  errorForm = false;

  private formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.goHome();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.errorForm = true;
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email && password) {
      if (this.authService.login(email, password)) {
        this.goHome();
      }
    }

    return;

  }

  goHome(){
    this.router.navigate(['/shopping']);
  }
}
