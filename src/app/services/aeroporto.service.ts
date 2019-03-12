import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ICompania } from '../contracts/ICompania';
import { IVoos } from '../contracts/IVoos';

@Injectable()
export class AeroportoService {
    public url = environment.apiEndpoint;
    constructor(public api: ApiService) { }

    listarCompanias(): Observable<ICompania[]> {
        return this.api.get(this.url + "/companies");
    }

    buscarVoos(objPost): Observable<IVoos[]> {
        return this.api.post(this.url, objPost);
    }
}