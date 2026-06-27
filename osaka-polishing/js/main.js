const showPlaceholder = (image) => {
  image.classList.add("placeholder");
};

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    showPlaceholder(image);
  }, { once: true });

  if (image.complete && image.naturalWidth === 0) {
    showPlaceholder(image);
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    document.activeElement?.blur();
  });
});
