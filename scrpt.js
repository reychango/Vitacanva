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

const colorPicker = document.getElementById('color');
const cvPreview = document.getElementById('cv-preview');
const btnPdf = document.getElementById('exportar-pdf');

// Actualizar vista previa en tiempo real
function actualizarVista() {
  for (const key in campos) {
    if (preview[key]) {
      preview[key].textContent = campos[key].value || preview[key].textContent;
    }
  }

  // Aplicar color principal
  const color = colorPicker.value;
  cvPreview.style.setProperty('--accent-color', color);
}

// Escuchar cambios
Object.values(campos).forEach(campo => {
  campo.addEventListener('input', actualizarVista);
});

// Aplicar color al CV
document.body.style.setProperty('--accent-color', '#2563eb');
colorPicker.addEventListener('input', () => {
  cvPreview.style.setProperty('--accent-color', colorPicker.value);
  document.querySelector('.cv-section h2').style.borderColor = colorPicker.value;
  document.querySelector('.cv-header h1').style.color = colorPicker.value;
});

// Exportar a PDF
btnPdf.addEventListener('click', () => {
  const opt = {
    margin: 1,
    filename: 'mi-curriculum.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(cvPreview).set(opt).save();
});

// Inicializar
actualizarVista();