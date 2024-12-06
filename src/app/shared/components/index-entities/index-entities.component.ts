import { Component, inject, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { HttpResponse } from "@angular/common/http";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { GenericListComponent } from "../generic-list/generic-list.component";
import { PaginationDTO } from "../../models/PaginationDTO";
import { CRUD_SERVICE_TOKEN } from "../../provider/providers";

@Component({
  selector: 'app-index-entities',
  standalone: true,
  imports: [ RouterLink, MatIconModule, MatButtonModule, MatTableModule, GenericListComponent, MatPaginatorModule, SweetAlert2Module ],
  templateUrl: './index-entities.component.html',
  styleUrl: './index-entities.component.css'
})
export class IndexEntitiesComponent<TDTO> implements OnInit {
  title = input.required<string>()
  createRoute = input.required<string>()
  editRoute = input.required<string>()
  CRUDService = inject(CRUD_SERVICE_TOKEN) as any
  entities!: TDTO[]
  // @ts-ignore
  columnsToDisplay = input.required<string[]>()
  pagination: PaginationDTO = { page: 1, recordsPerPage: 5 }

  totalRecordsCount!: number

  ngOnInit(): void {
    this.loadRecords()
  }

  loadRecords() {
    this.CRUDService.getPaginated(this.pagination).subscribe({
      next: (response: HttpResponse<TDTO[]>) => {
        this.entities = response.body as TDTO[]
        this.totalRecordsCount = Number(response.headers.get('total-records-count'))
      },
      error: () => this.entities = []
    })
  }

  onPageChanged($event: PageEvent) {
    this.pagination.page = $event.pageIndex + 1
    this.pagination.recordsPerPage = $event.pageSize
    this.loadRecords()
  }

  delete(id: number) {
    this.CRUDService.delete(id).subscribe({
      next: () => this.loadRecords()
    })
  }

  firstLetterUppercase(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
