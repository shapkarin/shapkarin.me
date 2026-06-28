const CLASS_NAME = 'Article__heading-highlight';

export function highlightHeading(element) {
  if (!element) return;
  element.classList.remove(CLASS_NAME);
  void element.offsetWidth;
  element.classList.add(CLASS_NAME);
  element.addEventListener('animationend', () => {
    element.classList.remove(CLASS_NAME);
  }, { once: true });
}
