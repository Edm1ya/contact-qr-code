import QrCode from "qrcode";

export const QrCodeApp = (elementId) => {
  const element = document.querySelector(elementId);
  const h1 = document.createElement("h1");
  h1.innerHTML = "Generar Código QR";

  element.append(h1);

  const form = renderForm(elementId);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.name.value;
    const phone = form.phone.value;

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
END:VCARD`.trim();
    console.log(vCard);

    renderQrCode(elementId, vCard);
  });
};

const renderForm = (elementId) => {
  const element = document.querySelector(elementId);

  const form = document.createElement("form");
  form.innerHTML = `
    <form id="contactForm">
        <div class="form-group">
            <div>
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div>
                <label for="phone">Teléfono:</label>
                <input type="text" id="phone" name="phone" required />
            </div>
        </div>
        
        <button type="submit">Generar Código QR</button>
    </form>`;
  element.append(form);

  return form;
};

const renderQrCode = (elementId, data) => {
  const element = document.querySelector(elementId);
  const canvas = document.createElement("canvas");
  
  const existingCanvas = element.querySelector("canvas");
  if (existingCanvas) {
    existingCanvas.remove();
  }

  QrCode.toCanvas(canvas, data, function (error) {
    if (error) console.error(error);
    console.log("success!");
  });

  element.append(canvas);
};
