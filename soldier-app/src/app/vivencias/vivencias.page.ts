import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vivencias',
  templateUrl: './vivencias.page.html',
  styleUrls: ['./vivencias.page.scss'],
})
export class VivenciasPage implements OnInit {
  vivencias: any[] = []; // Aquí almacenaremos las vivencias
  selectedVivencia: any; // Para almacenar la vivencia seleccionada
  showDetail: boolean = false; // Mostrar o ocultar detalle
  showDelete: boolean = false; // Mostrar o ocultar confirmación de borrado

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Recuperar las vivencias de Firestore
    this.firestore
      .collection('vivencias')
      .valueChanges()
      .subscribe((data: any) => {
        this.vivencias = data;
      });
  }

  mostrarDetalle(vivencia: any) {
    this.selectedVivencia = vivencia;
    this.showDetail = true;
  }

  volverAListado() {
    this.showDetail = false;
  }

  borrarTodasLasVivencias() {
    // Eliminar todas las vivencias en la colección "vivencias"
    this.firestore
      .collection('vivencias')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
        console.log('Todas las vivencias han sido borradas');
      });
  }
}
