import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to redirect on successful login
import { AuthService } from '../../../@application/services/auth.service';
import { Paths } from '../../../@application/enums/paths';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']  // Corrected the typo here
})
export class LogInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // For displaying error messages if login fails

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (res: any) => {
        // Successfully logged in
        // Store the JWT token and user role in localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);

        // Redirect based on the user's role
        const role = res.user.role;
        console.log(role);

        if (role === 0) {
          this.router.navigate([[Paths.Admin_Home]]);
        } else if (role === 2) {
          this.router.navigate([Paths.Admin_Home]);
        } else if (role === 1) {
          this.router.navigate([Paths.Student_Home]);
        }
      },
      (error) => {
        // Handle login failure
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login failed:', error);
      }
    );
  }
}
