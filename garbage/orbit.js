
	var earthAngle = 0,
    moonAngle  = 0,
    distance   = 30,
    radius     = 50,
    padding    = 100,
    orbit      = 200,
    offset     = orbit + padding,
    orbits     = two.makeGroup();

    var earthOrbit = two.makeCircle(offset, offset, orbit);
earthOrbit.noFill();
earthOrbit.linewidth = 4;
earthOrbit.stroke = "#ccc";
orbits.add(earthOrbit);
 


function getPositions(angle, orbit) {
    return {
        x: Math.cos(angle * Math.PI / 180) * orbit,
        y: Math.sin(angle * Math.PI / 180) * orbit
    };
}
var pos = getPositions(earthAngle++, orbit),
    earth = two.makeCircle(pos.x + offset, pos.y + offset, radius);
 
earth.stroke = "#123456";
earth.linewidth = 4;
earth.fill = "#194878";

two.bind("update", function (frameCount) {
    var pos = getPositions(earthAngle++, orbit);
    earth.translation.x = pos.x + offset;
    earth.translation.y = pos.y + offset;
});
 
two.play();