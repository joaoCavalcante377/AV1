import * as fs from "fs";

export class Persistencia {
  static salvar(caminho: string, dados: any): void {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
  }

  static carregar(caminho: string): any {
    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      return JSON.parse(conteudo);
    }
    return [];
  }
}
