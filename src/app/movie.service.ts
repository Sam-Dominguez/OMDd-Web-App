import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie'
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private APIKEY = "a3b413a3" // this should be hidden 
  private apiUrl = 'https://www.omdbapi.com/?apikey=' + this.APIKEY + "&"

  constructor(
    private http: HttpClient,
  ) {}
  
  // OMDb Api routes

  // returns movies given a search query of type SearchResult (interface)
  async getMovies(query: string): Promise<SearchResult> {
    return await this.http.get<SearchResult>(
      this.apiUrl + "s=" + query
    ).toPromise()
  }

  // returns a single movie of type Movie (interface)
  async getMovieById(id : string): Promise<Movie>{
    return await this.http.get<Movie>(
      this.apiUrl + "i=" + id
    ).toPromise()
  }

  // returns movies by query and page number of type SearchResult (interface)
  async getMoviesByPage(query: string, page : number): Promise<SearchResult>{
    return await this.http.get<SearchResult>(
      this.apiUrl + "s=" + query + "&page=" + page
    ).toPromise()
  }

}

