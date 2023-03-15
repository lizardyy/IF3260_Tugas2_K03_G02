
var worldMatrix
var matWorldLocation

/* Dropdown Handler */
function toggleDropdown(dropdownId) {
    var dropdowns = document.querySelectorAll('.dropdown.show');
    dropdowns.forEach(function(dropdown) {
        if (dropdown.id !== dropdownId) {
            dropdown.classList.remove("show");
        }
    });

    var dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("show");
  }

/* Range value Handler */
const inputs = [
  {input: document.getElementById('x-rotation'), value: document.getElementById('x-rotation-value'), unit: '°'},
  {input: document.getElementById('y-rotation'), value: document.getElementById('y-rotation-value'), unit: '°'},
  {input: document.getElementById('z-rotation'), value: document.getElementById('z-rotation-value'), unit: '°'},
  {input: document.getElementById('x-scale'), value: document.getElementById('x-scale-value'), unit: ''},
  {input: document.getElementById('y-scale'), value: document.getElementById('y-scale-value'), unit: ''},
  {input: document.getElementById('z-scale'), value: document.getElementById('z-scale-value'), unit: ''},
  {input: document.getElementById('x-translate'), value: document.getElementById('x-translate-value'), unit: ''},
  {input: document.getElementById('y-translate'), value: document.getElementById('y-translate-value'), unit: ''},
  {input: document.getElementById('z-translate'), value: document.getElementById('z-translate-value'), unit: ''},
  {input: document.getElementById('angle-camera'), value: document.getElementById('angle-camera-value'), unit: '°'},
  {input: document.getElementById('radius-camera'), value: document.getElementById('radius-camera-value'), unit: ''}
];

inputs.forEach(({input, value, unit}) => {
  input.addEventListener('input', () => {
    value.innerText = input.value + unit;
  });
});


/* Upload Handler */
document.addEventListener("DOMContentLoaded", function() {
  const uploadButton = document.getElementById("upload-button");
  const fileInput = document.getElementById("file-input");

  uploadButton.addEventListener("click", function() {
    fileInput.click();
  });
});

window.onload = function init() {
  canvas = document.getElementById("canvas");
  console.log(canvas)
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL isn't available"); }
  gl.clearColor(0.8, 0.8, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  

  var boxVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBuffer);
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model[0]), gl.STATIC_DRAW);

  var boxIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices[0]), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition,3,gl.FLOAT,gl.FALSE,6 * Float32Array.BYTES_PER_ELEMENT,0);
  gl.enableVertexAttribArray(vPosition);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor,3,gl.FLOAT,gl.FALSE,6 * Float32Array.BYTES_PER_ELEMENT,3 * Float32Array.BYTES_PER_ELEMENT,);
  gl.enableVertexAttribArray(vColor);

  gl.useProgram(program);

  matWorldLocation = gl.getUniformLocation(program, 'mWorld');
  var matViewLocation = gl.getUniformLocation(program, 'mView');
  var matProjLocation = gl.getUniformLocation(program, 'mProj');


  worldMatrix = new Float32Array(16);
  var viewMatrix = new Float32Array(16);
  var projMatrix = new Float32Array(16);
  lookAt(viewMatrix, [0, 2, -5], [0, 0, 0], [0, 1, 0]);
  perspective(projMatrix, toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

  gl.uniformMatrix4fv(matWorldLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjLocation, gl.FALSE, projMatrix);

//   /* Shape Button Handler */
  const buttons = document.querySelectorAll('.shape');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  render();
}

function render() {

  var mIdentity = new Float32Array(16);
  identity(mIdentity);
  var rotAngle =0
  var loop = () => {
    rotAngle = performance.now() / 10000 * Math.PI;
    axis = [0, 1, 0]
    rotate(worldMatrix, mIdentity, rotAngle, axis );
    gl.uniformMatrix4fv(matWorldLocation, gl.FALSE, worldMatrix);
    gl.clearColor(0.6, 0.6, 0.6, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices[0].length, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}


const toRadian = (deg) => {
  return deg / 180 * Math.PI;
}
