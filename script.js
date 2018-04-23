var search_button = document.querySelector('.search-button');
var clear_button = document.querySelector('.clear-button');
var search_term_input = document.querySelector('input');

search_button.addEventListener('click', searchWiki);
clear_button.addEventListener('click', clearResults);

search_term_input.addEventListener('keypress', function (e) {
  var key = e.which || e.Keycode;
  if (key === 13) {
    searchWiki();
  }
});

function searchWiki() {
  if (document.querySelector('.results')) {
    document.body.removeChild(document.querySelector('.results'));
  }
  if (search_term_input.value === '') {
    let errorH = document.createElement('h2');
    errorH.innerHTML = 'Please enter a search term';
    errorH.classList.add('error-message');
    document.body.appendChild(errorH);
    window.setTimeout(function() {
      document.body.removeChild(errorH);
    }, 2000);
    return;
  }
  var wikiSearchURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&format=json&srsearch=${search_term_input.value}`;
  search_term_input.value = '';
  fetch(wikiSearchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      var resultsDiv = document.createElement('div');
      resultsDiv.classList.add('results');

      for (var i = 0; i < myJson.query.search.length; i++) {
        resultsDiv.innerHTML += `
          <div class="result${i}">
          <a class="result-links" target="_blank" href="http://en.wikipedia.org/?curid=${myJson.query.search[i].pageid}">
          <div class="title${i}">${myJson.query.search[i].title}</div>
              <div class="snippet${i}">${myJson.query.search[i].snippet}</div>
          </div>
        </a>
        <br>
        <hr>
        `;
      }
      document.body.appendChild(resultsDiv);
    });
}

function clearResults() {
  if (document.querySelector('.results')) {
    document.body.removeChild(document.querySelector('.results'));
  }
}
