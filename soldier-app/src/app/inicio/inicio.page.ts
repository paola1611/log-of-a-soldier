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
    fotoURL: '', // URL de la foto en Firebase Storage
    audioURL: '', // URL del audio en Firebase Storage
  };

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  registrarVivencia() {
    // Agrega la vivencia a Firestore
    this.firestore.collection('vivencias').add(this.vivencia).then(() => {
      console.log('Vivencia registrada correctamente');
    }).catch(error => {
      console.error('Error al registrar la vivencia:', error);
    });
  }

  cargarFoto(event: any) {
    const fotoFile = event.target.files[0];
    
    // Genera un nombre único para la foto
    const fotoPath = `fotos/${new Date().getTime()}_${fotoFile.name}`;
    
    // Sube la foto a Firebase Storage
    this.storage.upload(fotoPath, fotoFile).then(snapshot => {
      // Obtén la URL de descarga de la foto y guárdala en el objeto de vivencia
      this.storage.ref(fotoPath).getDownloadURL().subscribe(url => {
        this.vivencia.fotoURL = url;
      });
    });
  }

  cargarAudio(event: any) {
    const audioFile = event.target.files[0];
    
    // Genera un nombre único para el audio
    const audioPath = `audios/${new Date().getTime()}_${audioFile.name}`;
    
    // Sube el audio a Firebase Storage
    this.storage.upload(audioPath, audioFile).then(snapshot => {
      // Obtén la URL de descarga del audio y guárdala en el objeto de vivencia
      this.storage.ref(audioPath).getDownloadURL().subscribe(url => {
        this.vivencia.audioURL = url;
      });
    });
  }

  ngOnInit() {
  }

}
