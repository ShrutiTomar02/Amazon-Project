const xhr = new XMLHttpRequest(); 
// XMLHttpRequest is buit-in class for creating object, creates a new http message(request) to send to backend.
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});
//we wrote eventlistener code above send code because we first need to set the eventlistener and then send the request, This is same as setting up eventlistener for clicking a button, We need to set up event listener first and then we click the button after

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
