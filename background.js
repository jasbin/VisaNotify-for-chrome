chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'notification') {
        chrome.notifications.create({
        type: 'basic',
        iconUrl: data.options.iconUrl,
        title: data.options.title,
        message: data.options.message,
        buttons: [
          { title: 'Ok' }
        ],
        priority: 1
      });

        var myAudio = new Audio();
        myAudio.src = chrome.runtime.getURL("/audio/appointment_dates_available.ogg");
        myAudio.play();
    }    
});