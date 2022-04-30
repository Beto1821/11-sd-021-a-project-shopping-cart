const cart = document.querySelector('.cart__items');
const clearCart = document.querySelector('.empty-cart');
const localItens = document.querySelector('.items');
const SessionCart = document.querySelector('.cart');
const display = document.createElement('p');
display.className = 'total-price';
display.innerText = 0;
SessionCart.appendChild(display);

//  const somaCar = () => {
//   const cartItems = cart.innerHTML;
//   // console.log(cartItems);
// //  const soma = document.querySelector('.total-price');
//   if (cartItems === '') soma.innerText = 0;
// //    const array = cartItems.match(/\$\d{1,8}(?:\.\d{1,2})/g); 
//   // const array = cartItems.match(/\$\d{1,9}(?:\.\d{1,2})/g); // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions#using_parenthesized_substring_matches
//   const array = cartItems.split('$')[1];
// console.log(array);
//   if (array) {
//     const listaPrecos = array.join('').replaceAll('$', ' ').split(' ').splice(1);
//   // console.log(listaPrecos);
//   soma.innerText = listaPrecos.reduce((acc, item) => acc + parseFloat(item), 0).toFixed(2);
//   }
// };

const somaCart = () => {
  let total = 0;
  const allProducts = document.querySelectorAll('.cart__item');
  allProducts.forEach((produto) => {
    total += parseFloat(produto.innerHTML.split('$')[1]);
    display.innerHTML = total;
  });
};

const subCart = (event) => {
  let number = Number(display.innerText);
  number -= parseFloat(event.path[0].innerHTML.split('$')[1]);
  display.innerHTML = number;
  somaCart();
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
  subCart(event);
  if (event.target !== cart) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
  }
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${(salePrice)}`;
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
  array.results.forEach((item) => localItens.appendChild(createProductItemElement(item)));
  remLoad();
};  

window.onload = () => { 
  cart.innerHTML = getSavedCartItems('cartItems');
  AppendItens();
  cart.addEventListener('click', cartItemClickListener);
};
