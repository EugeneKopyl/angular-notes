import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../models';

@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.component.html',
    styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit, OnChanges {
    @Input() note: Note | null;
    @Output() save = new EventEmitter<Note>();
    @Output() cancel = new EventEmitter<void>();

    editNote: Note | null = null;

    ngOnInit(): void {
        this.updateEditNote();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['note']) {
            this.updateEditNote();
        }
    }

    private updateEditNote(): void {
        if (this.note) {
            this.editNote = { ...this.note };
        } else {
            this.editNote = { id: '', dateCreated: new Date(), text: '' };
        }
    }

    onSave(): void {
        if (this.editNote) {
            if (!this.editNote.id) {
                this.editNote.id = uuidv4();
            }
            this.save.emit(this.editNote);
        } else {
            console.error('Save operation failed: no note to save.');
        }
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
