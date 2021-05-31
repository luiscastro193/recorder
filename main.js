"use strict";
let button = document.querySelector('button');
let microphone = document.querySelector('input');

async function record() {
	let userAudio = microphone.checked;
	
	if (userAudio)
		var audioTrack = (await navigator.mediaDevices.getUserMedia({audio: true, video: false})).getAudioTracks()[0];
	
	return navigator.mediaDevices.getDisplayMedia({audio: !userAudio, video: true}).then(stream => {
		if (userAudio)
			stream.addTrack(audioTrack);
		
		let recorder = new MediaRecorder(stream);
		
		recorder.ondataavailable = function(event) {
			if (event.data.size > 0) {
				let url = URL.createObjectURL(event.data);
				let a = document.createElement("a");
				a.href = url;
				a.download = "recording";
				a.style = "display: none";
				document.body.appendChild(a);
				a.click();
				URL.revokeObjectURL(url);
				a.remove();
			}
		};
		
		recorder.onstop = function() {
			stream.getTracks().forEach(track => track.stop());
			button.onclick = secureRecord;
			button.textContent = 'Record';
			microphone.disabled = false;
		}
		
		recorder.start();
		
		microphone.disabled = true;
		button.onclick = () => recorder.stop();
		button.textContent = 'Stop';
		stream.getVideoTracks()[0].onended = () => recorder.stop();
	}).catch(() => {
		if (userAudio)
			audioTrack.stop();
	});
}

async function secureRecord() {
	button.disabled = true;
	await record().catch(e => console.error(e));
	button.disabled = false;
}

button.onclick = secureRecord;
button.disabled = false;
