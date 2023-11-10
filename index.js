// Get reference to DOM elements
const textBox = document.getElementById('text-box');
const button = document.getElementById('search-button');
const displayDiv = document.getElementById('display-area');

// URL for JSON data 
const dictUrl = 'data/oe.json';
var dictData = null;

// Fetch JSON data


function searchKeys(key) {
    const res = [];
    for (var k in dictData) {
        if (k.startsWith(key)) {
            res.push(lookupData[k]);
        }
    }
    return res
}

async function fetchData() {
  fetch(dictUrl).then(u => u.json()).then(data => dictData = data);
}
window.addEventListener('load', fetchData);


// Search JSON data
async function searchJson() {  
  let searchTerm = textBox.value;
    searchTerm = searchTerm.replace('A\*', 'æ').replace('T\*', 'þ').replace('D\*', 'ð');
  // Get search term
 
  displayDiv.innerHTML = '';
  lookingFor = document.createElement('p');
  lookingFor.innerHTML = "Searching for: " + searchTerm;
  displayDiv.appendChild(lookingFor);
  displayDiv.appendChild(document.createElement('hr'));

  // Search keys in JSON data
  for (var [key, val] of Object.entries(dictData)) {
      if (key.startsWith(searchTerm)) {
          //const indexes = lookupData[searchTerm];
          const p = document.createElement('div');
          p.innerHTML = val;
          displayDiv.appendChild(p);
          displayDiv.appendChild(document.createElement('hr'));
      }
    console.log("Done searching");
  }

    // else {
    //const err = document.createElement('p');
     // err.text = searchTerm + ' not found';
     // displayDiv.appendChild(err);
 // }


    /*
  // Display results
  displayDiv.innerHTML = ''; 
  results.forEach(result => {
    const p = document.createElement('p');
    p.textContent = result;
    displayDiv.appendChild(p);
  });
  */
}

// Attach event listener to button
button.addEventListener('click', searchJson);
