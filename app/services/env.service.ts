import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // GOOGLE_MAPS_KEY = 'AIzaSyAa3AWhRdAVWxmY2Ci1vEWEjlVms2Z4hvA';
  GOOGLE_MAPS_KEY = 'AIzaSyCFOlSXQxs-uVo6MatIMkuhYcu8LFAEGbU';
  // API_URL = 'http://192.168.100.8:8000/api/';
  // API_URL = 'http://127.0.0.1:8000/api/';
  API_URL = 'https://originalindonesia.id/api/api/';
  
  // API_URL = 'http://10.0.2.2:8000/api/';
  constructor() {

  }
}
