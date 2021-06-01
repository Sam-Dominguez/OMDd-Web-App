export interface SearchResult {
    Search?:       Result[];
    totalResults?: string;
    Response?:     string;
}

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
