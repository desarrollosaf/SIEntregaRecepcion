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
  id: any; 
  userLogin: any;
  formDocs: FormGroup;
  selectedFile!: File;
  docs: any;
  public _documentos = inject(DocumentosService);

  constructor(
      private router: Router, 
      private modelService: NgbModal,
      private fb: FormBuilder,
      private  aRouter: ActivatedRoute
    ){
      this.id = aRouter.snapshot.paramMap.get('id');

      this.formDocs = this.fb.group({
        tipo: [''],
        path: ['']
      })
    }

    ngOnInit(): void {
      this.userLogin = JSON.parse(localStorage.getItem('user') || '{}');
      this.getDocs();
    }

    getDocs(){
      this._documentos.getDocs(this.userLogin.depto_id).subscribe({   
        next: (response: any) => {
            this.docs = response;
        }
      });
    }

    openSmModal(content:any, tipo: number){
      this.formDocs.patchValue({tipo: tipo})
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
              this.modelService.dismissAll();
              this.router.navigateByUrl('/documentacion') 
            })
      })
    }

    verDoc(tipo: number){
      const datos: any = {
        id_departamento: this.userLogin.depto_id,
        tipo: tipo
      }
      this._documentos.verDoc(datos).subscribe((resp: any)=> {
        if(!resp.path || resp.path == 0){
          Swal.fire({
            title: '',
            text: 'No hay documento cargado',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        }else{
          const url = `http://localhost:3000/documentos/${resp.path}`;
          window.open(url, '_blank');
        }
      });
    }
}
