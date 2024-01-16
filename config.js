/* global module */

let sources = {
  "js": "/js/",
  "css": "/css/",
  "img": "/img/",
  "fonts": "/fonts/",
  "pages": "/",
  "assets": "/assets/",
  get icon() {
    return `${this.img}svgSprite.svg#`;
  }
}

let paths = {
  "js": "js/",
  "css": "css/",
  "img": "./img/",
  "fonts": "fonts/",
  "pages": "/",
  "assets": "./assets/",
  get icon() {
    return `${this.img}svgSprite.svg#`;
  }
}

let addAdditions = {
  "src/img/**/*.*": sources.img,
  "src/favicon/*.*": sources.img + '/favicon',
  // "node_modules/somePackage/images/*.{png,svg,jpg,jpeg}": "img/",
};

let config = {
  "notGetBlocks": [],
  "ignoredBlocks": [
    "no-js",
  ],
  "alwaysAddBlocks": [],
  "addStyleBefore": [
    "sanitize.css/sanitize.css",
    "sanitize.css/forms.css",
    "sanitize.css/assets.css",
    "sanitize.css/typography.css",
    "sanitize.css/reduce-motion.css",
    "src/scss/variables.scss",
    "src/scss/reboot.scss",
    // "src/scss/mixins.scss",
    // "src/scss/typography.scss",
    // "src/scss/vendor.scss",
    "src/scss/fonts.scss",
    "src/scss/animations.scss"
    // "somePackage/dist/somePackage.css", // для "node_modules/somePackage/dist/somePackage.css",
  ],
  "addStyleAfter": [],
  "addJsBefore": [
    // "somePackage/dist/somePackage.js", // для "node_modules/somePackage/dist/somePackage.js",
  ],
  "addJsAfter": [
    "./script.js",
  ],
  "addAdditions": addAdditions,
  "dir": {
    "src": "src/",
    "data": "src/data/",
    "blocks": "src/blocks/",
    "svgAsBg": "src/symbols/svgAsBg.xml",
    "build": "build/pb_public",
  },
  "sources": sources,
  "paths": paths
};

module.exports = config;
