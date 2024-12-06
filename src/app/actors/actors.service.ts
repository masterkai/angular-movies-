import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ActorCreationDTO, ActorDTO} from "./actors.models";
import {Observable} from "rxjs";
import {buildQueryParams} from "../shared/functions/buildQueryParams";
import {PaginationDTO} from "../shared/models/PaginationDTO";
import { ICRUDServices } from "../shared/interfaces/ICRUDServices";

@Injectable({
  providedIn: 'root'
})
export class ActorsService implements ICRUDServices<ActorDTO, ActorCreationDTO> {

  constructor() { }

  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl + '/actors'

  public getPaginated(pagination: PaginationDTO): Observable<HttpResponse<ActorDTO[]>> {
    const queryParams = buildQueryParams(pagination);
    return this.http.get<ActorDTO[]>(this.baseUrl, {params: queryParams, observe: 'response'});
  }

  public getById(id: number): Observable<ActorDTO> {
    return this.http.get<ActorDTO>(`${this.baseUrl}/${id}`);
  }

  public create(actor: ActorCreationDTO): Observable<ActorCreationDTO> {
    const formData = this.buildFormData(actor);
    return this.http.post<ActorCreationDTO>(this.baseUrl, formData);
  }

  public update(id: number, actor: ActorCreationDTO): Observable<ActorCreationDTO> {
    const formData = this.buildFormData(actor);
    return this.http.put<ActorCreationDTO>(`${this.baseUrl}/${id}`, formData);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private buildFormData(actor: ActorCreationDTO): FormData {
    const formData = new FormData();
    formData.append('name', actor.name);
    formData.append('dateOfBirth', actor.dateOfBirth.toISOString().split('T')[0]);
    if (actor.picture) {
      formData.append('picture', actor.picture);
    }
    return formData;
  }
}
