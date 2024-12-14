import { Component } from '@angular/core';
import { PaymentDto } from '../../../../@domain/PaymentDto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddUpdatePaymentDialogComponent } from './add-update-payment-dialog/add-update-payment-dialog.component';
import { PaymentService } from '../../../../@application/services/paymentService';
import { PaymentCategory } from '../../../../@application/enums/paymentCategory';
import { PaymentStatus } from '../../../../@application/enums/paymentStatus';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  payments: PaymentDto[] = [];
  paymentCategory = PaymentCategory
  paymentStatus = PaymentStatus

  constructor(
    private dialog: MatDialog,
    private modal: NzModalService,
    private paymentService: PaymentService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  addPayment() {
    const dialogRef = this.dialog.open(AddUpdatePaymentDialogComponent, {
      width: '50%',
      data: {
        title: 'Add Payment',
        btnTitle: 'Add',
      },
    });
    this.reloadAfterClosed(dialogRef);
  }

  updatePayment(payment: PaymentDto) {
    const dialogRef = this.dialog.open(AddUpdatePaymentDialogComponent, {
      width: '50%',
      data: {
        title: 'Update Payment',
        btnTitle: 'Update',
        paymentData: payment
      }
    });
    this.reloadAfterClosed(dialogRef);
  }

  private reloadAfterClosed(dialogRef: MatDialogRef<any>) {
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.loadPayments();
      }
    });
  }

  deletePayment(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this payment?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.paymentService.deletePayment(id).subscribe(
          () => {
            this.message.success('Payment deleted successfully');
            this.loadPayments();
          },
          (error) => {
            this.message.error('Failed to delete payment');
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        this.message.info('Deletion canceled');
      }
    });
  }

  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (payments: PaymentDto[]) => {
        this.payments = payments;
      },
      (error) => {
        this.message.error('Failed to load payments');
      }
    );
  }

}

