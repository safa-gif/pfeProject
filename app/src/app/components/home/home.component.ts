import { Component,NgModule, ElementRef,AfterViewInit,OnDestroy,Input,Output,EventEmitter,ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
   
  constructor(private breakpointObserver: BreakpointObserver, private toastr: ToastrService) {
    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      }
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  afficher() {
    console.log("hello")
  }
 
  // update(event: Event) {
  //     this.data = //create new data
  //   }


}
