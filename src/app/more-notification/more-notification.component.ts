import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from 'app/models/News';

@Component({
  selector: 'app-more-notification',
  templateUrl: './more-notification.component.html',
  styleUrls: ['./more-notification.component.css']
})
export class MoreNotificationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: News) {}

  ngOnInit(): void {
  }

}
