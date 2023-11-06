import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  vivencia = {
    titulo: '',
    fecha: '',
    descripcion: '',
    fotoURL: '', // Cambiando el tipo a string
    audioURL: '', // URL del audio en Firebase Storage
  };
  imageUrl: File | null = null; // Variable para almacenar el archivo de imagen

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  async registrarVivencia() {
    if (this.imageUrl) {
      // Obtén la URL de la imagen antes de agregar la vivencia a Firestore
      try {
        this.vivencia.fotoURL = await this.uploadImageAndGetURL();
        
        // Agrega la vivencia a Firestore
        this.firestore.collection('vivencias').add(this.vivencia).then(() => {
          console.log('Vivencia registrada correctamente');
          // Reinicia el objeto vivencia para futuros registros
          this.vivencia = {
            titulo: '',
            fecha: '',
            descripcion: '',
            fotoURL: '',
            audioURL: '',
          };
          // También reinicia la variable imageUrl
          this.imageUrl = null;
        }).catch(error => {
          console.error('Error al registrar la vivencia:', error);
        });
      } catch (error) {
        console.error('Error al obtener la URL de la imagen:', error);
      }
    } else {
      console.error('Por favor, selecciona una imagen.');
    }
  }

  async uploadImageAndGetURL() {
    if (this.imageUrl) {
      // Genera un nombre único para la foto
      const fotoPath = `fotos/${new Date().getTime()}_${this.imageUrl.name}`;
      
      // Sube la foto a Firebase Storage
      const snapshot = await this.storage.upload(fotoPath, this.imageUrl);

      // Obtén la URL de descarga de la foto y devuelve la URL
      return this.storage.ref(fotoPath).getDownloadURL().toPromise();
    } else {
      throw new Error('No se proporcionó una imagen para cargar.');
    }
  }

  cargarFoto(event: any) {
    this.imageUrl = event.target.files[0];
  }

  cargarAudio(event: any) {
    const audioFile = event.target.files[0];
    
    // Genera un nombre único para el audio
    const audioPath = `audios/${new Date().getTime()}_${audioFile.name}`;
    
    // Sube el audio a Firebase Storage
    this.storage.upload(audioPath, audioFile).then(snapshot => {
      // Obtén la URL de descarga del audio y guárdala en el objeto de vivencia
      snapshot.ref.getDownloadURL().then(url => {
        this.vivencia.audioURL = url;
      });
    });
  }

  ngOnInit() {
  }
}
