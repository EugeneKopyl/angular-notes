import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models';

@Injectable({
    providedIn: 'root',
})
export class NoteService {
    private notes: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

    constructor() {
        this.loadInitialNotes();

        window.addEventListener('storage', this.handleStorageEvent.bind(this));
    }

    private loadInitialNotes() {
        const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        this.notes.next(storedNotes);
    }

    private handleStorageEvent(event: StorageEvent) {
        if (event.key === 'notes') {
            this.loadInitialNotes();
        }
    }
    getNotes() {
        return this.notes.asObservable();
    }

    UpdateNote(note: Note) {
        const currentNotes = this.notes.getValue();
        const index = currentNotes.findIndex((item) => item.id === note.id);
        if (index !== -1) {
            currentNotes[index] = note;
        } else {
            currentNotes.push(note);
        }
        const updatedNotes = [...currentNotes];
        this.notes.next(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    addNote(note: Note) {
        const currentNotes = this.notes.getValue();
        const updatedNotes = [...currentNotes, note];
        this.notes.next(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    removeNote(ids: string | string[]): void {
        const idsArray = Array.isArray(ids) ? ids : [ids];

        const updatedNotes = this.notes.getValue().filter((note) => !idsArray.includes(note.id));

        this.notes.next(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
}
