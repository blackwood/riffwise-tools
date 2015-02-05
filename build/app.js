function equalWeight(accidental) {
  
  return accidental[Math.floor(Math.random()*accidental.length)]
  
}

function getNested(pitch) {
  
  var key = equalWeight(pitch);
  
  while (Array.isArray(key)) { key = equalWeight(key); } 
  return key;
  
}

function generateExercise() {

  var currentExercise = document.getElementById("currentExercise");
  var roots = ["C ","D ","E ","F ","G ","A ","B ",["C# ", "Db "],["D# ", "Eb "],["F# ", "Gb "],["G# ", "Ab "],["A# ", "Bb "]];
  var chords = ["min","maj","min 7","maj 7","maj 9","aug","dim","maj 11","ma 13","maj9#11","6","add9","6add9","maj7b5","maj7#5","min 9","min 11","min 13","min 6","min add9","min6 add9","min maj7","min maj9","min7b5","min7#5","7","9","11","13","7sus4","7b5","7#5","7b9","7#9","7(b5,b9)","7(b5,#9)","7(#5,b9)","7(#5,#9)","9b5","9#5","13#11","13b9","11b9","dim 7","5","sus4","sus2","sus2sus4","-5"];
  var scales = ["major","natural minor","ionian","dorian","phrygian","lydian","mixolydian","aeolian","locrian","harmonic minor","melodic minor","whole tone","phrygian dominant","pentatonic major","pentatonic minor","blues major","blues minor"];
  var exercise = equalWeight([equalWeight(chords) + " chord", equalWeight(scales) + " scale"]);
  
  return getNested(roots) + exercise;
  
}

var CurrentExercise = React.createClass({displayName: "ExercisePrompt",
  render: function() {
    return (
      React.createElement("div", {className: "exercisePrompt standout"}, 
        this.props.exercise
      )
    );
  }
});

var ExerciseGenerator = React.createClass({displayName: "ExerciseGenerator",
  getInitialState: function() {
    return {exercise: 'Click for new exercises.'};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var newExercise = generateExercise();
    this.setState({exercise: newExercise});
  },
  render: function() {
    return (
      React.createElement("form", {onSubmit: this.handleSubmit}, 
        React.createElement("div", {className: "well"}, 
  		    React.createElement(CurrentExercise, {exercise: this.state.exercise})
      	), 
      	React.createElement("button", {className: "btn btn-default"}, "New Exercise")
      )
    );
  }
});

React.render(
  React.createElement(ExerciseGenerator, null),
  document.getElementById('content')
);