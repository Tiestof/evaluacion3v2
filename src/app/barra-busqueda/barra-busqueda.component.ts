import { Component, OnInit } from '@angular/core';
import { IonSearchbar, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, 
  IonImg, SearchbarInputEventDetail, IonContent, IonModal,
  IonHeader, IonTitle, IonInput, IonText, IonGrid, IonCol, IonRow} from "@ionic/angular/standalone";
import { respuestaWSSuggest2, respuestaWSxid } from '../webservice/IOpenTripMap';
import { OpenTripMapService } from '../Servicios/open-trip-map.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addCircleOutline,camera, airplaneOutline, trash } from 'ionicons/icons';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { DestinosService } from '../Servicios/destinos.service';
import { Destinos } from '../Modelo/LlistaDestinos';
import {Camera, Photo, CameraResultType, CameraSource} from '@capacitor/camera';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss'],
  standalone: true,
  imports: [IonRow, IonCol, IonGrid, IonText, IonInput, IonTitle, IonHeader, IonModal, IonContent, IonImg,
      IonIcon, IonButton, IonLabel, FormsModule, IonItem, IonList, 
      IonSearchbar, IonToolbar, CommonModule ]
})
export class BarraBusquedaComponent  implements OnInit {



  destinoEliminar: Destinos | null = null; //Variable que guardara el destino que se va a eliminar
  listaconsulta: respuestaWSxid[] = [];
  listaDestinos: Destinos[] = []; // Lista de destinos seleccionados
  listaXid: string[] = [];
  busquedaStr: string = "";
  imgDefecto: string = "/assets/default-image.png";
  isModalValVuelo: boolean = false;
  isModalEiminar: boolean = false;
  destinoSeleccionado: respuestaWSxid | null = null; // Destino seleccionado
  valorVuelo: string = ""; // Variable para almacenar el valor del vuelo ingresado por el usuario
  foto : Photo|null = null;
  
  constructor(
    private servicio: OpenTripMapService,
    private destinosService: DestinosService // Inyectamos el servicio de destinos
  ) {
    addIcons({addCircleOutline,camera, airplaneOutline, trash})
  }

  async ngOnInit() {
    // Cargar destinos guardados al iniciar el componente
    this.listaDestinos = await this.destinosService.obtenerDestinos();
    console.log(this.listaDestinos) // dejamos esto para validar la lista y ver los valores
  }
  
  async handleInput($event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    this.listaconsulta  = []
    this.busquedaStr = $event.detail.value ?? ''
    console.log(this.busquedaStr)
    this.listaXid = []; // limpiamos la lista

    if (this.busquedaStr.length >= 3){
      
      const respuesta1: respuestaWSSuggest2 = await this.servicio.getXid(this.busquedaStr);
      
      for (let i = 0; i < 5; i++){
        this.listaXid[i] = respuesta1.features[i].properties.xid;
  
      }
        console.log(respuesta1);

      // validamos como quedo la lista que creamos despues de leer la respuesta1
      console.log(this.listaXid); 
      
    for (let i = 0; i < this.listaXid.length; i++) {
        const respuesta2 = await this.servicio.getDetalleXid(this.listaXid[i]);
        this.listaconsulta.push(respuesta2);
        console.log(respuesta2.image)
      }
    }
    console.log(this.listaconsulta)
  }

  agregarDestino(destino: respuestaWSxid) {
    this.destinoSeleccionado = destino;
    this.isModalValVuelo = true;
  }

  async confirmarValor() {
    const nuevoDestino: Destinos = {
      id: this.listaDestinos.length +1, // Asignamos un id tomando en cuenta la el largo d ela lista
      lugar: this.destinoSeleccionado?.name || "", 
      pais: this.destinoSeleccionado?.address?.country || "",
      valor: parseFloat(this.valorVuelo) || 0, // Convertimos el valor del modal a un número
      imagen: this.destinoSeleccionado?.image || this.imgDefecto // validamos si hay una imagen si no asignamos la imagen por defecto
    };

    this.listaDestinos.push(nuevoDestino);

    // Guardamos la lista de destinos 
    await this.destinosService.guardarDestinos(this.listaDestinos);

    // Cierramos el modal de valor vuelo
    this.closeModal()
  }
  eliminarDestino(destino: Destinos) {
    this.destinoEliminar = destino; // Guardamos el destino que vamos a eliminar
    this.isModalEiminar = true; // abrimossubimos el modal
  }

  async eliminarValor() {

    if (this.destinoEliminar) {
      // Eliminamos el destino de la lista
      this.listaDestinos = this.listaDestinos.filter(destino => destino !== this.destinoEliminar);
      // Guardar la lista actualizada
      await this.destinosService.guardarDestinos(this.listaDestinos);
      // limpiamos la variable para que se pueda usar sin problemas
      this.destinoEliminar = null;
    }
    // cerramos le modal de eliminacion
    this.closeModal();
  }

  closeModal() {
    // este metodonos ayudara a cerrar ambos modales
    this.isModalEiminar = false;
    this.isModalValVuelo = false;
    }

    async tomaFoto(destino: Destinos) {

      //const image = await Camera.getPhoto({
      this.foto = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        correctOrientation: true,
        saveToGallery: true,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64,  // Obtener la imagen en formato base64
      });
    
      // Reemplazar la imagen del destino seleccionado por la foto capturada
      destino.imagen = 'data:image/jpeg;base64,' + this.foto.base64String;
    
      // Actualizar la lista de destinos
      await this.destinosService.guardarDestinos(this.listaDestinos);
  }

  handleImgError($event: Event) {
    console.log($event.type.valueOf)
  }
}
