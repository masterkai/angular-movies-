import {Component, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {GenresService} from "../genres.service";
import {GenreDTO} from "../genres.models";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.css'
})
export class IndexGenresComponent {
    genresService = inject(GenresService)
    genres: GenreDTO[] = []

  ngOnInit(): void {
        this.genresService.getAll().subscribe({
            next: genres => this.genres = genres
        })
    }
}
