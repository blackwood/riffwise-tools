const NOM = {
    CLASSICAL: {
        is: 'CLASSICAL',
        chrom: ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
    },
    MANEPU: {
        is: 'MANEPU',
        chrom: ['ma', 'ne', 'pu', 'qa', 're', 'su', 'ta', 've', 'wu', 'xa', 'ye', 'zu']
    }
}

const printNote = ({ note, register }) => `${note}${register}`

const applyInterval = (nomenclature, note, interval) => {
    let scale = NOM[nomenclature].chrom;
    let pos = scale.indexOf(note.note);
    let newpos = pos + interval;
    let register = note.register + Math.floor(newpos / scale.length);
    return {
        note: scale[newpos % scale.length],
        register
    }
}

function fretmap(nom = NOM.CLASSICAL.is, tuning = [
    { note: 'E', register: 3 },
    { note: 'B', register: 2 },
    { note: 'G', register: 2 },
    { note: 'D', register: 2 },
    { note: 'A', register: 1 },
    { note: 'E', register: 1 },
], count = 25) {
    let fretboard = []
    for (let i = 0; i < tuning.length; i++) {
        let fret = 0
        let strang = [tuning[i]]
        while (fret < count) {
            fret++
            strang.push(applyInterval(nom, strang[strang.length - 1], 1))
        }
        fretboard.push(strang)
        strang = []
        fret = 0
    }

    return fretboard;
}

const territory = fretmap();

const territory2 = fretmap(NOM.MANEPU.is, [
    { note: 're', register: 3 },
    { note: 'zu', register: 2 },
    { note: 've', register: 2 },
    { note: 'pu', register: 2 },
    { note: 'xa', register: 1 },
    { note: 're', register: 1 },
]);

const printFretmap = m => m.map(strang => strang.map(note => printNote(note).padEnd(6, ' ')).join(' | '))

console.log(printFretmap(territory))
console.log(printFretmap(territory2))
