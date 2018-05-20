import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  image: string;
  copyOfData: {};

  constructor(@Inject(MAT_DIALOG_DATA) private data: string) { }

  ngOnInit() {
    this.copyOfData = this.data;
    this.image = this.data['src'];
    console.log(this.copyOfData)
  }

  onPrev() {
    this.copyOfData['index'] -= 1;
    this.image = this.copyOfData['data']._results[this.copyOfData['index']].nativeElement.src;
  }

  onNext() {
    this.copyOfData['index'] += 1;
    this.image = this.copyOfData['data']._results[this.copyOfData['index']].nativeElement.src;
  }

}
