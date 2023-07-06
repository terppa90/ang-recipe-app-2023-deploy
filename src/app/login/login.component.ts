import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error = '';
  // injektoidaan router ja authService
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // aina kun login-komponentti ladataan, poistetaan token
    this.authService.logout();
  }

  // lomakkeen lähetys.
  // authService palauttaa observablen jossa on joko true tai false.
  // Mikäli kirjautuminen onnistuu, ohjataan käyttäjä Etusivulle
  onSubmit(formData) {
    this.authService
      .login(formData.email, formData.password)
      .subscribe((result) => {
        if (result === true) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Tunnus tai salasana väärä';
        }
      });
  }
}
