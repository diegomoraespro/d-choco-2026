// src/lib/pwa.ts

import { auth } from './firebase';
import { app } from './firebase'; // <--- Adicione as chaves

// Extensão para o event do beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform?: string }>;
}

export class PWAManager {
  deferredPrompt: BeforeInstallPromptEvent | null = null;
  isOnline: boolean = typeof window !== 'undefined' ? navigator.onLine : true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.setupOfflineDetection();
    this.setupNotifications();
  }

  private registerServiceWorker() {
    if (typeof window === 'undefined') return;
    
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('✓ Service Worker registrado', registration);
            this.checkForUpdates(registration);
          })
          .catch(console.error);
      });
    }
  }

  private checkForUpdates(registration: ServiceWorkerRegistration) {
    setInterval(() => registration.update(), 60000);
  }

  private setupInstallPrompt() {
    if (typeof window === 'undefined') return;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.showInstallPrompt();
    });

    window.addEventListener('appinstalled', () => {
      console.log('✓ PWA instalada');
      this.deferredPrompt = null;
    });
  }

  private showInstallPrompt() {
    if (typeof window === 'undefined') return;
    
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 604800000) return;

    const container = document.createElement('div');
    container.className = 'pwa-install-prompt show';
    container.innerHTML = `
      <div class="pwa-install-content">
        <div class="pwa-install-icon"><i class="fas fa-mobile-alt"></i></div>
        <div class="pwa-install-text">
          <h3>Instale D'Choco no seu celular</h3>
          <p>Acesse mais rápido e sem publicidade. Como um app nativo!</p>
        </div>
        <div class="pwa-install-buttons">
          <button id="pwa-dismiss">Não</button>
          <button id="pwa-install">Instalar</button>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    document.getElementById('pwa-install')?.addEventListener('click', () => this.installPWA(container));
    document.getElementById('pwa-dismiss')?.addEventListener('click', () => this.dismissPrompt(container));
  }

  private async installPWA(container: HTMLElement) {
    if (!this.deferredPrompt) return;
    this.deferredPrompt.prompt();
    const choice = await this.deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') console.log('✓ Usuário aceitou instalar');
    this.deferredPrompt = null;
    container.remove();
  }

  private dismissPrompt(container: HTMLElement) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    container.remove();
  }

  private setupOfflineDetection() {
    if (typeof window === 'undefined') return;
    
    const indicator = document.createElement('div');
    indicator.className = 'offline-indicator';
    indicator.textContent = '⚠️ Você está offline - Alguns recursos podem não estar disponíveis';
    document.body.appendChild(indicator);

    window.addEventListener('online', () => {
      this.isOnline = true;
      indicator.classList.remove('show');
      this.syncData();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      indicator.classList.add('show');
    });

    if (!navigator.onLine) indicator.classList.add('show');
  }

  private syncData() {
    console.log('↻ Sincronizando dados...');
  }

  private setupNotifications() {
    if (typeof window === 'undefined') return;
    
    if ('Notification' in window && 'serviceWorker' in navigator && Notification.permission === 'default') {
      setTimeout(() => Notification.requestPermission(), 3000);
    }
  }

  sendNotification(title: string, options: NotificationOptions = {}) {
    if (typeof window === 'undefined') return;
    
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SEND_NOTIFICATION', title, options });
    } else if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }

  shareContent(title: string, text: string, url: string) {
    if (typeof window === 'undefined') return;
    
    if (navigator.share) {
      navigator.share({ title, text, url }).catch(console.error);
    }
  }
}

// Instanciar automaticamente apenas no cliente
let pwaManager: PWAManager | null = null;
if (typeof window !== 'undefined') {
  pwaManager = new PWAManager();
}

export { pwaManager };