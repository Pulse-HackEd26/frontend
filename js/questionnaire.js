document.getElementById("timesel").style.display="none"
document.getElementById("timeselcal").style.display="none"
document.getElementById("sleephours").style.display="none"
document.getElementById("recommendations").style.display="none"


var opts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticZones: [
        {strokeStyle: "#18A999", min: 0, max: 30}, // Red from 100 to 130
        {strokeStyle: "#8AF3FF", min: 30, max: 70}, // Yellow
        {strokeStyle: "#109648", min: 70, max: 100}, // Green
    ],

};

var target = document.getElementById('foo'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 100; // set max gauge value
gauge.set(0);
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 32; // set animation speed (32 is default value)
// set actual value


const score_0 = ["Football with friends", "group tennis session", "volleyball game", "dance fitness class", "group cycling", "outdoor stretching"];
const score_1 = ["Casual badminton", "Light jog", "Group run", "Fitness class", "Social bouldering", "Group paddleboarding"];
const score_2 = ["Yoga class", "Pilates  session", "Nature walk with a friend", "Stretching mobility class", "Easy group hike", "Light outdoor meditation before or after movement"];
const score_3 = ["Guided breathing outdoor", "Walking with person", "Gentle Tai Chi", "Bird watching with Light walk", "Light gardening", "Slow yoga outdoor"];
const score_4 = ["Forest bathing gentle walk", "Deep breathing", "Meditation", "Slow stretches calm music", "Sitting by water journaling", "Sensory walk flat path", "Gentle mobility routine"];
const score_5 = ["Slow mindful walk", "Seated breathing practice", "Gentle seated based stretches", "Lying down meditation", "Easy balance on grass", "Sitting under tree"];





const questions = ["How are you feeling?", "How confident are you in your education/workplace?", "What are your working hours?", "How many hours of sleep did you get?", "When was the last time you exercised?"];

var questionidx = 0;
document.getElementById("question").innerHTML = questions[questionidx];

const time = [
    document.querySelector("#start"),
    document.querySelector("#end"),
]

const serveraddress = "http://127.0.0.1:8080/sendForm"
var totalvalue = 0.0;
var found = false;
var addedsleep = false;
// Logic for the submit button
function submit() {
    if (questionidx >= questions.length - 1) {
        document.getElementById("questionbox").style.display="none"
        document.getElementById("recommendations").style.display="initial"
        var scoreval = (totalvalue / 7.5) * 100;
        gauge.set(scoreval);
        document.getElementById("score").innerHTML = scoreval.toString().substring(0,4) + "%";
        questionidx = 0;

        if (scoreval >= 0 && scoreval < 20) {
            document.getElementById("action0").innerHTML = score_0[0];
            document.getElementById("action1").innerHTML = score_0[1];
            document.getElementById("action2").innerHTML = score_0[2];
            document.getElementById("action3").innerHTML = score_0[3];
            document.getElementById("action4").innerHTML = score_0[4];
        } else if (scoreval >= 20 && scoreval < 40) {
            document.getElementById("action0").innerHTML = score_1[0];
            document.getElementById("action1").innerHTML = score_1[1];
            document.getElementById("action2").innerHTML = score_1[2];
            document.getElementById("action3").innerHTML = score_1[3];
            document.getElementById("action4").innerHTML = score_1[4];
        } else if (scoreval >= 40 && scoreval < 60) {
            document.getElementById("action0").innerHTML = score_2[0];
            document.getElementById("action1").innerHTML = score_2[1];
            document.getElementById("action2").innerHTML = score_2[2];
            document.getElementById("action3").innerHTML = score_2[3];
            document.getElementById("action4").innerHTML = score_2[4];
        } else if (scoreval >= 60 && scoreval < 80) {
            document.getElementById("action0").innerHTML = score_3[0];
            document.getElementById("action1").innerHTML = score_3[1];
            document.getElementById("action2").innerHTML = score_3[2];
            document.getElementById("action3").innerHTML = score_3[3];
            document.getElementById("action4").innerHTML = score_3[4];
        } else if (scoreval >= 80 && scoreval < 100) {
            document.getElementById("action0").innerHTML = score_4[0];
            document.getElementById("action1").innerHTML = score_4[1];
            document.getElementById("action2").innerHTML = score_4[2];
            document.getElementById("action3").innerHTML = score_4[3];
            document.getElementById("action4").innerHTML = score_4[4];
        } else if (scoreval === 100) {
            document.getElementById("action0").innerHTML = score_5[0];
            document.getElementById("action1").innerHTML = score_5[1];
            document.getElementById("action2").innerHTML = score_5[2];
            document.getElementById("action3").innerHTML = score_5[3];
            document.getElementById("action4").innerHTML = score_5[4];
        }

	var xhr = new XMLHttpRequest();
	xhr.open("POST", serveraddress, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
	    	burnoutScore: scoreval
	}));

    } else {
        questionidx++;
    }
    document.getElementById("question").innerHTML = questions[questionidx];

    found = false;

    switch (true) {
        case questionidx <= 1:
            document.getElementById("checkboxes").style.display="initial"
            document.getElementById("timesel").style.display="none"
            document.getElementById("sleephours").style.display="none"
            document.getElementById("timeselcal").style.display="none"
            break;
        case questionidx <= 2:
            document.getElementById("checkboxes").style.display="none"
            document.getElementById("timesel").style.display="initial"
            document.getElementById("sleephours").style.display="none"
            document.getElementById("timeselcal").style.display="none"
            break;
        case questionidx <= 3:
            document.getElementById("checkboxes").style.display="none"
            document.getElementById("timesel").style.display="none"
            document.getElementById("sleephours").style.display="initial"
            document.getElementById("timeselcal").style.display="none"
            break;
        case questionidx <= 4:
            document.getElementById("checkboxes").style.display="none"
            document.getElementById("timesel").style.display="none"
            document.getElementById("sleephours").style.display="none"
            document.getElementById("timeselcal").style.display="initial"
        default:
            break;
    }

    if (questionidx == 4 && !addedsleep) {
        const hoursofsleep = parseInt(document.getElementById("sleephours").value);
        var score = 0;
        if (hoursofsleep > 8) {
            score += hoursofsleep - 8;
        }
        if (hoursofsleep < 8) {
            score += 8 - hoursofsleep
        }
        totalvalue += score * 0.25;
        addedsleep = true;
    }

    if (questionidx < 3) {
        var it = parseInt(document.getElementById("slider").value)
        switch (questionidx) {
            case 1:
                totalvalue += (it + 1) * 0.15;
                break;
            case 2:
                totalvalue += (it + 1) * 0.2;
                break;
            default:
                break;
        }

        it = 0;
    }

}

// Time selection
time[1].addEventListener("input", () => {
    if (time[0].valueAsNumber > time[1].valueAsNumber) {
        time[0].valueAsNumber = time[1].valueAsNumber;
    }

});
time[0].addEventListener("input", () => {
    if (time[0].valueAsNumber > time[1].valueAsNumber) {
        time[0].valueAsNumber = time[1].valueAsNumber;
    }
});



