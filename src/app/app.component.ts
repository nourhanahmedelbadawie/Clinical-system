import { Component } from '@angular/core';
import { MessagingServiceService } from './service/messaging-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public message;
  public stragemessage;
  constructor(private messagingService: MessagingServiceService) { }
 ngOnInit() {
      const userId = 'user001';
      this.messagingService.requestPermission(userId)
      this.messagingService.receiveMessage()
      this.message = this.messagingService.currentMessage;
    //  this.message.subscribe( async pra=>{
    //   this.stragemessage=pra;
    //   if(this.stragemessage.notification == null){
    //     console.log("sorrrry")
    //   }else{
    //     await localStorage.setItem("your notification",this.stragemessage.notification)
    //   }
    //  })
    //  if(this.stragemessage.notification != null){
    //   await localStorage.setItem("your notification",this.stragemessage.notification)
    //  }
    }
  
}
