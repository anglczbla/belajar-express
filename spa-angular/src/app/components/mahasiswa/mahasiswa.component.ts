import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mahasiswa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css']
})
export class MahasiswaComponent implements OnInit {
  mahasiswa: any[] = []; // Menyimpan data mahasiswa
  prodi: any[] = []; // Menyimpan data program studi untuk dropdown
  jenisKelaminOptions: string[] = ['Laki-laki', 'Perempuan']; // Opsi jenis kelamin
  apiMahasiswaUrl = 'https://crud-express-seven.vercel.app/api/mahasiswa'; // URL API untuk mengambil dan menambahkan data mahasiswa
  apiProdiUrl = 'https://crud-express-seven.vercel.app/api/prodi'; // URL API untuk mengambil data prodi
  isLoading = true; // Indikator loading data dari API
  mahasiswaForm: FormGroup; // Form group untuk formulir reaktif mahasiswa
  isSubmitting = false; // Indikator proses pengiriman data

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  constructor() {
    this.mahasiswaForm = this.fb.group({
      npm: [''],
      nama: [''],
      prodi_id: [null],
      jenis_kelamin: [''],
      asal_sekolah: ['']
    });
  }

  ngOnInit(): void {
    this.getMahasiswa();
    this.getProdi();
  }

  // Mengambil data mahasiswa
  getMahasiswa(): void {
    this.http.get<any[]>(this.apiMahasiswaUrl).subscribe({
      next: (data) => {
        this.mahasiswa = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching mahasiswa data:', err);
        this.isLoading = false;
      }
    });
  }

  // Mengambil data program studi untuk dropdown
  getProdi(): void {
    this.http.get<any[]>(this.apiProdiUrl).subscribe({
      next: (data) => {
        this.prodi = data;
      },
      error: (err) => {
        console.error('Error fetching prodi data:', err);
      }
    });
  }

  // Menambahkan mahasiswa
  addMahasiswa(): void {
    if (this.mahasiswaForm.valid) {
      this.isSubmitting = true;
      this.http.post(this.apiMahasiswaUrl, this.mahasiswaForm.value).subscribe({
        next: (response) => {
          console.log('Mahasiswa berhasil ditambahkan:', response);
          this.getMahasiswa();
          this.mahasiswaForm.reset();
          this.isSubmitting = false;

          // Tutup modal setelah data berhasil ditambahkan
          const modalElement = document.getElementById('tambahMahasiswaModal') as HTMLElement;
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.hide();
          }
        },
        error: (err) => {
          console.error('Error menambahkan mahasiswa:', err);
          this.isSubmitting = false;
        }
      });
    }
  }

  // Menghapus mahasiswa
  deleteMahasiswa(_id: string): void {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      this.http.delete(`${this.apiMahasiswaUrl}/${_id}`).subscribe({
        next: () => {
          console.log(`Mahasiswa dengan ID ${_id} berhasil dihapus`);
          this.getMahasiswa();
        },
        error: (err) => {
          console.error('Error menghapus mahasiswa:', err);
        }
      });
    }
  }
}
