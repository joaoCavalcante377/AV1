import promptSync from "prompt-sync";
import { Sistema } from "./services/Sistema";
import { NivelPermissao, TipoAeronave } from "./models/enums";
import { Aeronave } from "./models/Aeronave";
import { Funcionario } from "./models/Funcionario";
import { Relatorio } from "./models/Relatorio";

const prompt = promptSync();
const sistema = new Sistema();
sistema.carregarDados();

function menu(): void {
  console.log("\n=== AEROCODE ===");
  console.log("1. Cadastrar aeronave");
  console.log("2. Cadastrar funcionário");
  console.log("3. Login");
  console.log("4. Listar aeronaves");
  console.log("5. Gerar relatório");
  console.log("0. Sair");

  const opcao = prompt("Escolha uma opção: ");

  switch (opcao) {
    case "1":
      cadastrarAeronave();
      break;
    case "2":
      cadastrarFuncionario();
      break;
    case "3":
      fazerLogin();
      break;
    case "4":
      listarAeronaves();
      break;
    case "5":
      gerarRelatorio();
      break;
    case "0":
      sistema.salvarDados();
      console.log("Até logo!");
      process.exit(0);
    case "jarvis":
      console.log("À sua disposição, senhor Stark!");
      break;
    default:
      console.log("Opção inválida. Tente novamente.");
  }
}

while (true) {
  menu();
}

function fazerLogin(): void {
  const usuario = prompt("Usuário: ");
  const senha = prompt("Senha: ");
  sistema.login(usuario, senha);
}
function listarAeronaves(): void {
  if (sistema.aeronaves.length === 0) {
    console.log("Nenhuma aeronave cadastrada.");
    return;
  }
  sistema.aeronaves.forEach((a) => a.exibirDetalhes());
}
function cadastrarAeronave(): void {
  const codigo = prompt("Código da aeronave: ");
  const modelo = prompt("Modelo da aeronave: ");
  const tipo = prompt("Tipo: 1. COMERCIAL, 2. MILITAR: ");
  const tipoOpcao =
    tipo === "1" ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR;
  const capacidade = parseInt(prompt("Capacidade: "));
  const alcance = parseInt(prompt("Alcance (km): "));
  const aeronave = new Aeronave(codigo, modelo, tipoOpcao, capacidade, alcance);
  sistema.cadastrarAeronave(aeronave);
}
function cadastrarFuncionario(): void {
  const id = prompt("ID do funcionário: ");
  const nome = prompt("Nome do funcionário: ");
  const telefone = prompt("Telefone do funcionário: ");
  const endereco = prompt("Endereço do funcionário: ");
  const usuario = prompt("Usuário: ");
  const senha = prompt("Senha: ");
  console.log("Nível de permissão: 1. ADMIN, 2. ENGENHEIRO, 3. OPERADOR");
  const nivelPermissao = prompt("Escolha o nível de permissão: ");
  const nivelPermissaoOpcao =
    nivelPermissao === "1"
      ? NivelPermissao.ADMINISTRADOR
      : nivelPermissao === "2"
        ? NivelPermissao.ENGENHEIRO
        : NivelPermissao.OPERADOR;
  const funcionario = new Funcionario(
    id,
    nome,
    telefone,
    endereco,
    usuario,
    senha,
    nivelPermissaoOpcao,
  );
  sistema.cadastrarFuncionario(funcionario);

  if (nome.toLowerCase() === "vinz") {
    console.log(
      "\nC'est l'histoire d'un homme qui tombe d'un immeuble de 50 étages...",
    );
    console.log(
      "Au fur et à mesure de sa chute, il se répète sans cesse pour se rassurer...",
    );
    console.log(
      "Jusqu'ici tout va bien. Jusqu'ici tout va bien. Jusqu'ici tout va bien.",
    );
    console.log(
      "Mais l'important, c'est pas la chute. C'est l'atterrissage.\n",
    );
  }
}
function gerarRelatorio(): void {
  const codigo = prompt("Código da aeronave: ");
  const aeronave = sistema.aeronaves.find((a) => a.codigo === codigo);
  if (!aeronave) {
    console.log("Aeronave não encontrada.");
    return;
  }
  const nomeCliente = prompt("Nome do cliente: ");
  const dataEntrega = prompt("Data de entrega: ");
  const relatorio = new Relatorio(aeronave, nomeCliente, dataEntrega);
  relatorio.salvar();
}
