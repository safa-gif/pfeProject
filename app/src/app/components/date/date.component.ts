import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import{HttpClient} from '@angular/common/http';
import { DateServiceService } from 'src/app/services/date-service.service';
import Swal from 'sweetalert2';
import {Events} from 'src/app/donnees/event';
import {Router} from '@angular/router';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  calendarOptions: CalendarOptions | undefined;
  error: any;
  events: Events | undefined;
  constructor(
    public http: HttpClient,
    private dateservice: DateServiceService,
    private router:Router
  ) { }
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  handleDateClick(arg: any){
    window.alert('Cliked on date '+ arg.dateStr)
  }
  onSelectx(event: any){
    // console.log('Right now i am at the point of scheduling an event')
  }
  ngOnInit(): void {
    this.getAllEvents();
  }
  deleteEvent(id: string){
    this.dateservice.deleteSingleEvent(id).subscribe((data: any)=>{})
  }
  addEvent(){
    this.router.navigate(['/add-event'])
  }
  search(){
    // this.dateservice.
    alert('search function is operationnal:!!!')
  }
  getAllEvents(){
    this.dateservice.getAllEvents().subscribe((data: any)=> {
      const self = this;
      this.calendarOptions = {
        initialView:'dayGridMonth',
        selectable : true,
        editable : true,
        select: this.handleDateClick.bind(this),
        events : data,
        eventClick(eventData){
          const event_id = eventData.event._def.extendedProps['_id'];
          Swal.fire({
            title :'Are you sure?',
            text:'You won\'t be able to revert this!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!!!',
            timer: 40000,
    
          })
          .then((result)=> {
            if(result.value) {
              self.deleteEvent(event_id);
              Swal.fire('Deleted !'
              ,'Your event has been delelted.','success');
              self.getAllEvents();
            }
          })
          .catch(()=>{
            Swal.fire('Failed!', 'Something went wrong.');
          });
        }
        
      };
    });
  }
}
