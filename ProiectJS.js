const video_player = document.querySelector('#video_player');

// Functia de play video

playxpause = video_player.querySelector('.play_pause');
videoclip = video_player.querySelector('#main-video');

function playVideo() 
{
    playxpause.innerHTML = "pause";
    playxpause.title = "pause";
    video_player.classList.add('paused')
    videoclip.play();
}

// Functia de pause video

function pauseVideo() 
{
    playxpause.innerHTML = "play_arrow";
    playxpause.title = "play";
    video_player.classList.remove('paused')
    videoclip.pause();
}

// Schimbarea pictogramei din play in pause

playxpause.addEventListener('click',()=>
{
    const isVideoPaused = video_player.classList.contains('paused');
    if(isVideoPaused == 1)
        pauseVideo();
    else
        playVideo();
})

videoclip.addEventListener('play',()=>
{
    playVideo();
})

videoclip.addEventListener('pause',()=>
{
    pauseVideo();
}
)

// Inapoi 5 secunde
rewind = video_player.querySelector('.replay5');

rewind.addEventListener('click',()=>
{
    videoclip.currentTime = videoclip.currentTime - 5;
})

// Inainte 5 secunde

forward = video_player.querySelector('.forward5');


forward.addEventListener('click',()=>
{
    videoclip.currentTime = videoclip.currentTime + 5;
})


// Afisam in bara de comenzi durata clipului video
videoclip.addEventListener("loadeddata",(e)=>
{
    let videoDuration = e.target.duration;
    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);

    if(totalSec < 10) //Daca sunt mai putin de 10 secunde, adaugam un 0 la inceput
        totalSec = "0" + totalSec;
    totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
})

// Durata clipului curent

progressArea = video_player.querySelector('.Bara');
progress_Bar = video_player.querySelector('.baraTimp');

videoclip.addEventListener('timeupdate',(e)=>
{
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);

   // Daca sunt mai putin de 10 secunde, adaugam un 0 la inceput
   if(currentSec < 10)
      currentSec = "0" + currentSec;

    current.innerHTML = `${currentMin} : ${currentSec}`;

    let videoDuration = e.target.duration
    
    let progressWidth = (currentVideoTime / videoDuration) * 100;
    progress_Bar.style.width = `${progressWidth}%`;
})

// Volumul

volume = video_player.querySelector('.volume');
volume_range = video_player.querySelector('.volume_range');

function changeVolume() 
{
    videoclip.volume = volume_range.value / 100;
    if (volume_range.value == 0) 
    {
        volume.innerHTML = "volume_off";
    }
    else if(volume_range.value < 40)
    {
        volume.innerHTML = "volume_down";
    }
    else
    {
        volume.innerHTML = "volume_up";
    }

}

volume_range.addEventListener('change',()=>
{
    changeVolume();
})



current = video_player.querySelector('.current');
totalDuration = video_player.querySelector('.duration');

progressArea.addEventListener('mousemove',(e)=>
{
    
    let videoDuration = videoclip.duration;
    let progressTime = Math.floor(progressWidthval*videoDuration);

    let currentMin = Math.floor(progressTime / 60);
    let currentSec = Math.floor(progressTime % 60);

    if(currentSec < 10)
        currentSec = "0" + currentSec
})

progressArea.addEventListener('mouseLeave',()=>
{
    progressAreaTime.style.display = "none";
})

redare_fundal = video_player.querySelector('.redare_in_fundal');

redare_fundal.addEventListener('click',()=>
{
    videoclip.requestPictureInPicture();
})


// Butonul de fullscreen

fullscreen = video_player.querySelector('.fullscreen');

fullscreen.addEventListener('click',()=>
{
    if (!video_player.classList.contains('openFullScreen')) 
    {
        video_player.classList.add('openFullScreen');
        fullscreen.innerHTML = "fullscreen_exit";
        video_player.requestFullscreen();
    }
    else
    {
        video_player.classList.remove('openFullScreen');
        fullscreen.innerHTML = "fullscreen";
        document.exitFullscreen();
    }
});


// Butonul de viteza de redare

setari = video_player.querySelector('.setari');
settings = video_player.querySelector('#settings');

setari.addEventListener('click',()=>
{
    settings.classList.toggle('active');
    setari.classList.toggle('active');
})

// Viteza de redare

playback = video_player.querySelectorAll('.playback li');

playback.forEach((event)=>
{
    event.addEventListener('click',()=>
    {
        removeActiveClasses();
        event.classList.add('active');
        let speed = event.getAttribute('data-speed');
        videoclip.playbackRate = speed;
    })
})

function removeActiveClasses() 
{
    playback.forEach(event => 
        {
        event.classList.remove('active')
    });
}

let xhr = new XMLHttpRequest();
xhr.open("GET","Gallery.mp4");
xhr.responseType = "arraybuffer";
xhr.onload = (e)=>
{
    let blob = new Blob([xhr.response]);
    let url = URL.createObjectURL(blob);
    videoclip.src = url;
}
xhr.send();

videoclip.addEventListener('contextmenu',(e)=>
{
    e.preventDefault();
})