const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.js-gallery')
const lightboxRef = document.querySelector('.js-lightbox')
const overlayRef = document.querySelector('.lightbox__overlay')
const imageRef = document.querySelector('.lightbox__image')
const closeButtonRef = document.querySelector('.lightbox__button')

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
