const reqUrl = "https://api.github.com/users";
// const req = new XMLHttpRequest();
// req.open('GET', reqUrl)
// req.onreadystatechange = function () {
//     if (req.readyState === 4) {
//         const data = JSON.parse(this.responseText);
//         console.log("Response :: " + data);
//         if (Array.isArray(data)) {
//             data.forEach(user => {
//                 console.log(user);
//             })
//         }
//         else {
//             console.error('expected an array but got object');
//         }
        
//     }
// }
// req.send();

async function createUserCards() {
  try {
    const res = await fetch(reqUrl);
    const users = await res.json();

      const container = document.getElementById("usersCard");
      container.innerHTML = "";

      users.forEach(user => {
          // Create card element
          const card = document.createElement("div");
          card.className = "card";
          
          // Add HTML structure
          card.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" class="avatar"/>
          <div class="name">${user.login}</div>
          <div class="type">${user.type}</div>
          <div class="links">
            <a href="${user.html_url}" target="_blank">View Profile</a>
            <a href="${user.repos_url}" target="_blank">Repos</a>
          </div>
          `;

          //Add card to the page
          container.appendChild(card);
      });      
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}
createUserCards();

function buttonClickHandler(color) {
    return function() {
        document.body.style.backgroundColor = `${ color }`;
    }
}
document.getElementById("orange").onclick = buttonClickHandler("orange");
document.getElementById('grey').onclick=buttonClickHandler('grey')