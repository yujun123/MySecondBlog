function getRoundedCanvas(sourceCanvas) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
  context.fill();
  return canvas;
};

window.onload = function () {
  'use strict';

  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var download = document.getElementById('download');
  var actions = document.getElementById('actions');
  var previews = document.querySelectorAll('.preview');
  // var dataX = document.getElementById('dataX');
  // var dataY = document.getElementById('dataY');
  // var dataHeight = document.getElementById('dataHeight');
  // var dataWidth = document.getElementById('dataWidth');
  // var dataRotate = document.getElementById('dataRotate');
  // var dataScaleX = document.getElementById('dataScaleX');
  // var dataScaleY = document.getElementById('dataScaleY');
  var options = {
    aspectRatio: 1,
    preview: '.img-preview',
    viewMode: 1,
    dragMode:'move',
    minContainerWidth: 650,
    minContainerHeight: 500,
    ready: function (e) {
      console.log(e.type);

      var clone = this.cloneNode();

      clone.className = '';
      clone.style.cssText = (
          'display: block;' +
          'width: 100%;' +
          'min-width: 0;' +
          'min-height: 0;' +
          'max-width: none;' +
          'max-height: none;'
      );
      each(previews, function (elem) {
        var croppedCanvas;
        var roundedCanvas;
        var roundedImage = document.getElementById('img');

        if (!croppable) {
          return;
        }

        // Crop
        croppedCanvas = cropper.getCroppedCanvas();

        // Round
        roundedCanvas = getRoundedCanvas(croppedCanvas);

        // Show
        // roundedImage = document.createElement('img');
        roundedImage.src = roundedCanvas.toDataURL();
        elem.innerHTML = '';
        elem.appendChild(roundedImage);
      });
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },

    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    },
    crop: function (event) {
      var data = event.detail;
      var cropper = this.cropper;

      var croppedCanvas;
      var roundedCanvas;
      var roundedImage = document.getElementById('img');

      // Crop
      croppedCanvas = cropper.getCroppedCanvas();

      // Round
      roundedCanvas = getRoundedCanvas(croppedCanvas);

      // Show

      roundedImage.src = roundedCanvas.toDataURL();

    },
  };
  var cropper = new Cropper(image, options);
  var originalImageURL = image.src;
  var uploadedImageType = 'image/jpeg';
  var uploadedImageName = 'cropped.jpg';
  var uploadedImageURL;

  // Tooltip    // crop: function (e) {
  //     //   var data = e.detail;
  //     //
  //     //   console.log(e.type);
  //     //   dataX.value = Math.round(data.x);
  //     //   dataY.value = Math.round(data.y);
  //     //   dataHeight.value = Math.round(data.height);
  //     //   dataWidth.value = Math.round(data.width);
  //     //   dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
  //     //   dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
  //     //   dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
  //     // },
  $('[data-toggle="tooltip"]').tooltip();

  // Buttons
  if (!document.createElement('canvas').getContext) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }

  // Download
  // if (typeof download.download === 'undefined') {
  //   download.className += ' disabled';
  //   download.title = 'Your browser does not support download';
  // }

  // Options
  // actions.querySelector('.docs-toggles').onchange = function (event) {
  //   var e = event || window.event;
  //   var target = e.target || e.srcElement;
  //   var cropBoxData;
  //   var canvasData;
  //   var isCheckbox;
  //   var isRadio;
  //
  //   if (!cropper) {
  //     return;
  //   }
  //
  //   if (target.tagName.toLowerCase() === 'label') {
  //     target = target.querySelector('input');
  //   }
  //
  //   isCheckbox = target.type === 'checkbox';
  //   isRadio = target.type === 'radio';
  //
  //   if (isCheckbox || isRadio) {
  //     if (isCheckbox) {
  //       options[target.name] = target.checked;
  //       cropBoxData = cropper.getCropBoxData();
  //       canvasData = cropper.getCanvasData();
  //
  //       options.ready = function () {
  //         console.log('ready');
  //         cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
  //       };
  //     } else {
  //       options[target.name] = target.value;
  //       options.ready = function () {
  //         console.log('ready');
  //       };
  //     }
  //
  //     // Restart
  //     cropper.destroy();
  //     cropper = new Cropper(image, options);
  //   }
  // };

  // Methods
  actions.querySelector('.docs-buttons').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropped;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }

      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option') || undefined,
      secondOption: target.getAttribute('data-second-option') || undefined
    };

    cropped = cropper.cropped;

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            cropper.clear();
          }

          break;

        case 'getCroppedCanvas':
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }

          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            cropper.crop();
          }

          break;

        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!download.disabled) {
              download.download = uploadedImageName;
              download.href = result.toDataURL(uploadedImageType);
            }
          }

          break;

        case 'destroy':
          cropper = null;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            image.src = originalImageURL;
          }

          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  document.body.onkeydown = function (event) {
    var e = event || window.event;

    if (e.target !== this || !cropper || this.scrollTop > 300) {
      return;
    }

    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        cropper.move(-1, 0);
        break;

      case 38:
        e.preventDefault();
        cropper.move(0, -1);
        break;

      case 39:
        e.preventDefault();
        cropper.move(1, 0);
        break;

      case 40:
        e.preventDefault();
        cropper.move(0, 1);
        break;
    }
  };

  // Import image
  var inputImage = document.getElementById('inputImage');

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          uploadedImageType = file.type;
          uploadedImageName = file.name;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          image.src = uploadedImageURL = URL.createObjectURL(file);
          cropper.destroy();
          cropper = new Cropper(image, options);
          inputImage.value = null;
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }
};

function each(arr, callback) {
  var length = arr.length;
  var i;

  for (i = 0; i < length; i++) {
    callback.call(arr, arr[i], i, arr);
  }

  return arr;
}