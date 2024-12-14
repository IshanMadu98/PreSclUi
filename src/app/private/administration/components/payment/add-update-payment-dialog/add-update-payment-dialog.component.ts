import { Component, Inject, InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentDto } from '../../../../../@domain/PaymentDto';
import { PaymentService } from '../../../../../@application/services/paymentService';
import { PaymentCategory } from '../../../../../@application/enums/paymentCategory';

@Component({
  selector: 'app-add-update-payment-dialog',
  templateUrl: './add-update-payment-dialog.component.html',
  styleUrl: './add-update-payment-dialog.component.scss'
})
export class AddUpdatePaymentDialogComponent {
  paymentForm: FormGroup;
  title: string;
  btnTitle: string;
  paymentData= {} as  PaymentDto;
  paymentCategories = [
    { value: PaymentCategory.SchoolFees, label: 'School Fees' },
    { value: PaymentCategory.Stationery, label: 'Stationery' },
    { value: PaymentCategory.SchoolDevelopmentFund, label: 'School Development Fund' },
    { value: PaymentCategory.Registration, label: 'Registration' },
    { value: PaymentCategory.Refundable, label: 'Refundable' },
    { value: PaymentCategory.Sports, label: 'Sports' },
    { value: PaymentCategory.Events, label: 'Events' },
    { value: PaymentCategory.Other, label: 'Other' }
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; btnTitle: string; paymentData: PaymentDto },
    private dialogRef: MatDialogRef<AddUpdatePaymentDialogComponent>,
    private paymentService: PaymentService
  ) {
    this.title =  this.data.title;
    this.btnTitle =  this.data.btnTitle;
    this.paymentData =  this.data?.paymentData;

    this.paymentForm = new FormGroup({
      id: new FormControl(this.paymentData?.id, null),
      receiptNumber: new FormControl(this.paymentData?.receiptNumber),
      studentId: new FormControl(this.paymentData?.studentId),
      studentNo: new FormControl(this.paymentData?.studentNo),
      category: new FormControl(this.paymentData?.category, [Validators.required]),
      paymentDate: new FormControl(this.paymentData?.paymentDate),
      amount: new FormControl(this.paymentData?.amount, [Validators.required]),
      status: new FormControl(this.paymentData?.status, [Validators.required]),
      notes: new FormControl(this.paymentData?.notes),
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const payment = this.paymentForm.value;
      if (this.paymentData) {
        // Update existing payment
        this.paymentService.updatePayment(payment).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        // Add new payment
        this.paymentService.addPayment(payment).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}


