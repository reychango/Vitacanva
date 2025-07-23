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
  // Actualizar campos de texto
  preview.nombre.textContent = campos.nombre.value || "Tu Nombre";
  preview.profesion.textContent = campos.profesion.value || "Tu Profesión";
  preview.email.textContent = campos.email.value || "correo@ejemplo.com";
  preview.telefono.textContent = campos.telefono.value || "+00 0000 0000";
  preview.ubicacion.textContent = campos.ubicacion.value || "Ciudad, País";

  // Formatear experiencia según plantilla
  if (campos.experiencia.value.trim()) {
    const lines = campos.experiencia.value.trim().split('\n');
    const container = preview.experiencia;
    container.innerHTML = '';

    lines.forEach(line => {
      const text = line.trim();
      if (!text) return;

      // Intentar extraer rol, empresa y fechas
      const regex = /(.+?) en (.+?)(?: \((.+?)\))?/i;
      const match = text.match(regex);

      const div = document.createElement('div');
      if (match && match[1] && match[2]) {
        div.setAttribute('data-role', match[1].trim());
        div.setAttribute('data-company', match[2].trim());
      }
      div.textContent = text;
      container.appendChild(div);
    });
  } else {
    preview.experiencia.textContent = "Agrega tu experiencia aquí...";
  }

  // Formatear habilidades como etiquetas
  if (campos.habilidades.value.trim()) {
    const skills = campos.habilidades.value.split(',')
      .map(s => s.trim())
      .filter(s => s);
    
    preview.habilidades.innerHTML = '';
    skills.forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      preview.habilidades.appendChild(span);
    });
  } else {
    preview.habilidades.innerHTML = 'JavaScript • Diseño • Comunicación';
  }

  // Aplicar color principal
  const color = campos.color.value;
  document.documentElement.style.setProperty('--accent-color', color);

  // Refrescar estilos visuales si es necesario
  if (plantillaSelect.value === 'moderna' || plantillaSelect.value === 'elegante') {
    document.querySelector('.cv-header h1').style.color = color;
    document.querySelectorAll('.cv-section h2').forEach(h2 => {
      h2.style.color = color;
    });
  }
}

// Escuchar cambios en los campos
Object.values(campos).forEach(campo => {
  campo.addEventListener('input', actualizarVista);
});

// Cambiar plantilla
plantillaSelect.addEventListener('change', () => {
  cvPreview.className = 'preview template-' + plantillaSelect.value;
  actualizarVista();
});

// Cambiar color
colorPicker.addEventListener('input', () => {
  actualizarVista();
});

// Exportar a PDF
btnPdf.addEventListener('click', () => {
  const opt = {
    margin: 0.8,
    filename: plantillaSelect.value === 'carta' 
      ? 'carta-presentacion.pdf' 
      : 'curriculum.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(cvPreview).set(opt).save();
});

// Inicializar
plantillaSelect.dispatchEvent(new Event('change'));