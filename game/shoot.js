var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
    player2_collision();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++) {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2) {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
        else
        {
            console.log(Math.round(player1.bullets[i].position.x));
            console.log(Math.round(player2.graphic.position.x));
            if ((Math.round(player1.bullets[i].position.x) <= Math.round(player2.graphic.position.x) + 8) &&
                (Math.round(player1.bullets[i].position.x) >= Math.round(player2.graphic.position.x) - 8) &&
                (Math.round(player1.bullets[i].position.y) <= Math.round(player2.graphic.position.y) + 8) &&
                (Math.round(player1.bullets[i].position.y) >= Math.round(player2.graphic.position.y) - 8))
            {
                player2.graphic.visible = false;
            }
        }
    }


}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if ( x < 0 )
        player1.graphic.position.x -= x;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;

}

function player2_collision()
{
    //collision between player and walls
    var x = player2.graphic.position.x + WIDTH / 2;
    var y = player2.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH ) {
        player2.graphic.position.x -= x - WIDTH;
        player2.speed = -player2.speed;
    }
    if ( x < 0 ) {
        player2.graphic.position.x -= x;
        player2.speed = -player2.speed;
    }
    if ( y < 0 ) {
        player2.graphic.position.y -= y;
        player2.speed = -player2.speed;
    }
    if ( y > HEIGHT ) {
        player2.graphic.position.y -= y - HEIGHT;
        player2.speed = -player2.speed;
    }

}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = noGround.length;
    var element = null;

    for (var i = 0; i < length; i++) {
        element = noGround[i];

        var tileX = (element[0]) | 0;
        var tileY = (element[1]) | 0;
        var mtileX = (element[0] + sizeOfTileX) | 0;
        var mtileY = (element[1] + sizeOfTileY) | 0;

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
            player1.dead();
        }
    }

}
