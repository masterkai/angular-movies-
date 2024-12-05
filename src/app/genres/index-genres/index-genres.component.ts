import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {GenresService} from "../genres.service";
import {GenreDTO} from "../genres.models";
import {environment} from "../../../environments/environment";
import {MatTableModule} from "@angular/material/table";
import {GenericListComponent} from "../../shared/components/generic-list/generic-list.component";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {PaginationDTO} from "../../shared/models/PaginationDTO";
import {HttpResponse} from "@angular/common/http";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, MatTableModule, GenericListComponent, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.css'
})
export class IndexGenresComponent implements OnInit{
  genresService = inject(GenresService)
  genres!: GenreDTO[]
  columnToDisplay = ['id', 'name', 'actions']
  pagination: PaginationDTO = {page: 1, recordsPerPage: 5}
  totalRecordsCount!: number

  ngOnInit(): void {
    this.loadRecords()
  }

  loadRecords() {
    this.genresService.getPaginated(this.pagination).subscribe({
      next: (response: HttpResponse<GenreDTO[]>) => {
        this.genres = response.body as GenreDTO[]
        this.totalRecordsCount = Number(response.headers.get('total-records-count'))
      },
      error: () => this.genres = []
    })
  }

  onPageChanged($event: PageEvent) {
    this.pagination.page = $event.pageIndex + 1
    this.pagination.recordsPerPage = $event.pageSize
    this.loadRecords()
  }
  delete(id: number) {
    this.genresService.delete(id).subscribe({
      next: () => this.loadRecords()
    })
  }
}
