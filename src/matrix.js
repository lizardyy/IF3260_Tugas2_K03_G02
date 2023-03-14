function identity(out) {
    out[0] = 1; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = 1; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[10] = 1; out[11] = 0;
    out[12] = 0; out[13] = 0; out[14] = 0; out[15] = 1;
    return out;
}

function rotate(out, a, rad, axis) {
    let x = axis[0], y = axis[1], z = axis[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    if (len === 0) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
}

function lookAt(out, eye, center, up){
    let zAxis = normalize(subtract(eye, center));
    let xAxis = normalize(cross(up, zAxis));
    let yAxis = cross(zAxis, xAxis);

    out[0] = xAxis[0]; out[1] = yAxis[0]; out[2] = zAxis[0]; out[3] = 0;
    out[4] = xAxis[1]; out[5] = yAxis[1]; out[6] = zAxis[1]; out[7] = 0;
    out[8] = xAxis[2]; out[9] = yAxis[2]; out[10] = zAxis[2]; out[11] = 0; 
    out[12] = -dot(xAxis, eye); out[13] = -dot(yAxis, eye); out[14] = -dot(zAxis, eye); out[15] = 1;
}

function perspective(out, fov, aspect, near, far) {
    let f = 1.0 / Math.tan(fov / 2);
    let nf = 1 / (near - far);

    out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0; 
    out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0; 
    out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
    out[12] = 0; out[13] = 0; out[14] = 2 * far * near * nf; out[15] = 0;
}

function normalize(vec) {
    const len = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
    if (len > 0) {
        vec[0] /= len;
        vec[1] /= len;
        vec[2] /= len;
    }
    return vec;
}

function subtract( a, b) {
    var out = new Float32Array(a.length);
    for (let i = 0; i < a.length; i++) {
        out[i] = a[i] - b[i];
    }
    return out;
}

function cross(a, b) {
    var out = new Float32Array(3);
    out[0] = a[1] * b[2] - a[2] * b[1];
    out[1] = a[2] * b[0] - a[0] * b[2];
    out[2] = a[0] * b[1] - a[1] * b[0];
    return out;
}

function dot(a,b){
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result += a[i] * b[i];
    }
    return result;
}