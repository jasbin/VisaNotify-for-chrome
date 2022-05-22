// document.getElementById('timeInterval').value = localStorage.getItem('timer');
let t = document.getElementsByClassName('time')[0].value = localStorage.getItem('time') ?? 30;
document.getElementById('timerDetails').innerHTML = "<p>Timer Set to <span style='color:blue'><strong>" + t + "</strong></span> seconds</p>";


let allowedUrl = [
   'https://cgifederal.secure.force.com/applicanthome',
   'https://cgifederal.secure.force.com/ApplicantHome'
];

chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true, 'currentWindow': true }, function (tabs) {
   let currentUrl = tabs[0].url;

   if (currentUrl === allowedUrl[0] || currentUrl === allowedUrl[1]) {
   
      let btn = document.getElementsByClassName('set')[0];
      btn.disabled = false;
      btn.addEventListener('click', popup);
      let time = document.getElementsByClassName('time')[0];
      time.disabled = false;
      
      function popup(e) {
         
         if (isNaN(time.value)) {
            alert('Please enter time in seconds');
         } else {

            timeInSeconds = {
               time: time.value ?? 30 // if time value is null set default value to 30 seconds
            }
            // alert(timeInSeconds);
            let params = {
               active: true,
               currentWindow: true
            }
            //sends query to content_scripts
            chrome.tabs.query(params, gotTab);
            function gotTab(tabs) {
               chrome.tabs.sendMessage(tabs[0].id, timeInSeconds);
            }
            localStorage.setItem('time', time.value);
         }
      }
   }

});



