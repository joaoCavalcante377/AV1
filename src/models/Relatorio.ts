import { Aeronave } from "./Aeronave";
import * as fs from "fs";

export class Relatorio {
  aeronave: Aeronave;
  nomeCliente: string;
  dataEntrega: string;

  constructor(aeronave: Aeronave, nomeCliente: string, dataEntrega: string) {
    this.aeronave = aeronave;
    this.nomeCliente = nomeCliente;
    this.dataEntrega = dataEntrega;
  }
  gerar(): string {
    let texto = "";
    texto += `Cliente: ${this.nomeCliente}\n`;
    texto += `Data de Entrega: ${this.dataEntrega}\n`;
    texto += `Aeronave: ${this.aeronave.modelo}\n`;
    texto += `Peças:\n`;
    this.aeronave.pecas.forEach((peca) => {
      texto += ` - ${peca.nome} | ${peca.tipo} | ${peca.status}\n`;
    });
    texto += `Etapas:\n`;
    this.aeronave.etapas.forEach((etapa) => {
      texto += ` - ${etapa.nome} | ${etapa.status}\n`;
    });
    texto += `Testes:\n`;
    this.aeronave.testes.forEach((teste) => {
      texto += ` - ${teste.tipo} | ${teste.resultado}\n`;
    });
    return texto;
  }
  salvar(): void {
    const texto = this.gerar();
    fs.writeFileSync(`Relatorio_${this.aeronave.codigo}.txt`, texto);
    console.log("relatorio salvo");
  }
}
