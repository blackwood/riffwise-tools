import React from "react";
import ReactDOM from "react-dom";
import { roots, chords, scales } from "./constants";

const equalWeight = tuple => tuple[Math.floor(Math.random() * tuple.length)];

function getNested(pitch) {
  const key = equalWeight(pitch);
  if (Array.isArray(key)) {
    return getNested(key);
  }
  return key;
}

function generateExercise(roots = [], chords = [], scales = []) {
  let exercise = equalWeight([
    equalWeight(chords) + " chord",
    equalWeight(scales) + " scale"
  ]);
  return getNested(roots) + exercise;
}

class ExerciseGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      exercise: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getInitialState() {
    return { exercise: "Click for new exercises." };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ exercise: generateExercise(roots, chords, scales) });
  }
  render() {
    const {
      handleSubmit,
      state: { exercise }
    } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className="well">
          <div className="exercisePrompt standout">{exercise}</div>
        </div>
        <button className="btn btn-default">New Exercise</button>
      </form>
    );
  }
}

ReactDOM.render(<ExerciseGenerator />, document.getElementById("generator"));