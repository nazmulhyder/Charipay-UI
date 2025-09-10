import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrComponent } from './toastr/toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Charipay-UI';
}
