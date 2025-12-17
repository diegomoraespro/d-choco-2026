import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// --- 1. IMPORTAÇÃO DOS CONTEXTOS (A Lógica Global) ---
import { AuthProvider } from "@/context/AuthContext";
import { CarrinhoProvider } from "@/context/CarrinhoContext";

// --- 3. COMPONENTES FIXOS ---
import Header from "@/components/HeaderComponent";
import Footer from "@/components/FooterComponent";
import PWAManager from "@/components/PWAManager";


import "@/styles/main.css";
import "@/styles/desktop-nav.css";
import "@/styles/icone.css";
import "@/styles/mobile-nav.css";
import "@/styles/pwa.css";
import "@/styles/menu-cliente.css";
import "@/styles/catalogo.css";
import "@/styles/home.css";
import "@/styles/carrinho.css";
import "@/styles/globals.css";

// Fonte Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D'Choco",
  description: "Loja de chocolates artesanais",
  // Removemos themeColor daqui para evitar warnings
};

// NEXT 13 PWA / theme-color
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000", // Cor da barra de status
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        {/* Link para o Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Ícones da PWA */}
        <link rel="icon" href="/assets/images/logo-d-choco.png" />
        <link rel="apple-touch-icon" href="/assets/images/logo-d-choco.png" />
        {/* Meta para tema */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <br/>
        <br/>
        <br/>
        <AuthProvider>
          <CarrinhoProvider>
            {/* Inicializa o PWA */}
            <PWAManager />

            {/* Header */}
            <Header />

            {/* Conteúdo da página */}
            {children}

            {/* Footer */}
            <Footer />
          </CarrinhoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
