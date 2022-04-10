import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cbn',
  templateUrl: './cbn.component.html',
  styleUrls: ['./cbn.component.css']
})
export class CbnComponent implements OnInit {
  selected: Date |undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
