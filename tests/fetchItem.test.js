require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  beforeEach( async () => await fetchItem('MLB1615760527'));
 
  test('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function')
  });
  test('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
  expect(fetch).toHaveBeenCalled(); 
  });
  test('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint ', async () => {
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  test('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    const obj = await fetchItem('MLB1615760527');
    expect(obj).toMatchObject(item);
  });
  test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const obj = await fetchItem();
    expect(obj).toEqual(new Error('You must provide an url'));
  });
  });