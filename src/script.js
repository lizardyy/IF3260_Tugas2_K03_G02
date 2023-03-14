var colors = [];
var points = [];
var rotationMatrix;
var rotationMatrixLoc;

var NumVertices = 36
var angle = 0.0;
var axis = [0, 1, 0];

var trackingMouse = false;
var trackballMove = false;

var lastPos = [0, 0, 0];
var curx, cury;
var startX, startY;

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

/* Upload Handler */
document.addEventListener("DOMContentLoaded", function() {
  const uploadButton = document.getElementById("upload-button");
  const fileInput = document.getElementById("file-input");

  uploadButton.addEventListener("click", function() {
    fileInput.click();
    console.log("kepencet");
  });
});

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL isn't available"); }
  colorCube();
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.8, 0.8, 0.8, 1.0);

  gl.enable(gl.DEPTH_TEST);

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);


  rotationMatrix = createrotationMatrix(
    radians(angle), // convert to radians
    axis
  );
  rotationMatrixLoc = gl.getUniformLocation(program, "r");
  gl.uniformMatrix4fv(rotationMatrixLoc, false, flatten(rotationMatrix));


  /* Shape Button Handler */
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

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
  requestAnimFrame(render);
}

function colorCube() {

  quad(0, 1, 2, 1);
  quad(3, 4, 5, 3);
  quad( 2,0,3,5)
  quad(4,1,2,5)
  quad(4,1,0,3)
}

function quad(a, b, c, d) {
  var vertices = [
    // vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.3, 0.3, 0.3, 1.0),
    vec4(0.3, 0.3, 0.3, 1.0),
    vec4(0.3, -0.3, 0.3, 1.0),
    // vec4(-0.3, -0.3, -0.3, 1.0),
    vec4(-0.3, 0.3, -0.3, 1.0),
    vec4(0.3, 0.3, -0.3, 1.0),
    vec4(0.3, -0.3, -0.3, 1.0)
  ];

  var vertexColors = [
    [0.0, 0.0, 0.0, 1.0],  // black
    [1.0, 0.0, 0.0, 1.0],  // red
    [1.0, 1.0, 0.0, 1.0],  // yellow
    [0.0, 1.0, 0.0, 1.0],  // green
    [0.0, 0.0, 1.0, 1.0],  // blue
    [1.0, 0.0, 1.0, 1.0],  // magenta
    [0.0, 1.0, 1.0, 1.0],  // cyan
    [1.0, 1.0, 1.0, 1.0]   // white
  ];

  var indices = [a, b, c, a, c, d];

  for (var i = 0; i < indices.length; ++i) {
    points.push(vertices[indices[i]]);

    colors.push(vertexColors[a]);

  }
}

function createrotationMatrix(angle, axis) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var t = 1 - c;
  var x = axis[0], y = axis[1], z = axis[2];
  var tx = t * x, ty = t * y;
  return [
    tx * x + c, tx * y - s * z, tx * z + s * y, 0,
    tx * y + s * z, ty * y + c, ty * z - s * x, 0,
    tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
    0, 0, 0, 1
  ];
}

function radians(degrees) {
  return degrees * Math.PI / 180;
}

function normalize(vec) {
  var len = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
  if (len == 0) {
    return [0, 0, 0];
  }
  return [vec[0] / len, vec[1] / len, vec[2] / len];
}


