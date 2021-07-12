status = "";
video = "";
objects = [];
objectdetector = ""

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
}

function start() {
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}

function modelLoaded() {
    console.log("model is initialized");
    status = true;

    video.loop();
    video.speed(1);
    video.volume(0);
}



function draw() {
    image(video, 0, 0, 350, 350);

    if (status != "") {

        objectdetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }




}

function gotResult(error, results) {
    if (error) {
        console.log("error");
    } else {
        console.log(results);
        objects = results;
    }
}