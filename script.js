let songs = [
  {
    id: 1,
    name: "Blue Eyes",
    artist: "Honey Singh",
    img: "images/Blue_eyes.jpg",
    genre: "Pop",
    source: "audio/Blue_eyes.mp3",
  },
  {
    id: 2,
    name: "Brown Rang",
    artist: "Honey Singh",
    img: "images/Brown_rang.jpg",
    genre: "Pop",
    source: "audio/Brown_rang.mp3",
  },
  {
    id: 3,
    name: "Mehbooba",
    artist: "Ananya",
    img: "images/Mehbooba.jpg",
    genre: "Rock",
    source: "audio/Mehbooba.mp3",
  },
  {
    id: 4,
    name: "Pal",
    artist: "Arjit Singh",
    img: "images/Pal.jpg",
    genre: "Rock",
    source: "audio/Pal.mp3",
  },
  {
    id: 5,
    name: "Pehle Bhi Main",
    artist: "Vishal",
    img: "images/Pehle_bhi_mai.jpg",
    genre: "Rock",
    source: "audio/Pehle_bhi_mai.mp3",
  },
];

let currentSongIndex = 0;
let allPlaylists = [];
let currentPlaylist = [];
let play_id = undefined;

const selectElement = document.getElementById("your-select-id");
const currentPlaylistContainer = document.getElementById(
  "current-playlist-container"
);

document.addEventListener("DOMContentLoaded", function () {
  playSong(songs[0]);
  showSongs(""); // Display all songs initially
});

selectElement.addEventListener("change", function () {
  console.log("hello");
  showSongs(this.value);
});

function showSongs(genre = null) {
  const songsContainer = document.getElementById("all-songs-container");
  songsContainer.innerHTML = ""; // Clear previous content
  //   console.log(genre);
  let filteredSongs = [];
  filteredSongs = songs;
  if (genre) {
    filteredSongs = songs.filter((song) => song.genre === genre);
  }

  const uldiv = document.createElement("div");
  filteredSongs.forEach((song, index) => {
    const button = document.createElement("button"); // Create a button element
    button.textContent = `${song.name} - ${song.artist}`; // Set the button text content
    button.classList.add("song-button"); // Add a CSS class to the button for styling
    console.log(song, index);
    button.addEventListener("click", function () {
      currentSongIndex = index;
      playSong(song); // Call the playSong function when the button is clicked
    });
    uldiv.appendChild(button); // Append the button to the unordered list
  });
  songsContainer.appendChild(uldiv);
}

function playSong(song) {
  // Update the song card with the details of the selected song
  play_id = song.id;
  document.getElementById("song-name").textContent = song.name;
  document.getElementById("artist-name").textContent = song.artist;
  document.getElementById("song-image").src = song.img;
  document.getElementById("audio-player").src = song.source;
  document.getElementById("audio-player").play();
}

// Function to play the previous song
function playPreviousSong() {
  if (currentSongIndex > 0) {
    currentSongIndex--; // Decrement the current song index
    const previousSong = songs[currentSongIndex]; // Get the previous song
    playSong(previousSong); // Play the previous song
  }
}

// Function to play the next song
function playNextSong() {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++; // Increment the current song index
    const nextSong = songs[currentSongIndex]; // Get the next song
    playSong(nextSong); // Play the next song
  }
}

function createPlaylist() {
  const playlistNameInput = document.getElementById("playlistName");
  const playlistName = playlistNameInput.value.trim();

  if (playlistName !== "") {
    const newPlaylist = { name: playlistName, songs: [] };
    allPlaylists.push(newPlaylist);
    // Update the UI to display the new playlist
    renderAllPlaylists();
    // Clear the input field
    playlistNameInput.value = "";
  }
}

function renderAllPlaylists() {
  const allPlaylistsContainer = document.getElementById(
    "All-playlist-container"
  );
  allPlaylistsContainer.innerHTML = ""; // Clear previous content

  allPlaylists.forEach((playlist) => {
    const playlistDiv = document.createElement("div"); // Create a div for the playlist
    playlistDiv.classList.add("playlist-item"); // Add class for styling

    const playlistNameButton = document.createElement("button"); // Create a button element for the playlist name
    playlistNameButton.textContent = playlist.name; // Set the button text content
    playlistNameButton.classList.add("playlist-button"); // Add a CSS class to the playlist button for styling

    // Add an event listener to the playlist button to render its songs
    playlistNameButton.addEventListener("click", function () {
      renderPlaylistSongs(playlist);
    });

    const removeButton = document.createElement("button"); // Create a button element for removing the playlist
    removeButton.textContent = "Remove"; // Set the remove button text content
    removeButton.classList.add("remove-button"); // Add a CSS class to the remove button for styling

    // Add an event listener to the remove button to handle playlist removal
    removeButton.addEventListener("click", function () {
      removePlaylist(playlist);
    });

    playlistDiv.appendChild(playlistNameButton); // Append the playlist button to the playlist div
    playlistDiv.appendChild(removeButton); // Append the remove button to the playlist div

    allPlaylistsContainer.appendChild(playlistDiv); // Append the playlist div to the container
  });
}

// Function to remove a playlist
function removePlaylist(playlist) {
  const index = allPlaylists.indexOf(playlist);
  console.log(allPlaylists, playlist, index);
  if (index !== -1) {
    allPlaylists.splice(index, 1);
    // Update the UI to reflect the removal of the playlist
    renderAllPlaylists();
    // console.log(allPlaylists[0]);
    renderPlaylistSongs(allPlaylists[0]);
  }
}

function renderPlaylistSongs(playlist) {
  currentPlaylistContainer.innerHTML = ""; // Clear previous content
  console.log(playlist);
  if (playlist === undefined) return;
  currentPlaylist = playlist.songs;
  console.log(currentPlaylist);
  renderCurrentPlaylist();
}

function renderCurrentPlaylist() {
  console.log("in redering currentplaylist");
  currentPlaylistContainer.innerHTML = ""; // Clear previous content
  currentPlaylist.forEach((song) => {
    const songContainer = document.createElement("div"); // Create a container for the song
    songContainer.classList.add("song-button-container"); // Add class for styling

    const songButton = document.createElement("button"); // Create a button element for the song
    songButton.textContent = `${song.name} - ${song.artist}`; // Set the button text content
    songButton.classList.add("song-button"); // Add a CSS class to the song button for styling
    songButton.addEventListener("click", function () {
      currentSongIndex = song.id - 1;
      console.log(song.id - 1);
      playSong(song); // Call the playSong function when the button is clicked
    });

    const removeButton = document.createElement("button"); // Create a button element for removing the song
    removeButton.textContent = "Remove"; // Set the remove button text content
    removeButton.classList.add("remove-button"); // Add a CSS class to the remove button for styling

    // Add an event listener to the remove button to handle song removal
    removeButton.addEventListener("click", function () {
      removeSongFromPlaylist(song);
    });

    songContainer.appendChild(songButton); // Append the song button to the song container
    songContainer.appendChild(removeButton); // Append the remove button to the song container

    currentPlaylistContainer.appendChild(songContainer); // Append the song container to the playlist container
  });
}

function removeSongFromPlaylist(song) {
  // Find the index of the song in the playlist
  const index = currentPlaylist.findIndex((s) => s.id === song.id);

  if (index !== -1) {
    // Remove the song from the playlist
    currentPlaylist.splice(index, 1);
    // Update the UI to reflect the changes
    renderCurrentPlaylist();
  }
}

function addToPlaylist() {
  // Get the details of the currently displayed song
  const curr_id = play_id;
  const currentSongName = document.getElementById("song-name").textContent;
  const currentArtistName = document.getElementById("artist-name").textContent;
  const currentSongImage = document.getElementById("song-image").src;
  const currentSongSource = document.getElementById("audio-player").src;

  // Create an object representing the current song
  const currentSong = {
    id: curr_id,
    name: currentSongName,
    artist: currentArtistName,
    img: currentSongImage,
    source: currentSongSource,
  };
  // console.log(currentSong);
  if (allPlaylists.length === 0) {
    alert("Create a playlist then add the song ");
    return;
  }

  if (allPlaylists.length === 1) {
    currentPlaylist = allPlaylists[0].songs;
  }

  const isSongAlreadyInPlaylist = currentPlaylist.some(
    (song) => song.id === curr_id
  );
  // Add the current song to the playlist only if it's not already present
  if (!isSongAlreadyInPlaylist) {
    currentPlaylist.push(currentSong);
  } else {
    alert("already in playlist");
  }
  // Update the UI to display the updated playlist
  renderCurrentPlaylist();
}

function toggleTheme() {
  const body = document.body;
  // Toggle between "dark-theme" and "light-theme" classes on the body element
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");

  // You can also update the button text/icon to reflect the current theme state
  const themeButton = document.querySelector("header button");
  const currentTheme = body.classList.contains("dark-theme") ? "Dark" : "Light";
  themeButton.textContent = `Toggle ${currentTheme} Theme`;
}
