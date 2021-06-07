import { Component, OnInit } from '@angular/core';
import { Movie } from "../movie";
import { Result, SearchResult } from '../search-result';
import { MovieService } from "../movie.service";
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {  
  result: SearchResult = {};
  pageNumber: number = 1;
  totalPages: number = 0;
  totalResults: number = 0;
  movies: Result[] = [];
  selectedMovie? : Movie;
  details = false;
  loading = false;
  query: string = "";

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
  }

  async onSelect(movie: Result){
    const movieId = movie.imdbID || "";
    this.details = true;
    this.loading = true;
    this.selectedMovie = await this.movieService.getMovieById(movieId);
    this.loading = false;
  }

  back(){
    this.details = false;
  }

  async getMovies() {
    this.loading = true;
    this.details = false;
    this.result = await this.movieService.getMovies(this.query);
    this.totalResults = parseInt(this.result.totalResults || '0');
    this.totalPages = Math.round(this.totalResults / 10);
    console.log(this.totalResults);
    console.log(this.totalPages);
    this.pageNumber = 1;
    this.movies = this.result.Search || this.movies;
    this.loading = false;
  }

  async getMoviesByPage(page: number){
    this.loading = true;
    this.details = false;
    this.pageNumber = page;
    this.result = await this.movieService.getMoviesByPage(this.query, page);
    this.movies = this.result.Search || this.movies;
    console.log(this.pageNumber);
    this.loading = false;
  }
}
