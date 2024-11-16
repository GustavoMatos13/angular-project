import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiCalculadoraService } from '../../services/api-calculadora.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule],
  providers: [
    ApiCalculadoraService
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  result: string = '';
  visor: string = '';
  resultado: number | null = null;
  erro: string | null = null;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private apiCalculadoraService: ApiCalculadoraService,
  ) {}

  adicionarNoVisor(value: string): void {
    this.visor += value;
  }

  adicionarOperacao(operacao: string): void {
    const visorLen = this.visor.split(' ');
    if(visorLen.length > 2){
      this.toastService.error("erro, essa calculadora suporta apena uma operação")
      return
    }
    if (this.visor) {
      this.visor += ` ${operacao} `;
    }
  }

  limparVisor(): void {
    this.result = '';
    this.visor = '';
    this.resultado = null;
    this.erro = null;
  }

  calcular(): void {
    const [numero1, operacao, numero2] = this.visor.split(' ');

    if (!numero1 || !operacao || !numero2) {
      this.erro = 'Por favor, insira uma expressão válida!';
      return;
    }

    const payload = {
      numero1: numero1,
      numero2: numero2,
      operacao: this.mapOperacao(operacao)
    };

    this.apiCalculadoraService.calcular(payload.operacao, payload.numero1, payload.numero2).subscribe(
      (response) => {
        console.log(response)
        this.result = JSON.stringify(response)
        this.result = this.result.replace('{\"result\":\"','')
        this.result = this.result.replace('\"}','')
        console.log('Resposta recebida:', response);
      },
      (error) => {
        console.error('Erro na requisição', error);
        this.router.navigate(['login']);
      }
    )
  }

  mapOperacao(operacao: string): string {
    switch (operacao) {
      case '+': return 'somar';
      case '-': return 'subtrair';
      case '*': return 'multiplicar';
      case '/': return 'dividir';
      default: return '';
    }
  }
}


