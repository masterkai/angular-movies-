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

@Component({
  selector: 'app-index-actors',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, MatTableModule, MatPaginatorModule, GenericListComponent, SweetAlert2Module],
  templateUrl: './index-actors.component.html',
  styleUrl: './index-actors.component.css'
})
export class IndexActorsComponent implements OnInit {
  actorsService = inject(ActorsService);
  pagination: PaginationDTO = {
    page: 1,
    recordsPerPage: 5
  };
  columnToDisplay = ['id', 'name', 'actions'];
  totalRecordsCount: number = 0;
  actors!: ActorDTO[];
  onPageChanged($event: PageEvent) {
    this.pagination.page = $event.pageIndex + 1
    this.pagination.recordsPerPage = $event.pageSize
    this.loadRecords()
  }

  loadRecords() {
    this.actorsService.getPaginated(this.pagination).subscribe({
      next: (response: HttpResponse<ActorDTO[]>) => {
        this.totalRecordsCount = Number(response.headers.get('total-records-count'));
        this.actors = response.body as ActorDTO[];
      }
    })
  }

  updatePagination(data: PaginationDTO) {
    this.pagination = {...this.pagination, ...data};
    this.loadRecords();
  }

  ngOnInit() {
    this.loadRecords();
  }

  delete(id: any) {
    this.actorsService.delete(id).subscribe({
      next: () => this.loadRecords()
    })
  }
}
