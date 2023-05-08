"use strict";
(self["webpackChunkdenyconformity"] = self["webpackChunkdenyconformity"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _post_list_post_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post-list/post-list.component */ 5657);
/* harmony import */ var _shared_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/const */ 2926);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);





/**
 * Legacy routes:
 *
 * /content/:type > ignore
 *
 * /about > post 427
 * /about/comments > post 427
 *
 * /post/:slug
 * /post/:slug/[next|prev]
 * /post/:slug/comments
 *
 * /id/:slug > /post/:slug
 * /cid/:cid > ignore
 *
 * /tags
 * /tags/:tag
 * /tags/:tag/page/:page
 *
 * /page/:page
 *
 * /post/:slug/gallery
 *
 *
 * legacy query strings:
 * id
 * cid
 * tags
 * page
 * raw
 * srch
 * search
 * com
 */
const routes = [{
  path: 'posts',
  component: _post_list_post_list_component__WEBPACK_IMPORTED_MODULE_0__.PostListComponent
}, {
  path: 'posts/:slug',
  component: _post_list_post_list_component__WEBPACK_IMPORTED_MODULE_0__.PostListComponent
}, {
  // For functionality including next / prev or comments, and book, or gallery
  // modes.
  path: 'posts/:slug/:command',
  component: _post_list_post_list_component__WEBPACK_IMPORTED_MODULE_0__.PostListComponent
}, {
  // Show a list of the posts for a series.
  path: 'series/:seriesSlug',
  component: _post_list_post_list_component__WEBPACK_IMPORTED_MODULE_0__.PostListComponent
}, {
  path: 'about',
  redirectTo: _shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX + '/about-denyconformitycom'
}, {
  // Legacy URLs from the 2012 version of the site.
  path: 'post/:slug',
  redirectTo: _shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX + '/:slug',
  pathMatch: 'full'
}, {
  path: 'post/:slug/:command',
  redirectTo: _shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX + '/:slug/:command',
  pathMatch: 'full'
}, {
  path: 'id/:slug',
  redirectTo: _shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX + '/:slug',
  pathMatch: 'full'
}, {
  // For a hot minute I considered p instead of posts.
  path: 'p/:slug',
  redirectTo: _shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX + '/:slug',
  pathMatch: 'full'
}, {
  path: '',
  redirectTo: _shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX,
  pathMatch: 'full'
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes, {}), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 6312);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 4398);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/post.service */ 9166);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 6679);






const _c0 = ["bgImage"];
const _c1 = ["logo"];
const SCROLL_POS_WHEN_BG_GONE = 500;
const BG_PARALLAX_POS = SCROLL_POS_WHEN_BG_GONE * .125;
const BG_STARTING_OPACITY = .4;
class AppComponent {
  constructor(postService, location) {
    this.postService = postService;
    this.location = location;
    this.year = new Date().getFullYear();
    (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(window, 'scroll').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.throttleTime)(33), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(e => {
      return window.scrollY;
    })).subscribe(pos => {
      // This timeout should make scrolling a bit smoother.
      setTimeout(() => {
        const ratio = pos / SCROLL_POS_WHEN_BG_GONE;
        const bgPos = -(BG_PARALLAX_POS * ratio);
        const opacity = BG_STARTING_OPACITY - BG_STARTING_OPACITY * ratio;
        if (this.bgImage) {
          this.bgImage.nativeElement.style.top = bgPos + 'px';
          this.bgImage.nativeElement.style.opacity = String(opacity);
        }
        if (this.logoImage) {
          this.logoImage.nativeElement.style.top = bgPos + 'px';
        }
      });
    });
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_post_service__WEBPACK_IMPORTED_MODULE_0__.PostService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_5__.Location));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    viewQuery: function AppComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.bgImage = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.logoImage = _t.first);
      }
    },
    decls: 14,
    vars: 1,
    consts: [[1, "bg-image"], ["src", "https://storage.cloud.google.com/denyconformity_assets/backgrounds/2020_1.jpg"], ["bgImage", ""], [1, "logo"], ["src", "https://storage.cloud.google.com/denyconformity_assets/111webassets/2020_logo.png"], ["logo", ""], [1, "flag"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "img", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "footer")(8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Created by Siobhan McGill");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u00A9 ", ctx.year, " DenyConformity.com");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet],
    styles: ["[_nghost-%COMP%] {\n  display: block;\n  min-height: 100%;\n  width: 100%;\n  padding-bottom: 2rem;\n  box-sizing: border-box;\n  position: relative;\n  box-shadow: 1px 2px 5rem rgba(77, 38, 0, 0.45) inset;\n}\n\n.bg-image[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 1;\n  top: 0;\n}\n.bg-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 125vw;\n  margin-left: 50vw;\n  transition: top 100ms, opacity 100ms;\n  opacity: 0.4;\n  transform: translateX(-50%);\n  position: relative;\n  -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);\n          mask-image: linear-gradient(to bottom, black 55%, transparent 100%);\n}\n@media only screen and (max-width: 500px) {\n  .bg-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    min-width: 700px;\n  }\n}\n\n.logo[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 2;\n  top: 2rem;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n}\n.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 19vw;\n  opacity: 0.1;\n  position: relative;\n}\n\nfooter[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  display: flex;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\nfooter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 33%;\n}\nfooter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  text-align: center;\n}\nfooter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) {\n  text-align: right;\n}\nfooter[_ngcontent-%COMP%]   .flag[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1rem;\n  display: inline-block;\n  \n  background: #55cdfc;   \n  background: linear-gradient(to bottom, #55cdfc 20%, #f7a8b8 21%, #f7a8b8 40%, #f4f4f4 41%, #f4f4f4 59%, #f7a8b8 60%, #f7a8b8 79%, #55cdfc 80%); \n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\"#55cdfc\", endColorstr=\"#55cdfc\",GradientType=0 ); \n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX3ZhcnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztDQUFBO0FDRUE7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esb0JBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBRUEsb0RBQUE7QUFhRjs7QUFWQTtFQUNFLGVBQUE7RUFDQSxVQUFBO0VBQ0EsTUFBQTtBQWFGO0FBWEU7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQ0FBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0VBRUEsMkVBQUE7VUFBQSxtRUFBQTtBQVlKO0FBVkk7RUFWRjtJQVdJLGdCQUFBO0VBYUo7QUFDRjs7QUFUQTtFQUNFLGVBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBWUY7QUFWRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFZSjs7QUFQQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0FBVUY7QUFSRTtFQUNFLFVBQUE7QUFVSjtBQVJJO0VBQ0Usa0JBQUE7QUFVTjtBQVJJO0VBQ0UsaUJBQUE7QUFVTjtBQU5FO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUVBLDZLQUFBO0VBQ0EsbUJBQUEsRUFBQSxpQkFBQSxFQUNBLGFBQUEsRUFDQSw0QkFBQTtFQUNBLDhJQUFBLEVBQUEscURBQUE7RUFDQSxtSEFBQSxFQUFBLFVBQUE7QUFPSiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5PRkZJQ0lBTCBERU5ZQ09ORk9STUlUWS5DT00gQ09MT1IgUEFMTEVUVEVERVRFXG5cbkNPTE9SXHRcdFJFU1RJTkdcdFx0QUNUSVZFXG5cbkJMVUVcdFx0IzAwNjZGRlx0XHQjNjY5OUZGXG5SRURcdFx0XHQjY2MwMDAwXHRcdCNmZjY2NjZcbllFTExPV1x0XHQjZmZjYzAwXHRcdCNmZmZmOTlcbkdSRUVOXHRcdCMwMDY2MDBcdFx0IzAzOTExNFxuUFVSUExFXHRcdCM2NjMzOTlcdFx0Izk5MzNjY1xuR1JFWVx0XHQjNDA0MDQwXHRcdCM2NjY2NjZcblxuT1JBTkdFXHRcdCNmZjY2MDBcdFx0I2ZmOTkzM1xuXG4qL1xuJGRjLWJsdWU6ICMwMDY2RkY7XG4kZGMtcmVkOiAjQ0MwMDAwO1xuJGRjLXllbGxvdzogI0ZGQ0MwMDtcbiRkYy1ncmVlbjogIzAwNjYwMDtcbiRkYy1wdXJwbGU6ICM2NjMzOTk7XG4kZGMtZ3JleTogIzQwNDA0MDtcbiRkYy1vcmFuZ2U6ICNmNjA7XG5cbiRzaGFkb3ctY29sb3I6IHJnYmEoMCwwLDAsMC4xMik7XG5cbiRjYXJkLXNoYWRvdzogMHB4IDVweCA1cHggLTNweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAwcHggOHB4IDEwcHggMXB4ICRzaGFkb3ctY29sb3IsXG4gICAgICAgICAgICAgIDBweCAzcHggMTRweCAycHggJHNoYWRvdy1jb2xvcjtcblxuJGNhcmQtcXVpZXQtc2hhZG93OiAwcHggMnB4IDFweCAtMXB4ICRzaGFkb3ctY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIDBweCAxcHggMXB4IDBweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAwcHggMXB4IDNweCAwcHggJHNoYWRvdy1jb2xvcjtcblxuLy8gbWVkaWEgcXVlcnkgbmFtZXNcbiRtZWRpYS1tb2JpbGU6IFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KVwiO1xuXG4kY29sb3ItaGlnaGxpZ2h0OiByZ2JhKDI1NSwgMjQzLCAyMzAsIDAuNSk7XG4kY29sb3Itc2hhZG93OiByZ2JhKDc3LCAzOCwgMCwgMC40KTtcbiRjb2xvci10ZXh0OiAjMTExO1xuXG5AbWl4aW4gZm9udCB7XG4gIGZvbnQtZmFtaWx5OiBcIkNvcm1vcmFudCBHYXJhbW9uZFwiLCBzZXJpZjtcbn1cblxuQG1peGluIGZvbnQtdGl0bGUge1xuICBmb250LWZhbWlseTogXCJMb3ZlcnMgUXVhcnJlbFwiLCBjdXJzaXZlO1xufVxuXG5AbWl4aW4gZm9udC1zdWJ0aXRsZSB7XG4gIGZvbnQtZmFtaWx5OiBcIlBsYXlmYWlyIERpc3BsYXlcIiwgc2VyaWY7XG59XG4iLCJAaW1wb3J0IFwiLi4vc3R5bGVzL3ZhcnNcIjtcblxuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmctYm90dG9tOiAycmVtO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgYm94LXNoYWRvdzogMXB4IDJweCA1cmVtIHJnYmEoNzcsIDM4LCAwLCAwLjQ1KSBpbnNldDtcbn1cblxuLmJnLWltYWdlIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxO1xuICB0b3A6IDA7XG5cbiAgaW1nIHtcbiAgICB3aWR0aDogMTI1dnc7XG4gICAgbWFyZ2luLWxlZnQ6IDUwdnc7XG4gICAgdHJhbnNpdGlvbjogdG9wIDEwMG1zLCBvcGFjaXR5IDEwMG1zO1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgbWFzay1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgYmxhY2sgNTUlLCB0cmFuc3BhcmVudCAxMDAlKTtcblxuICAgIEBtZWRpYSAjeyRtZWRpYS1tb2JpbGV9IHtcbiAgICAgIG1pbi13aWR0aDogNzAwcHg7XG4gICAgfVxuICB9XG59XG5cbi5sb2dvIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAyO1xuICB0b3A6IDJyZW07XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICBpbWcge1xuICAgIHdpZHRoOiAxOXZ3O1xuICAgIG9wYWNpdHk6IDAuMTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgfVxufVxuXG5mb290ZXIge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG5cbiAgc3BhbiB7XG4gICAgd2lkdGg6IDMzJTtcblxuICAgICY6bnRoLWNoaWxkKDIpIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgJjpudGgtY2hpbGQoMykge1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgfVxuICB9XG5cbiAgLmZsYWcge1xuICAgIHdpZHRoOiAxLjVyZW07XG4gICAgaGVpZ2h0OiAxcmVtO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgIC8qIFBlcm1hbGluayAtIHVzZSB0byBlZGl0IGFuZCBzaGFyZSB0aGlzIGdyYWRpZW50OiBodHRwczovL2NvbG9yemlsbGEuY29tL2dyYWRpZW50LWVkaXRvci8jNTVjZGZjKzIwLGY3YThiOCsyMSxmN2E4YjgrNDAsZjRmNGY0KzQxLGY0ZjRmNCs1OSxmN2E4YjgrNjAsZjdhOGI4Kzc5LDU1Y2RmYys4MCAqL1xuICAgIGJhY2tncm91bmQ6ICM1NWNkZmM7IC8qIE9sZCBicm93c2VycyAqL1xuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgICM1NWNkZmMgMjAlLCAjZjdhOGI4IDIxJSwgI2Y3YThiOCA0MCUsICNmNGY0ZjQgNDElLCAjZjRmNGY0IDU5JSwgI2Y3YThiOCA2MCUsICNmN2E4YjggNzklLCAjNTVjZGZjIDgwJSk7IC8qIEZGMy42LTE1ICovXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAgIzU1Y2RmYyAyMCUsI2Y3YThiOCAyMSUsI2Y3YThiOCA0MCUsI2Y0ZjRmNCA0MSUsI2Y0ZjRmNCA1OSUsI2Y3YThiOCA2MCUsI2Y3YThiOCA3OSUsIzU1Y2RmYyA4MCUpOyAvKiBDaHJvbWUxMC0yNSxTYWZhcmk1LjEtNiAqL1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICAjNTVjZGZjIDIwJSwjZjdhOGI4IDIxJSwjZjdhOGI4IDQwJSwjZjRmNGY0IDQxJSwjZjRmNGY0IDU5JSwjZjdhOGI4IDYwJSwjZjdhOGI4IDc5JSwjNTVjZGZjIDgwJSk7IC8qIFczQywgSUUxMCssIEZGMTYrLCBDaHJvbWUyNissIE9wZXJhMTIrLCBTYWZhcmk3KyAqL1xuICAgIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KCBzdGFydENvbG9yc3RyPScjNTVjZGZjJywgZW5kQ29sb3JzdHI9JyM1NWNkZmMnLEdyYWRpZW50VHlwZT0wICk7IC8qIElFNi05ICovXG5cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 3765);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ 2512);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ 9240);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _post_list_post_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post-list/post-list.component */ 5657);
/* harmony import */ var _post_series_post_series_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./post-series/post-series.component */ 692);
/* harmony import */ var _post_post_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./post/post.component */ 3837);
/* harmony import */ var _services_csrf_interceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/csrf.interceptor */ 746);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/shared.module */ 4466);
/* harmony import */ var _read_post_read_post_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./read-post/read-post.component */ 1580);
/* harmony import */ var _post_survey_post_survey_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./post-survey/post-survey.component */ 3772);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 6839);















class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HTTP_INTERCEPTORS,
      useClass: _services_csrf_interceptor__WEBPACK_IMPORTED_MODULE_5__.CsrfInterceptor,
      multi: true
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.BrowserAnimationsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.ReactiveFormsModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__.SharedModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _post_post_component__WEBPACK_IMPORTED_MODULE_4__.PostComponent, _post_list_post_list_component__WEBPACK_IMPORTED_MODULE_2__.PostListComponent, _post_series_post_series_component__WEBPACK_IMPORTED_MODULE_3__.PostSeriesComponent, _read_post_read_post_component__WEBPACK_IMPORTED_MODULE_7__.ReadPostComponent, _post_survey_post_survey_component__WEBPACK_IMPORTED_MODULE_8__.PostSurveyComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.BrowserAnimationsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClientXsrfModule, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.ReactiveFormsModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__.SharedModule]
  });
})();

/***/ }),

/***/ 5657:
/*!**************************************************!*\
  !*** ./src/app/post-list/post-list.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostListComponent": () => (/* binding */ PostListComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 4505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 9193);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 9095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 8759);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 9128);
/* harmony import */ var _shared_anim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/anim */ 554);
/* harmony import */ var _shared_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/const */ 2926);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _services_post_list_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/post-list-state.service */ 3173);
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/post.service */ 9166);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 6679);
/* harmony import */ var _shared_markdown_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/markdown-service.service */ 1937);
/* harmony import */ var _shared_scroll_tracker_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/scroll-tracker.directive */ 8382);
/* harmony import */ var _shared_unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/unsafe-inner-html.directive */ 5904);
/* harmony import */ var _post_post_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../post/post.component */ 3837);
/* harmony import */ var _post_series_post_series_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../post-series/post-series.component */ 692);
/* harmony import */ var _read_post_read_post_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../read-post/read-post.component */ 1580);















function PostListComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 7)(1, "h1", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function PostListComponent_div_0_Template_h1_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r6.home());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "DenyConformity.com");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("@postTitle", undefined);
  }
}
function PostListComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 9)(1, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "DenyConformity.com");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "div", 11)(5, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, "a very interesting website place.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("@title", undefined);
  }
}
function PostListComponent_div_5_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 18)(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "span", 19)(6, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const listItem_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("@title", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](listItem_r11.series.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](listItem_r11.series.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", listItem_r11.series.posts.length, " posts");
  }
}
function PostListComponent_div_5_ng_container_1_app_post_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "app-post", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function PostListComponent_div_5_ng_container_1_app_post_2_Template_app_post_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18);
      const listItem_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().ngIf;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r16.selectPost($event, listItem_r11.post));
    })("mousedown", function PostListComponent_div_5_ng_container_1_app_post_2_Template_app_post_mousedown_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18);
      const listItem_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().ngIf;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r19.postMouseDown($event, listItem_r11.post));
    })("mouseup", function PostListComponent_div_5_ng_container_1_app_post_2_Template_app_post_mouseup_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18);
      const listItem_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().ngIf;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r21.postMouseUp($event, listItem_r11.post));
    })("read", function PostListComponent_div_5_ng_container_1_app_post_2_Template_app_post_read_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r23.openPostToRead($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const listItem_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("post", listItem_r11.post)("@post", undefined);
  }
}
function PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 31)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const link_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](link_r30.description);
  }
}
function PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "div", 32);
  }
  if (rf & 2) {
    const link_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("unsafeInnerHTML", ctx_r33.renderLinkSummary(link_r30));
  }
}
function PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_Template_div_click_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r37);
      const link_r30 = restoredCtx.$implicit;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r36.selectPost($event, link_r30));
    })("mousedown", function PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_Template_div_mousedown_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r37);
      const link_r30 = restoredCtx.$implicit;
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r38.postMouseDown($event, link_r30));
    })("mouseup", function PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_Template_div_mouseup_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r37);
      const link_r30 = restoredCtx.$implicit;
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r39.postMouseUp($event, link_r30));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](3, "h2", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_div_4_Template, 3, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_div_5_Template, 1, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const link_r30 = ctx.$implicit;
    const i_r31 = ctx.index;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](5);
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("@post", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("something ", ctx_r29.linkyTitles[i_r31], "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("innerHtml", (tmp_1_0 = link_r30.title) !== null && tmp_1_0 !== undefined ? tmp_1_0 : link_r30.name, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", link_r30.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", link_r30.summary);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", link_r30.summary ? "from" : "updated", " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 7, link_r30.time), "");
  }
}
function PostListComponent_div_5_ng_container_1_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, PostListComponent_div_5_ng_container_1_div_3_div_1_div_1_Template, 9, 9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const links_r28 = ctx.ngIf;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("@post", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", links_r28)("ngForTrackBy", ctx_r25.linkiesTrackBy);
  }
}
function PostListComponent_div_5_ng_container_1_div_3_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "h3", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "loading quick links");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function PostListComponent_div_5_ng_container_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, PostListComponent_div_5_ng_container_1_div_3_div_1_Template, 2, 3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, PostListComponent_div_5_ng_container_1_div_3_ng_template_3_Template, 2, 0, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](4);
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 2, ctx_r14.linkies$))("ngIfElse", _r26);
  }
}
function PostListComponent_div_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, PostListComponent_div_5_ng_container_1_div_1_Template, 8, 4, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, PostListComponent_div_5_ng_container_1_app_post_2_Template, 1, 2, "app-post", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, PostListComponent_div_5_ng_container_1_div_3_Template, 5, 4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const listItem_r11 = ctx.ngIf;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItem_r11.series);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItem_r11.post);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItem_r11.post && !ctx_r9.isPostSelected());
  }
}
function PostListComponent_div_5_ng_container_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 18)(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "span", 19)(6, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const listItem_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("@title", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](listItem_r40.series.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](listItem_r40.series.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", listItem_r40.series.posts.length, " posts");
  }
}
function PostListComponent_div_5_ng_container_2_app_post_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "app-post", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function PostListComponent_div_5_ng_container_2_app_post_2_Template_app_post_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r50);
      const listItem_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r48.selectPost($event, listItem_r40.post));
    })("mousedown", function PostListComponent_div_5_ng_container_2_app_post_2_Template_app_post_mousedown_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r50);
      const listItem_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r51.postMouseDown($event, listItem_r40.post));
    })("mouseup", function PostListComponent_div_5_ng_container_2_app_post_2_Template_app_post_mouseup_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r50);
      const listItem_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r53.postMouseUp($event, listItem_r40.post));
    })("read", function PostListComponent_div_5_ng_container_2_app_post_2_Template_app_post_read_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r50);
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r55.openPostToRead($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const listItem_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("post", listItem_r40.post)("@post", undefined);
  }
}
function PostListComponent_div_5_ng_container_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("appear", function PostListComponent_div_5_ng_container_2_span_3_Template_span_appear_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r58);
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r57.fetchNextPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " Loading more . . . ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function PostListComponent_div_5_ng_container_2_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " Loading similar posts . . . ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function PostListComponent_div_5_ng_container_2_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 39)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, "Some other content that may or may not be relevant:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
}
function PostListComponent_div_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, PostListComponent_div_5_ng_container_2_div_1_Template, 8, 4, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, PostListComponent_div_5_ng_container_2_app_post_2_Template, 1, 2, "app-post", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, PostListComponent_div_5_ng_container_2_span_3_Template, 2, 0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, PostListComponent_div_5_ng_container_2_span_4_Template, 2, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, PostListComponent_div_5_ng_container_2_div_5_Template, 3, 0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const listItem_r40 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItem_r40.series);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItem_r40.post);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItem_r40.type === "loadmore");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItem_r40.type === "similars_loading");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItem_r40.type === "similar_heading");
  }
}
function PostListComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, PostListComponent_div_5_ng_container_1_Template, 4, 3, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, PostListComponent_div_5_ng_container_2_Template, 6, 5, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const listItems_r8 = ctx.ngIf;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", listItems_r8[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", listItems_r8.slice(1))("ngForTrackBy", ctx_r2.listItemTrackBy);
  }
}
function PostListComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " Loading . . . ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function PostListComponent_app_read_post_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "app-read-post", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("close", function PostListComponent_app_read_post_9_Template_app_read_post_close_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r60);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r59.closePostToRead());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("post", ctx_r5.postToRead);
  }
}
/**
 *  We can make a custom right click menu for posts, to copy url, open
 * in a new tab, etc. Also it should be possible to manually create a method of
 * "ctrl + click" to open a post in a new tab.
 *
 * -Siobhan
 */
/** Shows a list of posts, as determined by the PostListState service. */
class PostListComponent {
  isPostSelected() {
    return !!this.service.selectedPostId;
  }
  constructor(service, postService, location, route, markdownService) {
    this.service = service;
    this.postService = postService;
    this.location = location;
    this.route = route;
    this.markdownService = markdownService;
    this.isLoading = true;
    this.posts$ = this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.switchMap)(params => {
      this.isLoading = true;
      let slug = null;
      let seriesSlug = null;
      if (params && (params.slug || params.post)) {
        slug = params.slug || params.post;
      } else if (params && params.seriesSlug) {
        seriesSlug = params.seriesSlug;
      }
      return this.service.init(slug, seriesSlug);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.tap)(l => {
      this.isLoading = !!l;
    }));
    this.tripleMoon$ = this.postService.getTripleMoon();
    this.randomComedy$ = this.postService.getRandomPostByTag('comedy');
    this.randomOther$ = this.postService.getRandomPostByTag('fiction');
    this.linkyTitles = ['hot', 'funny', 'else'];
    this.reloadLinkies$ = new rxjs__WEBPACK_IMPORTED_MODULE_13__.BehaviorSubject(true);
    this.linkies$ = this.reloadLinkies$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.switchMap)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.combineLatest)([this.tripleMoon$, this.randomComedy$, this.randomOther$])), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.shareReplay)({
      refCount: true,
      bufferSize: 1
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.tap)(() => {
      setTimeout(() => {
        this.refreshLinks();
      }, 20000);
    }));
  }
  refreshLinks() {
    this.reloadLinkies$.next(true);
  }
  linkiesTrackBy(i) {
    return i;
  }
  renderLinkSummary(post) {
    const html = this.markdownService.renderPostText(post, 'summary');
    return html.replace(/<img(.*)>/gi, '[Image]');
  }
  fetchNextPage() {
    this.isLoading = true;
    this.service.nextPage();
  }
  getPostOrSeriesUrl(item) {
    if (item.description) {
      const series = item;
      return `${_shared_const__WEBPACK_IMPORTED_MODULE_1__.SERIES_PREFIX}/${series.slug}`;
    } else {
      const post = item;
      if (this.service.selectedPostId !== post.id) {
        return `${_shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX}/${post.slug}`;
      }
    }
    return '';
  }
  selectPost(event, item) {
    const url = this.getPostOrSeriesUrl(item);
    if (url) {
      this.location.go(url);
    }
  }
  postMouseDown(event, item) {
    // Prevent middle clicks on posts from doing the little scroll thingie.
    if (event.which === 2) {
      event.stopPropagation();
      return false;
    }
  }
  postMouseUp(event, item) {
    // On middle click, open the post in a new tab.
    if (event.which === 2) {
      event.stopPropagation();
      const url = this.getPostOrSeriesUrl(item);
      if (url) {
        window.open(url);
      }
      return false;
    }
  }
  home() {
    this.location.go(_shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX);
  }
  listItemTrackBy(index, item) {
    if (item.post) {
      return 'post' + item.post.id;
    } else if (item.series) {
      return 'series' + item.series.id;
    } else if (item.type === 'loadmore') {
      return 'load-page-' + item.page;
    } else {
      return item.type;
    }
  }
  openPostToRead(post) {
    this.postToRead = post;
  }
  closePostToRead() {
    this.postToRead = null;
  }
  static #_ = this.ɵfac = function PostListComponent_Factory(t) {
    return new (t || PostListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_post_list_state_service__WEBPACK_IMPORTED_MODULE_2__.PostListStateService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_post_service__WEBPACK_IMPORTED_MODULE_3__.PostService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_16__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_17__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_markdown_service_service__WEBPACK_IMPORTED_MODULE_4__.MarkdownServiceService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
    type: PostListComponent,
    selectors: [["app-post-list"]],
    decls: 10,
    vars: 7,
    consts: [["class", "post-page-title", 4, "ngIf"], [1, "spacer"], [1, "content"], ["class", "title", 4, "ngIf"], ["class", "post-list", 4, "ngIf", "ngIfElse"], ["loading", ""], [3, "post", "close", 4, "ngIf"], [1, "post-page-title"], [3, "click"], [1, "title"], [1, "subtitle"], [1, "hr"], [1, "post-list"], [4, "ngIf"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "series-summary", 4, "ngIf"], [3, "post", "click", "mousedown", "mouseup", "read", 4, "ngIf"], ["class", "quick-links", 4, "ngIf"], [1, "series-summary"], [1, "entry-count"], [3, "post", "click", "mousedown", "mouseup", "read"], [1, "quick-links"], ["class", "link-wrapper", 4, "ngIf", "ngIfElse"], ["loadingLinks", ""], [1, "link-wrapper"], ["class", "link", 3, "click", "mousedown", "mouseup", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "link", 3, "click", "mousedown", "mouseup"], [3, "innerHtml"], ["class", "link-summary", 4, "ngIf"], ["class", "link-summary", 3, "unsafeInnerHTML", 4, "ngIf"], [1, "date"], [1, "link-summary"], [1, "link-summary", 3, "unsafeInnerHTML"], [1, "heading"], ["class", "scroll-tracker loading", 3, "scrollTracker", "appear", 4, "ngIf"], ["class", "loading", 4, "ngIf"], ["class", "similar-heading", 4, "ngIf"], [1, "scroll-tracker", "loading", 3, "scrollTracker", "appear"], [1, "loading"], [1, "similar-heading"], [3, "post", "close"]],
    template: function PostListComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, PostListComponent_div_0_Template, 3, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "app-post-series")(2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, PostListComponent_div_4_Template, 8, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, PostListComponent_div_5_Template, 3, 3, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, PostListComponent_ng_template_7_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](9, PostListComponent_app_read_post_9_Template, 1, 1, "app-read-post", 6);
      }
      if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.isPostSelected());
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.isPostSelected());
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](6, 5, ctx.posts$))("ngIfElse", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.postToRead);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _shared_scroll_tracker_directive__WEBPACK_IMPORTED_MODULE_5__.ScrollTrackerDirective, _shared_unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_6__.UnsafeInnerHTMLDirective, _post_post_component__WEBPACK_IMPORTED_MODULE_7__.PostComponent, _post_series_post_series_component__WEBPACK_IMPORTED_MODULE_8__.PostSeriesComponent, _read_post_read_post_component__WEBPACK_IMPORTED_MODULE_9__.ReadPostComponent, _angular_common__WEBPACK_IMPORTED_MODULE_16__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DatePipe],
    styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.spacer[_ngcontent-%COMP%] {\n  height: calc(50vh - 10rem);\n}\n\n.title[_ngcontent-%COMP%] {\n  padding: 2rem 0 3rem 0;\n  text-align: center;\n  overflow: hidden;\n}\n.title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 6rem;\n  text-shadow: -1px -1px 0px rgba(77, 38, 0, 0.4), 1px 1px 0px rgba(255, 243, 230, 0.5);\n  margin-bottom: -19px;\n  color: #111;\n}\n.title[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n.title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-style: italic;\n  color: #111;\n}\n.title[_ngcontent-%COMP%]   .hr[_ngcontent-%COMP%] {\n  width: 200px;\n  margin-top: 8px;\n  border-color: rgba(77, 38, 0, 0.4) rgba(255, 243, 230, 0.5) rgba(255, 243, 230, 0.5) rgba(77, 38, 0, 0.4);\n  border-width: 1px;\n  border-style: solid;\n}\n.title[_ngcontent-%COMP%]   .hr[_ngcontent-%COMP%]:nth-child(2) {\n  margin-left: 61px;\n  width: 180px;\n  margin-right: 66px;\n}\n@media only screen and (max-width: 500px) {\n  .title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 4.5rem;\n    margin-bottom: 0;\n  }\n  .title[_ngcontent-%COMP%]   .hr[_ngcontent-%COMP%] {\n    order: 1;\n    margin: 0;\n    width: auto;\n    flex-grow: 1;\n  }\n  .title[_ngcontent-%COMP%]   .hr[_ngcontent-%COMP%]:nth-child(2) {\n    order: 3;\n    width: auto;\n    margin: 0;\n    flex-grow: 1;\n  }\n  .title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    order: 2;\n    margin: 0 1rem;\n  }\n}\n\n.loading[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n  font-size: 1.25rem;\n}\n\n.similar-heading[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  margin-bottom: 1rem;\n}\n\n.post-page-title[_ngcontent-%COMP%] {\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 3;\n  padding: 0.5rem 2rem;\n}\n.post-page-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  text-shadow: -1px -1px 0px rgba(77, 38, 0, 0.4), 1px 1px 0px rgba(255, 243, 230, 0.5);\n  cursor: pointer;\n}\n@media only screen and (max-width: 500px) {\n  .post-page-title[_ngcontent-%COMP%] {\n    left: 0;\n    text-align: center;\n  }\n}\n\nh3.heading[_ngcontent-%COMP%] {\n  font-style: italic;\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n  font-style: italic;\n}\n\n.quick-links[_ngcontent-%COMP%] {\n  margin-bottom: 5rem;\n  margin-top: -2rem;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n  flex-grow: 1;\n  width: 33%;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]:first-child {\n  border-left: none;\n  padding-left: 0;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n  padding-right: 0;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-style: italic;\n  min-height: 40px;\n  display: flex;\n  align-items: center;\n  margin: 0.5rem 0;\n  min-width: 0;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]   .link-summary[_ngcontent-%COMP%] {\n  height: 60px;\n  overflow: hidden;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%] {\n  display: block;\n  text-align: right;\n  font-style: italic;\n  font-size: 1rem;\n  margin-top: 0.25rem;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 0.5rem;\n}\n.quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-size: 1.5rem;\n  font-style: italic;\n  color: #111;\n  text-shadow: -1px -1px 0px rgba(77, 38, 0, 0.4), 1px 1px 0px rgba(255, 243, 230, 0.5);\n}\n@media only screen and (max-width: 500px) {\n  .quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 1rem;\n  }\n  .quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]:first-child {\n    width: 100%;\n    padding: 0;\n  }\n  .quick-links[_ngcontent-%COMP%]   .link-wrapper[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n}\n\napp-post-series[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 100%;\n  z-index: 2;\n}\n@media only screen and (max-width: 500px) {\n  app-post-series[_ngcontent-%COMP%] {\n    top: 4rem;\n    left: 1rem;\n    right: 1rem;\n    transform: none;\n    width: auto;\n    display: none;\n  }\n}\n\n.post-list[_ngcontent-%COMP%] {\n  padding: 1rem 3rem;\n  max-width: 700px;\n  margin: 0 auto;\n}\n@media only screen and (max-width: 500px) {\n  .post-list[_ngcontent-%COMP%] {\n    padding: 1rem 2rem;\n  }\n}\n\n.series-summary[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.series-summary[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-style: italic;\n}\n.series-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.series-summary[_ngcontent-%COMP%]   .entry-count[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  display: flex;\n  justify-content: center;\n  position: relative;\n}\n.series-summary[_ngcontent-%COMP%]   .entry-count[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n}\n.series-summary[_ngcontent-%COMP%]   .entry-count[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]::before, .series-summary[_ngcontent-%COMP%]   .entry-count[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]::after {\n  border-color: rgba(77, 38, 0, 0.4) rgba(255, 243, 230, 0.5) rgba(255, 243, 230, 0.5) rgba(77, 38, 0, 0.4);\n  border-width: 1px;\n  border-style: solid;\n  position: absolute;\n  content: \"\";\n  right: 100%;\n  width: 4rem;\n  top: 65%;\n}\n.series-summary[_ngcontent-%COMP%]   .entry-count[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]::after {\n  right: auto;\n  left: 100%;\n}\n\napp-post[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 5rem;\n}\n\n.scroll-tracker[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX3ZhcnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvcG9zdC1saXN0L3Bvc3QtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Q0FBQTtBQ0VBO0VBQ0UsY0FBQTtBQWNGOztBQVhBO0VBQ0UsMEJBQUE7QUFjRjs7QUFYQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQWNGO0FBWkU7RUFDRSxlQUFBO0VBQ0EscUZBQUE7RUFDQSxvQkFBQTtFQUNBLFdEbUJTO0FDTGI7QUFYRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFhSjtBQVZFO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdETVM7QUNNYjtBQVRFO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSx5R0FBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFXSjtBQVRJO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUFXTjtBQVBFO0VBQ0U7SUFDRSxpQkFBQTtJQUNBLGdCQUFBO0VBU0o7RUFORTtJQUNFLFFBQUE7SUFDQSxTQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7RUFRSjtFQU5JO0lBQ0UsUUFBQTtJQUNBLFdBQUE7SUFDQSxTQUFBO0lBQ0EsWUFBQTtFQVFOO0VBSkU7SUFDRSxRQUFBO0lBQ0EsY0FBQTtFQU1KO0FBQ0Y7O0FBRkE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQUtGOztBQUZBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQUtGOztBQUZBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLG9CQUFBO0FBS0Y7QUFIRTtFQUNFLGVBQUE7RUFDQSxxRkFBQTtFQUNBLGVBQUE7QUFLSjtBQUZFO0VBZEY7SUFlSSxPQUFBO0lBQ0Esa0JBQUE7RUFLRjtBQUNGOztBQUZBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFLRjs7QUFGQTtFQUNJLG1CQUFBO0VBQ0EsaUJBQUE7QUFLSjtBQUhFO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBS0o7QUFISTtFQUdFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtBQUdOO0FBRE07RUFDRSxpQkFBQTtFQUNBLGVBQUE7QUFHUjtBQUFNO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtBQUVSO0FBQ007RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7QUFDUjtBQUVNO0VBQ0UsZUFBQTtBQUFSO0FBR007RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUFEUjtBQUlNO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFGUjtBQU1JO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFKTjtBQU1NO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXRDVJSztFQzZJTCxxRkFBQTtBQUpSO0FBUUk7RUFqRUY7SUFrRUksZUFBQTtJQUNBLFNBQUE7RUFMSjtFQU9JO0lBQ0UsV0FBQTtJQUNBLFVBQUE7RUFMTjtFQU9JO0lBQ0UsVUFBQTtFQUxOO0FBQ0Y7O0FBVUE7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBQVBGO0FBU0U7RUFSRjtJQVNJLFNBQUE7SUFDQSxVQUFBO0lBQ0EsV0FBQTtJQUNBLGVBQUE7SUFDQSxXQUFBO0lBRUEsYUFBQTtFQVBGO0FBQ0Y7O0FBVUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQVBGO0FBU0U7RUFMRjtJQU1JLGtCQUFBO0VBTkY7QUFDRjs7QUFTQTtFQUNFLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQU5GO0FBUUU7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUFOSjtBQVNFO0VBQ0UsaUJBQUE7QUFQSjtBQVVFO0VBQ0UsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQVJKO0FBVUk7RUFDRSxlQUFBO0FBUk47QUFVTTtFQUVFLHlHQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtBQVRSO0FBWU07RUFDRSxXQUFBO0VBQ0EsVUFBQTtBQVZSOztBQWdCQTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBQWJGOztBQWdCQTtFQUNFLG1CQUFBO0FBYkYiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuT0ZGSUNJQUwgREVOWUNPTkZPUk1JVFkuQ09NIENPTE9SIFBBTExFVFRFREVURVxuXG5DT0xPUlx0XHRSRVNUSU5HXHRcdEFDVElWRVxuXG5CTFVFXHRcdCMwMDY2RkZcdFx0IzY2OTlGRlxuUkVEXHRcdFx0I2NjMDAwMFx0XHQjZmY2NjY2XG5ZRUxMT1dcdFx0I2ZmY2MwMFx0XHQjZmZmZjk5XG5HUkVFTlx0XHQjMDA2NjAwXHRcdCMwMzkxMTRcblBVUlBMRVx0XHQjNjYzMzk5XHRcdCM5OTMzY2NcbkdSRVlcdFx0IzQwNDA0MFx0XHQjNjY2NjY2XG5cbk9SQU5HRVx0XHQjZmY2NjAwXHRcdCNmZjk5MzNcblxuKi9cbiRkYy1ibHVlOiAjMDA2NkZGO1xuJGRjLXJlZDogI0NDMDAwMDtcbiRkYy15ZWxsb3c6ICNGRkNDMDA7XG4kZGMtZ3JlZW46ICMwMDY2MDA7XG4kZGMtcHVycGxlOiAjNjYzMzk5O1xuJGRjLWdyZXk6ICM0MDQwNDA7XG4kZGMtb3JhbmdlOiAjZjYwO1xuXG4kc2hhZG93LWNvbG9yOiByZ2JhKDAsMCwwLDAuMTIpO1xuXG4kY2FyZC1zaGFkb3c6IDBweCA1cHggNXB4IC0zcHggJHNoYWRvdy1jb2xvcixcbiAgICAgICAgICAgICAgMHB4IDhweCAxMHB4IDFweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAwcHggM3B4IDE0cHggMnB4ICRzaGFkb3ctY29sb3I7XG5cbiRjYXJkLXF1aWV0LXNoYWRvdzogMHB4IDJweCAxcHggLTFweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAwcHggMXB4IDFweCAwcHggJHNoYWRvdy1jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgMHB4IDFweCAzcHggMHB4ICRzaGFkb3ctY29sb3I7XG5cbi8vIG1lZGlhIHF1ZXJ5IG5hbWVzXG4kbWVkaWEtbW9iaWxlOiBcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBweClcIjtcblxuJGNvbG9yLWhpZ2hsaWdodDogcmdiYSgyNTUsIDI0MywgMjMwLCAwLjUpO1xuJGNvbG9yLXNoYWRvdzogcmdiYSg3NywgMzgsIDAsIDAuNCk7XG4kY29sb3ItdGV4dDogIzExMTtcblxuQG1peGluIGZvbnQge1xuICBmb250LWZhbWlseTogXCJDb3Jtb3JhbnQgR2FyYW1vbmRcIiwgc2VyaWY7XG59XG5cbkBtaXhpbiBmb250LXRpdGxlIHtcbiAgZm9udC1mYW1pbHk6IFwiTG92ZXJzIFF1YXJyZWxcIiwgY3Vyc2l2ZTtcbn1cblxuQG1peGluIGZvbnQtc3VidGl0bGUge1xuICBmb250LWZhbWlseTogXCJQbGF5ZmFpciBEaXNwbGF5XCIsIHNlcmlmO1xufVxuIiwiQGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJzXCI7XG5cbjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5zcGFjZXIge1xuICBoZWlnaHQ6IGNhbGMoNTB2aCAtIDEwcmVtKTtcbn1cblxuLnRpdGxlIHtcbiAgcGFkZGluZzogMnJlbSAwIDNyZW0gMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDZyZW07XG4gICAgdGV4dC1zaGFkb3c6IC0xcHggLTFweCAwcHggJGNvbG9yLXNoYWRvdywgMXB4IDFweCAwcHggJGNvbG9yLWhpZ2hsaWdodDtcbiAgICBtYXJnaW4tYm90dG9tOiAtMTlweDtcbiAgICBjb2xvcjogJGNvbG9yLXRleHQ7XG4gIH1cblxuICAuc3VidGl0bGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgaDMge1xuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgY29sb3I6ICRjb2xvci10ZXh0O1xuICB9XG5cbiAgLmhyIHtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgbWFyZ2luLXRvcDogOHB4O1xuICAgIGJvcmRlci1jb2xvcjogJGNvbG9yLXNoYWRvdyAkY29sb3ItaGlnaGxpZ2h0ICRjb2xvci1oaWdobGlnaHQgJGNvbG9yLXNoYWRvdztcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuXG4gICAgJjpudGgtY2hpbGQoMikge1xuICAgICAgbWFyZ2luLWxlZnQ6IDYxcHg7XG4gICAgICB3aWR0aDogMTgwcHg7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDY2cHg7XG4gICAgfVxuICB9XG5cbiAgQG1lZGlhICN7JG1lZGlhLW1vYmlsZX0ge1xuICAgIGgxIHtcbiAgICAgIGZvbnQtc2l6ZTogNC41cmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICAuaHIge1xuICAgICAgb3JkZXI6IDE7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICB3aWR0aDogYXV0bztcbiAgICAgIGZsZXgtZ3JvdzogMTtcblxuICAgICAgJjpudGgtY2hpbGQoMikge1xuICAgICAgICBvcmRlcjogMztcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGgzIHtcbiAgICAgIG9yZGVyOiAyO1xuICAgICAgbWFyZ2luOiAwIDFyZW07XG4gICAgfVxuICB9XG59XG5cbi5sb2FkaW5nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xufVxuXG4uc2ltaWxhci1oZWFkaW5nIHtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4ucG9zdC1wYWdlLXRpdGxlIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICB6LWluZGV4OiAzO1xuICBwYWRkaW5nOiAwLjVyZW0gMnJlbTtcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAzcmVtO1xuICAgIHRleHQtc2hhZG93OiAtMXB4IC0xcHggMHB4ICRjb2xvci1zaGFkb3csIDFweCAxcHggMHB4ICRjb2xvci1oaWdobGlnaHQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5cbiAgQG1lZGlhICN7JG1lZGlhLW1vYmlsZX0ge1xuICAgIGxlZnQ6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG59XG5cbmgzLmhlYWRpbmcge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG59XG5cbi5xdWljay1saW5rcyB7XG4gICAgbWFyZ2luLWJvdHRvbTogNXJlbTtcbiAgICBtYXJnaW4tdG9wOiAtMnJlbTtcblxuICAubGluay13cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICAgLmxpbmsge1xuICAgICAgLy8gYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAkY29sb3Itc2hhZG93O1xuICAgICAgLy8gYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgJGNvbG9yLWhpZ2hsaWdodDtcbiAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgIHdpZHRoOiAzMyU7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICAgIH1cblxuICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgICAgfVxuXG4gICAgICBoMiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBtaW4taGVpZ2h0OiA0MHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBtYXJnaW46IDAuNXJlbSAwO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICB9XG5cbiAgICAgIGg0IHtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgfVxuXG4gICAgICAubGluay1zdW1tYXJ5IHtcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuXG4gICAgICAuZGF0ZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIG1hcmdpbi10b3A6IDAuMjVyZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm9wdGlvbnMge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcblxuICAgICAgc3BhbiB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgY29sb3I6ICRjb2xvci10ZXh0O1xuICAgICAgICB0ZXh0LXNoYWRvdzogLTFweCAtMXB4IDBweCAkY29sb3Itc2hhZG93LCAxcHggMXB4IDBweCAkY29sb3ItaGlnaGxpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAjeyRtZWRpYS1tb2JpbGV9IHtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGdhcDogMXJlbTtcblxuICAgICAgLmxpbms6Zmlyc3QtY2hpbGQge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgIH1cbiAgICAgIC5saW5rIHtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuYXBwLXBvc3Qtc2VyaWVzIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB3aWR0aDogMTAwJTtcbiAgei1pbmRleDogMjtcblxuICBAbWVkaWEgI3skbWVkaWEtbW9iaWxlfSB7XG4gICAgdG9wOiA0cmVtO1xuICAgIGxlZnQ6IDFyZW07XG4gICAgcmlnaHQ6IDFyZW07XG4gICAgdHJhbnNmb3JtOiBub25lO1xuICAgIHdpZHRoOiBhdXRvO1xuXG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuXG4ucG9zdC1saXN0IHtcbiAgcGFkZGluZzogMXJlbSAzcmVtO1xuICBtYXgtd2lkdGg6IDcwMHB4O1xuICBtYXJnaW46IDAgYXV0bztcblxuICBAbWVkaWEgI3skbWVkaWEtbW9iaWxlfSB7XG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xuICB9XG59XG5cbi5zZXJpZXMtc3VtbWFyeSB7XG4gIG1hcmdpbi1ib3R0b206IDNyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gIGgyIHtcbiAgICBmb250LXNpemU6IDNyZW07XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICB9XG5cbiAgcCB7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gIH1cblxuICAuZW50cnktY291bnQge1xuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgaDMge1xuICAgICAgcGFkZGluZzogMCAxcmVtO1xuXG4gICAgICAmOjpiZWZvcmUsXG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJGNvbG9yLXNoYWRvdyAkY29sb3ItaGlnaGxpZ2h0ICRjb2xvci1oaWdobGlnaHQgJGNvbG9yLXNoYWRvdztcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHJpZ2h0OiAxMDAlO1xuICAgICAgICB3aWR0aDogNHJlbTtcbiAgICAgICAgdG9wOiA2NSU7XG4gICAgICB9XG5cbiAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgIGxlZnQ6IDEwMCU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmFwcC1wb3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDVyZW07XG59XG5cbi5zY3JvbGwtdHJhY2tlciB7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'spacer',
        outStyle: {
          'height': '0'
        },
        inStyle: {
          'height': '*'
        },
        durationMs: 500
      }), (0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'title',
        outStyle: {
          'height': '0',
          'padding': '0',
          'opacity': '0'
        },
        inStyle: {
          'height': '*',
          'padding': '*',
          'opacity': '1'
        },
        durationMs: 500
      }), (0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'postTitle',
        outStyle: {
          'transform': 'translateY(-100%)',
          'height': '0'
        },
        inStyle: {
          'transform': 'translateY(0)',
          'height': '*'
        },
        durationMs: 500
      }), (0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'post',
        outStyle: {
          'overflow': 'hidden',
          'height': '0',
          'margin': '0',
          'opacity': '0'
        },
        inStyle: {
          'height': '*',
          'margin': '*',
          'opacity': '1'
        },
        durationMs: 500
      })]
    },
    changeDetection: 0
  });
}

/***/ }),

/***/ 692:
/*!******************************************************!*\
  !*** ./src/app/post-series/post-series.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostSeriesComponent": () => (/* binding */ PostSeriesComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 8759);
/* harmony import */ var _shared_anim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/anim */ 554);
/* harmony import */ var _shared_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/const */ 2926);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _services_post_list_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/post-list-state.service */ 3173);
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/post.service */ 9166);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6477);







function PostSeriesComponent_ng_container_0_div_1_div_1_div_1_p_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p")(1, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Next: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PostSeriesComponent_ng_container_0_div_1_div_1_div_1_p_4_Template_a_click_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11);
      const series_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3).ngIf;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r9.nextPost($event, series_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r8.nextPostTitle);
  }
}
function PostSeriesComponent_ng_container_0_div_1_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 8)(1, "p")(2, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, PostSeriesComponent_ng_container_0_div_1_div_1_div_1_p_4_Template, 5, 1, "p", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("This is part ", ctx_r5.currentPartNumber, " of a series.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r5.currentPartNumber < ctx_r5.partList.length);
  }
}
function PostSeriesComponent_ng_container_0_div_1_div_1_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const series_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](series_r3.description);
  }
}
function PostSeriesComponent_ng_container_0_div_1_div_1_ng_container_6_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PostSeriesComponent_ng_container_0_div_1_div_1_ng_container_6_a_1_Template_a_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r18);
      const part_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const series_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2).ngIf;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r16.gotoPost($event, series_r3, part_r13.post));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const part_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const post_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("active", part_r13.post.id == post_r1.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", part_r13.label, " ");
  }
}
function PostSeriesComponent_ng_container_0_div_1_div_1_ng_container_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, ". . .");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function PostSeriesComponent_ng_container_0_div_1_div_1_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PostSeriesComponent_ng_container_0_div_1_div_1_ng_container_6_a_1_Template, 2, 3, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, PostSeriesComponent_ng_container_0_div_1_div_1_ng_container_6_span_2_Template, 2, 0, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const part_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", part_r13.index > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", part_r13.index === -1);
  }
}
function PostSeriesComponent_ng_container_0_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PostSeriesComponent_ng_container_0_div_1_div_1_div_1_Template, 5, 2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h2", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PostSeriesComponent_ng_container_0_div_1_div_1_Template_h2_click_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r24);
      const series_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r22.goToSeries($event, series_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, PostSeriesComponent_ng_container_0_div_1_div_1_p_4_Template, 2, 1, "p", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, PostSeriesComponent_ng_container_0_div_1_div_1_ng_container_6_Template, 3, 2, "ng-container", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const series_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.extended);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](series_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.extended && series_r3.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r4.partList);
  }
}
function PostSeriesComponent_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PostSeriesComponent_ng_container_0_div_1_div_1_Template, 7, 4, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const series_r3 = ctx.ngIf;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassMapInterpolate1"]("wrapper ", ctx_r2.postClassName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@series", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", series_r3);
  }
}
function PostSeriesComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PostSeriesComponent_ng_container_0_div_1_Template, 2, 5, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, ctx_r0.series$));
  }
}
const MOBILE_WIDTH = 500;
class PostSeriesComponent {
  get className() {
    return this.extended ? '' : 'content';
  }
  // get nextPostTitle(): string {
  //   // return this.series.posts[this.thisPart].post.title;
  //   return 'Next';
  // }
  constructor(postStateService, postService, changeDetectorRef, location) {
    this.postStateService = postStateService;
    this.postService = postService;
    this.changeDetectorRef = changeDetectorRef;
    this.location = location;
    this.extended = false;
    this.postClassName = '';
    // get partList(): number[] {
    //   if (!this.series) {
    //     return [];
    //   }
    // if (window.innerWidth > MOBILE_WIDTH || this.extended ||
    //     this.series.posts.length < 7) {
    //   return this.series.posts.map((p, i) => i + 1);
    // }
    //   const currentIndex =
    //       this.series.posts.findIndex(p => p.post.id === this.post.id);
    //   const parts = [];
    //   const maxIndex = this.series.posts.length - 1;
    //   const spacePastCurrent = Math.min(maxIndex - currentIndex, 3);
    //   const spaceBeforeCurrent = Math.min(currentIndex, 5 - spacePastCurrent);
    //   let skipping = false;
    //   this.series.posts.forEach((p, i) => {
    //     if (i === 0 || i === currentIndex + 1 || i === currentIndex - 1 ||
    //         i === currentIndex || i === maxIndex ||
    //         (i > currentIndex - spaceBeforeCurrent &&
    //          i < currentIndex + spacePastCurrent)) {
    //       parts.push(i + 1);
    //       skipping = false;
    //     } else if (!skipping) {
    //       parts.push(-1);
    //       skipping = true;
    //     }
    //   });
    //   return parts;
    // }
    this.currentPartNumber = 0;
    // get thisPart(): number {
    //   // return this.series.posts.findIndex(p => p.post.id === this.post.id) +
    //   1; return 1;
    // }
    this.nextPostTitle = '';
    this.post$ = this.postStateService.selection$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(post => {
      if (post) {
        this.postClassName = this.postService.postClassName(post);
      }
    }));
    this.series$ = this.postStateService.series$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(series => {
      if (series) {
        if (window.innerWidth > MOBILE_WIDTH || this.extended || series.posts.length < 7) {
          this.partList = series.posts.map((p, i) => {
            const index = i + 1;
            return {
              label: p.label || 'Part ' + index,
              index: i + 1,
              post: p.post
            };
          });
        }
        this.currentPartNumber = series.posts.findIndex(p => p.post.id === this.postStateService.selectedPostId) + 1;
        if (this.currentPartNumber < series.posts.length) {
          this.nextPostTitle = series.posts[this.currentPartNumber].post.title;
        } else {
          this.nextPostTitle = '';
        }
      } else {
        this.partList = [];
      }
    }));
    // this.postStateService.selection$.subscribe(post => {
    //   this.post = post;
    //   console.log('post selected for series', post);
    //   if (this.seriesSubscription) {
    //     this.seriesSubscription.unsubscribe();
    //   }
    //   this.seriesSubscription =
    //   this.postService.fetchSeries(post).subscribe(series => {
    //     console.log('series?', series);
    //     this.series = series;
    //   });
    // });
    // this.postService.series$.pipe(skip(1)).subscribe(series => {
    //   this.series = series;
    // if (this.series) {
    //   if (window.innerWidth > MOBILE_WIDTH || this.extended ||
    //     this.series.posts.length < 7) {
    //     this.partList = this.series.posts.map((p, i) => {
    //       const index = i + 1;
    //       return {
    //         label: p.label || 'Part ' + index,
    //         index: i + 1,
    //         post: p.post
    //       };
    //     });
    //   }
    // } else {
    //   this.partList = [];
    // }
    //   this.changeDetectorRef.detectChanges();
    // }, error => {
    //   // Do nothing on errors - chances are there just isn't a series for
    //   this post.
    // });
  }

  gotoPost(e, series, post) {
    e.stopPropagation();
    this.location.go(`${_shared_const__WEBPACK_IMPORTED_MODULE_1__.SERIES_PREFIX}/${series.slug};post=${post.slug}`);
    // this.location.go(`${SERIES_PREFIX}/${series.slug}`);
    // setTimeout(() => {
    //   this.location.replaceState(`${POST_PREFIX}/${post.slug}`);
    // }, 1000);
    // this.location.go(`${POST_PREFIX}/${post.slug}`);
    // if (post.id !== this.post.id) {
    //   const gotoPost = post;
    //   // Show just the posts for this series.
    //   this.postService.broadcastPosts(
    //     series.posts.map(seriesPost => seriesPost.post));
    //   // Deselect the post.
    //   this.postService.selectPost();
    //   setTimeout(() => {
    //     // Open the selected post after the animation finishes.
    //     this.location.go(POST_PREFIX + '/' + gotoPost.id);
    //     this.postService.selectPost(gotoPost);
    //   }, 1000);
    // }
  }

  nextPost(e, series) {
    this.gotoPost(e, series, series.posts[this.currentPartNumber].post);
  }
  goToSeries(e, series) {
    e.stopPropagation();
    this.location.go(`${_shared_const__WEBPACK_IMPORTED_MODULE_1__.SERIES_PREFIX}/${series.slug}`);
  }
  static #_ = this.ɵfac = function PostSeriesComponent_Factory(t) {
    return new (t || PostSeriesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_post_list_state_service__WEBPACK_IMPORTED_MODULE_2__.PostListStateService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_post_service__WEBPACK_IMPORTED_MODULE_3__.PostService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.Location));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: PostSeriesComponent,
    selectors: [["app-post-series"]],
    hostVars: 1,
    hostBindings: function PostSeriesComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵhostProperty"]("className", ctx.className);
      }
    },
    inputs: {
      extended: "extended"
    },
    decls: 2,
    vars: 3,
    consts: [[4, "ngIf"], [3, "class", 4, "ngIf"], ["class", "series", 4, "ngIf"], [1, "series"], ["class", "series-intro", 4, "ngIf"], [3, "click"], [1, "post-links", "corner-box"], [4, "ngFor", "ngForOf"], [1, "series-intro"], [3, "active", "click", 4, "ngIf"]],
    template: function PostSeriesComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, PostSeriesComponent_ng_container_0_Template, 3, 3, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "async");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 1, ctx.post$));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
    styles: ["[_nghost-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.wrapper[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  margin: 1rem 0;\n  max-width: 700px;\n}\n\n.series-intro[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n.series-intro[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\nh2[_ngcontent-%COMP%] {\n  font-style: italic;\n  font-size: 1.5rem;\n  cursor: pointer;\n}\n\n.post-links[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  position: relative;\n  flex-wrap: wrap;\n}\n.post-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .post-links[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-style: italic;\n  cursor: pointer;\n  text-shadow: -1px 0 0 rgba(77, 38, 0, 0.4);\n  position: relative;\n  display: inline-block;\n  font-weight: bold;\n  margin: 0 0.5rem 0.5rem;\n}\n.post-links[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], .post-links[_ngcontent-%COMP%]   span.active[_ngcontent-%COMP%] {\n  border: 0;\n  color: #111;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX3ZhcnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvcG9zdC1zZXJpZXMvcG9zdC1zZXJpZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0NBQUE7QUNFQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtBQWNGOztBQVhBO0VBQ0UsWUFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQWNGOztBQVhBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7QUFjRjtBQVpFO0VBQ0UsZUFBQTtBQWNKOztBQVZBO0VBQ0UsU0FBQTtBQWFGOztBQVZBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFhRjs7QUFWQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQWFGO0FBWEU7O0VBRUUsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSwwQ0FBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtFQUNBLHVCQUFBO0FBYUo7QUFYSTs7RUFDRSxTQUFBO0VBQ0EsV0RoQk87QUM4QmIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuT0ZGSUNJQUwgREVOWUNPTkZPUk1JVFkuQ09NIENPTE9SIFBBTExFVFRFREVURVxuXG5DT0xPUlx0XHRSRVNUSU5HXHRcdEFDVElWRVxuXG5CTFVFXHRcdCMwMDY2RkZcdFx0IzY2OTlGRlxuUkVEXHRcdFx0I2NjMDAwMFx0XHQjZmY2NjY2XG5ZRUxMT1dcdFx0I2ZmY2MwMFx0XHQjZmZmZjk5XG5HUkVFTlx0XHQjMDA2NjAwXHRcdCMwMzkxMTRcblBVUlBMRVx0XHQjNjYzMzk5XHRcdCM5OTMzY2NcbkdSRVlcdFx0IzQwNDA0MFx0XHQjNjY2NjY2XG5cbk9SQU5HRVx0XHQjZmY2NjAwXHRcdCNmZjk5MzNcblxuKi9cbiRkYy1ibHVlOiAjMDA2NkZGO1xuJGRjLXJlZDogI0NDMDAwMDtcbiRkYy15ZWxsb3c6ICNGRkNDMDA7XG4kZGMtZ3JlZW46ICMwMDY2MDA7XG4kZGMtcHVycGxlOiAjNjYzMzk5O1xuJGRjLWdyZXk6ICM0MDQwNDA7XG4kZGMtb3JhbmdlOiAjZjYwO1xuXG4kc2hhZG93LWNvbG9yOiByZ2JhKDAsMCwwLDAuMTIpO1xuXG4kY2FyZC1zaGFkb3c6IDBweCA1cHggNXB4IC0zcHggJHNoYWRvdy1jb2xvcixcbiAgICAgICAgICAgICAgMHB4IDhweCAxMHB4IDFweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAwcHggM3B4IDE0cHggMnB4ICRzaGFkb3ctY29sb3I7XG5cbiRjYXJkLXF1aWV0LXNoYWRvdzogMHB4IDJweCAxcHggLTFweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAwcHggMXB4IDFweCAwcHggJHNoYWRvdy1jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgMHB4IDFweCAzcHggMHB4ICRzaGFkb3ctY29sb3I7XG5cbi8vIG1lZGlhIHF1ZXJ5IG5hbWVzXG4kbWVkaWEtbW9iaWxlOiBcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBweClcIjtcblxuJGNvbG9yLWhpZ2hsaWdodDogcmdiYSgyNTUsIDI0MywgMjMwLCAwLjUpO1xuJGNvbG9yLXNoYWRvdzogcmdiYSg3NywgMzgsIDAsIDAuNCk7XG4kY29sb3ItdGV4dDogIzExMTtcblxuQG1peGluIGZvbnQge1xuICBmb250LWZhbWlseTogXCJDb3Jtb3JhbnQgR2FyYW1vbmRcIiwgc2VyaWY7XG59XG5cbkBtaXhpbiBmb250LXRpdGxlIHtcbiAgZm9udC1mYW1pbHk6IFwiTG92ZXJzIFF1YXJyZWxcIiwgY3Vyc2l2ZTtcbn1cblxuQG1peGluIGZvbnQtc3VidGl0bGUge1xuICBmb250LWZhbWlseTogXCJQbGF5ZmFpciBEaXNwbGF5XCIsIHNlcmlmO1xufVxuIiwiQGltcG9ydCBcIi4uLy4uL3N0eWxlcy92YXJzXCI7XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi53cmFwcGVyIHtcbiAgZmxleC1ncm93OiAxO1xuICBtYXJnaW46IDFyZW0gMDtcbiAgbWF4LXdpZHRoOiA3MDBweDtcbn1cblxuLnNlcmllcy1pbnRybyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcblxuICBhIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbn1cblxucCB7XG4gIG1hcmdpbjogMDtcbn1cblxuaDIge1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wb3N0LWxpbmtzIHtcbiAgbWFyZ2luOiAxcmVtIDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZsZXgtd3JhcDogd3JhcDtcblxuICBhLFxuICBzcGFuIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRleHQtc2hhZG93OiAtMXB4IDAgMCAkY29sb3Itc2hhZG93O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgbWFyZ2luOiAwIDAuNXJlbSAwLjVyZW07XG5cbiAgICAmLmFjdGl2ZSB7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICBjb2xvcjogJGNvbG9yLXRleHQ7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'series',
        outStyle: {
          'margin-top': '-100px'
        },
        inStyle: {
          'margin-top': '*'
        },
        durationMs: 300
      })]
    }
  });
}

/***/ }),

/***/ 3772:
/*!******************************************************!*\
  !*** ./src/app/post-survey/post-survey.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostSurveyComponent": () => (/* binding */ PostSurveyComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 8759);
/* harmony import */ var _shared_anim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/anim */ 554);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/post.service */ 9166);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6477);







function PostSurveyComponent_h3_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Answer this");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function PostSurveyComponent_h3_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "The results are in");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function PostSurveyComponent_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.post.survey_description);
  }
}
function PostSurveyComponent_ng_container_4_li_4_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("submitted by ", option_r10.name, "");
  }
}
const _c0 = function (a0) {
  return {
    width: a0
  };
};
const _c1 = function (a0, a1) {
  return {
    value: a0,
    params: a1
  };
};
function PostSurveyComponent_ng_container_4_li_4_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 11)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const option_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@results", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](5, _c1, option_r10.id, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, ctx_r12.optionVoteCount(option_r10) / ctx_r12.totalVotes * 100 + "%")));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", ctx_r12.optionVoteCount(option_r10), " / ", ctx_r12.totalVotes, " votes");
  }
}
function PostSurveyComponent_ng_container_4_li_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PostSurveyComponent_ng_container_4_li_4_Template_li_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r16);
      const option_r10 = restoredCtx.$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r15.select(option_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, PostSurveyComponent_ng_container_4_li_4_div_2_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, PostSurveyComponent_ng_container_4_li_4_div_3_Template, 3, 8, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r10 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("selected", option_r10.id === ctx_r7.selectedOptionId);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", option_r10.text, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", option_r10.custom);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.showResults);
  }
}
function PostSurveyComponent_ng_container_4_li_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 12)(1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Add your own idea (other folks will be able to vote for it):");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "textarea", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("selected", ctx_r8.selectedOptionId === ctx_r8.CUSTOM_OPTION_ID);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@option", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx_r8.addOptionFormGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", (ctx_r8.addOptionFormGroup.controls.text.value || "").length, " / 280");
  }
}
function PostSurveyComponent_ng_container_4_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PostSurveyComponent_ng_container_4_button_6_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r17.submit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx_r9.isSubmitValid);
  }
}
function PostSurveyComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PostSurveyComponent_ng_container_4_li_4_Template, 4, 5, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, PostSurveyComponent_ng_container_4_li_5_Template, 8, 5, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, PostSurveyComponent_ng_container_4_button_6_Template, 2, 1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const options_r6 = ctx.ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.prompt);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", options_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.post.survey_allows_custom_answers && !ctx_r3.showResults);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.showResults);
  }
}
function PostSurveyComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading your options . . .");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
const VOTE_LS_KEY = 'vote_for_post_';
class PostSurveyComponent {
  constructor(service, changeDetectorRef) {
    this.service = service;
    this.changeDetectorRef = changeDetectorRef;
    this.CUSTOM_OPTION_ID = '-1';
    this.selectedOptionId = '';
    this.showResults = false;
    this.totalVotes = 0;
    this.addOptionFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.UntypedFormGroup({
      'text': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.UntypedFormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.maxLength(280)]),
      'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required)
    });
    this.addOptionFormGroup.valueChanges.subscribe(value => {
      if (value['text']) {
        this.selectedOptionId = this.CUSTOM_OPTION_ID;
      }
    });
  }
  get isSurveyOpen() {
    return !this.post.survey_expires || new Date(this.post.survey_expires) > new Date();
  }
  get prompt() {
    if (this.isSurveyOpen) {
      return this.post.survey_open_prompt || 'Please pick which answer you like best.';
    } else {
      return this.post.survey_closed_prompt || 'Voting on this post is closed. Here are the results.';
    }
  }
  get isSubmitValid() {
    return this.selectedOptionId !== '' && this.selectedOptionId !== this.CUSTOM_OPTION_ID || this.selectedOptionId === this.CUSTOM_OPTION_ID && this.addOptionFormGroup.valid;
  }
  get voteLocalStorageKey() {
    return `${VOTE_LS_KEY}${this.post.id}`;
  }
  ngOnInit() {
    this.init();
  }
  init() {
    if (!this.isSurveyOpen) {
      this.showResults = true;
    }
    this.options$ = this.service.fetchSurveyOptions(this.post).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(options => {
      console.log('options', options);
      this.totalVotes = 0;
      for (const option of options) {
        if (option.custom) {
          // Count custom options as votes.
          this.totalVotes++;
        }
        this.totalVotes += option.votes.length;
      }
      console.log('total votes:', this.totalVotes);
      const existingVote = JSON.parse(localStorage.getItem(this.voteLocalStorageKey));
      if (existingVote) {
        this.showResults = true;
        if (existingVote['survey_option']) {
          // It's a standard vote for an option.
          this.selectedOptionId = existingVote['survey_option'];
        } else if (existingVote['post']) {
          // It's a custom option.
          this.selectedOptionId = existingVote['id'];
        }
      }
    }));
    this.changeDetectorRef.detectChanges();
  }
  optionVoteCount(option) {
    return (option.custom ? 1 : 0) + option.votes.length;
  }
  select(option) {
    if (this.showResults) {
      return;
    }
    this.addOptionFormGroup.reset();
    this.selectedOptionId = option.id;
  }
  submit() {
    if (!this.selectedOptionId) {
      return;
    }
    this.options$ = null;
    // If selectedOptionId is -1, we're creating a new option.
    if (this.selectedOptionId === this.CUSTOM_OPTION_ID && this.addOptionFormGroup.valid) {
      this.service.createSurveyOption(this.post, this.addOptionFormGroup.value).subscribe(newOption => {
        localStorage.setItem(this.voteLocalStorageKey, JSON.stringify(newOption));
        this.showResults = true;
        this.init();
      });
    } else if (this.selectedOptionId) {
      this.options$ = null;
      this.service.createSurveyVote(this.post, this.selectedOptionId, {
        text: '',
        name: ''
      }).subscribe(newVote => {
        localStorage.setItem(this.voteLocalStorageKey, JSON.stringify(newVote));
        this.showResults = true;
        this.init();
      });
    }
  }
  static #_ = this.ɵfac = function PostSurveyComponent_Factory(t) {
    return new (t || PostSurveyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_post_service__WEBPACK_IMPORTED_MODULE_1__.PostService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.ChangeDetectorRef));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: PostSurveyComponent,
    selectors: [["app-post-survey"]],
    inputs: {
      post: "post"
    },
    decls: 8,
    vars: 9,
    consts: [[4, "ngIf"], [1, "survey_content", "left-border"], [4, "ngIf", "ngIfElse"], ["loadingOptions", ""], ["class", "corner-box", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["class", "corner-box", 3, "selected", 4, "ngIf"], [3, "disabled", "click", 4, "ngIf"], [1, "corner-box", 3, "click"], ["class", "submitted-by", 4, "ngIf"], ["class", "results", 4, "ngIf"], [1, "submitted-by"], [1, "results"], [1, "corner-box"], [3, "formGroup"], ["formControlName", "text", "placeholder", "Your idea"], [1, "char-count"], ["formControlName", "name", "placeholder", "Your name"], [3, "disabled", "click"]],
    template: function PostSurveyComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, PostSurveyComponent_h3_0_Template, 2, 0, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PostSurveyComponent_h3_1_Template, 2, 0, "h3", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, PostSurveyComponent_p_3_Template, 2, 1, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PostSurveyComponent_ng_container_4_Template, 7, 4, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, PostSurveyComponent_ng_template_6_Template, 2, 0, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.showResults);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showResults);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("show-results", ctx.showResults);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.showResults);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 7, ctx.options$))("ngIfElse", _r4);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
    styles: ["h3[_ngcontent-%COMP%] {\n  margin: 3rem 0 1rem 0;\n  font-size: 1.25rem;\n}\n\n.survey_content[_ngcontent-%COMP%] {\n  padding-bottom: 4rem;\n}\n.survey_content.show-results[_ngcontent-%COMP%] {\n  padding-bottom: 1rem;\n}\n\nul[_ngcontent-%COMP%] {\n  list-style: none;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  padding: 0.5rem;\n  cursor: pointer;\n  border-radius: 0.5rem;\n  transition: background 100ms;\n  position: relative;\n  box-sizing: border-box;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .results[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 0%;\n  border-radius: 0.5rem 0 0 0.5rem;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .results[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 100%;\n  bottom: 0;\n  font-size: 0.8rem;\n  white-space: nowrap;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child {\n  margin-top: 0.5rem;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\nul[_ngcontent-%COMP%]   li.selected[_ngcontent-%COMP%]:before {\n  width: 100%;\n  height: 100%;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-style: italic;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .submitted-by[_ngcontent-%COMP%] {\n  text-align: right;\n  font-size: 0.9rem;\n  font-style: italic;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  font-size: 20px;\n  font-family: \"Cormorant Garamond\", serif;\n  padding: 0.25rem;\n  margin: 0.25rem 0;\n  position: relative;\n  z-index: 2;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:last-child, ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:last-child {\n  margin-left: 2rem;\n  font-size: 1rem;\n  width: calc(100% - 3rem);\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .char-count[_ngcontent-%COMP%] {\n  display: block;\n  text-align: right;\n  font-size: 0.75rem;\n}\n\nbutton[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  float: right;\n  font-size: 1.5rem;\n  margin-top: 1rem;\n  font-family: \"Playfair Display\", serif;\n  font-style: italic;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX3ZhcnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvcG9zdC1zdXJ2ZXkvcG9zdC1zdXJ2ZXkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0NBQUE7QUNFQTtFQUNFLHFCQUFBO0VBQ0Esa0JBQUE7QUFjRjs7QUFYQTtFQUNFLG9CQUFBO0FBY0Y7QUFaRTtFQUNFLG9CQUFBO0FBY0o7O0FBVkE7RUFDRSxnQkFBQTtBQWFGO0FBWEU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxxQkFBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBQWFKO0FBWEk7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7RUFDQSxnQ0FBQTtBQWFOO0FBWE07RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQWFSO0FBVEk7RUFDRSxrQkFBQTtBQVdOO0FBUkk7RUFDRSxvQ0FBQTtBQVVOO0FBUEk7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQVNOO0FBTkk7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7QUFRTjtBQUxJO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBT047QUFKSTtFQUNFLFNBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VEakNKLHdDQUFBO0VDbUNJLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUFNTjtBQUpNO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0Esd0JBQUE7QUFNUjtBQUZJO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFJTjs7QUFDQTtFQUNFLFNBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0NBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFFRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5PRkZJQ0lBTCBERU5ZQ09ORk9STUlUWS5DT00gQ09MT1IgUEFMTEVUVEVERVRFXG5cbkNPTE9SXHRcdFJFU1RJTkdcdFx0QUNUSVZFXG5cbkJMVUVcdFx0IzAwNjZGRlx0XHQjNjY5OUZGXG5SRURcdFx0XHQjY2MwMDAwXHRcdCNmZjY2NjZcbllFTExPV1x0XHQjZmZjYzAwXHRcdCNmZmZmOTlcbkdSRUVOXHRcdCMwMDY2MDBcdFx0IzAzOTExNFxuUFVSUExFXHRcdCM2NjMzOTlcdFx0Izk5MzNjY1xuR1JFWVx0XHQjNDA0MDQwXHRcdCM2NjY2NjZcblxuT1JBTkdFXHRcdCNmZjY2MDBcdFx0I2ZmOTkzM1xuXG4qL1xuJGRjLWJsdWU6ICMwMDY2RkY7XG4kZGMtcmVkOiAjQ0MwMDAwO1xuJGRjLXllbGxvdzogI0ZGQ0MwMDtcbiRkYy1ncmVlbjogIzAwNjYwMDtcbiRkYy1wdXJwbGU6ICM2NjMzOTk7XG4kZGMtZ3JleTogIzQwNDA0MDtcbiRkYy1vcmFuZ2U6ICNmNjA7XG5cbiRzaGFkb3ctY29sb3I6IHJnYmEoMCwwLDAsMC4xMik7XG5cbiRjYXJkLXNoYWRvdzogMHB4IDVweCA1cHggLTNweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAwcHggOHB4IDEwcHggMXB4ICRzaGFkb3ctY29sb3IsXG4gICAgICAgICAgICAgIDBweCAzcHggMTRweCAycHggJHNoYWRvdy1jb2xvcjtcblxuJGNhcmQtcXVpZXQtc2hhZG93OiAwcHggMnB4IDFweCAtMXB4ICRzaGFkb3ctY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIDBweCAxcHggMXB4IDBweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAwcHggMXB4IDNweCAwcHggJHNoYWRvdy1jb2xvcjtcblxuLy8gbWVkaWEgcXVlcnkgbmFtZXNcbiRtZWRpYS1tb2JpbGU6IFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KVwiO1xuXG4kY29sb3ItaGlnaGxpZ2h0OiByZ2JhKDI1NSwgMjQzLCAyMzAsIDAuNSk7XG4kY29sb3Itc2hhZG93OiByZ2JhKDc3LCAzOCwgMCwgMC40KTtcbiRjb2xvci10ZXh0OiAjMTExO1xuXG5AbWl4aW4gZm9udCB7XG4gIGZvbnQtZmFtaWx5OiBcIkNvcm1vcmFudCBHYXJhbW9uZFwiLCBzZXJpZjtcbn1cblxuQG1peGluIGZvbnQtdGl0bGUge1xuICBmb250LWZhbWlseTogXCJMb3ZlcnMgUXVhcnJlbFwiLCBjdXJzaXZlO1xufVxuXG5AbWl4aW4gZm9udC1zdWJ0aXRsZSB7XG4gIGZvbnQtZmFtaWx5OiBcIlBsYXlmYWlyIERpc3BsYXlcIiwgc2VyaWY7XG59XG4iLCJAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcnNcIjtcblxuaDMge1xuICBtYXJnaW46IDNyZW0gMCAxcmVtIDA7XG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcbn1cblxuLnN1cnZleV9jb250ZW50IHtcbiAgcGFkZGluZy1ib3R0b206IDRyZW07XG5cbiAgJi5zaG93LXJlc3VsdHMge1xuICAgIHBhZGRpbmctYm90dG9tOiAxcmVtO1xuICB9XG59XG5cbnVsIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcblxuICBsaSB7XG4gICAgbWFyZ2luOiAxcmVtIDA7XG4gICAgcGFkZGluZzogMC41cmVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAxMDBtcztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgIC5yZXN1bHRzIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICB3aWR0aDogMCU7XG4gICAgICBib3JkZXItcmFkaXVzOiAwLjVyZW0gMCAwIDAuNXJlbTtcblxuICAgICAgc3BhbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMTAwJTtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgICB9XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICB9XG5cbiAgICAmLnNlbGVjdGVkOmJlZm9yZSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG5cbiAgICBsYWJlbCB7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuXG4gICAgLnN1Ym1pdHRlZC1ieSB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIGZvbnQtc2l6ZTogLjlyZW07XG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgfVxuXG4gICAgaW5wdXQsIHRleHRhcmVhIHtcbiAgICAgIGJvcmRlcjogMDtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICBAaW5jbHVkZSBmb250O1xuICAgICAgcGFkZGluZzogMC4yNXJlbTtcbiAgICAgIG1hcmdpbjogMC4yNXJlbSAwO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgei1pbmRleDogMjtcblxuICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDJyZW07XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDNyZW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5jaGFyLWNvdW50IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICBmb250LXNpemU6IC43NXJlbTtcbiAgICB9XG4gIH1cbn1cblxuYnV0dG9uIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgZm9udC1mYW1pbHk6IFwiUGxheWZhaXIgRGlzcGxheVwiLCBzZXJpZjtcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'results',
        outStyle: {
          width: 0
        },
        inStyle: {
          width: '{{width}}'
        },
        params: {
          width: '100%'
        },
        durationMs: 1000,
        delayMs: 500
      }), (0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'option',
        outStyle: {
          'padding-top': 0,
          'padding-bottom': 0,
          height: 0,
          overflow: 'hidden'
        }
      })]
    }
  });
}

/***/ }),

/***/ 3837:
/*!****************************************!*\
  !*** ./src/app/post/post.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostComponent": () => (/* binding */ PostComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 9542);
/* harmony import */ var _shared_anim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/anim */ 554);
/* harmony import */ var _shared_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/const */ 2926);
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/post.service */ 9166);
/* harmony import */ var _services_post_list_state_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/post-list-state.service */ 3173);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _shared_markdown_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/markdown-service.service */ 1937);
/* harmony import */ var _shared_scroll_tracker_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/scroll-tracker.directive */ 8382);
/* harmony import */ var _shared_unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/unsafe-inner-html.directive */ 5904);
/* harmony import */ var _post_series_post_series_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../post-series/post-series.component */ 692);
/* harmony import */ var _post_survey_post_survey_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../post-survey/post-survey.component */ 3772);














const _c0 = ["commentText"];
function PostComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("@wrapper", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("src", ctx_r0.post == null ? null : ctx_r0.post.image, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeUrl"]);
  }
}
function PostComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 16)(1, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function PostComponent_div_8_Template_span_click_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r11.goHome($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Home");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function PostComponent_div_8_Template_span_click_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r12);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r13.readPost($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "Read");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("@wrapper", undefined);
  }
}
function PostComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 18);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("@summary", undefined)("unsafeInnerHTML", ctx_r2.renderSummary(ctx_r2.post));
  }
}
function PostComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 23)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Please note: this content was written before Siobhan began her gender transition. Siobhan spent a long time trying to identify as Shauvon, a tall he/him dude.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "She's still very tall, but she has corrected the other stuff. This old content has not been corrected to match because pouring through eighteen years of angsty content sounds really tedious.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function PostComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PostComponent_div_10_div_1_Template, 5, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "h3", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("appear", function PostComponent_div_10_Template_h3_appear_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r15.commentsAppear());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "end of line.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("@wrapper", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.shouldShowDisclaimer());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("unsafeInnerHTML", ctx_r3.renderText(ctx_r3.post));
  }
}
function PostComponent_app_post_survey_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-post-survey", 24);
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("post", ctx_r4.post);
  }
}
function PostComponent_app_post_series_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-post-series", 25);
  }
}
function PostComponent_ng_container_13_div_1_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 33)(1, "div", 36)(2, "p")(3, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "Nothing yet. Add your thoughts below.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
  }
}
function PostComponent_ng_container_13_div_1_div_1_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainer"](0);
  }
}
const _c1 = function (a0) {
  return {
    comment: a0
  };
};
function PostComponent_ng_container_13_div_1_div_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PostComponent_ng_container_13_div_1_div_1_ng_container_5_ng_container_1_Template, 1, 0, "ng-container", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const comment_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngTemplateOutlet", _r9)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](2, _c1, comment_r24));
  }
}
function PostComponent_ng_container_13_div_1_div_1_ng_container_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainer"](0);
  }
}
function PostComponent_ng_container_13_div_1_div_1_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PostComponent_ng_container_13_div_1_div_1_ng_container_6_ng_container_1_Template, 1, 0, "ng-container", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngTemplateOutlet", _r9)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](2, _c1, ctx_r22.createdComment));
  }
}
function PostComponent_ng_container_13_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 29)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Comments");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, PostComponent_ng_container_13_div_1_div_1_div_4_Template, 5, 0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, PostComponent_ng_container_13_div_1_div_1_ng_container_5_Template, 2, 4, "ng-container", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, PostComponent_ng_container_13_div_1_div_1_ng_container_6_Template, 2, 4, "ng-container", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "div", 33)(8, "form", 34)(9, "div", 1)(10, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](13, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](16, "textarea", 37, 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](19, " No HTML is allowed, but you can use ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "a", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](21, "Markdown");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](22, "! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function PostComponent_ng_container_13_div_1_div_1_Template_button_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r27.submitComment());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](24, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const comments_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().ngIf;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("@wrapper", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !comments_r18.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", comments_r18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r19.createdComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("formGroup", ctx_r19.commentFormGroup);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", !ctx_r19.commentFormGroup.valid);
  }
}
function PostComponent_ng_container_13_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PostComponent_ng_container_13_div_1_div_1_Template, 25, 6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("@wrapper", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r17.selected);
  }
}
function PostComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, PostComponent_ng_container_13_div_1_Template, 2, 2, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, ctx_r6.comments$))("ngIfElse", _r7);
  }
}
function PostComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "Loading comments . . .");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function PostComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 33)(1, "div", 1)(2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const comment_r30 = ctx.comment;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("@wrapper", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](comment_r30.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 4, comment_r30.time), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", ctx_r10.renderMarkdown(comment_r30.text), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
  }
}
class PostComponent {
  get className() {
    return this.postService.postClassName(this.post);
  }
  get selected() {
    return this.postListService.selectedPostId === this.post.id;
  }
  constructor(postService, postListService, location, markdownService) {
    this.postService = postService;
    this.postListService = postListService;
    this.location = location;
    this.markdownService = markdownService;
    this.read = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter();
    this.showComments = false;
    this.goBack = false;
    this.commentFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormGroup({
      'name': new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required),
      'text': new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.UntypedFormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required)
    });
    this.commentFormGroup.controls.text.valueChanges.subscribe(text => {
      this.commentText.nativeElement.style.height = 'auto';
      this.commentText.nativeElement.style.height = this.commentText.nativeElement.scrollHeight + 'px';
    });
  }
  renderSummary(post) {
    return this.markdownService.renderPostText(post, 'summary');
  }
  renderText(post) {
    return this.markdownService.renderPostText(post);
  }
  renderMarkdown(text) {
    return this.markdownService.convert(text);
  }
  goHome(e) {
    e.stopPropagation();
    this.location.go(_shared_const__WEBPACK_IMPORTED_MODULE_1__.POST_PREFIX);
  }
  readPost(e) {
    e.stopPropagation();
    this.read.next(this.post);
  }
  submitComment() {
    const comment = {
      name: this.commentFormGroup.controls.name.value,
      text: this.commentFormGroup.controls.text.value,
      post: this.post.id
    };
    this.createdComment = {
      ...comment,
      time: new Date().toISOString(),
      id: -1
    };
    this.commentFormGroup.reset();
    this.postService.createComment(comment).subscribe(createdComment => {
      this.createdComment = createdComment;
    });
  }
  commentsAppear() {
    // A wild comments appeared!
    this.showComments = true;
    this.comments$ = this.postService.fetchComments(this.post);
    this.loadSimilarPosts();
  }
  loadSimilarPosts() {
    this.postListService.loadSimilarPosts(this.post);
  }
  shouldShowDisclaimer() {
    const time = this.post.time;
    return new Date(time).getTime() < 1501545600000;
  }
  static #_ = this.ɵfac = function PostComponent_Factory(t) {
    return new (t || PostComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_post_service__WEBPACK_IMPORTED_MODULE_2__.PostService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_post_list_state_service__WEBPACK_IMPORTED_MODULE_3__.PostListStateService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_11__.Location), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_markdown_service_service__WEBPACK_IMPORTED_MODULE_4__.MarkdownServiceService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: PostComponent,
    selectors: [["app-post"]],
    viewQuery: function PostComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_c0, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.commentText = _t.first);
      }
    },
    hostVars: 1,
    hostBindings: function PostComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵhostProperty"]("className", ctx.className);
      }
    },
    inputs: {
      post: "post",
      index: "index"
    },
    outputs: {
      read: "read"
    },
    decls: 18,
    vars: 15,
    consts: [[1, "wrapper"], [1, "post-title"], [1, "corner-box", 3, "innerHTML"], [1, "date"], [1, "hr"], ["class", "image-wrapper", 4, "ngIf"], ["class", "tools", 4, "ngIf"], ["class", "summary", 3, "unsafeInnerHTML", 4, "ngIf"], ["class", "post", 4, "ngIf"], [3, "post", 4, "ngIf"], ["extended", "true", 4, "ngIf"], [4, "ngIf"], ["loadingComments", ""], ["commentTemplate", ""], [1, "image-wrapper"], [1, "post-image", 3, "src"], [1, "tools"], [1, "btn", "corner-box", 3, "click"], [1, "summary", 3, "unsafeInnerHTML"], [1, "post"], ["class", "transition-disclaimer", 4, "ngIf"], [1, "first-letter", 3, "unsafeInnerHTML"], [1, "end-of-line", 3, "scrollTracker", "appear"], [1, "transition-disclaimer"], [3, "post"], ["extended", "true"], ["class", "comments", 4, "ngIf", "ngIfElse"], [1, "comments"], ["class", "list", 4, "ngIf"], [1, "list"], [1, "left-border"], ["class", "comment", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "comment"], [3, "formGroup"], ["formControlName", "name", "placeholder", "Your name"], [1, "text"], ["formControlName", "text", "placeholder", "Your thoughts"], ["commentText", ""], [1, "disclaimer"], ["href", "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet", "target", "_blank"], [3, "disabled", "click"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "loading-comments"], [1, "text", 3, "innerHTML"]],
    template: function PostComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "h3", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, PostComponent_div_7_Template, 2, 2, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, PostComponent_div_8_Template, 5, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](9, PostComponent_div_9_Template, 1, 2, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, PostComponent_div_10_Template, 5, 3, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, PostComponent_app_post_survey_11_Template, 1, 1, "app-post-survey", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, PostComponent_app_post_series_12_Template, 1, 0, "app-post-series", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, PostComponent_ng_container_13_Template, 3, 4, "ng-container", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, PostComponent_ng_template_14_Template, 2, 0, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](16, PostComponent_ng_template_16_Template, 9, 6, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("selected", ctx.selected);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("has-image", ctx.post == null ? null : ctx.post.image);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", ctx.post == null ? null : ctx.post.title, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 13, ctx.post == null ? null : ctx.post.time), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.post == null ? null : ctx.post.image);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.selected);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.selected);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.selected);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.showComments && ctx.selected && ctx.post.survey_description);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.selected);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.showComments);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgTemplateOutlet, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormControlName, _shared_scroll_tracker_directive__WEBPACK_IMPORTED_MODULE_5__.ScrollTrackerDirective, _shared_unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_6__.UnsafeInnerHTMLDirective, _post_series_post_series_component__WEBPACK_IMPORTED_MODULE_7__.PostSeriesComponent, _post_survey_post_survey_component__WEBPACK_IMPORTED_MODULE_8__.PostSurveyComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DatePipe],
    styles: [".similar-heading[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  margin: 0 0 3rem 0;\n}\n\n.hr[_ngcontent-%COMP%] {\n  border-color: rgba(77, 38, 0, 0.4) rgba(77, 38, 0, 0.4) rgba(255, 243, 230, 0.5) rgba(255, 243, 230, 0.5);\n  border-width: 1px;\n  border-style: solid;\n}\n\n.post-title[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n  position: relative;\n  cursor: pointer;\n  display: flex;\n  align-items: flex-end;\n}\n.post-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: -0.4rem;\n  line-height: 3rem;\n  transition: all 500ms;\n  flex-grow: 1;\n  display: inline-block;\n  vertical-align: baseline;\n  font-style: italic;\n  position: relative;\n  z-index: 2;\n  max-width: 85%;\n}\n.post-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\n  bottom: 3px;\n  left: -1rem;\n}\n.post-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  transition: font-size 500ms, margin 500ms;\n  display: block;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  z-index: 2;\n  text-align: right;\n  white-space: nowrap;\n}\n.post-title[_ngcontent-%COMP%]   .hr[_ngcontent-%COMP%] {\n  position: absolute;\n  transition: width 500ms 500ms, opacity 500ms;\n  opacity: 0;\n  width: 0;\n  right: 100%;\n  margin-right: 2rem;\n  top: 0.7rem;\n  z-index: 2;\n}\n.post-title.has-image[_ngcontent-%COMP%] {\n  height: 5rem;\n}\n.post-title.has-image[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .post-title.has-image[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: white;\n  text-shadow: -2px 2px 2px rgba(77, 38, 0, 0.4);\n}\n.post-title[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  bottom: 0;\n  z-index: 1;\n  overflow: hidden;\n  transition: height 500ms;\n  height: 5rem;\n  border-radius: 2px 2px 0 0;\n}\n.post-title[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border: 0;\n  box-shadow: none;\n  border-radius: 0;\n  max-width: 700px;\n  width: 700px;\n  position: absolute;\n  bottom: 0;\n  margin: 0;\n  left: 50%;\n  transform: translate(-50%, 27%);\n  transition: transform 500ms;\n}\n\n@media only screen and (max-width: 500px) {\n  .wrapper[_ngcontent-%COMP%] {\n    position: relative;\n  }\n  .wrapper[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%] {\n    left: -2rem;\n    right: -2rem;\n    width: auto;\n  }\n  .summary[_ngcontent-%COMP%] {\n    padding-bottom: 1rem;\n  }\n}\n.tools[_ngcontent-%COMP%] {\n  color: #111;\n  padding: 0;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n.tools[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  cursor: pointer;\n  font-family: \"Playfair Display\", serif;\n  text-transform: uppercase;\n  font-style: italic;\n}\n\n.summary[_ngcontent-%COMP%] {\n  overflow: visible;\n  opacity: 1;\n  transition: opacity 300ms;\n  cursor: pointer;\n}\n.summary[_ngcontent-%COMP%]     p {\n  margin: 0;\n}\n\n.selected[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin: 0 4rem 1rem;\n  line-height: 4rem;\n  border: 0;\n  padding: 0;\n}\n.selected[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]::before {\n  width: 0;\n  height: 0;\n}\n.selected[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 3rem;\n  font-size: 1.25rem;\n  white-space: nowrap;\n}\n.selected[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   .hr[_ngcontent-%COMP%] {\n  width: 450px;\n  opacity: 1;\n}\n.selected[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%] {\n  height: 27rem;\n}\n.selected[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   .image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: translate(-50%, 0);\n}\n@media only screen and (max-width: 500px) {\n  .selected[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%] {\n    position: relative;\n  }\n  .selected[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    margin: 0 0 2rem;\n    -webkit-hyphens: auto;\n            hyphens: auto;\n    width: 100%;\n  }\n}\n\n.transition-disclaimer[_ngcontent-%COMP%] {\n  margin: 0 2rem 2rem;\n}\n.transition-disclaimer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-style: italic;\n}\n\n.post[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n.post[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%] {\n  text-align: right;\n  font-style: italic;\n}\n\napp-post-series[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n\n.comments[_ngcontent-%COMP%] {\n  margin-bottom: 4rem;\n}\n.comments[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%] {\n  text-align: right;\n  font-family: \"Playfair Display\", serif;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  margin-bottom: 1rem;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%] {\n  margin: 0 0 4rem;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  line-height: 2rem;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n  margin-left: 2rem;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .disclaimer[_ngcontent-%COMP%], .comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .disclaimer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-align: right;\n  font-size: 14px;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  width: 100%;\n  font-size: 20px;\n  position: relative;\n  font-family: \"Cormorant Garamond\", serif;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: 0;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  float: right;\n  font-size: 1.5rem;\n  margin-top: 1rem;\n  font-family: \"Playfair Display\", serif;\n  font-style: italic;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  font-family: \"Playfair Display\", serif;\n  font-style: italic;\n  border: 0;\n  background: transparent;\n}\n.comments[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%]   .comment[_ngcontent-%COMP%]   .post-title[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX3ZhcnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvcG9zdC9wb3N0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztDQUFBO0FDRUE7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0FBY0Y7O0FBUEE7RUFDRSx5R0FBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFVRjs7QUFQQTtFQUNFLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0FBVUY7QUFSRTtFQUNFLGVBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsY0FBQTtBQVVKO0FBUkk7RUFDRSxXQUFBO0VBQ0EsV0FBQTtBQVVOO0FBTkU7RUFDRSx5Q0FBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFRSjtBQUxFO0VBQ0Usa0JBQUE7RUFDQSw0Q0FBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7QUFPSjtBQUpFO0VBQ0UsWUFBQTtBQU1KO0FBSkk7RUFDRSxZQUFBO0VBQ0EsOENBQUE7QUFNTjtBQUZFO0VBQ0Usa0JBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSx3QkFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtBQUlKO0FBRkk7RUFDRSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFNBQUE7RUFDQSxTQUFBO0VBQ0EsK0JBQUE7RUFDQSwyQkFBQTtBQUlOOztBQUNBO0VBQ0U7SUFDRSxrQkFBQTtFQUVGO0VBR0k7SUFDRSxXQUFBO0lBQ0EsWUFBQTtJQUNBLFdBQUE7RUFETjtFQU1BO0lBQ0Usb0JBQUE7RUFKRjtBQUNGO0FBT0E7RUFDRSxXRHBGVztFQ3FGWCxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBRUEsOEJBQUE7QUFORjtBQVFFO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VEbEZGLHNDQUFBO0VDb0ZFLHlCQUFBO0VBQ0Esa0JBQUE7QUFOSjs7QUFVQTtFQUNFLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBQVBGO0FBU0U7RUFDRSxTQUFBO0FBUEo7O0FBYUk7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBVk47QUFZTTtFQUNFLFFBQUE7RUFDQSxTQUFBO0FBVlI7QUFjSTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQVpOO0FBZUk7RUFDRSxZQUFBO0VBQ0EsVUFBQTtBQWJOO0FBZ0JJO0VBQ0UsYUFBQTtBQWROO0FBZ0JNO0VBQ0UsNkJBQUE7QUFkUjtBQWtCSTtFQWpDRjtJQWtDSSxrQkFBQTtFQWZKO0VBaUJJO0lBQ0UsZ0JBQUE7SUFDQSxxQkFBQTtZQUFBLGFBQUE7SUFDQSxXQUFBO0VBZk47QUFDRjs7QUFvQkE7RUFDRSxtQkFBQTtBQWpCRjtBQWtCRTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtBQWhCSjs7QUFvQkE7RUFDRSxnQkFBQTtBQWpCRjtBQW9CRTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7QUFsQko7O0FBc0JBO0VBQ0UsZ0JBQUE7QUFuQkY7O0FBc0JBO0VBQ0UsbUJBQUE7QUFuQkY7QUFxQkU7RUFDRSxpQkFBQTtFRDVLRixzQ0FBQTtBQzBKRjtBQXNCRTtFQUNFLGdCQUFBO0FBcEJKO0FBc0JJO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQXBCTjtBQXVCSTtFQUNFLGdCQUFBO0FBckJOO0FBdUJNOztFQUVFLGVBQUE7RUFDQSxpQkFBQTtBQXJCUjtBQXdCTTtFQUNFLGlCQUFBO0FBdEJSO0FBd0JROztFQUVFLGlCQUFBO0VBQ0EsZUFBQTtBQXRCVjtBQXlCUTtFQUNFLFNBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUR2TlIsd0NBQUE7QUNpTUY7QUF5QlU7RUFDRSxVQUFBO0FBdkJaO0FBMkJRO0VBQ0UsU0FBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUQ1TlIsc0NBQUE7RUM4TlEsa0JBQUE7QUF6QlY7QUE4QlE7RURuT04sc0NBQUE7RUNxT1Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7QUE1QlY7QUE4QlU7RUFDRSxVQUFBO0FBNUJaIiwic291cmNlc0NvbnRlbnQiOlsiLypcbk9GRklDSUFMIERFTllDT05GT1JNSVRZLkNPTSBDT0xPUiBQQUxMRVRURURFVEVcblxuQ09MT1JcdFx0UkVTVElOR1x0XHRBQ1RJVkVcblxuQkxVRVx0XHQjMDA2NkZGXHRcdCM2Njk5RkZcblJFRFx0XHRcdCNjYzAwMDBcdFx0I2ZmNjY2NlxuWUVMTE9XXHRcdCNmZmNjMDBcdFx0I2ZmZmY5OVxuR1JFRU5cdFx0IzAwNjYwMFx0XHQjMDM5MTE0XG5QVVJQTEVcdFx0IzY2MzM5OVx0XHQjOTkzM2NjXG5HUkVZXHRcdCM0MDQwNDBcdFx0IzY2NjY2NlxuXG5PUkFOR0VcdFx0I2ZmNjYwMFx0XHQjZmY5OTMzXG5cbiovXG4kZGMtYmx1ZTogIzAwNjZGRjtcbiRkYy1yZWQ6ICNDQzAwMDA7XG4kZGMteWVsbG93OiAjRkZDQzAwO1xuJGRjLWdyZWVuOiAjMDA2NjAwO1xuJGRjLXB1cnBsZTogIzY2MzM5OTtcbiRkYy1ncmV5OiAjNDA0MDQwO1xuJGRjLW9yYW5nZTogI2Y2MDtcblxuJHNoYWRvdy1jb2xvcjogcmdiYSgwLDAsMCwwLjEyKTtcblxuJGNhcmQtc2hhZG93OiAwcHggNXB4IDVweCAtM3B4ICRzaGFkb3ctY29sb3IsXG4gICAgICAgICAgICAgIDBweCA4cHggMTBweCAxcHggJHNoYWRvdy1jb2xvcixcbiAgICAgICAgICAgICAgMHB4IDNweCAxNHB4IDJweCAkc2hhZG93LWNvbG9yO1xuXG4kY2FyZC1xdWlldC1zaGFkb3c6IDBweCAycHggMXB4IC0xcHggJHNoYWRvdy1jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgMHB4IDFweCAxcHggMHB4ICRzaGFkb3ctY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIDBweCAxcHggM3B4IDBweCAkc2hhZG93LWNvbG9yO1xuXG4vLyBtZWRpYSBxdWVyeSBuYW1lc1xuJG1lZGlhLW1vYmlsZTogXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTAwcHgpXCI7XG5cbiRjb2xvci1oaWdobGlnaHQ6IHJnYmEoMjU1LCAyNDMsIDIzMCwgMC41KTtcbiRjb2xvci1zaGFkb3c6IHJnYmEoNzcsIDM4LCAwLCAwLjQpO1xuJGNvbG9yLXRleHQ6ICMxMTE7XG5cbkBtaXhpbiBmb250IHtcbiAgZm9udC1mYW1pbHk6IFwiQ29ybW9yYW50IEdhcmFtb25kXCIsIHNlcmlmO1xufVxuXG5AbWl4aW4gZm9udC10aXRsZSB7XG4gIGZvbnQtZmFtaWx5OiBcIkxvdmVycyBRdWFycmVsXCIsIGN1cnNpdmU7XG59XG5cbkBtaXhpbiBmb250LXN1YnRpdGxlIHtcbiAgZm9udC1mYW1pbHk6IFwiUGxheWZhaXIgRGlzcGxheVwiLCBzZXJpZjtcbn1cbiIsIkBpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdmFyc1wiO1xuXG4uc2ltaWxhci1oZWFkaW5nIHtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBtYXJnaW46IDAgMCAzcmVtIDA7XG59XG5cbi53cmFwcGVyIHtcbiAgLy8gbWFyZ2luLWJvdHRvbTogNXJlbTtcbn1cblxuLmhyIHtcbiAgYm9yZGVyLWNvbG9yOiAkY29sb3Itc2hhZG93ICRjb2xvci1zaGFkb3cgJGNvbG9yLWhpZ2hsaWdodCAkY29sb3ItaGlnaGxpZ2h0O1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbn1cblxuLnBvc3QtdGl0bGUge1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG5cbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAtMC40cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAzcmVtO1xuICAgIHRyYW5zaXRpb246IGFsbCA1MDBtcztcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDI7XG4gICAgbWF4LXdpZHRoOiA4NSU7XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgYm90dG9tOiAzcHg7XG4gICAgICBsZWZ0OiAtMXJlbTtcbiAgICB9XG4gIH1cblxuICBoMyB7XG4gICAgdHJhbnNpdGlvbjogZm9udC1zaXplIDUwMG1zLCBtYXJnaW4gNTAwbXM7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICB6LWluZGV4OiAyO1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIH1cblxuICAuaHIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0cmFuc2l0aW9uOiB3aWR0aCA1MDBtcyA1MDBtcywgb3BhY2l0eSA1MDBtcztcbiAgICBvcGFjaXR5OiAwO1xuICAgIHdpZHRoOiAwO1xuICAgIHJpZ2h0OiAxMDAlO1xuICAgIG1hcmdpbi1yaWdodDogMnJlbTtcbiAgICB0b3A6IDAuN3JlbTtcbiAgICB6LWluZGV4OiAyO1xuICB9XG5cbiAgJi5oYXMtaW1hZ2Uge1xuICAgIGhlaWdodDogNXJlbTtcblxuICAgIGgyLCBoMyB7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB0ZXh0LXNoYWRvdzogLTJweCAycHggMnB4ICRjb2xvci1zaGFkb3c7XG4gICAgfVxuICB9XG5cbiAgLmltYWdlLXdyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvdHRvbTogMDtcbiAgICB6LWluZGV4OiAxO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdHJhbnNpdGlvbjogaGVpZ2h0IDUwMG1zO1xuICAgIGhlaWdodDogNXJlbTtcbiAgICBib3JkZXItcmFkaXVzOiAycHggMnB4IDAgMDtcblxuICAgIGltZyB7XG4gICAgICBib3JkZXI6IDA7XG4gICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIG1heC13aWR0aDogNzAwcHg7XG4gICAgICB3aWR0aDogNzAwcHg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDA7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBsZWZ0OiA1MCU7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAyNyUpO1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDUwMG1zO1xuICAgIH1cbiAgfVxufVxuXG5AbWVkaWEgI3skbWVkaWEtbW9iaWxlfSB7XG4gIC53cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAucG9zdC10aXRsZSB7XG4gICAgICAvLyBwb3NpdGlvbjogc3RhdGljO1xuXG4gICAgICAuaW1hZ2Utd3JhcHBlciB7XG4gICAgICAgIGxlZnQ6IC0ycmVtO1xuICAgICAgICByaWdodDogLTJyZW07XG4gICAgICAgIHdpZHRoOiBhdXRvO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5zdW1tYXJ5IHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbiAgfVxufVxuXG4udG9vbHMge1xuICBjb2xvcjogJGNvbG9yLXRleHQ7XG4gIHBhZGRpbmc6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIC8vIG92ZXJmbG93OiBoaWRkZW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcblxuICAuYnRuIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgQGluY2x1ZGUgZm9udC1zdWJ0aXRsZTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgfVxufVxuXG4uc3VtbWFyeSB7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAxO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDMwMG1zO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgOjpuZy1kZWVwIHAge1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4uc2VsZWN0ZWQge1xuICAucG9zdC10aXRsZSB7XG4gICAgaDIge1xuICAgICAgZm9udC1zaXplOiA0cmVtO1xuICAgICAgbWFyZ2luOiAwIDRyZW0gMXJlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiA0cmVtO1xuICAgICAgYm9yZGVyOiAwO1xuICAgICAgcGFkZGluZzogMDtcblxuICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoMyB7XG4gICAgICBtYXJnaW4tdG9wOiAzcmVtO1xuICAgICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB9XG5cbiAgICAuaHIge1xuICAgICAgd2lkdGg6IDQ1MHB4O1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG5cbiAgICAuaW1hZ2Utd3JhcHBlciB7XG4gICAgICBoZWlnaHQ6IDI3cmVtOyAvLyBTb21ld2hhdCBtYXRjaGVzIHRoZSBnb2xkZW4gcmF0aW8uXG5cbiAgICAgIGltZyB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAjeyRtZWRpYS1tb2JpbGV9IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgaDIge1xuICAgICAgICBtYXJnaW46IDAgMCAycmVtO1xuICAgICAgICBoeXBoZW5zOiBhdXRvO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLnRyYW5zaXRpb24tZGlzY2xhaW1lciB7XG4gIG1hcmdpbjogMCAycmVtIDJyZW07XG4gIHAge1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIH1cbn1cblxuLnBvc3Qge1xuICBtYXJnaW4tdG9wOiAycmVtO1xuICAvLyBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICYgPiBoMyB7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICB9XG59XG5cbmFwcC1wb3N0LXNlcmllcyB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG59XG5cbi5jb21tZW50cyB7XG4gIG1hcmdpbi1ib3R0b206IDRyZW07XG5cbiAgLnN1bW1hcnkge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIEBpbmNsdWRlIGZvbnQtc3VidGl0bGU7XG4gIH1cblxuICAubGlzdCB7XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcblxuICAgICYgPiBoMyB7XG4gICAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgIH1cblxuICAgIC5jb21tZW50IHtcbiAgICAgIG1hcmdpbjogMCAwIDRyZW07XG5cbiAgICAgIGgyLFxuICAgICAgaW5wdXQge1xuICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xuICAgICAgfVxuXG4gICAgICAudGV4dCB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAycmVtO1xuXG4gICAgICAgIC5kaXNjbGFpbWVyLFxuICAgICAgICAuZGlzY2xhaW1lciBhIHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0YXJlYSB7XG4gICAgICAgICAgYm9yZGVyOiAwO1xuICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgQGluY2x1ZGUgZm9udDtcblxuICAgICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidXR0b24ge1xuICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgICAgICBAaW5jbHVkZSBmb250LXN1YnRpdGxlO1xuICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAucG9zdC10aXRsZSB7XG4gICAgICAgIGlucHV0IHtcbiAgICAgICAgICBAaW5jbHVkZSBmb250LXN1YnRpdGxlO1xuICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cbiAgICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'summary',
        outStyle: {
          'height': '0',
          'opacity': '0'
        },
        inStyle: {
          'height': '*',
          'opacity': '1'
        },
        durationMs: 300
      }), (0,_shared_anim__WEBPACK_IMPORTED_MODULE_0__.createToggle)({
        name: 'wrapper',
        outStyle: {
          'height': '0',
          'margin': '0',
          'opacity': '0'
        },
        inStyle: {
          'height': '*',
          'margin': '*',
          'opacity': '1'
        },
        durationMs: 500
      })]
    }
  });
}

/***/ }),

/***/ 1580:
/*!**************************************************!*\
  !*** ./src/app/read-post/read-post.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReadPostComponent": () => (/* binding */ ReadPostComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/post.service */ 9166);
/* harmony import */ var _shared_markdown_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/markdown-service.service */ 1937);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _shared_unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/unsafe-inner-html.directive */ 5904);






const _c0 = ["layoutPage"];
const _c1 = ["content"];
function ReadPostComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function ReadPostComponent_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 11);
  }
  if (rf & 2) {
    const page_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("unsafeInnerHTML", page_r3.outerHTML);
  }
}
function ReadPostComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ReadPostComponent_ng_container_1_div_1_Template, 1, 1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const i_r4 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", i_r4 === ctx_r1.selectedPageIndex);
  }
}
class ReadPostComponent {
  constructor(postService, changeDetectorRef, markdownService) {
    this.postService = postService;
    this.changeDetectorRef = changeDetectorRef;
    this.markdownService = markdownService;
    this.pageContent = [];
    this.selectedPageIndex = -1;
    this.closeEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
  }
  get viewableArea() {
    return this.layoutPage.nativeElement.querySelector('.viewable-area') || document.createElement('div');
  }
  get viewableHeight() {
    return this.viewableArea.clientHeight;
  }
  ngAfterViewInit() {
    document.body.classList.add('disable-scroll');
    const postContent = document.createElement('div');
    postContent.innerHTML = `
    <h2>${this.post.title}</h2>
    <div class="content book-layout-top">
    ${this.renderText(this.post)}
    </div>`;
    this.currentIterationTarget = this.viewableArea;
    this.loopThroughChildNodes(postContent);
    this.pageContent.push(this.viewableArea.cloneNode(true));
    console.log('pages', this.pageContent, this.viewableArea);
    this.selectedPageIndex = 0;
    this.changeDetectorRef.detectChanges();
  }
  renderText(post) {
    if (post.markdown) {
      return this.markdownService.convert(post.text);
    } else {
      return this.postService.decodeString(post.text);
    }
  }
  close() {
    document.body.classList.remove('disable-scroll');
    this.closeEvent.next();
  }
  prevPage() {
    if (this.selectedPageIndex > 0) {
      this.selectedPageIndex--;
    }
  }
  nextPage() {
    if (this.selectedPageIndex < this.pageContent.length - 1) {
      this.selectedPageIndex++;
    }
  }
  isCurrentTargetOut() {
    return this.viewableArea.scrollHeight > this.viewableHeight + 10;
  }
  loopThroughChildNodes(source) {
    console.log('source', source);
    source.childNodes.forEach(child => {
      if (child.nodeValue && !child.nodeValue.trim()) {
        return;
      }
      console.log('child', child.nodeType, 'target', this.currentIterationTarget.tagName, this.currentIterationTarget.className);
      if (child.nodeType === Node.TEXT_NODE) {
        const words = child.textContent.split(' ');
        const wordsToUse = [];
        console.log('injecting', words.length, 'words to', this.currentIterationTarget.tagName, this.currentIterationTarget.className);
        while (!this.isCurrentTargetOut() && words.length) {
          wordsToUse.push(words.shift());
          this.currentIterationTarget.innerHTML = wordsToUse.join(' ');
        }
        if (this.isCurrentTargetOut() && wordsToUse.length) {
          words.unshift(wordsToUse.pop());
          this.currentIterationTarget.innerHTML = wordsToUse.join(' ');
        }
        if (words.length) {
          // The text overflows the page.
          let nextParent = this.currentIterationTarget.cloneNode(false);
          nextParent.innerHTML = words.join(' ');
          console.log('did not fit to', this.currentIterationTarget.outerHTML, 'clone:', nextParent, 'parent:', this.currentIterationTarget.parentElement.className);
          if (!wordsToUse.length) {
            console.log('at all');
            // const toRemove = this.currentIterationTarget;
            this.currentIterationTarget = this.currentIterationTarget.parentElement;
            // toRemove.remove();
          } else {
            console.log('words:', wordsToUse.length, words.length);
            this.currentIterationTarget = this.currentIterationTarget.parentElement;
          }
          let count = 0;
          console.log('new target', this.currentIterationTarget.tagName, this.currentIterationTarget.className);
          while (!nextParent.classList.contains('book-layout-top') && !nextParent.classList.contains('viewable-area') && count < 20) {
            const newNextParent = this.currentIterationTarget.cloneNode(false);
            newNextParent.appendChild(nextParent);
            nextParent = newNextParent;
            count++;
            this.currentIterationTarget = this.currentIterationTarget.parentElement;
          }
          this.pageContent.push(this.viewableArea.cloneNode(true));
          this.viewableArea.innerHTML = '';
          this.currentIterationTarget = document.createElement('div');
          this.currentIterationTarget.className = 'content book-layout-top';
          this.viewableArea.appendChild(this.currentIterationTarget);
          console.log('looping through', nextParent, 'target:', this.currentIterationTarget.tagName, this.currentIterationTarget.className);
          if (nextParent) {
            this.loopThroughChildNodes(nextParent);
          }
        } else {
          console.log('did fit!', this.currentIterationTarget.tagName);
          this.currentIterationTarget = this.currentIterationTarget.parentElement;
        }
      } else {
        const newChild = child.cloneNode(true);
        this.currentIterationTarget.append(newChild);
        console.log('child is tag', newChild.tagName, newChild.className, 'is out?', this.isCurrentTargetOut(), 'target', this.currentIterationTarget.tagName, this.currentIterationTarget.className);
        if (this.isCurrentTargetOut()) {
          if (newChild.hasChildNodes) {
            const clone = newChild.cloneNode(true);
            newChild.innerHTML = '';
            this.currentIterationTarget = newChild;
            this.loopThroughChildNodes(clone);
            // this.currentIterationTarget =
            // this.currentIterationTarget.parentElement;
          } else {
            newChild.remove();
            this.pageContent.push(this.viewableArea.cloneNode(true));
            this.viewableArea.innerHTML = '';
            this.currentIterationTarget = this.viewableArea;
            this.viewableArea.appendChild(newChild);
          }
        }
      }
    });
  }
  decodeString(string) {
    return this.postService.decodeString(string);
  }
  static #_ = this.ɵfac = function ReadPostComponent_Factory(t) {
    return new (t || ReadPostComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_post_service__WEBPACK_IMPORTED_MODULE_0__.PostService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_shared_markdown_service_service__WEBPACK_IMPORTED_MODULE_1__.MarkdownServiceService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ReadPostComponent,
    selectors: [["app-read-post"]],
    viewQuery: function ReadPostComponent_Query(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 5);
      }
      if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.layoutPage = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
      }
    },
    inputs: {
      post: "post"
    },
    outputs: {
      closeEvent: "close"
    },
    decls: 10,
    vars: 2,
    consts: [["class", "page layout-page", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "controls", "left"], [1, "close"], [3, "click"], [1, "prev", 3, "click"], [1, "next", 3, "click"], [1, "page", "layout-page"], ["layoutPage", ""], [1, "viewable-area"], ["class", "page", 3, "unsafeInnerHTML", 4, "ngIf"], [1, "page", 3, "unsafeInnerHTML"]],
    template: function ReadPostComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, ReadPostComponent_div_0_Template, 3, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ReadPostComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ReadPostComponent_Template_button_click_4_listener() {
          return ctx.close();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "x");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ReadPostComponent_Template_button_click_6_listener() {
          return ctx.prevPage();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " < ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ReadPostComponent_Template_button_click_8_listener() {
          return ctx.nextPage();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, " > ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.post && ctx.selectedPageIndex === -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.pageContent);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _shared_unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_2__.UnsafeInnerHTMLDirective],
    styles: ["[_nghost-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 10;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  justify-content: flex-end;\n  max-height: 1288px;\n}\n.controls[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-family: \"Playfair Display\", serif;\n  font-weight: bold;\n  padding: 1rem;\n  font-size: 1.5rem;\n  height: 10vh;\n  box-sizing: border-box;\n  border: 0;\n  background-color: rgba(255, 255, 255, 0.8);\n  border-top: 1px solid rgba(255, 255, 255, 0.35);\n  border-right: 1px solid rgba(255, 255, 255, 0.35);\n  border-bottom: 1px solid rgba(64, 64, 64, 0.35);\n}\n.controls[_ngcontent-%COMP%]   button.next[_ngcontent-%COMP%] {\n  height: 30vh;\n}\n.controls[_ngcontent-%COMP%]   button.prev[_ngcontent-%COMP%] {\n  border-top-right-radius: 2px;\n}\n\n.page[_ngcontent-%COMP%] {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.12), 0px 8px 10px 1px rgba(0, 0, 0, 0.12), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n  width: 95vw;\n  max-width: 800px;\n  height: 100vh;\n  max-height: 1288px;\n  background: white;\n  padding: 3rem;\n  box-sizing: border-box;\n  color: #404040;\n}\n.page[_ngcontent-%COMP%]     .viewable-area {\n  width: 100%;\n  height: 100%;\n}\n.page[_ngcontent-%COMP%]     h2 {\n  font-family: \"Playfair Display\", serif;\n  font-size: 3rem;\n  text-align: center;\n  font-weight: 100;\n  padding: 3rem 0;\n  font-style: italic;\n}\n.page[_ngcontent-%COMP%]     .content {\n  line-height: 1.5rem;\n  text-align: justify;\n}\n.page[_ngcontent-%COMP%]     .content p {\n  font-size: 22px;\n}\n.page[_ngcontent-%COMP%]     .content p:last-child {\n  margin-bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvX3ZhcnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmVhZC1wb3N0L3JlYWQtcG9zdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Q0FBQTtBQ0VBO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxvQ0FBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQWNGOztBQVhBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUFjRjtBQVpFO0VBQ0UsWUFBQTtBQWNKO0FBWEU7RUR1QkEsc0NBQUE7RUNyQkUsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0VBQ0EsMENBQUE7RUFDQSwrQ0FBQTtFQUNBLGlEQUFBO0VBQ0EsK0NBQUE7QUFhSjtBQVhJO0VBQ0UsWUFBQTtBQWFOO0FBWEk7RUFDRSw0QkFBQTtBQWFOOztBQVJBO0VBQ0UsNEhEeEJZO0VDeUJaLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsY0RyQ1E7QUNnRFY7QUFSSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBVU47QUFQSTtFRGhCRixzQ0FBQTtFQ2tCSSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQVNOO0FBTkk7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBUU47QUFOTTtFQUNFLGVBQUE7QUFRUjtBQUxNO0VBQ0UsZ0JBQUE7QUFPUiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5PRkZJQ0lBTCBERU5ZQ09ORk9STUlUWS5DT00gQ09MT1IgUEFMTEVUVEVERVRFXG5cbkNPTE9SXHRcdFJFU1RJTkdcdFx0QUNUSVZFXG5cbkJMVUVcdFx0IzAwNjZGRlx0XHQjNjY5OUZGXG5SRURcdFx0XHQjY2MwMDAwXHRcdCNmZjY2NjZcbllFTExPV1x0XHQjZmZjYzAwXHRcdCNmZmZmOTlcbkdSRUVOXHRcdCMwMDY2MDBcdFx0IzAzOTExNFxuUFVSUExFXHRcdCM2NjMzOTlcdFx0Izk5MzNjY1xuR1JFWVx0XHQjNDA0MDQwXHRcdCM2NjY2NjZcblxuT1JBTkdFXHRcdCNmZjY2MDBcdFx0I2ZmOTkzM1xuXG4qL1xuJGRjLWJsdWU6ICMwMDY2RkY7XG4kZGMtcmVkOiAjQ0MwMDAwO1xuJGRjLXllbGxvdzogI0ZGQ0MwMDtcbiRkYy1ncmVlbjogIzAwNjYwMDtcbiRkYy1wdXJwbGU6ICM2NjMzOTk7XG4kZGMtZ3JleTogIzQwNDA0MDtcbiRkYy1vcmFuZ2U6ICNmNjA7XG5cbiRzaGFkb3ctY29sb3I6IHJnYmEoMCwwLDAsMC4xMik7XG5cbiRjYXJkLXNoYWRvdzogMHB4IDVweCA1cHggLTNweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAwcHggOHB4IDEwcHggMXB4ICRzaGFkb3ctY29sb3IsXG4gICAgICAgICAgICAgIDBweCAzcHggMTRweCAycHggJHNoYWRvdy1jb2xvcjtcblxuJGNhcmQtcXVpZXQtc2hhZG93OiAwcHggMnB4IDFweCAtMXB4ICRzaGFkb3ctY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIDBweCAxcHggMXB4IDBweCAkc2hhZG93LWNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAwcHggMXB4IDNweCAwcHggJHNoYWRvdy1jb2xvcjtcblxuLy8gbWVkaWEgcXVlcnkgbmFtZXNcbiRtZWRpYS1tb2JpbGU6IFwib25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB4KVwiO1xuXG4kY29sb3ItaGlnaGxpZ2h0OiByZ2JhKDI1NSwgMjQzLCAyMzAsIDAuNSk7XG4kY29sb3Itc2hhZG93OiByZ2JhKDc3LCAzOCwgMCwgMC40KTtcbiRjb2xvci10ZXh0OiAjMTExO1xuXG5AbWl4aW4gZm9udCB7XG4gIGZvbnQtZmFtaWx5OiBcIkNvcm1vcmFudCBHYXJhbW9uZFwiLCBzZXJpZjtcbn1cblxuQG1peGluIGZvbnQtdGl0bGUge1xuICBmb250LWZhbWlseTogXCJMb3ZlcnMgUXVhcnJlbFwiLCBjdXJzaXZlO1xufVxuXG5AbWl4aW4gZm9udC1zdWJ0aXRsZSB7XG4gIGZvbnQtZmFtaWx5OiBcIlBsYXlmYWlyIERpc3BsYXlcIiwgc2VyaWY7XG59XG4iLCJAaW1wb3J0IFwiLi4vLi4vc3R5bGVzL3ZhcnNcIjtcblxuOmhvc3Qge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xuICB6LWluZGV4OiAxMDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5jb250cm9scyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgbWF4LWhlaWdodDogMTI4OHB4O1xuXG4gIC5jbG9zZSB7XG4gICAgZmxleC1ncm93OiAxO1xuICB9XG5cbiAgYnV0dG9uIHtcbiAgICBAaW5jbHVkZSBmb250LXN1YnRpdGxlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgaGVpZ2h0OiAxMHZoO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwgMC4zNSk7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwgMC4zNSk7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoJGRjLWdyZXksIDAuMzUpO1xuXG4gICAgJi5uZXh0IHtcbiAgICAgIGhlaWdodDogMzB2aDtcbiAgICB9XG4gICAgJi5wcmV2IHtcbiAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAycHg7XG4gICAgfVxuICB9XG59XG5cbi5wYWdlIHtcbiAgYm94LXNoYWRvdzogJGNhcmQtc2hhZG93O1xuICB3aWR0aDogOTV2dztcbiAgbWF4LXdpZHRoOiA4MDBweDtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgbWF4LWhlaWdodDogMTI4OHB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgcGFkZGluZzogM3JlbTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgY29sb3I6ICRkYy1ncmV5O1xuXG4gIDo6bmctZGVlcHtcbiAgICAudmlld2FibGUtYXJlYSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG5cbiAgICBoMiB7XG4gICAgICBAaW5jbHVkZSBmb250LXN1YnRpdGxlO1xuICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICAgIHBhZGRpbmc6IDNyZW0gMDtcbiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICB9XG5cbiAgICAuY29udGVudCB7XG4gICAgICBsaW5lLWhlaWdodDogMS41cmVtO1xuICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcblxuICAgICAgcCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIH1cblxuICAgICAgcDpsYXN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
  });
}

/***/ }),

/***/ 746:
/*!**********************************************!*\
  !*** ./src/app/services/csrf.interceptor.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CsrfInterceptor": () => (/* binding */ CsrfInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

class CsrfInterceptor {
  intercept(req, next) {
    let csrfCookie = '';
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      csrfCookie = cookies.find(cookie => {
        return cookie.indexOf('csrftoken=') === 0;
      }) || '';
      csrfCookie = csrfCookie.replace('csrftoken=', '');
    }
    const newReq = req.clone({
      setHeaders: {
        'X-CSRFToken': csrfCookie
      }
    });
    return next.handle(newReq);
  }
  static #_ = this.ɵfac = function CsrfInterceptor_Factory(t) {
    return new (t || CsrfInterceptor)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: CsrfInterceptor,
    factory: CsrfInterceptor.ɵfac
  });
}

/***/ }),

/***/ 3173:
/*!*****************************************************!*\
  !*** ./src/app/services/post-list-state.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostListStateService": () => (/* binding */ PostListStateService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 4505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9193);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 5398);
/* harmony import */ var _shared_ui_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ui.util */ 9980);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _post_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./post.service */ 9166);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6477);





class PostListStateService {
  get page() {
    return this.pageIndex;
  }
  get selectedPostId() {
    return this.selectedPostId_;
  }
  get selection$() {
    return this.postSelectionSubject.asObservable();
  }
  get series$() {
    return this.seriesSubject.asObservable();
  }
  constructor(postService, location) {
    this.postService = postService;
    this.location = location;
    this.pageIndex = 1;
    this.postListSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null);
    this.postSelectionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null);
    this.seriesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null);
    this.location.onUrlChange((url, state) => {
      const postsRegex = /\/posts\/([a-z0-9\-]+)$/gi;
      const seriesRegex = /\/series\/([a-z0-9\-]+)(;post=([a-z0-9\-]+))?$/gi;
      if (url.match(postsRegex)) {
        // If pushing a new post to the stack, select it and scroll to top.
        const slug = url.replace(postsRegex, '$1');
        if (state && this.selectedPostId) {
          // State is set if this was caused by the back button.
          // If a post is selected and we are going back to a different one,
          // we want a slightly different animation.
          (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)(this.postService.fetchPostById(this.selectedPostId), this.postService.fetchPost(slug)).subscribe(posts => {
            this.selectedPostId_ = null;
            this.broadcast({
              posts
            });
            setTimeout(() => {
              this.selectPost(slug);
            }, 650);
          });
        } else {
          this.selectPost(slug);
          // State is null when this is a new navigation - the user clicked on a
          // link.
          (0,_shared_ui_util__WEBPACK_IMPORTED_MODULE_0__.scrollToTop)();
        }
      } else if (url.match(seriesRegex)) {
        const slug = url.replace(seriesRegex, '$1');
        this.showSeries(slug);
        // If the url includes a series matrix param, load the series first.
        const postSlug = url.replace(seriesRegex, '$3');
        if (postSlug) {
          setTimeout(() => {
            this.selectPost(postSlug);
          }, 500);
        }
      } else {
        // Go "home"
        this.showList();
      }
      // If going back, scroll to the position in the scrollPositionHistory.
    });
  }

  broadcast({
    posts,
    more,
    series,
    loadingSimilar,
    similars
  }) {
    let items;
    if (posts) {
      items = posts.map(post => {
        return {
          post,
          type: 'post'
        };
      });
    } else if (series) {
      items = series.posts.map(post => {
        return {
          type: 'post',
          post: post.post
        };
      });
      items.unshift({
        type: 'series',
        series
      });
    } else {
      items = [{
        type: 'no_results'
      }];
    }
    if (more) {
      items.push({
        type: 'loadmore',
        page: this.pageIndex
      });
    }
    if (loadingSimilar) {
      items.push({
        type: 'similars_loading'
      });
    }
    if (similars) {
      items = items.concat([{
        type: 'similar_heading'
      }], similars.map(post => {
        return {
          post,
          type: 'post'
        };
      }));
    }
    this.postListSubject.next(items);
  }
  init(selectedPostSlug, selectedSeriesSlug) {
    if (selectedPostSlug) {
      this.selectPost(selectedPostSlug, 2000);
    } else if (selectedSeriesSlug) {
      this.showSeries(selectedSeriesSlug);
    } else {
      this.showList();
    }
    return this.postListSubject.asObservable();
  }
  nextPage() {
    if (this.postService.nextPageIndex >= this.pageIndex) {
      const pages = [];
      // Load all pages, including the next one.
      for (let cnt = 1; cnt <= this.pageIndex + 1; cnt++) {
        pages.push(this.postService.fetchPage(cnt));
      }
      this.pageSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)(...pages).subscribe(pageData => {
        this.pageIndex++;
        const posts = pageData.reduce((last, current) => last.concat(current));
        this.broadcast({
          posts,
          more: true
        });
      });
    }
  }
  loadSimilarPosts(post) {
    this.broadcast({
      posts: [post],
      loadingSimilar: true
    });
    this.pageSubscription = this.postService.fetchSimilarPosts(post).subscribe(posts => {
      this.broadcast({
        posts: [post],
        similars: posts
      });
    });
  }
  resetSubscriptions() {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    if (this.seriesSubscription) {
      this.seriesSubscription.unsubscribe();
    }
  }
  showSeries(seriesSlug) {
    this.resetSubscriptions();
    this.postService.fetchSeries(seriesSlug).subscribe(series => {
      // Hide any series summary objects.
      this.seriesSubject.next(null);
      // Deselect the post.
      this.selectedPostId_ = null;
      this.postSelectionSubject.next(null);
      // Show all the posts for this series.
      this.broadcast({
        series
      });
    });
  }
  showList() {
    this.resetSubscriptions();
    // Hide any series summary objects.
    this.seriesSubject.next(null);
    // Deselect the post.
    this.selectedPostId_ = null;
    this.postSelectionSubject.next(null);
    // Show all loaded posts.
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
    this.nextPage();
  }
  selectPost(postSlug, delay = 0) {
    this.resetSubscriptions();
    (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.timer)(delay), this.postService.fetchPost(postSlug)).subscribe(([, post]) => {
      // Only this post should show in the list.
      this.broadcast({
        posts: [post]
      });
      // This timeout makes sure the post animates in properly.
      setTimeout(() => {
        this.selectedPostId_ = post.id;
        this.postSelectionSubject.next(post);
      }, 10);
      // Load the series data for this post.
      this.seriesSubscription = this.postService.fetchSeriesForPost(post).subscribe(series => {
        this.seriesSubject.next(series);
      });
    });
  }
  static #_ = this.ɵfac = function PostListStateService_Factory(t) {
    return new (t || PostListStateService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_post_service__WEBPACK_IMPORTED_MODULE_1__.PostService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.Location));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: PostListStateService,
    factory: PostListStateService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 9166:
/*!******************************************!*\
  !*** ./src/app/services/post.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostService": () => (/* binding */ PostService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4139);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 6942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 8759);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 3765);





class PostService {
  constructor(http) {
    this.http = http;
    this.POST_URL = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.server}/api/posts`;
    this.SERIES_URL = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.server}/api/series`;
    this.TAGS_URL = `${src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.server}/api/tags`;
    this.totalPosts = 0;
    this.nextPageIndex = 1;
    // A map of Post IDs > page number
    this.pageToPosts = new Map();
    // A map of Post > post ID
    this.loadedPosts = new Map();
    // A map of slug > post ID
    this.postSlugs = new Map();
    // A map of series > series ID.
    this.seriesCache = new Map();
    // A map of slug > series ID.
    this.seriesSlugs = new Map();
    // A map of series ID > post ID.
    this.seriesToPost = new Map();
    this.seriesCache.set(-1, null);
  }
  rememberPost(post) {
    this.loadedPosts.set(post.id, post);
    this.postSlugs.set(post.slug, post.id);
  }
  fetchPage(page = this.nextPageIndex) {
    if (this.pageToPosts.has(page)) {
      const posts = [];
      for (const postId of this.pageToPosts.get(page)) {
        posts.push(this.loadedPosts.get(postId));
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(posts);
    } else if (page) {
      return this.http.get(`${this.POST_URL}?page=${page}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(response => {
        const postsOnThisPage = [];
        response.results.forEach(post => {
          postsOnThisPage.push(post.id);
          this.rememberPost(post);
        });
        this.pageToPosts.set(page, postsOnThisPage);
        if (response.next && page === this.nextPageIndex) {
          this.nextPageIndex++;
        } else {
          this.nextPageIndex = 0;
        }
        this.totalPosts = response.count;
        return response.results;
      }));
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)([]);
    }
  }
  fetchPost(slug) {
    if (this.postSlugs.has(slug)) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(this.loadedPosts.get(this.postSlugs.get(slug)));
    } else {
      return this.http.get(`${this.POST_URL}/${slug}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(post => {
        this.rememberPost(post);
      }));
    }
  }
  fetchPostById(id) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(this.loadedPosts.get(id));
  }
  getTripleMoon() {
    return this.fetchSeries('triple-moon');
  }
  getRandomPostByTag(tag) {
    return this.http.get(`${this.TAGS_URL}/${tag}/randompost`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(post => {
      console.log({
        post
      });
      this.rememberPost(post);
    }));
  }
  postClassName(post) {
    if (!post) {
      return '';
    }
    let className = 'post ';
    if (post && post.tags) {
      if (post.tags.includes('fiction')) {
        className += 'fiction';
      } else if (post.tags.includes('technology')) {
        className += 'technology';
      } else if (post.tags.includes('idea')) {
        className += 'idea';
      } else if (post.tags.includes('comedy')) {
        className += 'comedy';
      } else {
        className += post.tags[0];
      }
    }
    return className;
  }
  decodeString(string) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = string;
    let clean = textArea.value;
    if (clean.trim().indexOf('<p>') !== 0) {
      clean = `<p>${clean}</p>`;
    }
    clean = clean.replace(/<img src="([^"]*)" height="[0-9]+" width="[0-9]+"/gi, '<img src="$1"');
    return clean;
  }
  rememberSeries(series) {
    const id = series ? series.id : -1;
    this.seriesCache.set(id, series);
    if (series && series.posts) {
      this.seriesSlugs.set(series.slug, series.id);
      series.posts.forEach(p => {
        // So we can look up the series again for the other posts.
        this.seriesToPost.set(p.post.id, series.id);
      });
    }
  }
  fetchSeries(seriesSlug) {
    if (this.seriesSlugs.get(seriesSlug)) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(this.seriesCache.get(this.seriesSlugs.get(seriesSlug)));
    } else {
      return this.http.get(`${this.SERIES_URL}/${seriesSlug}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(series => {
        this.rememberSeries(series);
      }));
    }
  }
  fetchSeriesForPost(post) {
    if (post) {
      if (this.seriesToPost.has(post.id)) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(this.seriesCache.get(this.seriesToPost.get(post.id)));
      } else {
        return this.http.get(`${this.POST_URL}/${post.id}/series/`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(series => {
          this.seriesToPost.set(post.id, series ? series.id : -1);
          this.rememberSeries(series);
        }));
      }
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(null);
    }
  }
  fetchComments(post) {
    return this.http.get(`${this.POST_URL}/${post.id}/comments/`);
  }
  createComment(comment) {
    return this.http.post(`${this.POST_URL}/${comment.post}/comment/`, comment);
  }
  fetchSimilarPosts(post) {
    return this.http.get(`${this.POST_URL}/${post.slug}/similar/`);
  }
  fetchSurveyOptions(post) {
    return this.http.get(`${this.POST_URL}/${post.slug}/surveyoptions/`);
  }
  createSurveyOption(post, newOptionDeets) {
    return this.http.post(`${this.POST_URL}/${post.slug}/surveyoption/`, {
      name: newOptionDeets.name,
      text: newOptionDeets.text
    });
  }
  createSurveyVote(post, optionId, meta) {
    return this.http.post(`${this.POST_URL}/${post.slug}/surveyvote/`, {
      name: meta.name,
      text: meta.text,
      survey_option: optionId
    });
  }
  static #_ = this.ɵfac = function PostService_Factory(t) {
    return new (t || PostService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: PostService,
    factory: PostService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 554:
/*!********************************!*\
  !*** ./src/app/shared/anim.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createToggle": () => (/* binding */ createToggle)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 2223);

/**
 * Toggles between two styles.
 * @param name
 * @param outStyle
 * @param inStyle
 * @param duration
 * @param delay
 */
function createToggle(options) {
  const duration = options.durationMs || 250;
  const delay = options.delayMs || 0;
  const inString = options.inString || `${duration}ms ${delay}ms ease-in-out`;
  const outString = options.outString || inString;
  const inStyle = options.inStyle || _angular_animations__WEBPACK_IMPORTED_MODULE_0__.AUTO_STYLE;
  return (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)(options.name, [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)(inStyle), {
    params: options.params
  }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('void', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)(options.outStyle)), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('void => *', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(inString)), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => void', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(outString))]);
}

/***/ }),

/***/ 2926:
/*!*********************************!*\
  !*** ./src/app/shared/const.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "POST_PREFIX": () => (/* binding */ POST_PREFIX),
/* harmony export */   "SERIES_PREFIX": () => (/* binding */ SERIES_PREFIX)
/* harmony export */ });
/** The official URL prefix for posts. */
const POST_PREFIX = '/posts';
const SERIES_PREFIX = '/series';

/***/ }),

/***/ 1937:
/*!****************************************************!*\
  !*** ./src/app/shared/markdown-service.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MarkdownServiceService": () => (/* binding */ MarkdownServiceService)
/* harmony export */ });
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! showdown */ 4195);
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(showdown__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _services_post_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/post.service */ 9166);



class MarkdownServiceService {
  constructor(postService) {
    this.postService = postService;
    this.mdConverter = new showdown__WEBPACK_IMPORTED_MODULE_0__.Converter();
    this.mdConverter.setOption('openLinksInNewWindow', 'true');
    this.mdConverter.setOption('simplifiedAutoLink', 'true');
    this.mdConverter.setOption('excludeTrailingPunctuationFromURLs', 'true');
  }
  convert(text) {
    return this.mdConverter.makeHtml(text);
  }
  renderPostText(post, field = 'text') {
    if (!post) {
      return '';
    }
    const text = field === 'text' ? post.text : post.summary;
    if (post.markdown) {
      return this.convert(text);
    } else {
      return this.postService.decodeString(text);
    }
  }
  static #_ = this.ɵfac = function MarkdownServiceService_Factory(t) {
    return new (t || MarkdownServiceService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_services_post_service__WEBPACK_IMPORTED_MODULE_1__.PostService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: MarkdownServiceService,
    factory: MarkdownServiceService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 8382:
/*!****************************************************!*\
  !*** ./src/app/shared/scroll-tracker.directive.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SCROLL_CONTAINER_SELECTOR": () => (/* binding */ SCROLL_CONTAINER_SELECTOR),
/* harmony export */   "ScrollTrackerDirective": () => (/* binding */ ScrollTrackerDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 6312);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 9151);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 4398);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 6942);




const SCROLL_CONTAINER_SELECTOR = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('ScrollContainerSelector');
class ScrollTrackerDirective {
  get container() {
    return this.scrollSelector ? document.querySelector(this.scrollSelector) : window;
  }
  constructor(elementRef, scrollSelector) {
    this.elementRef = elementRef;
    this.scrollSelector = scrollSelector;
    /** This is necessary for the [scrollTracker] syntax to work. */
    this.scrollTracker = '';
    this.appear = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.appeared = false;
    const element = this.elementRef.nativeElement;
    this.scrollSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(this.container, 'scroll').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(() => !this.appeared), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.throttleTime)(100), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(e => {
      if (this.scrollSelector) {
        return this.container.scrollTop;
      } else {
        return this.container.scrollY;
      }
    })).subscribe(pos => {
      if (pos + window.innerHeight > element.offsetTop) {
        this.appear.next(true);
        this.appeared = true;
      }
    });
  }
  ngOnInit() {
    this.container.dispatchEvent(new Event('scroll'));
  }
  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
  static #_ = this.ɵfac = function ScrollTrackerDirective_Factory(t) {
    return new (t || ScrollTrackerDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](SCROLL_CONTAINER_SELECTOR));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: ScrollTrackerDirective,
    selectors: [["", "scrollTracker", ""]],
    inputs: {
      scrollTracker: "scrollTracker"
    },
    outputs: {
      appear: "appear"
    }
  });
}

/***/ }),

/***/ 4466:
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6477);
/* harmony import */ var _scroll_tracker_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll-tracker.directive */ 8382);
/* harmony import */ var _unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unsafe-inner-html.directive */ 5904);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);




class SharedModule {
  static #_ = this.ɵfac = function SharedModule_Factory(t) {
    return new (t || SharedModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: SharedModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    providers: [{
      provide: _scroll_tracker_directive__WEBPACK_IMPORTED_MODULE_0__.SCROLL_CONTAINER_SELECTOR,
      useValue: ''
    }],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [_scroll_tracker_directive__WEBPACK_IMPORTED_MODULE_0__.ScrollTrackerDirective, _unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_1__.UnsafeInnerHTMLDirective],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
    exports: [_scroll_tracker_directive__WEBPACK_IMPORTED_MODULE_0__.ScrollTrackerDirective, _unsafe_inner_html_directive__WEBPACK_IMPORTED_MODULE_1__.UnsafeInnerHTMLDirective]
  });
})();

/***/ }),

/***/ 9980:
/*!***********************************!*\
  !*** ./src/app/shared/ui.util.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scrollTo": () => (/* binding */ scrollTo),
/* harmony export */   "scrollToTop": () => (/* binding */ scrollToTop)
/* harmony export */ });
function scrollToTop() {
  scrollTo(0);
}
function scrollTo(to, duration) {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  if (maxScroll < to) {
    duration = duration * (maxScroll / to);
    to = maxScroll;
  }
  const from = window.scrollY,
    difference = to - from;
  duration = duration || Math.min(Math.abs(difference), 1000);
  const easeInOutQuad = (t, b, c, d) => {
    let reverse = c < 0,
      s,
      e;
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    const val = -c / 2 * (t * (t - 2) - 1) + b;
    if (reverse) {
      return -val;
    } else {
      return val;
    }
  };
  let startTime = 0;
  const scrollFunc = time => {
    if (startTime === 0) {
      startTime = time;
    }
    if (window.scrollY === to || time - startTime >= duration) {
      window.scroll(0, to);
      return;
    }
    window.scroll(0, easeInOutQuad(time - startTime, from, difference, duration));
    requestAnimationFrame(scrollFunc);
  };
  requestAnimationFrame(scrollFunc);
}

/***/ }),

/***/ 5904:
/*!*******************************************************!*\
  !*** ./src/app/shared/unsafe-inner-html.directive.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsafeInnerHTMLDirective": () => (/* binding */ UnsafeInnerHTMLDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6839);

/**
 * Injects the input to an element's HTML content without sanitizing it in any
 * way. This should only be used if you ABSOLUTELY TRUST the HTML being
 * injected.
 */
class UnsafeInnerHTMLDirective {
  set unsafeInnerHTML(html) {
    if (this.elementRef) {
      this.elementRef.nativeElement.innerHTML = html;
    }
  }
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  static #_ = this.ɵfac = function UnsafeInnerHTMLDirective_Factory(t) {
    return new (t || UnsafeInnerHTMLDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  };
  static #_2 = this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: UnsafeInnerHTMLDirective,
    selectors: [["", "unsafeInnerHTML", ""]],
    inputs: {
      unsafeInnerHTML: "unsafeInnerHTML"
    }
  });
}

/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  server: 'http://localhost:8000'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`,
 * `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a
 * negative impact on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 2512);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6839);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map