import uuid from '/app'

//Model - skeleton
const model = {
  headers: {},
  sortLabel: undefined  //price, reviewer, etc

};

//Fetch and Promise Handling
async function postData() {
  const response = await fetch('/wine-reviews');
  // This data will show up in the resolve callback
  return await response.json();
}
<<<<<<< HEAD
=======

postData().then((reviews) => {
    showData(reviews);
    console.log(model);
    renderData();
    sortController(model);
  }
).catch((err) => {
  console.log(err)
});
>>>>>>> 7036abf08aaa8a7d51c044125674d82195cb8444

//Functions and Constants
const getData = reviews => {
  const set = new Set();
  reviews.forEach(review => {
    Object.keys(review).forEach(prop => set.add(prop));
  });
  return [...set];
};

function createElement(tag, innerHTML, className, prop) {
  const element = document.createElement(tag);
  element.setAttribute('class', className);
  element.setAttribute('data-prop', prop);
  element.innerHTML = innerHTML;
  return element;
}

function createInput(type, prop) {
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('data-prop', prop);
  return input;
}

function sortBy(newReviews, prop, asc) {
  //checks to see if they are ordered or not in asc
  if (asc) {
    newReviews.sort(ascCompareFn.bind(null, prop))
  } else {
    newReviews.sort(descCompareFn.bind(null, prop))
  }
}

function ascCompareFn(prop, a, b) {
  if (a[prop] > b[prop]) return 1;
  else if (a[prop] < b[prop]) return -1;
  else return 0;
}

function descCompareFn(prop, a, b) {
  if (a[prop] > b[prop]) return -1;
  else if (a[prop] < b[prop]) return 1;
  else return 0;
}


//Model Update
function showData(reviews) {
  const headers = getData(reviews);
  model.headers = headers.reduce((sortState, header) => {
    sortState[header] = {
      sortState: undefined,
      label: header
    };
    return sortState;
  }, {});
  model.reviews = reviews;
}


// View

function renderData() {
  const container = document.querySelector('.wine-reviews');
  const thead = container.querySelector('thead');
  const tbody = container.querySelector('tbody');
<<<<<<< HEAD
  // const input = renderInputs();

  // renderInputs(model.headers, thead);
=======
>>>>>>> 7036abf08aaa8a7d51c044125674d82195cb8444
  renderHeaders(model.headers, thead);
  renderRows(model.reviews, tbody, uuid);
}

function renderHeaders(headers, thead) {
<<<<<<< HEAD
  thead.innerHTML = '';
  const tr = $('tr').append(thead);
  Object.entries(headers).forEach(([propName, {label}]) => {
    const th = $('th').append(tr);
    const divForInput = $('div')
      .append(th);
    $('div')
      .addClass('sort-handler ')
      .text(label)
      .append(th);
    $('input')
      .attr('type', 'text')
      .attr('placeholder', propName)
      .append(divForInput);
  });
  // input element in a div
  // property name in a div
  // create a td and attach it
  // attach the td to tr
=======
  console.log(thead);
  const tr = $('tr').append(thead);
  console.log(tr);
  const th = $('th').append(tr);
  console.log(th);
  const input = $('input')
    .attr('data-prop', 'price')
    .attr('placeholder', 'some price')
    .attr('type', 'text')
    .append(th);
  console.log(input);

>>>>>>> 7036abf08aaa8a7d51c044125674d82195cb8444
}

function renderRows(reviews, tbody, uuid) {
  //clear out data:
  tbody.innerHTML = '';
  reviews.forEach(review => {
    const tr = document.createElement('tr');
    Object.values(review).forEach(value => {
      tr.appendChild(createElement('td', value))
    });
    tbody.appendChild(tr);
  });
}

//Controller

function sortController() {
  const thArr = Array.from(document.querySelectorAll('thead th'));
  const clickHandler = (e) => {
    const {prop} = e.target.dataset;
    console.log(prop);
    //Checks to see if the sortState prop is already there
    model.headers[prop].sortState = !model.headers[prop].sortState;
    //If not add it to the label
    model.sortLabel = prop;
    //Create a new array from the existing one to use in sort
    const newReviews = [...model.reviews];
    sortBy(newReviews, prop, model.headers[prop].sortState);
    updateSortedHeadings();
    renderRows(newReviews, document.querySelector('.wine-reviews tbody'));
    console.log(model)
  };
  thArr.forEach((th, index) => {
    const prop = th.dataset.prop;
    th.addEventListener('click', clickHandler)
  });
}

function updateSortedHeadings() {
  const upArrow = '⭡';
  const downArrow = '⭣';
  document.querySelectorAll('.container thead th').forEach(th => {
    const {prop} = th.dataset;
    if (prop === model.sortLabel) {
      const arrow = model.headers[prop].sortState ? upArrow : downArrow;
      th.innerHTML = model.headers[prop].label + `${arrow}`
    } else {
      th.innerHTML = model.headers[prop].label;
    }
  });
}

// Fire off the init function
(function init() {
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
      postData().then((reviews) => {
          showData(reviews);
          console.log(model);
          renderData();
          sortController(model);
        }
      ).catch((err) => {
        console.log(err)
      });
    }
  });
})();
