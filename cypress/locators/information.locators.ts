const informationLocators = {
  // Product name row inside a cart line item (used to assert listed products).
  firstName: "[data-test='firstName']",
  lastName : "[data-test='lastName']",
  postalCode : "[data-test='postalCode']",
  buttonContinue :"[data-test='continue']",
  buttonCancel : "[data-test='cancel']",
  buttonfinish : "[data-test='finish']",
 
  
} as const;

export default informationLocators;