const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');



var model = undefined;
var children = [];
var flag = 0;



function getUserMediaSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if (getUserMediaSupported()) {
  enableWebcamButton.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}

function enableCam(event) {
  if (!model) {
    return;
  }
  event.target.classList.add('removed');
  const constraints = {
    video: true
  };
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}

cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  demosSection.classList.remove('invisible');
});

function predictWebcam() {
  model.detect(video).then(function (predictions) {
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    for (let n = 0; n < predictions.length; n++) {
      if (predictions[n].score > 0.66) {
        const p = document.createElement('p');
        p.innerText = predictions[n].class + ' - with '
          + Math.round(parseFloat(predictions[n].score) * 100)
          + '% confidence.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
          + (predictions[n].bbox[1] - 10) + 'px; width: '
          + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
          + predictions[n].bbox[1] + 'px; width: '
          + predictions[n].bbox[2] + 'px; height: '
          + predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);

        // Check for "elephant" label with confidence greater than 75%

        if (predictions[n].class === 'elephant' && predictions[n].score > 0.75) {
          // Trigger a pop-up alert
          flag = 1

          alert('Elephant detected with confidence greater than 75%!');
          if (flag == 1) {
            let y = (Math.random() * 1) + 76.034525;
            let x = (Math.random() * 2) + 10.5752;
            let obj = { "xcord": x, "ycord": y };
            alert('BEEEEEEP');
            fetch('https://safari-gual.onrender.com/send-coords', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(obj)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                console.log('Server response:', data);
              })
              .catch(error => {
                console.error('Error sending data to server:', error);
              });
            // we export the obj to a server. From there the server sends the obj to the clients app.
          }
         
        }
      }

    }
    window.requestAnimationFrame(predictWebcam);
  });
}
