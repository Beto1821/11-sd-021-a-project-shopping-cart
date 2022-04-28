const getSavedCartItems = (items) => {
  localStorage.getItem(items);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
