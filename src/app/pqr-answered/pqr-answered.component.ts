import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pqr } from 'app/models/Pqr';
import { PqrAnswered } from 'app/models/PqrAnswered';
import { PqrAnsweredService } from 'app/_services/pqranswered.service';

@Component({
  selector: 'app-pqr-answered',
  templateUrl: './pqr-answered.component.html',
  styleUrls: ['./pqr-answered.component.css']
})
export class PqrAnsweredComponent implements OnInit {
  pqr:PqrAnswered;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pqr, public service: PqrAnsweredService, public dialog: MatDialog,private snackBar: MatSnackBar) {}
  form: FormGroup;
  ngOnInit(): void {
    console.log(this.data);
    this.initForm() ;
  }
  /**
   * Enviar PQR a usuario
   */
  send(){
      this.pqr=new PqrAnswered();
      this.pqr.pqr_id=this.data.id;
      this.pqr.reply= this.form.value['message'];
      this.service.send(this.pqr).subscribe(data=>{
        this.showMessage('Se ha insertado correctamente', 'Insertar');
        this.initForm();
      });
  }
  /**
   * Mostrar mensaje
   * @param message mensaje
   * @param action tipo de accion
   */
  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });

  }


  initForm() {
    this.form = new FormGroup({
      'message': new FormControl('')
    });
  }

}
