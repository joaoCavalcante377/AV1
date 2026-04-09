import { StatusEtapa } from "./enums";
import { Funcionario } from "./Funcionario";

export class Etapa {
  nome: string;
  prazo: string;
  status: StatusEtapa;
  funcionarios: Funcionario[];

  constructor(nome: string, prazo: string) {
    this.nome = nome;
    this.prazo = prazo;
    this.status = StatusEtapa.PENDENTE;
    this.funcionarios = [];
  }
  iniciar(): void {
    if (this.status === StatusEtapa.PENDENTE) {
      this.status = StatusEtapa.ANDAMENTO;
    } else {
      console.log(
        `A etapa ${this.nome} não pode ser iniciada. Status atual: ${this.status}`,
      );
    }
  }
  finalizar(): void {
    if (this.status === StatusEtapa.ANDAMENTO) {
      this.status = StatusEtapa.CONCLUIDA;
    } else {
      console.log(
        `A etapa ${this.nome} não pode ser finalizada. Status atual: ${this.status}`,
      );
    }
  }
  adicionarFuncionario(funcionario: Funcionario): void {
    const jaExiste = this.funcionarios.some((f) => f.id === funcionario.id);
    if (!jaExiste) {
      this.funcionarios.push(funcionario);
    } else {
      console.log(
        `Funcionário ${funcionario.nome} já está atribuído à etapa ${this.nome}.`,
      );
    }
  }
}
