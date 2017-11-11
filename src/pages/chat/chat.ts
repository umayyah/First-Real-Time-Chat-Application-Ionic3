import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = "";
  message: string="";
  chatRef: Observable<any[]>;
  messages: object[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase
    ) {
      this.username = this.navParams.get('username');
      this.chatRef = this.db.list('/chat').valueChanges();
      this.chatRef.subscribe(data=>{
        this.messages = data;   
      })

  }

  ionViewDidLoad() {
    console.log('user has joined the room...');
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} has joined the room`
    })
  }

  ionViewDidLeave(){
   console.log('user has gone...');
   this.db.list('/chat').push({
     specialMessage: true,
     message: `${this.username} has left the room`
   })
  }

  sendMessage(){
    this.db.list('chat').push({
      username: this.username,
      message: this.message
    })
  }

}
