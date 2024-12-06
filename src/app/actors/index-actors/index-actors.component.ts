import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {ActorsService} from "../actors.service";
import {PaginationDTO} from "../../shared/models/PaginationDTO";
import {HttpResponse} from "@angular/common/http";
import {ActorDTO} from "../actors.models";
import {GenericListComponent} from "../../shared/components/generic-list/generic-list.component";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {CRUD_SERVICE_TOKEN} from "../../shared/provider/providers";
import {IndexEntitiesComponent} from "../../shared/components/index-entities/index-entities.component";

@Component({
  selector: 'app-index-actors',
  standalone: true,
  imports: [
    IndexEntitiesComponent
  ],
  templateUrl: './index-actors.component.html',
  styleUrl: './index-actors.component.css',
  providers: [{
    provide: CRUD_SERVICE_TOKEN,
    useClass: ActorsService
  }]
})
export class IndexActorsComponent  {}
