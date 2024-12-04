import {Component, input} from '@angular/core';

@Component({
  selector: 'app-display-errors',
  standalone: true,
  imports: [],
  templateUrl: './display-errors.component.html',
  styleUrl: './display-errors.component.css'
})
export class DisplayErrorsComponent {
  errors = input.required<string[]>();
}
