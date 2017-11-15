var Ennemy = function(name, color, position, direction) {

    this.name = name;
    this.position = position;
    this.life = 1;
    this.bullets = new Array();
    this.direction = direction;
    this.speed = 2;

    this.material = new THREE.MeshLambertMaterial({
        color: color,
    });

    bumperMesh = new THREE.Mesh(new THREE.CylinderGeometry(0, 15, 15, 12, 12, false), this.materialBumper);
    bumperMesh.rotation.x = Math.PI / 2 ;

    sphere = new THREE.SphereGeometry(6, 8, 8);
    THREE.GeometryUtils.merge(sphere, bumperMesh);

    canon = new THREE.CubeGeometry(3, 3, 15);
    THREE.GeometryUtils.merge(canon, sphere);

    this.graphic = new THREE.Mesh(sphere, this.material);
    this.graphic.position.z = 6;
    this.graphic.position.x = 20;
    this.graphic.position.y = 80;
    this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction);
};

Ennemy.prototype.displayInfo = function () {
    jQuery('#'+this.name+' >.life').text(this.life);
}

Ennemy.prototype.move = function () {
    var moveTo = new THREE.Vector3(
        this.speed * Math.cos(this.direction) + this.graphic.position.x,
        this.speed * Math.sin(this.direction) + this.graphic.position.y,
        this.graphic.position.z
    );

    this.graphic.position = moveTo;
    if (this.speed > 0) {
        this.speed = this.speed;
    }
    else if (this.speed < 0) {
        this.speed = this.speed;
    }

    light1.position.x = this.graphic.position.x;
    light1.position.y = this.graphic.position.y;
    // light1.position.z = this.graphic.position.z + 500;
};