/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  Rectangle.prototype.getArea = function getArea() {
    return this.width * this.height;
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const outObj = JSON.parse(json);
  Object.setPrototypeOf(outObj, proto);
  return outObj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// class MySuperBaseElementSelector {
//   constructor(value) {
//     this.selector = [value] || [];
//   }

//   id(value) {
//     if (this.selector.some((el) => el.includes('#'))) {
//       throw Error('Element, id and pseudo-element should not occur
// more then one time inside the selector');
//     }
//     this.selector.push(`#${value}`);
//     return this;
//   }

//   class(value) {
//     this.selector.push(`.${value}`);
//     return this;
//   }

//   attr(value) {
//     this.selector.push(`[${value}]`);
//     return this;
//   }

//   pseudoClass(value) {
//     this.selector.push(`:${value}`);
//     return this;
//   }

//   pseudoElement(value) {
//     if (this.selector.some((el) => el.includes('::'))) {
//       throw Error('Element, id and pseudo-element should not occur
//  more then one time inside the selector');
//     }
//     this.selector.push(`::${value}`);
//     return this;
//   }

//   combine(selector1, combinator, selector2) {
//     const s1 = selector1.stringify();
//     const s2 = selector2.stringify();
//     this.selector = [`${s1} ${combinator} ${s2}`];
//     return this;
//   }

//   stringify() {
//     const temp = this.selector;
//     const countId = temp.filter((attr) => attr.startsWith('#')).length;
//     const countEl = temp.reduce((acc, el, i, arr) => {
//       if (arr.slice(i + 1).includes(el)) {
//         acc.push(el);
//       }
//       return acc;
//     }, []).length;
//     const countPseudEl = temp.filter((attr) => attr.startsWith('::')).length;
//     // console.log(countEl, countId, countPseudEl, temp);
//     if (countId || countPseudEl || countEl) {
//       // console.log('1');
//       throw Error('Element, id and pseudo-element should not occur more
// then one time inside the selector');
//     }
//     this.selector = [];
//     return temp.join('');
//   }
// }

// const cssSelectorBuilder = {
// element(value = '') {
// return new MySuperBaseElementSelector(value);
// },

// id(value) {
// this.selector = this.element().selector;
// if (this.selector.some((el) => el.includes('#'))) {
// throw Error('Element, id and pseudo-element should not occur
//  more then one time inside the selector');
// }
// this.selector.push(`#${value}`);
// return this;
// },

// class(value) {
// this.selector += `.${value}`;
// return this;
// },

// attr(value) {
// this.selector += `[${value}]`;
// return this;
// },

// pseudoClass(value) {
// this.selector += `:${value}`;
// return this;
// },

// pseudoElement(value) {
// if (this.selector.some((el) => el.includes('::'))) {
// throw Error('Element, id and pseudo-element should not occur more then one
// time inside the selector');
// }
// this.selector += `::${value}`;
// return this;
// },

// combine(selector1, combinator, selector2) {
// const s1 = selector1.stringify();
// const s2 = selector2.stringify();
// this.selector = `${s1} ${combinator} ${s2}`;
// return this;
// },

// stringify() {
// const temp = this.selector;
// const countId = temp.filter((attr) => attr.startsWith('#')).length;
// const countEl = temp.reduce((acc, el, i, arr) => {
// if (arr.slice(i + 1).includes(el)) {
//   acc.push(el);
// }
// return acc;
// }, []).length;
// const countPseudEl = temp.filter((attr) => attr.startsWith('::')).length;
// if (countId || countPseudEl || countEl) {
// throw Error('Element, id and pseudo-element should not
// occur more then one time inside the selector');
// }
// this.selector = [];
// return temp.join('');
// },
// };

// console.log(['div'].join(""));
// let temp = ['div', '.editable'];
// console.log(temp.reduce((acc, el, i, arr) => {
//   if (arr.slice(i + 1).includes(el)) {
//     acc.push(el);;
//   }
//   return acc;
// }, []));

// console.log("div#nav-bar".replace(/^div/, ''));
// const builder = cssSelectorBuilder;
// console.log(builder.id('main').class('container').class('editable').stringify());

// console.log(builder.combine(builder.element('div').id('main').class('container')
//   .class('draggable'), '+', builder.combine(builder.element('table').id('data'), '~', builder
//     .combine(builder.element('tr').pseudoClass('nth-of-type(even)'), ' ', builder
//       .element('td').pseudoClass('nth-of-type(even)')))).stringify());

const cssSelectorBuilder = {
  element(/* value */) {
    throw new Error('Not implemented');
  },

  id(/* value */) {
    throw new Error('Not implemented');
  },

  class(/* value */) {
    throw new Error('Not implemented');
  },

  attr(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoClass(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoElement(/* value */) {
    throw new Error('Not implemented');
  },

  combine(/* selector1, combinator, selector2 */) {
    throw new Error('Not implemented');
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
