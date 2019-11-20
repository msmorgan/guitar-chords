import React from 'react';
import './ChordDiagram.scss';
import {Chord, Note, NoteType} from './chordData';
import {range} from './utilities';

const stringCount = 6;
const fretCount = 7;
const columnOffset = 1;
const rowOffset = 1;

function noteTypeClass(type: NoteType): string {
  return {
    [NoteType.REQUIRED]: 'required',
    [NoteType.OPTIONAL]: 'optional',
    [NoteType.AFTER1]: 'after1',
    [NoteType.AFTER2]: 'after2',
  }[type];
}

const ChordDiagram: React.FC<{ chord: Chord }> = ({chord: {name, notes}}) => {
  const lowestFret = Math.max(1,
      notes.map(n => n.fret).reduce((a, b) => Math.min(a, b), Infinity));

  const renderNote = (note: Note, index?: number) => {
    const column = columnOffset + stringCount + 1 - note.string;
    const row = rowOffset + 1 + note.fret - lowestFret;
    return (
        <div
            className={[
              'ChordDiagram-note',
              `ChordDiagram-note-${noteTypeClass(note.type)}`,
            ].join(' ')}
            style={{'gridArea': `${row} / ${column}`}}
            key={index}
        />
    )
  };

  return (
      <div className="ChordDiagram">
        <div className="ChordDiagram-name">{name}</div>
        <div className="ChordDiagram-layers">
          <div className="ChordDiagram-stringsLayer">
            <div className="ChordDiagram-noString"/>
            {range(stringCount).map((i) =>
                <div className="ChordDiagram-string" key={i}/>)}
          </div>
          <div className="ChordDiagram-fretsLayer">
            <div className="ChordDiagram-fretIndicator">{lowestFret}</div>
            {range(fretCount).map((i) =>
                <div className="ChordDiagram-fret" key={i}/>)}
          </div>
          <div className="ChordDiagram-notesLayer">
            {notes.map(renderNote)}
          </div>
        </div>
      </div>
  );
};

export default ChordDiagram;
