import React, {ReactElement} from 'react';
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
    [NoteType.SPECIAL]: 'special',
    [NoteType.AFTER1]: 'after1',
    [NoteType.AFTER2]: 'after2',
  }[type];
}

enum TextFormat {
  DEFAULT,
  STRIKETHROUGH,
  SUPERSCRIPT,
  SUBSCRIPT,
}

interface NamePart {
  text: string,
  format: TextFormat,
}

function getFormat(symbol: string): TextFormat | undefined {
  switch (symbol) {
    case '~': return TextFormat.STRIKETHROUGH;
    case '^': return TextFormat.SUPERSCRIPT;
    case '_': return TextFormat.SUBSCRIPT;
  }
}

function intoParts(name: string): NamePart[] {
  const result: NamePart[] = [];
  let thisFormat = TextFormat.DEFAULT;
  let thisText = '';
  const emit = (nextFormat: TextFormat) => {
    result.push({text: thisText, format: thisFormat});
    thisText = '';
    thisFormat = nextFormat;
  };
  let pos = 0;
  while (pos < name.length) {
    const nextFormat = getFormat(name[pos]);
    if (nextFormat == null) {
      thisText += name[pos];
    } else {
      if (thisFormat === TextFormat.DEFAULT) {
        emit(nextFormat);
      } else if (nextFormat === thisFormat) {
        emit(TextFormat.DEFAULT);
      } else {
        throw new Error('Unmatched format specifiers (cannot be nested).');
      }
    }
    pos += 1;
  }
  if (thisText != null) {
    emit(TextFormat.DEFAULT);
  }
  return result;
}

function renderNamePart(part: NamePart, index?: number): ReactElement {
  switch (part.format) {
    case TextFormat.DEFAULT:
      return <span key={index}>{part.text}</span>;
    case TextFormat.STRIKETHROUGH:
      return <s key={index}>{part.text}</s>;
    case TextFormat.SUPERSCRIPT:
      return <sup key={index}>{part.text}</sup>;
    case TextFormat.SUBSCRIPT:
      return <sub key={index}>{part.text}</sub>;
  }
}

const ChordName: React.FC<{name: string}> = ({name}) => {
  const parts = intoParts(name);
  return (
      <div className="ChordDiagram-name">
        {parts.map(renderNamePart)}
      </div>
  );
};

const ChordDiagram: React.FC<{ chord: Chord }> = ({chord: {name, notes}}) => {
  const lowestFret = Math.max(1,
      notes.map(n => n.fret).reduce((a, b) => Math.min(a, b), Infinity));

  const renderNote = (note: Note, index?: number): ReactElement => {
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
    );
  };

  return (
      <div className="ChordDiagram">
        <ChordName name={name}/>
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
