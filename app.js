const input = document.querySelector("input")
const form = document.querySelector("form")
const errormsg = document.querySelector(".error-msg")
const containerliste = document.querySelector(".liste-results")
const loader = document.querySelector(".error-loader")


//Start research on form submit (by cllicking "enter")

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {

  //Default browser action not taken into account > do nothing if no entry
  e.preventDefault()


  if (input.value == "") {
    errormsg.textContent = "Please enter something"

  } else {

    // Clear the existing list items, error message and search bar before calling api
    errormsg.textContent = ""
    containerliste.innerHTML = '';
    wikiapicall(input.value)
    loader.classList.toggle("switchedoff")
    input.value = ""
  }
}

// API call

async function wikiapicall(searchInput) {

  const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)

  const data = await response.json();

  const results = data.query.search

  console.log(results)

  //if no results associated to the search => change error message
  if (results.length == 0) {
    errormsg.textContent = "No results"
  }

  //Loop through the response data and create new list items
  for (i = 0; i < results.length; i++) {

    //Creation of elements to be pushed into the li (li creation "newLi")
    let newLi = document.createElement('li');
    let newTitreCarte = document.createElement('h2');
    let description = document.createElement('p');
    let urlpage = document.createElement('a');

    //Push elements inside front side of our card (NewLi)
    newLi.appendChild(newTitreCarte);
    newLi.appendChild(urlpage);
    newLi.appendChild(description);

    //Card content
    newTitreCarte.innerText = results[i].title
    description.innerHTML = results[i].snippet

    const url = `https://en.wikipedia.org/?curid=${results[i].pageid}`
    urlpage.href = url;
    urlpage.innerText = url;

    //Push cards into list container
    containerliste.appendChild(newLi)

  }


}

//manage loader
