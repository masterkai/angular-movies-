import {Component} from '@angular/core';
import {GenresService} from "../genres.service";
import {CRUD_SERVICE_TOKEN} from "../../shared/provider/providers";
import {IndexEntitiesComponent} from "../../shared/components/index-entities/index-entities.component";

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [
    IndexEntitiesComponent
  ],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.css',
  providers: [{
    provide: CRUD_SERVICE_TOKEN,
    useClass: GenresService
  }]
})
export class IndexGenresComponent {

}
