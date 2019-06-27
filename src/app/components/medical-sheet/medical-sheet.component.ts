import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-medical-sheet',
  templateUrl: './medical-sheet.component.html',
  styleUrls: ['./medical-sheet.component.scss']
})
export class MedicalSheetComponent implements OnInit {
  loading = true;
  public visits=[];
  public obj2;
  public filtered2;
  public keys2;
  constructor(private route:ActivatedRoute,private httpService:HttpClient) { }

  ngOnInit() {
    // get id from url
    let id = this.route.snapshot.paramMap.get('id');
    // get data from backend
    this.httpService.get<any>("http://172.16.2.28:8069/clinical_management_system/medical/visit?visit_id="+id
      ).subscribe(res=>{
        this.visits=res;
        this.loading = false;
        console.log(this.visits[0].htn,"jhjhjhjjjjjjj")
     this.obj2={
       obese:this.visits[0]["obese"],
       averageweight:this.visits[0]["averageweight"],
       underweight:this.visits[0]["underweight"]
     }
     this.keys2=Object.keys(this.obj2)
     this.filtered2=  this.keys2.filter(element =>
        this.obj2[element]
   );
  
      })
    
    // this.visits={obstetric_gynecological_history0: "kkkk", dm0: true, time0: "2019-06-13 21:33:42", patient0: "ry", doctor0: "emo",
    //  htn: true, cardiac0: false, heptic0: false, renal0: false, others0: false, surgical_history0: false, bp0: 0.0, rr0: 0.0,
    //   hr0: 0.0, temp0: 0.0, fhc0: 0.0, weight0: 0.0, obese0: false, averageweight0: true, underweight0: false, examination0: false,
    //    drug_allergy0: false}
    
    
     
    }   

}
