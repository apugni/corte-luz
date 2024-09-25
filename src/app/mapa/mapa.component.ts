import { Component, Input } from '@angular/core';
import { Map, tileLayer, marker, layerGroup } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {

  @Input() csvData: any[] = [];
  map: any;
  markersLayer: any;

  public ngAfterViewInit(): void {
    this.map = new Map('map').setView([-31.4052, -64.1808], 12);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 30,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.markersLayer = layerGroup().addTo(this.map);
  }

  public ngOnChanges(): void {
    if (this.csvData.length > 0) {
      console.log('Datos CSV recibidos en el mapa:', this.csvData); // Verificar que los datos estén llegando
      this.addMarkers();
    }
  }

  public addMarkers(): void {

    if (!this.map) {
      console.error('El mapa no está inicializado aún.');
      return;
    }

    this.markersLayer.clearLayers();

    // Iteramos sobre los datos CSV para agregar los marcadores
    this.csvData.forEach((row) => {
      const lat = parseFloat(row.latitude);
      const lon = parseFloat(row.longitude);
      const tooltipContent = `Leg: ${row.legajo}, Campaña: ${row.campaña}, Latitud: ${row.latitude}, Longitud: ${row.longitude}`;

      if (!isNaN(lat) && !isNaN(lon)) {
        // console.log(`Agregando marcador en: [${lat}, ${lon}]`); // Verificación de coordenadas
       const newMarker = marker([lat, lon])
       .bindTooltip(tooltipContent, { permanent: false, direction: 'top' })
       .addTo(this.map);
       this.markersLayer.addLayer(newMarker);
      } else {
        console.warn(`Latitud o longitud inválida en la fila:`, row);
      }
    });

  }
}
