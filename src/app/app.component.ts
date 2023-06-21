import { Component, OnChanges } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'AEAuto-update';
  ipcRenderer: typeof ipcRenderer;
  messages: string;

  constructor() {

    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcRenderer.on('message', (arg, data) => {
        this.messages = data;
      });

      this.ipcRenderer.on('downloadProgress', (event, data) => {
        console.log(data);
      });
    }
  }

  ngOnChanges(): void {
    console.log(this.messages);
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  };
}
