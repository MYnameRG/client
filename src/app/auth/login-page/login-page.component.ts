import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { OAuthService } from '../../services/oauth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppComponent } from '../../app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginForm: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.appComponent.checkUrl = window.location.pathname;
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const fieldValues = this.loginForm.value;
      this.authService.login({
        email: fieldValues.email,
        password: fieldValues.password
      }).subscribe((response) => {
        if (response != null && response.isSuccess == true) {
          localStorage.setItem('token', response.data);
          this.router.navigate(['/integration']);
        } else {
          console.log(response.data.msg);
        }
      });
    }
  }
}
