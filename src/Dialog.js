Dialog = function (url, target, options)
{
  this.url = url || "";
  this.target = target || "";
  this.opts = typeof options !== "undefined" ? options : {};

  // fill in missing options
  if (!this.opts.w)
    this.opts.w = 400;
  if (!this.opts.h)
    this.opts.h = 400;
  if (typeof this.opts.t === "undefined")
    this.opts.t = Math.floor(200 * Math.random());
  if (typeof this.opts.l === "undefined")
    this.opts.l = Math.floor(200 * Math.random());
  if (!this.opts.parent)
    this.opts.parent = window;
  if (!this.opts.parent.openedFolders)
    this.opts.parent.openedFolders = {};
  if (!this.opts.title)
    this.opts.title = "";
  if (!this.opts.fit)
    this.opts.fit = false;
  if (!this.opts.multi)
    this.opts.multi = false;

  // check if I should open
  if (this.opts.parent.openedFolders[target] && !this.opts.multi)
    return;
  this.opts.parent.openedFolders[target] = true;

  this.id = Math.floor(20000 * Math.random());
//  var close = "jQuery('#" + this.id + "').remove(); openedFolders." + target + "=false;";
  this.el = document.createElement('div');
  this.el.className = "popup-wrap floating";
  this.el.style.width = this.opts.w + "px";
  this.el.style.height = this.opts.h + "px";
  this.el.style.top = this.opts.t + "px";
  this.el.style.left = this.opts.l + "px";
  this.el.style.display = "none";


  var handle = document.createElement('div');
  handle.className = "popup-handle popup-draggable";
  var handleLeft = document.createElement('div');
  handleLeft.className = "popup-handle-left";
  var handleCentre = document.createElement('div');
  handleCentre.className = "popup-handle-centre";
  var handleRight = document.createElement('div');
  handleRight.className = "popup-handle-right";

  var mid = document.createElement('div');
  mid.className = "popup-mid";
  var midLeft = document.createElement('div');
  midLeft.className = "popup-mid-left popup-draggable";
  var midCentre = document.createElement('div');
  midCentre.className = "popup-mid-centre";
  var midRight = document.createElement('div');
  midRight.className = "popup-mid-right popup-draggable";

  var footer = document.createElement('div');
  footer.className = "popup-footer popup-draggable";
  var footerLeft = document.createElement('div');
  footerLeft.className = "popup-footer-left";
  var footerCentre = document.createElement('div');
  footerCentre.className = "popup-footer-centre";
  var footerRight = document.createElement('div');
  footerRight.className = "popup-footer-right";



  // action buttons
  var actions = document.createElement('div');
  actions.className = "popup-actions";
  var close = document.createElement('img');
  close.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAB3RJTUUH3wcLEQ0Pcmj10AAAAXJJREFUOMut1C9vFFEUBfDfvI6CBkVStaKiqNqahhCyDYLgMOBwlXwDVD9AU2TdOMbgyArapoLUYFcQ7FY1KP40IaE7NXeal2Vn2oXeZPKSee+ed+5995xCR/x59WKAdWzgXvz+js8Yl1U9mZdXdAA9x0s8wF0sxfYFfuEr3uH9LHAxA7aJN3iIOx2XNrGe4xN2yqo++QswA9sKRsU1gE0wPsxBi6zMt3iWgRX6o8lAP+B1WdWTFJtDPFoATHZuKXKHUAS7fTxB6nqsHpYwxUdsJwyw2tOz61i26yoGCWtY8f+xgrW2xLQgs3lMk6xntxYJZ/iRNfhfogmMs4QxJrdAboJxW/IIv7NhXYRZE7kjSCHuA3yZkdVNZ7CJ3IMrpYQO93B6Q9D8zCn2Wi1fvXJZ1RV2oxfTrJyubxpndyO30w+fYhuPsTxntKb4iWPsl1U96jXYzH2G2AyTvR9b38JcT3A0z7V71RHAQu/taOiyf7gEz+N+w+ZNWw4AAAAASUVORK5CYII%3D";
  close.className = "popup-close";
  var self = this;
  actions.onclick = function () {
    self.close();
  };

  // var title = document.createElement('div');
  // title.className = "popup-title";
  // title.innerText = this.opts.title;
  var content = document.createElement('div');
  content.className = "popup-content";
  this.iframe = document.createElement('iframe');
  this.iframe.className = "popup-iframe";
  this.iframe.src = this.url;
  this.iframe.name = this.target;
  this.iframe.onload = function () {
    self.iframe.contentWindow.document.iframeId = self.id;
    if (self.opts.fit) {
      var w = self.iframe.contentWindow.document.getElementById('cnt').width;
      var h = self.iframe.contentWindow.document.getElementById('cnt').height;
      self.el.style.width = w+"px";
      self.el.style.height = h+"px";
      self.el.style.paddingRight = "0";
      self.el.style.paddingBottom = "0";
    }
    self.el.style.display = "";
  }
  var cover = document.createElement('div');
  cover.className = "popup-iframe-cover";

  content.appendChild(this.iframe);
  // action buttons
  content.appendChild(cover);
  actions.appendChild(close);
  handle.appendChild(actions);
  // handle.appendChild(title);
  midCentre.appendChild(content);

  // structure
  handle.appendChild(handleLeft);
  handle.appendChild(handleCentre);
  handle.appendChild(handleRight);
  mid.appendChild(midLeft);
  mid.appendChild(midCentre);
  mid.appendChild(midRight);
  footer.appendChild(footerLeft);
  footer.appendChild(footerCentre);
  footer.appendChild(footerRight);
  this.el.appendChild(handle);
  this.el.appendChild(mid);
  this.el.appendChild(footer);

  this.el.id = this.id;

  this.opts.parent.document.body.appendChild(this.el);
  // jQuery(this.el).position({
  //   my: "left top",
  //   at: "left+" + this.opts.l + " top+" + this.opts.t,UI
  //   of: this.opts.parent
  // });
  return this.popupise();
  this.closed = false;
};

Dialog.prototype.popupise = function ()
{
  var self = this;
  self.opts.parent.jQuery(self.el)
          // .resizable({
          //   minHeight: 150,
          //   minWidth: 150,
          //   start: function (event, ui) {
          //     self.opts.parent.jQuery(".popup-iframe-cover").css('z-index', 3000);
          //   },
          //   stop: function (event, ui) {
          //     self.opts.parent.jQuery(".popup-iframe-cover").css('z-index', -1);
          //   }
          // })
          .draggable({
            iframeFix: true,
            handle: "div.popup-draggable",
            stack: ".floating"
          })
          .bind("click", function (e) {
            // since we contain an iframe, this is actually bound only to
            // the toolbar
            var largestZ = 1000;
            self.opts.parent.jQuery(".floating").each(function (i) {
              var currentZ = parseFloat(self.opts.parent.jQuery(this).css("zIndex"));
              largestZ = currentZ > largestZ ? currentZ : largestZ;
            });
            self.opts.parent.jQuery(self.el).css("zIndex", largestZ + 1);
          });
  // self.opts.parent.jQuery( ".popup-handle" ).disableSelection(); // better use css
};

Dialog.prototype.focus = function ()
{
  return this.el.focus();
};

Dialog.prototype.close = function ()
{
  this.closed = true;
  this.opts.parent.openedFolders[this.target] = false;
  this.opts.parent.jQuery(this.el).remove();
};
