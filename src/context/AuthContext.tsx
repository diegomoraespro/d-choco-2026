// lib/authContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut, 
  User, 
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

// ========================================
// CONFIGURAÇÃO DO EMAIL LINK
// ========================================
const actionCodeSettings = {
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/verify-email',
  handleCodeInApp: true,
};

// ========================================
// TIPO DO CONTEXTO
// ========================================
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<UserCredential>;
  loginComEmailLink: (email: string) => Promise<{ success: boolean; message: string }>;
  loginComGoogle: () => Promise<void>;
  finalizarLoginComLink: (url: string, emailFromPrompt?: string) => Promise<{
    success: boolean;
    message: string;
    needsEmail: boolean;
  }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ========================================
  // 1. MONITORAR O ESTADO DO USUÁRIO
  // ========================================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        console.log("✓ Usuário autenticado:", currentUser.email);
      } else {
        console.log("ℹ️ Usuário desconectado");
      }
    });

    return () => unsubscribe();
  }, []);

  // ========================================
  // 2. LOGIN COM EMAIL E SENHA (método original)
  // ========================================
  const login = async (email: string, pass: string) => {
    return await signInWithEmailAndPassword(auth, email, pass);
  };

  // ========================================
  // 3. LOGIN COM GOOGLE
  // ========================================
  const loginComGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    await signInWithPopup(auth, provider);
  };

  // ========================================
  // 4. LOGIN COM EMAIL LINK
  // ========================================
  const loginComEmailLink = async (email: string) => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Salva o email no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('emailForSignIn', email);
      }
      
      console.log('✅ Link enviado para:', email);
      return { 
        success: true, 
        message: 'Link enviado! Verifique seu email.' 
      };
      
    } catch (error: any) {
      console.error('❌ Erro ao enviar link:', error);
      
      let errorMessage = 'Erro ao enviar link. Tente novamente.';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Email inválido.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Este usuário foi desabilitado.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Aguarde alguns minutos.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Login por email não está habilitado. Verifique as configurações do Firebase.';
          break;
        case 'auth/unauthorized-domain':
          errorMessage = 'Domínio não autorizado. Configure no Firebase Console.';
          break;
        default:
          errorMessage = error.message;
      }
      
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // ========================================
  // 5. FINALIZAR LOGIN COM LINK
  // ========================================
  const finalizarLoginComLink = async (url: string, emailFromPrompt?: string) => {
    try {
      // Verifica se é um link válido
      if (!isSignInWithEmailLink(auth, url)) {
        console.error('❌ Link inválido');
        return { 
          success: false, 
          message: 'Link inválido ou expirado.',
          needsEmail: false
        };
      }

      // Tenta recuperar o email do localStorage
      let email = '';
      
      if (typeof window !== 'undefined') {
        email = window.localStorage.getItem('emailForSignIn') || '';
      }
      
      // Se não tiver, usa o fornecido
      if (!email && emailFromPrompt) {
        email = emailFromPrompt;
      }
      
      // Se ainda não tiver, precisa pedir
      if (!email) {
        console.warn('⚠️ Email não encontrado');
        return { 
          success: false, 
          message: 'Por favor, informe seu email.',
          needsEmail: true
        };
      }

      console.log('🔄 Finalizando login para:', email);

      // Faz o login
      await signInWithEmailLink(auth, email, url);
      
      // Limpa o localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('emailForSignIn');
      }
      
      console.log('✅ Login realizado!');
      
      return { 
        success: true, 
        message: 'Login realizado com sucesso!',
        needsEmail: false
      };
      
    } catch (error: any) {
      console.error('❌ Erro ao finalizar login:', error);
      
      let errorMessage = 'Erro ao fazer login.';
      
      switch (error.code) {
        case 'auth/invalid-action-code':
          errorMessage = 'Link inválido ou já utilizado. Solicite um novo.';
          break;
        case 'auth/expired-action-code':
          errorMessage = 'Link expirado (válido por 1 hora). Solicite um novo.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Usuário desabilitado.';
          break;
        default:
          errorMessage = error.message;
      }
      
      return { 
        success: false, 
        message: errorMessage,
        needsEmail: false
      };
    }
  };

  // ========================================
  // 6. LOGOUT
  // ========================================
  const logout = async () => {
    await signOut(auth);
    
    // Limpa qualquer email salvo
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('emailForSignIn');
    }
    
    router.push("/login");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        loginComEmailLink,
        loginComGoogle,
        finalizarLoginComLink, 
        logout 
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
export const useAuth = () => useContext(AuthContext);