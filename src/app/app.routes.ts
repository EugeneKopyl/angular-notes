import { Routes } from '@angular/router';
import { notesRoutes } from './features/note/notes-routing.module';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'notes',
                pathMatch: 'full',
            },
            ...notesRoutes,
        ],
    },
];
