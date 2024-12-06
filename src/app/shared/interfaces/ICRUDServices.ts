import { PaginationDTO } from "../models/PaginationDTO";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

export interface ICRUDServices<TDTO, TCreationDTO> {
  getPaginated(pagination: PaginationDTO): Observable<any>;
  create(entities: TCreationDTO): Observable<any>;
  update(id: number, entities: TCreationDTO): Observable<any>;
  delete(id: number): Observable<any>;
  getById(id: number): Observable<TDTO>;
}
