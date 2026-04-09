import { Aeronave } from "../models/Aeronave";
import { Funcionario } from "../models/Funcionario";
import { Persistencia } from "./Persistencia";

export class Sistema {
  aeronaves: Aeronave[] = [];
  funcionarios: Funcionario[] = [];
  funcionarioLogado: Funcionario | null = null;

  login(usuario: string, senha: string): boolean {
    const funcionario = this.funcionarios.find((f) =>
      f.autenticar(usuario, senha),
    );
    if (funcionario) {
      this.funcionarioLogado = funcionario;
      console.log(`Funcionário ${funcionario.nome} logado com sucesso!`);
      return true;
    }
    console.log("Usuário ou senha inválidos.");
    return false;
  }

  cadastrarAeronave(aeronave: Aeronave): void {
    const jaExiste = this.aeronaves.some((a) => a.codigo === aeronave.codigo);
    if (jaExiste) {
      console.log(
        `Aeronave com código ${aeronave.codigo} já existe. Cadastro não realizado.`,
      );
      return;
    }
    this.aeronaves.push(aeronave);
    console.log(`Aeronave cadastrada com sucesso!`);
  }
  cadastrarFuncionario(funcionario: Funcionario): void {
    const jaExiste = this.funcionarios.some((f) => f.id === funcionario.id);
    if (jaExiste) {
      console.log(
        `Funcionário com ID ${funcionario.id} já existe. Cadastro não realizado.`,
      );
      return;
    }
    this.funcionarios.push(funcionario);
    console.log(`Funcionário cadastrado com sucesso!`);
  }
  salvarDados(): void {
    Persistencia.salvar("src/data/aeronaves.txt", this.aeronaves);
    Persistencia.salvar("src/data/funcionarios.txt", this.funcionarios);
    console.log("Dados salvos com sucesso!");
  }
  carregarDados(): void {
    this.aeronaves = Persistencia.carregar("src/data/aeronaves.txt");
    this.funcionarios = Persistencia.carregar("src/data/funcionarios.txt");
    console.log("Dados carregados com sucesso!");
  }
}
