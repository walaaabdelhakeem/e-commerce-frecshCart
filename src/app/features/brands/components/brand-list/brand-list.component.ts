import { Component, inject, OnInit } from '@angular/core';
import { Ibrands } from '../../models/ibrands';
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'app-brand-list',
  imports: [],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css'
})
export class BrandListComponent implements OnInit{
  private brandservice=inject(BrandsService)
Brands:Ibrands[]=[{}] as Ibrands[]
getallBrandshome(){
  this.brandservice.gelallhomeBrands().subscribe({
    next:(res)=>{
this.Brands=res.data;
console.log(this.Brands);
    }
})
}
ngOnInit(): void {
  this.getallBrandshome();
}
}
