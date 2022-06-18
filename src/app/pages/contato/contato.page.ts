import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ContatoService } from 'src/app/services/contato.service';
import { IContato } from 'src/models/contato.model';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  contatos: IContato[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private contatoService: ContatoService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.carregarLista();
  }

  carregarLista() {
    this.contatos = this.contatoService.listar();
  }

  async excluirContato(contato: IContato) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.contatos = this.contatoService.excluir(contato);
            this.exibirMensagem();
          },
        },
      ],
    });
    await alert.present();
  }

  async exibirMensagem() {
    this.toastController
      .create({
        message: 'Registro excluído com sucesso!',
        duration: 1500,
      })
      .then((toast) => {
        toast.present();
      });
  }
}
