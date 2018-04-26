import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  items = [
    {
      date: 19,
      month: 'Jun',
      title: 'Sed et persipiatis unde omnis iste natus',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid temporibus quos aspernatur'
    },
    {
      date: 23,
      month: 'Jun',
      title: 'Sed et persipiatis unde omnis iste natus',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid temporibus quos aspernatur'
    },
    {
      date: 10,
      month: 'Aug',
      title: 'Sed et persipiatis unde omnis iste natus',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid temporibus quos aspernatur'
    },
    {
      date: 15,
      month: 'Sep',
      title: 'Sed et persipiatis unde omnis iste natus',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid temporibus quos aspernatur'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
