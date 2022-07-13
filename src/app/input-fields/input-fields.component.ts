import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.css']
})
export class InputFieldsComponent implements OnInit {
  @Input() type: string = 'null';
  @Input() placeholder: string = 'null';
  @Input() control: FormControl = new FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  // err(data:any) {
  //   console.log(data);
  // }

}
