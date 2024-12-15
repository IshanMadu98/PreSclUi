import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventDto } from '../../../../../@domain/EventDto';
import { EventService } from '../../../../../@application/services/event.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-update-event-dialog',
  templateUrl: './add-update-event-dialog.component.html',
  styleUrl: './add-update-event-dialog.component.scss'
})
export class AddUpdateEventDialogComponent {
  eventForm: FormGroup;
  title: string;
  btnTitle: string;
  eventData: EventDto = {} as EventDto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; btnTitle: string; eventData: EventDto },
    private dialogRef: MatDialogRef<AddUpdateEventDialogComponent>,
    private eventService: EventService,
    private message: NzMessageService
  ) {
    this.title = this.data.title;
    this.btnTitle = this.data.btnTitle;
    this.eventData = this.data?.eventData;

    this.eventForm = new FormGroup({
      id: new FormControl(this.eventData?.id, null),
      title: new FormControl(this.eventData?.title, [Validators.required]),
      description: new FormControl(this.eventData?.description),
      eventDate: new FormControl(this.eventData?.eventDate, [Validators.required]),
      venue: new FormControl(this.eventData?.venue),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date())
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const event = this.eventForm.value;
      if (this.eventData?.id) {
        // Update event
        this.eventService.updateEvent(event).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        // Add new event
        this.eventService.createEvent(event).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
