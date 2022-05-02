const cart = document.querySelector('.cart__items');
const clearCart = document.querySelector('.empty-cart');
const localItens = document.querySelector('.items');
const SessionCart = document.querySelector('.cart');
const display = document.createElement('p');
display.className = 'total-price';
display.innerText = 0;
SessionCart.appendChild(display);

const somaCart = () => {
  let total = 0;
  const allProducts = document.querySelectorAll('.cart__item');
  allProducts.forEach((produto) => {
    console.log(produto);
    total += parseFloat(produto.innerHTML.split('$')[1]);
  });
  
  if (allProducts.length === 0) total = 0;
  display.innerHTML = total;
};

clearCart.addEventListener('click', () => {
  cart.innerHTML = '';
  localStorage.clear();
  display.innerText = 0;
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
  somaCart();
  if (event.target !== cart) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
  }
}

function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${(salePrice)}`;
  li.appendChild(createProductImageElement(thumbnail));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const GetIdProduct = async (event) => { // adicona no carrinho
  const idProduct = await fetchItem(event.target.parentNode.firstChild.innerText);
  const { id, title, price, thumbnail } = idProduct;
  cart.appendChild(createCartItemElement({ id, title, price, thumbnail }));
  saveCartItems(cart.innerHTML); // adciona carrinho ao localstorage
  somaCart();
};

function createProductItemElement({ id: sku, title: name, thumbnail: image, price: salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', salePrice.toFixed(2)));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', GetIdProduct);
  return section;
}

const AppendItens = async () => { // adiciona elementos da api a pagina
  const load = localItens.appendChild(createCustomElement('p', 'loading', 'carregando'));
  const array = await fetchProducts('computador');
  array.results.forEach((item) => localItens.appendChild(createProductItemElement(item)));
  localItens.removeChild(load);
};  

window.onload = () => { 
  cart.innerHTML = getSavedCartItems('cartItems');
  AppendItens();
  cart.addEventListener('click', cartItemClickListener);
  somaCart();
};
