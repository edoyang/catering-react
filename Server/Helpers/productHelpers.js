const capitalizeWords = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  const capitalizeArrayItems = (arr) => {
    if (!Array.isArray(arr)) return arr;
    return arr.map(item => capitalizeWords(item));
  };
  
  function capitalizeProductFields(product) {
    const productObj = product.toObject ? product.toObject() : product;
  
    return {
      ...productObj,
      name: capitalizeWords(productObj.name),
      category: capitalizeWords(productObj.category),
      availability: capitalizeArrayItems(productObj.availability),
      allergen: capitalizeArrayItems(productObj.allergen),
      ingredients: capitalizeArrayItems(productObj.ingredients),
      substitute: capitalizeArrayItems(productObj.substitute),
    };
  }
  
  module.exports = {
    capitalizeProductFields,
  };
  