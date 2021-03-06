placeCards = () => {
  let wrappers = document.querySelectorAll(".wrapper");
  [...wrappers].forEach(wrapper => {
    wrapper.classList.add("frontback-cards");
  });
};

// toggle class for flip animation
flipCard = () => {
  let cardContainers = document.querySelectorAll(".card-container");
  [...cardContainers].forEach(card => {
    let cardBtns = card.querySelectorAll(".btn-details");
    cardBtns.forEach(btn => {
      btn.addEventListener(
      "click",
      function () {
        card.classList.toggle("addFlip");
      },
      false);

    });
  });
};

(() => {
  placeCards();
  flipCard();
})();
