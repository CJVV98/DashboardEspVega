import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@sentry/angular';
import { UserInvoiceComponent } from 'app/user-invoice/user-invoice.component';
import { UsersService } from 'app/_services/users.service';
import {MatAccordion} from '@angular/material/expansion';
import { RecommendationsComponent } from 'app/recommendations/recommendations.component';
import { FileService } from 'app/_services/fileService';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  dataSource=  new MatTableDataSource<User>();
  displayedColums: string[] = ['id', 'name', 'lastname', 'email', 'phone','code','status','actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  file: File = null
  constructor(private service: UsersService, private serviceFile: FileService, public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
      this.consultUsers();
  }

  consultUsers(){
      this.service.consult().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });

  }

  delete(row: any){
     this.service.delete(row.id).subscribe(data=>{
        this.showMessage('Se ha eliminado correctamente la noticia', 'Eliminar');
        this.consultUsers();
     });
  }
  openDialog(element: any) {
    this.dialog.open(UserInvoiceComponent, {
      data:element,
    });
  }

  loadRecommendations(){
    this.dialog.open(RecommendationsComponent, {
    });
  }
  onChange(event) {
    this.file = event.target.files[0];
  }

  load(){
      this.serviceFile.create(this.file).subscribe(()=>{
        this.showMessage('Se ha cargado exitosamente el archivo', 'Registro');
        this.file = null;
      });
  }
}
