import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HomecatpgeriesService } from '../../services/homecatpgeries.service';
import { Icarogery } from '../../models/icarogery';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-catogary-slider',
  imports: [CarouselModule],
  templateUrl: './catogary-slider.component.html',
  styleUrl: './catogary-slider.component.css',
})
export class CatogarySliderComponent implements OnInit,OnDestroy {
  private catogeryservice = inject(HomecatpgeriesService)
  catogery: Icarogery[] = [{}] as Icarogery[]
    private unsub:Subscription=new Subscription()
  
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    rtl:document.documentElement.lang=='ar'?true:false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
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
   this.unsub= this.catogeryservice.gelallhomecategoery().subscribe({
      next: (res) => {
        this.catogery = res.data;
        console.log(this.catogery);
      }
    })
  }
  ngOnInit(): void {
    this.getallcatogeryhome();
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
