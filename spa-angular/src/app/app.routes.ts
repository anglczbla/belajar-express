import { Routes } from '@angular/router';
import { FakultasComponent } from './components/fakultas/fakultas.component';
import { HomeComponent } from './components/home/home.component';
import { ProdiComponent } from './components/prodi/prodi.component';  // Pastikan mengimpor ProdiComponent
import { MahasiswaComponent } from './components/mahasiswa/mahasiswa.component';  // Pastikan mengimpor MahasiswaComponent

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'fakultas', component: FakultasComponent },
    { path: 'prodi', component: ProdiComponent },
    { path: 'mahasiswa', component: MahasiswaComponent }
];
