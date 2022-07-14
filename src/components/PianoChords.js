import React from 'react';
import p5 from 'p5'
import * as Tone from 'tone';
import { withRouter } from './withRouter';
import Play from './photos/pianoPlayBtn.png';
import Reset from './photos/pianoResetBtn.png';

function loadNote(noteToPlay) {
    const note = new Tone.Player('https://raw.githubusercontent.com/yna-arpon/Music4Kids/main/src/components/24-piano-keys/' + noteToPlay + '_trim.mp3').toDestination();
    return note;
}

const octaves = [4,5];
const baseNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const octaveMap = octaves.map((octave) => {
    return baseNotes.map((note) => {
        const arr = [note + octave];
        if (note !== 'E' && note !== 'B') arr.push(note + octave + 's');
        return arr
    })
})

const state = {
    displayNotes: []
}

const noteArray = octaveMap.flat(2);
const mapArgs = noteArray.map((str) => {
    state[str] = false;
    return [str, loadNote(str)];
})

const notes = new Map(mapArgs);

class PianoChords extends React.Component {

    constructor(props) {
        super(props)
        this.state = state;
        this.myRef = React.createRef();
        this.toChoices = this.toChoices.bind(this);
        this.toNotes = this.toNotes.bind(this);
    }
    
    toChoices() {
        this.props.navigate('/InstrumentChoices');
    }

    toNotes() {
        this.props.navigate('/PianoNotes');
    }

    Sketch = (p) => {

        this.p = p;

        const numBlack = noteArray.reduce((a,b) => {
            a += (this.isBlack(b)) ? 1 : 0;
            return a;
        }, 0)
        
        const numWhite = noteArray.length - numBlack

        this.info = {
            white: {
                n: numWhite,
                color: 255,
                offset: 0

            },
            black: {
                n: numBlack,
                color: 0
            }
        }

        this.p.setup = () => {
            
            p.createCanvas(p.windowWidth,  p.windowHeight);
            this.info.white.width = p.windowWidth / this.info.white.n;
            this.info.white.height = p.windowHeight / 2.75;
            this.info.black.width =  0.553 * this.info.white.width;
            this.info.black.height = 0.6197 * this.info.white.height;
            this.info.black.offset = this.info.white.width - (this.info.black.width * 0.5);
            
            let i = 0
            this.info.buttons = noteArray.map(str => {
                const isWhite = !this.isBlack(str);
                const button = this.createKey(str, i);
                if (isWhite) i++;
                return {name: str, button};
            })

        }

        this.p.draw = () => {
            this.info.buttons.forEach(({name, button}) => this.checkKeyState(name, button));
        }
    }

    createKey(str, i) {
        const type = this.isBlack(str) ? 'black' : 'white';
        const keyInfo = this.info[type];
        const button = this.p.createButton('');

        button.size(keyInfo.width, keyInfo.height);
        button.style('box-sizing: border-box');
        button.style('background-color', this.p.color(keyInfo.color));
        button.style('border: 1px solid black');
        button.style('border-bottom-left-radius: 10px;');
        button.style('border-bottom-right-radius: 10px;');
        if (type === 'white') button.position(i*keyInfo.width, this.p.windowHeight - this.info.white.height);
        else {
            button.style('z-index:1');
            button.position((i) * this.info.white.width - (0.5 * keyInfo.width), this.p.windowHeight - this.info.white.height);
        }

        return button
    }

    checkKeyState(name, key) {
        let state = this.state[name];
        let isSharp = (this.isBlack(name)) ? true : false;
        if (state) {
            if (isSharp) key.style('background-color',this.p.color(255, 249, 192));
            else key.style('background-color', this.p.color(255, 249, 192));
        } else {
            key.style('background-color', this.p.color(isSharp ? 'black' : 'white'));
        }
    }


    componentDidMount() {
        if(!window.myP5) {
            window.myP5 = new p5(this.Sketch, this.myRef.current);
        }
    }

    isBlack(str) {
        return str.includes('s') | str.includes('#') | str.includes('♭');
    }

    playChord(chordArray=[]) {
        let lengthOfAudioFile = 1880

        return new Promise(resolve => {

            chordArray.forEach(note => {
                this.setState({[note]: true});
                notes.get(note).start();
            })

            setTimeout(() => {resolve()}, 1000)
    
            setTimeout(() => {
                this.setState({[chordArray[0]]: false});
                this.setState({[chordArray[1]]: false});
                this.setState({[chordArray[2]]: false});
            }, lengthOfAudioFile)
        })
    }

    displayArray(chordAndNotes=[]) {
        this.setState({displayNotes: this.state.displayNotes.concat([chordAndNotes])})
    }

    async playArray() {
        const {displayNotes} = this.state;

        for (let i = 0; i < displayNotes.length; i++) {
            let chord = displayNotes[i][1];
            console.log(chord)
            await this.playChord(chord);
        }
    }

    clearArray() {
        this.setState({displayNotes: []})
    }

    render() {
        const {displayNotes} = this.state;

        return (
            <div ref={this.myRef} className='page pianoPage'>
                <div className='pianoHeader'>
                    <button className='btn pianoBtns'
                        onClick={this.toChoices}>BACK</button>
                    <h1 className='instrumentTitle' id='pianoNotesTitle'>FREE STYLE PIANO (CHORDS)</h1>
                    <button className='btn pianoBtns' id='chordsBtn'
                        onClick={this.toNotes}>
                        NOTES
                    </button> 
                </div>

                <div className='musicBarContainer'>
                    <div className='noteBar'>
                        {displayNotes.map((note, index) => 
                            <h1 key={index} className='displayNotes'>{note[0]}</h1>
                        )}
                    </div>
                    <button className='btn pianoBarBtns' id='playBtn'
                        onClick={() => {this.playArray()}}>
                        <img className='pianoBarImg' src={ Play } alt='Play'/></button>
                    <button className='btn pianoBarBtns' id='resetBtn' 
                        onClick={() => {this.clearArray()}}>
                        <img className='pianoBarImg' src={ Reset } alt='Reset'/></button>
                </div>

                <div className='chordContainer'>
                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['C4','E4','G4']); this.displayArray(['C', ['C4','E4','G4']])
                        }}>C</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['D4','F4s','A4']); this.displayArray(['D', ['D4','F4s','A4']])
                        }}>D</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['E4','G4s','B4']); this.displayArray(['E', ['E4','G4s','B4']])
                        }}>E</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['F4','A4','C5']); this.displayArray(['F', ['F4','A4','C5']])
                        }}>F</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['G4','B4','D5']); this.displayArray(['G', ['G4','B4','D5']])
                        }}>G</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['A4','C5s','E5']); this.displayArray(['A', ['A4','C5s','E5']])
                        }}>A</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['B4','D5s','F5s']); this.displayArray(['B', ['B4','D5s','F5s']])
                        }}>B</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['C4','D4s','G4']); this.displayArray(['Cm', ['C4','D4s','G4']])
                        }}>Cm</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['D4','F4','A4']); this.displayArray(['Dm', ['D4','F4','A4']])
                        }}>Dm</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['E4','G4','B4']); this.displayArray(['Em', ['E4','G4s','B4']])
                        }}>Em</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['F4','G4s','C5']); this.displayArray(['Fm', ['F4','G4s','C5']])
                        }}>Fm</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['G4','A4s','D5']); this.displayArray(['Gm', ['G4','A4s','D5']])
                        }}>Gm</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['A4','C5','E5']); this.displayArray(['Am', ['A4','C5','E5']])
                        }}>Am</button>

                    <button className='btn pianoSoundBtn chordBtn' 
                        onClick={() => {
                            this.playChord(['B4','D5','F5s']); this.displayArray(['Bm', ['B4','D5','F5s']])
                        }}>Bm</button>
                </div>
            </div>
        )
    }
}

export default withRouter(PianoChords)