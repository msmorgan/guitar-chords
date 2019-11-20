export enum NoteType {
  REQUIRED,
  OPTIONAL,
  AFTER1,
  AFTER2,
}

export interface Note {
  string: number,
  fret: number,
  type: NoteType,
}

export interface Chord {
  name: string,
  notes: Note[],
}

const shorthandChords: string[] = [
  'A:r5|r4|r2|o2|o2,o5|o5',
  'A:o5|r4|r2|r2|o2,o5|o5',
  'A:o5|o4|r2|r2|r2|o5',
  'A:o12|o12|r14|r14|r14|o12,o17',
  'A:o5|r4|o2|r2|r5|o5',
  'A:r5|o4|r2|o2|r2|o5',
  'A:r5|o4|r2|r6||',
  'A:r5|r7|o7|r6|o5|o5',
  'A:o12|r12|r14|o14|r14|o12',
  'A:o9|o7|r7|r9|o10|r9',
  'A:o12|o12|o14|r14|r14|r12',
  'A:o5|o7|o7|r6|r5|r5',
  'A:o5|o7|r7|r6|r5,o5|',
  'A:o5|r7|o7|r6|o5,r5|',
  'A:r12|o12|r11||r10|o12',
  'A:r12|r12|r11|o9|o10|o12',
  'A:o5|r7|r7|r6|o5|o5',
  'A:o12,o9|o12|o11|r9|r10|r9',
  'A:o12,o9|o12|r11|r9|r10|o9,o12',
  'A:r9|o12|o11|r9|r10|o12',
  'A:|r4||o6|r5|r5',
  'A:r9|o7|r7|r9|o10|o9',
  'A:r9|r7|r7|o9|o10|o9',
  'A:o12|r12|r11|r9|o10|o9',
  'A:|r12|o11|r9|o10|r9',
  'A:r12|o12|r11|r14|o14|',
  'A:o12|o12|r11|o9|r10|r12',

  'Am:r5|r3|r2|o2,o5|o5|o5',
  'Am:o5|r3|r2|r2|o5|o5',
  'Am:r5|o3|r2|r5|o5|o5',
  'Am:o5|r3|o2|r2|r5|o5',
  'Am:o5|o3|r2|r5|o5|r5',
  'Am:|r3||o5|r5|r5',
  'Am:o5,o8|r7|r7|r5|o5|o5',
  'Am:o5,o8|o7|r7|r5|r5|o5,o8',
  'Am:o5,o8|o7|o7|r5|r5|r5',
  'Am:r5|r7|o7|r5|o5|o5,o8',
  'Am:o5,o8|o7|r7|o5|r5|r8',
  'Am:o5|r7|o7|r5|o5|r5',
  'Am:r8|o7|r7|o5|r5|o8',
  'Am:r8|r7|r7|o9|o10|o8',
  'Am:o8|o7|r7|r9|o10|r8',
  'Am:r8|o7|r7|r9|o10|o8',
  'Am:o8|o7|o7,o10|r9|r10|r8',
  'Am:r8|o12|o10|r9|r10|o8,o12',
  'Am:|r7|r10|o9|r10|',
  'Am:o12|r12|r10|r9|o10,o13|o12',
  'Am:o12|o12|r10|r9|r10|o12',
  'Am:r12|r12|r10|o9|o10,o13|o12',
  'Am:r12|o12|r10|o9|r10|o12',
  'Am:o12|o12|r10|o9|r10|r12',
  'Am:|r12|o10|r9|r13|',
  'Am:r12|o12|r10|r14||',
  'Am:r12|r15|o14|r14|o13|o12',
  'Am:o12|r12|r14|o14|r13|o12',
  'Am:o12|o12,o15|o14|r14|r13|r12',
  'Am:o12|o12,o15|r14|r14|r13|o12',
  'Am:o12|r15||r14|o13|r12',
];

function chordFromShorthand(shorthand: string): Chord {
  const [name, chord] = shorthand.split(':');
  const notes = [];

  let string = 6;
  for (const inString of chord.split('|')) {
    for (const note of inString.split(',')) {
      if (note.length === 0) { continue; }
      const typeMap: {[key: string]: NoteType} = {
        'r': NoteType.REQUIRED,
        'o': NoteType.OPTIONAL,
        'a': NoteType.AFTER1,
        'b': NoteType.AFTER2,
      };
      const type = typeMap[note.substring(0, 1).toLowerCase()];

      const fret = Number(note.substring(1));

      notes.push({type, string, fret});
    }
    string -= 1;
  }
  return {name, notes};
}

function typeToShorthand(type: NoteType): string {
  return {
    [NoteType.REQUIRED]: 'r',
    [NoteType.OPTIONAL]: 'o',
    [NoteType.AFTER1]: 'a',
    [NoteType.AFTER2]: 'b',
  }[type];
}

function chordToShorthand(chord: Chord): string {
  const perString: {[string: number]: Note[]} = {};
  for (const note of chord.notes) {
    perString[note.string] = perString[note.string] || [];
    perString[note.string].push(note);
  }

  let strings = [];
  for (let string = 6; string > 0; string--) {
    const thisString = perString[string] || [];
    strings.push(thisString.map((note: Note) =>
        `${typeToShorthand(note.type)}${note.fret}`));
  }

  return `${chord.name}:${strings.map(s => s.join(',')).join('|')}`;
}

export const chords: Chord[] = shorthandChords.map(chordFromShorthand);
