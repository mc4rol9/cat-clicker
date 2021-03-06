
/* ------ Model ------ */

var model = {
  currentCat: null,
  cats: [
    {
      clickCount: 0,
      name: 'Tai',
      imgSrc: 'assets/images/tai.jpg'
    },
    {
      clickCount: 0,
      name: 'Zuri',
      imgSrc: 'assets/images/zuri.jpg'
    },
    {
      clickCount: 0,
      name: 'Suki',
      imgSrc: 'assets/images/suki.jpg'
    },
    {
      clickCount: 0,
      name: 'Belinha',
      imgSrc: 'assets/images/belinha.jpg'
    },
  ]
};


/* ------ Octopus ------ */

var octopus = {
  init: function() {
    // set current cat to the first one in list
    model.currentCat = model.cats[0];

    // tell views to initialize
    catView.init();
    catListView.init();
    adminView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getAllCats: function() {
    return model.cats;
  },

  // set the selected cat to the object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // increment counter for the selected cat
  addToCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  },

  // open the admin area
  openAdmin: function() {
    var admin = document.getElementById('admin-area');
    // toggle visibility for admin area
    if (admin.style.display === 'none') {
      admin.style.display = 'block';
    } else {
      admin.style.display = 'none';
    }
    adminView.render();
  },

  // change cat's info from admin
  saveChanges: function() {
    this.newName = document.getElementById('catName').value;
    this.newPic = document.getElementById('catPic').value;
    this.newCount = document.getElementById('catCount').value;

    if (this.newName !== '') {
      model.currentCat.name = this.newName;
    }

    if (this.newPic !== '') {
      model.currentCat.imgSrc = this.newPic;
    }

    if (this.newCount !== '') {
      model.currentCat.clickCount = this.newCount;
    }
    
    catView.render();
    catListView.render();
  }
};


/* ------ Views ------ */

/* ---- Cat View ----*/

var catView = {
  init: function() {
    // store pointer to DOM elements for easy access
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-picture');
    this.catCountElem = document.getElementById('cat-click');
    this.adminBtn = document.getElementById('admin');

    // on click increment the counter
    this.catImageElem.addEventListener('click', function(e) {
      octopus.addToCounter();
    });

    // on click show admin area
    this.adminBtn.addEventListener('click', function(e) {
      octopus.openAdmin();
    });

    // update the view
    this.render();
  },

  render: function() {
    // update DOM elements with values from selected cat
    var currentCat = octopus.getCurrentCat();
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
    this.catCountElem.textContent = currentCat.clickCount;
  }
};

/* ---- Cat List View ----*/
var catListView = {
  init: function() {
    // store DOM elements for easy access
    this.catListElem = document.getElementById('cat-list');

    // render/update the view
    this.render();
  },

  render: function() {
    // get the cats to render from octopus
    var cats = octopus.getAllCats();

    // empty the cat list
    this.catListElem.innerHTML = '';

    // loop cats
    for (var i = 0; i < cats.length; i++) {
      // the cat currently looping over
      var cat = cats[i];

      // make cat list item and set its text
      var elem = document.createElement('li');
      elem.setAttribute("class", "list-group-item");
      elem.textContent = cat.name;

      // on click, set current cat and render cat view
      // it must to do this way to event works inside a for loop
      elem.addEventListener('click', (function(cat) {
        return function() {
          octopus.setCurrentCat(cat);
          catView.render();
        };
      })(cat));

      // add element to the list
      this.catListElem.appendChild(elem);
    }; 
  }
};

/* ---- Admin View ----*/
var adminView = {
  init: function() {
     // store pointer to DOM elements for easy access
    this.nameElem = document.getElementById('catName');
    this.urlElem = document.getElementById('catPic');
    this.countElem = document.getElementById('catCount');
    this.saveBtnElem = document.getElementById('save-btn');
    this.cancelBtnElem = document.getElementById('cancel-btn');

    this.render();
  },

  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.nameElem.value = currentCat.name;
    this.urlElem.value = currentCat.imgSrc;
    this.countElem.value = currentCat.clickCount;

    this.saveBtnElem.addEventListener('click', function(e) {
      octopus.saveChanges();
      octopus.openAdmin();
    });
    
    // cancel changes and close admin area
    this.cancelBtnElem.addEventListener('click', function(e) {
      octopus.openAdmin();
    });
  }
};

octopus.init();
