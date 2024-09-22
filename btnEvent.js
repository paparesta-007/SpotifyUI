"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const btnRepeat = document.getElementById("btnRepeat");
  let clickCount = 0; // Contatore dei clic

  btnRepeat.addEventListener("click", function () {
    const icon = this.querySelector("i"); // Seleziona l'icona all'interno del pulsante

    clickCount++;
    this.style.color = "#21ba57";
    if (clickCount === 1) {
      // First click: Auto-repeat (green color, bi-repeat icon)
      this.style.color = "#21ba57"; // Colore verde
      icon.classList.remove("bi-repeat-1");
      icon.classList.add("bi-repeat");
      console.log("Auto-repeat mode attivato, colore verde aggiunto");
    } else if (clickCount === 2) {
      // Second click: Repeat-one (green color, bi-repeat-1 icon)
      icon.classList.remove("bi-repeat");
      icon.classList.add("bi-repeat-1");
      this.style.color = "#21ba57 !important"; // Mantiene il colore verde
      console.log("Repeat-one mode attivato, icona cambiata a repeat-1");
    } else if (clickCount === 3) {
      // Third click: Reset (default color, bi-repeat icon)
      clickCount = 0; // Resetta il contatore
      icon.classList.remove("bi-repeat-1");
      icon.classList.add("bi-repeat");
      this.style.color = "#b3b3b3"; // Ritorna al colore normale
      console.log("Resetto, icona e colore ritornano normali");
    }
  });


  
});
