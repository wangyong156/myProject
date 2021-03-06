window.a = (function () {
  var X = this;
  X.debug = !1,
    X.code = {
      argument: "301",
      loseSecurityCode: "302",
      unauthorized: "405",
      nameUnsettled: "407",
      notifyInterval: "601",
      schemeError: "700",
      balanceShortage: "800",
      rebate: "801",
      system: "900"
    },
    function() {
      function a(a) {
        return function(b) {
          return Object.prototype.toString.call(b) == "[object " + a + "]"
        }
      }
      var b = a("Object"),
        c = a("String"),
        d = a("Number"),
        e = a("Date"),
        f = Array.isArray || a("Array"),
        g = a("Function"),
        h = a("Undefined"),
        i = function() {
          X.debug && console.log.apply(console, arguments)
        };
      X.log = i,
        X.isObject = b,
        X.isString = c,
        X.isNumber = d,
        X.isDate = e,
        X.isArray = f,
        X.isFunction = g,
        X.isUndefined = h
    } (),
    function() {
      function a() {
        return b().getTime()
      }
      function b(a) {
        return a ? new Date(a) : new Date
      }
      function c(a) {
        return parseInt(a)
      }
      function d(a) {
        return parseFloat(a)
      }
      function e(a) {
        return X.isNumber(a) && Math.round(a) == a
      }
      function f(a) {
        if (!X.isNumber(a)) return a + "";
        for (var b = a < 0 ? "-": "", c = Math.abs(a) + "", d = c.length, e = "", f = 0; d-->0;) f++,
          e = c.charAt(d) + e,
        f % 3 === 0 && 0 !== d && (f = 0, e = "," + e);
        return b + e
      }
      function g(a, b) {
        var c = 0 | a,
          b = b || 2,
          a = a + "",
          d = a.indexOf(".");
        return b < 1 && (b = 2),
        b > 9 && (b = 9),
          d === -1 ? f(c) + "." + "0000000000".substr(0, b) : (a += "0000000000", f(c) + a.substr(d, b + 1))
      }
      function h(a) {
        return (a < 10 ? "0": "") + a
      }
      function i(a, b) {
        b = b || "Y-M-D h:m:s";
        var c, d = new Date,
          e = d.getTimezoneOffset();
        this.isDate(a) && a.getTime ? d = a: this.isNumber(a) && (c = a + 6e4 * (480 + e), d = new Date(c));
        for (var f = b.length,
               g = b,
               i = 0; i < f; i++) switch (b.charAt(i)) {
          case "Y":
            g = g.replace(/Y/g, h(d.getFullYear()));
            break;
          case "y":
            g = g.replace(/y/g, h(d.getFullYear()).substring(2));
            break;
          case "M":
            g = g.replace(/M/g, h(d.getMonth() + 1));
            break;
          case "D":
            g = g.replace(/D/g, h(d.getDate()));
            break;
          case "h":
            g = g.replace(/h/g, h(d.getHours()));
            break;
          case "m":
            g = g.replace(/m/g, h(d.getMinutes()));
            break;
          case "s":
            g = g.replace(/s/g, h(d.getSeconds()))
        }
        return g
      }
      function j(a, b) {
        return b = b || 0,
          a >= 1e8 ? (a / 1e8).toFixed(b) + "亿": a >= 1e4 ? (a / 1e4).toFixed(b) + "万": a
      }
      function k(a) {
        if ("" == $.trim(a) || !/^[0-9]{17}[0-9X]$/.test(a)) return ! 1;
        for (var b = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), c = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"), d = 0, e = 0; e < 17; e++) d += parseInt(a.charAt(e), 10) * b[e];
        return c[d % 11] == a.substr(17)
      }
      function l(a) {
        return a && /^1[34578]\d{9}$/.test(a)
      }
      function m(a) {
        return a && /^[0-9a-zA-Z_\.\-]+@[0-9a-zA-Z_\-]+\.\w{1,5}(\.\w{1,5})?$/.test(a)
      }
      function n(a) {
        return a && /^\d{15,30}$/.test(a)
      }
      function o(a) {
        return /^[\u4e00-\u9fa5]{2,}$/.test(a)
      }
      function p(a) {
        for (var b = [".png", ".bmp", ".jpg", ".jpeg", ".gif"], c = 0; c < b.length; c++) if ($.trim(a).toLowerCase().endsWith(b[c])) return ! 0;
        return ! 1
      }
      function q(a, b) {
        return b ? /^\d+(\.\d+)?$/.test(a) && parseFloat(a) > 0 : /^(-)?\d+(\.\d+)?$/.test(a)
      }
      function r(a, b) {
        return b ? /^\d+(\.\d{1,2})?$/.test(a) && parseFloat(a) > 0 : /^(-)?\d+(\.\d{1,2})?$/.test(a)
      }
      function s(a, b) {
        return b ? /^\d+$/.test(a) && parseInt(a, 10) > 0 : /^(-)?\d+$/.test(a)
      }
      function t(a) {
        return a.replace(/[^\x00-\xff]/g, "**").length
      }
      function u(a) {
        var b = a.length;
        return a.substr(0, b - 1) + "×"
      }
      X.getTime = a,
        X.getDate = b,
        X.toInt = c,
        X.toFloat = d,
        X.isInt = e,
        X.formatNumber = f,
        X.money = g,
        X.fill = h,
        X.formatDate = i,
        X.sketchNumber = j,
        X.strLen = t,
        X.isIdentityNumber = k,
        X.isMobile = l,
        X.isEmail = m,
        X.isBankCard = n,
        X.isImg = p,
        X.isNum = q,
        X.isMoney = r,
        X.isInteger = s,
        X.maskName = u,
        X.isChinaName = o
    } (),
    function() {
      var a = {
        id: null,
        interval: 100,
        tasks: {},
        taskID: 0,
        start: function() {
          var a = this;
          a.id || 0 == a.tasks.length || (a._exec(), a.id = setInterval(function() {a._exec()}, a.interval))
        },
        stop: function() {
          clearInterval(this.id),
            this.id = null
        },
        _exec: function() {
          var a = this,
            b = Object.keys(a.tasks);
          if (b.length) {
            var c = Date.now();
            b.forEach(function(b) {
              var d = a.tasks[b];
              if (null != d && c - d.time >= d.wait) {
                var e = d.count;
                e > 0 && e--,
                  d.fn.call(),
                  e === -1 || e > 0 ? (d.time = Date.now(), d.count = e) : (d = null, delete a.tasks[b])
              }
            })
          }
        },
        addTask: function(a, b, c) {
          var d = this;
          return d.taskID++,
          b < 100 && (b = 100),
            c = c || -1,
            d.tasks[d.taskID] = {
              fn: a,
              wait: b,
              count: c,
              time: Date.now()
            },
            d.taskID
        },
        removeTask: function(a) {
          a || (this.tasks = {}),
          this.tasks[a] && delete this.tasks[a]
        },
        destroy: function() {
          this.removeTask(),
            this.stop()
        }
      };
      X.engine = a
    } (),
    function(a, b, c) {
      var d, e, f = function(b) {
          if (d == c) {
            d = '<div class="db-tip-wrap"><div class="db-tip">' + b + "</div></div>";
            var e = a(d);
            a("body").append(e),
              setTimeout(function() {
                  e.remove(),
                    d = c
                },
                2e3)
          }
        },
        g = {
          show: function() {
            if (e == c) {
              var b = '<div id="loading"><div class="load-wrap"><p></p></div></div>';
              e = a(b),
                a("body").append(e)
            }
          },
          hide: function() {
            e != c && (e.remove(), e = c)
          }
        },
        h = 1e4,
        i = {
          dbs: [],
          open: function(b, c) {
            c = a.extend({
                title: "",
                notify: null
              },
              c || {});
            var d, e = this,
              f = e._zi(),
              g = e._zi(),
              h = [g],
              i = e._ps(),
              j = i.height,
              k = -10;
            "" != c.title && (b = '<div class="db-header">' + c.title + "</div>" + b),
            b && (b = b.replace(new RegExp("#di#", "g"), g)),
              h[1] = a('<div class="db-bg"></div>'),
              h[1].css("zIndex", f),
              h[1].attr("id", "dialog-bg-" + g),
            "info" === c.type && h[1].bind("click",
              function() {
                e.close(g, 0)
              }),
              h[2] = a('<div class="db-wrap"></div>'),
              h[2].css("zIndex", g),
              h[2].html(b),
              h[3] = c.notify,
              a("body").append(h[1], h[2]),
              d = h[2].height(),
              k = Math.round((j - d) / 2 + k),
            k < 10 && (k = 10),
              h[2].css("zIndex", g),
              h[2].css("top", k + "px"),
              h[2].show(),
              e.dbs.push(h)
          },
          info: function(a) {
            var b = this,
              c = "";
            c += '<div class="db-content"><div style="padding:60px;">' + a + "</div></div>",
              b.open(c, {
                type: "info"
              })
          },
          alert: function(b, c) {
            c = a.extend({
                title: "",
                sureBtn: "确定"
              },
              c || {}),
              c.type = "alert";
            var d, e = this,
              f = "";
            d = "" == c.title ? "center": "left",
              f += '<div class="db-content"><div style="padding: 30px 40px 40px; text-align: ' + d + ';">' + b + "</div></div>",
              f += '<div class="db-footer"><ul>',
              f += '<li><a href="javascript:;" onclick="X.dialog.close(#di#,0);">' + c.sureBtn + "</a></li>",
              f += "</ul></div>",
              e.open(f, c)
          },
          confirm: function(b, c) {
            c = a.extend({
                title: "",
                sureBtn: "确定",
                cancelBtn: "取消"
              },
              c || {}),
              c.type = "confirm";
            var d, e = this,
              f = "";
            d = "" == c.title ? "center": "left",
              f += '<div class="db-content"><div style="padding: 30px 40px 40px; text-align: ' + d + ';">' + b + "</div></div>",
              f += '<div class="db-footer"><ul>',
              f += '<li><a href="javascript:;" onclick="X.dialog.close(#di#,0);">' + c.cancelBtn + "</a></li>",
              f += '<li><a href="javascript:;" onclick="X.dialog.close(#di#,1);">' + c.sureBtn + "</a></li>",
              f += "</ul></div>",
              e.open(f, c)
          },
          close: function(a, b) {
            var d, e = this;
            if (b = b || 0, a != c && "number" == typeof a) d = e.get(a),
            d && (d[3] ? b != -1 ? (d[3](b), e.get(a, !0), d[2].remove(), d[1].remove()) : d[3](b,
              function() {
                e.get(a, !0),
                  d[2].remove(),
                  d[1].remove()
              }) : (e.get(a, !0), d[2].remove(), d[1].remove()));
            else {
              var f = e.dbs.length;
              f > 0 && e.close(e.dbs[f - 1][0], 0)
            }
          },
          get: function(a, b) {
            for (var c, d = this,
                   e = d.dbs,
                   f = 0; f < e.length; f++) if (e[f][0] == a) {
              c = e[f],
              b && e.splice(f, 1);
              break
            }
            return c
          },
          _zi: function() {
            return h++
          },
          _ps: function() {
            var c = a(b).height(),
              d = a(b).width();
            return {
              height: c,
              width: d
            }
          }
        };
      X.tip = f,
        X.loading = g,
        X.dialog = i
    } (jQuery, window),
    function() {
      var a = {
        init: function() {
          this.click()
        },
        click: function() {
          var a = this;
          $("span.copy").on("click",
            function() {
              var b = a.copy($(this).prev()[0]);
              b && X.tip("复制成功")
            })
        },
        copy: function(a) {
          this.focus(a);
          var b = this.way("copy");
          return b
        },
        way: function(a) {
          var b;
          try {
            b = document.execCommand(a)
          } catch(c) {
            b = !1
          }
          return b
        },
        focus: function(a) {
          var b;
          if ("INPUT" === a.nodeName || "TEXTAREA" === a.nodeName) a.focus(),
            a.setSelectionRange(0, a.value.length),
            b = a.value;
          else {
            a.hasAttribute("contenteditable") && a.focus();
            var c = window.getSelection(),
              d = document.createRange();
            d.selectNodeContents(a),
              c.removeAllRanges(),
              c.addRange(d),
              b = c.toString()
          }
          return b
        }
      };
      X.clipboard = a
    } (),
    function() {
      var a = navigator.userAgent,
        b = /iPhone|iPad|iPod|iOS/i.test(a),
        c = /Android/i.test(a),
        d = /BlackBerry/i.test(a),
        e = /Windows Phone/i.test(a),
        f = b || c || d || e,
        g = {
          ios: b,
          android: c,
          blackBerry: d,
          windowsPhone: e,
          uc: f && /UCBrowser/i.test(a),
          mobile: f
        };
      X.browser = g
    } (),

    function(a, b, c) {
      "use strict";
      var d = {
        create: function(a) {
          return document.createElement(a)
        },
        createNS: function(a) {
          return document.createElementNS ? document.createElementNS("http://www.w3.org/2000/svg", a) : this.create(a)
        },
        createText: function(a) {
          return document.createTextNode(a)
        },
        append: function(a, b) {
          return a.appendChild(b),
            b
        },
        insert: function(a, b, c) {
          return a.insertBefore(b, c),
            b
        },
        remove: function(a) {
          a.parentNode.removeChild(a)
        },
        query: function(a) {
          return document.querySelector(a)
        },
        childs: function(a) {
          if (a.children) return a.children;
          for (var b = a.childNodes,
                 c = [], d = 0; d < b.length; d++) 1 === b[d].nodeType && c.push(b[d]);
          return c
        },
        attr: function(b, c, e) {
          if (X.isString(c) && null == e) return b.getAttribute(c);
          if (X.isString(c)) {
            if ("style" === c && X.isObject(e)) {
              var f = "";
              a.each(e,
                function(a, b) {
                  f += a + ":" + b + ";"
                }),
                e = f
            }
            b.setAttribute(c, e)
          } else a.each(c,
            function(a, c) {
              d.attr(b, a, c)
            })
        },
        empty: function(a) {
          for (var b = this.childs(a), c = b.length - 1; c >= 0; c--) this.remove(b[c])
        },
        textContent: function(a, b) {
          if (null == b) return a.firstChild.nodeValue;
          this.empty(a);
          var c = d.createNS("tspan");
          d.append(c, d.createText(b)),
            d.append(a, c)
        },
        getSize: function(b) {
          return {
            width: a(b).width(),
            height: a(b).height()
          }
        }
      };
      X.dom = d
    } (jQuery, window),
    function(a, b, c) {
      "use strict";
      var d = X.dom,
        e = "#FF0000",
        f = "#ddd",
        g = "#ddd",
        h = "#3788CB",
        i = "#546980",
        j = "#D0402D",
        k = "#01B28E",
        l = "#999999",
        m = function(a) {
          this.wrap = document.getElementById(a.wrap) || document.body,
            this.svg = d.createNS("svg"),
            this.baseG = d.createNS("g"),
            this.chartG = d.createNS("g"),
            this.textG = d.createNS("g"),
            this.hoverG = d.createNS("g"),
            this.pathEl = null,
            this.pathBgEl = null,
            this.cacheEl = [],
            this.cacheData = [],
            this.period = a.period || [["09:30", "11:30"], ["13:00", "15:00"]],
            this.periodIntl = [],
            this.isStock = !1,
            this.data = a.data || {},
            this.code = "",
            this.moments = null,
            this.quoteTime = null,
            this.close = 0,
            this.maxPrice = 0,
            this.minPrice = 0,
            this.beginPrice = 0,
            this.endPrice = 0,
            this.totalHours = 4,
            this.PART = 8,
            this.scale = a.scale != c ? a.scale: 2,
            this.showHeartBeat = !0,
            this.init()
        };
      m.prototype = {
        init: function() {
          d.attr(this.svg, {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1"
          }),
            this.svg.appendChild(this.baseG),
            this.svg.appendChild(this.chartG),
            this.svg.appendChild(this.textG),
            this.svg.appendChild(this.hoverG),
            this.wrap.appendChild(this.svg),
            this.resize(),
            this._drawFrame(),
            this._drawBasePriceLine(),
            this._reticle()
        },
        resize: function() {
          var a = 0;
          this.svgWidth = d.getSize(this.wrap).width,
            this.svgHeight = d.getSize(this.wrap).height,
            this.priceChartBox = {
                x: {
                    begin: a,
                    end: this.svgWidth - a,
                    width: this.svgWidth - 2 * a
                },
                y: {
                    begin: a,
                    end: this.svgHeight - a - 20,
                    height: this.svgHeight - 2 * a - 20
                }
            }
        },
        draw: function(a) {
          this._draw(a)
        },
        perDraw: function(a, b) {
          this.data[a.time] = a,
            this._draw(b)
        },
        _draw: function(a) {
          this.process(a),
            this._clear(),
          Object.keys(this.data).length && (this._drawPeriodLine(), this._drawChart(), this.isStock ? this._drawChartData() : this._drawIntlChartData())
        },
        process: function(a) {
          a && this._setConfig(a),
          a && a.data && (this.data = a.data),
            this._setMaxMin(),
            this._setBEPrice()
        },
        _clear: function() {
          a.each(this.cacheEl,
            function(a, b) {
              b && d.remove(b)
            }),
            this.cacheEl.length = 0
        },
        _reticle: function() {
          var a = this,
            b = a.hoverG;
          a.hLineEl = a._line(b, 0, 0, 0, 0, i),
            a.vLineEl = a._line(b, 0, 0, 0, 0, i),
            a.priceRectEl = a._rect(b, -100, 0, 0, 13, 2, 2, i),
            a.timeRectEl = a._rect(b, -100, 0, 32, 13, 2, 2, i),
            a.priceTextEl = a._text(b, -100, 0, "100", "#FFF"),
            a.timeTextEl = a._text(b, -100, 0, "100", "#FFF"),
            a._wait()
        },
        _wait: function() {
          var b, c, d = this,
            e = d.cacheData,
            f = X.browser.mobile,
            g = !1,
            h = a(d.svg).offset().top,
            i = a(d.svg).offset().left,
            j = f ? "touchstart": "mousedown",
            k = f ? "touchend": "mouseup",
            l = f ? "touchmove": "mousemove";
          a(d.svg).on(j,
            function(a) {
              a.stopPropagation(),
                b = Date.now(),
                c = setTimeout(function() {
                    g = !0;
                    var b = f ? a.originalEvent.touches[0] : a;
                    d._handler(e, b.pageX, b.pageY, h, i)
                  },
                  500)
            }).on(k,
            function(a) {
              var e = Date.now() - b;
              g && e < 500 && (g = !1, c && clearTimeout(c), d._handler([], 0, 0, 0, 0))
            }).on(l,
            function(a) {
              if (a.preventDefault(), g) {
                var b = f ? a.originalEvent.touches[0] : a;
                d._handler(e, b.pageX, b.pageY, h, i)
              }
            })
        },
        _handler: function(a, b, c, e, f) {
          var g = this,
            h = g.priceChartBox,
            i = h.x,
            j = h.y,
            k = i.width,
            l = j.height;
          b -= f,
            c -= e;
          var m = g._getCacheData(a, b);
          c = l >= c ? c: l,
            c = 0 <= c ? c: 0,
            b = k >= b ? b: k,
            b = 0 <= b ? b: 0;
          var n = g._toTime(m[3]),
            o = g._getPrice(c, l),
            p = g._getTextWidth(o),
            q = m[0] - 16 < 0 ? 0 : m[0] + 16 > k ? k - 32 : m[0] - 16,
            r = b < k / 2 ? k - p: 0,
            s = c - 6.5 < 0 ? 0 : c - 6.5;
          a.length || (c = -1e3, q = -1e3, r = -1e3, s = -1e3),
            d.attr(g.hLineEl, {
              x1: i.begin,
              y1: g.half(c),
              x2: i.end,
              y2: g.half(c)
            }),
            d.attr(g.vLineEl, {
              x1: g.half(m[0]),
              y1: j.begin,
              x2: g.half(m[0]),
              y2: j.end
            }),
            d.attr(g.timeRectEl, {
              x: q,
              y: j.end
            }),
            d.attr(g.timeTextEl, {
              x: q + 1,
              y: j.end + 10.5
            }),
            d.textContent(g.timeTextEl, n),
            d.attr(g.priceRectEl, {
              x: r,
              y: s,
              width: p
            }),
            d.attr(g.priceTextEl, {
              x: r + 1,
              y: s + 11
            }),
            d.textContent(g.priceTextEl, o)
        },
        _getCacheData: function(a, b) {
          var c, d, e, f, g, h = [ - 1e3, -1e3, 0, 0],
            i = a.length;
          return i && (e = a[0], f = a[i - 1], c = a[0][0], d = a[1] ? a[1][0] : a[0][0], g = (d - c) / 2, a.forEach(function(a) {
            var c = a[0];
            b >= c - g && b < c + g && (h = a)
          }), -1e3 === h[0] && (b <= e[0] ? h = e: b > f[0] && (h = f))),
            h
        },
        _getTextWidth: function(a) {
          var b = a.indexOf(".") != -1,
            c = a.length;
          return c = b ? c - 1 : c,
          6.8 * c + (b ? 3 : 0) + 2
        },
        _getPrice: function(a, b) {
          var c = this,
            d = c.isStock ? c.beginPrice: c.maxPrice + .1 * (c.maxPrice - c.minPrice),
            e = c.isStock ? c.endPrice: c.minPrice - .1 * (c.maxPrice - c.minPrice),
            a = a > 0 ? a: 0,
            f = d - e,
            g = d - a / b * f;
          return g.toFixed(c.scale)
        },
        _toTime: function(a) {
          var b = a / 100 | 0,
            c = a % 100;
          return (10 > b ? "0": "") + b + ":" + (10 > c ? "0": "") + c
        },
        _drawFrame: function() {
          var a = this,
            b = a.baseG,
            c = a.priceChartBox,
            e = c.x,
            g = c.y,
            h = "",
            i = "M" + e.begin + "," + a.half(g.begin) + "L" + e.end + "," + a.half(g.begin),
            j = ("M" + a.half(e.end) + "," + g.begin + "L" + a.half(e.end) + "," + g.end, "M" + e.end + "," + a.half(g.end) + "L" + e.begin + "," + a.half(g.end));
          "M" + a.half(e.begin) + "," + g.end + "L" + a.half(e.begin) + "," + g.begin;
          h = i + j;
          var k = this._path(h, f, "none", "");
          d.append(b, k)
        },
        _drawBasePriceLine: function() {
          for (var a = this,
                 b = a.PART,
                 c = a.baseG,
                 e = a.priceChartBox.x,
                 f = a.priceChartBox.y,
                 h = (f.height - 2) / b, i = 1; i < b; i++) {
            var j = e.begin + 1,
              k = a.half(f.begin + i * h),
              l = e.end - 1,
              m = k,
              n = "M" + j + "," + k + "L" + l + "," + m,
              o = this._path(n, g, "none", "");
            d.append(c, o)
          }
        },
        _drawPeriodLine: function() {
          var a = this,
            b = a.baseG,
            c = a.cacheEl,
            e = a.priceChartBox.x,
            f = a.priceChartBox.y,
            h = a.isIntl ? this._parsePeriodIntlToPeriod() : this.period,
            i = h.length,
            j = a.moments,
            k = j.length,
            m = (e.width - 1) / (k - 1),
            n = i - 1,
            o = {};
          h.forEach(function(a, b) {
            var c = a[0],
              d = a[1];
            o[c] = j.indexOf(c.replace(":", "") - 0),
            b == n && (o[d] = k - 1)
          });
          var p, q, r, s, t, u, v;
          for (p in o) q = o[p],
            r = a.half(q * m),
            s = "M" + (e.begin + r) + "," + (f.begin + 1) + "L" + (e.begin + r) + "," + (f.end - 1),
            t = a._path(s, g, "none", ""),
            d.append(b, t),
            c.push(t),
            v = 0 == q ? "start": q == k - 1 ? "end": "middle",
            u = a._text(b, e.begin + r, f.end + 15, p, l, v),
            c.push(u)
        },
        _drawChart: function() {
          this._drawPath()
        },
        _drawPath: function() {
          var a = this,
            b = a.data,
            e = a.cacheData,
            f = a.priceChartBox.x,
            g = a.priceChartBox.y,
            i = a.isStock ? a.beginPrice: a.maxPrice + .1 * (a.maxPrice - a.minPrice),
            j = a.isStock ? a.endPrice: a.minPrice - .1 * (a.maxPrice - a.minPrice),
            k = a.chartG,
            l = a.moments,
            m = l.length,
            n = m - 1,
            o = f.width - 2,
            p = g.height - 2,
            q = o / n;
          e.length = 0;
          var r, s = function(a) {
              var b = 0 === a ? 0 : a === n ? o: q * a;
              return (f.begin + 1 + b).toFixed(4) - 0
            },
            t = function(a) {
              if (i == j) return p / 2;
              var b = (i - a) / (i - j) * p;
              return (g.begin + 1 + b).toFixed(4) - 0
            },
            u = function(b, c) {
              return "L" + s(b) + "," + a.half(g.end) + "L" + s(c) + "," + a.half(g.end) + "Z"
            },
            v = 0,
            w = 0,
            x = 0,
            y = 0,
            z = "",
            A = "";
          l.forEach(function(d, f) {
            if (!a._isTradeTime(d)) return ! 1;
            var g = b[d];
            null == g && (g = r),
            null != g && (r === c ? (z += "M", v = f) : z += "L", x = s(f), y = t(g.current), z += x + "," + y, w = f, r = g, e.push([x, y, g.current, d]))
          }),
          z && (A = z + u(w, v), null == this.pathEl ? (this.pathEl = this._path(z, h, "none", "", ""), this.pathBgEl = this._path(A, "none", h, .2, ""), d.append(k, this.pathEl), d.append(k, this.pathBgEl)) : (d.attr(this.pathEl, "d", z), d.attr(this.pathBgEl, "d", A))),
            a._setHeartBeat(x, y, k)
        },
        _setHeartBeat: function(a, b, c) {
          var e = this,
            f = d.createNS("animate");
          d.attr(f, {
            attributeName: "r",
            values: "1;1.5;1",
            dur: ".5s",
            repeatCount: "indefinite"
          }),
            a = this.showHeartBeat ? a: -1e3,
            e.heartbeat ? d.attr(e.heartbeat, {
              cx: a,
              cy: b
            }) : (e.heartbeat = e._circle({
                cx: a,
                cy: b,
                r: 1,
                stroke: "#F3976C",
                fill: "#FF3366",
                "stroke-width": 1.5
              },
              c), d.append(e.heartbeat, f))
        },
        _drawChartData: function() {
          var a = this,
            b = a.textG,
            c = a.priceChartBox,
            d = c.x,
            f = c.y,
            g = a.cacheEl,
            h = a.close,
            i = a.beginPrice,
            m = a.endPrice,
            n = i - h,
            o = n / h * 100,
            p = a._text(b, d.begin, f.begin + f.height / 2 - 3, h.toFixed(2), l),
            q = a._text(b, d.begin, f.begin + 12, i.toFixed(2), j),
            r = a._text(b, d.begin, f.end - 3, m.toFixed(2), k),
            s = a._text(b, d.end, f.begin + 12, "+" + o.toFixed(2) + "%", j, "end"),
            t = a._text(b, d.end, f.end - 3, "-" + o.toFixed(2) + "%", k, "end"),
            u = a._text(b, d.end, f.begin + f.height / 2 - 3, "0.00%", l, "end"),
            v = a._line(b, d.begin, a.half(f.height / 2), d.end, a.half(f.height / 2), e, "3,1");
          g.push(v, p, q, r, s, t, u)
        },
        _drawIntlChartData: function() {
          function a(a) {
            var b = (m - a) / (m - n) * g.height;
            return g.begin + 1 + b
          }
          var b = this,
            c = b.textG,
            d = b.priceChartBox,
            f = d.x,
            g = d.y,
            h = b.cacheEl,
            i = b.close,
            m = b.maxPrice + .1 * (b.maxPrice - b.minPrice),
            n = b.minPrice - .1 * (b.maxPrice - b.minPrice),
            o = (m - i) / i * 100,
            p = (n - i) / i * 100,
            q = o > 0 ? "+": "",
            r = p > 0 ? "+": "",
            s = o > 0 ? j: o < 0 ? k: l,
            t = p > 0 ? j: p < 0 ? k: l,
            u = b._text(c, f.begin, g.begin + 12, m.toFixed(b.scale), s),
            v = b._text(c, f.begin, g.end - 3, n.toFixed(b.scale), t),
            w = b._text(c, f.end, g.begin + 12, q + o.toFixed(2) + "%", s, "end"),
            x = b._text(c, f.end, g.end - 3, r + p.toFixed(2) + "%", t, "end");
          if (h.push(u, v, w, x), i < b.maxPrice && i > b.minPrice) {
            var y = b.half(a(i)),
              z = b._text(c, f.begin, y - 3, i.toFixed(b.scale), l),
              A = b._text(c, f.end, y - 3, "0.00%", l, "end");
            h.push(z, A, b._line(c, f.begin, y, f.end, y, e, "3,1"))
          }
        },
        _circle: function(a, b) {
          var c = d.createNS("circle");
          return d.attr(c, a),
          b && b.appendChild(c),
            c
        },
        _rect: function(a, b, c, e, f, h, i, j, k) {
          var l = d.createNS("rect");
          return d.attr(l, {
            x: b,
            y: c,
            width: e,
            height: f,
            rx: h,
            ry: i,
            fill: j ? j: g
          }),
            k ? d.insert(a, l, k) : d.append(a, l),
            l
        },
        _line: function(a, b, c, e, f, h, i, j) {
          var k = d.createNS("line");
          return d.attr(k, {
            x1: b,
            y1: c,
            x2: e,
            y2: f,
            stroke: h ? h: g,
            "stroke-dasharray": i
          }),
          i && d.attr(k, "stroke-dasharray", i),
            j ? d.insert(a, k, j) : d.append(a, k),
            k
        },
        _text: function(a, b, c, e, f, g, h) {
          var i = d.createNS("text");
          return d.attr(i, {
            x: b,
            y: c,
            fill: f || l,
            style: {
              "text-anchor": g || "start",
              "font-size": "12px"
            }
          }),
            d.textContent(i, e),
            h ? d.insert(a, i, h) : d.append(a, i),
            i
        },
        _path: function(a, b, c, e, f) {
          var g = {},
            h = d.createNS("path");
          return a && (g.d = a),
          b && (g.stroke = b),
          c && (g.fill = c),
          e && (g["fill-opacity"] = e),
          f && (g["stroke-dasharray"] = f),
            d.attr(h, g),
            h
        },
        _parsePeriodIntlToPeriod: function() {
          var a, b = this,
            c = b.periodIntl,
            d = c[0],
            e = [];
          for (a = 1; a < c.length; a++) e.push([d, d = c[a]]);
          return e
        },
        _setConfig: function(a) {
          a.quoteTime && (this.quoteTime = a.quoteTime),
          a.close && (this.close = a.close),
          a.high && (this.high = a.high),
          a.low && (this.low = a.low),
          a.period && this.period != a.period && (this.period = a.period, this.data = {}),
          a.code && (this.code = a.code),
            this.moments = a.isIntl ? this._period2moments_intl() : this._period2moments(),
            this.isStock = !!a.isStock,
            this.isIntl = !!a.isIntl
        },
        _setMaxMin: function() {
          var a = this,
            b = this.data,
            c = this.moments;
          Object.keys(this.data).length && c.forEach(function(c) {
            var d = b[c];
            null != d && (0 != a.maxPrice && 0 != a.minPrice || (a.maxPrice = a.minPrice = d.current), a.maxPrice = Math.max(a.maxPrice, d.current), a.minPrice = Math.min(a.minPrice, d.current))
          })
        },
        _setBEPrice: function() {
          var a = this.maxPrice,
            b = this.minPrice,
            c = this.close,
            d = this.PART / 2 / 100 * c;
          if (a == b) return this.beginPrice = c + d,
            void(this.endPrice = c - d);
          var e = Math.abs(c - a),
            f = Math.abs(c - b);
          e > f ? (this.beginPrice = a, this.endPrice = c - e) : (this.beginPrice = c + f, this.endPrice = b)
        },
        _period2moments_intl: function() {
          for (var a = this,
                 b = a.period,
                 c = b[0][0].replace(":", "") - 0, d = c / 100 | 0, e = b[b.length - 1][1].replace(":", "") - 0, f = e / 100 | 0, g = [], h = d;;) {
            if (24 == h && (h = 0), g.push(h), h == f) break;
            h++
          }
          var i = a.totalHours,
            j = a.quoteTime,
            k = j / 100 | 0,
            k = k == f ? k - 1 : k,
            l = g.indexOf(k);
          a.periodIntl = [],
            l = l - i + 1,
            l = l < 0 ? 0 : l;
          for (var m = [], n = 0; n < i; n++) {
            k = g[l++];
            for (var o = 0; o < 60; o++) m.push(k + X.fill(o) - 0);
            a.periodIntl.push(X.fill(k) + ":00")
          }
          return k += 1,
            m.push(k + "00" - 0),
            a.periodIntl.push(X.fill(k) + ":00"),
            m
        },
        _period2moments: function() {
          var b = [];
          return a.each(this.period,
            function(a, c) {
              for (var d = c[0], e = c[1], f = d.split(":"), g = f[0] - 0, h = f[1] - 0, i = e.split(":"), j = i[0] - 0, k = i[1] - 0; g <= j && (60 === h && (g += 1, h = 0), !(g === j && h > k)); h++) b.push(g + X.fill(h) - 0)
            }),
            b
        },
        _isTradeTime: function(a) {
          var b = this.moments,
            c = b[0],
            d = b[b.length - 1],
            e = a - 0,
            f = this.quoteTime;
          if (c > d) {
            if (f >= c && f < 2400) return e >= c && e <= f;
            if (e >= c && e < 2400) return ! 0
          }
          return e <= f
        },
        half: function(a) {
          return (0 | a) + .5
        }
      },
        X.Sline = m
    } (jQuery, window),
    function(a, b, c) {
      "use strict";
      var d = X.dom,
        e = "#ddd",
        f = "#ddd",
        g = "#999",
        h = "#999",
        i = "#E34C4D",
        j = "#01B28E",
        k = "#FFFFFF",
        l = function(a) {
          this.data = [],
            this.days = 0,
            this.unitWidth = 8,
            this.wrap = document.getElementById(a.wrap) || document.body,
            this.svg = d.createNS("svg"),
            this.baseG = d.createNS("g"),
            this.chartG = d.createNS("g"),
            this.textG = d.createNS("g"),
            this.hoverG = d.createNS("g"),
            this.cacheEl = [],
            this.cacheData = [],
            this.scale = a.scale != c ? a.scale: 2,
            this.init()
        };
      l.prototype = {
        init: function() {
          d.attr(this.svg, {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1"
          }),
            this.svg.appendChild(this.baseG),
            this.svg.appendChild(this.chartG),
            this.svg.appendChild(this.textG),
            this.svg.appendChild(this.hoverG),
            this.wrap.appendChild(this.svg),
            this.resize(),
            this._drawFrame(),
            this._drawBasePriceLine(),
            this.draw(),
            this._reticle()
        },
        resize: function() {
          var a = 0;
          this.svgWidth = d.getSize(this.wrap).width,
            this.svgHeight = d.getSize(this.wrap).height,
            this.kChartBox = {
              x: {
                begin: a,
                end: this.svgWidth - a,
                width: this.svgWidth - 2 * a
              },
              y: {
                begin: a,
                end: this.svgHeight - a - 20,
                height: this.svgHeight - 2 * a - 20
              }
            }
        },
        draw: function(a) {
          this.days = this.kChartBox.x.width / this.unitWidth | 0,
          a && a.length && (this.days = this._getDays(a.length, this.days), this.data = a.slice(a.length - this.days)),
            this._draw()
        },
        _drawFrame: function() {
          var a, b, c, f, g, h, i, j, k;
          a = this.baseG,
            b = this.kChartBox,
            c = b.x,
            f = b.y,
            g = "",
            h = "M" + c.begin + "," + (f.begin + .5) + "L" + c.end + "," + (f.begin + .5),
            j = "M" + (c.end - .5) + "," + f.begin + "L" + (c.end - .5) + "," + f.end,
            k = "M" + c.end + "," + (f.end - .5) + "L" + c.begin + "," + (f.end - .5),
            i = "M" + (c.begin - .5) + "," + f.end + "L" + (c.begin - .5) + "," + f.begin,
            g = h + k;
          var l = this._path(g, e, "none", "");
          d.append(a, l)
        },
        _drawBasePriceLine: function() {
          for (var a = 4,
                 b = this.baseG,
                 c = this.kChartBox.x,
                 e = this.kChartBox.y,
                 g = (e.height - 2) / a, h = 1; h < a; h++) {
            var i = c.begin + 1,
              j = (e.begin + 1 + h * g | 0) - .5,
              k = c.end,
              l = j,
              m = "M" + i + "," + j + "L" + k + "," + l,
              n = this._path(m, f, "none", "");
            d.append(b, n)
          }
        },
        _rect: function(a, b, c, e, g, h, i, j, k) {
          var l = d.createNS("rect");
          return d.attr(l, {
            x: b,
            y: c,
            width: e,
            height: g,
            rx: h,
            ry: i,
            fill: j ? j: f
          }),
            k ? d.insert(a, l, k) : d.append(a, l),
            l
        },
        _line: function(a, b, c, e, g, h, i, j) {
          var k = d.createNS("line");
          return d.attr(k, {
            x1: b,
            y1: c,
            x2: e,
            y2: g,
            stroke: h ? h: f,
            "stroke-dasharray": i
          }),
          i && d.attr(k, "stroke-dasharray", i),
            j ? d.insert(a, k, j) : d.append(a, k),
            k
        },
        _reticle: function() {
          var a = this,
            b = a.hoverG;
          a.hLineEl = a._line(b, 0, 0, 0, 0, g),
            a.vLineEl = a._line(b, 0, 0, 0, 0, g),
            a.priceRectEl = a._rect(b, -100, 0, 0, 13, 2, 2, g),
            a.timeRectEl = a._rect(b, -100, 0, 32, 13, 2, 2, g),
            a.priceTextEl = a._text(b, -100, 0, "100", "#FFF"),
            a.timeTextEl = a._text(b, -100, 0, "100", "#FFF"),
            a._wait()
        },
        _clear: function() {
          a.each(this.cacheEl,
            function(a, b) {
              b && d.remove(b)
            }),
            this.cacheEl.length = 0
        },
        _draw: function() {
          this._calcMaxMin(),
            this._clear(),
          this.data.length && (this._drawDateLine(), this._drawChart(), this._drawChartData())
        },
        _wait: function() {
          var b, c, d = this,
            e = d.cacheData,
            f = X.browser.mobile,
            g = !1,
            h = a(d.svg).offset().top,
            i = a(d.svg).offset().left,
            j = f ? "touchstart": "mousedown",
            k = f ? "touchend": "mouseup",
            l = f ? "touchmove": "mousemove";
          a(d.svg).on(j,
            function(a) {
              a.stopPropagation(),
                b = Date.now(),
                c = setTimeout(function() {
                    g = !0;
                    var b = f ? a.originalEvent.touches[0] : a;
                    d._handler(e, b.pageX, b.pageY, h, i)
                  },
                  500)
            }).on(k,
            function(a) {
              var e = Date.now() - b;
              g && e < 500 && (g = !1, c && clearTimeout(c), d._handler([], 0, 0, 0, 0))
            }).on(l,
            function(a) {
              if (a.preventDefault(), g) {
                var b = f ? a.originalEvent.touches[0] : a;
                d._handler(e, b.pageX, b.pageY, h, i)
              }
            })
        },
        _handler: function(a, b, c, e, f) {
          var g = this,
            h = g.kChartBox,
            i = h.x,
            j = h.y,
            k = i.width,
            l = j.height;
          b -= f,
            c -= e;
          var m = g._getCacheData(a, b);
          c = l >= c ? c: l,
            c = 0 <= c ? c: 0,
            b = k >= b ? b: k,
            b = 0 <= b ? b: 0;
          var n = m[1];
          if (8 == n.length) {
            var o = n.substr(4, 2),
              p = n.substr(6, 2);
            n = o + "/" + p
          } else if (4 == n.length) {
            var q = n.substring(0, 2),
              r = n.substring(2, 4);
            n = q + ":" + r
          }
          var s = g._getPrice(c, l),
            t = g._getTextWidth(s),
            u = m[0] - 16 < 0 ? 0 : m[0] + 16 > k ? k - 32 : m[0] - 16,
            v = b < k / 2 ? k - t: 0,
            w = c - 6.5 < 0 ? 0 : c - 6.5;
          a.length || (c = -1e3, u = -1e3, v = -1e3, w = -1e3),
            d.attr(g.hLineEl, {
              x1: i.begin,
              y1: g.half(c),
              x2: i.end,
              y2: g.half(c)
            }),
            d.attr(g.vLineEl, {
              x1: g.half(m[0]),
              y1: j.begin,
              x2: g.half(m[0]),
              y2: j.end
            }),
            d.attr(g.timeRectEl, {
              x: u,
              y: j.end
            }),
            d.attr(g.timeTextEl, {
              x: u + 1,
              y: j.end + 10.5
            }),
            d.textContent(g.timeTextEl, n),
            d.attr(g.priceRectEl, {
              x: v,
              y: w,
              width: t
            }),
            d.attr(g.priceTextEl, {
              x: v + 1,
              y: w + 11
            }),
            d.textContent(g.priceTextEl, s)
        },
        _getCacheData: function(a, b) {
          var c, d, e, f, g, h = [ - 1e3, 0],
            i = a.length;
          return i && (e = a[0], f = a[i - 1], c = a[0][0], d = a[1] ? a[1][0] : a[0][0], g = (d - c) / 2, a.forEach(function(a) {
            var c = a[0];
            b >= c - g && b < c + g && (h = a)
          }), -1e3 === h[0] && (b <= e[0] ? h = e: b > f[0] && (h = f))),
            h
        },
        _getTextWidth: function(a) {
          var b = a.indexOf(".") != -1,
            c = a.length;
          return c = b ? c - 1 : c,
          6.8 * c + (b ? 3 : 0) + 2
        },
        _getPrice: function(a, b) {
          var c = this,
            d = c.maxPrice,
            e = c.minPrice,
            a = a > 0 ? a: 0,
            f = d - e,
            g = d - a / b * f;
          return g.toFixed(c.scale)
        },
        _toTime: function(a) {
          var b = a / 1e3 | 0,
            c = a % 1e3;
          return b + "\\" + c
        },
        _calcMaxMin: function() {
          var b = this;
          b.maxPrice = 0,
            b.minPrice = 0,
            a.each(this.data,
              function(a, c) {
                var d = [];
                b.maxPrice && d.push(b.maxPrice),
                b.minPrice && d.push(b.minPrice),
                  d.push(c.high),
                  d.push(c.low),
                  b.maxPrice = Math.max.apply(Math, d),
                  b.minPrice = Math.min.apply(Math, d)
              })
        },
        _drawDateLine: function() {
          function a(a) {
            var b, c, d, e, f, g = new Date,
              h = g.getFullYear();
            return 8 === a.length ? (b = a.substring(0, 4) - 0, c = a.substring(4, 6), d = a.substring(6), b !== h ? (b += "", b = b.substring(2, 4) + "/") : b = "", b + c + "/" + d) : 4 === a.length ? (e = a.substring(0, 2), f = a.substring(2, 4), e + ":" + f) : ""
          }
          for (var b, c, e, g, i, j, k, l, m = this,
                 n = this.baseG,
                 o = m.kChartBox,
                 p = (o.x, o.y), q = m.data, r = 7, s = q.length / r | 0, t = m.unitWidth, u = t - 2, v = "", w = 0; w < s; w++) j = "",
            v = q[w * r].time,
            v = a(v),
            b = m._c2x_k(w * r, t),
            c = e = m.half(b + u / 2),
            g = p.begin + 1,
            i = p.end - 1,
            j = "M" + c + "," + g + "," + e + "," + i,
            k = m._path(j, f, "none", ""),
            d.append(n, k),
            l = m._text(n, e, i + 15, v, h),
            m.cacheEl.push(k, l)
        },
        _drawChart: function() {
          var b = this,
            c = this.chartG,
            e = this.unitWidth;
          b.cacheData.length = 0,
            a.each(this.data,
              function(a, f) {
                var g, h, l, m, n = "",
                  o = f.price > f.open ? i: f.price < f.open ? j: k;
                g = b._c2x_k(a, e),
                  l = e - 2,
                  h = b._c2y_k(Math.max(f.open, f.price)),
                  m = b._c2y_k(Math.min(f.open, f.price)) - h,
                  n += "M" + g.toFixed(5) + "," + h.toFixed(2) + "L" + (g + l).toFixed(2) + "," + h.toFixed(2) + "L" + (g + l).toFixed(2) + "," + (h + m).toFixed(2) + "L" + g.toFixed(2) + "," + (h + m).toFixed(2) + "Z";
                var p, q, r, s;
                p = r = g + l / 2,
                  q = b._c2y_k(f.high),
                  s = b._c2y_k(f.low),
                  n += "M" + p.toFixed(2) + "," + q.toFixed(2) + "L" + r.toFixed(2) + "," + s.toFixed(2),
                  n = n.replace(/\.\d+/g, ".5");
                var t = b._path(n, o, o, "");
                d.append(c, t),
                  b.cacheEl.push(t),
                  b.cacheData.push([p, f.time])
              })
        },
        _drawChartData: function() {
          var a = this,
            b = a.textG,
            c = a.kChartBox,
            d = c.x,
            e = c.y,
            f = a.cacheEl,
            g = a.maxPrice,
            i = a.minPrice,
            j = (g - i) / 2 + i,
            k = d.end,
            l = e.end - 3,
            m = e.begin + 12,
            n = e.begin + e.height / 2 - 3,
            o = a._text(b, k, m, g.toFixed(a.scale), h, "end"),
            p = a._text(b, k, l, i.toFixed(a.scale), h, "end"),
            q = a._text(b, k, n, j.toFixed(a.scale), h, "end");
          f.push(o, p, q)
        },
        _c2x_k: function(a, b) {
          var c = this.kChartBox.x;
          return c.begin + a * b + 1
        },
        _c2y_k: function(a) {
          var b = this.kChartBox.y,
            c = this.maxPrice,
            d = this.minPrice,
            e = 0,
            f = b.height - 2;
          return e = c - d,
            0 == e ? f / 2 : b.begin + (c - a) / e * f
        },
        _path: function(a, b, c, e, f) {
          var g = {},
            h = d.createNS("path");
          return a && (g.d = a),
          b && (g.stroke = b),
          c && (g.fill = c),
          e && (g["fill-opacity"] = e),
          f && (g["stroke-dasharray"] = f),
            d.attr(h, g),
            h
        },
        _text: function(a, b, c, e, f, g, i) {
          var j = d.createNS("text");
          return d.attr(j, {
            x: b,
            y: c,
            fill: f || h,
            style: {
              "text-anchor": g || "start",
              "font-size": "10px"
            }
          }),
            d.textContent(j, e),
            i ? d.insert(a, j, i) : d.append(a, j),
            j
        },
        _getDays: function(a, b) {
          return 0 === a && (a = b),
          0 === b && (b = a),
            Math.min(a, b)
        },
        half: function(a) {
          return (0 | a) + .5
        }
      },
        X.Kline = l
    } (jQuery, window);


  !function() {
    function a(a) {
      return "string" == typeof a
    }
    function b(a) {
      return a && "object" == typeof a
    }
    function c(a) {
      return void 0 !== a && null !== a
    }
    function d(a) {
      return "[object Array]" === Object.prototype.toString.call(a)
    }
    var e = function(a) {
        this.init.call(this, a)
      },
      f = "#000",/*起始线的字体颜色*/
      g = "#ddd",/*线的颜色*/
      h = "#999";/*右侧数据颜色*/
    e.prototype = {
      init: function(a) {
        this.wrap = document.getElementById(a.wrap) || document.body,
          this.wrap.innerHTML = "",
          this.svgElement = new i,
          this.svg = this.svgElement.createElement("svg"),
          this.baseG = this.svgElement.createElement("g"),
          this.markG = this.svgElement.createElement("g"),
          this.pathG = this.svgElement.createElement("g"),
          this.svgElement.attr(this.svg, {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1"
          }),
          this.svg.appendChild(this.baseG),
          this.svg.appendChild(this.markG),
          this.svg.appendChild(this.pathG),
          this.wrap.appendChild(this.svg),
          this.cacheEl = [],
          this.data = [],
          this.cacheData = {},
          this.dataLen = a.dataLen || 200,
          this.unit = a.unit || .01,
          this.multiple = a.multiple || 2,
          this.basePrice = 0,
          this.minPricePeriod = this.unit * this.multiple,
          this.pricePeriod = 6,
          this.beyond = 1,
          this.getChartSize(),
          this.drawFrame()
      },
      getChartSize: function() {
        var a = this,
          b = a.wrap,
          c = a.svg,
          d = a.svgElement,
          e = 0;
        this.svgWidth = d.getSize(b).width,
          this.svgHeight = d.getSize(b).height,
          this.chartBox = {
            x: {
              begin: e,
              end: a.svgWidth - e,
              width: a.svgWidth - 2 * e
            },
            y: {
              begin: e,
              end: a.svgHeight - e,
              height: a.svgHeight - 2 * e
            }
          },
          d.attr(c, {
            width: a.svgWidth,
            height: a.svgHeight
          })
      },
      drawFrame: function() {
        var a = this,
          b = a.chartBox,
          c = b.x,
          d = b.y,
          e = a.baseG,
          f = a.svgElement,
          h = c.begin,
          i = c.end,
          j = d.begin,
          k = d.end - 1,
          l = f.clear([j, k]);
        f.line({
            x1: h,
            y1: l[0],
            x2: i,
            y2: l[0],
            fill: "none",
            stroke: g
          },
          e),
          f.line({
              x1: h,
              y1: l[1],
              x2: i,
              y2: l[1],
              fill: "none",
              stroke: g
            },
            e)
      },
      drawBasePriceLine: function() {
        var a, b, c, d, e, f = this,
          i = f.chartBox,
          j = i.x,
          k = i.y,
          l = f.markG,
          m = f.cacheEl,
          n = f.svgElement,
          o = f.pricePeriod,
          p = f.minPricePeriod,
          q = 10,
          r = f.currentMax,
          s = k.height - 2 * q - 2,
          t = s / o,
          u = j.begin,
          v = k.begin + q + 1,
          w = f.basePrice.toFixed(f.digit).length,
          x = 6 * w + 10,
          y = j.end - x;
        for (a = 0; a <= o; a++) e = r - a * p,
          d = v + a * t,
          d = n.clear([d])[0],
          b = n.line({
              x1: u,
              y1: d,
              x2: y,
              y2: d,
              fill: "none",
              stroke: g
            },
            l),
          m.push(b),
          c = n.text(e.toFixed(f.digit), {
              x: y + 4,
              y: d + 3,
              fill: h,
              "text-anchor": "start",
              "font-size": "12px"
            },
            l),
          m.push(c)
      },
      drawPricePath: function() {
        function a(a) {
          return (z + (u - a) / i.unit * w | 0) + .5
        }
        function b(a) {
          return x + E * a
        }
        function c(b) {
          return "M" + x + "," + a(b)
        }
        var d, e, g, h, i = this,
          j = i.chartBox,
          k = j.x,
          l = j.y,
          m = i.dataLen,
          n = i.pathG,
          o = i.cacheEl,
          p = i.svgElement,
          q = i.data,
          r = i.basePrice,
          s = 10,
          t = l.height - 2 * s - 2,
          u = i.currentMax,
          v = i.currentMin,
          w = t / ((u - v) / i.unit),
          x = k.begin,
          y = k.end,
          z = l.begin + s + 1,
          A = r.toFixed(i.digit).length,
          B = 6 * A + 10,
          C = 15,
          D = y - B - C,
          E = D / m,
          F = "";
        for (e = 0; e < q.length; e++) d = q[e],
          g = b(e),
          h = a(d),
          0 == e ? F = c(d) : F += "L" + g + "," + h;
        F += "L" + (y - B) + "," + h,
          i.pricePath ? p.attr(i.pricePath, {
            d: F
          }) : i.pricePath = p.path({
              d: F,
              stroke: f,
              fill: "none"
            },
            n);
        var G = p.createElement("animate");
        p.attr(G, {
          attributeName: "r",
          values: "1;1.5;1",
          dur: ".5s",
          repeatCount: "indefinite"
        }),
          i.heartbeat ? p.attr(i.heartbeat, {
            cx: g,
            cy: h
          }) : (i.heartbeat = p.circle({
              cx: g,
              cy: h,
              r: 1,
              stroke: "#F3976C",
              fill: "#FF3366",
              "stroke-width": 1.5
            },
            n), i.heartbeat.appendChild(G));
        var H = p.rect({
            x: y - B,
            y: h - 7,
            width: B - 2,
            height: 13,
            rx: 3,
            ry: 3,
            fill: f
          },
          n);
        o.push(H);
        var I = p.text(d.toFixed(i.digit), {
            x: y - B + 4,
            y: a(d) + 4,
            fill: "#FFFFFF",
            "text-anchor": "start",
            "font-size": "12px"
          },
          n);
        o.push(I)
      },
      draw: function(a) {
        this.process(a),
          this.setMaxMin(),
          this.clear(),
          this.drawBasePriceLine(),
          this.drawPricePath()
      },
      clear: function() {
        var a, b, c = this,
          d = c.cacheEl,
          e = c.svgElement;
        for (a in d) b = d[a],
        b && e.remove(b);
        this.cacheEl.length = 0
      },
      process: function(a) {
        var b = this,
          c = b.data,
          d = this.cacheData,
          e = a.time,
          f = a.price;
        void 0 == d[e] && (d[e] = f, b.currentPrice = f, 0 == b.basePrice && (b.basePrice = f), c.length >= b.dataLen ? (c.shift(), c.push(f)) : c.push(f), b.unit.toString().indexOf(".") > 0 ? b.digit = b.unit.toString().length - 2 : b.digit = 0)
      },
      setMaxMin: function() {
        var a, b, c = this,
          d = c.data;
        c.maxPrice = a = Math.max.apply(Math, d),
          c.minPrice = b = Math.min.apply(Math, d);
        var e = c.pricePeriod,
          f = c.unit,
          g = c.multiple;
        c.currentMax || (c.currentMax = a),
        c.currentMin || (c.currentMin = b);
        var h = Math.ceil((a - b) / (e * f * g)),
          i = e / 2 * g;
        a == b ? (c.currentMax = c.basePrice + e / 2 * c.minPricePeriod, c.currentMin = c.basePrice - e / 2 * c.minPricePeriod) : (h != c.beyond && (c.beyond = h, c.minPricePeriod = f * g * h, c.setBasePrice()), (d.length >= i && (c.maxPrice <= c.basePrice || c.minPrice >= c.basePrice) || c.maxPrice > c.currentMax || c.minPrice < c.currentMin) && c.setBasePrice())
      },
      setBasePrice: function() {
        var a = this,
          b = a.maxPrice,
          c = a.minPrice,
          d = a.pricePeriod,
          e = Math.pow(10, a.digit);
        a.basePrice = Math.round(((b - c) / 2 + c) * e) / e,
          a.currentMax = a.basePrice + d / 2 * a.minPricePeriod,
          a.currentMin = a.basePrice - d / 2 * a.minPricePeriod
      }
    };
    var i = function() {};
    i.prototype = {
      SVG_NS: "http://www.w3.org/2000/svg",
      createElement: function(a) {
        return document.createElementNS(this.SVG_NS, a)
      },
      createText: function(a) {
        return document.createTextNode(a)
      },
      remove: function(a) {
        a.parentNode.removeChild(a)
      },
      g: function(a) {
        var b = this.createElement("g");
        return c(a) ? this.attr(b, {
          "class": a
        }) : b
      },
      line: function(a, b) {
        var c = this.createElement("line");
        return this.attr(c, a),
        b && b.appendChild(c),
          c
      },
      rect: function(a, b) {
        var c = this.createElement("rect");
        return this.attr(c, a),
        b && b.appendChild(c),
          c
      },
      circle: function(a, b) {
        var c = this.createElement("circle");
        return this.attr(c, a),
        b && b.appendChild(c),
          c
      },
      path: function(a, b) {
        var c = this.createElement("path");
        return this.attr(c, a),
        b && b.appendChild(c),
          c
      },
      text: function(a, b, c) {
        var d = this.createElement("text");
        this.attr(d, b, c);
        var e = this.createElement("tspan");
        return e.appendChild(this.createText(a)),
          d.appendChild(e),
        c && c.appendChild(d),
          d
      },
      getSize: function(a) {
        var b = a.getBoundingClientRect();
        return {
          width: b.width,
          height: b.height
        }
      },
      attr: function(d, e, f) {
        var g, h;
        if (a(e)) c(f) ? d.setAttribute(e, f) : d && d.getAttribute && (h = d.getAttribute(e));
        else if (c(e) && b(e)) for (g in e) d.setAttribute(g, e[g]);
        return h
      },
      clear: function(a) {
        d(a) || (a = [a]);
        var b, c, e = a.length,
          f = [];
        for (b = 0; b < e; b++) c = 0 | a[b],
          f.push(c + .5);
        return f
      },
      css: function(a, b) {
        this.extend(a.style, b)
      },
      extend: function(a, b) {
        var c;
        a || (a = {});
        for (c in b) a[c] = b[c];
        return a
      }
    },
      X.Tick = e
  } ();

})

