/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/movie-list/index.js":
/*!****************************************!*\
  !*** ./components/movie-list/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _movie = __webpack_require__(/*! ../movie */ \"./components/movie/index.js\");\n\nvar _movie2 = _interopRequireDefault(_movie);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar MovieList = function () {\n    function MovieList() {\n        _classCallCheck(this, MovieList);\n    }\n\n    _createClass(MovieList, [{\n        key: \"init\",\n        value: function init(data) {\n            this.data = data;\n        }\n    }, {\n        key: \"drawToDOM\",\n        value: function drawToDOM(selector) {\n            this.selector = selector;\n            this.clearList(selector);\n            selector.appendChild(this.fragment);\n        }\n    }, {\n        key: \"renderMovies\",\n        value: function renderMovies(data) {\n            var _this = this;\n\n            this.fragment = document.createDocumentFragment();\n            data.forEach(function (data) {\n                var article = document.createElement(\"article\");\n                article.className = 'movie';\n                article.innerHTML = (0, _movie2.default)(data);\n                _this.fragment.appendChild(article);\n            });\n        }\n    }, {\n        key: \"clearList\",\n        value: function clearList(selector) {\n            selector.innerHTML = '';\n        }\n    }, {\n        key: \"sort\",\n        value: function sort(filter) {\n            if (!this.data) {\n                return;\n            }\n            var data = [].concat(_toConsumableArray(this.data.results));\n\n            if (filter === \"raiting-max\") {\n                this.sortByMaxRaiting(data);\n            }\n            if (filter === \"raiting-min\") {\n                this.sortByMinRaiting(data);\n            }\n            if (filter === \"date-new\") {\n                this.sortByNewDate(data);\n            }\n            if (filter === \"date-old\") {\n                this.sortByOldDate(data);\n            }\n        }\n    }, {\n        key: \"sortByMaxRaiting\",\n        value: function sortByMaxRaiting(data) {\n            data.sort(function (a, b) {\n                return a.popularity < b.popularity ? 1 : -1;\n            });\n            this.renderMovies(data);\n            this.drawToDOM(document.querySelector(\".movies\"));\n        }\n    }, {\n        key: \"sortByMinRaiting\",\n        value: function sortByMinRaiting(data) {\n            data.sort(function (a, b) {\n                return a.popularity > b.popularity ? 1 : -1;\n            });\n            this.renderMovies(data);\n            this.drawToDOM(document.querySelector(\".movies\"));\n        }\n    }, {\n        key: \"sortByNewDate\",\n        value: function sortByNewDate(data) {\n\n            data.sort(function (a, b) {\n                var a_date = new Date(a.release_date || a.first_air_date);\n                var b_date = new Date(b.release_date || b.first_air_date);\n                return a_date < b_date ? 1 : -1;\n            });\n            this.renderMovies(data);\n            this.drawToDOM(document.querySelector(\".movies\"));\n        }\n    }, {\n        key: \"sortByOldDate\",\n        value: function sortByOldDate(data) {\n            data.sort(function (a, b) {\n                var a_date = new Date(a.release_date || a.first_air_date);\n                var b_date = new Date(b.release_date || b.first_air_date);\n                return a_date > b_date ? 1 : -1;\n            });\n            this.renderMovies(data);\n            this.drawToDOM(document.querySelector(\".movies\"));\n            this.renderMovies(data);\n            this.drawToDOM(document.querySelector(\".movies\"));\n        }\n    }, {\n        key: \"hide\",\n        value: function hide() {\n            this.selector.style.display = \"none\";\n        }\n    }]);\n\n    return MovieList;\n}();\n\nexports.default = MovieList;\n\n//# sourceURL=webpack:///./components/movie-list/index.js?");

/***/ }),

/***/ "./components/movie-services.js":
/*!**************************************!*\
  !*** ./components/movie-services.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _config = __webpack_require__(/*! ../config */ \"./config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction getVideoByText(text) {\n    if (!text) {\n        return;\n    }\n    return fetch(_config2.default.searchMovieUrl + text).then(function (r) {\n        return r.json();\n    });\n}\n\nfunction getVideoById(id) {\n    var url = \"\" + _config2.default.baseMovieUrl + _config2.default.queryMovieByIdForSerials + id + _config2.default.apiKey;\n    return fetch(url).then(function (r) {\n        return r.json();\n    });\n}\n\nexports.default = {\n    getVideoByText: getVideoByText,\n    getVideoById: getVideoById\n};\n\n//# sourceURL=webpack:///./components/movie-services.js?");

/***/ }),

/***/ "./components/movie/index.js":
/*!***********************************!*\
  !*** ./components/movie/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = movie;\n\nvar _config = __webpack_require__(/*! ../../config */ \"./config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar formatter = new Intl.DateTimeFormat(\"ru\", {\n    year: \"numeric\",\n    month: \"long\",\n    day: \"numeric\"\n});\n\nfunction movie(data) {\n    var mapData = mappingData(data);\n    var html = \"\\n                <a class='movie__link' href='\" + mapData.id + \"'>\\n                    <div class='movie__poster'><img src='\" + mapData.img + \"'</img></div>\\n                    <div class='movie__content'>        \\n                        <h2 class='movie__title text-center'>\" + mapData.title + \"</h2>\\n                        <date class='movie__date'>\" + mapData.date + \"</date>\\n                        <div class='movie__country'>\" + mapData.country + \"</div>   \\n                        <div class='movie__language'>\" + mapData.language + \"</div>\\n                        <div class='movie__overview '>\" + mapData.overview + \"</div>\\n                        <div class='movie__popularity'>\" + mapData.popularity + \"</div>\\n                    </div>\\n                 </a>\\n    \";\n    return html;\n}\n\nfunction mappingData(data) {\n\n    var defaultValue = 'Unknown';\n    return {\n        title: data.original_name || data.name || data.original_title || data.title || defaultValue,\n        date: getDate(),\n        country: data.origin_country || defaultValue,\n        img: getPictureUrl(),\n        language: data.original_language || defaultValue,\n        overview: data.overview || defaultValue,\n        popularity: data.popularity || defaultValue,\n        id: data.id || Date.now()\n    };\n\n    function getPictureUrl() {\n        var url = data.poster_path || data.backdrop_path;\n        if (url) {\n            return _config2.default.imageSrc + url;\n        } else {\n            return _config2.default.noImageSrc;\n        }\n    }\n\n    function getDate() {\n        var date = data.first_air_date || data.release_date;\n        if (date) {\n            return formatter.format(Date.parse(date));\n        } else {\n            return defaultValue;\n        }\n    }\n}\n\n//# sourceURL=webpack:///./components/movie/index.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar API_KEY = '30c94ae83f75740e876f0072914f1491';\n\nexports.default = {\n    searchMovieUrl: 'https://api.themoviedb.org/3/search/multi?api_key=' + API_KEY + '&query=',\n    imageSrc: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',\n    noImageSrc: 'https://www.freeiconspng.com/uploads/no-image-icon-15.png',\n    baseMovieUrl: 'https://api.themoviedb.org/3/',\n    queryMovieByIdForSerials: 'tv/',\n    queryMovieByIdForMovies: 'movies/',\n    apiKey: '?api_key=' + API_KEY\n};\n\n//# sourceURL=webpack:///./config.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _movieList = __webpack_require__(/*! ./components/movie-list */ \"./components/movie-list/index.js\");\n\nvar _movieList2 = _interopRequireDefault(_movieList);\n\nvar _movieServices = __webpack_require__(/*! ./components/movie-services */ \"./components/movie-services.js\");\n\nvar _movieServices2 = _interopRequireDefault(_movieServices);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar input = document.querySelector('.search-input');\nvar movieList = document.querySelector('.movies');\nvar mList = new _movieList2.default();\nvar filters = document.querySelector(\".filters\");\n\ninput.addEventListener('input', function (e) {\n    var searchText = e.target.value;\n    if (!searchText) {\n        mList.clearList(movieList);\n        return;\n    }\n    _movieServices2.default.getVideoByText(searchText).then(function (data) {\n        mList.init(data);\n        mList.renderMovies(data.results);\n        mList.drawToDOM(movieList);\n    });\n});\nfilters.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n    var target = e.target;\n    var data = target.dataset.filter;\n    if (!data) {\n        return;\n    }\n    mList.sort(data);\n});\n\nmovieList.addEventListener(\"click\", function (e) {\n    e.preventDefault();\n    var target = e.target;\n    var link = target.closest('.movie__link');\n    if (!link) {\n        return;\n    }\n    var id = link.getAttribute(\"href\");\n    _movieServices2.default.getVideoById(id).then(function (data) {\n        console.log(data);\n    });\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });