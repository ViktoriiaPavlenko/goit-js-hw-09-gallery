import galleryItems from '../db/array';
import myRefs from './refs';
const { galleryRef, lightboxRef, overlayRef, imageRef, closeButtonRef } = myRefs;

function setImageAttr(src, alt) {
  imageRef.setAttribute("src", src);
  imageRef.setAttribute("alt", alt);
}

galleryRef.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  event.preventDefault();
  
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  lightboxRef.classList.add('is-open');

  setImageAttr(
    event.target.dataset.source,
    event.target.alt
  );

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', handleKeydown);
}

closeButtonRef.addEventListener('click', onCloseModal);
overlayRef.addEventListener('click', onCloseModal);

function onCloseModal(event) {
  lightboxRef.classList.remove('is-open');
  
  setImageAttr(" ", "");

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', handleKeydown);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function handleKeydown(event) {
  let currentIndex = galleryItems.findIndex(
    img => img.original === imageRef.src,
  );
  
  let nextIndex = currentIndex + 1;
  let previousIndex = currentIndex - 1;
  if (event.code === 'ArrowRight') {
    if (nextIndex >= galleryItems.length) {
      nextIndex = 0;
    }
    imageRef.src = galleryItems[nextIndex].original;
  }
  if (event.code === 'ArrowLeft') {
    if (previousIndex < 0) {
      previousIndex = galleryItems.length - 1;
    }
    imageRef.src = galleryItems[previousIndex].original;
  }
}
