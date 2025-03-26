import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ServiceClientService } from '../Services/service-client.service';
import { PayeService } from '../Services/paye.service';
import { OffreService } from '../Services/offre.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  constructor(private myService: ServiceClientService,private servieP: PayeService ,private servieO:OffreService ) { }
  payes: any[] = [];
  hotels: any[] = [];
  isLoading: boolean = true;
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number }[] = [];

    ngOnInit(): void {
      


      this.servieP.getPaye().subscribe(
        (data) => {
          console.log("paye reçus :", data);
          this.payes = data.payes;
        },
        (error) => {
          console.error("Erreur lors de la récupération des hôtels :", error);
          this.isLoading = false; // Désactive le chargement une fois les données reçues
        }
      );
      this.myService.getHotels().subscribe(
        (data) => {
          console.log("Hôtels reçus :", data);
          this.hotels = data.hotels;
        },
        (error) => {
          console.error("Erreur lors de la récupération des hôtels :", error);
          this.isLoading = false; // Désactive le chargement une fois les données reçues
        }
      );
      this.servieO.getOffre().subscribe(
        (data) => {
          console.log("Offres reçus :", data);
          this.hotels = data.offres;
        },
        (error) => {
          console.error("Erreur lors de la récupération des hôtels :", error);
          this.isLoading = false; // Désactive le chargement une fois les données reçues
        }
      );


     
  }

   
  ratings = ["3 étoiles", "4 étoiles", "5 étoiles"];
    priceRanges = ["Under $80", "$100 to $200", "$200 to $300", "$300 to $400", "$400 to $500", "$500 to $600", "$600 to $700", "$700 to $800", "$800 to $900", "Over $1000"];
    selectedPrices = new Set<string>();
    allSelected = false;
   
    selectedRating: string = "";

  // Liste des filtres et leur état ouvert/fermé
  accordions = {
    position: false,
    category: false,
    rating: false,
    price: false
  };

  // Référence aux éléments DOM des accordéons
  @ViewChildren('accordionContent') accordionContents!: QueryList<ElementRef>;

  /**
   * Ouvre ou ferme un accordéon sans changer son style
   * @param key Nom de l'accordéon
   */
  toggleAccordion(key: keyof typeof this.accordions) {
    this.accordions[key] = !this.accordions[key]; // Inverse l'état de l'accordéon

    // Fermer les autres accordéons (optionnel, si tu veux un seul ouvert à la fois)
    Object.keys(this.accordions).forEach(k => {
      if (k !== key) {
        this.accordions[k as keyof typeof this.accordions] = false;
      }
    });
  }




  
  
    
  
    updateAllSelected() {
      this.allSelected = this.selectedPrices.size === this.priceRanges.length;
    }
    togglePriceSelection(price: string) {
      if (this.selectedPrices.has(price)) {
        this.selectedPrices.delete(price);
      } else {
        this.selectedPrices.add(price);
      }
      this.allSelected = this.selectedPrices.size === this.priceRanges.length;
    }
    toggleAllPrices(event: any) {
      this.allSelected = event.target.checked;
      this.selectedPrices.clear();
      if (this.allSelected) {
        this.priceRanges.forEach(price => this.selectedPrices.add(price));
      }
    }


 
   

  
  
  

  
}
