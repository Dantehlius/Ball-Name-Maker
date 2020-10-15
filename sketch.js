vehicles = []
count = 0
moved = false
small = false


function getString(){
	if (textInput.value().length == 0){
		return
	}
	new_textBounds = font.textBounds(textInput.value(), width / 2, height / 2, 128)
	x = (width / 2) - new_textBounds.w / 2
	y = (height / 2) - new_textBounds.h / 2
	newPointsArr = font.textToPoints(textInput.value(), x, y, 128)
	points_arr.length = 0
	points_arr.push(newPointsArr)
	console.log(points_arr)
	textInput.value("")
	move(newPointsArr)
	moved = true
	return
}

function preload(){
	font = loadFont('gameFont.otf')
}

function setup() {
	width = 1000
	height = 500
	createCanvas(width, height)
	background(55)

	textInput = createInput();
	textInput.position(width / 2, height - 100);
	textInput.size(50);

	textButton = createButton('Move');
  textButton.position(textInput.x - textInput.width + 5, height - 100);
  textButton.mousePressed(getString);

	points_arr = []

	new_textBounds = font.textBounds('GANESH', width / 2, height / 2, 128)
	x = (width / 2) - new_textBounds.w / 2
	y = (height / 2) - new_textBounds.h / 2
	newPointsArr = font.textToPoints('GANESH', x, y, 128)
	points_arr.push(newPointsArr)

	previous_points = newPointsArr

	for (p of newPointsArr){
		vehicle = new Vehicle(p.x, p.y)
		vehicles.push(vehicle)
	}
}

function move(target_points){
	if (target_points.length <= previous_points.length){
		for (i = 0; i < previous_points.length; i++){
			tar_index = i % target_points.length
			vehicles[i].target = createVector(target_points[tar_index].x, target_points[tar_index].y)
		}
		previous_points = target_points
		small = true
	}
	else{
		small = false
		for (i = 0; i < target_points.length; i++){
			if (i + 1 > previous_points.length){
				tar_index = i % previous_points.length
				// console.log(vehicles[tar_index].pos.x)
				s_x = vehicles[tar_index].pos.x
				s_y = vehicles[tar_index].pos.y
				vehicle = new Vehicle(target_points[i].x, target_points[i].y, s_x, s_y)
				vehicles.push(vehicle)
			}
			else{
				vehicles[i].target = createVector(target_points[i].x, target_points[i].y)
			}
		}
		previous_points = target_points
	}
}

function cleanup(){
	if (small){
		vehicles = vehicles.splice(0, previous_points.length)
	}
}

function draw() {
	background(55)

	fill(255)
	textSize(128)
	textAlign(CENTER, CENTER);
	noStroke()
	textFont(font)

	for (v of vehicles){
		v.behaviors()
		v.update()
		v.show()
	}
	if (moved){
		count = 1
		moved = false
	}
	if (count > 0){
		count += 1
		if (count == 150){
			cleanup()
			count = 0
		}
	}
}
