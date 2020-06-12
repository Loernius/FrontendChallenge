import { Component, TemplateRef } from '@angular/core';
import { AppToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hide)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsComponent {
  // this one is the placeholder for the toasts, never leave home without one, your users want that error messages ;)

  constructor(public toastService: AppToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
