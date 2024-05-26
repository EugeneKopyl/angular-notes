import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note } from '../models';
import { NoteListComponent } from '../note-list';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
    notes: Note[] = [];
    editingNote: Note | null = null;

    @ViewChild(NoteListComponent) noteListComponent!: NoteListComponent;

    constructor(private noteService: NoteService) {}

    ngOnInit(): void {
        this.noteService.getNotes().subscribe((notes) => {
            this.notes = notes;
        });
    }

    onEdit(note: any): void {
        this.editingNote = { ...note };
    }

    onDelete(noteId: string): void {
        this.noteService.removeNote(noteId);
        this.editingNote = null;
    }

    onDeleteSelected(): void {
        const selectedIds = this.noteListComponent.selectedNotes.map((note) => note.id);
        this.noteService.removeNote(selectedIds);
        this.editingNote = null;
    }

    onSave(note: Note): void {
        if (note.id) {
            const index = this.notes.findIndex((n) => n.id === note.id);
            this.notes[index] = note;
            this.noteService.UpdateNote(note);
        } else {
            this.noteService.addNote(note);
        }
        this.editingNote = null;
    }

    onCancelEdit(): void {
        this.editingNote = null;
    }

    onAddNew(): void {
        this.editingNote = { id: '', dateCreated: new Date(), text: '' };
    }
}
