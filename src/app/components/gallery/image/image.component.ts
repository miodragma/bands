import { Component, HostListener, Inject, OnInit } from '@angular/core';
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 37 && !(this.copyOfData['index'] <= 0)) {
      this.onPrev();
    }
    if (event.keyCode === 39 && !(this.copyOfData['index'] >= this.copyOfData['data'].length - 1)) {
      this.onNext();
    }
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
