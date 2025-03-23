import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceClientService } from '../Services/service-client.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  constructor(private myService: ServiceClientService) { }

  hotels: any[] = [];
  isLoading: boolean = true;
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number }[] = [];


 
    ngOnInit(): void {
      this.myService.getHotels().subscribe(
        (data) => {
          console.log("Hôtels reçus :", data);
          this.hotels = data;
        },
        (error) => {
          console.error("Erreur lors de la récupération des hôtels :", error);
          this.isLoading = false; // Désactive le chargement une fois les données reçues
        }
      );

     
  }


  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
