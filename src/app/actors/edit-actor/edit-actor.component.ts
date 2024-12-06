import {Component, inject, Input, numberAttribute, OnInit} from '@angular/core';
import {ActorCreationDTO, ActorDTO} from '../actors.models';
import {ActorsFormComponent} from "../actors-form/actors-form.component";
import {ActorsService} from "../actors.service";
import {Router} from "@angular/router";
import {extractErrors} from "../../shared/functions/extractErrors";
import {LoadingComponent} from "../../shared/components/loading/loading.component";
import {DisplayErrorsComponent} from "../../shared/components/display-errors/display-errors.component";

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [ActorsFormComponent, LoadingComponent, DisplayErrorsComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent implements OnInit {
  @Input({transform: numberAttribute})
  id!: number;
  actorsService = inject(ActorsService)
  router = inject(Router)
  errors: string[] = []
  model?: ActorDTO;

  saveChanges(actor: ActorCreationDTO){
    this.actorsService.update(this.id, actor).subscribe({
      next: () => this.router.navigate(['/actors']),
      error: (error) => {
        this.errors = extractErrors(error)
      }
    });
  }

  ngOnInit(): void {
    this.actorsService.getById(this.id).subscribe({
      next: (actor) => this.model = actor
    })
  }

}
