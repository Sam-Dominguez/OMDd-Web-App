// interface of a search result returned by OMDb API call
export interface SearchResult {
    Search?:       Result[];
    totalResults?: string;
    Response?:     string;
}

// a single movie in the list of movie results, Movie Interface
export interface Result {
    Title?:  string;
    Year?:   string;
    imdbID?: string;
    Type?:   Type;
    Poster?: string;
}

export enum Type {
    Movie = "movie",
}
