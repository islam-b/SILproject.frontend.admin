declare const Pusher: any;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  marqueChannel: any;
  constructor() {
    this.pusher = new Pusher('5fa15f062e35d1c1dbad', {
      cluster: 'eu',
      forceTLS: true
    });
    this.marqueChannel = this.pusher.subscribe('marque-channel');
  }
}
