export enum NoteType {
  REQUIRED,
  OPTIONAL,
  SPECIAL,
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

  'A/9:o12|r12|r11|r9|r12|o9,o12',
  'A/9:r9|o7|r7|r9|o10|r7',
  'A/9:r5|r7|r9|r6|o5|o5',
  'A/9:|r12|o14|r16|r14|r12',
  'A/9:o12|r16|r14|r14|r12|o12',
  'A/9:o5|r4|o7|r4|r5|o7',
  'A/9(6):r5|o4|r2|r4|r2|s2,o5',
  'A/9:|r4|r7||r5|r7',

  'A6(9):r5|r7||r6|r7|o5,s7',
  'A6(9):o5|r7|o7|r6|r7|r5,s7',
  'A6:r5||r4|r6|r5|o5',
  'A6:r9||r7|r9|r7|o9',
  'A6:r12|o12|r11|r11|r10|o12',
  'A6:o12|r12|o14|r14|r14|r14',
  'A6:o5|o4|r2,o4|r2|r2|r2',
  'A6(9):||r4|r6|r5|r5,s7',
  'A6:o9|o7|r7|r9|r7|r9',
  'A6:o12|o12|r11|r11|r10|r12',
  'A6:r12|r12|o11|r11|r14|o14',
  'A6:r12|r12|r11|r11|o14|o12,o14',
  'A6:|r7|r7|r6|r7|o9',
  'A6:r5|r7|r4|r6||',
  'A6:o17|r19|r16|r14|r14|o14',
  'A6:o5|r9|r7|r6|r5|o5',
  'A6(9):|r12|r11|r9|r7|s7',
  'A6/9:o5|r4|r4|r4|r5|r5',
  'A6/9:o12|o12|r11|r11|r12|r12,o14',

  'A~7~(~9~):r5|o7|r6|r6|o5|s7',
  'A~7~(~9~):r12|r12|r11|r13|s12,o14|o12',
  'A~7~:|r12|r14|r13|r14|o12',
  'A~7~(~9~):|r7|r7|r6|r9|s7,o9',
  'A~7~:o9|o7|r7|r9|r9|r9',
  'A~7~:|o4|r2|r2|r2,o5|r4',
  'A~7~:||r11|r13|r10|r12',
  'A~7~:|r16|r18|r14|r17|',
  'A~7~:r5|r7||r6|r9|o9',
  'A~7~:|r12|r14|o14|r14|r16',
  'A~7~:o9,o12|r12|r11|r9|r9|o9,o12',
  'A~7~:r9|o7|r7|r9|r9|o9',
  'A~7~:|r19|r18|r14|r14|',
  'A~7~:o5|o4,o7|r7|r6|r5|r4',
  'A~7~:r5|o7|o6,o7|r6|r5|r4',

  'A~9~:o9||r7|r9|r9|r7',
  'A~9~:r5||r6|r6|r5|r7',
  'A~9~:r17|r16|r18|r16|r17|',
  'A~9~:|o7|r7|r6|r9|r7',
  'A~9~:o12|r12|r11|r13|r12|o12',
  'A~9~:r5||r9|r9|r9|r9',
  'A~9~(~13~):r5||r6|r4|r2|s2',
  'A~9~:o9,o12|r12|r9|r9|r9|o9,o12',
  'A~9~:o5|r4|r7|r4|r5|r4',
  'A~9~(~13~):|r12,o16|r14|r13|r12|o12,s14,o16',

  'A~13~:r5|r4|r4|r4|r5|r4',

  'A6/9+11(~7~):o12|r12|r11|r11,s13|r12|r11',
  'A6/9+11(~7~):r5|r7|r4,s6|r4|r4|s4',
  'A6/9+11(~7~):r12|r12|r16|r16|r16|s16',

  'A~7~+11:o5|r7|r7|r6|r4|r4',

  'Am/9:r5|r7|r9|r5|o5|o5',

  'Am7:r5|o7|r5|r5|r5,o8|o5,o8',
  'Am7:r5|r7||r5|r8|o5,o8',
  'Am7:|r12|r14|r12|r13|o12,o15',
  'Am7:|r12|o10|r12|r13|r12',
];

function typeFromShorthand(shorthand: string): NoteType | undefined {
  const typeMap: { [key: string]: NoteType } = {
    'r': NoteType.REQUIRED,
    'o': NoteType.OPTIONAL,
    's': NoteType.SPECIAL,
    'a': NoteType.AFTER1,
    'b': NoteType.AFTER2,
  };
  return typeMap[shorthand.toLowerCase()];
}

function chordFromShorthand(shorthand: string): Chord {
  const [name, chord] = shorthand.split(':');
  const notes = [];

  let string = 6;
  for (const inString of chord.split('|')) {
    for (const note of inString.split(',')) {
      if (note.length === 0) {
        continue;
      }
      const type = typeFromShorthand(note.substring(0, 1)) || NoteType.REQUIRED;
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
    [NoteType.SPECIAL]: 's',
    [NoteType.AFTER1]: 'a',
    [NoteType.AFTER2]: 'b',
  }[type];
}

function chordToShorthand(chord: Chord): string {
  const perString: { [string: number]: Note[] } = {};
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
