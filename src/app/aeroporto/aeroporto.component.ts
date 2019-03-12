import { Component, OnInit } from '@angular/core';
import { ICompania } from '../contracts/ICompania';
import { AeroportoService } from '../services/aeroporto.service';
import { IVoos } from '../contracts/IVoos';

@Component({
    selector: 'tegra-aeroporto',
    templateUrl: './aeroporto.component.html',
    styleUrls: ['./aeroporto.component.scss']
})

export class AeroportoComponent implements OnInit {
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
    buscarVoos(){
        var objPost = {
            "from": this.aeroportoOrigem,
            "to": this.aeroportoDestino,
            "date": this.dataSaida
        };
        this.aeroportoService.buscarVoos(objPost).subscribe(resp =>{
            console.log(resp);
            this.listaVoos = resp;
        });
    }
}