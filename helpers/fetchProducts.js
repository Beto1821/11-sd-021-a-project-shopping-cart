const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

const fetchProducts = async () => {
  const data = await fetch(url);
  const dados = await data.json();
  console.log(dados.results);
  return dados.results;
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
