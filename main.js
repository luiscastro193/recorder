"use strict";
let button = document.querySelector('button');
let codec = 'video/webm; codecs=vp9';

if (!MediaRecorder.isTypeSupported(codec))
	codec = 'video/webm';

function record() {
	navigator.mediaDevices.getDisplayMedia({audio: true, video: true}).then(stream => {
		let recorder = new MediaRecorder(stream, {mimeType: codec});
		
		recorder.ondataavailable = function(event) {
			if (event.data.size > 0) {
				let url = URL.createObjectURL(event.data);
				let a = document.createElement("a");
				a.href = url;
				a.download = "recording.webm";
				a.style = "display: none";
				document.body.appendChild(a);
				a.click();
				URL.revokeObjectURL(url);
				a.remove();
			}
		};
		
		recorder.onstop = function() {
			button.onclick = record;
			button.textContent = 'Record';
		}
		
		recorder.start();
		
		button.onclick = () => recorder.stop();
		button.textContent = 'Stop';
	});
}

button.onclick = record;
button.disabled = false;
