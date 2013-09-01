/*The Generator*/

/*
First five variables declare random
single pieces of the "roots" array 
that will be either flat or sharp
and therefore carry equal weight
seeing as they are the same note
represented two different ways.
*/


function theGenerator () {

var altAccOne =["C# ","Db "];
var altRooOne = altAccOne[Math.floor(Math.random()*altAccOne.length)];
var altAccTwo =["D# ","Eb "];
var altRooTwo = altAccTwo[Math.floor(Math.random()*altAccTwo.length)];
var altAccThr =["F# ","Gb "];
var altRooThr = altAccThr[Math.floor(Math.random()*altAccThr.length)];
var altAccFou =["G# ","Ab "];
var altRooFou = altAccFou[Math.floor(Math.random()*altAccFou.length)];
var altAccFiv =["A# ","Bb "];
var altRooFiv = altAccFiv[Math.floor(Math.random()*altAccFiv.length)];
var roots =["C ","D ","E ","F ","G ","A ","B ",altRooOne,altRooTwo,altRooThr,altRooFou,altRooFiv];
var root = roots[Math.floor(Math.random()*roots.length)];

var chords = ["min","maj","min 7","maj 7","maj 9","aug","dim","maj 11","ma 13","maj9#11","6","add9","6add9","maj7b5","maj7#5","min 9","min 11","min 13","min 6","min add9","min6 add9","min maj7","min maj9","min7b5","min7#5","7","9","11","13","7sus4","7b5","7#5","7b9","7#9","7(b5,b9)","7(b5,#9)","7(#5,b9)","7(#5,#9)","9b5","9#5","13#11","13b9","11b9","dim 7","5","sus4","sus2","sus2sus4","-5"]
var chord = chords[Math.floor(Math.random()*chords.length)];


var scales = ["major","natural minor","ionian","dorian","phrygian","lydian","mixolydian","aeolian","locrian","harmonic minor","melodic minor","whole tone","phrygian dominant","pentatonic major","pentatonic minor","blues major","blues minor"]
var scale = scales[Math.floor(Math.random()*scales.length)];

var exercises = [chord + " chord",scale + " scale"]
var exercise = exercises[Math.floor(Math.random()*exercises.length)];
var Generator = (root + exercise);
console.log(Generator);
var currentExercise = document.getElementById("currentExercise");
currentExercise.innerHTML=Generator;
}

/* End Generator */

window.onload = function() {
	theGenerator();
};