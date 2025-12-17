"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Contextos
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  // Hooks seguros
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = async () => {
    if (logout) await logout();
    setMenuAberto(false);
  };

  // Fecha menu ao mudar de página
  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <nav className="desktop-top-nav">
        <ul>
          <li className={pathname === "/" ? "active" : ""}>
            <Link href="/"><i className="fa-solid fa-home"></i><span>Início</span></Link>
          </li>
          <li className={pathname === "/catalogo" ? "active" : ""}>
            <Link href="/catalogo"><i className="fa-solid fa-store"></i><span>Catálogo</span></Link>
          </li>
          <li className={pathname === "/contrate" ? "active" : ""}>
            <Link href="/contrate"><i className="fa-solid fa-handshake"></i><span>Contrate</span></Link>
          </li>
          {!user && (
            <li className="btn-login-geral">
              <Link href="/login"><i className="fa-solid fa-user"></i><span>Entrar</span></Link>
            </li>
          )}
          {user && (
            <li className="menu-usuario-geral">
              <button onClick={toggleMenu} className="menu-toggle-btn">
                <i className="fa-solid fa-bars"></i>
                <span>{user.displayName ? user.displayName.split(' ')[0] : 'Menu'}</span>
              </button>
              
              {/* POPUP DESKTOP */}
              {menuAberto && (
                <div className="menu-popup-desktop">
                  <div className="menu-popup-header">
                    <p><strong>{user.email}</strong></p>
                  </div>
                  <div className="menu-popup-links">
                    <Link href="/perfil" onClick={() => setMenuAberto(false)}>Meus Dados</Link>
                    <Link href="/pedidos" onClick={() => setMenuAberto(false)}>Meus Pedidos</Link>
                    <button onClick={handleLogout} className="btn-logout">Sair</button>
                  </div>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>

      {/* ================= MOBILE NAV ================= */}
      <nav className="mobile-bottom-nav">
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          <i className="fa-solid fa-home"></i><span>Início</span>
        </Link>
        <Link href="/catalogo" className={pathname === "/catalogo" ? "active" : ""}>
          <i className="fa-solid fa-store"></i><span>Catálogo</span>
        </Link>
        <Link href="/contrate" className={pathname === "/contrate" ? "active" : ""}>
          <i className="fa-solid fa-handshake"></i>
          <span>Contrate</span>
        </Link>
        {!user ? (
          <Link href="/login" className="btn-login-geral">
            <i className="fa-solid fa-user"></i><span>Entrar</span>
          </Link>
        ) : (
          <a onClick={toggleMenu} className="menu-usuario-geral" style={{cursor: 'pointer'}}>
            <i className={`fa-solid ${menuAberto ? 'fa-times' : 'fa-bars'}`}></i>
            <span>Menu</span>
          </a>
        )}
      </nav>

      {/* ================= POPUP MOBILE ================= */}
      {user && menuAberto && (
        <>
          <div className="menu-overlay" onClick={() => setMenuAberto(false)}></div>
          <div className="menu-popup-mobile">
            <div className="menu-popup-header">
              <p><strong>{user.email}</strong></p>
            </div>
            <div className="menu-popup-links">
              <Link href="/perfil" onClick={() => setMenuAberto(false)}>Meus Dados</Link>
              <Link href="/pedidos" onClick={() => setMenuAberto(false)}>Meus Pedidos</Link>
              <Link href="/enderecos" onClick={() => setMenuAberto(false)}>Endereços</Link>
              <Link href="/telefones" onClick={() => setMenuAberto(false)}>Telefones</Link>
              <Link href="/catalogo" onClick={() => setMenuAberto(false)}>Voltar ao Catálogo</Link>
              <button onClick={handleLogout} className="btn-logout">Sair</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}