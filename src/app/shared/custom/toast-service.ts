import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toast$ = new Subject<ToastrMessage>();

  success(message: string)
  {
     this.toast$.next({type:'success', message});
  }

  error(message: string)
  {
    this.toast$.next({type:'error', message});
  }

  warning(message:string)
  {
    this.toast$.next({type:'warning', message});
  }

}

export interface ToastrMessage {
  type : 'success' | 'error' | 'warning';
  message : string;

}