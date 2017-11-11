import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:string = "";
  password:string = "";

  USERNAME_REGEX:RegExp = /^[a-zA-Z0-9]+$/;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {

  }

  loginUser(){
    if(this.USERNAME_REGEX.test(this.username)){
      this.navCtrl.push(ChatPage,{username: this.username});
    }else{
      this.showAlert('Erro','Nome de Usuário inválido!');
    }

  }
  

  showAlert(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
