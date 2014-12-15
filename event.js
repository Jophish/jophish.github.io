

function makeCirc(event) {
	circle = two.makeCircle(event.clientX, event.clientY,10);
	circle.fill = "#990000";
	two.update();
}

window.addEventListener("mousemove", makeCirc, false);
window.addEventListener("touchmove", makeCirc, false);