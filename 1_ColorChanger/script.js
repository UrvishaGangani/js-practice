const button_div = document.querySelector('.button-div');
const buttons = button_div.querySelectorAll('.button');
const body = document.querySelector('body');
console.log(buttons.length);

const grey = "#8ABEB9";
const orange = "#E9B63B";
const pink = "#F5CBCB";
const blue = "#0F828C";
const green = "#7ADAA5";

buttons.forEach(function (button) {
    console.log(button);
    button.addEventListener('click', function (e) {        
        body.style.backgroundColor = e.target.id;
        switch (e.target.id) {
          case "grey":            
            body.style.backgroundColor = grey;
            break;
          case "orange":            
            body.style.backgroundColor = orange;
            break;
          case "pink":            
            body.style.backgroundColor = pink;
            break;
          case "blue":            
            body.style.backgroundColor = blue;
            break;
          case "green":            
            body.style.backgroundColor = green;
            break;
          default:
            body.style.backgroundColor = "#ffffff";
            break;
        }
    });
});

