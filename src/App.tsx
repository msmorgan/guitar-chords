import React from 'react';
import './App.scss';
import ChordDiagram from './ChordDiagram';
import {chords} from './chordData';

const App: React.FC = () => {
  return (
      <div className="App">
        <div className="App-chords">
          {chords.map((chord, i) => <ChordDiagram chord={chord} key={i}/>)}
        </div>
      </div>
  );
};

export default App;
