import { Component, inject, OnInit } from '@angular/core';
import { HomecatpgeriesService } from '../../services/homecatpgeries.service';
import { Icarogery } from '../../models/icarogery';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-catogary-slider',
  imports: [CarouselModule],
  templateUrl: './catogary-slider.component.html',
  styleUrl: './catogary-slider.component.css'
})
export class CatogarySliderComponent implements OnInit {
  private catogeryservice = inject(HomecatpgeriesService)
  catogery: Icarogery[] = [{}] as Icarogery[]
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    
    dots: true,
   
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  getallcatogeryhome() {
    this.catogeryservice.gelallhomecategoery().subscribe({
      next: (res) => {
        this.catogery = res.data;
        console.log(this.catogery);
      }
    })
  }
  ngOnInit(): void {
    this.getallcatogeryhome();
  }
}
