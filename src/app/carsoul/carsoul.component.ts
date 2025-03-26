import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceClientService } from '../Services/service-client.service';
import { PayeService } from '../Services/paye.service';

@Component({
  selector: 'app-carsoul',
  templateUrl: './carsoul.component.html',
  styleUrls: ['./carsoul.component.css']
})
export class CarsoulComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
    constructor(private myService: PayeService) { }
  
    payes: any[] = [];
    isLoading: boolean = true;
    responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number }[] = [];
  
  
   
      ngOnInit(): void {
        this.myService.getPaye().subscribe(
          (data) => {
            console.log("paye reçus :", data);
            this.payes = data.payes;
          },
          (error) => {
            console.error("Erreur lors de la récupération des hôtels :", error);
            this.isLoading = false; // Désactive le chargement une fois les données reçues
          }
        );
  
       
    }
  
  
    scrollLeft() {
      this.scrollContainer.nativeElement.scrollBy({ left: -344, behavior: 'smooth' });
    }
  
    scrollRight() {
      this.scrollContainer.nativeElement.scrollBy({ left: 344, behavior: 'smooth' });
    }

}
