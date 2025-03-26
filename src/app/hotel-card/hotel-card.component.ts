import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceClientService } from '../Services/service-client.service';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  
  hotels: any[] = [];
  isLoading: boolean = true;

  constructor(private myService: ServiceClientService) { }

  ngOnInit(): void {
    this.myService.getHotels().subscribe(
      (data) => {
        console.log("Hôtels reçus :", data);
        this.hotels = data.hotels;
        this.isLoading = false;
      },
      (error) => {
        console.error("Erreur lors de la récupération des hôtels :", error);
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    const container = this.scrollContainer.nativeElement;

    // Défilement horizontal avec la molette de la souris
    container.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault(); // Empêche le défilement vertical par défaut
      const scrollAmount = event.deltaY > 0 ? 330 : -330; // Direction du scroll
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' }); // Défile horizontalement
    });
  }
}
