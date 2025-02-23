import { Component } from '@angular/core';
import { ProductListComponent } from "../../../product/components/product-list/product-list.component";
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CatogarySliderComponent } from "../catogary-slider/catogary-slider.component";

@Component({
  selector: 'app-home',
  imports: [ProductListComponent, MainSliderComponent, CatogarySliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
