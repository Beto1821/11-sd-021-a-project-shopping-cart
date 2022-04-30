const cart = document.querySelector('.cart__items');
const clearCart = document.querySelector('.empty-cart');
const localItens = document.querySelector('.items');

const criaSoma = () => {
  const SessionCart = document.querySelector('.cart');
  const soma = document.createElement('p');
  soma.className = 'total-price';
  SessionCart.appendChild(soma);
};

const somaCart = () => {
  const cartItems = cart.innerHTML;
  const soma = document.querySelector('.total-price');
  if (cartItems === '') soma.innerText = 0;
  const array = cartItems.match(/\$\d{1,8}(?:\.\d{0,2})/g);
  if (array) {
  const listaprecos = array.join('').replaceAll('$', ' ').split(' ').splice(1);
  soma.innerText = listaprecos.reduce((acc, item) => acc + parseFloat(item), 0).toFixed(2);
  }
};

clearCart.addEventListener('click', () => {
  cart.innerHTML = '';
  localStorage.clear();
  somaCart();
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
  if (event.target !== cart) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
  somaCart();
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
  somaCart();
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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }
 const remLoad = () => {
   const MenLoad = document.querySelector('.loading');
   localItens.removeChild(MenLoad);
 };
 const addLoad = () => {
   const banner = document.createElement('p');
  banner.className = 'loading';
  banner.innerText = 'carregando...';
  localItens.appendChild(banner);
 };

const AppendItens = async () => { // adiciona elementos da api a pagina
  addLoad();
  const array = await fetchProducts('computador');
  // array.results.forEach(() => addLoad());
  // array.results.forEach(() => remLoad());
  array.results.forEach((item) => localItens.appendChild(createProductItemElement(item)));
  remLoad();
};  

window.onload = () => { 
  cart.innerHTML = getSavedCartItems('cartItems');
  AppendItens();
  cart.addEventListener('click', cartItemClickListener);
  criaSoma();
  somaCart();
};
