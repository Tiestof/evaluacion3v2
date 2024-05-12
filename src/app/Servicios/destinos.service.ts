import { Injectable } from '@angular/core';
import { Preferences, GetResult } from '@capacitor/preferences';
import { Destinos } from '../Modelo/LlistaDestinos';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  // declaramos la llave
  private readonly KEY_DESTINOS = "DESTINOS";

  constructor() { }

  async guardarDestinos(destinos: Destinos[]): Promise<void> {
    await Preferences.set({ key: this.KEY_DESTINOS, value: JSON.stringify(destinos) });
  }

  async obtenerDestinos(): Promise<Destinos[]> {
    const destinosString: GetResult | null = await Preferences.get({ key: this.KEY_DESTINOS });
    if (destinosString && destinosString.value) {
      return JSON.parse(destinosString.value);
    } else {
      return [];
    }
  }

} 