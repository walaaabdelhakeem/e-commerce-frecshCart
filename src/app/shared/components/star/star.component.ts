import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  imports: [NgFor,NgIf],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css'
})
export class StarComponent {
  @Input() rating: number = 0;  // Rating input (e.g., 4.3, 5.0, etc.)
   maxStars: number = 5; // Total stars

  get fullStars(): number[] {
    return Array(Math.floor(this.rating)).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.rating % 1 !== 0;
  }

  get emptyStars(): number[] {
    return Array(this.maxStars - Math.ceil(this.rating)).fill(0);
  }
}
