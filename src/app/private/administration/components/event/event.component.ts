import { Component } from '@angular/core';
import { EventService } from '../../../../@application/services/event.service';
import { EventDto } from '../../../../@domain/EventDto';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUpdateEventDialogComponent } from './add-update-event-dialog/add-update-event-dialog.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  events: EventDto[] = [];

  constructor(
    private dialog: MatDialog,
    private modal: NzModalService,
    private eventService: EventService,
    private message: NzMessageService
  ) { }

   ngOnInit(): void {
    this.loadEvents();
  }

  addEvent() {
    const dialogRef = this.dialog.open(AddUpdateEventDialogComponent, {
      width: '50%',
      data: {
        title: 'Add Event',
        btnTitle: 'Add',
      },
    });
    this.reloadAfterClosed(dialogRef);
  }

  updateEvent(event: EventDto) {
    const dialogRef = this.dialog.open(AddUpdateEventDialogComponent, {
      width: '50%',
      data: {
        title: 'Update Event',
        btnTitle: 'Update',
        eventData: event
      }
    });
    this.reloadAfterClosed(dialogRef);
  }

  private reloadAfterClosed(dialogRef: MatDialogRef<any>) {
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.loadEvents();
      }
    });
  }

  deleteEvent(id: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this event?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.eventService.deleteEvent(id).subscribe(
          () => {
            this.message.success('Event deleted successfully');
            this.loadEvents();
          },
          (error) => {
            this.message.error('Failed to delete event');
          }
        );
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        this.message.info('Deletion canceled');
      }
    });
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: EventDto[]) => {
        this.events = events;
      },
      (error) => {
        this.message.error('Failed to load events');
      }
    );
  }
}
