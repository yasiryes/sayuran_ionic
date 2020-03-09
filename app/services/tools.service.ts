import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  get_image_assets_url(){
    return ''
  }
  thousand_str(numb_er){
    return numb_er.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
