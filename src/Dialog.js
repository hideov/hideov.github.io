Dialog = function (url, target, options)
{
  this.url = url || "";
  this.target = target || "";
  this.opts = typeof options !== "undefined" ? options : {};

  // fill in missing options
  if (!this.opts.w)
    this.opts.w = jQuery(window).width() - 300; // 400;
  if (!this.opts.h)
    this.opts.h = jQuery(window).height() - 200; // 400;
  if (typeof this.opts.t === "undefined")
    this.opts.t = 100; // Math.floor(200 * Math.random());
  if (typeof this.opts.l === "undefined")
    this.opts.l = 150; // Math.floor(200 * Math.random());
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
  handleLeft.className = "popup-handle popup-left";
  var handleCentre = document.createElement('div');
  handleCentre.className = "popup-handle popup-centre";
  var handleRight = document.createElement('div');
  handleRight.className = "popup-handle popup-right";

  var mid = document.createElement('div');
  mid.className = "popup-mid";
  var midLeft = document.createElement('div');
  midLeft.className = "popup-mid popup-left popup-draggable";
  var midCentre = document.createElement('div');
  midCentre.className = "popup-mid popup-centre";
  var midRight = document.createElement('div');
  midRight.className = "popup-mid popup-right popup-draggable";

  var footer = document.createElement('div');
  footer.className = "popup-footer popup-draggable";
  var footerLeft = document.createElement('div');
  footerLeft.className = "popup-footer popup-left";
  var footerCentre = document.createElement('div');
  footerCentre.className = "popup-footer popup-centre";
  var footerRight = document.createElement('div');
  footerRight.className = "popup-footer popup-right";


  // action buttons
  var actions = document.createElement('div');
  actions.className = "popup-actions";
  var close = document.createElement('img');
  close.src = "/asset/ui/dialog/close.png";
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

  // return this.popupise();
  // this.closed = false;
};

Dialog.prototype.fill = function () {
  this.el.style.width = (jQuery(window).width() - 300) + "px";
  this.el.style.height = (jQuery(window).height() - 200) + "px";
}

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
