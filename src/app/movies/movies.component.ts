import { Component, OnInit } from '@angular/core';
import { Movie } from "../movie";
import { Result } from '../search-result';
import { MovieService } from "../movie.service";
import { FormControl, Validators, NgForm } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {  
  movies: Result[] = [];
  selectedMovie? : Movie;
  details = false;
  loading = false;
  query : string = "";

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getMovies("");
    this.loading = false;
  }

  async onSelect(movie: Result){
    const movieId = movie.imdbID || "";
    this.details = true;
    this.loading = true;
    this.selectedMovie = await this.movieService.getMovieById(movieId);
    this.loading = false;
  }

//   async generateThumbnail(url: string){
//     const imageThumbnail = require('image-thumbnail');

//     try {
//       const thumbnail = await imageThumbnail({uri: url});
//       console.log(thumbnail);
//     } catch (err) {
//       console.error(err);
// }
//   }

  back(){
    this.details = false;
  }

  async getMovies(query: string) {
    this.loading = true;
    this.details = false;
    var result = await this.movieService.getMovies(query);
    this.movies = result.Search || this.movies;
    this.loading = false;
  }
}
