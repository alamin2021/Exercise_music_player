const playBtn = document.querySelector('#playpausebtn');
const music = document.querySelector('audio');

const nextBtn = document.querySelector('#nextbtn');
const prevBtn = document.querySelector('#prevbtn');

const title = document.querySelector("#playlist_status");
const artist = document.querySelector("#playlist_artist");
const musicImg = document.querySelector('#image');

const currentTimeEl = document.querySelector('#curtimetext');
const durationEl = document.querySelector('durtimetext');

const songs = [
      {
         name : 'jacinto-1',
         displayName : 'Electric Chill Machine',
         artist : 'Jacinto Design',
         img : 'ncs1.jpeg',
      },
      {
         name : 'jacinto-2',
         displayName : 'Twinkle Twinkle Little Star',
         artist : 'Twinkle Mamo ',
         img : 'ncs2.jpg',
      },
      {
         name : 'jacinto-3',
         displayName : 'Seven Nation Army (Remix) ',
         artist : 'Real Get Army ',
         img : 'ncs3.jpg',
      },
      {
         name : 'jacinto-4',
         displayName : 'Jik Jik Jik (Dj Song)',
         artist : 'Dj Boy Jik Jik ',
         img : 'ncs4.jpg',
      },
]


let isPlaying = false ;
let songIndex = 0 ;
// Functions 
function playSong(){
   isPlaying = true ;
   document.querySelector('#playpausebtn img').setAttribute('src','images/pause-red.png');
   music.play();
}
function pauseSong(){
   isPlaying = false ;
   document.querySelector('#playpausebtn img').setAttribute('src','images/play-red.png');
   music.pause();
}
function loadSong(song){
   music.src = `music/${song.name}.mp3`;
   title.textContent = `${song.displayName}`;
   artist.textContent = `${song.artist}`;
   musicImg.src = `images/${song.img}`;
   // console.log(song);
}

function nextSong(){
   songIndex ++ ;
   if(songIndex>songs.length -1 ){
      songIndex = 0 ;
   }
   loadSong(songs[songIndex]);
   playSong();
}
function prevSong(){
   songIndex-- ;
   if(songIndex < 0){
      songIndex = songs.length - 1 ;
   }
   loadSong(songs[songIndex]);
   playSong();
}
// Set Current Time and duration 
function updateProgressBar(e){
   console.log(e);
}
function playAudio(){
   console.log("els")
   var audioElement = new Audio('music/jacinto-3.mp3');
   audioElement.play();
}
// playAudio();
// Onload Select First Song 
loadSong(songs[songIndex]);
playBtn.addEventListener('click',() => ( isPlaying ? pauseSong() : playSong() ));
nextBtn.addEventListener('click',nextSong);
prevBtn.addEventListener('click',prevSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
// playBtn.addEventListener('mousemove',playAudio)


