/*!
 * DAS Portal v1.0.0 ()
 * Copyright 2014-2021 MinhND <minhnd@fsivietnam.com.vn>
 * License: Open source - MIT <https://opensource.org/licenses/MIT>
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.portal = {}, global.jQuery));
}(this, (function (exports, $$1) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($$1);

  /**
   * --------------------------------------------
   * AdminLTE CardRefresh.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME = 'CardRefresh';
  const DATA_KEY = 'lte.cardrefresh';
  const EVENT_KEY = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $__default['default'].fn[NAME];
  const EVENT_LOADED = `loaded${EVENT_KEY}`;
  const EVENT_OVERLAY_ADDED = `overlay.added${EVENT_KEY}`;
  const EVENT_OVERLAY_REMOVED = `overlay.removed${EVENT_KEY}`;
  const CLASS_NAME_CARD = 'card';
  const SELECTOR_CARD = `.${CLASS_NAME_CARD}`;
  const SELECTOR_DATA_REFRESH = '[data-card-widget="card-refresh"]';
  const Default = {
    source: '',
    sourceSelector: '',
    params: {},
    trigger: SELECTOR_DATA_REFRESH,
    content: '.card-body',
    loadInContent: true,
    loadOnInit: true,
    responseType: '',
    overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',

    onLoadStart() {},

    onLoadDone(response) {
      return response;
    }

  };

  class CardRefresh {
    constructor(element, settings) {
      this._element = element;
      this._parent = element.parents(SELECTOR_CARD).first();
      this._settings = $__default['default'].extend({}, Default, settings);
      this._overlay = $__default['default'](this._settings.overlayTemplate);

      if (element.hasClass(CLASS_NAME_CARD)) {
        this._parent = element;
      }

      if (this._settings.source === '') {
        throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');
      }
    }

    load() {
      this._addOverlay();

      this._settings.onLoadStart.call($__default['default'](this));

      $__default['default'].get(this._settings.source, this._settings.params, response => {
        if (this._settings.loadInContent) {
          if (this._settings.sourceSelector !== '') {
            response = $__default['default'](response).find(this._settings.sourceSelector).html();
          }

          this._parent.find(this._settings.content).html(response);
        }

        this._settings.onLoadDone.call($__default['default'](this), response);

        this._removeOverlay();
      }, this._settings.responseType !== '' && this._settings.responseType);
      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_LOADED));
    }

    _addOverlay() {
      this._parent.append(this._overlay);

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_OVERLAY_ADDED));
    }

    _removeOverlay() {
      this._parent.find(this._overlay).remove();

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_OVERLAY_REMOVED));
    } // Private


    _init() {
      $__default['default'](this).find(this._settings.trigger).on('click', () => {
        this.load();
      });

      if (this._settings.loadOnInit) {
        this.load();
      }
    } // Static


    static _jQueryInterface(config) {
      let data = $__default['default'](this).data(DATA_KEY);

      const _options = $__default['default'].extend({}, Default, $__default['default'](this).data());

      if (!data) {
        data = new CardRefresh($__default['default'](this), _options);
        $__default['default'](this).data(DATA_KEY, typeof config === 'string' ? data : config);
      }

      if (typeof config === 'string' && config.match(/load/)) {
        data[config]();
      } else {
        data._init($__default['default'](this));
      }
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_DATA_REFRESH, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardRefresh._jQueryInterface.call($__default['default'](this), 'load');
  });
  $__default['default'](() => {
    $__default['default'](SELECTOR_DATA_REFRESH).each(function () {
      CardRefresh._jQueryInterface.call($__default['default'](this));
    });
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME] = CardRefresh._jQueryInterface;
  $__default['default'].fn[NAME].Constructor = CardRefresh;

  $__default['default'].fn[NAME].noConflict = function () {
    $__default['default'].fn[NAME] = JQUERY_NO_CONFLICT;
    return CardRefresh._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE CardWidget.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$1 = 'CardWidget';
  const DATA_KEY$1 = 'lte.cardwidget';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const JQUERY_NO_CONFLICT$1 = $__default['default'].fn[NAME$1];
  const EVENT_EXPANDED = `expanded${EVENT_KEY$1}`;
  const EVENT_COLLAPSED = `collapsed${EVENT_KEY$1}`;
  const EVENT_MAXIMIZED = `maximized${EVENT_KEY$1}`;
  const EVENT_MINIMIZED = `minimized${EVENT_KEY$1}`;
  const EVENT_REMOVED = `removed${EVENT_KEY$1}`;
  const CLASS_NAME_CARD$1 = 'card';
  const CLASS_NAME_COLLAPSED = 'collapsed-card';
  const CLASS_NAME_COLLAPSING = 'collapsing-card';
  const CLASS_NAME_EXPANDING = 'expanding-card';
  const CLASS_NAME_WAS_COLLAPSED = 'was-collapsed';
  const CLASS_NAME_MAXIMIZED = 'maximized-card';
  const SELECTOR_DATA_REMOVE = '[data-card-widget="remove"]';
  const SELECTOR_DATA_COLLAPSE = '[data-card-widget="collapse"]';
  const SELECTOR_DATA_MAXIMIZE = '[data-card-widget="maximize"]';
  const SELECTOR_CARD$1 = `.${CLASS_NAME_CARD$1}`;
  const SELECTOR_CARD_HEADER = '.card-header';
  const SELECTOR_CARD_BODY = '.card-body';
  const SELECTOR_CARD_FOOTER = '.card-footer';
  const Default$1 = {
    animationSpeed: 'normal',
    collapseTrigger: SELECTOR_DATA_COLLAPSE,
    removeTrigger: SELECTOR_DATA_REMOVE,
    maximizeTrigger: SELECTOR_DATA_MAXIMIZE,
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    maximizeIcon: 'fa-expand',
    minimizeIcon: 'fa-compress'
  };

  class CardWidget {
    constructor(element, settings) {
      this._element = element;
      this._parent = element.parents(SELECTOR_CARD$1).first();

      if (element.hasClass(CLASS_NAME_CARD$1)) {
        this._parent = element;
      }

      this._settings = $__default['default'].extend({}, Default$1, settings);
    }

    collapse() {
      this._parent.addClass(CLASS_NAME_COLLAPSING).children(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`).slideUp(this._settings.animationSpeed, () => {
        this._parent.addClass(CLASS_NAME_COLLAPSED).removeClass(CLASS_NAME_COLLAPSING);
      });

      this._parent.find(`> ${SELECTOR_CARD_HEADER} ${this._settings.collapseTrigger} .${this._settings.collapseIcon}`).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);

      this._element.trigger($__default['default'].Event(EVENT_COLLAPSED), this._parent);
    }

    expand() {
      this._parent.addClass(CLASS_NAME_EXPANDING).children(`${SELECTOR_CARD_BODY}, ${SELECTOR_CARD_FOOTER}`).slideDown(this._settings.animationSpeed, () => {
        this._parent.removeClass(CLASS_NAME_COLLAPSED).removeClass(CLASS_NAME_EXPANDING);
      });

      this._parent.find(`> ${SELECTOR_CARD_HEADER} ${this._settings.collapseTrigger} .${this._settings.expandIcon}`).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);

      this._element.trigger($__default['default'].Event(EVENT_EXPANDED), this._parent);
    }

    remove() {
      this._parent.slideUp();

      this._element.trigger($__default['default'].Event(EVENT_REMOVED), this._parent);
    }

    toggle() {
      if (this._parent.hasClass(CLASS_NAME_COLLAPSED)) {
        this.expand();
        return;
      }

      this.collapse();
    }

    maximize() {
      this._parent.find(`${this._settings.maximizeTrigger} .${this._settings.maximizeIcon}`).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon);

      this._parent.css({
        height: this._parent.height(),
        width: this._parent.width(),
        transition: 'all .15s'
      }).delay(150).queue(function () {
        const $element = $__default['default'](this);
        $element.addClass(CLASS_NAME_MAXIMIZED);
        $__default['default']('html').addClass(CLASS_NAME_MAXIMIZED);

        if ($element.hasClass(CLASS_NAME_COLLAPSED)) {
          $element.addClass(CLASS_NAME_WAS_COLLAPSED);
        }

        $element.dequeue();
      });

      this._element.trigger($__default['default'].Event(EVENT_MAXIMIZED), this._parent);
    }

    minimize() {
      this._parent.find(`${this._settings.maximizeTrigger} .${this._settings.minimizeIcon}`).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon);

      this._parent.css('cssText', `height: ${this._parent[0].style.height} !important; width: ${this._parent[0].style.width} !important; transition: all .15s;`).delay(10).queue(function () {
        const $element = $__default['default'](this);
        $element.removeClass(CLASS_NAME_MAXIMIZED);
        $__default['default']('html').removeClass(CLASS_NAME_MAXIMIZED);
        $element.css({
          height: 'inherit',
          width: 'inherit'
        });

        if ($element.hasClass(CLASS_NAME_WAS_COLLAPSED)) {
          $element.removeClass(CLASS_NAME_WAS_COLLAPSED);
        }

        $element.dequeue();
      });

      this._element.trigger($__default['default'].Event(EVENT_MINIMIZED), this._parent);
    }

    toggleMaximize() {
      if (this._parent.hasClass(CLASS_NAME_MAXIMIZED)) {
        this.minimize();
        return;
      }

      this.maximize();
    } // Private


    _init(card) {
      this._parent = card;
      $__default['default'](this).find(this._settings.collapseTrigger).click(() => {
        this.toggle();
      });
      $__default['default'](this).find(this._settings.maximizeTrigger).click(() => {
        this.toggleMaximize();
      });
      $__default['default'](this).find(this._settings.removeTrigger).click(() => {
        this.remove();
      });
    } // Static


    static _jQueryInterface(config) {
      let data = $__default['default'](this).data(DATA_KEY$1);

      const _options = $__default['default'].extend({}, Default$1, $__default['default'](this).data());

      if (!data) {
        data = new CardWidget($__default['default'](this), _options);
        $__default['default'](this).data(DATA_KEY$1, typeof config === 'string' ? data : config);
      }

      if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {
        data[config]();
      } else if (typeof config === 'object') {
        data._init($__default['default'](this));
      }
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_DATA_COLLAPSE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default['default'](this), 'toggle');
  });
  $__default['default'](document).on('click', SELECTOR_DATA_REMOVE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default['default'](this), 'remove');
  });
  $__default['default'](document).on('click', SELECTOR_DATA_MAXIMIZE, function (event) {
    if (event) {
      event.preventDefault();
    }

    CardWidget._jQueryInterface.call($__default['default'](this), 'toggleMaximize');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$1] = CardWidget._jQueryInterface;
  $__default['default'].fn[NAME$1].Constructor = CardWidget;

  $__default['default'].fn[NAME$1].noConflict = function () {
    $__default['default'].fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return CardWidget._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE ControlSidebar.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$2 = 'ControlSidebar';
  const DATA_KEY$2 = 'lte.controlsidebar';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const JQUERY_NO_CONFLICT$2 = $__default['default'].fn[NAME$2];
  const EVENT_COLLAPSED$1 = `collapsed${EVENT_KEY$2}`;
  const EVENT_EXPANDED$1 = `expanded${EVENT_KEY$2}`;
  const SELECTOR_CONTROL_SIDEBAR = '.control-sidebar';
  const SELECTOR_CONTROL_SIDEBAR_CONTENT = '.control-sidebar-content';
  const SELECTOR_DATA_TOGGLE = '[data-widget="control-sidebar"]';
  const SELECTOR_HEADER = '.main-header';
  const SELECTOR_FOOTER = '.main-footer';
  const CLASS_NAME_CONTROL_SIDEBAR_ANIMATE = 'control-sidebar-animate';
  const CLASS_NAME_CONTROL_SIDEBAR_OPEN = 'control-sidebar-open';
  const CLASS_NAME_CONTROL_SIDEBAR_SLIDE = 'control-sidebar-slide-open';
  const CLASS_NAME_LAYOUT_FIXED = 'layout-fixed';
  const CLASS_NAME_NAVBAR_FIXED = 'layout-navbar-fixed';
  const CLASS_NAME_NAVBAR_SM_FIXED = 'layout-sm-navbar-fixed';
  const CLASS_NAME_NAVBAR_MD_FIXED = 'layout-md-navbar-fixed';
  const CLASS_NAME_NAVBAR_LG_FIXED = 'layout-lg-navbar-fixed';
  const CLASS_NAME_NAVBAR_XL_FIXED = 'layout-xl-navbar-fixed';
  const CLASS_NAME_FOOTER_FIXED = 'layout-footer-fixed';
  const CLASS_NAME_FOOTER_SM_FIXED = 'layout-sm-footer-fixed';
  const CLASS_NAME_FOOTER_MD_FIXED = 'layout-md-footer-fixed';
  const CLASS_NAME_FOOTER_LG_FIXED = 'layout-lg-footer-fixed';
  const CLASS_NAME_FOOTER_XL_FIXED = 'layout-xl-footer-fixed';
  const Default$2 = {
    controlsidebarSlide: true,
    scrollbarTheme: 'os-theme-light',
    scrollbarAutoHide: 'l',
    target: SELECTOR_CONTROL_SIDEBAR
  };
  /**
   * Class Definition
   * ====================================================
   */

  class ControlSidebar {
    constructor(element, config) {
      this._element = element;
      this._config = config;
    } // Public


    collapse() {
      const $body = $__default['default']('body');
      const $html = $__default['default']('html');
      const that = this; // Show the control sidebar

      if (this._config.controlsidebarSlide) {
        $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
        $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
          $__default['default'](that._config.target).hide();
          $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
          $__default['default'](this).dequeue();
        });
      } else {
        $body.removeClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN);
      }

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_COLLAPSED$1));
    }

    show() {
      const $body = $__default['default']('body');
      const $html = $__default['default']('html'); // Collapse the control sidebar

      if (this._config.controlsidebarSlide) {
        $html.addClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
        $__default['default'](this._config.target).show().delay(10).queue(function () {
          $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
            $html.removeClass(CLASS_NAME_CONTROL_SIDEBAR_ANIMATE);
            $__default['default'](this).dequeue();
          });
          $__default['default'](this).dequeue();
        });
      } else {
        $body.addClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN);
      }

      this._fixHeight();

      this._fixScrollHeight();

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_EXPANDED$1));
    }

    toggle() {
      const $body = $__default['default']('body');
      const shouldClose = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE);

      if (shouldClose) {
        // Close the control sidebar
        this.collapse();
      } else {
        // Open the control sidebar
        this.show();
      }
    } // Private


    _init() {
      const $body = $__default['default']('body');
      const shouldNotHideAll = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE);

      if (shouldNotHideAll) {
        $__default['default'](SELECTOR_CONTROL_SIDEBAR).not(this._config.target).hide();
        $__default['default'](this._config.target).css('display', 'block');
      } else {
        $__default['default'](SELECTOR_CONTROL_SIDEBAR).hide();
      }

      this._fixHeight();

      this._fixScrollHeight();

      $__default['default'](window).resize(() => {
        this._fixHeight();

        this._fixScrollHeight();
      });
      $__default['default'](window).scroll(() => {
        const $body = $__default['default']('body');
        const shouldFixHeight = $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE);

        if (shouldFixHeight) {
          this._fixScrollHeight();
        }
      });
    }

    _isNavbarFixed() {
      const $body = $__default['default']('body');
      return $body.hasClass(CLASS_NAME_NAVBAR_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_SM_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_MD_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_LG_FIXED) || $body.hasClass(CLASS_NAME_NAVBAR_XL_FIXED);
    }

    _isFooterFixed() {
      const $body = $__default['default']('body');
      return $body.hasClass(CLASS_NAME_FOOTER_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_SM_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_MD_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_LG_FIXED) || $body.hasClass(CLASS_NAME_FOOTER_XL_FIXED);
    }

    _fixScrollHeight() {
      const $body = $__default['default']('body');
      const $controlSidebar = $__default['default'](this._config.target);

      if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
        $controlSidebar.attr('style', 'display: block;');
        return;
      }

      const heights = {
        scroll: $__default['default'](document).height(),
        window: $__default['default'](window).height(),
        header: $__default['default'](SELECTOR_HEADER).outerHeight(),
        footer: $__default['default'](SELECTOR_FOOTER).outerHeight()
      };
      const positions = {
        bottom: Math.abs(heights.window + $__default['default'](window).scrollTop() - heights.scroll),
        top: $__default['default'](window).scrollTop()
      };
      const navbarFixed = this._isNavbarFixed() && $__default['default'](SELECTOR_HEADER).css('position') === 'fixed';
      const footerFixed = this._isFooterFixed() && $__default['default'](SELECTOR_FOOTER).css('position') === 'fixed';
      const $controlsidebarContent = $__default['default'](`${this._config.target}, ${this._config.target} ${SELECTOR_CONTROL_SIDEBAR_CONTENT}`);

      if (positions.top === 0 && positions.bottom === 0) {
        $controlSidebar.css({
          bottom: heights.footer,
          top: heights.header
        });
        $controlsidebarContent.css('height', heights.window - (heights.header + heights.footer));
      } else if (positions.bottom <= heights.footer) {
        if (footerFixed === false) {
          const top = heights.header - positions.top;
          $controlSidebar.css('bottom', heights.footer - positions.bottom).css('top', top >= 0 ? top : 0);
          $controlsidebarContent.css('height', heights.window - (heights.footer - positions.bottom));
        } else {
          $controlSidebar.css('bottom', heights.footer);
        }
      } else if (positions.top <= heights.header) {
        if (navbarFixed === false) {
          $controlSidebar.css('top', heights.header - positions.top);
          $controlsidebarContent.css('height', heights.window - (heights.header - positions.top));
        } else {
          $controlSidebar.css('top', heights.header);
        }
      } else if (navbarFixed === false) {
        $controlSidebar.css('top', 0);
        $controlsidebarContent.css('height', heights.window);
      } else {
        $controlSidebar.css('top', heights.header);
      }

      if (footerFixed && navbarFixed) {
        $controlsidebarContent.css('height', '100%');
        $controlSidebar.css('height', '');
      } else if (footerFixed || navbarFixed) {
        $controlsidebarContent.css('height', '100%');
        $controlsidebarContent.css('height', '');
      }
    }

    _fixHeight() {
      const $body = $__default['default']('body');
      const $controlSidebar = $__default['default'](`${this._config.target} ${SELECTOR_CONTROL_SIDEBAR_CONTENT}`);

      if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED)) {
        $controlSidebar.attr('style', '');
        return;
      }

      const heights = {
        window: $__default['default'](window).height(),
        header: $__default['default'](SELECTOR_HEADER).outerHeight(),
        footer: $__default['default'](SELECTOR_FOOTER).outerHeight()
      };
      let sidebarHeight = heights.window - heights.header;

      if (this._isFooterFixed()) {
        if ($__default['default'](SELECTOR_FOOTER).css('position') === 'fixed') {
          sidebarHeight = heights.window - heights.header - heights.footer;
        }
      }

      $controlSidebar.css('height', sidebarHeight);

      if (typeof $__default['default'].fn.overlayScrollbars !== 'undefined') {
        $controlSidebar.overlayScrollbars({
          className: this._config.scrollbarTheme,
          sizeAutoCapable: true,
          scrollbars: {
            autoHide: this._config.scrollbarAutoHide,
            clickScrolling: true
          }
        });
      }
    } // Static


    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$2);

        const _options = $__default['default'].extend({}, Default$2, $__default['default'](this).data());

        if (!data) {
          data = new ControlSidebar(this, _options);
          $__default['default'](this).data(DATA_KEY$2, data);
        }

        if (data[operation] === 'undefined') {
          throw new Error(`${operation} is not a function`);
        }

        data[operation]();
      });
    }

  }
  /**
   *
   * Data Api implementation
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();

    ControlSidebar._jQueryInterface.call($__default['default'](this), 'toggle');
  });
  $__default['default'](document).ready(() => {
    ControlSidebar._jQueryInterface.call($__default['default'](SELECTOR_DATA_TOGGLE), '_init');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$2] = ControlSidebar._jQueryInterface;
  $__default['default'].fn[NAME$2].Constructor = ControlSidebar;

  $__default['default'].fn[NAME$2].noConflict = function () {
    $__default['default'].fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return ControlSidebar._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE DirectChat.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$3 = 'DirectChat';
  const DATA_KEY$3 = 'lte.directchat';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const JQUERY_NO_CONFLICT$3 = $__default['default'].fn[NAME$3];
  const EVENT_TOGGLED = `toggled${EVENT_KEY$3}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-widget="chat-pane-toggle"]';
  const SELECTOR_DIRECT_CHAT = '.direct-chat';
  const CLASS_NAME_DIRECT_CHAT_OPEN = 'direct-chat-contacts-open';
  /**
   * Class Definition
   * ====================================================
   */

  class DirectChat {
    constructor(element) {
      this._element = element;
    }

    toggle() {
      $__default['default'](this._element).parents(SELECTOR_DIRECT_CHAT).first().toggleClass(CLASS_NAME_DIRECT_CHAT_OPEN);
      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_TOGGLED));
    } // Static


    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$3);

        if (!data) {
          data = new DirectChat($__default['default'](this));
          $__default['default'](this).data(DATA_KEY$3, data);
        }

        data[config]();
      });
    }

  }
  /**
   *
   * Data Api implementation
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_DATA_TOGGLE$1, function (event) {
    if (event) {
      event.preventDefault();
    }

    DirectChat._jQueryInterface.call($__default['default'](this), 'toggle');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$3] = DirectChat._jQueryInterface;
  $__default['default'].fn[NAME$3].Constructor = DirectChat;

  $__default['default'].fn[NAME$3].noConflict = function () {
    $__default['default'].fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return DirectChat._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE Dropdown.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$4 = 'Dropdown';
  const DATA_KEY$4 = 'lte.dropdown';
  const JQUERY_NO_CONFLICT$4 = $__default['default'].fn[NAME$4];
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
  const SELECTOR_DROPDOWN_MENU_ACTIVE = '.dropdown-menu.show';
  const SELECTOR_DROPDOWN_TOGGLE = '[data-toggle="dropdown"]';
  const CLASS_NAME_DROPDOWN_RIGHT = 'dropdown-menu-right';
  const CLASS_NAME_DROPDOWN_SUBMENU = 'dropdown-submenu'; // TODO: this is unused; should be removed along with the extend?

  const Default$3 = {};
  /**
   * Class Definition
   * ====================================================
   */

  class Dropdown {
    constructor(element, config) {
      this._config = config;
      this._element = element;
    } // Public


    toggleSubmenu() {
      this._element.siblings().show().toggleClass('show');

      if (!this._element.next().hasClass('show')) {
        this._element.parents(SELECTOR_DROPDOWN_MENU).first().find('.show').removeClass('show').hide();
      }

      this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', () => {
        $__default['default']('.dropdown-submenu .show').removeClass('show').hide();
      });
    }

    fixPosition() {
      const $element = $__default['default'](SELECTOR_DROPDOWN_MENU_ACTIVE);

      if ($element.length === 0) {
        return;
      }

      if ($element.hasClass(CLASS_NAME_DROPDOWN_RIGHT)) {
        $element.css({
          left: 'inherit',
          right: 0
        });
      } else {
        $element.css({
          left: 0,
          right: 'inherit'
        });
      }

      const offset = $element.offset();
      const width = $element.width();
      const visiblePart = $__default['default'](window).width() - offset.left;

      if (offset.left < 0) {
        $element.css({
          left: 'inherit',
          right: offset.left - 5
        });
      } else if (visiblePart < width) {
        $element.css({
          left: 'inherit',
          right: 0
        });
      }
    } // Static


    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$4);

        const _config = $__default['default'].extend({}, Default$3, $__default['default'](this).data());

        if (!data) {
          data = new Dropdown($__default['default'](this), _config);
          $__default['default'](this).data(DATA_KEY$4, data);
        }

        if (config === 'toggleSubmenu' || config === 'fixPosition') {
          data[config]();
        }
      });
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](`${SELECTOR_DROPDOWN_MENU} ${SELECTOR_DROPDOWN_TOGGLE}`).on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($__default['default'](this), 'toggleSubmenu');
  });
  $__default['default'](`${SELECTOR_NAVBAR} ${SELECTOR_DROPDOWN_TOGGLE}`).on('click', event => {
    event.preventDefault();

    if ($__default['default'](event.target).parent().hasClass(CLASS_NAME_DROPDOWN_SUBMENU)) {
      return;
    }

    setTimeout(function () {
      Dropdown._jQueryInterface.call($__default['default'](this), 'fixPosition');
    }, 1);
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$4] = Dropdown._jQueryInterface;
  $__default['default'].fn[NAME$4].Constructor = Dropdown;

  $__default['default'].fn[NAME$4].noConflict = function () {
    $__default['default'].fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE ExpandableTable.js
   * License MIT
   * --------------------------------------------
   */
  /**
    * Constants
    * ====================================================
    */

  const NAME$5 = 'ExpandableTable';
  const DATA_KEY$5 = 'lte.expandableTable';
  const EVENT_KEY$4 = `.${DATA_KEY$5}`;
  const JQUERY_NO_CONFLICT$5 = $__default['default'].fn[NAME$5];
  const EVENT_EXPANDED$2 = `expanded${EVENT_KEY$4}`;
  const EVENT_COLLAPSED$2 = `collapsed${EVENT_KEY$4}`;
  const SELECTOR_TABLE = '.expandable-table';
  const SELECTOR_DATA_TOGGLE$2 = '[data-widget="expandable-table"]';
  const SELECTOR_ARIA_ATTR = 'aria-expanded';
  /**
    * Class Definition
    * ====================================================
    */

  class ExpandableTable {
    constructor(element, options) {
      this._options = options;
      this._element = element;
    } // Public


    init() {
      $__default['default'](SELECTOR_DATA_TOGGLE$2).each((_, $header) => {
        const $type = $__default['default']($header).attr(SELECTOR_ARIA_ATTR);
        const $body = $__default['default']($header).next().children().first().children();

        if ($type === 'true') {
          $body.show();
        } else if ($type === 'false') {
          $body.hide();
          $body.parent().parent().addClass('d-none');
        }
      });
    }

    toggleRow() {
      const $element = this._element;
      const time = 500;
      const $type = $element.attr(SELECTOR_ARIA_ATTR);
      const $body = $element.next().children().first().children();
      $body.stop();

      if ($type === 'true') {
        $body.slideUp(time, () => {
          $element.next().addClass('d-none');
        });
        $element.attr(SELECTOR_ARIA_ATTR, 'false');
        $element.trigger($__default['default'].Event(EVENT_COLLAPSED$2));
      } else if ($type === 'false') {
        $element.next().removeClass('d-none');
        $body.slideDown(time);
        $element.attr(SELECTOR_ARIA_ATTR, 'true');
        $element.trigger($__default['default'].Event(EVENT_EXPANDED$2));
      }
    } // Static


    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$5);

        if (!data) {
          data = new ExpandableTable($__default['default'](this));
          $__default['default'](this).data(DATA_KEY$5, data);
        }

        if (typeof operation === 'string' && operation.match(/init|toggleRow/)) {
          data[operation]();
        }
      });
    }

  }
  /**
    * Data API
    * ====================================================
    */


  $__default['default'](SELECTOR_TABLE).ready(function () {
    ExpandableTable._jQueryInterface.call($__default['default'](this), 'init');
  });
  $__default['default'](document).on('click', SELECTOR_DATA_TOGGLE$2, function () {
    ExpandableTable._jQueryInterface.call($__default['default'](this), 'toggleRow');
  });
  /**
    * jQuery API
    * ====================================================
    */

  $__default['default'].fn[NAME$5] = ExpandableTable._jQueryInterface;
  $__default['default'].fn[NAME$5].Constructor = ExpandableTable;

  $__default['default'].fn[NAME$5].noConflict = function () {
    $__default['default'].fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return ExpandableTable._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE Fullscreen.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$6 = 'Fullscreen';
  const DATA_KEY$6 = 'lte.fullscreen';
  const JQUERY_NO_CONFLICT$6 = $__default['default'].fn[NAME$6];
  const SELECTOR_DATA_WIDGET = '[data-widget="fullscreen"]';
  const SELECTOR_ICON = `${SELECTOR_DATA_WIDGET} i`;
  const Default$4 = {
    minimizeIcon: 'fa-compress-arrows-alt',
    maximizeIcon: 'fa-expand-arrows-alt'
  };
  /**
   * Class Definition
   * ====================================================
   */

  class Fullscreen {
    constructor(_element, _options) {
      this.element = _element;
      this.options = $__default['default'].extend({}, Default$4, _options);
    } // Public


    toggle() {
      if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        this.windowed();
      } else {
        this.fullscreen();
      }
    }

    fullscreen() {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }

      $__default['default'](SELECTOR_ICON).removeClass(this.options.maximizeIcon).addClass(this.options.minimizeIcon);
    }

    windowed() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }

      $__default['default'](SELECTOR_ICON).removeClass(this.options.minimizeIcon).addClass(this.options.maximizeIcon);
    } // Static


    static _jQueryInterface(config) {
      let data = $__default['default'](this).data(DATA_KEY$6);

      if (!data) {
        data = $__default['default'](this).data();
      }

      const _options = $__default['default'].extend({}, Default$4, typeof config === 'object' ? config : data);

      const plugin = new Fullscreen($__default['default'](this), _options);
      $__default['default'](this).data(DATA_KEY$6, typeof config === 'object' ? config : data);

      if (typeof config === 'string' && config.match(/toggle|fullscreen|windowed/)) {
        plugin[config]();
      } else {
        plugin.init();
      }
    }

  }
  /**
    * Data API
    * ====================================================
    */


  $__default['default'](document).on('click', SELECTOR_DATA_WIDGET, function () {
    Fullscreen._jQueryInterface.call($__default['default'](this), 'toggle');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$6] = Fullscreen._jQueryInterface;
  $__default['default'].fn[NAME$6].Constructor = Fullscreen;

  $__default['default'].fn[NAME$6].noConflict = function () {
    $__default['default'].fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Fullscreen._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE IFrame.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$7 = 'IFrame';
  const DATA_KEY$7 = 'lte.iframe';
  const JQUERY_NO_CONFLICT$7 = $__default['default'].fn[NAME$7];
  const SELECTOR_DATA_TOGGLE$3 = '[data-widget="iframe"]';
  const SELECTOR_DATA_TOGGLE_CLOSE = '[data-widget="iframe-close"]';
  const SELECTOR_DATA_TOGGLE_SCROLL_LEFT = '[data-widget="iframe-scrollleft"]';
  const SELECTOR_DATA_TOGGLE_SCROLL_RIGHT = '[data-widget="iframe-scrollright"]';
  const SELECTOR_DATA_TOGGLE_FULLSCREEN = '[data-widget="iframe-fullscreen"]';
  const SELECTOR_CONTENT_WRAPPER = '.content-wrapper';
  const SELECTOR_CONTENT_IFRAME = `${SELECTOR_CONTENT_WRAPPER} iframe`;
  const SELECTOR_TAB_NAV = `${SELECTOR_DATA_TOGGLE$3}.iframe-mode .nav`;
  const SELECTOR_TAB_NAVBAR_NAV = `${SELECTOR_DATA_TOGGLE$3}.iframe-mode .navbar-nav`;
  const SELECTOR_TAB_NAVBAR_NAV_ITEM = `${SELECTOR_TAB_NAVBAR_NAV} .nav-item`;
  const SELECTOR_TAB_CONTENT = `${SELECTOR_DATA_TOGGLE$3}.iframe-mode .tab-content`;
  const SELECTOR_TAB_EMPTY = `${SELECTOR_TAB_CONTENT} .tab-empty`;
  const SELECTOR_TAB_LOADING = `${SELECTOR_TAB_CONTENT} .tab-loading`;
  const SELECTOR_SIDEBAR_MENU_ITEM = '.main-sidebar .nav-item > a.nav-link';
  const SELECTOR_HEADER_MENU_ITEM = '.main-header .nav-item a.nav-link';
  const SELECTOR_HEADER_DROPDOWN_ITEM = '.main-header a.dropdown-item';
  const CLASS_NAME_IFRAME_MODE = 'iframe-mode';
  const CLASS_NAME_FULLSCREEN_MODE = 'iframe-mode-fullscreen';
  const Default$5 = {
    onTabClick(item) {
      return item;
    },

    onTabChanged(item) {
      return item;
    },

    onTabCreated(item) {
      return item;
    },

    autoIframeMode: true,
    autoItemActive: true,
    autoShowNewTab: true,
    loadingScreen: true,
    useNavbarItems: true,
    scrollOffset: 40,
    scrollBehaviorSwap: false,
    iconMaximize: 'fa-expand',
    iconMinimize: 'fa-compress'
  };
  /**
   * Class Definition
   * ====================================================
   */

  class IFrame {
    constructor(element, config) {
      this._config = config;
      this._element = element;

      this._init();
    } // Public


    onTabClick(item) {
      this._config.onTabClick(item);
    }

    onTabChanged(item) {
      this._config.onTabChanged(item);
    }

    onTabCreated(item) {
      this._config.onTabCreated(item);
    }

    createTab(title, link, uniqueName, autoOpen) {
      const tabId = `panel-${uniqueName}-${Math.floor(Math.random() * 1000)}`;
      const navId = `tab-${uniqueName}-${Math.floor(Math.random() * 1000)}`;
      const newNavItem = `<li class="nav-item" role="presentation"><a class="nav-link" data-toggle="row" id="${navId}" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="false">${title}</a></li>`;
      $__default['default'](SELECTOR_TAB_NAVBAR_NAV).append(escape(newNavItem));
      const newTabItem = `<div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${navId}"><iframe src="${link}"></iframe></div>`;
      $__default['default'](SELECTOR_TAB_CONTENT).append(escape(newTabItem));

      if (autoOpen) {
        if (this._config.loadingScreen) {
          const $loadingScreen = $__default['default'](SELECTOR_TAB_LOADING);
          $loadingScreen.fadeIn();
          $__default['default'](`${tabId} iframe`).ready(() => {
            if (typeof this._config.loadingScreen === 'number') {
              this.switchTab(`#${navId}`, this._config.loadingScreen);
              setTimeout(() => {
                $loadingScreen.fadeOut();
              }, this._config.loadingScreen);
            } else {
              this.switchTab(`#${navId}`, this._config.loadingScreen);
              $loadingScreen.fadeOut();
            }
          });
        } else {
          this.switchTab(`#${navId}`);
        }
      }

      this.onTabCreated($__default['default'](`#${navId}`));
    }

    openTabSidebar(item, autoOpen = this._config.autoShowNewTab) {
      let $item = $__default['default'](item).clone();

      if ($item.attr('href') === undefined) {
        $item = $__default['default'](item).parent('a').clone();
      }

      $item.find('.right').remove();
      let title = $item.find('p').text();

      if (title === '') {
        title = $item.text();
      }

      const link = $item.attr('href');

      if (link === '#' || link === '' || link === undefined) {
        return;
      }

      this.createTab(title, link, link.replace('.html', '').replace('./', '').replaceAll('/', '-'), autoOpen);
    }

    switchTab(item) {
      const $item = $__default['default'](item);
      const tabId = $item.attr('href');
      $__default['default'](SELECTOR_TAB_EMPTY).hide();
      $__default['default'](`${SELECTOR_TAB_NAVBAR_NAV} .active`).tab('dispose').removeClass('active');

      this._fixHeight();

      $item.tab('show');
      $item.parents('li').addClass('active');
      this.onTabChanged($item);

      if (this._config.autoItemActive) {
        this._setItemActive($__default['default'](`${tabId} iframe`).attr('src'));
      }
    }

    removeActiveTab() {
      const $navItem = $__default['default'](`${SELECTOR_TAB_NAVBAR_NAV_ITEM}.active`);
      const $navItemParent = $navItem.parent();
      const navItemIndex = $navItem.index();
      $navItem.remove();
      $__default['default']('.tab-pane.active').remove();

      if ($__default['default'](SELECTOR_TAB_CONTENT).children().length == $__default['default'](`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).length) {
        $__default['default'](SELECTOR_TAB_EMPTY).show();
      } else {
        const prevNavItemIndex = navItemIndex - 1;
        this.switchTab($navItemParent.children().eq(prevNavItemIndex).find('a'));
      }
    }

    toggleFullscreen() {
      if ($__default['default']('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
        $__default['default'](`${SELECTOR_DATA_TOGGLE_FULLSCREEN} i`).removeClass(this._config.iconMinimize).addClass(this._config.iconMaximize);
        $__default['default']('body').removeClass(CLASS_NAME_FULLSCREEN_MODE);
        $__default['default'](`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height('auto');
        $__default['default'](SELECTOR_CONTENT_WRAPPER).height('auto');
        $__default['default'](SELECTOR_CONTENT_IFRAME).height('auto');
      } else {
        $__default['default'](`${SELECTOR_DATA_TOGGLE_FULLSCREEN} i`).removeClass(this._config.iconMaximize).addClass(this._config.iconMinimize);
        $__default['default']('body').addClass(CLASS_NAME_FULLSCREEN_MODE);
      }

      $__default['default'](window).trigger('resize');

      this._fixHeight(true);
    } // Private


    _init() {
      if (window.frameElement && this._config.autoIframeMode) {
        $__default['default']('body').addClass(CLASS_NAME_IFRAME_MODE);
      } else if ($__default['default'](SELECTOR_CONTENT_WRAPPER).hasClass(CLASS_NAME_IFRAME_MODE)) {
        this._setupListeners();

        this._fixHeight(true);
      }
    }

    _navScroll(offset) {
      const leftPos = $__default['default'](SELECTOR_TAB_NAVBAR_NAV).scrollLeft();
      $__default['default'](SELECTOR_TAB_NAVBAR_NAV).animate({
        scrollLeft: leftPos + offset
      }, 250, 'linear');
    }

    _setupListeners() {
      $__default['default'](window).on('resize', () => {
        setTimeout(() => {
          this._fixHeight();
        }, 1);
      });
      $__default['default'](document).on('click', SELECTOR_SIDEBAR_MENU_ITEM, e => {
        e.preventDefault();
        this.openTabSidebar(e.target);
      });

      if (this._config.useNavbarItems) {
        $__default['default'](document).on('click', `${SELECTOR_HEADER_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`, e => {
          e.preventDefault();
          this.openTabSidebar(e.target);
        });
      }

      $__default['default'](document).on('click', SELECTOR_TAB_NAVBAR_NAV_ITEM, e => {
        e.preventDefault();
        this.onTabClick(e.target);
        this.switchTab(e.target);
      });
      $__default['default'](document).on('click', SELECTOR_DATA_TOGGLE_CLOSE, e => {
        e.preventDefault();
        this.removeActiveTab();
      });
      $__default['default'](document).on('click', SELECTOR_DATA_TOGGLE_FULLSCREEN, e => {
        e.preventDefault();
        this.toggleFullscreen();
      });
      let mousedown = false;
      let mousedownInterval = null;
      $__default['default'](document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_LEFT, e => {
        e.preventDefault();
        clearInterval(mousedownInterval);
        let {
          scrollOffset
        } = this._config;

        if (!this._config.scrollBehaviorSwap) {
          scrollOffset = -scrollOffset;
        }

        mousedown = true;

        this._navScroll(scrollOffset);

        mousedownInterval = setInterval(() => {
          this._navScroll(scrollOffset);
        }, 250);
      });
      $__default['default'](document).on('mousedown', SELECTOR_DATA_TOGGLE_SCROLL_RIGHT, e => {
        e.preventDefault();
        clearInterval(mousedownInterval);
        let {
          scrollOffset
        } = this._config;

        if (this._config.scrollBehaviorSwap) {
          scrollOffset = -scrollOffset;
        }

        mousedown = true;

        this._navScroll(scrollOffset);

        mousedownInterval = setInterval(() => {
          this._navScroll(scrollOffset);
        }, 250);
      });
      $__default['default'](document).on('mouseup', () => {
        if (mousedown) {
          mousedown = false;
          clearInterval(mousedownInterval);
          mousedownInterval = null;
        }
      });
    }

    _setItemActive(href) {
      $__default['default'](`${SELECTOR_SIDEBAR_MENU_ITEM}, ${SELECTOR_HEADER_DROPDOWN_ITEM}`).removeClass('active');
      $__default['default'](SELECTOR_HEADER_MENU_ITEM).parent().removeClass('active');
      const $headerMenuItem = $__default['default'](`${SELECTOR_HEADER_MENU_ITEM}[href$="${href}"]`);
      const $headerDropdownItem = $__default['default'](`${SELECTOR_HEADER_DROPDOWN_ITEM}[href$="${href}"]`);
      const $sidebarMenuItem = $__default['default'](`${SELECTOR_SIDEBAR_MENU_ITEM}[href$="${href}"]`);
      $headerMenuItem.each((i, e) => {
        $__default['default'](e).parent().addClass('active');
      });
      $headerDropdownItem.each((i, e) => {
        $__default['default'](e).addClass('active');
      });
      $sidebarMenuItem.each((i, e) => {
        $__default['default'](e).addClass('active');
        $__default['default'](e).parents('.nav-treeview').prevAll('.nav-link').addClass('active');
      });
    }

    _fixHeight(tabEmpty = false) {
      if ($__default['default']('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
        const windowHeight = $__default['default'](window).height();
        $__default['default'](`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height(windowHeight);
        $__default['default'](SELECTOR_CONTENT_WRAPPER).height(windowHeight);
        $__default['default'](SELECTOR_CONTENT_IFRAME).height(windowHeight);
      } else {
        const contentWrapperHeight = parseFloat($__default['default'](SELECTOR_CONTENT_WRAPPER).css('min-height'));
        const navbarHeight = $__default['default'](SELECTOR_TAB_NAV).outerHeight();

        if (tabEmpty == true) {
          setTimeout(() => {
            $__default['default'](`${SELECTOR_TAB_EMPTY}, ${SELECTOR_TAB_LOADING}`).height(contentWrapperHeight - navbarHeight);
          }, 50);
        } else {
          $__default['default'](SELECTOR_CONTENT_IFRAME).height(contentWrapperHeight - navbarHeight);
        }
      }
    } // Static


    static _jQueryInterface(operation, ...args) {
      let data = $__default['default'](this).data(DATA_KEY$7);

      const _options = $__default['default'].extend({}, Default$5, $__default['default'](this).data());

      if (!data) {
        data = new IFrame(this, _options);
        $__default['default'](this).data(DATA_KEY$7, data);
      }

      if (typeof operation === 'string' && operation.match(/createTab|openTabSidebar|switchTab|removeActiveTab/)) {
        data[operation](...args);
      }
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](window).on('load', () => {
    IFrame._jQueryInterface.call($__default['default'](SELECTOR_DATA_TOGGLE$3));
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$7] = IFrame._jQueryInterface;
  $__default['default'].fn[NAME$7].Constructor = IFrame;

  $__default['default'].fn[NAME$7].noConflict = function () {
    $__default['default'].fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return IFrame._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE Layout.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$8 = 'Layout';
  const DATA_KEY$8 = 'lte.layout';
  const JQUERY_NO_CONFLICT$8 = $__default['default'].fn[NAME$8];
  const SELECTOR_HEADER$1 = '.main-header';
  const SELECTOR_MAIN_SIDEBAR = '.main-sidebar';
  const SELECTOR_SIDEBAR = '.main-sidebar .sidebar';
  const SELECTOR_CONTENT = '.content-wrapper';
  const SELECTOR_CONTROL_SIDEBAR_CONTENT$1 = '.control-sidebar-content';
  const SELECTOR_CONTROL_SIDEBAR_BTN = '[data-widget="control-sidebar"]';
  const SELECTOR_FOOTER$1 = '.main-footer';
  const SELECTOR_PUSHMENU_BTN = '[data-widget="pushmenu"]';
  const SELECTOR_LOGIN_BOX = '.login-box';
  const SELECTOR_REGISTER_BOX = '.register-box';
  const CLASS_NAME_SIDEBAR_COLLAPSED = 'sidebar-collapse';
  const CLASS_NAME_SIDEBAR_FOCUSED = 'sidebar-focused';
  const CLASS_NAME_LAYOUT_FIXED$1 = 'layout-fixed';
  const CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN = 'control-sidebar-slide-open';
  const CLASS_NAME_CONTROL_SIDEBAR_OPEN$1 = 'control-sidebar-open';
  const Default$6 = {
    scrollbarTheme: 'os-theme-light',
    scrollbarAutoHide: 'l',
    panelAutoHeight: true,
    panelAutoHeightMode: 'min-height',
    loginRegisterAutoHeight: true
  };
  /**
   * Class Definition
   * ====================================================
   */

  class Layout {
    constructor(element, config) {
      this._config = config;
      this._element = element;

      this._init();
    } // Public


    fixLayoutHeight(extra = null) {
      const $body = $__default['default']('body');
      let controlSidebar = 0;

      if ($body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_SLIDE_OPEN) || $body.hasClass(CLASS_NAME_CONTROL_SIDEBAR_OPEN$1) || extra === 'control_sidebar') {
        controlSidebar = $__default['default'](SELECTOR_CONTROL_SIDEBAR_CONTENT$1).outerHeight();
      }

      const heights = {
        window: $__default['default'](window).height(),
        header: $__default['default'](SELECTOR_HEADER$1).length > 0 ? $__default['default'](SELECTOR_HEADER$1).outerHeight() : 0,
        footer: $__default['default'](SELECTOR_FOOTER$1).length > 0 ? $__default['default'](SELECTOR_FOOTER$1).outerHeight() : 0,
        sidebar: $__default['default'](SELECTOR_SIDEBAR).length > 0 ? $__default['default'](SELECTOR_SIDEBAR).height() : 0,
        controlSidebar
      };

      const max = this._max(heights);

      let offset = this._config.panelAutoHeight;

      if (offset === true) {
        offset = 0;
      }

      const $contentSelector = $__default['default'](SELECTOR_CONTENT);

      if (offset !== false) {
        if (max === heights.controlSidebar) {
          $contentSelector.css(this._config.panelAutoHeightMode, max + offset);
        } else if (max === heights.window) {
          $contentSelector.css(this._config.panelAutoHeightMode, max + offset - heights.header - heights.footer);
        } else {
          $contentSelector.css(this._config.panelAutoHeightMode, max + offset - heights.header);
        }

        if (heights.controlSidebar + heights.footer >= heights.sidebar && heights.controlSidebar != 0) {
          $contentSelector.css(this._config.panelAutoHeightMode, heights.controlSidebar + offset);
        }

        if (this._isFooterFixed()) {
          $contentSelector.css(this._config.panelAutoHeightMode, parseFloat($contentSelector.css(this._config.panelAutoHeightMode)) + heights.footer);
        }
      }

      if (!$body.hasClass(CLASS_NAME_LAYOUT_FIXED$1)) {
        return;
      }

      if (offset !== false) {
        $contentSelector.css(this._config.panelAutoHeightMode, max + offset - heights.header - heights.footer);
      }

      if (typeof $__default['default'].fn.overlayScrollbars !== 'undefined') {
        $__default['default'](SELECTOR_SIDEBAR).overlayScrollbars({
          className: this._config.scrollbarTheme,
          sizeAutoCapable: true,
          scrollbars: {
            autoHide: this._config.scrollbarAutoHide,
            clickScrolling: true
          }
        });
      } else {
        $__default['default'](SELECTOR_SIDEBAR).css('overflow-y', 'auto');
      }
    }

    fixLoginRegisterHeight() {
      const $body = $__default['default']('body');
      const $selector = $__default['default'](`${SELECTOR_LOGIN_BOX}, ${SELECTOR_REGISTER_BOX}`);

      if ($selector.length === 0) {
        $body.css('height', 'auto');
        $__default['default']('html').css('height', 'auto');
      } else {
        const boxHeight = $selector.height();

        if ($body.css(this._config.panelAutoHeightMode) !== boxHeight) {
          $body.css(this._config.panelAutoHeightMode, boxHeight);
        }
      }
    } // Private


    _init() {
      // Activate layout height watcher
      this.fixLayoutHeight();

      if (this._config.loginRegisterAutoHeight === true) {
        this.fixLoginRegisterHeight();
      } else if (this._config.loginRegisterAutoHeight === parseInt(this._config.loginRegisterAutoHeight, 10)) {
        setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);
      }

      $__default['default'](SELECTOR_SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview', () => {
        this.fixLayoutHeight();
      });
      $__default['default'](SELECTOR_MAIN_SIDEBAR).on('mouseenter mouseleave', () => {
        if ($__default['default']('body').hasClass(CLASS_NAME_SIDEBAR_COLLAPSED)) {
          this.fixLayoutHeight();
        }
      });
      $__default['default'](SELECTOR_PUSHMENU_BTN).on('collapsed.lte.pushmenu shown.lte.pushmenu', () => {
        setTimeout(() => {
          this.fixLayoutHeight();
        }, 300);
      });
      $__default['default'](SELECTOR_CONTROL_SIDEBAR_BTN).on('collapsed.lte.controlsidebar', () => {
        this.fixLayoutHeight();
      }).on('expanded.lte.controlsidebar', () => {
        this.fixLayoutHeight('control_sidebar');
      });
      $__default['default'](window).resize(() => {
        this.fixLayoutHeight();
      });
      $__default['default'](document).ready(() => {
        this.fixLayoutHeight();
      });
      setTimeout(() => {
        $__default['default']('body.hold-transition').removeClass('hold-transition');
      }, 50);
    }

    _max(numbers) {
      // Calculate the maximum number in a list
      let max = 0;
      Object.keys(numbers).forEach(key => {
        if (numbers[key] > max) {
          max = numbers[key];
        }
      });
      return max;
    }

    _isFooterFixed() {
      return $__default['default'](SELECTOR_FOOTER$1).css('position') === 'fixed';
    } // Static


    static _jQueryInterface(config = '') {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$8);

        const _options = $__default['default'].extend({}, Default$6, $__default['default'](this).data());

        if (!data) {
          data = new Layout($__default['default'](this), _options);
          $__default['default'](this).data(DATA_KEY$8, data);
        }

        if (config === 'init' || config === '') {
          data._init();
        } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
          data[config]();
        }
      });
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](window).on('load', () => {
    Layout._jQueryInterface.call($__default['default']('body'));
  });
  $__default['default'](`${SELECTOR_SIDEBAR} a`).on('focusin', () => {
    $__default['default'](SELECTOR_MAIN_SIDEBAR).addClass(CLASS_NAME_SIDEBAR_FOCUSED);
  });
  $__default['default'](`${SELECTOR_SIDEBAR} a`).on('focusout', () => {
    $__default['default'](SELECTOR_MAIN_SIDEBAR).removeClass(CLASS_NAME_SIDEBAR_FOCUSED);
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$8] = Layout._jQueryInterface;
  $__default['default'].fn[NAME$8].Constructor = Layout;

  $__default['default'].fn[NAME$8].noConflict = function () {
    $__default['default'].fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return Layout._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE PushMenu.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$9 = 'PushMenu';
  const DATA_KEY$9 = 'lte.pushmenu';
  const EVENT_KEY$5 = `.${DATA_KEY$9}`;
  const JQUERY_NO_CONFLICT$9 = $__default['default'].fn[NAME$9];
  const EVENT_COLLAPSED$3 = `collapsed${EVENT_KEY$5}`;
  const EVENT_SHOWN = `shown${EVENT_KEY$5}`;
  const SELECTOR_TOGGLE_BUTTON = '[data-widget="pushmenu"]';
  const SELECTOR_BODY = 'body';
  const SELECTOR_OVERLAY = '#sidebar-overlay';
  const SELECTOR_WRAPPER = '.wrapper';
  const CLASS_NAME_COLLAPSED$1 = 'sidebar-collapse';
  const CLASS_NAME_OPEN = 'sidebar-open';
  const CLASS_NAME_IS_OPENING = 'sidebar-is-opening';
  const CLASS_NAME_CLOSED = 'sidebar-closed';
  const Default$7 = {
    autoCollapseSize: 1280,
    enableRemember: false,
    noTransitionAfterReload: true
  };
  /**
   * Class Definition
   * ====================================================
   */

  class PushMenu {
    constructor(element, options) {
      this._element = element;
      this._options = $__default['default'].extend({}, Default$7, options);

      if ($__default['default'](SELECTOR_OVERLAY).length === 0) {
        this._addOverlay();
      }

      this._init();
    } // Public


    expand() {
      const $bodySelector = $__default['default'](SELECTOR_BODY);

      if (this._options.autoCollapseSize) {
        if ($__default['default'](window).width() <= this._options.autoCollapseSize) {
          $bodySelector.addClass(CLASS_NAME_OPEN);
        }
      }

      $bodySelector.addClass(CLASS_NAME_IS_OPENING).removeClass(`${CLASS_NAME_COLLAPSED$1} ${CLASS_NAME_CLOSED}`).delay(50).queue(function () {
        $bodySelector.removeClass(CLASS_NAME_IS_OPENING);
        $__default['default'](this).dequeue();
      });

      if (this._options.enableRemember) {
        localStorage.setItem(`remember${EVENT_KEY$5}`, CLASS_NAME_OPEN);
      }

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_SHOWN));
    }

    collapse() {
      const $bodySelector = $__default['default'](SELECTOR_BODY);

      if (this._options.autoCollapseSize) {
        if ($__default['default'](window).width() <= this._options.autoCollapseSize) {
          $bodySelector.removeClass(CLASS_NAME_OPEN).addClass(CLASS_NAME_CLOSED);
        }
      }

      $bodySelector.addClass(CLASS_NAME_COLLAPSED$1);

      if (this._options.enableRemember) {
        localStorage.setItem(`remember${EVENT_KEY$5}`, CLASS_NAME_COLLAPSED$1);
      }

      $__default['default'](this._element).trigger($__default['default'].Event(EVENT_COLLAPSED$3));
    }

    toggle() {
      if ($__default['default'](SELECTOR_BODY).hasClass(CLASS_NAME_COLLAPSED$1)) {
        this.expand();
      } else {
        this.collapse();
      }
    }

    autoCollapse(resize = false) {
      if (!this._options.autoCollapseSize) {
        return;
      }

      const $bodySelector = $__default['default'](SELECTOR_BODY);

      if ($__default['default'](window).width() <= this._options.autoCollapseSize) {
        if (!$bodySelector.hasClass(CLASS_NAME_OPEN)) {
          this.collapse();
        }
      } else if (resize === true) {
        if ($bodySelector.hasClass(CLASS_NAME_OPEN)) {
          $bodySelector.removeClass(CLASS_NAME_OPEN);
        } else if ($bodySelector.hasClass(CLASS_NAME_CLOSED)) {
          this.expand();
        }
      }
    }

    remember() {
      if (!this._options.enableRemember) {
        return;
      }

      const $body = $__default['default']('body');
      const toggleState = localStorage.getItem(`remember${EVENT_KEY$5}`);

      if (toggleState === CLASS_NAME_COLLAPSED$1) {
        if (this._options.noTransitionAfterReload) {
          $body.addClass('hold-transition').addClass(CLASS_NAME_COLLAPSED$1).delay(50).queue(function () {
            $__default['default'](this).removeClass('hold-transition');
            $__default['default'](this).dequeue();
          });
        } else {
          $body.addClass(CLASS_NAME_COLLAPSED$1);
        }
      } else if (this._options.noTransitionAfterReload) {
        $body.addClass('hold-transition').removeClass(CLASS_NAME_COLLAPSED$1).delay(50).queue(function () {
          $__default['default'](this).removeClass('hold-transition');
          $__default['default'](this).dequeue();
        });
      } else {
        $body.removeClass(CLASS_NAME_COLLAPSED$1);
      }
    } // Private


    _init() {
      this.remember();
      this.autoCollapse();
      $__default['default'](window).resize(() => {
        this.autoCollapse(true);
      });
    }

    _addOverlay() {
      const overlay = $__default['default']('<div />', {
        id: 'sidebar-overlay'
      });
      overlay.on('click', () => {
        this.collapse();
      });
      $__default['default'](SELECTOR_WRAPPER).append(overlay);
    } // Static


    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$9);

        const _options = $__default['default'].extend({}, Default$7, $__default['default'](this).data());

        if (!data) {
          data = new PushMenu(this, _options);
          $__default['default'](this).data(DATA_KEY$9, data);
        }

        if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {
          data[operation]();
        }
      });
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_TOGGLE_BUTTON, event => {
    event.preventDefault();
    let button = event.currentTarget;

    if ($__default['default'](button).data('widget') !== 'pushmenu') {
      button = $__default['default'](button).closest(SELECTOR_TOGGLE_BUTTON);
    }

    PushMenu._jQueryInterface.call($__default['default'](button), 'toggle');
  });
  $__default['default'](window).on('load', () => {
    PushMenu._jQueryInterface.call($__default['default'](SELECTOR_TOGGLE_BUTTON));
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$9] = PushMenu._jQueryInterface;
  $__default['default'].fn[NAME$9].Constructor = PushMenu;

  $__default['default'].fn[NAME$9].noConflict = function () {
    $__default['default'].fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return PushMenu._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE SidebarSearch.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$a = 'SidebarSearch';
  const DATA_KEY$a = 'lte.sidebar-search';
  const JQUERY_NO_CONFLICT$a = $__default['default'].fn[NAME$a];
  const CLASS_NAME_OPEN$1 = 'sidebar-search-open';
  const CLASS_NAME_ICON_SEARCH = 'fa-search';
  const CLASS_NAME_ICON_CLOSE = 'fa-times';
  const CLASS_NAME_HEADER = 'nav-header';
  const CLASS_NAME_SEARCH_RESULTS = 'sidebar-search-results';
  const CLASS_NAME_LIST_GROUP = 'list-group';
  const SELECTOR_DATA_WIDGET$1 = '[data-widget="sidebar-search"]';
  const SELECTOR_SIDEBAR$1 = '.main-sidebar .nav-sidebar';
  const SELECTOR_NAV_LINK = '.nav-link';
  const SELECTOR_NAV_TREEVIEW = '.nav-treeview';
  const SELECTOR_SEARCH_INPUT = `${SELECTOR_DATA_WIDGET$1} .form-control`;
  const SELECTOR_SEARCH_BUTTON = `${SELECTOR_DATA_WIDGET$1} .btn`;
  const SELECTOR_SEARCH_ICON = `${SELECTOR_SEARCH_BUTTON} i`;
  const SELECTOR_SEARCH_LIST_GROUP = `.${CLASS_NAME_LIST_GROUP}`;
  const SELECTOR_SEARCH_RESULTS = `.${CLASS_NAME_SEARCH_RESULTS}`;
  const SELECTOR_SEARCH_RESULTS_GROUP = `${SELECTOR_SEARCH_RESULTS} .${CLASS_NAME_LIST_GROUP}`;
  const Default$8 = {
    arrowSign: '->',
    minLength: 3,
    maxResults: 7,
    highlightName: true,
    highlightPath: false,
    highlightClass: 'text-light',
    notFoundText: 'No element found!'
  };
  const SearchItems = [];
  /**
   * Class Definition
   * ====================================================
   */

  class SidebarSearch {
    constructor(_element, _options) {
      this.element = _element;
      this.options = $__default['default'].extend({}, Default$8, _options);
      this.items = [];
    } // Public


    init() {
      if ($__default['default'](SELECTOR_DATA_WIDGET$1).length == 0) {
        return;
      }

      if ($__default['default'](SELECTOR_DATA_WIDGET$1).next(SELECTOR_SEARCH_RESULTS).length == 0) {
        $__default['default'](SELECTOR_DATA_WIDGET$1).after($__default['default']('<div />', {
          class: CLASS_NAME_SEARCH_RESULTS
        }));
      }

      if ($__default['default'](SELECTOR_SEARCH_RESULTS).children(SELECTOR_SEARCH_LIST_GROUP).length == 0) {
        $__default['default'](SELECTOR_SEARCH_RESULTS).append($__default['default']('<div />', {
          class: CLASS_NAME_LIST_GROUP
        }));
      }

      this._addNotFound();

      $__default['default'](SELECTOR_SIDEBAR$1).children().each((i, child) => {
        this._parseItem(child);
      });
    }

    search() {
      const searchValue = $__default['default'](SELECTOR_SEARCH_INPUT).val().toLowerCase();

      if (searchValue.length < this.options.minLength) {
        $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).empty();

        this._addNotFound();

        this.close();
        return;
      }

      const searchResults = SearchItems.filter(item => item.name.toLowerCase().includes(searchValue));
      const endResults = $__default['default'](searchResults.slice(0, this.options.maxResults));
      $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).empty();

      if (endResults.length === 0) {
        this._addNotFound();
      } else {
        endResults.each((i, result) => {
          $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).append(this._renderItem(escape(result.name), escape(result.link), result.path));
        });
      }

      this.open();
    }

    open() {
      $__default['default'](SELECTOR_DATA_WIDGET$1).parent().addClass(CLASS_NAME_OPEN$1);
      $__default['default'](SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_SEARCH).addClass(CLASS_NAME_ICON_CLOSE);
    }

    close() {
      $__default['default'](SELECTOR_DATA_WIDGET$1).parent().removeClass(CLASS_NAME_OPEN$1);
      $__default['default'](SELECTOR_SEARCH_ICON).removeClass(CLASS_NAME_ICON_CLOSE).addClass(CLASS_NAME_ICON_SEARCH);
    }

    toggle() {
      if ($__default['default'](SELECTOR_DATA_WIDGET$1).parent().hasClass(CLASS_NAME_OPEN$1)) {
        this.close();
      } else {
        this.open();
      }
    } // Private


    _parseItem(item, path = []) {
      if ($__default['default'](item).hasClass(CLASS_NAME_HEADER)) {
        return;
      }

      const itemObject = {};
      const navLink = $__default['default'](item).clone().find(`> ${SELECTOR_NAV_LINK}`);
      const navTreeview = $__default['default'](item).clone().find(`> ${SELECTOR_NAV_TREEVIEW}`);
      const link = navLink.attr('href');
      const name = navLink.find('p').children().remove().end().text();
      itemObject.name = this._trimText(name);
      itemObject.link = link;
      itemObject.path = path;

      if (navTreeview.length === 0) {
        SearchItems.push(itemObject);
      } else {
        const newPath = itemObject.path.concat([itemObject.name]);
        navTreeview.children().each((i, child) => {
          this._parseItem(child, newPath);
        });
      }
    }

    _trimText(text) {
      return $$1.trim(text.replace(/(\r\n|\n|\r)/gm, ' '));
    }

    _renderItem(name, link, path) {
      path = path.join(` ${this.options.arrowSign} `);
      name = unescape(name);

      if (this.options.highlightName || this.options.highlightPath) {
        const searchValue = $__default['default'](SELECTOR_SEARCH_INPUT).val().toLowerCase();
        const regExp = new RegExp(searchValue, 'gi');

        if (this.options.highlightName) {
          name = name.replace(regExp, str => {
            return `<strong class="${this.options.highlightClass}">${str}</strong>`;
          });
        }

        if (this.options.highlightPath) {
          path = path.replace(regExp, str => {
            return `<strong class="${this.options.highlightClass}">${str}</strong>`;
          });
        }
      }

      const groupItemElement = $__default['default']('<a/>', {
        href: link,
        class: 'list-group-item'
      });
      const searchTitleElement = $__default['default']('<div/>', {
        class: 'search-title'
      }).html(name);
      const searchPathElement = $__default['default']('<div/>', {
        class: 'search-path'
      }).html(path);
      groupItemElement.append(searchTitleElement).append(searchPathElement);
      return groupItemElement;
    }

    _addNotFound() {
      $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).append(this._renderItem(this.options.notFoundText, '#', []));
    } // Static


    static _jQueryInterface(config) {
      let data = $__default['default'](this).data(DATA_KEY$a);

      if (!data) {
        data = $__default['default'](this).data();
      }

      const _options = $__default['default'].extend({}, Default$8, typeof config === 'object' ? config : data);

      const plugin = new SidebarSearch($__default['default'](this), _options);
      $__default['default'](this).data(DATA_KEY$a, typeof config === 'object' ? config : data);

      if (typeof config === 'string' && config.match(/init|toggle|close|open|search/)) {
        plugin[config]();
      } else {
        plugin.init();
      }
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_SEARCH_BUTTON, event => {
    event.preventDefault();

    SidebarSearch._jQueryInterface.call($__default['default'](SELECTOR_DATA_WIDGET$1), 'toggle');
  });
  $__default['default'](document).on('keyup', SELECTOR_SEARCH_INPUT, event => {
    if (event.keyCode == 38) {
      event.preventDefault();
      $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).children().last().focus();
      return;
    }

    if (event.keyCode == 40) {
      event.preventDefault();
      $__default['default'](SELECTOR_SEARCH_RESULTS_GROUP).children().first().focus();
      return;
    }

    setTimeout(() => {
      SidebarSearch._jQueryInterface.call($__default['default'](SELECTOR_DATA_WIDGET$1), 'search');
    }, 100);
  });
  $__default['default'](document).on('keydown', SELECTOR_SEARCH_RESULTS_GROUP, event => {
    const $focused = $__default['default'](':focus');

    if (event.keyCode == 38) {
      event.preventDefault();

      if ($focused.is(':first-child')) {
        $focused.siblings().last().focus();
      } else {
        $focused.prev().focus();
      }
    }

    if (event.keyCode == 40) {
      event.preventDefault();

      if ($focused.is(':last-child')) {
        $focused.siblings().first().focus();
      } else {
        $focused.next().focus();
      }
    }
  });
  $__default['default'](window).on('load', () => {
    SidebarSearch._jQueryInterface.call($__default['default'](SELECTOR_DATA_WIDGET$1), 'init');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$a] = SidebarSearch._jQueryInterface;
  $__default['default'].fn[NAME$a].Constructor = SidebarSearch;

  $__default['default'].fn[NAME$a].noConflict = function () {
    $__default['default'].fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return SidebarSearch._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE NavbarSearch.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$b = 'NavbarSearch';
  const DATA_KEY$b = 'lte.navbar-search';
  const JQUERY_NO_CONFLICT$b = $__default['default'].fn[NAME$b];
  const SELECTOR_TOGGLE_BUTTON$1 = '[data-widget="navbar-search"]';
  const SELECTOR_SEARCH_BLOCK = '.navbar-search-block';
  const SELECTOR_SEARCH_INPUT$1 = '.navbar-search-block .form-control';
  const CLASS_NAME_OPEN$2 = 'navbar-search-open';
  const Default$9 = {
    resetOnClose: true
  };
  /**
   * Class Definition
   * ====================================================
   */

  class NavbarSearch {
    constructor(_element, _options) {
      this._element = _element;
      this._config = $__default['default'].extend({}, Default$9, _options);
    } // Public


    open() {
      $__default['default'](SELECTOR_SEARCH_BLOCK).css('display', 'flex').hide().fadeIn().addClass(CLASS_NAME_OPEN$2);
      $__default['default'](SELECTOR_SEARCH_INPUT$1).focus();
    }

    close() {
      $__default['default'](SELECTOR_SEARCH_BLOCK).fadeOut().removeClass(CLASS_NAME_OPEN$2);

      if (this._config.resetOnClose) {
        $__default['default'](SELECTOR_SEARCH_INPUT$1).val('');
      }
    }

    toggle() {
      if ($__default['default'](SELECTOR_SEARCH_BLOCK).hasClass(CLASS_NAME_OPEN$2)) {
        this.close();
      } else {
        this.open();
      }
    } // Static


    static _jQueryInterface(options) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$b);

        if (!data) {
          data = new NavbarSearch(this, options);
          $__default['default'](this).data(DATA_KEY$b, data);
        }

        if (!/toggle|close|open/.test(options)) {
          throw new Error(`Undefined method ${options}`);
        }

        data[options]();
      });
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](document).on('click', SELECTOR_TOGGLE_BUTTON$1, event => {
    event.preventDefault();
    let button = $__default['default'](event.currentTarget);

    if (button.data('widget') !== 'navbar-search') {
      button = button.closest(SELECTOR_TOGGLE_BUTTON$1);
    }

    NavbarSearch._jQueryInterface.call(button, 'toggle');
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$b] = NavbarSearch._jQueryInterface;
  $__default['default'].fn[NAME$b].Constructor = NavbarSearch;

  $__default['default'].fn[NAME$b].noConflict = function () {
    $__default['default'].fn[NAME$b] = JQUERY_NO_CONFLICT$b;
    return NavbarSearch._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE Toasts.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$c = 'Toasts';
  const DATA_KEY$c = 'lte.toasts';
  const EVENT_KEY$6 = `.${DATA_KEY$c}`;
  const JQUERY_NO_CONFLICT$c = $__default['default'].fn[NAME$c];
  const EVENT_INIT = `init${EVENT_KEY$6}`;
  const EVENT_CREATED = `created${EVENT_KEY$6}`;
  const EVENT_REMOVED$1 = `removed${EVENT_KEY$6}`;
  const SELECTOR_CONTAINER_TOP_RIGHT = '#toastsContainerTopRight';
  const SELECTOR_CONTAINER_TOP_LEFT = '#toastsContainerTopLeft';
  const SELECTOR_CONTAINER_BOTTOM_RIGHT = '#toastsContainerBottomRight';
  const SELECTOR_CONTAINER_BOTTOM_LEFT = '#toastsContainerBottomLeft';
  const CLASS_NAME_TOP_RIGHT = 'toasts-top-right';
  const CLASS_NAME_TOP_LEFT = 'toasts-top-left';
  const CLASS_NAME_BOTTOM_RIGHT = 'toasts-bottom-right';
  const CLASS_NAME_BOTTOM_LEFT = 'toasts-bottom-left';
  const POSITION_TOP_RIGHT = 'topRight';
  const POSITION_TOP_LEFT = 'topLeft';
  const POSITION_BOTTOM_RIGHT = 'bottomRight';
  const POSITION_BOTTOM_LEFT = 'bottomLeft';
  const Default$a = {
    position: POSITION_TOP_RIGHT,
    fixed: true,
    autohide: false,
    autoremove: true,
    delay: 1000,
    fade: true,
    icon: null,
    image: null,
    imageAlt: null,
    imageHeight: '25px',
    title: null,
    subtitle: null,
    close: true,
    body: null,
    class: null
  };
  /**
   * Class Definition
   * ====================================================
   */

  class Toasts {
    constructor(element, config) {
      this._config = config;

      this._prepareContainer();

      $__default['default']('body').trigger($__default['default'].Event(EVENT_INIT));
    } // Public


    create() {
      const toast = $__default['default']('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');
      toast.data('autohide', this._config.autohide);
      toast.data('animation', this._config.fade);

      if (this._config.class) {
        toast.addClass(this._config.class);
      }

      if (this._config.delay && this._config.delay != 500) {
        toast.data('delay', this._config.delay);
      }

      const toastHeader = $__default['default']('<div class="toast-header">');

      if (this._config.image != null) {
        const toastImage = $__default['default']('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt);

        if (this._config.imageHeight != null) {
          toastImage.height(this._config.imageHeight).width('auto');
        }

        toastHeader.append(toastImage);
      }

      if (this._config.icon != null) {
        toastHeader.append($__default['default']('<i />').addClass('mr-2').addClass(this._config.icon));
      }

      if (this._config.title != null) {
        toastHeader.append($__default['default']('<strong />').addClass('mr-auto').html(this._config.title));
      }

      if (this._config.subtitle != null) {
        toastHeader.append($__default['default']('<small />').html(this._config.subtitle));
      }

      if (this._config.close == true) {
        const toastClose = $__default['default']('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>');

        if (this._config.title == null) {
          toastClose.toggleClass('ml-2 ml-auto');
        }

        toastHeader.append(toastClose);
      }

      toast.append(toastHeader);

      if (this._config.body != null) {
        toast.append($__default['default']('<div class="toast-body" />').html(this._config.body));
      }

      $__default['default'](this._getContainerId()).prepend(toast);
      const $body = $__default['default']('body');
      $body.trigger($__default['default'].Event(EVENT_CREATED));
      toast.toast('show');

      if (this._config.autoremove) {
        toast.on('hidden.bs.toast', function () {
          $__default['default'](this).delay(200).remove();
          $body.trigger($__default['default'].Event(EVENT_REMOVED$1));
        });
      }
    } // Static


    _getContainerId() {
      if (this._config.position == POSITION_TOP_RIGHT) {
        return SELECTOR_CONTAINER_TOP_RIGHT;
      }

      if (this._config.position == POSITION_TOP_LEFT) {
        return SELECTOR_CONTAINER_TOP_LEFT;
      }

      if (this._config.position == POSITION_BOTTOM_RIGHT) {
        return SELECTOR_CONTAINER_BOTTOM_RIGHT;
      }

      if (this._config.position == POSITION_BOTTOM_LEFT) {
        return SELECTOR_CONTAINER_BOTTOM_LEFT;
      }
    }

    _prepareContainer() {
      if ($__default['default'](this._getContainerId()).length === 0) {
        const container = $__default['default']('<div />').attr('id', this._getContainerId().replace('#', ''));

        if (this._config.position == POSITION_TOP_RIGHT) {
          container.addClass(CLASS_NAME_TOP_RIGHT);
        } else if (this._config.position == POSITION_TOP_LEFT) {
          container.addClass(CLASS_NAME_TOP_LEFT);
        } else if (this._config.position == POSITION_BOTTOM_RIGHT) {
          container.addClass(CLASS_NAME_BOTTOM_RIGHT);
        } else if (this._config.position == POSITION_BOTTOM_LEFT) {
          container.addClass(CLASS_NAME_BOTTOM_LEFT);
        }

        $__default['default']('body').append(container);
      }

      if (this._config.fixed) {
        $__default['default'](this._getContainerId()).addClass('fixed');
      } else {
        $__default['default'](this._getContainerId()).removeClass('fixed');
      }
    } // Static


    static _jQueryInterface(option, config) {
      return this.each(function () {
        const _options = $__default['default'].extend({}, Default$a, config);

        const toast = new Toasts($__default['default'](this), _options);

        if (option === 'create') {
          toast[option]();
        }
      });
    }

  }
  /**
   * jQuery API
   * ====================================================
   */


  $__default['default'].fn[NAME$c] = Toasts._jQueryInterface;
  $__default['default'].fn[NAME$c].Constructor = Toasts;

  $__default['default'].fn[NAME$c].noConflict = function () {
    $__default['default'].fn[NAME$c] = JQUERY_NO_CONFLICT$c;
    return Toasts._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE TodoList.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$d = 'TodoList';
  const DATA_KEY$d = 'lte.todolist';
  const JQUERY_NO_CONFLICT$d = $__default['default'].fn[NAME$d];
  const SELECTOR_DATA_TOGGLE$4 = '[data-widget="todo-list"]';
  const CLASS_NAME_TODO_LIST_DONE = 'done';
  const Default$b = {
    onCheck(item) {
      return item;
    },

    onUnCheck(item) {
      return item;
    }

  };
  /**
   * Class Definition
   * ====================================================
   */

  class TodoList {
    constructor(element, config) {
      this._config = config;
      this._element = element;

      this._init();
    } // Public


    toggle(item) {
      item.parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE);

      if (!$__default['default'](item).prop('checked')) {
        this.unCheck($__default['default'](item));
        return;
      }

      this.check(item);
    }

    check(item) {
      this._config.onCheck.call(item);
    }

    unCheck(item) {
      this._config.onUnCheck.call(item);
    } // Private


    _init() {
      const $toggleSelector = this._element;
      $toggleSelector.find('input:checkbox:checked').parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE);
      $toggleSelector.on('change', 'input:checkbox', event => {
        this.toggle($__default['default'](event.target));
      });
    } // Static


    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$d);

        if (!data) {
          data = $__default['default'](this).data();
        }

        const _options = $__default['default'].extend({}, Default$b, typeof config === 'object' ? config : data);

        const plugin = new TodoList($__default['default'](this), _options);
        $__default['default'](this).data(DATA_KEY$d, typeof config === 'object' ? config : data);

        if (config === 'init') {
          plugin[config]();
        }
      });
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](window).on('load', () => {
    TodoList._jQueryInterface.call($__default['default'](SELECTOR_DATA_TOGGLE$4));
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$d] = TodoList._jQueryInterface;
  $__default['default'].fn[NAME$d].Constructor = TodoList;

  $__default['default'].fn[NAME$d].noConflict = function () {
    $__default['default'].fn[NAME$d] = JQUERY_NO_CONFLICT$d;
    return TodoList._jQueryInterface;
  };

  /**
   * --------------------------------------------
   * AdminLTE Treeview.js
   * License MIT
   * --------------------------------------------
   */
  /**
   * Constants
   * ====================================================
   */

  const NAME$e = 'Treeview';
  const DATA_KEY$e = 'lte.treeview';
  const EVENT_KEY$7 = `.${DATA_KEY$e}`;
  const JQUERY_NO_CONFLICT$e = $__default['default'].fn[NAME$e];
  const EVENT_EXPANDED$3 = `expanded${EVENT_KEY$7}`;
  const EVENT_COLLAPSED$4 = `collapsed${EVENT_KEY$7}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$7}`;
  const SELECTOR_LI = '.nav-item';
  const SELECTOR_LINK = '.nav-link';
  const SELECTOR_TREEVIEW_MENU = '.nav-treeview';
  const SELECTOR_OPEN = '.menu-open';
  const SELECTOR_DATA_WIDGET$2 = '[data-widget="treeview"]';
  const CLASS_NAME_OPEN$3 = 'menu-open';
  const CLASS_NAME_IS_OPENING$1 = 'menu-is-opening';
  const CLASS_NAME_SIDEBAR_COLLAPSED$1 = 'sidebar-collapse';
  const Default$c = {
    trigger: `${SELECTOR_DATA_WIDGET$2} ${SELECTOR_LINK}`,
    animationSpeed: 300,
    accordion: true,
    expandSidebar: false,
    sidebarButtonSelector: '[data-widget="pushmenu"]'
  };
  /**
   * Class Definition
   * ====================================================
   */

  class Treeview {
    constructor(element, config) {
      this._config = config;
      this._element = element;
    } // Public


    init() {
      $__default['default'](`${SELECTOR_LI}${SELECTOR_OPEN} ${SELECTOR_TREEVIEW_MENU}`).css('display', 'block');

      this._setupListeners();
    }

    expand(treeviewMenu, parentLi) {
      const expandedEvent = $__default['default'].Event(EVENT_EXPANDED$3);

      if (this._config.accordion) {
        const openMenuLi = parentLi.siblings(SELECTOR_OPEN).first();
        const openTreeview = openMenuLi.find(SELECTOR_TREEVIEW_MENU).first();
        this.collapse(openTreeview, openMenuLi);
      }

      parentLi.addClass(CLASS_NAME_IS_OPENING$1);
      treeviewMenu.stop().slideDown(this._config.animationSpeed, () => {
        parentLi.addClass(CLASS_NAME_OPEN$3);
        $__default['default'](this._element).trigger(expandedEvent);
      });

      if (this._config.expandSidebar) {
        this._expandSidebar();
      }
    }

    collapse(treeviewMenu, parentLi) {
      const collapsedEvent = $__default['default'].Event(EVENT_COLLAPSED$4);
      parentLi.removeClass(`${CLASS_NAME_IS_OPENING$1} ${CLASS_NAME_OPEN$3}`);
      treeviewMenu.stop().slideUp(this._config.animationSpeed, () => {
        $__default['default'](this._element).trigger(collapsedEvent);
        treeviewMenu.find(`${SELECTOR_OPEN} > ${SELECTOR_TREEVIEW_MENU}`).slideUp();
        treeviewMenu.find(SELECTOR_OPEN).removeClass(CLASS_NAME_OPEN$3);
      });
    }

    toggle(event) {
      const $relativeTarget = $__default['default'](event.currentTarget);
      const $parent = $relativeTarget.parent();
      let treeviewMenu = $parent.find(`> ${SELECTOR_TREEVIEW_MENU}`);

      if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
        if (!$parent.is(SELECTOR_LI)) {
          treeviewMenu = $parent.parent().find(`> ${SELECTOR_TREEVIEW_MENU}`);
        }

        if (!treeviewMenu.is(SELECTOR_TREEVIEW_MENU)) {
          return;
        }
      }

      event.preventDefault();
      const parentLi = $relativeTarget.parents(SELECTOR_LI).first();
      const isOpen = parentLi.hasClass(CLASS_NAME_OPEN$3);

      if (isOpen) {
        this.collapse($__default['default'](treeviewMenu), parentLi);
      } else {
        this.expand($__default['default'](treeviewMenu), parentLi);
      }
    } // Private


    _setupListeners() {
      const elementId = this._element.attr('id') !== undefined ? `#${this._element.attr('id')}` : '';
      $__default['default'](document).on('click', `${elementId}${this._config.trigger}`, event => {
        this.toggle(event);
      });
    }

    _expandSidebar() {
      if ($__default['default']('body').hasClass(CLASS_NAME_SIDEBAR_COLLAPSED$1)) {
        $__default['default'](this._config.sidebarButtonSelector).PushMenu('expand');
      }
    } // Static


    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $__default['default'](this).data(DATA_KEY$e);

        const _options = $__default['default'].extend({}, Default$c, $__default['default'](this).data());

        if (!data) {
          data = new Treeview($__default['default'](this), _options);
          $__default['default'](this).data(DATA_KEY$e, data);
        }

        if (config === 'init') {
          data[config]();
        }
      });
    }

  }
  /**
   * Data API
   * ====================================================
   */


  $__default['default'](window).on(EVENT_LOAD_DATA_API, () => {
    $__default['default'](SELECTOR_DATA_WIDGET$2).each(function () {
      Treeview._jQueryInterface.call($__default['default'](this), 'init');
    });
  });
  /**
   * jQuery API
   * ====================================================
   */

  $__default['default'].fn[NAME$e] = Treeview._jQueryInterface;
  $__default['default'].fn[NAME$e].Constructor = Treeview;

  $__default['default'].fn[NAME$e].noConflict = function () {
    $__default['default'].fn[NAME$e] = JQUERY_NO_CONFLICT$e;
    return Treeview._jQueryInterface;
  };

  /**
   * jquery-bootstrap-scrolling-tabs
   * @version v2.6.1
   * @link https://github.com/mikejacobson/jquery-bootstrap-scrolling-tabs
   * @author Mike Jacobson <michaeljjacobson1@gmail.com>
   * @license MIT License, http://www.opensource.org/licenses/MIT
   */

  (function ($, window) {
    /* jshint unused:false */

    /* exported CONSTANTS */

    var CONSTANTS = {
      CONTINUOUS_SCROLLING_TIMEOUT_INTERVAL: 50,
      // timeout interval for repeatedly moving the tabs container
      // by one increment while the mouse is held down--decrease to
      // make mousedown continous scrolling faster
      SCROLL_OFFSET_FRACTION: 6,
      // each click moves the container this fraction of the fixed container--decrease
      // to make the tabs scroll farther per click
      DATA_KEY_DDMENU_MODIFIED: 'scrtabsddmenumodified',
      DATA_KEY_IS_MOUSEDOWN: 'scrtabsismousedown',
      DATA_KEY_BOOTSTRAP_TAB: 'bs.tab',
      CSS_CLASSES: {
        BOOTSTRAP4: 'scrtabs-bootstrap4',
        RTL: 'scrtabs-rtl',
        SCROLL_ARROW_CLICK_TARGET: 'scrtabs-click-target',
        SCROLL_ARROW_DISABLE: 'scrtabs-disable',
        SCROLL_ARROW_WITH_CLICK_TARGET: 'scrtabs-with-click-target'
      },
      SLIDE_DIRECTION: {
        LEFT: 1,
        RIGHT: 2
      },
      EVENTS: {
        CLICK: 'click.scrtabs',
        DROPDOWN_MENU_HIDE: 'hide.bs.dropdown.scrtabs',
        DROPDOWN_MENU_SHOW: 'show.bs.dropdown.scrtabs',
        FORCE_REFRESH: 'forcerefresh.scrtabs',
        MOUSEDOWN: 'mousedown.scrtabs',
        MOUSEUP: 'mouseup.scrtabs',
        TABS_READY: 'ready.scrtabs',
        TOUCH_END: 'touchend.scrtabs',
        TOUCH_MOVE: 'touchmove.scrtabs',
        TOUCH_START: 'touchstart.scrtabs',
        WINDOW_RESIZE: 'resize.scrtabs'
      }
    }; // smartresize from Paul Irish (debounced window resize)

    (function (sr) {
      var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
          var obj = this,
              args = arguments;

          function delayed() {
            if (!execAsap) {
              func.apply(obj, args);
            }

            timeout = null;
          }

          if (timeout) {
            clearTimeout(timeout);
          } else if (execAsap) {
            func.apply(obj, args);
          }

          timeout = setTimeout(delayed, threshold || 100);
        };
      };

      $.fn[sr] = function (fn, customEventName) {
        var eventName = customEventName || CONSTANTS.EVENTS.WINDOW_RESIZE;
        return fn ? this.bind(eventName, debounce(fn)) : this.trigger(sr);
      };
    })('smartresizeScrtabs');
    /* ***********************************************************************************
     * ElementsHandler - Class that each instance of ScrollingTabsControl will instantiate
     * **********************************************************************************/


    function ElementsHandler(scrollingTabsControl) {
      var ehd = this;
      ehd.stc = scrollingTabsControl;
    } // ElementsHandler prototype methods


    (function (p) {
      p.initElements = function (options) {
        var ehd = this;
        ehd.setElementReferences(options);
        ehd.setEventListeners(options);
      };

      p.listenForTouchEvents = function () {
        var ehd = this,
            stc = ehd.stc,
            smv = stc.scrollMovement,
            ev = CONSTANTS.EVENTS;
        var touching = false;
        var touchStartX;
        var startingContainerLeftPos;
        var newLeftPos;
        stc.$movableContainer.on(ev.TOUCH_START, function (e) {
          touching = true;
          startingContainerLeftPos = stc.movableContainerLeftPos;
          touchStartX = e.originalEvent.changedTouches[0].pageX;
        }).on(ev.TOUCH_END, function () {
          touching = false;
        }).on(ev.TOUCH_MOVE, function (e) {
          if (!touching) {
            return;
          }

          var touchPageX = e.originalEvent.changedTouches[0].pageX;
          var diff = touchPageX - touchStartX;

          if (stc.rtl) {
            diff = -diff;
          }

          var minPos;
          newLeftPos = startingContainerLeftPos + diff;

          if (newLeftPos > 0) {
            newLeftPos = 0;
          } else {
            minPos = smv.getMinPos();

            if (newLeftPos < minPos) {
              newLeftPos = minPos;
            }
          }

          stc.movableContainerLeftPos = newLeftPos;
          var leftOrRight = stc.rtl ? 'right' : 'left';
          stc.$movableContainer.css(leftOrRight, smv.getMovableContainerCssLeftVal());
          smv.refreshScrollArrowsDisabledState();
        });
      };

      p.refreshAllElementSizes = function () {
        var ehd = this,
            stc = ehd.stc,
            smv = stc.scrollMovement,
            scrollArrowsWereVisible = stc.scrollArrowsVisible,
            actionsTaken = {
          didScrollToActiveTab: false
        },
            isPerformingSlideAnim = false,
            minPos;
        ehd.setElementWidths();
        ehd.setScrollArrowVisibility(); // this could have been a window resize or the removal of a
        // dynamic tab, so make sure the movable container is positioned
        // correctly because, if it is far to the left and we increased the
        // window width, it's possible that the tabs will be too far left,
        // beyond the min pos.

        if (stc.scrollArrowsVisible) {
          // make sure container not too far left
          minPos = smv.getMinPos();
          isPerformingSlideAnim = smv.scrollToActiveTab({
            isOnWindowResize: true
          });

          if (!isPerformingSlideAnim) {
            smv.refreshScrollArrowsDisabledState();

            if (stc.rtl) {
              if (stc.movableContainerRightPos < minPos) {
                smv.incrementMovableContainerLeft(minPos);
              }
            } else {
              if (stc.movableContainerLeftPos < minPos) {
                smv.incrementMovableContainerRight(minPos);
              }
            }
          }

          actionsTaken.didScrollToActiveTab = true;
        } else if (scrollArrowsWereVisible) {
          // scroll arrows went away after resize, so position movable container at 0
          stc.movableContainerLeftPos = 0;
          smv.slideMovableContainerToLeftPos();
        }

        return actionsTaken;
      };

      p.setElementReferences = function (settings) {
        var ehd = this,
            stc = ehd.stc,
            $tabsContainer = stc.$tabsContainer,
            $leftArrow,
            $rightArrow,
            $leftArrowClickTarget,
            $rightArrowClickTarget;
        stc.isNavPills = false;

        if (stc.rtl) {
          $tabsContainer.addClass(CONSTANTS.CSS_CLASSES.RTL);
        }

        if (stc.usingBootstrap4) {
          $tabsContainer.addClass(CONSTANTS.CSS_CLASSES.BOOTSTRAP4);
        }

        stc.$fixedContainer = $tabsContainer.find('.scrtabs-tabs-fixed-container');
        $leftArrow = stc.$fixedContainer.prev();
        $rightArrow = stc.$fixedContainer.next(); // if we have custom arrow content, we might have a click target defined

        if (settings.leftArrowContent) {
          $leftArrowClickTarget = $leftArrow.find('.' + CONSTANTS.CSS_CLASSES.SCROLL_ARROW_CLICK_TARGET);
        }

        if (settings.rightArrowContent) {
          $rightArrowClickTarget = $rightArrow.find('.' + CONSTANTS.CSS_CLASSES.SCROLL_ARROW_CLICK_TARGET);
        }

        if ($leftArrowClickTarget && $leftArrowClickTarget.length) {
          $leftArrow.addClass(CONSTANTS.CSS_CLASSES.SCROLL_ARROW_WITH_CLICK_TARGET);
        } else {
          $leftArrowClickTarget = $leftArrow;
        }

        if ($rightArrowClickTarget && $rightArrowClickTarget.length) {
          $rightArrow.addClass(CONSTANTS.CSS_CLASSES.SCROLL_ARROW_WITH_CLICK_TARGET);
        } else {
          $rightArrowClickTarget = $rightArrow;
        }

        stc.$movableContainer = $tabsContainer.find('.scrtabs-tabs-movable-container');
        stc.$tabsUl = $tabsContainer.find('.nav-tabs'); // check for pills

        if (!stc.$tabsUl.length) {
          stc.$tabsUl = $tabsContainer.find('.nav-pills');

          if (stc.$tabsUl.length) {
            stc.isNavPills = true;
          }
        }

        stc.$tabsLiCollection = stc.$tabsUl.find('> li');
        stc.$slideLeftArrow = stc.reverseScroll ? $leftArrow : $rightArrow;
        stc.$slideLeftArrowClickTarget = stc.reverseScroll ? $leftArrowClickTarget : $rightArrowClickTarget;
        stc.$slideRightArrow = stc.reverseScroll ? $rightArrow : $leftArrow;
        stc.$slideRightArrowClickTarget = stc.reverseScroll ? $rightArrowClickTarget : $leftArrowClickTarget;
        stc.$scrollArrows = stc.$slideLeftArrow.add(stc.$slideRightArrow);
        stc.$win = $(window);
      };

      p.setElementWidths = function () {
        var ehd = this,
            stc = ehd.stc;
        stc.winWidth = stc.$win.width();
        stc.scrollArrowsCombinedWidth = stc.$slideLeftArrow.outerWidth() + stc.$slideRightArrow.outerWidth();
        ehd.setFixedContainerWidth();
        ehd.setMovableContainerWidth();
      };

      p.setEventListeners = function (settings) {
        var ehd = this,
            stc = ehd.stc,
            evh = stc.eventHandlers,
            ev = CONSTANTS.EVENTS,
            resizeEventName = ev.WINDOW_RESIZE + stc.instanceId;

        if (settings.enableSwiping) {
          ehd.listenForTouchEvents();
        }

        stc.$slideLeftArrowClickTarget.off('.scrtabs').on(ev.MOUSEDOWN, function (e) {
          evh.handleMousedownOnSlideMovContainerLeftArrow.call(evh, e);
        }).on(ev.MOUSEUP, function (e) {
          evh.handleMouseupOnSlideMovContainerLeftArrow.call(evh, e);
        }).on(ev.CLICK, function (e) {
          evh.handleClickOnSlideMovContainerLeftArrow.call(evh, e);
        });
        stc.$slideRightArrowClickTarget.off('.scrtabs').on(ev.MOUSEDOWN, function (e) {
          evh.handleMousedownOnSlideMovContainerRightArrow.call(evh, e);
        }).on(ev.MOUSEUP, function (e) {
          evh.handleMouseupOnSlideMovContainerRightArrow.call(evh, e);
        }).on(ev.CLICK, function (e) {
          evh.handleClickOnSlideMovContainerRightArrow.call(evh, e);
        });

        if (stc.tabClickHandler) {
          stc.$tabsLiCollection.find('a[data-toggle="tab"]').off(ev.CLICK).on(ev.CLICK, stc.tabClickHandler);
        }

        if (settings.handleDelayedScrollbar) {
          ehd.listenForDelayedScrollbar();
        }

        stc.$win.off(resizeEventName).smartresizeScrtabs(function (e) {
          evh.handleWindowResize.call(evh, e);
        }, resizeEventName);
        $('body').on(CONSTANTS.EVENTS.FORCE_REFRESH, stc.elementsHandler.refreshAllElementSizes.bind(stc.elementsHandler));
      };

      p.listenForDelayedScrollbar = function () {
        var iframe = document.createElement('iframe');
        iframe.id = "scrtabs-scrollbar-resize-listener";
        iframe.style.cssText = 'height: 0; background-color: transparent; margin: 0; padding: 0; overflow: hidden; border-width: 0; position: absolute; width: 100%;';

        iframe.onload = function () {
          var timeout;

          function handleResize() {
            try {
              $(window).trigger('resize');
              timeout = null;
            } catch (e) {}
          }

          iframe.contentWindow.addEventListener('resize', function () {
            if (timeout) {
              clearTimeout(timeout);
            }

            timeout = setTimeout(handleResize, 100);
          });
        };

        document.body.appendChild(iframe);
      };

      p.setFixedContainerWidth = function () {
        var ehd = this,
            stc = ehd.stc,
            tabsContainerRect = stc.$tabsContainer.get(0).getBoundingClientRect();
        /**
         * @author poletaew
         * It solves problem with rounding by jQuery.outerWidth
         * If we have real width 100.5 px, jQuery.outerWidth returns us 101 px and we get layout's fail
         */

        stc.fixedContainerWidth = tabsContainerRect.width || tabsContainerRect.right - tabsContainerRect.left;
        stc.fixedContainerWidth = stc.fixedContainerWidth * stc.widthMultiplier;
        stc.$fixedContainer.width(stc.fixedContainerWidth);
      };

      p.setFixedContainerWidthForHiddenScrollArrows = function () {
        var ehd = this,
            stc = ehd.stc;
        stc.$fixedContainer.width(stc.fixedContainerWidth);
      };

      p.setFixedContainerWidthForVisibleScrollArrows = function () {
        var ehd = this,
            stc = ehd.stc;
        stc.$fixedContainer.width(stc.fixedContainerWidth - stc.scrollArrowsCombinedWidth);
      };

      p.setMovableContainerWidth = function () {
        var ehd = this,
            stc = ehd.stc,
            $tabLi = stc.$tabsUl.find('> li');
        stc.movableContainerWidth = 0;

        if ($tabLi.length) {
          $tabLi.each(function () {
            var $li = $(this),
                totalMargin = 0;

            if (stc.isNavPills) {
              // pills have a margin-left, tabs have no margin
              totalMargin = parseInt($li.css('margin-left'), 10) + parseInt($li.css('margin-right'), 10);
            }

            stc.movableContainerWidth += $li.outerWidth() + totalMargin;
          });
          stc.movableContainerWidth += 1; // if the tabs don't span the width of the page, force the
          // movable container width to full page width so the bottom
          // border spans the page width instead of just spanning the
          // width of the tabs

          if (stc.movableContainerWidth < stc.fixedContainerWidth) {
            stc.movableContainerWidth = stc.fixedContainerWidth;
          }
        }

        stc.$movableContainer.width(stc.movableContainerWidth);
      };

      p.setScrollArrowVisibility = function () {
        var ehd = this,
            stc = ehd.stc,
            shouldBeVisible = stc.movableContainerWidth > stc.fixedContainerWidth;

        if (shouldBeVisible && !stc.scrollArrowsVisible) {
          stc.$scrollArrows.show();
          stc.scrollArrowsVisible = true;
        } else if (!shouldBeVisible && stc.scrollArrowsVisible) {
          stc.$scrollArrows.hide();
          stc.scrollArrowsVisible = false;
        }

        if (stc.scrollArrowsVisible) {
          ehd.setFixedContainerWidthForVisibleScrollArrows();
        } else {
          ehd.setFixedContainerWidthForHiddenScrollArrows();
        }
      };
    })(ElementsHandler.prototype);
    /* ***********************************************************************************
     * EventHandlers - Class that each instance of ScrollingTabsControl will instantiate
     * **********************************************************************************/


    function EventHandlers(scrollingTabsControl) {
      var evh = this;
      evh.stc = scrollingTabsControl;
    } // prototype methods


    (function (p) {
      p.handleClickOnSlideMovContainerLeftArrow = function () {
        var evh = this,
            stc = evh.stc;
        stc.scrollMovement.incrementMovableContainerLeft();
      };

      p.handleClickOnSlideMovContainerRightArrow = function () {
        var evh = this,
            stc = evh.stc;
        stc.scrollMovement.incrementMovableContainerRight();
      };

      p.handleMousedownOnSlideMovContainerLeftArrow = function () {
        var evh = this,
            stc = evh.stc;
        stc.$slideLeftArrowClickTarget.data(CONSTANTS.DATA_KEY_IS_MOUSEDOWN, true);
        stc.scrollMovement.continueSlideMovableContainerLeft();
      };

      p.handleMousedownOnSlideMovContainerRightArrow = function () {
        var evh = this,
            stc = evh.stc;
        stc.$slideRightArrowClickTarget.data(CONSTANTS.DATA_KEY_IS_MOUSEDOWN, true);
        stc.scrollMovement.continueSlideMovableContainerRight();
      };

      p.handleMouseupOnSlideMovContainerLeftArrow = function () {
        var evh = this,
            stc = evh.stc;
        stc.$slideLeftArrowClickTarget.data(CONSTANTS.DATA_KEY_IS_MOUSEDOWN, false);
      };

      p.handleMouseupOnSlideMovContainerRightArrow = function () {
        var evh = this,
            stc = evh.stc;
        stc.$slideRightArrowClickTarget.data(CONSTANTS.DATA_KEY_IS_MOUSEDOWN, false);
      };

      p.handleWindowResize = function () {
        var evh = this,
            stc = evh.stc,
            newWinWidth = stc.$win.width();

        if (newWinWidth === stc.winWidth) {
          return false;
        }

        stc.winWidth = newWinWidth;
        stc.elementsHandler.refreshAllElementSizes();
      };
    })(EventHandlers.prototype);
    /* ***********************************************************************************
     * ScrollMovement - Class that each instance of ScrollingTabsControl will instantiate
     * **********************************************************************************/


    function ScrollMovement(scrollingTabsControl) {
      var smv = this;
      smv.stc = scrollingTabsControl;
    } // prototype methods


    (function (p) {
      p.continueSlideMovableContainerLeft = function () {
        var smv = this,
            stc = smv.stc;
        setTimeout(function () {
          if (stc.movableContainerLeftPos <= smv.getMinPos() || !stc.$slideLeftArrowClickTarget.data(CONSTANTS.DATA_KEY_IS_MOUSEDOWN)) {
            return;
          }

          if (!smv.incrementMovableContainerLeft()) {
            // haven't reached max left
            smv.continueSlideMovableContainerLeft();
          }
        }, CONSTANTS.CONTINUOUS_SCROLLING_TIMEOUT_INTERVAL);
      };

      p.continueSlideMovableContainerRight = function () {
        var smv = this,
            stc = smv.stc;
        setTimeout(function () {
          if (stc.movableContainerLeftPos >= 0 || !stc.$slideRightArrowClickTarget.data(CONSTANTS.DATA_KEY_IS_MOUSEDOWN)) {
            return;
          }

          if (!smv.incrementMovableContainerRight()) {
            // haven't reached max right
            smv.continueSlideMovableContainerRight();
          }
        }, CONSTANTS.CONTINUOUS_SCROLLING_TIMEOUT_INTERVAL);
      };

      p.decrementMovableContainerLeftPos = function (minPos) {
        var smv = this,
            stc = smv.stc;
        stc.movableContainerLeftPos -= stc.fixedContainerWidth / CONSTANTS.SCROLL_OFFSET_FRACTION;

        if (stc.movableContainerLeftPos < minPos) {
          stc.movableContainerLeftPos = minPos;
        } else if (stc.scrollToTabEdge) {
          smv.setMovableContainerLeftPosToTabEdge(CONSTANTS.SLIDE_DIRECTION.LEFT);

          if (stc.movableContainerLeftPos < minPos) {
            stc.movableContainerLeftPos = minPos;
          }
        }
      };

      p.disableSlideLeftArrow = function () {
        var smv = this,
            stc = smv.stc;

        if (!stc.disableScrollArrowsOnFullyScrolled || !stc.scrollArrowsVisible) {
          return;
        }

        stc.$slideLeftArrow.addClass(CONSTANTS.CSS_CLASSES.SCROLL_ARROW_DISABLE);
      };

      p.disableSlideRightArrow = function () {
        var smv = this,
            stc = smv.stc;

        if (!stc.disableScrollArrowsOnFullyScrolled || !stc.scrollArrowsVisible) {
          return;
        }

        stc.$slideRightArrow.addClass(CONSTANTS.CSS_CLASSES.SCROLL_ARROW_DISABLE);
      };

      p.enableSlideLeftArrow = function () {
        var smv = this,
            stc = smv.stc;

        if (!stc.disableScrollArrowsOnFullyScrolled || !stc.scrollArrowsVisible) {
          return;
        }

        stc.$slideLeftArrow.removeClass(CONSTANTS.CSS_CLASSES.SCROLL_ARROW_DISABLE);
      };

      p.enableSlideRightArrow = function () {
        var smv = this,
            stc = smv.stc;

        if (!stc.disableScrollArrowsOnFullyScrolled || !stc.scrollArrowsVisible) {
          return;
        }

        stc.$slideRightArrow.removeClass(CONSTANTS.CSS_CLASSES.SCROLL_ARROW_DISABLE);
      };

      p.getMinPos = function () {
        var smv = this,
            stc = smv.stc;
        return stc.scrollArrowsVisible ? stc.fixedContainerWidth - stc.movableContainerWidth - stc.scrollArrowsCombinedWidth : 0;
      };

      p.getMovableContainerCssLeftVal = function () {
        var smv = this,
            stc = smv.stc;
        return stc.movableContainerLeftPos === 0 ? '0' : stc.movableContainerLeftPos + 'px';
      };

      p.incrementMovableContainerLeft = function () {
        var smv = this,
            stc = smv.stc,
            minPos = smv.getMinPos();
        smv.decrementMovableContainerLeftPos(minPos);
        smv.slideMovableContainerToLeftPos();
        smv.enableSlideRightArrow(); // return true if we're fully left, false otherwise

        return stc.movableContainerLeftPos === minPos;
      };

      p.incrementMovableContainerRight = function (minPos) {
        var smv = this,
            stc = smv.stc; // if minPos passed in, the movable container was beyond the minPos

        if (minPos) {
          stc.movableContainerLeftPos = minPos;
        } else {
          stc.movableContainerLeftPos += stc.fixedContainerWidth / CONSTANTS.SCROLL_OFFSET_FRACTION;

          if (stc.movableContainerLeftPos > 0) {
            stc.movableContainerLeftPos = 0;
          } else if (stc.scrollToTabEdge) {
            smv.setMovableContainerLeftPosToTabEdge(CONSTANTS.SLIDE_DIRECTION.RIGHT);
          }
        }

        smv.slideMovableContainerToLeftPos();
        smv.enableSlideLeftArrow(); // return true if we're fully right, false otherwise
        // left pos of 0 is the movable container's max position (farthest right)

        return stc.movableContainerLeftPos === 0;
      };

      p.refreshScrollArrowsDisabledState = function () {
        var smv = this,
            stc = smv.stc;

        if (!stc.disableScrollArrowsOnFullyScrolled || !stc.scrollArrowsVisible) {
          return;
        }

        if (stc.movableContainerLeftPos >= 0) {
          // movable container fully right
          smv.disableSlideRightArrow();
          smv.enableSlideLeftArrow();
          return;
        }

        if (stc.movableContainerLeftPos <= smv.getMinPos()) {
          // fully left
          smv.disableSlideLeftArrow();
          smv.enableSlideRightArrow();
          return;
        }

        smv.enableSlideLeftArrow();
        smv.enableSlideRightArrow();
      };

      p.scrollToActiveTab = function () {
        var smv = this,
            stc = smv.stc,
            $activeTab,
            $activeTabAnchor,
            activeTabLeftPos,
            activeTabRightPos,
            rightArrowLeftPos,
            activeTabWidth,
            leftPosOffset,
            offsetToMiddle,
            leftScrollArrowWidth,
            rightScrollArrowWidth;

        if (!stc.scrollArrowsVisible) {
          return;
        }

        if (stc.usingBootstrap4) {
          $activeTabAnchor = stc.$tabsUl.find('li > .nav-link.active');

          if ($activeTabAnchor.length) {
            $activeTab = $activeTabAnchor.parent();
          }
        } else {
          $activeTab = stc.$tabsUl.find('li.active');
        }

        if (!$activeTab || !$activeTab.length) {
          return;
        }

        rightScrollArrowWidth = stc.$slideRightArrow.outerWidth();
        activeTabWidth = $activeTab.outerWidth();
        /**
         * @author poletaew
         * We need relative offset (depends on $fixedContainer), don't absolute
         */

        activeTabLeftPos = $activeTab.offset().left - stc.$fixedContainer.offset().left;
        activeTabRightPos = activeTabLeftPos + activeTabWidth;
        rightArrowLeftPos = stc.fixedContainerWidth - rightScrollArrowWidth;

        if (stc.rtl) {
          leftScrollArrowWidth = stc.$slideLeftArrow.outerWidth();

          if (activeTabLeftPos < 0) {
            // active tab off left side
            stc.movableContainerLeftPos += activeTabLeftPos;
            smv.slideMovableContainerToLeftPos();
            return true;
          } else {
            // active tab off right side
            if (activeTabRightPos > rightArrowLeftPos) {
              stc.movableContainerLeftPos += activeTabRightPos - rightArrowLeftPos + 2 * rightScrollArrowWidth;
              smv.slideMovableContainerToLeftPos();
              return true;
            }
          }
        } else {
          if (activeTabRightPos > rightArrowLeftPos) {
            // active tab off right side
            leftPosOffset = activeTabRightPos - rightArrowLeftPos + rightScrollArrowWidth;
            offsetToMiddle = stc.fixedContainerWidth / 2;
            leftPosOffset += offsetToMiddle - activeTabWidth / 2;
            stc.movableContainerLeftPos -= leftPosOffset;
            smv.slideMovableContainerToLeftPos();
            return true;
          } else {
            leftScrollArrowWidth = stc.$slideLeftArrow.outerWidth();

            if (activeTabLeftPos < 0) {
              // active tab off left side
              offsetToMiddle = stc.fixedContainerWidth / 2;
              stc.movableContainerLeftPos += -activeTabLeftPos + offsetToMiddle - activeTabWidth / 2;
              smv.slideMovableContainerToLeftPos();
              return true;
            }
          }
        }

        return false;
      };

      p.setMovableContainerLeftPosToTabEdge = function (slideDirection) {
        var smv = this,
            stc = smv.stc,
            offscreenWidth = -stc.movableContainerLeftPos,
            totalTabWidth = 0; // make sure LeftPos is set so that a tab edge will be against the
        // left scroll arrow so we won't have a partial, cut-off tab

        stc.$tabsLiCollection.each(function () {
          var tabWidth = $(this).width();
          totalTabWidth += tabWidth;

          if (totalTabWidth > offscreenWidth) {
            stc.movableContainerLeftPos = slideDirection === CONSTANTS.SLIDE_DIRECTION.RIGHT ? -(totalTabWidth - tabWidth) : -totalTabWidth;
            return false; // exit .each() loop
          }
        });
      };

      p.slideMovableContainerToLeftPos = function () {
        var smv = this,
            stc = smv.stc,
            minPos = smv.getMinPos(),
            leftOrRightVal;

        if (stc.movableContainerLeftPos > 0) {
          stc.movableContainerLeftPos = 0;
        } else if (stc.movableContainerLeftPos < minPos) {
          stc.movableContainerLeftPos = minPos;
        }

        stc.movableContainerLeftPos = stc.movableContainerLeftPos / 1;
        leftOrRightVal = smv.getMovableContainerCssLeftVal();
        smv.performingSlideAnim = true;
        var targetPos = stc.rtl ? {
          right: leftOrRightVal
        } : {
          left: leftOrRightVal
        };
        stc.$movableContainer.stop().animate(targetPos, 'slow', function __slideAnimComplete() {
          var newMinPos = smv.getMinPos();
          smv.performingSlideAnim = false; // if we slid past the min pos--which can happen if you resize the window
          // quickly--move back into position

          if (stc.movableContainerLeftPos < newMinPos) {
            smv.decrementMovableContainerLeftPos(newMinPos);
            targetPos = stc.rtl ? {
              right: smv.getMovableContainerCssLeftVal()
            } : {
              left: smv.getMovableContainerCssLeftVal()
            };
            stc.$movableContainer.stop().animate(targetPos, 'fast', function () {
              smv.refreshScrollArrowsDisabledState();
            });
          } else {
            smv.refreshScrollArrowsDisabledState();
          }
        });
      };
    })(ScrollMovement.prototype);
    /* **********************************************************************
     * ScrollingTabsControl - Class that each directive will instantiate
     * **********************************************************************/


    function ScrollingTabsControl($tabsContainer) {
      var stc = this;
      stc.$tabsContainer = $tabsContainer;
      stc.instanceId = $.fn.scrollingTabs.nextInstanceId++;
      stc.movableContainerLeftPos = 0;
      stc.scrollArrowsVisible = false;
      stc.scrollToTabEdge = false;
      stc.disableScrollArrowsOnFullyScrolled = false;
      stc.reverseScroll = false;
      stc.widthMultiplier = 1;
      stc.scrollMovement = new ScrollMovement(stc);
      stc.eventHandlers = new EventHandlers(stc);
      stc.elementsHandler = new ElementsHandler(stc);
    } // prototype methods


    (function (p) {
      p.initTabs = function (options, $scroller, readyCallback, attachTabContentToDomCallback) {
        var stc = this,
            elementsHandler = stc.elementsHandler,
            num;

        if (options.enableRtlSupport && $('html').attr('dir') === 'rtl') {
          stc.rtl = true;
        }

        if (options.scrollToTabEdge) {
          stc.scrollToTabEdge = true;
        }

        if (options.disableScrollArrowsOnFullyScrolled) {
          stc.disableScrollArrowsOnFullyScrolled = true;
        }

        if (options.reverseScroll) {
          stc.reverseScroll = true;
        }

        if (options.widthMultiplier !== 1) {
          num = Number(options.widthMultiplier); // handle string value

          if (!isNaN(num)) {
            stc.widthMultiplier = num;
          }
        }

        if (options.bootstrapVersion.toString().charAt(0) === '4') {
          stc.usingBootstrap4 = true;
        }

        setTimeout(initTabsAfterTimeout, 100);

        function initTabsAfterTimeout() {
          var actionsTaken; // if we're just wrapping non-data-driven tabs, the user might
          // have the .nav-tabs hidden to prevent the clunky flash of
          // multi-line tabs on page refresh, so we need to make sure
          // they're visible before trying to wrap them

          $scroller.find('.nav-tabs').show();
          elementsHandler.initElements(options);
          actionsTaken = elementsHandler.refreshAllElementSizes();
          $scroller.css('visibility', 'visible');

          if (attachTabContentToDomCallback) {
            attachTabContentToDomCallback();
          }

          if (readyCallback) {
            readyCallback();
          }
        }
      };

      p.scrollToActiveTab = function (options) {
        var stc = this,
            smv = stc.scrollMovement;
        smv.scrollToActiveTab(options);
      };
    })(ScrollingTabsControl.prototype);
    /* exported buildNavTabsAndTabContentForTargetElementInstance */


    var tabElements = function () {
      return {
        getElTabPaneForLi: getElTabPaneForLi,
        getNewElNavTabs: getNewElNavTabs,
        getNewElScrollerElementWrappingNavTabsInstance: getNewElScrollerElementWrappingNavTabsInstance,
        getNewElTabAnchor: getNewElTabAnchor,
        getNewElTabContent: getNewElTabContent,
        getNewElTabLi: getNewElTabLi,
        getNewElTabPane: getNewElTabPane
      }; ///////////////////
      // ---- retrieve existing elements from the DOM ----------

      function getElTabPaneForLi($li) {
        return $($li.find('a').attr('href'));
      } // ---- create new elements ----------


      function getNewElNavTabs() {
        return $('<ul class="nav nav-tabs" role="tablist"></ul>');
      }

      function getNewElScrollerElementWrappingNavTabsInstance($navTabsInstance, settings) {
        var $tabsContainer = $('<div class="scrtabs-tab-container"></div>'),
            leftArrowContent = settings.leftArrowContent || '<div class="scrtabs-tab-scroll-arrow scrtabs-tab-scroll-arrow-left"><span class="' + settings.cssClassLeftArrow + '"></span></div>',
            $leftArrow = $(leftArrowContent),
            rightArrowContent = settings.rightArrowContent || '<div class="scrtabs-tab-scroll-arrow scrtabs-tab-scroll-arrow-right"><span class="' + settings.cssClassRightArrow + '"></span></div>',
            $rightArrow = $(rightArrowContent),
            $fixedContainer = $('<div class="scrtabs-tabs-fixed-container"></div>'),
            $movableContainer = $('<div class="scrtabs-tabs-movable-container"></div>');

        if (settings.disableScrollArrowsOnFullyScrolled) {
          $leftArrow.add($rightArrow).addClass(CONSTANTS.CSS_CLASSES.SCROLL_ARROW_DISABLE);
        }

        return $tabsContainer.append($leftArrow, $fixedContainer.append($movableContainer.append($navTabsInstance)), $rightArrow);
      }

      function getNewElTabAnchor(tab, propNames) {
        return $('<a role="tab" data-toggle="tab"></a>').attr('href', '#' + tab[propNames.paneId]).html(tab[propNames.title]);
      }

      function getNewElTabContent() {
        return $('<div class="tab-content"></div>');
      }

      function getNewElTabLi(tab, propNames, options) {
        var liContent = options.tabLiContent || '<li role="presentation" class=""></li>',
            $li = $(liContent),
            $a = getNewElTabAnchor(tab, propNames).appendTo($li);

        if (tab[propNames.disabled]) {
          $li.addClass('disabled');
          $a.attr('data-toggle', '');
        } else if (options.forceActiveTab && tab[propNames.active]) {
          $li.addClass('active');
        }

        if (options.tabPostProcessor) {
          options.tabPostProcessor($li, $a);
        }

        return $li;
      }

      function getNewElTabPane(tab, propNames, options) {
        var $pane = $('<div role="tabpanel" class="tab-pane"></div>').attr('id', tab[propNames.paneId]).html(tab[propNames.content]);

        if (options.forceActiveTab && tab[propNames.active]) {
          $pane.addClass('active');
        }

        return $pane;
      }
    }(); // tabElements


    var tabUtils = function () {
      return {
        didTabOrderChange: didTabOrderChange,
        getIndexOfClosestEnabledTab: getIndexOfClosestEnabledTab,
        getTabIndexByPaneId: getTabIndexByPaneId,
        storeDataOnLiEl: storeDataOnLiEl
      }; ///////////////////

      function didTabOrderChange($currTabLis, updatedTabs, propNames) {
        var isTabOrderChanged = false;
        $currTabLis.each(function (currDomIdx) {
          var newIdx = getTabIndexByPaneId(updatedTabs, propNames.paneId, $(this).data('tab')[propNames.paneId]);

          if (newIdx > -1 && newIdx !== currDomIdx) {
            // tab moved
            isTabOrderChanged = true;
            return false; // exit .each() loop
          }
        });
        return isTabOrderChanged;
      }

      function getIndexOfClosestEnabledTab($currTabLis, startIndex) {
        var lastIndex = $currTabLis.length - 1,
            closestIdx = -1,
            incrementFromStartIndex = 0,
            testIdx = 0; // expand out from the current tab looking for an enabled tab;
        // we prefer the tab after us over the tab before

        while (closestIdx === -1 && testIdx >= 0) {
          if ((testIdx = startIndex + ++incrementFromStartIndex) <= lastIndex && !$currTabLis.eq(testIdx).hasClass('disabled') || (testIdx = startIndex - incrementFromStartIndex) >= 0 && !$currTabLis.eq(testIdx).hasClass('disabled')) {
            closestIdx = testIdx;
          }
        }

        return closestIdx;
      }

      function getTabIndexByPaneId(tabs, paneIdPropName, paneId) {
        var idx = -1;
        tabs.some(function (tab, i) {
          if (tab[paneIdPropName] === paneId) {
            idx = i;
            return true; // exit loop
          }
        });
        return idx;
      }

      function storeDataOnLiEl($li, tabs, index) {
        $li.data({
          tab: $.extend({}, tabs[index]),
          // store a clone so we can check for changes
          index: index
        });
      }
    }(); // tabUtils


    function buildNavTabsAndTabContentForTargetElementInstance($targetElInstance, settings, readyCallback) {
      var tabs = settings.tabs,
          propNames = {
        paneId: settings.propPaneId,
        title: settings.propTitle,
        active: settings.propActive,
        disabled: settings.propDisabled,
        content: settings.propContent
      },
          ignoreTabPanes = settings.ignoreTabPanes,
          hasTabContent = tabs.length && tabs[0][propNames.content] !== undefined,
          $navTabs = tabElements.getNewElNavTabs(),
          $tabContent = tabElements.getNewElTabContent(),
          $scroller,
          attachTabContentToDomCallback = ignoreTabPanes ? null : function () {
        $scroller.after($tabContent);
      };

      if (!tabs.length) {
        return;
      }

      tabs.forEach(function (tab, index) {
        var options = {
          forceActiveTab: true,
          tabLiContent: settings.tabsLiContent && settings.tabsLiContent[index],
          tabPostProcessor: settings.tabsPostProcessors && settings.tabsPostProcessors[index]
        };
        tabElements.getNewElTabLi(tab, propNames, options).appendTo($navTabs); // build the tab panes if we weren't told to ignore them and there's
        // tab content data available

        if (!ignoreTabPanes && hasTabContent) {
          tabElements.getNewElTabPane(tab, propNames, options).appendTo($tabContent);
        }
      });
      $scroller = wrapNavTabsInstanceInScroller($navTabs, settings, readyCallback, attachTabContentToDomCallback);
      $scroller.appendTo($targetElInstance);
      $targetElInstance.data({
        scrtabs: {
          tabs: tabs,
          propNames: propNames,
          ignoreTabPanes: ignoreTabPanes,
          hasTabContent: hasTabContent,
          tabsLiContent: settings.tabsLiContent,
          tabsPostProcessors: settings.tabsPostProcessors,
          scroller: $scroller
        }
      }); // once the nav-tabs are wrapped in the scroller, attach each tab's
      // data to it for reference later; we need to wait till they're
      // wrapped in the scroller because we wrap a *clone* of the nav-tabs
      // we built above, not the original nav-tabs

      $scroller.find('.nav-tabs > li').each(function (index) {
        tabUtils.storeDataOnLiEl($(this), tabs, index);
      });
      return $targetElInstance;
    }

    function wrapNavTabsInstanceInScroller($navTabsInstance, settings, readyCallback, attachTabContentToDomCallback) {
      // Remove tab data stored by Bootstrap in order to fix tabs that were already visited
      $navTabsInstance.find('a[data-toggle="tab"]').removeData(CONSTANTS.DATA_KEY_BOOTSTRAP_TAB);
      var $scroller = tabElements.getNewElScrollerElementWrappingNavTabsInstance($navTabsInstance.clone(true), settings),
          // use clone because we replaceWith later
      scrollingTabsControl = new ScrollingTabsControl($scroller),
          navTabsInstanceData = $navTabsInstance.data('scrtabs');

      if (!navTabsInstanceData) {
        $navTabsInstance.data('scrtabs', {
          scroller: $scroller
        });
      } else {
        navTabsInstanceData.scroller = $scroller;
      }

      $navTabsInstance.replaceWith($scroller.css('visibility', 'hidden'));

      if (settings.tabClickHandler && typeof settings.tabClickHandler === 'function') {
        $scroller.hasTabClickHandler = true;
        scrollingTabsControl.tabClickHandler = settings.tabClickHandler;
      }

      $scroller.initTabs = function () {
        scrollingTabsControl.initTabs(settings, $scroller, readyCallback, attachTabContentToDomCallback);
      };

      $scroller.scrollToActiveTab = function () {
        scrollingTabsControl.scrollToActiveTab(settings);
      };

      $scroller.initTabs();
      listenForDropdownMenuTabs($scroller, scrollingTabsControl);
      return $scroller;
    }
    /* exported listenForDropdownMenuTabs,
                refreshTargetElementInstance,
                scrollToActiveTab */


    function checkForTabAdded(refreshData) {
      var updatedTabsArray = refreshData.updatedTabsArray,
          updatedTabsLiContent = refreshData.updatedTabsLiContent || [],
          updatedTabsPostProcessors = refreshData.updatedTabsPostProcessors || [],
          propNames = refreshData.propNames,
          ignoreTabPanes = refreshData.ignoreTabPanes,
          options = refreshData.options,
          $currTabLis = refreshData.$currTabLis,
          $navTabs = refreshData.$navTabs,
          $currTabContentPanesContainer = ignoreTabPanes ? null : refreshData.$currTabContentPanesContainer,
          $currTabContentPanes = ignoreTabPanes ? null : refreshData.$currTabContentPanes,
          isInitTabsRequired = false; // make sure each tab in the updated tabs array has a corresponding DOM element

      updatedTabsArray.forEach(function (tab, idx) {
        var $li = $currTabLis.find('a[href="#' + tab[propNames.paneId] + '"]'),
            isTabIdxPastCurrTabs = idx >= $currTabLis.length,
            $pane;

        if (!$li.length) {
          // new tab
          isInitTabsRequired = true; // add the tab, add its pane (if necessary), and refresh the scroller

          options.tabLiContent = updatedTabsLiContent[idx];
          options.tabPostProcessor = updatedTabsPostProcessors[idx];
          $li = tabElements.getNewElTabLi(tab, propNames, options);
          tabUtils.storeDataOnLiEl($li, updatedTabsArray, idx);

          if (isTabIdxPastCurrTabs) {
            // append to end of current tabs
            $li.appendTo($navTabs);
          } else {
            // insert in middle of current tabs
            $li.insertBefore($currTabLis.eq(idx));
          }

          if (!ignoreTabPanes && tab[propNames.content] !== undefined) {
            $pane = tabElements.getNewElTabPane(tab, propNames, options);

            if (isTabIdxPastCurrTabs) {
              // append to end of current tabs
              $pane.appendTo($currTabContentPanesContainer);
            } else {
              // insert in middle of current tabs
              $pane.insertBefore($currTabContentPanes.eq(idx));
            }
          }
        }
      });
      return isInitTabsRequired;
    }

    function checkForTabPropertiesUpdated(refreshData) {
      var tabLiData = refreshData.tabLi,
          ignoreTabPanes = refreshData.ignoreTabPanes,
          $li = tabLiData.$li,
          $contentPane = tabLiData.$contentPane,
          origTabData = tabLiData.origTabData,
          newTabData = tabLiData.newTabData,
          propNames = refreshData.propNames,
          isInitTabsRequired = false; // update tab title if necessary

      if (origTabData[propNames.title] !== newTabData[propNames.title]) {
        $li.find('a[role="tab"]').html(origTabData[propNames.title] = newTabData[propNames.title]);
        isInitTabsRequired = true;
      } // update tab disabled state if necessary


      if (origTabData[propNames.disabled] !== newTabData[propNames.disabled]) {
        if (newTabData[propNames.disabled]) {
          // enabled -> disabled
          $li.addClass('disabled');
          $li.find('a[role="tab"]').attr('data-toggle', '');
        } else {
          // disabled -> enabled
          $li.removeClass('disabled');
          $li.find('a[role="tab"]').attr('data-toggle', 'tab');
        }

        origTabData[propNames.disabled] = newTabData[propNames.disabled];
        isInitTabsRequired = true;
      } // update tab active state if necessary


      if (refreshData.options.forceActiveTab) {
        // set the active tab based on the tabs array regardless of the current
        // DOM state, which could have been changed by the user clicking a tab
        // without those changes being reflected back to the tab data
        $li[newTabData[propNames.active] ? 'addClass' : 'removeClass']('active');
        $contentPane[newTabData[propNames.active] ? 'addClass' : 'removeClass']('active');
        origTabData[propNames.active] = newTabData[propNames.active];
        isInitTabsRequired = true;
      } // update tab content pane if necessary


      if (!ignoreTabPanes && origTabData[propNames.content] !== newTabData[propNames.content]) {
        $contentPane.html(origTabData[propNames.content] = newTabData[propNames.content]);
        isInitTabsRequired = true;
      }

      return isInitTabsRequired;
    }

    function checkForTabRemoved(refreshData) {
      var tabLiData = refreshData.tabLi,
          ignoreTabPanes = refreshData.ignoreTabPanes,
          $li = tabLiData.$li,
          idxToMakeActive;

      if (tabLiData.newIdx !== -1) {
        // tab was not removed--it has a valid index
        return false;
      } // if this was the active tab, make the closest enabled tab active


      if ($li.hasClass('active')) {
        idxToMakeActive = tabUtils.getIndexOfClosestEnabledTab(refreshData.$currTabLis, tabLiData.currDomIdx);

        if (idxToMakeActive > -1) {
          refreshData.$currTabLis.eq(idxToMakeActive).addClass('active');

          if (!ignoreTabPanes) {
            refreshData.$currTabContentPanes.eq(idxToMakeActive).addClass('active');
          }
        }
      }

      $li.remove();

      if (!ignoreTabPanes) {
        tabLiData.$contentPane.remove();
      }

      return true;
    }

    function checkForTabsOrderChanged(refreshData) {
      var $currTabLis = refreshData.$currTabLis,
          updatedTabsArray = refreshData.updatedTabsArray,
          propNames = refreshData.propNames,
          ignoreTabPanes = refreshData.ignoreTabPanes,
          newTabsCollection = [],
          newTabPanesCollection = ignoreTabPanes ? null : [];

      if (!tabUtils.didTabOrderChange($currTabLis, updatedTabsArray, propNames)) {
        return false;
      } // the tab order changed...


      updatedTabsArray.forEach(function (t) {
        var paneId = t[propNames.paneId];
        newTabsCollection.push($currTabLis.find('a[role="tab"][href="#' + paneId + '"]').parent('li'));

        if (!ignoreTabPanes) {
          newTabPanesCollection.push($('#' + paneId));
        }
      });
      refreshData.$navTabs.append(newTabsCollection);

      if (!ignoreTabPanes) {
        refreshData.$currTabContentPanesContainer.append(newTabPanesCollection);
      }

      return true;
    }

    function checkForTabsRemovedOrUpdated(refreshData) {
      var $currTabLis = refreshData.$currTabLis,
          updatedTabsArray = refreshData.updatedTabsArray,
          propNames = refreshData.propNames,
          isInitTabsRequired = false;
      $currTabLis.each(function (currDomIdx) {
        var $li = $(this),
            origTabData = $li.data('tab'),
            newIdx = tabUtils.getTabIndexByPaneId(updatedTabsArray, propNames.paneId, origTabData[propNames.paneId]),
            newTabData = newIdx > -1 ? updatedTabsArray[newIdx] : null;
        refreshData.tabLi = {
          $li: $li,
          currDomIdx: currDomIdx,
          newIdx: newIdx,
          $contentPane: tabElements.getElTabPaneForLi($li),
          origTabData: origTabData,
          newTabData: newTabData
        };

        if (checkForTabRemoved(refreshData)) {
          isInitTabsRequired = true;
          return; // continue to next $li in .each() since we removed this tab
        }

        if (checkForTabPropertiesUpdated(refreshData)) {
          isInitTabsRequired = true;
        }
      });
      return isInitTabsRequired;
    }

    function listenForDropdownMenuTabs($scroller, stc) {
      var $ddMenu; // for dropdown menus to show, we need to move them out of the
      // scroller and append them to the body

      $scroller.on(CONSTANTS.EVENTS.DROPDOWN_MENU_SHOW, handleDropdownShow).on(CONSTANTS.EVENTS.DROPDOWN_MENU_HIDE, handleDropdownHide);

      function handleDropdownHide(e) {
        // move the dropdown menu back into its tab
        $(e.target).append($ddMenu.off(CONSTANTS.EVENTS.CLICK));
      }

      function handleDropdownShow(e) {
        var $ddParentTabLi = $(e.target),
            ddLiOffset = $ddParentTabLi.offset(),
            $currActiveTab = $scroller.find('li[role="presentation"].active'),
            ddMenuRightX,
            tabsContainerMaxX,
            ddMenuTargetLeft;
        $ddMenu = $ddParentTabLi.find('.dropdown-menu').attr('data-' + CONSTANTS.DATA_KEY_DDMENU_MODIFIED, true); // if the dropdown's parent tab li isn't already active,
        // we need to deactivate any active menu item in the dropdown

        if ($currActiveTab[0] !== $ddParentTabLi[0]) {
          $ddMenu.find('li.active').removeClass('active');
        } // we need to do our own click handling because the built-in
        // bootstrap handlers won't work since we moved the dropdown
        // menu outside the tabs container


        $ddMenu.on(CONSTANTS.EVENTS.CLICK, 'a[role="tab"]', handleClickOnDropdownMenuItem);
        $('body').append($ddMenu); // make sure the menu doesn't go off the right side of the page

        ddMenuRightX = $ddMenu.width() + ddLiOffset.left;
        tabsContainerMaxX = $scroller.width() - (stc.$slideRightArrow.outerWidth() + 1);
        ddMenuTargetLeft = ddLiOffset.left;

        if (ddMenuRightX > tabsContainerMaxX) {
          ddMenuTargetLeft -= ddMenuRightX - tabsContainerMaxX;
        }

        $ddMenu.css({
          'display': 'block',
          'top': ddLiOffset.top + $ddParentTabLi.outerHeight() - 2,
          'left': ddMenuTargetLeft
        });

        function handleClickOnDropdownMenuItem() {
          /* jshint validthis: true */
          var $selectedMenuItemAnc = $(this),
              $selectedMenuItemLi = $selectedMenuItemAnc.parent('li'),
              $selectedMenuItemDropdownMenu = $selectedMenuItemLi.parent('.dropdown-menu'),
              targetPaneId = $selectedMenuItemAnc.attr('href');

          if ($selectedMenuItemLi.hasClass('active')) {
            return;
          } // once we select a menu item from the dropdown, deactivate
          // the current tab (unless it's our parent tab), deactivate
          // any active dropdown menu item, make our parent tab active
          // (if it's not already), and activate the selected menu item


          $scroller.find('li.active').not($ddParentTabLi).add($selectedMenuItemDropdownMenu.find('li.active')).removeClass('active');
          $ddParentTabLi.add($selectedMenuItemLi).addClass('active'); // manually deactivate current active pane and activate our pane

          $('.tab-content .tab-pane.active').removeClass('active');
          $(targetPaneId).addClass('active');
        }
      }
    }

    function refreshDataDrivenTabs($container, options) {
      var instanceData = $container.data().scrtabs,
          scroller = instanceData.scroller,
          $navTabs = $container.find('.scrtabs-tab-container .nav-tabs'),
          $currTabContentPanesContainer = $container.find('.tab-content'),
          isInitTabsRequired = false,
          refreshData = {
        options: options,
        updatedTabsArray: instanceData.tabs,
        updatedTabsLiContent: instanceData.tabsLiContent,
        updatedTabsPostProcessors: instanceData.tabsPostProcessors,
        propNames: instanceData.propNames,
        ignoreTabPanes: instanceData.ignoreTabPanes,
        $navTabs: $navTabs,
        $currTabLis: $navTabs.find('> li'),
        $currTabContentPanesContainer: $currTabContentPanesContainer,
        $currTabContentPanes: $currTabContentPanesContainer.find('.tab-pane')
      }; // to preserve the tab positions if we're just adding or removing
      // a tab, don't completely rebuild the tab structure, but check
      // for differences between the new tabs array and the old

      if (checkForTabAdded(refreshData)) {
        isInitTabsRequired = true;
      }

      if (checkForTabsOrderChanged(refreshData)) {
        isInitTabsRequired = true;
      }

      if (checkForTabsRemovedOrUpdated(refreshData)) {
        isInitTabsRequired = true;
      }

      if (isInitTabsRequired) {
        scroller.initTabs();
      }

      return isInitTabsRequired;
    }

    function refreshTargetElementInstance($container, options) {
      if (!$container.data('scrtabs')) {
        // target element doesn't have plugin on it
        return;
      } // force a refresh if the tabs are static html or they're data-driven
      // but the data didn't change so we didn't call initTabs()


      if ($container.data('scrtabs').isWrapperOnly || !refreshDataDrivenTabs($container, options)) {
        $('body').trigger(CONSTANTS.EVENTS.FORCE_REFRESH);
      }
    }

    function scrollToActiveTab() {
      /* jshint validthis: true */
      var $targetElInstance = $(this),
          scrtabsData = $targetElInstance.data('scrtabs');

      if (!scrtabsData) {
        return;
      }

      scrtabsData.scroller.scrollToActiveTab();
    }

    var methods = {
      destroy: function () {
        var $targetEls = this;
        return $targetEls.each(destroyPlugin);
      },
      init: function (options) {
        var $targetEls = this,
            targetElsLastIndex = $targetEls.length - 1,
            settings = $.extend({}, $.fn.scrollingTabs.defaults, options || {}); // ---- tabs NOT data-driven -------------------------

        if (!settings.tabs) {
          // just wrap the selected .nav-tabs element(s) in the scroller
          return $targetEls.each(function (index) {
            var dataObj = {
              isWrapperOnly: true
            },
                $targetEl = $(this).data({
              scrtabs: dataObj
            }),
                readyCallback = index < targetElsLastIndex ? null : function () {
              $targetEls.trigger(CONSTANTS.EVENTS.TABS_READY);
            };
            wrapNavTabsInstanceInScroller($targetEl, settings, readyCallback);
          });
        } // ---- tabs data-driven -------------------------


        return $targetEls.each(function (index) {
          var $targetEl = $(this),
              readyCallback = index < targetElsLastIndex ? null : function () {
            $targetEls.trigger(CONSTANTS.EVENTS.TABS_READY);
          };
          buildNavTabsAndTabContentForTargetElementInstance($targetEl, settings, readyCallback);
        });
      },
      refresh: function (options) {
        var $targetEls = this,
            settings = $.extend({}, $.fn.scrollingTabs.defaults, options || {});
        return $targetEls.each(function () {
          refreshTargetElementInstance($(this), settings);
        });
      },
      scrollToActiveTab: function () {
        return this.each(scrollToActiveTab);
      }
    };

    function destroyPlugin() {
      /* jshint validthis: true */
      var $targetElInstance = $(this),
          scrtabsData = $targetElInstance.data('scrtabs'),
          $tabsContainer;

      if (!scrtabsData) {
        return;
      }

      if (scrtabsData.enableSwipingElement === 'self') {
        $targetElInstance.removeClass(CONSTANTS.CSS_CLASSES.ALLOW_SCROLLBAR);
      } else if (scrtabsData.enableSwipingElement === 'parent') {
        $targetElInstance.closest('.scrtabs-tab-container').parent().removeClass(CONSTANTS.CSS_CLASSES.ALLOW_SCROLLBAR);
      }

      scrtabsData.scroller.off(CONSTANTS.EVENTS.DROPDOWN_MENU_SHOW).off(CONSTANTS.EVENTS.DROPDOWN_MENU_HIDE); // if there were any dropdown menus opened, remove the css we added to
      // them so they would display correctly

      scrtabsData.scroller.find('[data-' + CONSTANTS.DATA_KEY_DDMENU_MODIFIED + ']').css({
        display: '',
        left: '',
        top: ''
      }).off(CONSTANTS.EVENTS.CLICK).removeAttr('data-' + CONSTANTS.DATA_KEY_DDMENU_MODIFIED);

      if (scrtabsData.scroller.hasTabClickHandler) {
        $targetElInstance.find('a[data-toggle="tab"]').off('.scrtabs');
      }

      if (scrtabsData.isWrapperOnly) {
        // we just wrapped nav-tabs markup, so restore it
        // $targetElInstance is the ul.nav-tabs
        $tabsContainer = $targetElInstance.parents('.scrtabs-tab-container');

        if ($tabsContainer.length) {
          $tabsContainer.replaceWith($targetElInstance);
        }
      } else {
        // we generated the tabs from data so destroy everything we created
        if (scrtabsData.scroller && scrtabsData.scroller.initTabs) {
          scrtabsData.scroller.initTabs = null;
        } // $targetElInstance is the container for the ul.nav-tabs we generated


        $targetElInstance.find('.scrtabs-tab-container').add('.tab-content').remove();
      }

      $targetElInstance.removeData('scrtabs');

      while (--$.fn.scrollingTabs.nextInstanceId >= 0) {
        $(window).off(CONSTANTS.EVENTS.WINDOW_RESIZE + $.fn.scrollingTabs.nextInstanceId);
      }

      $('body').off(CONSTANTS.EVENTS.FORCE_REFRESH);
    }

    $.fn.scrollingTabs = function (methodOrOptions) {
      if (methods[methodOrOptions]) {
        return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (!methodOrOptions || typeof methodOrOptions === 'object') {
        return methods.init.apply(this, arguments);
      } else {
        $.error('Method ' + methodOrOptions + ' does not exist on $.scrollingTabs.');
      }
    };

    $.fn.scrollingTabs.nextInstanceId = 0;
    $.fn.scrollingTabs.defaults = {
      tabs: null,
      propPaneId: 'paneId',
      propTitle: 'title',
      propActive: 'active',
      propDisabled: 'disabled',
      propContent: 'content',
      ignoreTabPanes: false,
      scrollToTabEdge: false,
      disableScrollArrowsOnFullyScrolled: false,
      forceActiveTab: false,
      reverseScroll: false,
      widthMultiplier: 1,
      tabClickHandler: null,
      cssClassLeftArrow: 'glyphicon glyphicon-chevron-left',
      cssClassRightArrow: 'glyphicon glyphicon-chevron-right',
      leftArrowContent: '',
      rightArrowContent: '',
      tabsLiContent: null,
      tabsPostProcessors: null,
      enableSwiping: false,
      enableRtlSupport: false,
      handleDelayedScrollbar: false,
      bootstrapVersion: 3
    };
  })(jQuery, window);

  $.ui.plugin.add('resizable', 'alsoResizeReverse', {
    start: function () {
      var that = $(this).resizable('instance'),
          o = that.options;
      $(o.alsoResizeReverse).each(function () {
        var el = $(this);
        el.data('ui-resizable-alsoresizeReverse', {
          width: parseInt(el.width(), 10),
          height: parseInt(el.height(), 10),
          left: parseInt(el.css('left'), 10),
          top: parseInt(el.css('top'), 10)
        });
      });
    },
    resize: function (event, ui) {
      var that = $(this).resizable('instance'),
          o = that.options,
          os = that.originalSize,
          op = that.originalPosition,
          delta = {
        height: that.size.height - os.height || 0,
        width: that.size.width - os.width || 0,
        top: that.position.top - op.top || 0,
        left: that.position.left - op.left || 0
      };
      $(o.alsoResizeReverse).each(function () {
        var el = $(this),
            start = $(this).data('ui-resizable-alsoresize-reverse'),
            style = {},
            css = el.parents(ui.originalElement[0]).length ? ['width', 'height'] : ['width', 'height', 'top', 'left'];
        $.each(css, function (i, prop) {
          var sum = (start[prop] || 0) - (delta[prop] || 0);

          if (sum && sum >= 0) {
            style[prop] = sum || null;
          }
        });
        el.css(style);
      });
    },
    stop: function () {
      $(this).removeData('resizable-alsoresize-reverse');
    }
  });

  exports.CardRefresh = CardRefresh;
  exports.CardWidget = CardWidget;
  exports.ControlSidebar = ControlSidebar;
  exports.DirectChat = DirectChat;
  exports.Dropdown = Dropdown;
  exports.ExpandableTable = ExpandableTable;
  exports.Fullscreen = Fullscreen;
  exports.IFrame = IFrame;
  exports.Layout = Layout;
  exports.NavbarSearch = NavbarSearch;
  exports.PushMenu = PushMenu;
  exports.SidebarSearch = SidebarSearch;
  exports.Toasts = Toasts;
  exports.TodoList = TodoList;
  exports.Treeview = Treeview;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=portal.js.map
