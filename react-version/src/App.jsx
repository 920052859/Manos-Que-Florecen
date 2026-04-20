import { useState } from "react";

const products = [
  {
    id: "ramo-girasoles",
    name: "Ramo de Girasoles Tejidos",
    category: "Ramos tejidos",
    price: 89,
    accent: "sunflower",
    badge: "Top ventas",
    description: "Bouquet artesanal con girasoles tejidos y presentacion premium.",
    benefits: ["Durable", "Fotogenico", "Regalo memorable"]
  },
  {
    id: "tulipanes-premium",
    name: "Tulipanes Tejidos Premium",
    category: "Ramos tejidos",
    price: 69,
    accent: "lavender",
    badge: "Crochet delicado",
    description: "Tulipanes de acabado fino para un detalle elegante y actual.",
    benefits: ["Colores a pedido", "Ideal para aniversario", "Look delicado"]
  },
  {
    id: "rosa-caja",
    name: "Rosa Eterna en Caja",
    category: "Detalles en caja",
    price: 39,
    accent: "rose",
    badge: "Detalle express",
    description: "Una rosa tejida en empaque vertical para sorprender con elegancia.",
    benefits: ["Compacto", "Listo para regalar", "Alto valor percibido"]
  },
  {
    id: "globo-rosa",
    name: "Rosa en Globo Decorativo",
    category: "Momentos especiales",
    price: 79,
    accent: "balloon",
    badge: "Efecto wow",
    description: "Presentacion original para aniversarios, fechas clave y sorpresas.",
    benefits: ["Impacto visual", "Perfecto para delivery", "Muy compartible"]
  },
  {
    id: "bouquet-personalizado",
    name: "Bouquet Floral Personalizado",
    category: "Personalizados",
    price: 129,
    accent: "sunflower",
    badge: "A medida",
    description: "Combinacion personalizada de flores tejidas, colores y accesorios.",
    benefits: ["Diseno exclusivo", "Paleta a pedido", "Ideal para regalos premium"]
  },
  {
    id: "detalle-corporativo",
    name: "Detalle Corporativo Artesanal",
    category: "Corporativo",
    price: 220,
    accent: "corporate",
    badge: "Empresas y eventos",
    description: "Solucion para marcas y equipos que buscan regalar con identidad.",
    benefits: ["Escalable", "Personalizable", "Orientado a branding"]
  }
];

const filters = [
  "Todos",
  "Ramos tejidos",
  "Detalles en caja",
  "Momentos especiales",
  "Corporativo",
  "Personalizados"
];

const finishOptions = [
  { value: "0", label: "Acabado clasico" },
  { value: "14", label: "Acabado signature (+S/ 14)" },
  { value: "26", label: "Acabado premium (+S/ 26)" }
];

const formatOptions = [
  { value: "0", label: "Bouquet estandar" },
  { value: "12", label: "Caja de regalo (+S/ 12)" },
  { value: "18", label: "Globo floral (+S/ 18)" }
];

const deliveryOptions = [
  { value: "0", label: "Recojo o coordinacion directa" },
  { value: "12", label: "Delivery local (+S/ 12)" },
  { value: "20", label: "Delivery Lima metropolitana (+S/ 20)" },
  { value: "30", label: "Envio especial (+S/ 30)" }
];

const serviceOptions = [
  { value: "0", label: "Pedido personal" },
  { value: "25", label: "Pedido corporativo (+S/ 25)" },
  { value: "55", label: "Pedido para evento (+S/ 55)" }
];

const cardOptions = [
  { value: "0", label: "Sin dedicatoria" },
  { value: "12", label: "Tarjeta impresa (+S/ 12)" }
];

const extraOptions = [
  { value: 18, label: "Empaque premium" },
  { value: 16, label: "Paleta personalizada" },
  { value: 22, label: "Flores secas de acento" },
  { value: 28, label: "Atencion express" }
];

const testimonials = [
  {
    name: "Ana Lucia",
    role: "Cliente particular",
    quote:
      "Pedi un ramo tejido para aniversario y el resultado se sintio fino, delicado y realmente especial."
  },
  {
    name: "Diego R.",
    role: "Pedido personalizado",
    quote:
      "La atencion por WhatsApp fue agil y la presentacion del regalo quedo impecable."
  },
  {
    name: "Equipo comercial",
    role: "Cliente corporativo",
    quote:
      "Nos ayudaron con detalles corporativos para una fecha especial y el acabado fue excelente."
  }
];

const socials = [
  {
    label: "Instagram",
    value: "@manosqueflorecen.pe",
    href: "https://www.instagram.com/manosqueflorecen.pe/",
    tag: "IG"
  },
  {
    label: "WhatsApp",
    value: "Contacto comercial directo",
    href: "https://wa.me/51920052859",
    tag: "WA"
  },
  {
    label: "Correo",
    value: "manosqueflorecen.pe@gmail.com",
    href: "mailto:manosqueflorecen.pe@gmail.com",
    tag: "EM"
  },
  {
    label: "Pagina web",
    value: "manosqueflorecen.pe",
    href: "https://manosqueflorecen.pe",
    tag: "WEB"
  },
  {
    label: "Catalogo digital",
    value: "Listo para conectar",
    href: "#contacto",
    tag: "CAT"
  },
  {
    label: "Redes pendientes",
    value: "Facebook, TikTok, LinkedIn, YouTube",
    href: "#contacto",
    tag: "+"
  }
];

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2
});

function getLabelByValue(options, value) {
  return options.find((option) => option.value === String(value))?.label || "";
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [quote, setQuote] = useState({
    productId: products[0].id,
    quantity: 1,
    finish: "0",
    format: "0",
    delivery: "0",
    service: "0",
    card: "0",
    extras: [],
    notes: ""
  });
  const [contact, setContact] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: ""
  });

  const filteredProducts =
    filter === "Todos" ? products : products.filter((product) => product.category === filter);
  const selectedProduct = products.find((product) => product.id === quote.productId) || products[0];

  const quantity = Math.max(1, Number.parseInt(quote.quantity, 10) || 1);
  const finishCost = Number.parseFloat(quote.finish) || 0;
  const formatCost = Number.parseFloat(quote.format) || 0;
  const deliveryCost = Number.parseFloat(quote.delivery) || 0;
  const serviceCost = Number.parseFloat(quote.service) || 0;
  const cardCost = Number.parseFloat(quote.card) || 0;
  const extrasCost = quote.extras.reduce((total, value) => total + value, 0);

  const subtotal = (selectedProduct.price + finishCost + formatCost) * quantity + serviceCost + cardCost + extrasCost;
  const tax = subtotal * 0.18;
  const total = subtotal + tax + deliveryCost;

  const extrasText = quote.extras.length
    ? quote.extras
        .map((value) => extraOptions.find((option) => option.value === value)?.label)
        .filter(Boolean)
        .join(", ")
    : "Sin extras";

  const quoteMessage = [
    "Hola Manos Que Florecen, quiero solicitar esta cotizacion referencial:",
    "",
    `Producto: ${selectedProduct.name}`,
    `Cantidad: ${quantity}`,
    `Acabado: ${getLabelByValue(finishOptions, quote.finish)}`,
    `Presentacion: ${getLabelByValue(formatOptions, quote.format)}`,
    `Tipo de pedido: ${getLabelByValue(serviceOptions, quote.service)}`,
    `Dedicatoria: ${getLabelByValue(cardOptions, quote.card)}`,
    `Delivery: ${getLabelByValue(deliveryOptions, quote.delivery)}`,
    `Extras: ${extrasText}`,
    quote.notes ? `Detalle adicional: ${quote.notes}` : "",
    `Subtotal referencial: ${currency.format(subtotal)}`,
    `IGV referencial: ${currency.format(tax)}`,
    `Delivery: ${currency.format(deliveryCost)}`,
    `Total estimado: ${currency.format(total)}`
  ]
    .filter(Boolean)
    .join("\n");

  const quoteWhatsapp = `https://wa.me/51920052859?text=${encodeURIComponent(quoteMessage)}`;
  const quoteEmail = `mailto:manosqueflorecen.pe@gmail.com?subject=${encodeURIComponent(
    `Cotizacion web - ${selectedProduct.name}`
  )}&body=${encodeURIComponent(quoteMessage)}`;

  function updateQuoteField(event) {
    const { name, value } = event.target;
    setQuote((current) => ({
      ...current,
      [name]: name === "quantity" ? Math.max(1, Number.parseInt(value || "1", 10)) : value
    }));
  }

  function toggleExtra(value) {
    setQuote((current) => ({
      ...current,
      extras: current.extras.includes(value)
        ? current.extras.filter((item) => item !== value)
        : [...current.extras, value]
    }));
  }

  function loadProductToQuote(productId) {
    setQuote((current) => ({
      ...current,
      productId
    }));
    const target = document.querySelector("#cotizador");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function submitContactEmail(event) {
    event.preventDefault();

    const body = [
      "Hola Manos Que Florecen,",
      "",
      "Quiero solicitar informacion comercial:",
      `Nombre: ${contact.name}`,
      `Empresa: ${contact.company || "No aplica"}`,
      `Telefono: ${contact.phone}`,
      `Correo: ${contact.email}`,
      `Mensaje: ${contact.message}`
    ].join("\n");

    window.location.href = `mailto:manosqueflorecen.pe@gmail.com?subject=${encodeURIComponent(
      `Nuevo contacto web - ${contact.name || "Consulta"}`
    )}&body=${encodeURIComponent(body)}`;
  }

  function submitContactWhatsapp() {
    const body = [
      "Hola Manos Que Florecen, quiero dejar mis datos:",
      `Nombre: ${contact.name || "Pendiente"}`,
      `Telefono: ${contact.phone || "Pendiente"}`,
      `Correo: ${contact.email || "Pendiente"}`,
      `Mensaje: ${contact.message || "Quiero mas informacion sobre sus productos."}`
    ].join("\n");

    window.open(`https://wa.me/51920052859?text=${encodeURIComponent(body)}`, "_blank");
  }

  return (
    <>
      <a className="floating-whatsapp" href={quoteWhatsapp} target="_blank" rel="noreferrer">
        <span className="floating-badge">WA</span>
        <span>WhatsApp</span>
      </a>

      <header className="site-header" id="inicio">
        <div className="container nav-shell">
          <a className="brand" href="#inicio">
            <span className="brand-mark">MQF</span>
            <span>
              <strong>Manos Que Florecen</strong>
              <small>Flores hechas a mano</small>
            </span>
          </a>

          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#nosotros">Nosotros</a>
            <a href="#coleccion">Coleccion</a>
            <a href="#cotizador">Cotizador</a>
            <a href="#contacto">Contacto</a>
            <a className="nav-pill" href={quoteWhatsapp} target="_blank" rel="noreferrer">
              Cotizar
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Floreria artesanal premium</p>
              <h1>Flores que no se marchitan, detalles que si emocionan.</h1>
              <p className="lead">
                Creamos ramos tejidos, rosas eternas y regalos personalizados con una
                presentacion que transmite valor desde el primer vistazo.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#cotizador">
                  Solicitar cotizacion
                </a>
                <a className="btn btn-secondary" href="#coleccion">
                  Ver productos
                </a>
                <a className="btn btn-ghost" href={quoteWhatsapp} target="_blank" rel="noreferrer">
                  Contactar ahora
                </a>
              </div>

              <div className="mini-badges">
                <span>Hecho a mano con dedicacion</span>
                <span>Atencion personalizada</span>
                <span>Delivery coordinado</span>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-art">
                <div className="hero-orb orb-rose"></div>
                <div className="hero-orb orb-gold"></div>
                <div className="hero-flower">
                  <span className="center"></span>
                  <span className="petal petal-1"></span>
                  <span className="petal petal-2"></span>
                  <span className="petal petal-3"></span>
                  <span className="petal petal-4"></span>
                </div>
              </div>
              <div className="hero-card-copy">
                <strong>Ramos y detalles con acabado premium</strong>
                <p>
                  Inspirado en tu catalogo real: girasoles tejidos, tulipanes suaves,
                  rosas eternas y bouquets personalizados.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="band">
          <div className="container band-shell">
            <span>Ramos tejidos</span>
            <span>Regalos memorables</span>
            <span>Presentacion premium</span>
            <span>WhatsApp activo</span>
          </div>
        </section>

        <section className="section" id="nosotros">
          <div className="container split-grid">
            <div>
              <p className="eyebrow">Quienes somos</p>
              <h2>Una marca artesanal que convierte un regalo en una experiencia memorable.</h2>
              <p className="body-copy">
                En Manos Que Florecen transformamos hilo, color y dedicacion en detalles
                que duran mas y se sienten mas personales. La propuesta mezcla calidez,
                diseno cuidado y una atencion cercana orientada a cerrar ventas con confianza.
              </p>
            </div>
            <div className="panel-grid">
              <article className="panel">
                <strong>Mision</strong>
                <p>Disenar arreglos hechos a mano que emocionen y eleven el valor del regalo.</p>
              </article>
              <article className="panel">
                <strong>Vision</strong>
                <p>Posicionar la marca como referente artesanal premium para regalos memorables.</p>
              </article>
              <article className="panel">
                <strong>Valores</strong>
                <p>Calidez, personalizacion, transparencia, detalle y consistencia visual.</p>
              </article>
              <article className="panel">
                <strong>Enfoque comercial</strong>
                <p>Atencion rapida, cotizacion simple y rutas claras para cerrar por WhatsApp.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="coleccion">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Productos</p>
                <h2>Coleccion pensada para vender mejor y destacar la identidad de la marca.</h2>
              </div>
              <p className="body-copy compact">
                Tarjetas con beneficios, precio referencial y CTA directa para convertir interes en cotizacion.
              </p>
            </div>

            <div className="chip-row">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip ${filter === item ? "active" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="card-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-visual ${product.accent}`}>
                    <span>{product.badge}</span>
                  </div>
                  <div className="product-content">
                    <small>{product.category}</small>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <ul>
                      {product.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                    <div className="product-footer">
                      <div>
                        <strong>{currency.format(product.price)}</strong>
                        <span>Precio referencial</span>
                      </div>
                      <button className="btn btn-secondary" type="button" onClick={() => loadProductToQuote(product.id)}>
                        Cotizar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="cotizador">
          <div className="container split-grid">
            <div>
              <p className="eyebrow">Cotizador</p>
              <h2>Calcula un estimado en segundos y convierte la intencion en conversacion.</h2>
              <p className="body-copy">
                El visitante configura su pedido, ve el total estimado y envia el resumen por WhatsApp o correo.
              </p>

              <form className="form-card" onSubmit={(event) => event.preventDefault()}>
                <label>
                  Producto
                  <select name="productId" value={quote.productId} onChange={updateQuoteField}>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {currency.format(product.price)}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="two-col">
                  <label>
                    Cantidad
                    <input min="1" name="quantity" type="number" value={quote.quantity} onChange={updateQuoteField} />
                  </label>
                  <label>
                    Acabado
                    <select name="finish" value={quote.finish} onChange={updateQuoteField}>
                      {finishOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="two-col">
                  <label>
                    Presentacion
                    <select name="format" value={quote.format} onChange={updateQuoteField}>
                      {formatOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Delivery
                    <select name="delivery" value={quote.delivery} onChange={updateQuoteField}>
                      {deliveryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="two-col">
                  <label>
                    Tipo de pedido
                    <select name="service" value={quote.service} onChange={updateQuoteField}>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Dedicatoria
                    <select name="card" value={quote.card} onChange={updateQuoteField}>
                      {cardOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <fieldset className="extras">
                  <legend>Opcionales</legend>
                  {extraOptions.map((option) => (
                    <label key={option.label}>
                      <input
                        checked={quote.extras.includes(option.value)}
                        type="checkbox"
                        onChange={() => toggleExtra(option.value)}
                      />
                      {option.label} (+S/ {option.value})
                    </label>
                  ))}
                </fieldset>

                <label>
                  Detalle adicional
                  <textarea
                    name="notes"
                    rows="4"
                    placeholder="Indica colores, ocasion, fecha o mensaje."
                    value={quote.notes}
                    onChange={updateQuoteField}
                  ></textarea>
                </label>
              </form>
            </div>

            <aside className="summary-card">
              <p className="eyebrow">Resumen</p>
              <h3>Tu cotizacion referencial</h3>
              <div className="summary-total">{currency.format(total)}</div>
              <dl>
                <div>
                  <dt>Producto</dt>
                  <dd>{selectedProduct.name}</dd>
                </div>
                <div>
                  <dt>Configuracion</dt>
                  <dd>
                    {quantity} und | {getLabelByValue(finishOptions, quote.finish)}
                  </dd>
                </div>
                <div>
                  <dt>Extras</dt>
                  <dd>{extrasText}</dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{currency.format(subtotal)}</dd>
                </div>
                <div>
                  <dt>IGV</dt>
                  <dd>{currency.format(tax)}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>{currency.format(deliveryCost)}</dd>
                </div>
              </dl>
              <div className="summary-actions">
                <a className="btn btn-primary" href={quoteWhatsapp} target="_blank" rel="noreferrer">
                  Enviar por WhatsApp
                </a>
                <a className="btn btn-secondary" href={quoteEmail}>
                  Enviar por correo
                </a>
                <a className="btn btn-ghost" href="#contacto">
                  Solicitar asesoria
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="stats-grid">
              <article className="panel">
                <strong>150+</strong>
                <span>Pedidos especiales atendidos</span>
              </article>
              <article className="panel">
                <strong>35+</strong>
                <span>Regalos corporativos y fechas clave</span>
              </article>
              <article className="panel">
                <strong>98%</strong>
                <span>Satisfaccion referencial</span>
              </article>
              <article className="panel">
                <strong>Lima +</strong>
                <span>Cobertura coordinada y envios segun necesidad</span>
              </article>
            </div>

            <div className="quote-grid">
              {testimonials.map((item) => (
                <article className="panel testimonial" key={item.name}>
                  <p>"{item.quote}"</p>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Canales y enlaces</p>
                <h2>Centraliza tus puntos de contacto y deja listos los enlaces que faltan.</h2>
              </div>
            </div>

            <div className="card-grid social-grid">
              {socials.map((item) => (
                <a className="social-card" key={item.label} href={item.href}>
                  <span className="social-tag">{item.tag}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <small>{item.value}</small>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contacto">
          <div className="container split-grid">
            <div>
              <p className="eyebrow">Contacto</p>
              <h2>Pide informacion, deja tus datos o cierra la conversacion por WhatsApp.</h2>
              <div className="panel-grid">
                <article className="panel">
                  <strong>Telefono / WhatsApp</strong>
                  <p>+51 920 052 859</p>
                </article>
                <article className="panel">
                  <strong>Correo</strong>
                  <p>manosqueflorecen.pe@gmail.com</p>
                </article>
                <article className="panel">
                  <strong>Horario sugerido</strong>
                  <p>Lunes a sabado, 9:00 a.m. - 7:00 p.m.</p>
                </article>
                <article className="panel">
                  <strong>Cobertura</strong>
                  <p>Atencion online y entregas coordinadas en Peru.</p>
                </article>
              </div>
            </div>

            <form className="form-card" onSubmit={submitContactEmail}>
              <label>
                Nombre
                <input
                  name="name"
                  placeholder="Tu nombre"
                  required
                  value={contact.name}
                  onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))}
                />
              </label>
              <label>
                Empresa
                <input
                  name="company"
                  placeholder="Opcional"
                  value={contact.company}
                  onChange={(event) => setContact((current) => ({ ...current, company: event.target.value }))}
                />
              </label>
              <div className="two-col">
                <label>
                  Telefono
                  <input
                    name="phone"
                    placeholder="+51 ..."
                    required
                    value={contact.phone}
                    onChange={(event) => setContact((current) => ({ ...current, phone: event.target.value }))}
                  />
                </label>
                <label>
                  Correo
                  <input
                    name="email"
                    placeholder="tu@correo.com"
                    required
                    value={contact.email}
                    onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))}
                  />
                </label>
              </div>
              <label>
                Mensaje
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Cuentanos que detalle necesitas y para que fecha."
                  required
                  value={contact.message}
                  onChange={(event) => setContact((current) => ({ ...current, message: event.target.value }))}
                ></textarea>
              </label>
              <div className="hero-actions">
                <button className="btn btn-primary" type="submit">
                  Enviar informacion por correo
                </button>
                <button className="btn btn-secondary" type="button" onClick={submitContactWhatsapp}>
                  Enviar numero por WhatsApp
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-shell">
          <div>
            <a className="brand" href="#inicio">
              <span className="brand-mark">MQF</span>
              <span>
                <strong>Manos Que Florecen</strong>
                <small>Detalles artesanales que duran mas</small>
              </span>
            </a>
            <p className="body-copy compact">
              Version React lista para evolucionar a integraciones reales, CRM o catalogo dinamico.
            </p>
          </div>
          <div className="footer-links">
            <a href="#nosotros">Nosotros</a>
            <a href="#coleccion">Coleccion</a>
            <a href="#cotizador">Cotizador</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
