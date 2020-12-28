//#region Canvas

function Canvas(id = null) {
    this.canvas = document.createElement("CANVAS");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };
    this.ctx = this.canvas.getContext("2d");

    if (id === null) {
        document.body.appendChild(this.canvas);
    } else {
        document.getElementById(id).appendChild(this.canvas);
    }
}

Canvas.prototype.fullScreen = function () {
    this.resize(window.innerWidth, window.innerHeight);
    return this;
};

Canvas.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
};

Canvas.prototype.renderBackground = function () {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
};

Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
};

//#endregion Canvas

//#region MouseListener

function MouseListener(target) {
    this.activeTypes = ["mousedown", "mouseup"];
    this.pressedButtons = Array(3).fill(false);
    this.m = SPTensors.vector([0, 0]);
    this.dm = SPTensors.vector([0, 0]);
    this.target = target;
    this.onUpdate = () => {};
}

MouseListener.prototype.initListener = function () {
    this.target.onmousedown = (e) => {
        this.pressedButtons[e.button] = true;
        this.onUpdate();
    };

    this.target.onmouseup = (e) => {
        this.pressedButtons[e.button] = false;
        this.onUpdate();
    };

    this.target.onmousemove = (e) => {
        let px = this.m.x;
        let py = this.m.y;

        this.m.x = e.clientX;
        this.m.y = e.clientY;
        this.dm.x = this.m.x - px;
        this.dm.y = this.m.y - py;
        this.onUpdate();
    };
    return this;
};

//#endregion MouseListener

//#region Camera

function Camera(screenSize, pos = [0, 0], rot = 0, scale = [1, 1]) {
    this.screenSize = SPTensors.vector(screenSize);
    this.pos = SPTensors.vector(pos);
    this.rot = rot;
    this.scale = SPTensors.vector(scale);
}

Camera.prototype.transformPoint = function (point) {
    var sin = Math.sin(this.rot);
    var cos = Math.cos(this.rot);

    let { x, y } = point;

    var newX =
        this.scale.x * ((x - this.pos.x) * cos - (-y + this.pos.y) * sin) +
        this.screenSize.x / 2;
    var newY =
        this.scale.y * ((x - this.pos.x) * sin + (-y + this.pos.y) * cos) +
        this.screenSize.y / 2;

    return SPTensors.vector([newX, newY]);
};

Camera.prototype.transformScale = function (scale) {
    return SPTensors.mult(scale, this.scale);
};

//#endregion Camera
