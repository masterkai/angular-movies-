import {inject, Injectable} from '@angular/core';
import {GenreCreationDTO, GenreDTO} from "./genres.models";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PaginationDTO} from "../shared/models/PaginationDTO";
import {buildQueryParams} from "../shared/functions/buildQueryParams";
import { ICRUDServices } from "../shared/interfaces/ICRUDServices";

@Injectable({
  providedIn: 'root'
})
export class GenresService implements ICRUDServices<GenreDTO, GenreCreationDTO> {

  constructor() {
  }

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/genres'

  public getPaginated(pagination: PaginationDTO): Observable<HttpResponse<GenreDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<GenreDTO[]>(this.baseUrl, {params: queryParams, observe: 'response'});
  }

  // create genre function using post request
  public create(genre: GenreCreationDTO): Observable<GenreCreationDTO> {
    return this.http.post<GenreCreationDTO>(this.baseUrl, genre);
  }

  // 取得genreDTO by id
  public getById(id: number): Observable<GenreDTO> {
    return this.http.get<GenreDTO>(`${this.baseUrl}/${id}`);
  }

  // 更新
  public update(id: number, genre: GenreCreationDTO): Observable<GenreCreationDTO> {
    return this.http.put<GenreCreationDTO>(`${this.baseUrl}/${id}`, genre);
  }
  // delete
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
