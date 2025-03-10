import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Ibrands } from '../../models/ibrands';
import { BrandsService } from '../../services/brands.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-list',
  imports: [],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit ,OnDestroy{
  private brandservice = inject(BrandsService)
  Brands: Ibrands[] = [{}] as Ibrands[]
    private unsub:Subscription=new Subscription()
  
  getallBrandshome() {
   this.unsub= this.brandservice.gelallhomeBrands().subscribe({
      next: (res) => {
        this.Brands = res.data;
        console.log(this.Brands);
      }
    })
  }
  ngOnInit(): void {
    this.getallBrandshome();
  }
  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
