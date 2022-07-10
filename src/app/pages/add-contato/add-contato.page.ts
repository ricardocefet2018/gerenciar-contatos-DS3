import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { IContato } from 'src/models/contato.model';
import { CepService } from 'src/app/services/cep.service';
import { ContatoService } from 'src/app/services/contato.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-add-contato',
  templateUrl: './add-contato.page.html',
  styleUrls: ['./add-contato.page.scss'],
})
export class AddContatoPage implements OnInit {
  id: number | string;
  contatos: IContato[] = [];
  regExpDate = new RegExp(
    '^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]([12][0-9][0-9][0-9])$'
  );
  regExpCPF = new RegExp(
    '^([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\-]?[0-9]{2})$'
  );
  regExpCelular = new RegExp(
    '^([+][5]{2})?\\(?([0]?[1-9][1-9])\\)?[\\.\\-\\s]?([9]?[0-9]{4}[\\.\\-\\s]?[0-9]{4})$'
  );
  regExpCEP = new RegExp('^([1-9][0-9]{4}[\\-\\s]?[0-9]{2}[0-9]?)$');
  contatoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.pattern(this.regExpCelular)),
    cpf: new FormControl('', Validators.pattern(this.regExpCPF)),
    dataNascimento: new FormControl('', Validators.pattern(this.regExpDate)),
    email: new FormControl('', Validators.email),
    id: new FormControl(''),
    cep: new FormControl('', Validators.pattern(this.regExpCEP)),
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
    private contatoService: ContatoService,
    private maskPipe: MaskPipe
  ) {}

  ngOnInit() {
    this.contatos = this.contatoService.listar();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      let ctt = this.contatoService.buscarPorId(Number(this.id));
      console.log(ctt);
      this.contatoForm.setValue(ctt);
    } else {
      if (this.contatos.length > 0) {
        this.contatoForm
          .get('id')
          .setValue(Number(this.contatos[this.contatos.length - 1].id) + 1);
      } else {
        this.contatoForm.get('id').setValue(0);
      }
    }
    console.log(this.contatoForm.value.id);
  }

  async submitForm() {
    let contato: IContato = this.contatoForm.value;
    this.contatoService.salvar(contato);
    await this.exibirMensagem('Registro salvo com sucesso!');
    this.navController.navigateBack('/contato');
  }

  async exibirMensagem(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
    });
    await toast.present();
  }

  async preencherEndereco() {
    this.cepService
      .getCep(this.contatoForm.get('cep').value)
      .then((json) => {
        this.contatoForm.get('rua').setValue(json['logradouro']);
        this.contatoForm.get('bairro').setValue(json['bairro']);
        this.contatoForm.get('cidade').setValue(json['localidade']);
        this.contatoForm.get('estado').setValue(json['uf']);
      })
      .catch((err) => {
        this.exibirMensagem(`CEP inválido! Erro: ${err.message}`);
        console.log(`CEP inválido! Erro: ${err.message}`);
      });
  }

  updateWithMask(event) {
    console.log(event);
    if (event.path[0].id == 'dataNascimento') {
      this.contatoForm.controls.dataNascimento.setValue(
        this.maskPipe.transform(event.currentTarget.value, 'd0/M0/0000')
      );
    }
    if (event.path[0].id == 'cpf') {
      this.contatoForm.controls.cpf.setValue(
        this.maskPipe.transform(event.currentTarget.value, '000.000.000-00')
      );
    }
    if (event.path[0].id == 'celular') {
      this.contatoForm.controls.celular.setValue(
        this.maskPipe.transform(event.currentTarget.value, '(000) 00000-0000')
      );
    }
    if (event.path[0].id == 'cep') {
      this.contatoForm.controls.cep.setValue(
        this.maskPipe.transform(event.currentTarget.value, '00000-000')
      );
    }
  }
}
