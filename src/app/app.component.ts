import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesModule } from './features/note/notes.module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NotesModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'angular-notes';
}
