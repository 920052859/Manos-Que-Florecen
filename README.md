# Manos Que Florecen - Propuesta Web Premium

Esta carpeta contiene una propuesta lista para presentar y adaptar a produccion para la marca **Manos Que Florecen**, enfocada en conversion comercial, confianza y cotizacion rapida.

## Archivos principales

- `index.html`: estructura completa de la landing corporativa.
- `styles.css`: sistema visual premium, responsive y con microanimaciones.
- `script.js`: render de productos, filtros, cotizador y formularios conectados a WhatsApp y correo.
- `react-version/`: version moderna en React lista para usar con Vite.

## Estructura implementada

1. Hero section de alto impacto con propuesta de valor, CTA y argumentos comerciales.
2. Seccion "Quienes somos" con historia de marca, mision, vision y valores.
3. Catalogo de productos con tarjetas, categorias y boton de cotizacion.
4. Cotizador interactivo con calculo referencial y envio a WhatsApp/correo.
5. Seccion de confianza con metricas y testimonios.
6. Bloque de redes y enlaces externos.
7. Seccion de contacto con datos visibles y formulario doble via correo/WhatsApp.
8. Footer corporativo.

## Paleta sugerida

- Fondo marfil: `#f8f0e9`
- Rosa principal: `#cb8f98`
- Rosa profundo: `#ab6770`
- Verde salvia: `#74856d`
- Dorado suave: `#d4b37a`
- Texto oscuro: `#2f2824`

Esta combinacion transmite artesania premium, calidez y sofisticacion sin perder claridad comercial.

## Tipografias sugeridas

- Titulares: `Cormorant Garamond`
- Cuerpo y UI: `Manrope`

La mezcla ayuda a comunicar elegancia artesanal con una lectura moderna y limpia.

## Direccion visual sugerida

- Fondos claros con gradientes sutiles y textura eterea.
- Tarjetas con efecto glass suave para reforzar percepcion premium.
- Fotografia ideal: fondos limpios, luz natural, acercamientos al tejido, cajas regalo, bouquets y manos trabajando.
- Recomendacion visual: reemplazar los bloques ilustrativos por fotos reales del catalogo para subir conversion.

## UX/UI pensado para conversion

- CTA visibles en hero, productos, cotizador y footer.
- Argumentos de confianza distribuidos a lo largo del recorrido.
- Cotizador como puente entre curiosidad y contacto real.
- WhatsApp flotante permanente.
- Jerarquia clara en movil y escritorio.
- Formularios cortos para reducir friccion.

## Como conectar formularios de forma real

La version actual usa:

- `mailto:` para abrir el cliente de correo del usuario.
- `wa.me` para enviar el resumen por WhatsApp.

Para produccion se recomienda:

1. **Formspree** o **Netlify Forms** si quieres una integracion rapida sin backend propio.
2. **EmailJS** si quieres enviar correos desde frontend con validacion basica.
3. **Resend** o **Node/Express** si quieres control total, CRM y automatizaciones.
4. **Meta Pixel** o **Google Analytics** para medir clics a WhatsApp y formularios enviados.

## Redes sociales y catalogo

Ya se conectaron:

- Instagram
- WhatsApp
- Correo
- Sitio principal

Quedan listos para pegar:

- Facebook
- TikTok
- LinkedIn
- YouTube
- Catalogo digital

## Datos editables asumidos

Como no se recibieron todos los enlaces ni metricas finales, la propuesta incluye contenido comercial y algunos indicadores referenciales listos para ajustar:

- anos de experiencia
- testimonios
- metricas de clientes
- enlaces sociales faltantes
- horario exacto

## Siguiente mejora recomendada

1. Reemplazar las visuales de producto por fotos reales del catalogo.
2. Conectar formulario a un servicio de correo/CRM.
3. Agregar catalogo PDF o WhatsApp Catalog.
4. Instalar pixel y eventos de conversion.
5. Publicar en dominio y comprimir imagenes para mejorar velocidad.
