import React from 'react';
import p5 from 'p5'
import * as Tone from 'tone';
import { withRouter } from './withRouter';

function loadNote(noteToPlay) {
    const note = new Tone.Player('https://raw.githubusercontent.com/yna-arpon/Music4Kids/main/src/components/24-piano-keys/' + noteToPlay + '_trim.mp3').toDestination();
    return note
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
    return [str, loadNote(str)]
})

const notes = new Map(mapArgs);

class PianoChords extends React.Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
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

        this.p = p

        const numBlack = noteArray.reduce((a,b) => {
            a += (this.isBlack(b)) ? 1 : 0
            return a
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
                const isWhite = !this.isBlack(str)
                const button = this.createKey(str, i)
                if (isWhite) i++
                return {name: str, button}
            })

        }

        this.p.draw = () => {
            this.info.buttons.forEach(({name, button}) => this.checkKeyState(name, button))
        }
    }

    createKey(str, i) {
        const type = this.isBlack(str) ? 'black' : 'white';
        const keyInfo = this.info[type];
        const button = this.p.createButton('');

        button.size(keyInfo.width, keyInfo.height);
        button.style('box-sizing: border-box');
        button.style('background-color', this.p.color(keyInfo.color));
        button.style('border: 1px solid black')
        button.style('border-bottom-left-radius: 10px;')
        button.style('border-bottom-right-radius: 10px;')
        if (type === 'white') button.position(i*keyInfo.width, this.p.windowHeight - this.info.white.height);
        else {
            button.style('z-index:1')
            button.position((i) * this.info.white.width - (0.5 * keyInfo.width), this.p.windowHeight - this.info.white.height)
        }

        return button
    }

    checkKeyState(name, key) {
        let state = this.state[name]
        let isSharp = (this.isBlack(name)) ? true : false
        if (state) {
            if (isSharp) key.style('background-color',this.p.color(255, 249, 192))
            else key.style('background-color', this.p.color(255, 249, 192));
        } else {
            key.style('background-color', this.p.color(isSharp ? 'black' : 'white'))
        }
    }


    componentDidMount() {
        if(!window.myP5) {
            window.myP5 = new p5(this.Sketch, this.myRef.current)
        }
    }

    isBlack(str) {
        return str.includes('s') | str.includes('#') | str.includes('♭')
    }
    
    render() {
        
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

                <div className='chordContainer'>
                    <button className='btn pianoSoundBtn chordBtn'>C</button>
                    <button className='btn pianoSoundBtn chordBtn'>D</button>
                    <button className='btn pianoSoundBtn chordBtn'>E</button>
                    <button className='btn pianoSoundBtn chordBtn'>F</button>
                    <button className='btn pianoSoundBtn chordBtn'>G</button>
                    <button className='btn pianoSoundBtn chordBtn'>A</button>
                    <button className='btn pianoSoundBtn chordBtn'>B</button>
                    <button className='btn pianoSoundBtn chordBtn'>Cm</button>
                    <button className='btn pianoSoundBtn chordBtn'>Dm</button>
                    <button className='btn pianoSoundBtn chordBtn'>Em</button>
                    <button className='btn pianoSoundBtn chordBtn'>Fm</button>
                    <button className='btn pianoSoundBtn chordBtn'>Gm</button>
                    <button className='btn pianoSoundBtn chordBtn'>Am</button>
                    <button className='btn pianoSoundBtn chordBtn'>Bm</button>
                </div>
            </div>
        )
    }
}

export default withRouter(PianoChords)