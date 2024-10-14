import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent implements OnInit {
  isLogin: boolean = true;
  authForm: FormGroup;
  returnUrl:string='/'
  constructor(private router: Router, private fb: FormBuilder,private route:ActivatedRoute) {
    this.authForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.toggleMode();
    this.returnUrl =  this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.authForm.removeControl('name');
    } else {
      this.authForm.addControl(
        'name',
        this.fb.control('', Validators.required)
      );
    }
    this.authForm.reset();
  }
  onSubmit() {
    if (this.authForm.valid) {
      const formData = this.authForm.value;
      if (this.isLogin) {
        this.login(formData);
      } else {
        this.signup(formData);
      }
    }
  }

  private login(data: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (user: any) =>
        user.email === data.email && user.password === data.password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigateByUrl(this.returnUrl);
    } else {
      alert('Invalid email or password');
    }
  }
  private signup(data: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((user: any) => users.email === data.email)) {
      alert('Email already exists');
    } else {
      users.push(data);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.router.navigateByUrl(this.returnUrl);
    }
  }
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
