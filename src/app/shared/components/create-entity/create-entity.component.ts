import { AfterViewInit, Component, ComponentRef, inject, input, ViewChild, ViewContainerRef } from '@angular/core';
import { DisplayErrorsComponent } from "../display-errors/display-errors.component";
import { ActorCreationDTO } from "../../../actors/actors.models";
import { CRUD_SERVICE_TOKEN } from "../../provider/providers";
import { Router } from "@angular/router";
import { ICRUDServices } from "../../interfaces/ICRUDServices";
import { extractErrors } from "../../functions/extractErrors";

@Component({
  selector: 'app-create-entity',
  standalone: true,
  imports: [
    DisplayErrorsComponent
  ],
  templateUrl: './create-entity.component.html',
  styleUrl: './create-entity.component.css'
})
export class CreateEntityComponent<TDTO, TCreationDTO> implements AfterViewInit{
  title = input.required<string>()
  errors!: string[];
  router = inject(Router)
  CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDServices<TDTO, TCreationDTO>
  formComponent = input.required<any>()
  indexRoute = input.required<string>()
  @ViewChild("contentForm", {read: ViewContainerRef})
  contentForm!: ViewContainerRef
  private componentRef!: ComponentRef<any>

  ngAfterViewInit(): void {
    this.componentRef = this.contentForm?.createComponent(this.formComponent())
    this.componentRef.instance.postForm.subscribe((model: TCreationDTO) => {
      this.saveChanges(model)
    })

  }
  saveChanges(entity: TCreationDTO){
    this.CRUDService.create(entity).subscribe({
      next: () => {
        this.router.navigate([this.indexRoute()]);
      },
      error: (error) => {
        this.errors = extractErrors(error);
      }
    });
  }
}
