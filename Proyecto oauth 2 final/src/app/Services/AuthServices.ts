import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  
  private CLIENT_ID = '952702744501-g0qoshkp5a7nts167sgbpuqoa5668i08.apps.googleusercontent.com'; // Reemplaza con tu CLIENT_ID de Google

  constructor() {}

  // Cargar el script de Google Identity Services (GSI)
  loadGsiScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = (err) => reject(new Error('No se pudo cargar el script GSI'));
      document.head.appendChild(script);
    });
  }

  // Inicializar el cliente de Google
  async initGsi(): Promise<void> {
    try {
      await this.loadGsiScript();  // Cargamos el script GSI

      window.google.accounts.id.initialize({
        client_id: this.CLIENT_ID,
        callback: this.handleCredentialResponse.bind(this),  // Aquí se maneja la respuesta después de iniciar sesión
      });

      // Renderizamos el botón de inicio de sesión de Google
      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'), // Asegúrate de tener un div con este ID en tu HTML
        { theme: 'outline', size: 'large' }  // Opcional: personalización del botón
      );

      console.log('Botón de Google renderizado correctamente.');
    } catch (error) {
      console.error('Error al cargar GSI:', error);
    }
  }

  // Callback que maneja la respuesta de Google después del inicio de sesión
  private handleCredentialResponse(response: any): void {
    try {
      console.log('Token de Google:', response.credential); // Muestra el token de Google en la consola
      const userData = JSON.parse(atob(response.credential.split('.')[1]));  // Decodifica el JWT para obtener los datos del usuario
      console.log('Datos del usuario:', userData); // Muestra los datos del usuario en la consola
      this.userSubject.next(userData);  // Actualiza el estado con los datos del usuario
    } catch (error) {
      console.error('Error al procesar la respuesta de Google:', error);
    }
  }

  // Método de cierre de sesión (opcional)
  logout(): void {
    this.userSubject.next(null);
    console.log('Usuario cerrado sesión');
  }
}
