import {
    Component,
    AfterViewInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Note } from '../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements AfterViewInit, OnChanges {
    displayedColumns: string[] = ['select', 'dateCreated', 'text', 'actions'];
    selectedNotes: Note[] = [];

    @Input() notes: Note[] = [];

    @Output() edit = new EventEmitter<Note>();
    @Output() delete = new EventEmitter<string>();

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    dataSource: MatTableDataSource<Note>;

    constructor() {
        this.dataSource = new MatTableDataSource<Note>([]);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['notes']) {
            this.dataSource.data = this.notes;
        }
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    onEdit(note: Note): void {
        this.edit.emit(note);
    }

    onDelete(note: Note): void {
        this.delete.emit(note.id);
    }

    toggleSelection(note: Note): void {
        const index = this.selectedNotes.indexOf(note);
        if (index > -1) {
            this.selectedNotes.splice(index, 1);
        } else {
            this.selectedNotes.push(note);
        }
    }

    isNoteSelected(note: Note): boolean {
        return this.selectedNotes.includes(note);
    }

    masterToggle() {
        const areAllSelected = this.dataSource.data.length === this.selectedNotes.length;
        if (areAllSelected) {
            this.selectedNotes = [];
        } else {
            this.selectedNotes = [...this.dataSource.data];
        }
    }
}
