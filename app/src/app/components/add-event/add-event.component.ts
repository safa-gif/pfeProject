import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DateServiceService } from 'src/app/services/date-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
 event = {
   title : '', 
   date : ''
 };
 error : any;

  constructor(
    public http: HttpClient,
    private dateservice : DateServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    }
   saveEvent(){
     const event = {
       title : this.event.title,
       date : this.event.date
     };
     this.dateservice.addEvent(event)
     .subscribe(
       (response: any) => {
          if(response.type === 'success'){
            Swal.fire({
              position : 'center',
              icon : 'success',
              title : 'Your event has been added successfully',
              showConfirmButton: false,
              timer: 20000
          
            });
            this.router.navigate(['/date'])
          }
       },
       err => {
         Swal.fire({
           position: 'center',
           icon: 'error',
           title : 'Something went wrong',
           showConfirmButton: false,
           timer: 20000
         });
         this.event.title = '';
         this.event.date ='';
       }
     )
   }
}
