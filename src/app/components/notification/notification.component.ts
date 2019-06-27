import { Component, OnInit } from '@angular/core';
import { MessagingServiceService } from '../../service/messaging-service.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public nodata:any;
  public message;
  loading = true;
  public notidata:Array<any>=[];
  // public yourtoken;
  constructor(private messagingService: MessagingServiceService) { }

  ngOnInit() {
    const userId = 'user003';
    // this.messagingService.requestPermission(userId)
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage;
    this.loading = false;
    // this.notidata=this.messagingService.notidata;
    // this.yourtoken=localStorage.getItem("tokennotification");
    // for(let i=0;i<this.notidata.length;i++){
    //   if(this.notidata[0]===this.yourtoken){

    //   }
    // }
    this.notidata=JSON.parse(localStorage.getItem("your notification"))
    console.log( this.notidata)


  }
  

}
