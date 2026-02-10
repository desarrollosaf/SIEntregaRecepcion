import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule, NgForm, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interfaces/user';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
// import { Console } from 'console';

@Component({
    selector: 'app-login',
    imports: [
      RouterLink,
      FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  loggedin: boolean = false;
  Urfc: string = '';
  Upassword: string = '';
  userRole$: Observable<string | undefined>;
  formLogin: FormGroup;

  public _userService = inject(UserService);

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    this.formLogin = this.fb.group({
      Urfc: [null, Validators.required],
      Upassword: [null, Validators.required],
    },{
        validators: []
    });

  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

 
  onLoggedin(form: NgForm) {
    const user: User = {
      rfc: form.value.Urfc,
      password: form.value.Upassword
    };

    this._userService.login(user).subscribe({
      next: (res) => {
      const userData = res.user;
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));
        // const bandera = response.bandera;
        // localStorage.setItem('isLoggedin', 'true'); 
        // this._userService.setCurrentUser(userData);
        // console.log('BANDRRAAAAAA '+bandera)
        if (userData.bandera === 1) {
           console.log('if bandera 1 titularws')
          this.router.navigate(['/documentacion']);
        } else if (userData.bandera === 2) {
          console.log('operativo entregas ')
          this.router.navigate(['/entregas']);
        }else{
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "¡Atención!",
            text: "No tiene acceso al sistema",
            showConfirmButton: false,
            timer: 3000
          });
        }
      },
      error: (e: HttpErrorResponse) => {
        console.log('entra a error '+e.error?.message)
         Swal.fire({
            position: "center",
            icon: "error",
            title: "¡Atención",
            text: e.error?.message || 'Error al iniciar sesión',
            showConfirmButton: false,
            timer: 3000
          });
      },
    });
  }
}
