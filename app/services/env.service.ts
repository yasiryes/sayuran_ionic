import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // GOOGLE_MAPS_KEY = 'AIzaSyAa3AWhRdAVWxmY2Ci1vEWEjlVms2Z4hvA';
  GOOGLE_MAPS_KEY = 'AIzaSyCFOlSXQxs-uVo6MatIMkuhYcu8LFAEGbU'
  API_URL = 'http://localhost:8000/api/';
  // API_URL = 'https://originalindonesia.id/api/api/';
  constructor() {

  }
}
