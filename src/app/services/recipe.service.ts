import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // oikean palvelimen osoite
  // private recipesUrl = 'http://localhost:3000/recipes';
  private recipesUrl =
    'https://ang-recipe-app-2023-api-terppa90.onrender.com/recipes';
  // http-asetukset
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  /* GET: Haetaan kaikki reseptit */
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  /* GET: Haetaan yksittäinen resepti id:n perusteella */
  // getRecipe(id: number): Recipe {
  //   return this.getAll().find((recipe) => recipe.id == id)!;
  // }

  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url);
  }

  /** DELETE: Poistetaan resepti id: perusteella */
  delRecipe(id: string): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.delete<Recipe>(url).pipe(catchError(this.handleErr));
  }

  // Muokataan reseptiä
  editRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url);
  }

  // yksinkertaisempi virheenkäsittely
  private handleErr(error: any): Observable<any> {
    console.error('Tapahtui virhe: ', error);
    return error.message || error;
  }

  // getAll(): Recipe[] {
  //   return [
  //     {
  //       id: 1,
  //       name: 'Pizza',
  //       author: 'Luigi',
  //       supplies: [
  //         {
  //           name: 'Tonnikala',
  //           quantity: '2 Purkkia',
  //         },
  //       ],
  //       recipe: 'Leivo ja lyö tonnikalaa päälle',
  //     },
  //     {
  //       id: 2,
  //       name: 'Burgeri',
  //       author: 'Luigi',
  //       supplies: [
  //         {
  //           name: 'Jauheliha',
  //           quantity: '400g',
  //         },
  //       ],
  //       recipe: 'Paista Paista',
  //     },
  //     {
  //       id: 3,
  //       name: 'Sushi',
  //       author: 'Luigi',
  //       supplies: [
  //         {
  //           name: 'Kala',
  //           quantity: '200g',
  //         },
  //       ],
  //       recipe: 'Syö syö',
  //     },
  //   ];
  // }
}
