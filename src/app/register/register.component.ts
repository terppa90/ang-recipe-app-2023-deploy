import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUserData = {
    username: '',
    email: '',
    password: '',
    // isadmin: true,
  };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  // Button laukaisee tämän metodin.
  // Onnistuneen rekisteröinnin jälkeen käyttäjä ohjataan login sivulle
  registerUser() {
    this.authService.register(this.registerUserData).subscribe({
      next: () => {
        console.log('rekisteröityminen onnistui');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
