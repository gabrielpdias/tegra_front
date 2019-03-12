export interface IVoos {
    origem: string;
    destino: string;
    date: string;
    voos: IVoosDetalhe[];
}

export interface IVoosDetalhe {
    voo: string;
    origem: string;
    destinno: string;
    data_saida: string;
    saida: string;
    chegada: string;
    valor: number;
}