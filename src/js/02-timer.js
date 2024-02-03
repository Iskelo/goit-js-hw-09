import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const dataStart = document.querySelector('button[data-start]');

let targetDate = null;
let timerId = null;
let currentDate = new Date();

dataStart.disabled = true;
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		targetDate = selectedDates[0];
		if (targetDate>currentDate) {
			dataStart.disabled = false;
			dataStart.addEventListener("click", ()=>{
				dataStart.disabled = false;
				timerId = setInterval(()=>{
					dataStart.disabled = true;
					currentDate = new Date();
					addLeadingZero(convertMs(targetDate-currentDate))
				}, 1000)
			})
		}else{
			Notify.failure('Please choose a date in the future')
			clearInterval(timerId);
		}
	},
 };

flatpickr("input#datetime-picker", options);

function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	// Remaining days
	const days = Math.floor(ms / day);
	// Remaining hours
	const hours = Math.floor((ms % day) / hour);
	// Remaining minutes
	const minutes = Math.floor(((ms % day) % hour) / minute);
	// Remaining seconds
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}


function addLeadingZero(values){
	dataDays.textContent = values.days.toString().padStart(2,'0');
	dataHours.textContent = values.hours.toString().padStart(2,'0');
	dataMinutes.textContent = values.minutes.toString().padStart(2,'0');
	dataSeconds.textContent = values.seconds.toString().padStart(2,'0');
	if (values.days == 0 && values.hours == 0 && values.minutes == 0 && values.seconds == 0) {
		clearInterval(timerId);
		Notify.success('Time is up');
	}
}