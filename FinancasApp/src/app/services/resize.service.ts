import { Injectable, EventEmitter } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  width = new EventEmitter<number>();
  height = new EventEmitter<number>();

  constructor(eventManager: EventManager) {
    eventManager.addGlobalEventListener('window', 'resize', (e) => {
      this.width.emit(e.target.innerWidth);
      this.height.emit(e.target.innerHeight);
    });
  }
}
