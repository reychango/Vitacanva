// Elementos del DOM
const campos = {
  nombre: document.getElementById('nombre'),
  profesion: document.getElementById('profesion'),
  email: document.getElementById('email'),
  telefono: document.getElementById('telefono'),
  ubicacion: document.getElementById('ubicacion'),
  experiencia: document.getElementById('experiencia'),
  habilidades: document.getElementById('habilidades'),
  color: document.getElementById('color')
};

const preview = {
  nombre: document.getElementById('preview-nombre'),
  profesion: document.getElementById('preview-profesion'),
  email: document.getElementById('preview-email'),
  telefono: document.getElementById('preview-telefono'),
  ubicacion: document.getElementById('preview-ubicacion'),
  experiencia: document.getElementById('preview-experiencia'),
  habilidades: document.getElementById('preview-habilidades')
};

const plantillaSelect = document.getElementById('plantilla-select');
const colorPicker = document.getElementById('color');
const cvPreview = document.getElementById('cv-preview');
const btnPdf = document.getElementById('exportar-pdf');

// Función principal: actualizar vista previa
function actualizarVista() {
  // Actualizar texto normal
  preview.nombre.textContent = campos.nombre.value || "Tu Nombre";
  preview.profesion.textContent = campos.profesion.value || "Tu Profesión";
  preview.email.textContent = campos.email.value || "correo@ejemplo.com";
  preview.telefono.textContent = campos.telefono.value || "+00 0000 0000";
  preview.ubicacion.textContent = campos.ubicacion.value || "Ciudad, País";

  // Formatear experiencia como línea de tiempo (solo en plantilla moderna)
  if (campos.experiencia.value) {
    const lines = campos.experiencia.value.trim().split('\n');
    const container = preview.experiencia;
    container.innerHTML = '';

    lines.forEach(line => {
      if (line.trim()) {
        const match = line.match(/(.*) en (.*) \((.*)\)/i) ||
                     line.match(/(.*) en (.*)/) ||
                     [null, line, "Empresa no especificada", "Fecha"];

        const div = document.createElement('div');
        if (match[1]) div.setAttribute('data-role', match[1].trim());
        if (match[2]) div.setAttribute('data-company', match[2].trim());
        div.textContent = match[0] ? line : line.trim();
        container.appendChild(div);
      }
    });
  } else {
    preview.experiencia.textContent = "Agrega tu experiencia aquí...";
  }

  // Habilidades como etiquetas
  if (campos.habilidades.value) {
    const skills = campos.habilidades.value.split(',').map(s => s.trim());
    preview.habilidades.innerHTML = '';
    skills.forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      preview.habilidades.appendChild(span);
    });
  }

  // Aplicar color principal
  const color = campos.color.value;
  document.documentElement.style.setProperty('--accent-color', color);

  // Actualizar estilo en tiempo real
  const template = plantillaSelect.value;
  if (template === 'moderna' || template === 'elegante') {
    document.querySelector('.cv-header h1').style.color = color;
    const h2s = document.querySelectorAll('.cv-section h2');
    h2s.forEach(h2 => h2.style.color = color);
    if (template === 'moderna') {
      const before = document.querySelector('.cv-section h2::after') || {};
      before.backgroundColor = color;
    }
  }
}