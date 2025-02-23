import { Component, inject } from '@angular/core';
import { HomecatpgeriesService } from '../../../home/services/homecatpgeries.service';
import { Icarogery } from '../../../home/models/icarogery';

@Component({
  selector: 'app-catogary',
  imports: [],
  templateUrl: './catogary.component.html',
  styleUrl: './catogary.component.css'
})
export class CatogaryComponent {
private catogeryservice=inject(HomecatpgeriesService)
catogery:Icarogery[]=[{}] as Icarogery[]
getallcatogeryhome(){
  this.catogeryservice.gelallhomecategoery().subscribe({
    next:(res)=>{
this.catogery=res.data;
console.log(this.catogery);
    }
})
}
ngOnInit(): void {
  this.getallcatogeryhome();
}
}
