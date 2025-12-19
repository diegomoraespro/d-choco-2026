"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Contextos
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuAdminAberto, setMenuAdminAberto] = useState(false);

  // Hooks seguros
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  // Verifica se o usuário é admin (ajuste o critério conforme sua lógica)
  const isAdmin = user?.email === "admin@dchoco.com";

 

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
    setMenuAdminAberto(false); // Fecha o menu admin ao abrir o menu normal
  };

  const toggleMenuAdmin = () => {
    setMenuAdminAberto(!menuAdminAberto);
    setMenuAberto(false); // Fecha o menu normal ao abrir o menu admin
  };

  const handleLogout = async () => {
    if (logout) await logout();
    setMenuAberto(false);
    setMenuAdminAberto(false);
  };

  // Fecha menus ao mudar de página
  useEffect(() => {
    setMenuAberto(false);
    setMenuAdminAberto(false);
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
          
          {/* MENU ADMIN - DESKTOP */}
          {user && isAdmin && (
            <li className="menu-admin-geral">
              <button onClick={toggleMenuAdmin} className="menu-toggle-btn admin-btn" style={{ color: 'white', padding: '10px', border: 'none', borderRadius: '5px'}}>
                <i className="fa-solid fa-shield-halved"></i>
                <span>Admin</span>
              </button>
              
              {menuAdminAberto && (
                <div className="menu-popup-desktop menu-admin-popup">
                  <div className="menu-popup-header admin-header">
                    <p><strong>Painel Admin</strong></p>
                  </div>
                  <div className="menu-popup-links">
                    <div className="menu-popup-logo">
                      <section className="section-menu">
                        <img src="/images/app.png" alt="" />
                      </section>
                    </div>
                    <Link href="/" onClick={() => setMenuAdminAberto(false)}>
                      <i className="fa-solid fa-home"></i> Tela Home
                    </Link>
                    <Link href="/catalogo" onClick={() => setMenuAdminAberto(false)}>
                      <i className="fa-solid fa-store"></i> Tela Catálogo
                    </Link>
                    <Link href="/contrate" onClick={() => setMenuAdminAberto(false)}>
                      <i className="fa-solid fa-handshake"></i> Tela Contrate
                    </Link>
                    <Link href="#" onClick={() => setMenuAdminAberto(false)}>
                      <i className="fa-solid fa-store"></i> Adicionar Produtos
                    </Link>
                    <Link href="/catalogo" onClick={() => setMenuAdminAberto(false)}>
                      <i className="fa-solid fa-arrow-left"></i> Voltar ao Catálogo
                    </Link>
                    <button onClick={handleLogout} className="btn-logout">
                      <i className="fa-solid fa-right-from-bracket"></i> Sair
                    </button>
                  </div>
                </div>
              )}
            </li>
          )}

          {!user && (
            <li className="btn-login-geral">
              <Link href="/login"><i className="fa-solid fa-user"></i><span>Entrar</span></Link>
            </li>
          )}
          {user && !isAdmin && (
            <li className="menu-usuario-geral">
              <button onClick={toggleMenu} className="menu-toggle-btn">
                <i className="fa-solid fa-bars"></i>
                <span>Menu</span>
              </button>
              
              {/* POPUP DESKTOP */}
              {menuAberto && (
                <div className="menu-popup-desktop">
                  <div className="menu-popup-header">
                    <p><strong>{user.email}</strong></p>
                  </div>
                  <div className="menu-popup-links">
                    <div className="menu-popup-logo">
                      <section className="section-menu">
                        <img src="/images/app.png" alt="" />
                      </section>
                    </div>
                    <Link href="/perfil" onClick={() => setMenuAberto(false)}>Meus Dados</Link>
                    <Link href="/pedidos" onClick={() => setMenuAberto(false)}>Meus Pedidos</Link>
                    <Link href="/enderecos" onClick={() => setMenuAberto(false)}>Endereços</Link>
                    <Link href="/telefones" onClick={() => setMenuAberto(false)}>Telefones</Link>
                    <Link href="/catalogo" onClick={() => setMenuAberto(false)}>Voltar ao Catálogo</Link>
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
        
        {/* MENU ADMIN - MOBILE */}
        {user && isAdmin && (
          <a onClick={toggleMenuAdmin} className="menu-admin-geral" style={{cursor: 'pointer', color: 'white', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <i className="fa-solid fa-shield-halved"></i>
            <span>Admin</span>
          </a>
        )}

        {!user ? (
          <Link href="/login" className="btn-login-geral">
            <i className="fa-solid fa-user"></i><span>Entrar</span>
          </Link>
        ) : !isAdmin ? (
          <a onClick={toggleMenu} className="menu-usuario-geral" style={{cursor: 'pointer'}}>
            <i className={`fa-solid ${menuAberto ? 'fa-times' : 'fa-bars'}`}></i>
            <span>Menu</span>
          </a>
        ) : null}
      </nav>
 
      {/* ================= POPUP MOBILE - USUÁRIO ================= */}
      {user && menuAberto && (
        <>
          <div className="menu-overlay" onClick={() => setMenuAberto(false)}></div>
          <div className="menu-popup-mobile">
            <div className="menu-popup-header">
              <p><strong>{user.email}</strong></p>
            </div>
            <div className="menu-popup-links">
              <div className="menu-popup-logo">
                <section className="section-menu">
                  <img src="/images/app.png" alt="" />
                </section>
              </div>
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

      {/* ================= POPUP MOBILE - ADMIN ================= */}
      {user && isAdmin && menuAdminAberto && (
        <>
          <div className="menu-overlay" onClick={() => setMenuAdminAberto(false)}></div>
          <div className="menu-popup-mobile menu-admin-popup">
            <div className="menu-popup-header admin-header">
              <p><strong>Painel Admin</strong></p>
            </div>
            <div className="menu-popup-links">
              <div className="menu-popup-logo">
                <section className="section-menu">
                  <img src="/images/app.png" alt="" />
                </section>
              </div>
              <Link href="/" onClick={() => setMenuAdminAberto(false)}>
                <i className="fa-solid fa-home"></i> Tela Home
              </Link>
              <Link href="/catalogo" onClick={() => setMenuAdminAberto(false)}>
                <i className="fa-solid fa-store"></i> Tela Catálogo
              </Link>
              <Link href="/contrate" onClick={() => setMenuAdminAberto(false)}>
                <i className="fa-solid fa-handshake"></i> Tela Contrate
              </Link>
              <Link href="#" onClick={() => setMenuAdminAberto(false)}>
                      <i className="fa-solid fa-store"></i> Adicionar Produtos
                    </Link>
              <Link href="/catalogo" onClick={() => setMenuAdminAberto(false)}>
                <i className="fa-solid fa-arrow-left"></i> Voltar ao Catálogo
              </Link>
              <button onClick={handleLogout} className="btn-logout">
                <i className="fa-solid fa-right-from-bracket"></i> Sair
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}