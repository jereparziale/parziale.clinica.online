import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private storage: Storage) { }


  uploadImage(file: any,nombreUsuario:string,numeroImagen:string):Promise<any> {
    const imgRef = ref(this.storage, `imagesUsuarios/${nombreUsuario}_${numeroImagen}`);
    return uploadBytes(imgRef, file)
  }

  getImagen(carpeta: string, usuarioMail: string, numeroImagen: string): Promise<string> {
    try {
      const url = `${carpeta}/${usuarioMail}_${numeroImagen}`;
      const imagesRef = ref(this.storage, url);
      const downloadUrl = getDownloadURL(imagesRef);
      // console.log('URL de descarga:', downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error('Error al obtener la URL de la imagen:', error);
      throw error;
    }
  }
}
