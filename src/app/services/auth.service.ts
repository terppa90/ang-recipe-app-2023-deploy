import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; // kirjasto jwt:n käsittelyyn
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthService {
  // private apiUrl = 'http://localhost:3000/users/login'; // autentikaatiopalvelun osoite
  private apiUrl =
    'https://ang-recipe-app-2023-api-terppa90.onrender.com/users/login'; // autentikaatiopalvelun osoite
  private apiUrlReg =
    'https://ang-recipe-app-2023-api-terppa90.onrender.com/users/register'; // url rekisteröintiin
  // private apiUrlReg = 'http://localhost:3000/users/register'; // url rekisteröintiin
  public token: string;
  private jwtHelp = new JwtHelperService(); // helpperipalvelu jolla dekoodataan token
  private subject = new Subject<any>(); // subjectilla viesti navbariin että token on tullut

  constructor(private http: HttpClient) {
    // Jos token on jo sessionStoragessa, otetaan se sieltä muistiin
    const currentUser = JSON.parse(sessionStorage.getItem('accesstoken'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        this.apiUrl,
        { email: email, password: password },
        { responseType: 'json' }
      )
      .pipe(
        map((res) => {
          console.log(res);

          const token = res['token'];
          if (token) {
            this.token = token;
            /* Tässä tutkitaan onko tokenin payloadin sisältö oikea.
             */
            try {
              // dekoodataan token
              const payload = this.jwtHelp.decodeToken(token);
              console.log(payload);
              // Tässä voidaan tarkistaa tokenin oikeellisuus
              if (payload.email === email) {
                // token sessionStorageen
                sessionStorage.setItem(
                  'token',
                  JSON.stringify({ email: email, token: token })
                );
                this.loginTrue(); // lähetetään viesti navbariin että vaihdetaan login:true -tilaan
                console.log('login onnistui');
                return true; // saatiin token
              } else {
                console.log('login epäonnistui');
                return false; // ei saatu tokenia
              }
            } catch (err) {
              return false;
            }
          } else {
            console.log('tokenia ei ole');
            return false;
          }
        })
      );
  }

  loginTrue(): Observable<any> {
    this.subject.next(true);
    return this.subject.asObservable();
  }

  // logout poistaa tokenin sessionStoragesta
  logout(): void {
    this.token = null;
    sessionStorage.removeItem('token');
  }

  // Käyttäjän rekisteröinti
  register(user: Object) {
    return this.http.post<any>(this.apiUrlReg, user);
  }
}
