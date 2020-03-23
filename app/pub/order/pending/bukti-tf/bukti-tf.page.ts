import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64';
import { ApiService } from 'src/app/services/api.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-bukti-tf',
  templateUrl: './bukti-tf.page.html',
  styleUrls: ['./bukti-tf.page.scss'],
})
export class BuktiTfPage implements OnInit {

  @Input() penjualan_id: number;

  bukti_tf: string;

  constructor(
    public modal_controller: ModalController,
    private camera: Camera,
    private api: ApiService,
    private image_picker: ImagePicker,
    public events: Events
    // private base64: Base64
  ) {
    this.bukti_tf = '';
   }

  ngOnInit() {
    console.log('bukti_tf_page, penjualan_id >>');
    console.log(this.penjualan_id);
    this.load_bukti_tf();
  }

  load_bukti_tf(){
    this.api.doGet('sell/bukti_tf_get/' + this.penjualan_id + '/').subscribe(
      (resu_get_bukti_tf) => {
        console.log('resu_get_bukti_tf');
        console.log(resu_get_bukti_tf);
        this.bukti_tf = resu_get_bukti_tf['gambar'];
      },
      (err_get_bukti_tf) => {
        console.log('err_get_bukti_tf');
        console.log(err_get_bukti_tf);
      }
    )
  }
  click_galeri(){
    // this.modal_controller.dismiss();
    const options: CameraOptions = {
      quality: 80,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):'data:image/jpeg;base64,' +
      let base64Image = imageData;
      console.log('base64Image >> ');
      console.log(base64Image);

      const upload_data = {
        gambar: base64Image,
        penjualan_id: this.penjualan_id
      }
      this.api.doPost('sell/upload_bukti_tf/', upload_data).subscribe(
        (resu_upload_bukti_tf) => {
          console.log('resu_upload_bukti_tf >>');
          console.log(resu_upload_bukti_tf);

          this.events.publish('pending:updated');
          this.load_bukti_tf();
        },
        (err_upload_bukti_tf) => {

        }
      )
    }, (err) => {
     // Handle error
    });
  }
  click_kamera(){
    // this.modal_controller.dismiss();
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):'data:image/jpeg;base64,' +
      let base64Image = imageData;
      console.log('base64Image >> ');
      console.log(base64Image);

      const upload_data = {
        gambar: base64Image,
        penjualan_id: this.penjualan_id
      }
      this.api.doPost('sell/upload_bukti_tf/', upload_data).subscribe(
        (resu_upload_bukti_tf) => {
          console.log('resu_upload_bukti_tf >>');
          console.log(resu_upload_bukti_tf);

          this.events.publish('pending:updated');
          this.load_bukti_tf();
        },
        (err_upload_bukti_tf) => {

        }
      )
    }, (err) => {
     // Handle error
    });
  }
}
