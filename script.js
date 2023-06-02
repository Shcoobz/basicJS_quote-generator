// TODO: fix right icon position: always with last word, not next line
// TODO: add more buttons: fb, gmail?
// TODO: change quotes API
// TODO: change favicon

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function fetchQuotes() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data;
}

function getLocalQuoteIfApiError() {
  apiQuotes = localQuotes;
  showNewQuote();
}

async function displayQuotes() {
  showLoadingSpinner();

  try {
    apiQuotes = await fetchQuotes();
    showNewQuote();
  } catch (error) {
    getLocalQuoteIfApiError();
  }
}

function getRandomQuote() {
  return apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}

function handleAuthor(randomQuote) {
  return randomQuote.author || 'Unknown';
}

function handleQuoteLength(randomQuote) {
  quoteText.classList[randomQuote.text.length > 120 ? 'add' : 'remove'](
    'long-quote'
  );
}

function showNewQuote() {
  showLoadingSpinner();

  const randomQuote = getRandomQuote();
  authorText.textContent = handleAuthor(randomQuote);
  handleQuoteLength(randomQuote);
  quoteText.textContent = randomQuote.text;
  removeLoadingSpinner();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

displayQuotes();
