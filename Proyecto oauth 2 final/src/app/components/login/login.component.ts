import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/AuthServices';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Cambia 'private' por 'public' para acceder a authService en el template
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initGsi();
  }

  login(): void {
    console.log('Iniciar sesión con Google');
  }

  logout(): void {
    this.authService.logout();
  }
}
