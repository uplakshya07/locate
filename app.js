const getElement = (selector) => {
  const element = document.querySelector(selector)

  if (element) return element
  throw Error(
    `Please double check your class names, there is no ${selector} class`
  )
}

const getLocation = () => {
  const successCallback = (position) => {
    console.log(position);

    const urlLocation = getElement('#urlLocation')
    urlLocation.value = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}`

    const demo = getElement('.demo')
    demo.innerHTML = `<iframe src="https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&hl=en&z=14&amp;output=embed" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>`    
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  let options = {
    enableHighAccuracy: true,
    timeout: 10000
  }

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
}

var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    status.classList.add('success')
    status.innerHTML = "Thanks for your submission!";
    
    const demo = getElement('.demo')
    demo.innerHTML = ``
    form.reset()
  }).catch(error => {
    status.classList.add('error')
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)
