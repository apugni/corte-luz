import { Component, EventEmitter, Output, output } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'process-csv',
  templateUrl: './process-csv.component.html',

})
export class ProcessCsvComponent {

  @Output()  csvDataLoaded = new EventEmitter<any[]>();


  constructor(private papa: Papa) {}


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.processCsv(file);
    }
  }
  processCsv(file: File) {

    this.papa.parse(file, {
      header: true,
      complete: (result) => {
        const data = result.data.map((row: any) => ({
          latitude: row.LAT,
          longitude: row.LON
        }));
        // console.log('Datos procesados desde el CSV:', data);
        this.csvDataLoaded.emit(data);
      }

    });

  }

}
