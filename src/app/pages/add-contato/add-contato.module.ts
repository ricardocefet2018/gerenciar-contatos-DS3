import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddContatoPageRoutingModule } from './add-contato-routing.module';

import { AddContatoPage } from './add-contato.page';
import { NgxMaskModule, IConfig, MaskPipe } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddContatoPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [AddContatoPage],
  providers: [MaskPipe],
})
export class AddContatoPageModule {}
