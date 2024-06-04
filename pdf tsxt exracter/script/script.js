function extractText() {
    const pdfInput = document.getElementById('pdfInput');
    const outputDiv = document.getElementById('output');
    const file = pdfInput.files[0];
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }
  
    const fileReader = new FileReader();
    fileReader.onload = function () {
      const typedarray = new Uint8Array(this.result);
  
      // Load the PDF using pdf.js
      pdfjsLib.getDocument(typedarray).promise.then(function (pdfDoc) {
        const numPages = pdfDoc.numPages;
        const textPromises = [];
  
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          textPromises.push(pdfDoc.getPage(pageNum).then(function (page) {
            return page.getTextContent();
          }));
        }
  
        Promise.all(textPromises).then(function (pageTexts) {
          const text = pageTexts.map(function (page) {
            return page.items.map(function (item) {
              return item.str;
            }).join(' ');
          }).join('\n');
  
          outputDiv.textContent = text;
        });
      });
    };
  
    fileReader.readAsArrayBuffer(file);
  }


