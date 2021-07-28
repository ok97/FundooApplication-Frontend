import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-setcolor',
  templateUrl: './setcolor.component.html',
  styleUrls: ['./setcolor.component.scss']
})
export class SetcolorComponent  {
  @Output() colorChanged = new EventEmitter();
  borderColor = '';  //default
  public colors: any[] = [
    { colorCode: '#fbbc05' },
    { colorCode: '#4285f4' },
    { colorCode: '#34a853' },
    { colorCode: '#f28b82' },
    { colorCode: '#fbbc04' },
    { colorCode: '#fbfd8d' },
    { colorCode: '#c6fab1' },
    { colorCode: '#a7ffeb' },
    { colorCode: '#cbf0f8' },
    // { colorCode: '#aecbfa' },
    // { colorCode: '#d7aefb' },
    // { colorCode: '#fdcfe8' },
    // { colorCode: '#e6c9a8' },
    // { colorCode: '#e8eaed' },
    // { colorCode: '#1b36d1' },
    // { colorCode: '#821bd1' },
    // { colorCode: '#cb1bd1' },
    // { colorCode: '#d11b6a' },
  ];

  colorSelected(colorCode: string) {
    this.borderColor = colorCode;
    this.colorChanged.emit(colorCode);
  }
}
