import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCalculadoraService } from '../../services/api-calculadora.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ApiCalculadoraService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm!: FormGroup;
  disabled_btn: boolean = true;

  constructor(
    private router: Router,
    private apiCalculadoraService: ApiCalculadoraService,
    private toastService: ToastrService 
  ){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){    
    this.apiCalculadoraService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: () =>  {
          this.toastService.success("sucesso")
          this.router.navigate(["index"])
        },
        error: () =>{
          this.toastService.error("erro, houve erro de acesso ao obter token")
          this.loginForm.reset()
        }   
    })
  }

}
