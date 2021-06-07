import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie'
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private APIKEY = "a3b413a3"
  private apiUrl = 'https://www.omdbapi.com/?apikey=' + this.APIKEY + "&"

  constructor(
    private http: HttpClient,
  ) {}
  

  async getMovies(query: string): Promise<SearchResult> {
    return await this.http.get<SearchResult>(
      this.apiUrl + "s=" + query
    ).toPromise()
  }

  async getMovieById(id : string): Promise<Movie>{
    return await this.http.get<Movie>(
      this.apiUrl + "i=" + id
    ).toPromise()
  }

  async getMoviesByPage(query: string, page : number): Promise<SearchResult>{
    return await this.http.get<SearchResult>(
      this.apiUrl + "s=" + query + "&page=" + page
    ).toPromise()
  }

}

