import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth_service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNotification = false; // Bildirimi göstermek için bir bayrak
  notificationMessage = ''; // Bildirim mesajını saklamak için bir değişken
  currentUser: any; // Mevcut kullanıcı bilgilerini saklamak için bir değişken

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Angular bileşeni başlatıldığında yapılacak işlemler
    // AuthService'ten currentUser Observable'ına abone olun
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user; // Mevcut kullanıcı bilgilerini güncelle
      if (user) {
        // Eğer kullanıcı varsa, bildirimi göster
        this.showNotification = true;
        this.notificationMessage = 'Oturum başarıyla açıldı!';
        // Bildirimi 5 saniye sonra gizle
        setTimeout(() => {
          this.showNotification = false;
        }, 5000); // 5 saniye sonra bildirimi gizle
      }
    });
  }

  logout(): void {
    // Çıkış yapma işlemi
    this.authService.logout(); // AuthService'ten çıkış yap metodunu çağır
    this.currentUser = null; // Mevcut kullanıcı bilgilerini temizle
  }
}
