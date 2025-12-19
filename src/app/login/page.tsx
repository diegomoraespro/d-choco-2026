"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginComGoogle } = useAuth();

  const [credenciais, setCredenciais] = useState({
    email: "",
    password: "",
  });

  const [contato, setContato] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredenciais((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro("");
  };

  const handleContatoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContato((prev) => ({ ...prev, [name]: value }));
  };

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ========================================
  // LOGIN COM SENHA
  // ========================================
  const handleLoginComSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!credenciais.email || !credenciais.password) {
      setErro("Preencha todos os campos!");
      return;
    }

    if (!validarEmail(credenciais.email)) {
      setErro("Email inválido!");
      return;
    }

    if (credenciais.password.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setLoading(true);

    try {
      await login(credenciais.email, credenciais.password);
      console.log("Login realizado com sucesso!");
      router.push("/");
    } catch (error: any) {
      console.error("Erro no login:", error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErro("E-mail ou senha incorretos.");
      } else if (error.code === "auth/too-many-requests") {
        setErro("Muitas tentativas falhas. Tente novamente mais tarde.");
      } else {
        setErro("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGIN COM GOOGLE
  // ========================================
  
  const handleLoginComGoogle = async () => {
    setErro("");
    setLoading(true);

    try {
      await loginComGoogle();
      console.log("Login com Google realizado com sucesso!");
      router.push("/");
    } catch (error: any) {
      console.error("Erro no login com Google:", error);
      console.log("Código do erro:", error.code);
      
      if (
        error.code === "auth/popup-closed-by-user" || 
        error.code === "auth/cancelled-popup-request" ||
        error.code === "auth/user-cancelled" ||
        error.message?.toLowerCase().includes("popup") && error.message?.toLowerCase().includes("closed")
      ) {
        setErro("Login cancelado.");
      } else if (error.code === "auth/popup-blocked") {
        setErro("Pop-up bloqueado. Permita pop-ups.");
      } else if (error.code === "auth/network-request-failed") {
        setErro("Erro de conexão. Verifique sua internet.");
      } else if (error.code === "auth/too-many-requests") {
        setErro("Muitas tentativas. Aguarde e tente novamente.");
      } else {
        setErro("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mensagem enviada:", contato);
    alert("Mensagem enviada com sucesso!");
    setContato({ name: "", email: "", message: "" });
  };

  return (
    <div className="right-sidebar is-preload">
      <div id="page-wrapper">
        <section id="header" className="wrapper style1 login-wrapper">
          <Link className="carrinho-flutuante" href="/carrinho" title="Ir para o carrinho">
            <i className="fa-solid fa-shopping-cart"></i>
            <span className="carrinho-badge">0</span>
          </Link>

          <div className="container-login-desktop container-login login-wrapper-centered">
            
              <div className="login-container login-container-desktop">
                <h1>
                  <Link href="/" className="logo-d-choco-login logo-d-choco">
                    <img src="/images/logo-d-choco.png" alt="Logo D'Choco" />
                  </Link>
                </h1>

                <p>
                  <strong>quem prova, nunca esquece.</strong>
                </p>

                <form id="form-login" onSubmit={handleLoginComSenha}>
                  <div className="col-6 col-12-small display-flex">
                    <p>Login</p>
                    <input
                      id="email"
                      type="email"
                      placeholder="Seu email"
                      name="email"
                      value={credenciais.email}
                      onChange={handleLoginChange}
                      disabled={loading}
                      required
                    />

                    <p>senha</p>
                    <input
                      id="senha"
                      type="password"
                      placeholder="Sua senha"
                      name="password"
                      value={credenciais.password}
                      onChange={handleLoginChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  {/* MUDANÇA AQUI: className="error-message" para "mensagem-erro" */}
                  {erro && <div className="mensagem-erro">{erro}</div>}

                  <br />

                  <div className="gtr-50">
                    <div className="col-12 display-flex">
                      <button
                        type="submit"
                        className="form-button-submit button button-1"
                        disabled={loading}
                      >
                        {loading ? "Entrando..." : "Login"}
                      </button>
                      
                      {/* BOTÃO DE LOGIN COM GOOGLE */}
                      <button
                        type="button"
                        onClick={handleLoginComGoogle}
                        disabled={loading}
                        className="google-login-button"
                      >
                        <svg width="50" height="24" viewBox="0 0 18 18">
                          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                          <path fill="#34A853" d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z"/>
                          <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                          <path fill="#EA4335" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z"/>
                        </svg>
                      </button>
                    
                      <p>
                        Não tem uma conta?{" "}
                        <a href="/cadastro" className="link-texto" >
                          Cadastrar-se
                        </a>
                      </p>
                      <a href="/esqueci-senha" className="link-texto">
                        Esqueci minha senha
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            
          </div>
        </section>
 
        <section id="banner">
          <div className="container">
            <p>
              feito de forma artesanal <strong>em cada detalhe</strong>.
              <br />
              pensando em você.
            </p>
          </div>
        </section>

        
      </div>
    </div>
  );
}