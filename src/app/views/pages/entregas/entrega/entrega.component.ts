import { Component, inject } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxDatatableModule } from '@siemens/ngx-datatable';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegistroService } from '../../../../service/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrega',
  imports: [
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule,
    NgSelectModule
  ],
  templateUrl: './entrega.component.html',
  styleUrl: './entrega.component.scss'
})
export class EntregaComponent {
  formRegistro: any;
  departamentosArray: { id: number | string; name: string}[] = [];
  spArray: { id: number | string; name: string}[] = [];

  public _registros = inject(RegistroService);

  id: any;

  constructor(
    private router: Router, 
    // private modelService: NgbModal,
    private fb: FormBuilder,
    private  aRouter: ActivatedRoute
  ){
    this.formRegistro = this.fb.group({
      rfc_recibe: [''],
      rfc_entrega: [''],
      id_departamento: [''],
      fecha_movimiento: [''],
      rfc_movimiento: [''],
      id: ['']
    })
    
    this.id = aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getDeptos();
    this.getSP();
    if(this.id != null){
        this.editRegistro();
      }
  }

  saveRegistro(){
    const registro: any = {
      id: this.formRegistro.value.id,
      rfc_entrega: this.formRegistro.value.rfc_entrega,
      rfc_recibe: this.formRegistro.value.rfc_recibe,
      fecha_movimiento: this.formRegistro.value.fecha_movimiento,
      id_departamento: this.formRegistro.value.id_departamento,
    }

    if(this.formRegistro.value.id != 0 && this.formRegistro.value.id != null){
      this._registros.updateRegistro(this.id, registro).subscribe(data => {
        Swal.fire({
          title: '',
          text: 'Registro modificada correctamente',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then((result) => {
          this.router.navigateByUrl('/entregas') 
        })
      })
    }else{
      delete registro.id;
      this._registros.saveRegistro(registro).subscribe(data => {
        Swal.fire({
              title: '',
              text: 'Entrega registrada correctamente',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then((result) => {
              this.router.navigateByUrl('/entregas') 
            })
      })
    }
  }

  getDeptos(){
    this._registros.getDeptos().subscribe(data => {
        this.departamentosArray = [
          { id: '', name: '--Seleccione una opción--' },
            ...data.map((item: { id_Departamento: number; nombre_completo: string }) => ({
              id: item.id_Departamento,
              name: item.nombre_completo
            }))
        ]
      })
  }

  getSP(){
    this._registros.getSP().subscribe(data => {
        this.spArray = [
          { id: '', name: '--Seleccione una opción--' },
            ...data.map((item: { N_Usuario: string; Nombre: string }) => ({
              id: item.N_Usuario,
              name: item.Nombre
            }))
        ]
      })
  }

  editRegistro(){
    this._registros.editRegistro(this.id).subscribe({
    next: (response: any) => {
      this.formRegistro.setValue({
        id: response.id,
        rfc_recibe: response.rfc_recibe,
        rfc_entrega: response.rfc_entrega,
        id_departamento: response.id_departamento,
        fecha_movimiento: response.fecha_movimiento, 
        rfc_movimiento: response.rfc_movimiento
      })
  },
    error: (e: HttpErrorResponse) => {
    console.error('Error:', e.error?.msg || e);
    }
  });
}
}
