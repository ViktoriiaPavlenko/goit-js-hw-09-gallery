import galleryItems from '../db/array'
import myRefs from './refs'

const { galleryRef, lightboxRef, overlayRef, imageRef, closeButtonRef } = myRefs;

const galleryList = createList()
galleryRef.insertAdjacentHTML('beforeend', galleryList);

function createList() {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}"
    data-source="${original}" alt="${description}" />
    </a></li>`;
    })
    .join('');
}