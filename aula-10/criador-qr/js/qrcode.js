const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const qrText = document.querySelector('.qr-text');
const sizesSelect = document.querySelector('.sizes');

const qrCode = document.querySelector('#qr-code');

dark.addEventListener('input', handleDarkColor);
light.addEventListener('input', handleLightColor);
qrText.addEventListener('input', handleQRText);
sizesSelect.addEventListener('change', handleSizes);

const defaultText = 'www.ifms.edu.br';
let colorDark = '#000';
let colorLight = '#fff';
let text = defaultText;
let size = 300;

function handleDarkColor(e) {
  colorDark = e.target.value;
  generateQRCode();
}

function handleLightColor(e) {
  colorLight = e.target.value;
  generateQRCode();
}

function handleQRText(e) {
  text = e.target.value;
  if (!text) {
    text = defaultText;
  }
  generateQRCode();
}

function handleSizes(e) {
  size = e.target.value;
  generateQRCode();
}

function generateQRCode() {
  qrCode.innerHTML = '';
  new QRCode(qrCode, {
    text,
    width: size,
    height: size,
    colorDark,
    colorLight,
  });
}

generateQRCode();

const downloadBtn = document.querySelector('.download');

downloadBtn.addEventListener('click', downloadQRCode);

function downloadQRCode() {
  const qrCanvas = qrCode.querySelector('canvas');
  if (qrCanvas) {
    const qrDataURL = qrCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = qrDataURL;
    link.download = 'qrcode.png';
    link.click();
  }
}

const shareBtn = document.querySelector('.share');

shareBtn.addEventListener('click', shareQRCode);

function shareQRCode() {
  const qrCanvas = qrCode.querySelector('canvas');
  if (navigator.share && qrCanvas) {
    qrCanvas.toBlob((blob) => {
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });
      navigator.share({
        title: 'QR Code',
        text: 'Aqui está o QR Code gerado',
        files: [file],
      }).catch(error => console.log('Erro ao compartilhar', error));
    });
  } else {
    alert('O compartilhamento de arquivos não é suportado neste navegador.');
  }
}

function updateSelectOptions() {
  const sizeSelect = document.getElementById('size-select');
  const options = sizeSelect.querySelectorAll('option');

  if (window.innerWidth <= 700) {
    options.forEach(option => {
      if (option.value === '400' || option.value === '500') {
        option.style.display = 'none';
      }
    });
  } else {
    options.forEach(option => {
      option.style.display = 'block';
    });
  }
}

window.addEventListener('load', updateSelectOptions);
window.addEventListener('resize', updateSelectOptions);