import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pqr } from 'app/models/Pqr';
import { PqrService } from 'app/_services/pqr.service';
import { PqrAnsweredComponent } from '../pqr-answered/pqr-answered.component';

@Component({
  selector: 'app-list-pqr',
  templateUrl: './list-pqr.component.html',
  styleUrls: ['./list-pqr.component.css']
})
export class ListPqrComponent implements OnInit {
  dataSource=  new MatTableDataSource<Pqr>();
  displayedColums: string[] = ['id', 'name', 'lastname', 'email', 'message','status','actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: PqrService, public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit() {
      this.consult();
  }

  consult(){
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

  send(element: any){
    this.dialog.open(PqrAnsweredComponent, {
      data:element
    });
  }

}
