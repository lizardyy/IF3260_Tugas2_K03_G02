
var worldMatrix
var matWorldLocation
var state
var mIdentity

var rotAngle =[0,0,0]
var translation = [0,0,0];
var scale = [1, 1, 1];

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

/* Default State */
function defaultState() {
  state = {
    animation : true,
    time : 0,
    number : 0,
    shading : true,
    color : [0.2 ,0.1 , 0.4],
  };
}

/* Initialize */
window.onload = function init() {
  canvas = document.getElementById("canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL isn't available"); }
  gl.clearColor(0.125, 0.125, 0.118, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  
  var boxVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBuffer);
  
  var boxIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBuffer);

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


  // worldMatrix = new Float32Array(16);
  var viewMatrix = new Float32Array(16);
  var projMatrix = new Float32Array(16);
  lookAt(viewMatrix, [0, 0, 5], [0, 0, 0], [0, 1, 0]);
  perspective(projMatrix, toRadian(45), canvas.width / canvas.height, 0.1, 100.0);

  // gl.uniformMatrix4fv(matWorldLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjLocation, gl.FALSE, projMatrix);

/* Shape Button Handler */
  const buttons = document.querySelectorAll('.shape');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  defaultState();
  render();
}

/* Render */
function render() {
  mIdentity = new Float32Array(16);
  identity(mIdentity);
  gl.drawElements(gl.TRIANGLES, indices[0].length, gl.UNSIGNED_SHORT, 0);
  var loop = () => {
    if (state.animation){
      state.time++;
      rotAngle[0] = state.time / 1000 * Math.PI;
      rotAngle[1] = state.time / 2000 * Math.PI;
      rotAngle[2] = state.time / 3000 * Math.PI;
    } 

    worldMatrix = transformMatrix.projection(2,2, 2)
    worldMatrix = transformMatrix.translate(worldMatrix, translation[0], translation[1], translation[2]);
    worldMatrix = transformMatrix.xRotate(worldMatrix, rotAngle[0]);
    worldMatrix = transformMatrix.yRotate(worldMatrix, rotAngle[1]);
    worldMatrix = transformMatrix.zRotate(worldMatrix, rotAngle[2]);
    worldMatrix = transformMatrix.scale(worldMatrix, scale[0], scale[1], scale[2]);

    gl.uniformMatrix4fv(matWorldLocation, gl.FALSE, worldMatrix);

    gl.clearColor(0.125, 0.125, 0.118, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model[state.number]), gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices[state.number]), gl.STATIC_DRAW);
    gl.drawElements(gl.TRIANGLES, indices[state.number].length, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

const toRadian = (deg) => {
  return deg / 180 * Math.PI;
}

const hexToRgb = (hex) => {
  var r = parseInt(hex.slice(1, 3), 16) / 255;
  var g = parseInt(hex.slice(3, 5), 16) / 255;
  var b = parseInt(hex.slice(5, 7), 16) / 255;

  return [r, g, b];
}


function changeShape(model){
  if (model=='cube'){
    state.number = 0;
  } else if (model=='triangular-prism'){
    state.number = 1;
  } else if (model=='square-pyramid'){
    state.number = 2;
  }
}

function shaderModel(color){
  let r = color[0]
  let g = color[1]
  let b = color[2]

  if (state.shading){
    for (var i = 0; i < model.length; i++){
      var sides = 6;
      if (state.number == 1){
        sides = 5;
      }
      var color = [0.0, 0.0, 0.0];
      for (var j = 3; j < model[i].length; j+=6){
        if (j < sides * 24){
          color = [(0.3+r)/1.4,(0.3+g)/1.4,(0.3+b)/1.4];
        } else if (j >= sides * 24 && j < sides * 2 * 24){
          color = [r/1.3,g/1.3,b/1.3];
        } else {
          color = [r,g,b];
        }
        model[i][j] = color[0];
        model[i][j+1] = color[1];
        model[i][j+2] = color[2];
      }
    }
  } else {
    for (var i = 0; i < model.length; i++){
      for (var j = 3; j < model[i].length; j+=6){
        model[i][j] = r;
        model[i][j+1] = g;
        model[i][j+2] = b;
      }
    }
  }
}

function changeShading(e) {
  state.shading = document.querySelector("#shading").checked;
  shaderModel(state.color);
}

document.getElementById("shading").addEventListener('change', changeShading, false);

function changeAnimation(e) {
  state.animation = document.querySelector("#animation").checked;
}

document.getElementById("animation").addEventListener('change', changeAnimation, false);

function changeColor(e) {
  state.color = hexToRgb(document.querySelector("#color-picker").value);
  shaderModel(state.color);
}

document.getElementById("color-picker").addEventListener('input', changeColor, false);


function rotateModel(id, angle) {
  stopAnimation()
  rotAngle[id] = toRadian(angle)
}

function translateModel(id, value) {
  stopAnimation()
  translation[id] = value
}

function scaleModel(id, value){
  stopAnimation()
  scale[id] = value
}

function stopAnimation(){
  document.getElementById("animation").checked = false;
  state.animation = false
  rotAngle[0] =0
}