import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Table } from '../models/table';
import { Options } from '../models/options';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  //Only frontend mock service.
  
  mockGustosDB: BehaviorSubject<Table[]> = new BehaviorSubject([
    {
    id: 1,
    meGusta: 'Manzana',
    meGusta_cont: 1,
    noGusta: 'Vinagre',
    noGusta_cont: 2
    },
    {
    id: 2,
    meGusta: 'Pera',
    meGusta_cont: 3,
    noGusta: 'Pomelo',
    noGusta_cont: 1
    }
  ]);

  mockOptionsDB: BehaviorSubject<Options[]> = new BehaviorSubject([
    {
      id: 1,
      opcion: 'Un vampiro musculoso'
    },
    {
      id: 2,
      opcion: 'Bruce Wayne'
    }
  ]);

  public getOpciones(): Observable<Options[]> {
    return this.mockOptionsDB;
  }

  public getGustos(): Observable<Table[]> {
    return this.mockGustosDB;
  }

  public agregarOpcion(opcion:string):Observable<Options[]>{
    const modified: Options[] = this.mockOptionsDB.value;
    const arrayLength = modified.length;
    if (arrayLength > 0) {
      const lastId = modified[arrayLength - 1].id;
      modified.push({ id: lastId + 1, opcion: opcion });
      this.mockOptionsDB.next(modified);
    }
    else {
      modified.push({ id: 0 , opcion: opcion });
    }
    this.mockOptionsDB.value.length
    return this.mockOptionsDB;
  }
  
  public quitarOpcion(id:number):Observable<Options[]> {
    const modified: Options[] = this.mockOptionsDB.value;
    const index = modified.findIndex((element) => element.id === id);
    modified.splice(index,1);
    this.mockOptionsDB.next(modified);
    return this.mockOptionsDB;
  }

  quitarGusto(id:number):Observable<never> {
    let newTable:Table[]=this.mockGustosDB.value;
    const findTableIndex= (element:Table) => element.id===id;
    const position = newTable.findIndex(findTableIndex);
    newTable.splice(position,1);
    this.mockGustosDB.next(newTable);
    return new Observable();
  }

  editarGusto(id:number,meGusta:string,noGusta:string):Observable<never> {
    let newTable:Table[]=this.mockGustosDB.value;
    const findTableIndex= (element:Table) => element.id===id;
    const position = newTable.findIndex(findTableIndex);
    newTable[position].meGusta=meGusta;
    newTable[position].noGusta=noGusta;
    this.mockGustosDB.next(newTable);
    return new Observable();
  }

  agregarGusto(meGusta:string,noGusta:string):Observable<never> {
    let newTable:Table[]=this.mockGustosDB.value;
    const lastID=newTable[newTable.length-1].id+1;
    newTable.push({id:lastID,meGusta,noGusta,meGusta_cont:1,noGusta_cont:2});
    this.mockGustosDB.next(newTable);
    return new Observable();
  }

  descargar(itemsToDownload:Table[]):Observable<never> {
    return new Observable;
  }

  updateVote (id:number,type:number,value:number):Observable<never> {
    return new Observable;
  }

  upload (from:FormData):Observable<never> {
    return new Observable;
  }

  //full version service methods.
  /* private url:string= 'http://localhost:3050';

  public getOpciones(): Observable<Options[]> {
    return this.http.get<Options[]>(this.url+'/opciones', {responseType: 'json'});
  }

  public getGustos (): Observable<Table[]> {
    return this.http.get<Table[]>(this.url+'/gustos', {responseType: 'json'});
  }

  public agregarOpcion(opcion:string) {
    return this.http.post(this.url+'/agregaropcion',{"opcion": opcion});
  }

  public agregarGusto(meGusta:string, noGusta: string) {
    return this.http.post(this.url+'/agregargusto',{"meGusta": meGusta,  "noGusta": noGusta});
  }

  public quitarOpcion (id:number) {
    return this.http.delete(this.url+'/quitaropcion/'+id);
  }
  
  public quitarGusto (id:number) {
    return this.http.delete(this.url+'/quitargusto/'+id);
  }

  public editarGusto (id:number,meGusta:string,noGusta:string) {
    return this.http.patch(this.url+'/editargusto/'+id, {"meGusta": meGusta, "noGusta": noGusta});
  }

  public descargar(elementos:Table[]) {
    return this.http.post(this.url+'/descargar',{elementos},{responseType: 'blob'});
  }

  public updateVote(id:number,type:number,value:number) {
    return this.http.patch(this.url+'/editarvoto/'+id, {type,value});
  }

  public upload(form:FormData) {
    return this.http.post(this.url+'/upload',form);
  }
  */
  
}