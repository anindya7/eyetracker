'use strict';

if (typeof module !== 'undefined') module.exports = simpleheat;

function simpleheat(canvas) {
    if (!(this instanceof simpleheat)) return new simpleheat(canvas);

    this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;

    this._max = 1;
    this._data = [];
    this._background = [];
}


simpleheat.prototype = {

    defaultRadius: 25,

    defaultGradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red'
    },

    data: function (data) {
        this._data = data;
        return this;
    },

    max: function (max) {
        this._max = max;
        return this;
    },

    add: function (point) {
        this._data.push(point);
        return this;
    },

    clear: function () {
        this._data = [];
        return this;
    },

    radius: function (r, blur) {
        blur = blur === undefined ? 15 : blur;

        // create a grayscale blurred circle image that we'll use for drawing points
        var circle = this._circle = this._createCanvas(),
            ctx = circle.getContext('2d'),
            r2 = this._r = r + blur;

        circle.width = circle.height = r2 * 2;

        ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
        ctx.shadowBlur = blur;
        ctx.shadowColor = 'black';

        ctx.beginPath();
        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        return this;
    },

    resize: function () {
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    },

    gradient: function (grad) {
        // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
        var canvas = this._createCanvas(),
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);

        canvas.width = 1;
        canvas.height = 256;

        for (var i in grad) {
            gradient.addColorStop(+i, grad[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._grad = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    },

    draw: function (minOpacity, type) {
        if (!this._circle) this.radius(this.defaultRadius);
        if (!this._grad) this.gradient(this.defaultGradient);

        var ctx = this._ctx;

        ctx.clearRect(0, 0, this._width, this._height);

        for (var i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.globalAlpha = Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity);
            ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
        }

        // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
        var colored = ctx.getImageData(0, 0, this._width, this._height);

        if (type == 'color') {
            this._colorize(colored.data, this._grad);
        } else {
            this._invert(colored.data);
        }
        ctx.putImageData(colored, 0, 0);

        return this;
    },

    drawBG: function (projectId, minOpacity, type, bgImage) {
        if (!this._circle) this.radius(this.defaultRadius);
        if (!this._grad) this.gradient(this.defaultGradient);

        var ctx = this._ctx;
        var parent = this;

        ctx.clearRect(0, 0, this._width, this._height);

        this._background[projectId] = new Image();
        this._background[projectId].src = bgImage;
        this._background[projectId].crossOrigin = 'anonymous';

        this._background[projectId].onload = function() {

            var heatmap = document.createElement('canvas');
            heatmap.width = parent._width;
            heatmap.height = parent._height;
            var heatmapCtx = heatmap.getContext('2d');

            for (var i = 0, len = parent._data.length, p; i < len; i++) {
                p = parent._data[i];
                heatmapCtx.globalAlpha = Math.max(p[2] / parent._max, minOpacity === undefined ? 0.05 : minOpacity);
                heatmapCtx.drawImage(parent._circle, p[0] - parent._r, p[1] - parent._r);
            }

            var colored = heatmapCtx.getImageData(0, 0, parent._width, parent._height);

            if (type == 'color') {
                parent._colorize(colored.data, parent._grad);
            } else {
                parent._invert(colored.data);
            }
            // ctx.globalAlpha = 1;
            heatmapCtx.putImageData(colored, 0, 0);

            ctx.drawImage(parent._background[projectId], 0, 0, this.width, this.height, 0, 0, parent._width, parent._height);
            ctx.drawImage(heatmap, 0, 0);
        };

        return this;
    },

    _invert: function (pixels) {
        // Loop through set of fours due to four color channels: red, green, blue, alpha
        for (var i = 0; i < pixels.length; i += 4) {
            // Ensure that all color channels are fully white
            pixels[i] = 0;                      // Red channel
            pixels[i + 1] = 0 ;                  // Green channel
            pixels[i + 2] = 0;                  // Blue channel
            pixels[i + 3] = 255 - pixels[i + 3];  // Alpha channel
        }
    },

    _colorize: function (pixels, gradient) {
        for (var i = 0; i < pixels.length; i += 4) {
            var j = pixels[i + 3] * 4; // get gradient color from opacity value
            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
                pixels[i + 3] = Math.min(pixels[i + 3],150);  // Alpha channel
            }
        }
    },

    _createCanvas: function () {
        if (typeof document !== 'undefined') {
            return document.createElement('canvas');
        } else {
            // create a new canvas instance in node.js
            // the canvas class needs to have a default constructor without any parameter
            return new this._canvas.constructor();
        }
    }
};