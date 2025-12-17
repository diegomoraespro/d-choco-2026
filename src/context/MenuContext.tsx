"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

// Tipagem do usuário
interface Usuario {
  email: string | null;
  uid: string;
  fotoPerfil: string | null;
}

// Tipagem do contexto
interface MenuContextProps {
  usuario: Usuario | null;
  logado: boolean;
  fazerLogout: () => void;
}

// Criação do contexto
const MenuContext = createContext<MenuContextProps | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [logado, setLogado] = useState<boolean>(false);

  // Monitora login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const dadosUsuario: Usuario = {
          email: user.email,
          uid: user.uid,
          fotoPerfil: user.photoURL || null,
        };
        setUsuario(dadosUsuario);
        setLogado(true);

        // Salva no localStorage
        localStorage.setItem("usuarioLogado", "1");
        localStorage.setItem("usuarioDChoco", JSON.stringify(dadosUsuario));
      } else {
        setUsuario(null);
        setLogado(false);
        localStorage.removeItem("usuarioLogado");
        localStorage.removeItem("usuarioDChoco");
      }
    });

    return () => unsubscribe();
  }, []);

  const fazerLogout = () => {
    if (!confirm("Deseja realmente sair?")) return;

    signOut(auth)
      .catch(err => console.warn("Firebase logout:", err))
      .finally(() => {
        setUsuario(null);
        setLogado(false);
        localStorage.clear();
        window.location.href = "/"; // Redireciona para a página inicial
      });
  };

  return (
    <MenuContext.Provider value={{ usuario, logado, fazerLogout }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook para acessar o contexto
export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu deve ser usado dentro de um MenuProvider");
  }
  return context;
};
