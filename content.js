// import {notify} from './logic.js'
let timer;
let errorMsg = 'Cannot get appointment date may be because account is not setup or may because of account suspension! please increase time interval for account ban issues!';

// receive message from popup.checkInterval.js
function gotMessage(message, sender, sendResponse){
    localStorage.setItem('timer',message.time);
    alert('Timer set to '+localStorage.getItem('timer') + ' seconds!');
    timer = message.time;
    let timeout = setTimeout(() => {
        window.location.reload();
    }, timer * 1000);
}
chrome.runtime.onMessage.addListener(gotMessage);


// set timer value
timer = (localStorage.getItem('timer') ?? 30) * 1000; //default value as 30 sec if null initially

// get appointment date
let node = document.getElementsByClassName('leftPanelText')[0];

let newAppointmentDate=null;

try {
    newAppointmentDate = node.innerText;
} catch (error) {
    alert(errorMsg);
    clearTimeout(timeout);
}

let oldAppointmentDate = localStorage.getItem('appointmentDate') ?? null;
localStorage.setItem('appointmentDate', newAppointmentDate);
if (newAppointmentDate !== null && oldAppointmentDate !== newAppointmentDate) {
    notify(newAppointmentDate);
    localStorage.setItem('appointmentDate', newAppointmentDate);
}

let timeout = setTimeout(() => {
    window.location.reload();
}, timer);

function notify(newAppointmentDate) {
    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
            title: 'Visa Appointment Date',
            message: newAppointmentDate,
            iconUrl: '/images/bell_16.png',
            type: 'basic'
        }
    });
}
