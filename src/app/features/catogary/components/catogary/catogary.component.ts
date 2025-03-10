import { Component, inject, OnDestroy } from '@angular/core';
import { HomecatpgeriesService } from '../../../home/services/homecatpgeries.service';
import { Icarogery } from '../../../home/models/icarogery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catogary',
  imports: [],
  templateUrl: './catogary.component.html',
  styleUrl: './catogary.component.css'
})
export class CatogaryComponent implements OnDestroy {
  private catogeryservice = inject(HomecatpgeriesService)
  catogery: Icarogery[] = [{}] as Icarogery[]
  private unsub: Subscription = new Subscription()

  getallcatogeryhome() {
    this.unsub = this.catogeryservice.gelallhomecategoery().subscribe({
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
    this.unsub.unsubscribe()
  }
}
