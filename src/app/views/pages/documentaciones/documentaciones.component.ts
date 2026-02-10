import { Component, inject } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxDatatableModule } from '@siemens/ngx-datatable';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentosService } from '../../../service/documentos.service';

@Component({
  selector: 'app-documentaciones',
  imports: [
    RouterLink,
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './documentaciones.component.html',
  styleUrl: './documentaciones.component.scss'
})
export class DocumentacionesComponent {
  formRegistros: any;
  id: any; 
  userLogin: any;
  formDocs: FormGroup;
  selectedFile!: File;
  public _documentos = inject(DocumentosService);

  constructor(
      private router: Router, 
      private modelService: NgbModal,
      private fb: FormBuilder,
      private  aRouter: ActivatedRoute
    ){
      this.formRegistros = this.fb.group({
        seccion: [''],
      });
  
      this.id = aRouter.snapshot.paramMap.get('id');

      this.formDocs = this.fb.group({
        tipo: [''],
        path: ['']
      })
    }

    ngOnInit(): void {
      this.userLogin = JSON.parse(localStorage.getItem('user') || '{}');
      this.getDocs();
      this.getUser();
    }

    getDocs(){
      this._documentos.getDocs().subscribe({  
      });
    }

    getUser(){

    }

    openSmModal(content:any, tipo: number){
      this.formDocs.patchValue({tipo: tipo})
      console.log("Form:", this.formDocs.value);
      const modalRef = this.modelService.open(content, {size:'lg'}).result.then((result) =>{
       
      }).catch((res) => {})
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    addDoc(){
      const formData = new FormData();
      formData.append('id_departamento', this.userLogin.depto_id);
      formData.append('path', this.selectedFile);
      formData.append('tipo', this.formDocs.value.tipo);
  
      this._documentos.addDoc(formData).subscribe(data => {
        Swal.fire({
              title: '',
              text: 'Documento guardado correctamente',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then((result) => {
              
              this.router.navigateByUrl('/documentacion') 
            })
      })
    }
}
