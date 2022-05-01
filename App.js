// original 
var canvas = new fabric.Canvas('canvas');

document.getElementById("uploader").onchange = function(e) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.src = e.target.result;
    image.onload = function() {
      var img = new fabric.Image(image);
      img.set({
        left: 400,
        top: 80
      });
      img.scaleToWidth(200);
      canvas.centerObject(img);
      canvas.add(img).setActiveObject(img).renderAll();
    }
  }
  reader.readAsDataURL(e.target.files[0]);
}

// last option
canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 1) zoom = 1;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
  var vpt = this.viewportTransform;
  console.log(vpt);
  if (zoom < 1000 / 1000) {
    vpt[4] = 500 - 1000 * zoom / 2;
    vpt[5] = 500 - 1000 * zoom / 2;
  } else {
    if (vpt[4] >= 0) {
      vpt[4] = 0;
    } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
      vpt[4] = canvas.getWidth() - 1000 * zoom;
    }
    if (vpt[5] >= 0) {
      vpt[5] = 0;
    } else if (vpt[5] < canvas.getHeight() - 800 * zoom) {
      vpt[5] = canvas.getHeight() - 1000 * zoom;
    }
  }
});




    