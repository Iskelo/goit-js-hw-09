const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

btnStart.addEventListener('click',()=>{
	timerId = setInterval(()=>{
		document.body.style.background = getRandomHexColor()		
	}, 1000)
	btnStart.disabled = true;
})

btnStop.addEventListener('click',()=>{
	clearInterval(timerId);
	btnStart.disabled = false;
})

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
 }