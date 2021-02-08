import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { News } from 'app/models/News';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsService } from 'app/_services/news.service';
import { FileUploadService } from 'app/_services/FileUploadService.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {CdkTableModule} from "@angular/cdk/table";
import { DataSource } from '@angular/cdk/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoreNotificationComponent } from 'app/more-notification/more-notification.component';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
declare var $: any;


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  shortLink: string = "";
  dataSource=  new MatTableDataSource<News>();
  displayedColums: string[] = ['id', 'title', 'autor', 'date', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  loading: boolean = false; // Flag variable 
  file: File = null
  form: FormGroup;
  dataNews:News;
  edit:boolean;
 
  constructor(private service: NewsService, public dialog: MatDialog,private snackBar: MatSnackBar, private fileUploadService: FileUploadService) {
  }

  ngOnInit() {
    this.edit=false;
    this.initForm();
    this.consultNews();
  }

  consultNews() {
    this.service.consult().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }
  insert() {
    let datosN = new News();
    datosN.autor = this.form.value['autor'];
    datosN.title = this.form.value['title'];
    datosN.url_image = "notice.jpg";
    datosN.url_resource = this.form.value['url_resource'];
    datosN.content = this.form.value['content'];
    this.service.create(datosN, this.file,0).subscribe(() => {
      this.showMessage('Se ha insertado correctamente', 'Insertar');
      this.initForm();
      this.consultNews();
    });
  }


  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });

  }

  initForm() {
    this.form = new FormGroup({
      'title': new FormControl(''),
      'autor': new FormControl(''),
      'url_image': new FormControl(''),
      'url_resource': new FormControl(''),
      'content': new FormControl(''),
    });
    this.edit=false;
    this.file = null;
  }
  showNotification(from, align) {

  }

  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload 
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response 
          this.shortLink = event.link;

          this.loading = false; // Flag variable  
        }
      }
    );
  }

  openDialog(element: any) {
    this.dialog.open(MoreNotificationComponent, {
      data:element,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  delete(row:any){
    this.service.delete(row.id).subscribe(data=>{
      this.showMessage('Se ha eliminado correctamente la noticia', 'Eliminar');
      this.consultNews();
    });
  }

  editData(row:any){
    this.dataNews=new News();
    this.edit=true;
    this.dataNews.id=row.id;
    this.form = new FormGroup({
      'title': new FormControl(row.title),
      'autor': new FormControl(row.autor),
      'url_image': new FormControl(row.url_image),
      'url_resource': new FormControl(row.url_resource),
      'content': new FormControl(row.content)
    });
  }
  
  update(){
    this.dataNews.autor = this.form.value['autor'];
    this.dataNews.title = this.form.value['title'];
    this.dataNews.url_image = this.form.value['url_image'];
    this.dataNews.url_resource = this.form.value['url_resource'];
    this.dataNews.content = this.form.value['content'];
    if(this.file != null){
      this.service.create(this.dataNews, this.file, this.dataNews.id).subscribe(() => {
        this.showMessage('Se ha modificado correctamente', 'Editar');
        this.initForm();
        this.edit=false;
        this.consultNews();
      });
    }else{
      this.service.update(this.dataNews, this.file, this.dataNews.id).subscribe(() => {
        this.showMessage('Se ha modificado correctamente', 'Editar');
        this.initForm();
        this.edit=false;
        this.consultNews();
      });
    }
   
  }
}
