// TODO: fix right icon position: always with last word, not next line
// TODO: add more buttons: fb, gmail?
// TODO: change quotes API
// TODO: change favicon

// Get references to HTML elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// API URL for fetching quotes
const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
let apiQuotes = [];

// Function to display loading spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Function to remove loading spinner
function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Function to fetch quotes from the API
async function fetchQuotes() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  return data;
}

// Function to get a local quote if the API fails
function getLocalQuoteIfApiError() {
  apiQuotes = localQuotes;
  showNewQuote();
}

// Function to display quotes
async function displayQuotes() {
  showLoadingSpinner();

  try {
    apiQuotes = await fetchQuotes();
    showNewQuote();
  } catch (error) {
    getLocalQuoteIfApiError();
  }
}

// Function to get a random quote from the API
function getRandomQuote() {
  return apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}

// Function to handle the author's name
function handleAuthor(randomQuote) {
  return randomQuote.author || 'Unknown';
}

// Function to handle the quote text length for styling
function handleQuoteLength(randomQuote) {
  quoteText.classList[randomQuote.text.length > 120 ? 'add' : 'remove']('long-quote');
}

// Function to display a new quote
function showNewQuote() {
  showLoadingSpinner();

  const randomQuote = getRandomQuote();
  authorText.textContent = handleAuthor(randomQuote);
  handleQuoteLength(randomQuote);
  quoteText.textContent = randomQuote.text;
  removeLoadingSpinner();
}

// Function to share a quote on Twitter
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Initial quote display
displayQuotes();
