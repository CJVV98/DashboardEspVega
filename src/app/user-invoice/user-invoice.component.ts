import { Inject } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from 'app/models/Invoice';
import { User } from 'app/models/User';
import { InvoiceService } from 'app/_services/invoice.service';

@Component({
  selector: 'app-user-invoice',
  templateUrl: './user-invoice.component.html',
  styleUrls: ['./user-invoice.component.css']
})
/**
 * Facturas de venta por usuario
 */
export class UserInvoiceComponent implements OnInit {
  dataSource=  new MatTableDataSource<Invoice>();
  displayedColums: string[] = [ 'code', 'date', 'total'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private service: InvoiceService, public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.consultInvoice();
  }
  /**
   * Consultar Facturas de venta
   */
  consultInvoice(){
      this.service.show(this.data.code).subscribe(data=>{
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }
  /**
   * Aplicar filtros sobre tabla
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  


}
