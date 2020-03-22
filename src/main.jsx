import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  roots,
  chords,
  scales,
  notes,
  accidentals,
  bareNames,
} from "./constants";
import styled from "styled-components";

const Well = styled.div`
  margin: 20px;
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    color: black;
    background: lightgrey;
  }
`;

const StringContainer = styled.div`
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-content: center;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
`;

const scaleNames = Object.keys(scales);
const chordNames = Object.keys(chords);
const rootNames = Object.keys(roots);

const FRET_COUNT = 18;
const TUNING = [4, 9, 2, 7, 11, 4];
const strings = TUNING.map(n =>
  Array(FRET_COUNT)
    .fill()
    .map((_, i) => (n + i) % 12)
);

const equalWeight = arr => arr[Math.floor(Math.random() * arr.length)];

function getNested(pitch) {
  const key = equalWeight(pitch);
  if (Array.isArray(key)) {
    return getNested(key);
  }
  return key;
}

function generateExercise(roots = [], chordNames = [], scaleNames = []) {
  let exercise = equalWeight([
    equalWeight(chordNames) + " chord",
    equalWeight(scaleNames) + " scale",
  ]);
  return equalWeight(roots) + " " + exercise;
}

const Note = styled.span`
  width: ${100 / FRET_COUNT}%;
  /* text-align: center; */
  padding: 0 2px;
`;

const String = ({ notes }) => {
  return (
    <StringContainer>
      {notes.map(note => (
        <Note>
          <svg viewBox="0 0 40 40" width="100%" height="20">
            <circle class="circle" cx="20" cy="20" r="20" />
          </svg>
        </Note>
      ))}
    </StringContainer>
  );
};

class ExerciseGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      exercise: "\u00A0",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getInitialState() {
    return { exercise: "Click for new exercises." };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      exercise: generateExercise(rootNames, chordNames, scaleNames),
    });
  }
  render() {
    const {
      handleSubmit,
      state: { exercise },
    } = this;
    return (
      <section>
        {strings.map(string => (
          <String notes={string} />
        ))}
        <form onSubmit={handleSubmit}>
          <Well>
            <div className="exercisePrompt standout">{exercise}</div>
          </Well>
          <button className="btn btn-default">New Exercise</button>
        </form>
      </section>
    );
  }
}

const ScaleCheatSheet = () => {
  const [scaleName, setScaleName] = useState("major");

  return (
    <section>
      <h2>{scaleName} scale cheat sheet</h2>
      <select onChange={({ target: { value } }) => setScaleName(value)}>
        {scaleNames
          .filter(scaleName => typeof scales[scaleName] !== "undefined")
          .map(scaleName => (
            <option value={scaleName}>{scaleName}</option>
          ))}
      </select>
      <hr />
      <table>
        <tbody>
          {rootNames.map(rootName => {
            const [noteName, variant = accidentals.NATR] = rootName.split("");

            const nameIndex = bareNames.indexOf(noteName);
            const intervals = scales[scaleName].map(
              distance => (distance + roots[rootName]) % 12
            );

            const scale = intervals.map((interval, index) => {
              const bareName = bareNames[(nameIndex + index) % 7];
              return (
                bareName +
                notes[interval][bareName].replace(accidentals.NATR, "")
              );
            });
            return (
              <TableRow>
                {scale.map(n => (
                  <td>{n}</td>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

const MainPage = () => (
  <Well>
    <div class="header">
      <h1>riffwise</h1>
      <p class="h3">super-flashcards for the fretboard</p>
    </div>
    <ExerciseGenerator />
    <ScaleCheatSheet />
    <div class="footer">
      <hr />
      <p>Copyright © {new Date().getFullYear()} blackwood</p>
    </div>
  </Well>
);

ReactDOM.render(<MainPage />, document.getElementById("app"));
