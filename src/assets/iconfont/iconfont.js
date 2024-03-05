/* eslint-disable */
(window._iconfont_svg_string_4453847 =
  '<svg><symbol id="icon-qiehuan" viewBox="0 0 1024 1024"><path d="M575.914667 725.333333a21.397333 21.397333 0 0 1-21.248-21.162666V319.829333A21.184 21.184 0 0 1 576 298.666667c11.776 0 21.333333 9.706667 21.333333 21.162666v333.909334l85.568-85.568a21.226667 21.226667 0 0 1 30.101334 0.064c8.32 8.32 8.213333 21.973333 0.085333 30.101333l-120.832 120.810667a21.141333 21.141333 0 0 1-16.341333 6.186666z m-152.789334-426.325333a21.418667 21.418667 0 0 1 24.896 20.864V704.213333a21.205333 21.205333 0 0 1-21.333333 21.162667c-11.797333 0-21.354667-9.706667-21.354667-21.162667V364.266667l-91.669333 91.605333a21.248 21.248 0 0 1-30.122667-0.064 21.418667 21.418667 0 0 1-0.064-30.101333l120.896-120.810667a21.184 21.184 0 0 1 18.752-5.888z m252.202667-181.290667A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z" fill="#3D3D3D" ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName('script'))[t.length - 1],
      e = t.getAttribute('data-injectcss'),
      t = t.getAttribute('data-disable-injectsvg');
    if (!t) {
      var i,
        o,
        c,
        a,
        d,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e);
        };
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
          );
        } catch (t) {
          console && console.log(t);
        }
      }
      (i = function () {
        var t,
          e = document.createElement('div');
        (e.innerHTML = n._iconfont_svg_string_4453847),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild
              ? s(e, t.firstChild)
              : t.appendChild(e));
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(i, 0)
            : ((o = function () {
                document.removeEventListener('DOMContentLoaded', o, !1), i();
              }),
              document.addEventListener('DOMContentLoaded', o, !1))
          : document.attachEvent &&
            ((c = i),
            (a = n.document),
            (d = !1),
            r(),
            (a.onreadystatechange = function () {
              'complete' == a.readyState &&
                ((a.onreadystatechange = null), l());
            }));
    }
    function l() {
      d || ((d = !0), c());
    }
    function r() {
      try {
        a.documentElement.doScroll('left');
      } catch (t) {
        return void setTimeout(r, 50);
      }
      l();
    }
  })(window);
