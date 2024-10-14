import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  template: `
  <div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h2 class="text-center mb-4">Giriş Yap</h2>
      <form [formGroup]="loginForm" (ngSubmit)="login()">
        <!-- Username Field -->
        <div class="form-group mb-3">
          <label for="username" class="form-label">Kullanıcı Adı:</label>
          <input
            id="username"
            type="text"
            class="form-control"
            formControlName="username"
            [ngClass]="{ 'is-invalid': loginForm.get('username')?.invalid && loginForm.get('username')?.touched }"
            placeholder="Kullanıcı Adınızı Girin"
          />
          <!-- Username Validation Error -->
          <div class="invalid-feedback">
            Kullanıcı adı zorunludur.
          </div>
        </div>

        <!-- Password Field -->
        <div class="form-group mb-3">
          <label for="password" class="form-label">Şifre:</label>
          <input
            id="password"
            type="password"
            class="form-control"
            formControlName="password"
            [ngClass]="{ 'is-invalid': loginForm.get('password')?.invalid && loginForm.get('password')?.touched }"
            placeholder="Şifrenizi Girin"
          />
          <!-- Password Validation Error -->
          <div class="invalid-feedback">
            Şifre zorunludur.
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary w-100" [disabled]="!loginForm.valid">
          Giriş Yap
        </button>
      </form>
    </div>
  </div>
</div>

  `,
  styles: [`
    /* Stil ekleyin */
  `],
})
export class AuthComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Reactive formu oluşturun
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          // Başarılı giriş durumunda yönlendirme
          this.router.navigate(['/product-list']);
        },
        error => {
          console.error('Giriş başarısız:', error);
          // Kullanıcıya hata mesajı gösterin
          alert('Giriş başarısız! Lütfen kullanıcı adı veya şifrenizi kontrol edin.');
        }
      );
    }
  }
}
