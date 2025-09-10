import { Component } from '@angular/core';
import { ToastrMessage, ToastService } from '../shared/custom/toast-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toastr',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './toastr.html',
  styleUrl: './toastr.css'
})
export class ToastrComponent {
  toasts: ToastrMessage[] = [];

    constructor(private toastService: ToastService) {
       this.toastService.toast$.subscribe(t => {
        this.toasts.push(t);
        setTimeout(() => this.toasts.shift(), 3000);
      });
    }
}
