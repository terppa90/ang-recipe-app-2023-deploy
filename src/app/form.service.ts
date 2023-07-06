import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  _url = 'https://ang-recipe-app-2023-api-terppa90.onrender.com/recipes';
  // _url = 'http://localhost:3000/recipes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}
  // Reseptin lisäys serverille lomakkeelta
  FormAddRecipe(userData): Observable<any> {
    const mytoken = JSON.parse(sessionStorage.getItem('token'));
    console.log(mytoken);

    userData.token = mytoken.token;
    return this.http.post<any>(this._url, userData, this.httpOptions);
  }
  // Update
  FormUpdateRecipe(id, userData): Observable<any> {
    const mytoken = JSON.parse(sessionStorage.getItem('token'));
    console.log(mytoken);

    userData.token = mytoken.token;
    return this.http.put<any>(`${this._url}/${id}`, userData, this.httpOptions);
  }
}
