"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [contato, setContato] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContatoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContato((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mensagem enviada:", contato);
    alert("Mensagem enviada com sucesso!");
    setContato({ name: "", email: "", message: "" });
  };

  return (
    <div className="homepage is-preload">
      <div id="page-wrapper">
        <section id="header">
          <Link className="carrinho-flutuante" href="/carrinho" title="Ir para o carrinho">
            <i className="fa-solid fa-shopping-cart"></i>
            <span className="carrinho-badge">0</span>
          </Link>

          <div className="container">
            <h1 id="logo">
              <Link href="/" className="logo-d-choco">
                <img src="/images/logo-d-choco.png" alt="Logo D'Choco" />
              </Link>
            </h1>
            <p>
              <strong>quem prova, nunca esquece.</strong>
            </p>
          </div>
        </section>

        <section id="main">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content-centered">
                  <article className="box post">
                    <header id="header-sonho">
                      <h2>
                        ideias vindas de um <strong>sonho </strong>
                        <br />
                        saiba um pouco como a d&apos;choco nasceu
                      </h2>
                    </header>
                    <span className="image-sonho featured">
                      <img src="/images/sonho-cacau.jpg" alt="Sonho Cacau" />
                    </span>
                    <br/>
                    <br/>
                    <h3>Left is the opposite of right</h3>
                    
                    <p>
                      Phasellus laoreet massa id justo mattis pharetra. Fusce
                      suscipit ligula vel quam viverra sit amet mollis tortor
                      congue. Sed quis mauris sit amet magna accumsan tristique.
                      Curabitur leo nibh, rutrum eu malesuada in, tristique at erat
                      lorem ipsum dolor sit amet lorem ipsum sed consequat magna
                      tempus veroeros lorem sed tempus aliquam lorem ipsum veroeros
                      consequat magna tempus lorem ipsum consequat Phasellus laoreet
                      massa id justo mattis pharetra. Fusce suscipit ligula vel quam
                      viverra sit amet mollis tortor congue. Sed quis mauris sit
                      amet magna accumsan tristique. Curabitur leo nibh, rutrum eu
                      malesuada in tristique
                    </p>

                    <p>
                      Erat lorem ipsum veroeros consequat magna tempus lorem ipsum
                      consequat Phasellus laoreet massa id justo mattis pharetra.
                      Fusce suscipit ligula vel quam viverra sit amet mollis tortor
                      congue. Sed quis mauris sit amet magna accumsan tristique.
                      Curabitur leo nibh, rutrum eu malesuada in, tristique at erat.
                      Curabitur leo nibh, rutrum eu malesuada in, tristique at erat
                      lorem ipsum dolor sit amet lorem ipsum sed consequat magna
                      tempus veroeros lorem sed tempus aliquam lorem ipsum veroeros
                      consequat magna tempus
                    </p>
                  </article>
                </div>
              </div>
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

        <section id="main">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content-centered">
                  <article className="box post">
                    <header className="box post">
                      <h2>
                        <Link href="#">
                          da pra comer bem e ainda ser <strong>fitness</strong> ?
                          <br />
                          sim, confira só nosso mouse de chocolate.
                        </Link>
                      </h2>
                    </header>
                    <Link href="#" className="image-pave featured">
                      <img src="/images/pave-chocolate.jpeg" alt="Pavê de Chocolate" />
                    </Link>
                    <br/>
                    <br/>
                    <h3>I mean isn&apos;t it possible?</h3>
                    <p>
                      Phasellus laoreet massa id justo mattis pharetra. Fusce
                      suscipit ligula vel quam viverra sit amet mollis tortor
                      congue. Sed quis mauris sit amet magna accumsan tristique.
                      Curabitur leo nibh, rutrum eu malesuada in, tristique at erat
                      lorem ipsum dolor sit amet lorem ipsum sed consequat magna
                      tempus veroeros lorem sed tempus aliquam lorem ipsum veroeros
                      consequat magna tempus lorem ipsum consequat Phasellus laoreet
                      massa id justo mattis pharetra. Fusce suscipit ligula vel quam
                      viverra sit amet mollis tortor congue. Sed quis mauris sit
                      amet magna accumsan tristique. Curabitur leo nibh, rutrum eu
                      malesuada in tristique.
                    </p>
                    <ul>
                      <li>
                        <Link href="#" className="button col-12 fit">
                          Continue lendo
                        </Link>
                      </li>
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="main">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content-centered">
                  <section>
                    <article className="box highlight">
                      <header>
                        <h2>
                          <strong>
                            <Link href="#">
                              d&apos;choco a favor da saúde, confira esse insight
                            </Link>
                          </strong>
                        </h2>
                      </header>
                      <Link href="#" className="image-talyta left">
                        <img src="/images/menina-podcast.jpeg" alt="Podcast" />
                      </Link>

                      <p>
                        Este é um bloco de texto que irá se envolver ao redor da
                        imagem. O uso da propriedade &apos;float&apos; é a maneira
                        clássica de conseguir este efeito de layout. Ao aplicar
                        &apos;float: left;&apos; na imagem, ela se move para a
                        esquerda e o texto (que é um elemento em bloco, o parágrafo
                        neste caso) flui ao seu lado, preenchendo o espaço restante.
                        Você pode ajustar a margem da imagem para criar um pequeno
                        espaçamento entre a imagem e o texto. Vamos adicionar mais
                        texto para garantir que o efeito seja visível. É importante
                        notar que o texto só envolverá a imagem se houver espaço
                        suficiente. Se o texto for curto, ele apenas aparecerá ao
                        lado da imagem. O CSS nos dá controle total sobre como esse
                        wrapping acontece. Adicionar mais algumas linhas de texto
                        garante que a imagem fique completamente envolvida.
                      </p>
                    </article>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}