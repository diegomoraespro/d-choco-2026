"use client";
import { useEffect } from "react";
import { pwaManager } from "@/lib/pwa";

export default function PWAManager() {
  useEffect(() => {
    console.log("PWA Manager iniciado");
    // Aqui você pode inicializar algo do pwaManager se necessário
  }, []);

  return null; // Não renderiza nada visualmente
}
