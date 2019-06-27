import { BsModalRef } from 'ngx-bootstrap/modal';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';





@Component({
  selector: 'modal-content',
  template: 
  `
    <div class="modal-header"style=" text-align:center">
      <h4 style=" color: #606066;
      font-size: 2rem 
      color:#FFB33A;
      text-align:center" class="modal-title pull-left">{{title}}</h4>
     
    </div>
    <div class="modal-body">
    <div >
  <img style="    margin: 0 auto;
  width: 20%;
  display: table;
  margin-bottom: 29px;
  height: auto;" src="../../../assets/img/user.svg">
    </div>
      <ul style=" text-align:center" *ngIf="list.length">
        <li style=" color: #606066;
        font-size: 1.5rem;
        text-align:center" *ngFor="let item of list">{{item}}</li>
      </ul>
    </div>
    <div class="modal-footer">
    <button style="  padding: 9px 20px;
    background-color: #ffb33a;
    color: white;
    font-family: sans;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1rem;" (click)="navigatemodel()">sign in</button>
      <button type="button" class="btn btn-default"
       style=" font-family: sans; "
        (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
 
export class  ModelComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
 
  constructor(public bsModalRef: BsModalRef,private router:Router) {}
 
  ngOnInit() {
    this.list.push('');
  }
  navigatemodel(){
    this.router.navigate(['/side/signin']);
        this.bsModalRef.hide()

  }
}
