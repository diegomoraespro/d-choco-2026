import Link from "next/link";

export default function Footer() {
  return (
    <section id="footer">
      <div className="container">
        <header>
          <h2>
            Sugestões para melhoria? <strong>mande aqui:</strong>
          </h2>
        </header>
        
        <div className="row">
          
          {/* Coluna do Formulário */}
          <div className="col-6 col-12-medium">
            <section>
              <form method="post" action="#">
                <div className="row gtr-50">
                  <div className="col-6 col-12-small">
                    <input name="name" placeholder="Nome" type="text" />
                  </div>
                  <div className="col-6 col-12-small">
                    <input name="email" placeholder="Email" type="text" />
                  </div>
                  <div className="col-12">
                    <textarea name="message" placeholder="Mensagem"></textarea>
                  </div>
                  <div className="col-12">
                    <a href="#" className="form-button-submit button icon solid fa-envelope">
                      enviar mensagem
                    </a>
                  </div>
                </div>
              </form>
            </section>
          </div>

          {/* Coluna de Contato */}
          <div className="col-6 col-12-medium">
            <section className="contact-info">
              <p>
                Erat lorem ipsum veroeros consequat magna tempus lorem ipsum
                consequat Phaselamet mollis tortor congue. Sed quis mauris sit
                amet magna accumsan tristique. Curabitur leo nibh, rutrum eu
                malesuada.
              </p>

              <div className="row">
                <div className="col-6 col-12-small">
                  <h3>Detalhes</h3>
                  <ul className="details-list">
                    <li>
                      <i className="fa-solid fa-home"></i> 1234 Somewhere Road
                      <br />
                      Nashville, TN 00000 USA
                    </li>
                    <li>
                      <i className="fa-solid fa-phone"></i> (000) 000-0000
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope"></i>{" "}
                      <a href="mailto:info@untitled.tld">info@untitled.tld</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-12-small">
                  <h3>Siga-nos</h3>
                  <ul className="details-list">
                    <li>
                      <i className="fa-brands fa-twitter"></i>{" "}
                      <a href="#">@untitled</a>
                    </li>
                    <li>
                      <i className="fa-brands fa-instagram"></i>{" "}
                      <a href="#">instagram.com/untitled</a>
                    </li>
                    <li>
                      <i className="fa-brands fa-dribbble"></i>{" "}
                      <a href="#">dribbble.com/untitled</a>
                    </li>
                    <li>
                      <i className="fa-brands fa-facebook-f"></i>{" "}
                      <a href="#">facebook.com/untitled</a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div id="copyright" className="container">
        <ul className="links">
          <li>&copy; 2025 D'Choco. Todos os Direitos Reservados.</li>
          <li>
            Design Original do Template:{" "}
            <a href="http://html5up.net" target="_blank">
              HTML5 UP
            </a>{" "}
            (Licença CC BY 3.0)
          </li>
        </ul>
      </div>
      <br/>
      <br/>
    </section>
    
  );
}