import { Component, OnInit } from '@angular/core';
import { ICompania } from '../contracts/ICompania';
import { AeroportoService } from '../services/aeroporto.service';
import { IVoos, IVoosDetalhe } from '../contracts/IVoos';

@Component({
  selector: 'tegra-aeroporto',
  templateUrl: './aeroporto.component.html',
  styleUrls: ['./aeroporto.component.scss']
})

export class AeroportoComponent implements OnInit {
  orderby: string;
  aeroportoOrigem: string;
  aeroportoDestino: string;
  dataSaida: string;
  listaOrigem: ICompania[] = [];
  listaDestino: ICompania[] = [];
  listaVoos: IVoos[] = [];

  constructor(private aeroportoService: AeroportoService) { }

  ngOnInit() {
    this.aeroportoService.listarCompanias().subscribe(resp => {
      this.listaOrigem = resp;
      this.listaDestino = resp;
    });
  }
  buscarVoos() {
    const objPost = {
      'from': this.aeroportoOrigem,
      'to': this.aeroportoDestino,
      'date': this.dataSaida
    };
    this.aeroportoService.buscarVoos(objPost).subscribe(resp => {
      console.log(resp);
      this.listaVoos = resp;
      this.listaVoos.forEach(voo => {
        if (voo.voos.length > 0) {
          voo.totalPreco = this.calcularTotalPreco(voo.voos);

          const ultimaEscala = voo.voos[voo.voos.length - 1].chegada;
          const primeiraEscala = voo.voos[0].saida;
          const horaUltimaEscala = parseInt(ultimaEscala.split(':')[0]);
          const minutosUltimaEscala = parseInt(ultimaEscala.split(':')[1]);
          const horaPrimeiraEscala = parseInt(primeiraEscala.split(':')[0]);
          const minutosPrimeiraEscala = parseInt(primeiraEscala.split(':')[1]);
          const horaTotal = (horaUltimaEscala - horaPrimeiraEscala) < 0 ? (horaUltimaEscala - horaPrimeiraEscala) * -1 : (horaUltimaEscala - horaPrimeiraEscala);
          const minutosTotal = (minutosUltimaEscala - minutosPrimeiraEscala) < 0 ? (minutosUltimaEscala - minutosPrimeiraEscala) * -1 : (minutosUltimaEscala - minutosPrimeiraEscala);
          voo.totalHoras = ('0' + horaTotal).slice(-2) + ':' + ('0' + minutosTotal).slice(-2);
        }
      });

      this.ordernarVoos();
    });
  }
  calcularTotalPreco(escalas: IVoosDetalhe[]): number {
    let totalPreco = 0;
    escalas.forEach(escala => {
      totalPreco += escala.valor;
    });

    return totalPreco;
  }

  ordernarVoos() {
    if (this.orderby === "preco") {
      console.log('ordenada por preço', this.listaVoos.sort((a, b): number => {
        if (a.totalPreco < b.totalPreco) return -1;
        if (a.totalPreco > b.totalPreco) return 1;
        return 0;
      }));
    } else {
      console.log('ordenada por hora', this.listaVoos.sort((a, b): number => {
        if (a.totalHoras < b.totalHoras) return -1;
        if (a.totalHoras > b.totalHoras) return 1;
        return 0;
      }));
    }
  }
}
