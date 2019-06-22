function Vector(x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype = {
    rotate: function(theta) {
        var x = this.x;
        var y = this.y;
        this.x = Math.cos(theta) * x - Math.sin(theta) * y;
        this.y = Math.sin(theta) * x + Math.cos(theta) * y;
        return this;
    },
    mult: function(f) {
        this.x *= f;
        this.y *= f;
        return this;
    },
    clone: function() {
        return new Vector(this.x, this.y);
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    subtract: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    },
    set: function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
};

function Petal(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
    this.stretchA = stretchA;
    this.stretchB = stretchB;
    this.startAngle = startAngle;
    this.angle = angle;
    this.bloom = bloom;
    this.growFactor = growFactor;
    this.r = 1;
    this.isfinished = false;
    //this.tanAngleA = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
    //this.tanAngleB = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
}
Petal.prototype = {
    draw: function() {
        var ctx = this.bloom.seek.ctx;
        var v1, v2, v3, v4;
        v1 = new Vector(0, this.r).rotate(Seek.degrad(this.startAngle));
        v2 = v1.clone().rotate(Seek.degrad(this.angle));
        v3 = v1.clone().mult(this.stretchA); //.rotate(this.tanAngleA);
        v4 = v2.clone().mult(this.stretchB); //.rotate(this.tanAngleB);
        ctx.strokeStyle = this.bloom.c;
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
        ctx.stroke();
    },
    render: function() {
        if (this.r <= this.bloom.r) {
            this.r += this.growFactor; // / 10;
            this.draw();
        } else {
            this.isfinished = true;
        }
    }
}

function Bloom(p, r, c, pc, seek) {
    this.p = p;
    this.r = r;
    this.c = c;
    this.pc = pc;
    this.petals = [];
    this.seek = seek;
    this.init();
    this.seek.addBloom(this);
}
Bloom.prototype = {
    draw: function() {
        var p, isfinished = true;
        this.seek.ctx.save();
        this.seek.ctx.translate(this.p.x, this.p.y);
        for (var i = 0; i < this.petals.length; i++) {
            p = this.petals[i];
            p.render();
            isfinished *= p.isfinished;
        }
        this.seek.ctx.restore();
        if (isfinished == true) {
            this.seek.removeBloom(this);
        }
    },
    init: function() {
        var angle = 360 / this.pc;
        var startAngle = Seek.randomInt(0, 90);
        for (var i = 0; i < this.pc; i++) {
            this.petals.push(new Petal(Seek.random(Seek.options.petalStretch.min, Seek.options.petalStretch.max), Seek.random(Seek.options.petalStretch.min, Seek.options.petalStretch.max), startAngle + i * angle, angle, Seek.random(Seek.options.growFactor.min, Seek.options.growFactor.max), this));
        }
    }
}

function Seek(ctx, element) {
    this.blooms = [];
    this.element = element;
    this.ctx = ctx;
}
Seek.prototype = {
    render: function() {
        for (var i = 0; i < this.blooms.length; i++) {
            this.blooms[i].draw();
        }
    },
    addBloom: function(b) {
        this.blooms.push(b);
    },
    removeBloom: function(b) {
        var bloom;
        for (var i = 0; i < this.blooms.length; i++) {
            bloom = this.blooms[i];
            if (bloom === b) {
                this.blooms.splice(i, 1);
                return this;
            }
        }
    },
    createRandomBloom: function(x, y) {
        this.createBloom(x, y, Seek.randomInt(Seek.options.bloomRadius.min, Seek.options.bloomRadius.max), Seek.randomrgba(Seek.options.color.rmin, Seek.options.color.rmax, Seek.options.color.gmin, Seek.options.color.gmax, Seek.options.color.bmin, Seek.options.color.bmax, Seek.options.color.opacity), Seek.randomInt(Seek.options.petalCount.min, Seek.options.petalCount.max));
    },
    createBloom: function(x, y, r, c, pc) {
        new Bloom(new Vector(x, y), r, c, pc, this);
    },
    clear: function() {
        this.blooms = [];
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }
}

Seek.options = {
    petalCount: {
        min: 8,
        max: 15
    },
    petalStretch: {
        min: 0.1,
        max: 3
    },
    growFactor: {
        min: 0.1,
        max: 1
    },
    bloomRadius: {
        min: 8,
        max: 10
    },
    density: 10,
    growSpeed: 1000 / 60,
    color: {
        rmin: 128,
        rmax: 255,
        gmin: 0,
        gmax: 128,
        bmin: 0,
        bmax: 128,
        opacity: 0.1
    },
    tanAngle: 60
};
Seek.random = function(min, max) {
    return Math.random() * (max - min) + min;
};
Seek.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
Seek.circle = 2 * Math.PI;
Seek.degrad = function(angle) {
    return Seek.circle / 360 * angle;
};
Seek.raddeg = function(angle) {
    return angle / Seek.circle * 360;
};
Seek.rgba = function(r, g, b, a) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
};
Seek.randomrgba = function(rmin, rmax, gmin, gmax, bmin, bmax, a) {
    var r = Math.round(Seek.random(rmin, rmax));
    var g = Math.round(Seek.random(gmin, gmax));
    var b = Math.round(Seek.random(bmin, bmax));
    var limit = 5;
    if (Math.abs(r - g) <= limit && Math.abs(g - b) <= limit && Math.abs(b - r) <= limit) {
        return Seek.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a);
    } else {
        return Seek.rgba(r, g, b, a);
    }
};