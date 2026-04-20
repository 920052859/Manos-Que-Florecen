const products = [
  {
    id: "ramo-girasoles",
    name: "Ramo de Girasoles Tejidos",
    category: "Ramos tejidos",
    price: 89,
    priceLabel: "Desde",
    accent: "accent-sunflower",
    badge: "Top ventas",
    description:
      "Bouquet artesanal con girasoles tejidos y composicion lista para regalo.",
    benefits: [
      "Durable y memorable",
      "Ideal para aniversarios y cumpleanos",
      "Listo para entrega con lazo premium"
    ]
  },
  {
    id: "tulipanes-premium",
    name: "Tulipanes Tejidos Premium",
    category: "Ramos tejidos",
    price: 69,
    priceLabel: "Desde",
    accent: "accent-lavender",
    badge: "Crochet delicado",
    description:
      "Tulipanes suaves de acabado fino para un detalle elegante y contemporaneo.",
    benefits: [
      "Colores personalizables",
      "Textura suave y visual premium",
      "Excelente para obsequio romantico"
    ]
  },
  {
    id: "rosa-caja",
    name: "Rosa Eterna en Caja",
    category: "Detalles en caja",
    price: 39,
    priceLabel: "Desde",
    accent: "accent-rose",
    badge: "Detalle express",
    description:
      "Una rosa tejida presentada en caja vertical, lista para sorprender con elegancia.",
    benefits: [
      "Regalo compacto y visual",
      "Facil de personalizar",
      "Ideal para fechas especiales"
    ]
  },
  {
    id: "girasol-caja",
    name: "Girasol en Caja de Regalo",
    category: "Detalles en caja",
    price: 45,
    priceLabel: "Desde",
    accent: "accent-box",
    badge: "Presentacion premium",
    description:
      "Detalle individual con look luminoso y empaquetado pensado para alto impacto visual.",
    benefits: [
      "Perfecto para delivery",
      "Fotogenico y elegante",
      "Refuerza valor percibido"
    ]
  },
  {
    id: "globo-rosa",
    name: "Rosa en Globo Decorativo",
    category: "Momentos especiales",
    price: 79,
    priceLabel: "Desde",
    accent: "accent-balloon",
    badge: "Efecto wow",
    description:
      "Presentacion original con globo transparente, perfecta para momentos especiales.",
    benefits: [
      "Impacto visual inmediato",
      "Ideal para sorpresa y aniversarios",
      "Acabado fotogenico"
    ]
  },
  {
    id: "bouquet-personalizado",
    name: "Bouquet Floral Personalizado",
    category: "Personalizados",
    price: 129,
    priceLabel: "Desde",
    accent: "accent-sunflower",
    badge: "A medida",
    description:
      "Combinacion de flores tejidas, acentos y colores definidos segun tu ocasion.",
    benefits: [
      "Diseno exclusivo",
      "Paleta a pedido",
      "Ideal para regalo premium"
    ]
  },
  {
    id: "detalle-corporativo",
    name: "Detalle Corporativo Artesanal",
    category: "Corporativo",
    price: 220,
    priceLabel: "Paquetes desde",
    accent: "accent-corporate",
    badge: "Empresas y eventos",
    description:
      "Solucion de regalo para marcas, equipos o campanas con presentacion premium y dedicatoria.",
    benefits: [
      "Personalizacion por marca",
      "Ideal para fechas comerciales",
      "Soporte para pedidos multiples"
    ]
  }
];

const formatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2
});

const productGrid = document.querySelector("#product-grid");
const filterRow = document.querySelector("#filter-row");
const quoteForm = document.querySelector("#quote-form");
const quoteProduct = document.querySelector("#quote-product");
const quoteQuantity = document.querySelector("#quote-quantity");
const quoteFinish = document.querySelector("#quote-finish");
const quoteFormat = document.querySelector("#quote-format");
const quoteDelivery = document.querySelector("#quote-delivery");
const quoteService = document.querySelector("#quote-service");
const quoteCard = document.querySelector("#quote-card");
const quoteNotes = document.querySelector("#quote-notes");
const summaryProduct = document.querySelector("#summary-product");
const summaryConfig = document.querySelector("#summary-config");
const summarySubtotal = document.querySelector("#summary-subtotal");
const summaryTax = document.querySelector("#summary-tax");
const summaryDelivery = document.querySelector("#summary-delivery");
const summaryTotal = document.querySelector("#summary-total");
const quoteWhatsapp = document.querySelector("#quote-whatsapp");
const quoteEmail = document.querySelector("#quote-email");
const contactForm = document.querySelector("#contact-form");
const contactWhatsapp = document.querySelector("#contact-whatsapp");
const formNote = document.querySelector("#form-note");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const year = document.querySelector("#year");

function renderProducts(filter = "Todos") {
  if (!productGrid) {
    return;
  }

  const visibleProducts =
    filter === "Todos" ? products : products.filter((product) => product.category === filter);

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-art ${product.accent}">
            <span>${product.badge}</span>
          </div>
          <div class="product-body">
            <div class="product-topline">
              <span>${product.category}</span>
              <span>${product.priceLabel}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <ul class="benefit-list">
              ${product.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
            </ul>
            <div class="product-footer">
              <div class="price-wrap">
                <strong>${formatter.format(product.price)}</strong>
                <span>Precio referencial</span>
              </div>
              <button class="btn btn-secondary product-quote" type="button" data-product="${product.id}">
                Cotizar
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".product-quote").forEach((button) => {
    button.addEventListener("click", () => {
      quoteProduct.value = button.dataset.product;
      updateQuoteSummary();
      document.querySelector("#cotizador")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function fillQuoteOptions() {
  quoteProduct.innerHTML = products
    .map(
      (product) =>
        `<option value="${product.id}">${product.name} - ${formatter.format(product.price)}</option>`
    )
    .join("");
}

function getSelectedText(selectElement) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  return selectedOption?.dataset.label || selectedOption?.textContent || "";
}

function updateQuoteSummary() {
  const selectedProduct = products.find((product) => product.id === quoteProduct.value) || products[0];
  const quantity = Math.max(1, Number.parseInt(quoteQuantity.value, 10) || 1);
  const finish = Number.parseFloat(quoteFinish.value) || 0;
  const format = Number.parseFloat(quoteFormat.value) || 0;
  const delivery = Number.parseFloat(quoteDelivery.value) || 0;
  const service = Number.parseFloat(quoteService.value) || 0;
  const card = Number.parseFloat(quoteCard.value) || 0;

  const extras = [...quoteForm.querySelectorAll('input[type="checkbox"]:checked')];
  const extrasCost = extras.reduce((total, input) => total + (Number.parseFloat(input.value) || 0), 0);

  const lineSubtotal = (selectedProduct.price + finish + format) * quantity;
  const operationalCost = service + card + extrasCost;
  const subtotal = lineSubtotal + operationalCost;
  const tax = subtotal * 0.18;
  const total = subtotal + tax + delivery;

  const configText = [
    `${quantity} unidad(es)`,
    getSelectedText(quoteFinish),
    getSelectedText(quoteFormat),
    getSelectedText(quoteService),
    getSelectedText(quoteCard),
    extras.length ? extras.map((item) => item.dataset.label).join(", ") : "Sin extras"
  ].join(" | ");

  summaryProduct.textContent = selectedProduct.name;
  summaryConfig.textContent = configText;
  summarySubtotal.textContent = formatter.format(subtotal);
  summaryTax.textContent = formatter.format(tax);
  summaryDelivery.textContent = formatter.format(delivery);
  summaryTotal.textContent = formatter.format(total);

  const notesText = quoteNotes.value.trim() ? `Detalle adicional: ${quoteNotes.value.trim()}` : "";
  const message = [
    "Hola Manos Que Florecen, quiero solicitar esta cotizacion referencial:",
    "",
    `Producto: ${selectedProduct.name}`,
    `Cantidad: ${quantity}`,
    `Acabado: ${getSelectedText(quoteFinish)}`,
    `Presentacion: ${getSelectedText(quoteFormat)}`,
    `Tipo de pedido: ${getSelectedText(quoteService)}`,
    `Dedicatoria: ${getSelectedText(quoteCard)}`,
    `Delivery: ${getSelectedText(quoteDelivery)}`,
    `Extras: ${extras.length ? extras.map((item) => item.dataset.label).join(", ") : "Sin extras"}`,
    notesText,
    `Subtotal referencial: ${formatter.format(subtotal)}`,
    `IGV referencial: ${formatter.format(tax)}`,
    `Delivery: ${formatter.format(delivery)}`,
    `Total estimado: ${formatter.format(total)}`
  ]
    .filter(Boolean)
    .join("\n");

  quoteWhatsapp.href = `https://wa.me/51920052859?text=${encodeURIComponent(message)}`;
  quoteEmail.href = `mailto:manosqueflorecen.pe@gmail.com?subject=${encodeURIComponent(
    `Cotizacion web - ${selectedProduct.name}`
  )}&body=${encodeURIComponent(message)}`;
}

function handleFilters() {
  filterRow?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    filterRow.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("is-active"));
    target.classList.add("is-active");
    renderProducts(target.dataset.filter);
  });
}

function handleContactForm() {
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#contact-name").value.trim();
    const company = document.querySelector("#contact-company").value.trim();
    const phone = document.querySelector("#contact-phone").value.trim();
    const email = document.querySelector("#contact-email").value.trim();
    const message = document.querySelector("#contact-message").value.trim();

    const body = [
      "Hola Manos Que Florecen,",
      "",
      "Quiero solicitar informacion comercial:",
      `Nombre: ${name}`,
      `Empresa: ${company || "No aplica"}`,
      `Telefono: ${phone}`,
      `Correo: ${email}`,
      `Mensaje: ${message}`
    ].join("\n");

    window.location.href = `mailto:manosqueflorecen.pe@gmail.com?subject=${encodeURIComponent(
      `Nuevo contacto web - ${name}`
    )}&body=${encodeURIComponent(body)}`;

    formNote.textContent =
      "Se abrio tu cliente de correo con el mensaje prellenado. Si prefieres, tambien puedes continuar por WhatsApp.";
  });

  contactWhatsapp?.addEventListener("click", () => {
    const name = document.querySelector("#contact-name").value.trim();
    const phone = document.querySelector("#contact-phone").value.trim();
    const email = document.querySelector("#contact-email").value.trim();
    const message = document.querySelector("#contact-message").value.trim();

    const whatsappMessage = [
      "Hola Manos Que Florecen, quiero dejar mis datos:",
      `Nombre: ${name || "Pendiente"}`,
      `Telefono: ${phone || "Pendiente"}`,
      `Correo: ${email || "Pendiente"}`,
      `Mensaje: ${message || "Quiero mas informacion sobre sus productos."}`
    ].join("\n");

    window.open(`https://wa.me/51920052859?text=${encodeURIComponent(whatsappMessage)}`, "_blank");

    formNote.textContent =
      "Se preparo tu mensaje para WhatsApp. Completa o corrige los datos antes de enviarlo.";
  });
}

function handleMenu() {
  if (!menuToggle || !mainNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function init() {
  fillQuoteOptions();
  renderProducts();
  handleFilters();
  handleContactForm();
  handleMenu();

  [quoteProduct, quoteQuantity, quoteFinish, quoteFormat, quoteDelivery, quoteService, quoteCard].forEach(
    (field) => field.addEventListener("input", updateQuoteSummary)
  );

  quoteForm
    ?.querySelectorAll('input[type="checkbox"], textarea')
    .forEach((field) => field.addEventListener("input", updateQuoteSummary));

  year.textContent = new Date().getFullYear();
  updateQuoteSummary();
}

init();
