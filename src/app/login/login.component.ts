import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/models/User';
import { UsersService } from 'app/_services/users.service';
import { error } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private service: UsersService,  private snackBar: MatSnackBar, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(){
    this.form = new FormGroup({
      'user': new FormControl(''),
      'password': new FormControl('')
    });

  }


  login(){
    let user = new User();
    user.email=this.form.value['user'];
    user.password = this.form.value['password'];
    this.service.login(user).subscribe(data=>{
        this.router.navigate(['/dashboard']);
    }, error => {

      this.showMessages(error.error.message, 'Error en inicio de sesion');
    });
  }

  showMessages(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
