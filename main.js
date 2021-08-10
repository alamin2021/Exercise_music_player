// Define a variables 
let audio , playbtn, title, poster, artists, mutebtn, seekslider, volumeslider,seeking=false,seekto,curtimetext,durtimetext,playlist_status,dir,playlist,ext, agent,playlist_artist , repeat, randomSong;

// Initialization of Array of music  , Title , Poster Image, Artists 

dir = "music/";
playlist = ['Cartoon-On-%-On','Elektronomia','Johnning','popsicle','Fearless'];
title = ['Cartoon - on & On ','Elektronomia ', 'janji-Heroes Tonight ', 'Popsicle','Lost Sky-Fearless'];
artists = ['(feat. Daniel Levi) [NCS Release]','Electronomia -Sky High[NCS Release]','(Feat . fJohnning ) [NCS Release ]','LFZ - [NCS Release]','(feat. Chris Linton) [NCS Release]'];
poster = ['images/ncs1.jpeg','images/ncs2.jpg','images/ncs3.jpg','images/ncs4.jpg','images/ncs5.jpeg'] ;

// Used to run on every browser 

ext = ".mp3";
agent = navigator.userAgent.toLocaleLowerCase();
// console.log(agent);
if(agent.indexOf('firefox' != -1 || agent.indexOf('opera' != -1 ))){
   ext = ".ogg";
}
// Set object references 
playbtn = document.getElementById('playpusebtn');
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

playlist_index = 0 ;

// Audio Object
audio = new Audio();
audio.src = dir + playlist[0] + ext ;
// console.log(audio);
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
seekslider.addEventListener('mouseup',function(event){ seek(event);});
volumeslider.addEventListener('mousemove',setvolume);
audio.addEventListener('timeupdate',function(){
   seektimeupdate();
});
audio.addEventListener('ended',function(){
   switchTrack();
});
