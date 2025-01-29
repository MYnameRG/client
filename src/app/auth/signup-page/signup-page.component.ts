import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: false,
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const fieldValues = this.registrationForm.value;
      if (fieldValues.confirmPassword === fieldValues.password) {
        this.authService.signup({
          firstName: fieldValues.firstName,
          lastName: fieldValues.lastName,
          email: fieldValues.email,
          password: fieldValues.password
        }).subscribe((response) => {
          if (response != null && response.isSuccess == true) {
            this.router.navigate(['/login']);
          } else {
            console.log(response.data.msg);
          }
        });
      }
    }
  }
}
