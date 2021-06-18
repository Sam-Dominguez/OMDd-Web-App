import { Component, OnInit } from '@angular/core';
import { Movie } from "../movie";
import { Result, SearchResult } from '../search-result';
import { MovieService } from "../movie.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {  

  // variable delcaration and initialization
  result: SearchResult = {};
  pageNumber: number = 1;
  totalPages: number = 1;
  totalResults: number = 1;
  movies: Result[] = [];
  selectedMovie? : Movie;
  details = false;
  loading = false;
  query: string = "";

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {

  }

  // when a movie is selected among results, make OMDb api call for movie details
  async onSelect(movie: Result){
    const movieId = movie.imdbID || "";
    this.details = true;
    this.loading = true;
    this.selectedMovie = await this.movieService.getMovieById(movieId);
    this.loading = false;
  }

  // return to search results page
  back(){
    this.details = false;
  }

  // general query search OMDb api call and logic for page numbers
  async getMovies() {
    this.loading = true;
    this.details = false;
    this.result = await this.movieService.getMovies(this.query);
    this.movies = this.result.Search || [];
    this.totalResults = parseInt(this.result.totalResults || '0');
    this.totalPages = Math.round(this.totalResults / 10);
    if(this.totalPages == 0 && this.totalResults > 0){
      this.totalPages = 1;
    }
    this.pageNumber = 1;
    this.loading = false;
  }

  // when page changes, make OMDb api call for page contents
  async getMoviesByPage(page: number){
    this.loading = true;
    this.details = false;
    this.pageNumber = page;
    this.result = await this.movieService.getMoviesByPage(this.query, page);
    this.movies = this.result.Search || this.movies;
    this.loading = false;
  }
}
