import { TipoAeronave } from "./enums";
import { Etapa } from "./Etapa";
import { Peca } from "./Peca";
import { Teste } from "./Teste";
export class Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcance: number;
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];

  constructor(
    codigo: string,
    modelo: string,
    tipo: TipoAeronave,
    capacidade: number,
    alcance: number,
  ) {
    this.codigo = codigo;
    this.modelo = modelo;
    this.tipo = tipo;
    this.capacidade = capacidade;
    this.alcance = alcance;
    this.pecas = [];
    this.etapas = [];
    this.testes = [];
  }
  exibirDetalhes(): void {
    console.log({
      codigo: this.codigo,
      modelo: this.modelo,
      tipo: this.tipo,
      capacidade: this.capacidade,
      alcance: this.alcance,
      pecas: this.pecas,
      etapas: this.etapas,
      testes: this.testes,
    });
  }
}
