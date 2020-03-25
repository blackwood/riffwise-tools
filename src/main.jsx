import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  roots,
  chords,
  scales,
  notes,
  accidentals,
  bareNames,
  exerciseTypes,
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

const mod = (n, m) => ((n % m) + m) % m;

const transpose = (note, distance) => mod(note + distance, 12);

const scaleNames = Object.keys(scales);
const chordNames = Object.keys(chords);
const rootNames = Object.keys(roots);

const FRET_COUNT = 18;
const TUNING = [4, 9, 2, 7, 11, 4].reverse();
const strings = TUNING.map(n =>
  Array(FRET_COUNT)
    .fill()
    .map((_, i) => transpose(n, i))
);

const equalWeight = arr => arr[Math.floor(Math.random() * arr.length)];

function getNested(pitch) {
  const key = equalWeight(pitch);
  if (Array.isArray(key)) {
    return getNested(key);
  }
  return key;
}

function generateExercise(rootNames = [], chordNames = [], scaleNames = []) {
  const type = equalWeight([exerciseTypes.CHORD, exerciseTypes.SCALE]);

  const promptName = equalWeight(
    type === exerciseTypes.CHORD ? chordNames : scaleNames
  );

  const promptValue =
    exerciseTypes.CHORD === type ? chords[promptName] : scales[promptName];

  const rootName = equalWeight(rootNames);
  const rootValue = roots[rootName];

  const result = {
    type: type,
    root: {
      text: rootName,
      value: rootValue,
    },
    prompt: {
      text: promptName,
      value: promptValue,
    },
  };
  return result;
}

const Note = styled.span`
  width: ${100 / FRET_COUNT}%;
  /* text-align: center; */
  padding: 0 2px;
`;

const String = ({ notes, exercise }) => {
  let selectedNotes = [];
  const { prompt, root } = exercise;
  if (typeof prompt.value !== "undefined") {
    selectedNotes = prompt.value.map(n => transpose(root.value, n));
  }
  return (
    <StringContainer>
      {notes.map((note, i) => (
        <Note key={`${note}${i}`}>
          <svg viewBox="0 0 40 40" width="100%" height="20">
            <circle
              fill={selectedNotes.includes(note) ? "pink" : "black"}
              className="circle"
              cx="20"
              cy="20"
              r="20"
            />
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
      exercise: {
        type: undefined,
        root: {
          value: undefined,
          text: undefined,
        },
        prompt: {
          value: undefined,
          text: undefined,
        },
      },
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

    const {
      root: { text: rootText },
      prompt: { text: promptText },
      type,
    } = exercise;
    return (
      <section>
        {strings.map((string, i) => (
          <String key={i} notes={string} exercise={exercise} />
        ))}
        <form onSubmit={handleSubmit}>
          <Well>
            <div className="exercisePrompt standout">
              {rootText} {promptText}{" "}
              {typeof type !== "undefined"
                ? type === exerciseTypes.CHORD
                  ? "chord"
                  : "scale"
                : "\u00A0"}
            </div>
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
            <option key={scaleName} value={scaleName}>
              {scaleName}
            </option>
          ))}
      </select>
      <hr />
      <table>
        <tbody>
          {rootNames.map(rootName => {
            const [noteName, variant = accidentals.NATR] = rootName.split("");

            const nameIndex = bareNames.indexOf(noteName);
            const intervals = scales[scaleName].map(distance =>
              transpose(distance, roots[rootName])
            );

            const scale = intervals.map((interval, index) => {
              const bareName = bareNames[(nameIndex + index) % 7];
              return (
                bareName +
                notes[interval][bareName].replace(accidentals.NATR, "")
              );
            });
            return (
              <TableRow key={rootName}>
                {scale.map(n => (
                  <td key={n}>{n}</td>
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
    <div>
      <h1>riffwise</h1>
      <p>super-flashcards for the fretboard</p>
    </div>
    <ExerciseGenerator />
    <ScaleCheatSheet />
    <div>
      <hr />
      <p>Copyright © {new Date().getFullYear()} blackwood</p>
    </div>
  </Well>
);

ReactDOM.render(<MainPage />, document.getElementById("app"));
