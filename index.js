"use strict";

window.onload = function () {
  const audio = document.getElementById("audio");
  const playPauseButton = document.getElementById("playPause");
  const progressBar = document.getElementById("progress");
  const playPauseButtonIcon = document.getElementById("btnPlayPauseIcon");
  let spanCurrentTime = document.getElementById("currentTime");
  let spanDuration = document.getElementById("duration");

  playPauseButton.addEventListener("click", togglePlayPause);
  
  audio.addEventListener("loadedmetadata", () => {
    const min = Math.floor(audio.duration / 60);
    const sec = Math.floor(audio.duration % 60);
    const tot = sec < 10 ? `0${sec}` : sec;
    spanDuration.textContent = `${min}:${tot}`;
  });

  function togglePlayPause() {
    if (audio.paused) {
      audio.play();
      playPauseButtonIcon.classList.remove("bi-play-circle-fill");
      playPauseButtonIcon.classList.add("bi-pause-circle-fill");
    } else {
      audio.pause();
      playPauseButtonIcon.classList.remove("bi-pause-circle-fill");
      playPauseButtonIcon.classList.add("bi-play-circle-fill");
    }
  }

  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    spanCurrentTime.textContent = `${minutes}:${formattedSeconds}`;
  }

  setInterval(updateProgressBar, 1000);

  // Aggiungi l'evento click sulla barra di progresso
  progressBar.parentElement.addEventListener("click", (event) => {
    const progressBarWidth = progressBar.parentElement.clientWidth;
    const posxX = event.offsetX; 
   
    audio.currentTime = (posxX / progressBarWidth) * audio.duration; 
    updateProgressBar(); 
  });
  window.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      togglePlayPause(); 
    }
  });

  // Resto del codice per la playlist...
  
  const container = document.getElementById("playlistContainer");

  playList.forEach((item) => {
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("playlist");

    const img = document.createElement("img");
    img.src = `./img/PlayListLogo/${item[0]}.png`;

    if (item[2] === "Artista") {
      img.classList.add("imgPlaylistCantante");
    } else {
      img.classList.add("imgPlaylist");
    }

    img.alt = "";

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("infoPlaylist");

    const title = document.createElement("h6");
    title.classList.add("titlePlaylist");
    title.textContent = item[1];

    const createdBy = document.createElement("p");
    createdBy.classList.add("createdBy");
    if (item[2] == "Artista") createdBy.textContent = "Artista";
    else createdBy.textContent = `Playlist ⋅ ${item[2]}`;

    infoDiv.appendChild(title);
    infoDiv.appendChild(createdBy);
    playlistDiv.appendChild(img);
    playlistDiv.appendChild(infoDiv);
    container.appendChild(playlistDiv);

    playlistDiv.addEventListener("click", () => {
      const MainContent = document.getElementById("mainContent");
      MainContent.innerHTML = "";
      createMainDiv(item);
    });
  });

  function createMainDiv(item) {
    let mainContent = document.getElementById("mainContent");

    let divHeaderPlaylist = document.createElement("div");
    divHeaderPlaylist.classList.add(
      "rounded",
      "p-4",
      // "m-1",
      "d-flex",
      "align-items-center",
      "divHeaderPlaylist"
    );
    mainContent.appendChild(divHeaderPlaylist);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    divHeaderPlaylist.appendChild(imgContainer);

    let imgPlaylist = document.createElement("img");
    imgPlaylist.classList.add("fixed-image", "rounded");
    imgPlaylist.src = `./img/PlayListLogo/${item[0]}.png`;
    imgPlaylist.alt = "";
    imgContainer.appendChild(imgPlaylist);

    let divInfoHeaderPlaylist = document.createElement("div");
    divInfoHeaderPlaylist.classList.add("info");
    divInfoHeaderPlaylist.style.marginLeft = "20px";
    divHeaderPlaylist.appendChild(divInfoHeaderPlaylist);

    let PlayListStatus = document.createElement("h6");
    PlayListStatus.textContent = "Playlist " + item[5];
    divInfoHeaderPlaylist.appendChild(PlayListStatus);

    let playListTitle = document.createElement("h2");
    playListTitle.textContent = item[1];
    divInfoHeaderPlaylist.appendChild(playListTitle);

    let PlayListDescription = document.createElement("p");
    PlayListDescription.textContent = item[3];
    divInfoHeaderPlaylist.appendChild(PlayListDescription);

    let divInfoDettagliatePlaylist = document.createElement("div");
    divInfoDettagliatePlaylist.classList.add("infoDettagliatePlaylist");
    divInfoHeaderPlaylist.appendChild(divInfoDettagliatePlaylist);

    let imgProfiloInsidePlaylist = document.createElement("img");
    imgProfiloInsidePlaylist.classList.add("imgProfiloInsidePlaylist");
    imgProfiloInsidePlaylist.src = `./img/profilo/papa.png`;
    imgProfiloInsidePlaylist.alt = "";
    divInfoDettagliatePlaylist.appendChild(imgProfiloInsidePlaylist);

    let infoPlaylistDurataNumero = document.createElement("p");
    infoPlaylistDurataNumero.classList.add("infoPlaylistDurataNumero");
    divInfoDettagliatePlaylist.appendChild(infoPlaylistDurataNumero);

    let userPlaylist = document.createElement("span");
    userPlaylist.classList.add("userPlayList");
    userPlaylist.style.fontSize = "13px";
    userPlaylist.textContent = item[2];

    divInfoDettagliatePlaylist.appendChild(userPlaylist);

    // Funzione per ottenere il colore principale dell'immagine e settarlo come background
    extractMainColor(imgPlaylist, divHeaderPlaylist);
  }

  // Funzione per estrarre il colore principale da un'immagine
  function extractMainColor(imgElement, targetDiv) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    ctx.drawImage(imgElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0,
      g = 0,
      b = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i]; // rosso
      g += data[i + 1]; // verde
      b += data[i + 2]; // blu
    }

    // Calcolo la media del colore
    const pixelCount = data.length / 4;
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // Applico il colore medio come background
    targetDiv.style.background = `linear-gradient(to bottom, rgb(${r}, ${g}, ${b}) 80%, #121212 100%)`;
  }
};
