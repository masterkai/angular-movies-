import {Component, input} from '@angular/core';
import {MovieModel} from "./movie.model";
import {CurrencyPipe, DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  movie = input.required<MovieModel>()
  index = input.required<number>();
}
