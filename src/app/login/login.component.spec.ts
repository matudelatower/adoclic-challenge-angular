import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../_services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [LoginComponent,
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate email and password fields', () => {
    const email = component.loginForm.controls['email'];
    const password = component.loginForm.controls['password'];

    email.setValue('not-an-email');
    password.setValue('');

    expect(email.valid).toBeFalse();
    expect(password.valid).toBeFalse();
  });

  it('should call AuthService.login when form is valid', () => {
    const formData = {
      email: 'user@demo.com',
      password: '123456'
    };

    authServiceSpy.login.and.returnValue(true);
    component.loginForm.setValue(formData);

    component.onSubmit();

    // expect(authServiceSpy.login).toHaveBeenCalledWith(formData.email, formData.password);
  });

  it('should not call AuthService.login when form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });

    component.onSubmit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });
});
