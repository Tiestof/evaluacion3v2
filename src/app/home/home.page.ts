import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonItem, IonList } from '@ionic/angular/standalone';
import { BarraBusquedaComponent } from '../barra-busqueda/barra-busqueda.component'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [FormsModule, IonList, IonItem, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, BarraBusquedaComponent],
})
export class HomePage {

  listaXid : String [] = []

  constructor() {}


}