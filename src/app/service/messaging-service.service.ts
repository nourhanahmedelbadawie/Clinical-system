import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingServiceService implements OnInit {
  count:number;
public token
  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)

  constructor(
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private notiService:NotificationService) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }
  ngOnInit() {
    this.notiService.observableCount.subscribe((param) =>{
      console.log(param)
      this.count=param;
    })
  }

  /**
   * update token in firebase database
@@ -23,11 +30,13 @@ export class MessagingService {
   * @param token token as a value
   */
  updateToken(userId, token) {
    this.afAuth.authState.pipe(take(1)).subscribe(() => {
      const data = new Object;
      data[userId] = token
      this.afDB.object('fcmTokens/').update(data)
    })
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

  /**
@@ -36,27 +45,25 @@ export class MessagingService {
   * @param userId userId
   */
  requestPermission(userId) {
    this.messaging.requestPermission()
      .then(() => {
        console.log('notification permission granted.');
        return firebase.messaging().getToken()
      })
      .then(token => {
        console.log(token)
        this.token=token;
        this.updateToken(userId, token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    });
    this.angularFireMessaging.messages.subscribe(
      (payload:any) => {
        console.log("new message received. ", payload);
        var list = [
       
          // {token:this.token}
        ]
        const listStr = localStorage.getItem("your notification") 
        if(listStr !=null){
          list = JSON.parse(listStr);
        }
        this.currentMessage.next(payload);
            // Notification
            
            list.push(payload.notification)
            localStorage.setItem("your notification",JSON.stringify( list))
            var count = this.notiService.subjectCount.value;
            count++;
            this.notiService.changeCount(count)
      })
  }
}