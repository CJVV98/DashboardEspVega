import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(){
    this.form = new FormGroup({
      'user': new FormControl(''),
      'password': new FormControl('')
    });

  }
}
