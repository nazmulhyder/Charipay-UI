import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {

}
