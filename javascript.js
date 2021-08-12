// Define a variables 
let audio , playbtn, title, poster, artists, mutebtn, seekslider, volumeslider,seeking=false,seekto,curtimetext,durtimetext,playlist_status,dir,playlist,ext, agent,playlist_artist , repeat, randomSong ;

// Initialization of Array of music  , Title , Poster Image, Artists 

dir = "music/";
playlist = ['jacinto-1','Elektronomia','Johnning','popsicle','Fearless'];
title = ['Cartoon - on & On ','Elektronomia ', 'janji-Heroes Tonight ', 'Popsicle','Lost Sky-Fearless'];
artists = ['(feat. Daniel Levi) [NCS Release]','Electronomia -Sky High[NCS Release]','(Feat . fJohnning ) [NCS Release ]','LFZ - [NCS Release]','(feat. Chris Linton) [NCS Release]'];
poster = ['images/ncs1.jpeg','images/ncs2.jpg','images/ncs3.jpg','images/ncs4.jpg','images/ncs5.jpg'] ;

// Used to run on every browser 

ext = ".mp3";
agent = navigator.userAgent.toLocaleLowerCase();
// console.log(agent);
// if(agent.indexOf('firefox' != -1 || agent.indexOf('opera' != -1 ))){
//    ext = ".ogg";
// }
// Set object references 
music = document.querySelector('audio');
playbtn = document.getElementById('playpausebtn');
mutebtn = document.getElementById('nextbtn');
prevbtn = document.getElementById('prevbtn');
mutebtn = document.getElementById('mutebtn');
seekslider = document.getElementById('seekslider');
volumeslider = document.getElementById('volumeslider');
curtimetext = document.getElementById('curtimetext');
durtimetext = document.getElementById('durtimetext');
playlist_status = document.getElementById('playlist_status');
playlist_artist = document.getElementById('playlist_artist');
repeat = document.getElementById('repeat');
randomSong = document.getElementById('random');

// Js change -----------------------------------------------------------------------------------------------------------
let playPauseImg = document.querySelector("#playPauseImage");
let backgroundImg = document.querySelector('#bg-image img');
let posterImg = document.querySelector('#image');
let mutebtnImg = document.querySelector("#muteImag");
let repeatImg = document.querySelector("#repeatImg");

playlist_index = 0 ;

// Audio Object
audio = new Audio();
audio.src = dir+ playlist[0] + ext ;
// console.log(dir+ playlist[0] + ext);
audio.loop = false ;

// First song Title And Artist 
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

// Add Event Handling 
playbtn.addEventListener('click',playPause);
nextbtn.addEventListener('click',nextSong);
prevbtn.addEventListener('click',prevSong);
mutebtn.addEventListener('click',mute);
seekslider.addEventListener('mousedown',function(event){seeking = true; seek(event);});
seekslider.addEventListener('mousemove',function(event){ seek(event);});
seekslider.addEventListener('mouseup',function(){ seeking = false ;});
volumeslider.addEventListener('mousemove',setvolume);
audio.addEventListener('timeupdate',function(){
   seektimeupdate();
});
audio.addEventListener('ended',function(){
   switchTrack();
});
repeat.addEventListener('click',loop);
randomSong.addEventListener('click',random);


// Functions
function fetchMusicDetails(){
   // poster image , pause / play image 
   playPauseImg.setAttribute('src',"images/pause-red.png");
   backgroundImg.setAttribute('src',poster[playlist_index]);
   posterImg.setAttribute('src',poster[playlist_index]);

   // title and artists
   playlist_status.innerHTML = title[playlist_index];
   playlist_artist.innerHTML = artists[playlist_index];
   // Audio 
   audio.src = dir+ playlist[playlist_index]+ext ;
   audio.play();
}
function playPause(){
   // music.play();
   if(audio.paused){
      // console.log('play');
      audio.play();
      playPauseImg.setAttribute('src','images/pause-red.png');
   }else{
      // console.log('paused');
      audio.pause();
      playPauseImg.setAttribute('src','images/play-red.png');
   }
}
function nextSong(){
   playlist_index++
   if(playlist_index > playlist.length -1){
      playlist_index = 0 ;
   }
   fetchMusicDetails();
}
function prevSong(){
   playlist_index--
   if(playlist_index < 0 ){
      playlist_index = playlist.length -1;
   }
   fetchMusicDetails();
}
function mute(e){
   if(audio.muted){
      audio.muted = false ;
      mutebtnImg.setAttribute('src','images/speaker.png');
   }else{
      audio.muted = true ;
      mutebtnImg.setAttribute('src','images/mute.png');
   }
}
function seek(event){
   // console.log(event);
   if(audio.duration == 0){
      null ;
   }else{
      if(seeking){
         seekslider.value = event.clientX - seekslider.offsetLeft ;
         seekto = audio.duration * (seekslider.value /100 );
         audio.currentTime = seekto ;
      }
   }
}
function setvolume(){
   audio.volume = volumeslider.value / 100 ;
}
function seektimeupdate(){
   if(audio.duration){
      let nt = audio.currentTime * (100/audio.duration);
      seekslider.value = nt ;
      var curmins = Math.floor(audio.currentTime/60);
      var  cursecs = Math.floor(audio.currentTime - curmins * 60 ) ;
      var durmins = Math.floor(audio.duration / 60 );
      var dursecs = Math.floor(audio.duration - durmins * 60);
      if(dursecs < 10 ){dursecs = `0${dursecs}`};
      if(dursecs < 10 ){dursecs = `0${dursecs}`};
      if(curmins < 10 ){curmins = `0${curmins}`};
      if(cursecs < 10 ){cursecs = `0${cursecs}`};
      curtimetext.textContent = `${curmins}:${cursecs}`;
      durtimetext.textContent = `${durmins}:${dursecs}`;

   }else{
      curtimetext.textContent = `00:00`;
      durtimetext.textContent = `00:00`;
   }
}
function switchTrack(){
   if(playlist_index == (playlist.length - 1)){
      playlist_index = 0 ;
   }else{
      playlist_index++ ;
   }
   fetchMusicDetails();
}

function loop(){
   if(audio.loop){
      audio.loop = false ;
      repeatImg.setAttribute("src","images/rep.png");
   }else{
      audio.loop = true ;
      repeatImg.setAttribute("src","images/rep1.png");
   }
}
function getRandomNumber(min,max){
   let step1 = max - min + 1 ;
   let step2 = Math.random() * step1 ;
   let result = Math.floor(step2)+min ;
   return result ; 
}

function random(){
   let randomIndex = getRandomNumber(0,playlist.length -1 );
   playlist_index = randomIndex ;
   fetchMusicDetails();
}
