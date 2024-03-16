// JavaScript to handle image selection
const imageCards = document.querySelectorAll('.image-card');

// Add click event listener to each image card
imageCards.forEach(card => {
  card.addEventListener('click', () => {
    // Deselect all other cards
    imageCards.forEach(c => c.classList.remove('selected'));
    // Select the clicked card
    card.classList.add('selected');
  });
});