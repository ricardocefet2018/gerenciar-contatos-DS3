import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { IContato } from 'src/models/contato.model';
import { CepService } from 'src/app/services/cep.service';
import { ContatoService } from 'src/app/services/contato.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contato',
  templateUrl: './add-contato.page.html',
  styleUrls: ['./add-contato.page.scss'],
})
export class AddContatoPage implements OnInit {
  id: number;
  contatos: IContato[] = [];
  contatoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    cpf: new FormControl(''),
    dataNascimento: new FormControl(''),
    email: new FormControl(''),
    id: new FormControl(''),
    cep: new FormControl(''),
    rua: new FormControl(''),
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    estado: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private toastController: ToastController,
    private cepService: CepService,
    private contatoService: ContatoService
  ) {}

  ngOnInit() {
    this.contatos = this.contatoService.listar();
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.id) {
      let ctt = this.contatoService.buscarPorId(this.id);
      console.log(ctt);
      this.contatoForm.setValue(ctt);
    } else {
      if (this.contatos.length > 0) {
        this.contatoForm.setValue({
          id: this.contatos[this.contatos.length - 1].id + 1,
        });
      } else {
        this.contatoForm.setValue({
          id: '0',
        });
      }
    }
    console.log(this.contatoForm.value.id);
  }

  async submitForm() {
    let contato: IContato = this.contatoForm.value;
    this.contatoService.salvar(contato);
    await this.exibirMensagem();
    this.navController.navigateBack('/contato');
  }

  async exibirMensagem() {
    const toast = await this.toastController.create({
      message: 'Registro salvo com sucesso!',
      duration: 1500,
    });
    await toast.present();
  }

  async preencherEndereco() {
    this.cepService
      .getCep(this.contatoForm.get('cep').value)
      .then((json) => {
        this.contatoForm.setValue({
          rua: json['logradouro'],
          bairro: json['bairro'],
          cidade: json['localidade'],
          estado: json['uf'],
        });
      })
      .catch((err) => {
        this.toastController
          .create({
            message: 'Houve um erro ao requisitar o endereço!',
            duration: 1500,
            color: 'warning',
          })
          .then((toast) => {
            toast.present();
          });
      });
  }
}
