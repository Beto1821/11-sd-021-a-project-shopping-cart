const cart = document.querySelector('.cart__items');
const clearCart = document.querySelector('.empty-cart');

clearCart.addEventListener('click', () => {
  cart.innerHTML = '';
  saveCartItems(cart.innerHTML = '');
});

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  if (event.target !== 'cartItems') {
  event.target.remove();
  }
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const GetIdProduct = async (event) => { // adicona no carrinho
  const idProduct = await fetchItem(event.target.parentNode.firstChild.innerText);
  const { id, title, price } = idProduct;
  cart.appendChild(createCartItemElement({ id, title, price }));
  saveCartItems(cart.innerHTML); // adciona carrinho ao localstorage
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', GetIdProduct);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const AppendItens = async () => { // adiciona elementos da api a pagina
  const array = await fetchProducts('computador');
  const localItens = document.querySelector('.items');
  array.results.forEach((item) => localItens.appendChild(createProductItemElement(item)));
};  

window.onload = () => { 
  AppendItens();
  cart.innerHTML = getSavedCartItems('cartItems');
  cart.addEventListener('click', cartItemClickListener);
 };
