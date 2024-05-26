import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NotesComponent } from './notes';
import { NoteListComponent } from './note-list';
import { NoteDetailComponent } from './note-detail';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ToggleExpandedDirective } from '../../core';

@NgModule({
    declarations: [NotesComponent, NoteListComponent, NoteDetailComponent, ToggleExpandedDirective],
    imports: [
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatButtonModule,
        DatePipe,
        MatFormField,
        MatLabel,
        FormsModule,
        NgIf,
        MatInput,
        CdkTextareaAutosize,
        NgClass,
    ],
})
export class NotesModule {}
