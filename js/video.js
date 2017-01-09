function getVideo(){
	return document.getElementById("video");
}

function play(){
	var video = getVideo();
	video.play();
}

function pause(){
	var video = getVideo();
	video.pause();	
}

// function stop(){
// 	var video = getVideo();
// 	video.pause();
// 	video.currentTime = 0;
// }

function stop(){
	var video = getVideo();


	// --- Dados para o storage em onabort
	var objVideo = getStorage("video");
	objVideo.desc.push("Video load aborted");
	objVideo.time.push(video.currentTime);
	objVideo.volume.push(video.volume);
	setStorage("video",objVideo);
	// ---


	video.load(); 
	// ---se autoplay ---
	// 
}

function volume(vol){	
	var video = getVideo();
	video.volume = vol;
}

function mute(){
	var video = getVideo();
	var mute = document.getElementById("muted");
	if(video.muted){
		video.muted = false;
		mute.style.color = "black";
	}else{
		video.muted = true;
		mute.style.color = "red";
	}

}

function full(){
	var video = getVideo();
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	}
}

getVideo().oncanplay = function(){
	var list = getStorage("listVideo");
	setTable(list);
};

getVideo().onplay = function(){
	console.log("The video has initialized on a play");
	if(getVideo().currentTime === 0){
		setStorage("video",{desc:["The video has initialized on a play"],time:[0],volume: [getVideo().volume]})
	}else{
		var objVideo = getStorage("video");
		objVideo.desc.push("The video has restarted");
		objVideo.time.push(getVideo().currentTime);
		objVideo.volume.push(getVideo().volume);
		setStorage("video",objVideo);		
	}
};

getVideo().onpause = function(){
	console.log("The video has been paused");
	var objVideo = getStorage("video");
	objVideo.desc.push("The video has been paused");
	objVideo.time.push(getVideo().currentTime);
	objVideo.volume.push(getVideo().volume);
	setStorage("video",objVideo);
};

getVideo().onabort = function(){
	console.log("Video load aborted");

	var objVideo = getStorage("video");	
	setStorage("video",{});

	var listVideo = getStorage("listVideo");
	
	if(!listVideo.length){
		listVideo = [];
	}
	listVideo.push(objVideo);
	setStorage("listVideo",listVideo);

};

getVideo().onvolumechange = function(){
	console.log("The Volume has been changed");
	var objVideo = getStorage("video");
	objVideo.desc.push("The Volume has been changed");
	objVideo.time.push(getVideo().currentTime);
	objVideo.volume.push(getVideo().volume);
	setStorage("video",objVideo);	
};

function setStorage(id, list){
	localStorage.setItem(id,JSON.stringify(list));
}

function getStorage(id){
	var storage = localStorage.getItem(id);
	if(storage){
		return JSON.parse(storage);
	}else{
		return {};
	}
}


function setTable(list){
	var table = "<thead><tr><td>...</td><td>Desc</td><td>Time</td><td>Volume</td></tr></thead><tbody>";
	for(var k in list){
		var desc = "";
		var time = "";
		var volume = "";
		for( var j in list[k].desc ){
			desc += "<p>" + list[k].desc[j] + "</p>";
			time += "<p>" + formatTime(list[k].time[j]) + "</p>";
			volume += "<p>" + list[k].volume[j] + "</p>";
		}

		table += "<tr>";
			table += "<td>" + k + "</td>";
			table += "<td>" + desc + "</td>";
			table += "<td>" + time + "</td>";
			table += "<td>" + volume + "</td>";
		table += "</tr>";

	}
	table += "</tbody></table>";

	document.getElementById("tableList").innerHTML = table;
}

function formatTime(time){
	var second = parseInt( time % 60 );
	var minAux = time / 60;
	var minute = parseInt( minAux % 60 );
	var hour = parseInt( minAux / 60 );

	if(second < 10){
		second = "0" + second;
	}
	if(minute < 10){
		minute = "0" + minute;
	}
	if(hour < 10){
		hour = "0" + hour;
	}


	return hour + ":" + minute + ":" + second;
}