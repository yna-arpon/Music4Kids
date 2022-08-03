import React from 'react';
import p5 from 'p5';
import * as Tone from 'tone';
import { withRouter } from './withRouter';
import Play from './photos/pianoPlayBtn.png';
import Reset from './photos/pianoResetBtn.png';
import BackSpace from './photos/pianoBackSpaceBtn.png'

function loadNote(noteToPlay) {
    const note = new Tone.Player('https://raw.githubusercontent.com/yna-arpon/Music4Kids/main/src/components/24-piano-keys/' + noteToPlay + '_trim.mp3').toDestination();
    return note
}

const octaves = [4,5];
const baseNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const octaveMap = octaves.map((octave) => {
    return baseNotes.map(note => {
        const arr = [note + octave]
        if (note !== 'E' && note !== 'B') arr.push(note + octave + 's')
        return arr
    })}
)

const state = {
    octave: octaves[0],
    octaveTitle: 'Octave ' + octaves[0],
    displayNotes: [],
    activeNote: '',
    currentIndex: -1
}

const noteArray = octaveMap.flat(2)
const mapArgs = noteArray.map(str =>{
    state[str] = false
    return [str, loadNote(str)]
})

const notes = new Map(mapArgs)

class PianoNotes extends React.Component {

    constructor(props) {
        super(props)
        this.state = state
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
        this.toSettings = this.toSettings.bind(this);
    } 

    toSettings() {
        this.props.navigate('/PianoSettings');
    }

    // This uses p5's instance mode for sketch creation and namespacing
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
                return {name:str, button}
            })

        }

        this.p.draw = () => {
            this.info.buttons.forEach(({name, button}) => this.checkKeyState(name, button))
        }
    }

    componentDidMount() {
        if (!window.myP5) {
            window.myP5 = new p5(this.Sketch, this.myRef.current)
        }
    }

    createKey(str, i) {
        const type = this.isBlack(str) ? 'black' : 'white'
        const keyInfo = this.info[type]
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

    checkKeyState = (name, key) => {

        // If the state of the white true -> changes colour to yellow, else -> keeps it white
        let state = this.state[name]
        let isSharp = (this.isBlack(name)) ? true : false
        if (state) {
            if (isSharp) key.style('background-color',this.p.color(255, 249, 192))
            else key.style('background-color', this.p.color(255, 249, 192));
        } else {
            key.style('background-color', this.p.color(isSharp ? 'black' : 'white'))
        }
}

    playNote(note, sharp, octave) {
        let lengthOfAudioFile = 1880

        return new Promise(resolve => {
            let toBeActive;
            let noteWithOctave = (note + octave);
            if (sharp) {
                noteWithOctave += 's'; // Adds 's' at the end if its a sharp
                toBeActive = note + '#' + octave;
            } else {
                toBeActive = noteWithOctave
            }

            this.setState({activeNote: toBeActive});
            this.setState({[noteWithOctave]: true}); // changes color of key to yellow

            notes.get(noteWithOctave).start(); // plays the note

            setTimeout(() => {resolve()}, 700); // Time gap between notes is 600ms 

            //changes key color back to white once audio is done playing 
            setTimeout(() => {
                this.setState({[noteWithOctave]: false}, 
                this.setState({activeNote: ''}))
                } , lengthOfAudioFile);
            })
            
    }

    displayArray(note, sharp = false) {
        const {octave} = this.state;
        if (octave === 4) {
            if (sharp) {
                this.setState({displayNotes: this.state.displayNotes.concat([note + '#4'])});
            } else {
                this.setState({displayNotes: this.state.displayNotes.concat([note + '4'])});
            }
        } else {
            if (sharp) {
                this.setState({displayNotes: this.state.displayNotes.concat([note + '#5'])});
            } else {
                this.setState({displayNotes: this.state.displayNotes.concat([note + '5'])});
            }
        }
    }

    isBlack = (str) => {
        return str.includes('s') | str.includes('#') | str.includes('♭')
    }
    
    async playArray() {
        const {displayNotes} = this.state;

        for (let i = 0; i < displayNotes.length; i++) {
            const note = displayNotes[i];
            let octave;

            if (note.length === 2) {
                octave = parseInt(note[1])
            } else {
                octave = parseInt(note[2])
            }

            this.setState(prevState => {
                return {currentIndex: prevState.currentIndex + 1}
            })

            await this.playNote(note[0], this.isBlack(note), octave)
        }

        this.setState({currentIndex: -1})
    }

    backspace() {
        const {displayNotes} = this.state;
        displayNotes.splice(-1);
        this.setState({displayNotes: displayNotes})
    }

    clearArray() {
        this.setState({displayNotes: []})
    }

    render() {
        const {octave} = this.state;
        const {octaveTitle} = this.state;
        const {displayNotes} = this.state;
        const {activeNote} = this.state;
        const {currentIndex} = this.state;

        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef} className='page pianoPage'>
                <div className='pianoHeader'>
                    
                    <button className='btn pianoBtns' 
                        onClick={() => {
                            if (octave === 4) {
                                this.setState({octave: 5});
                                this.setState({octaveTitle: 'Octave 5'});
                            } else {
                                this.setState({octave: 4});
                                this.setState({octaveTitle: 'Octave 4'});
                            }
                        }}>
                        {octaveTitle}
                    </button>

                    <h1 className='instrumentTitle' id='pianoNotesTitle'>FREE STYLE PIANO (NOTES)</h1>

                    <button className='btn pianoBtns' id='chordsBtn'
                        onClick={this.toSettings}>
                        SETTINGS
                    </button> 
                </div>

                <div className='musicBarContainer'>
                    <div className='noteBar'>
                        {displayNotes.map((note, index) =>
                            <h1 key={index} className='displayNotes' id={'' + (note === activeNote && index === currentIndex ? 'isPlayed' : '')}>{note}</h1>
                        )}
                    </div>
                    <button className='btn pianoBarBtns' id='playBtn'
                        onClick={() => {this.playArray()}}>
                        <img className='pianoBarImg' src={ Play } alt='Play'/></button>

                    <button className='btn pianoBarBtns'
                        onClick={() => {this.backspace()}}>
                        <img className='pianoBarImg' src={ BackSpace } alt='Backspace'/></button>

                    <button className='btn pianoBarBtns'
                        onClick={() => {this.clearArray()}}>
                        <img className='pianoBarImg' src={ Reset } alt='Reset'/></button>
                </div>

                <div className='noteContainer'>
                    <button className='btn pianoSoundBtn noteBtn'
                        onClick={() => {this.playNote('C', false, octave); this.displayArray('C')}}>C</button>

                    <button className='btn pianoSoundBtn noteBtn'
                        onClick={() => {this.playNote('C', true, octave); this.displayArray('C', true)}}>C#/D♭</button>

                    <button className='btn pianoSoundBtn noteBtn' 
                        onClick={() => {this.playNote('D', false, octave); this.displayArray('D')}}>D</button>

                    <button className='btn pianoSoundBtn noteBtn' 
                        onClick={() => {this.playNote('D', true, octave); this.displayArray('D', true)}}>D#/E♭</button>

                    <button className='btn pianoSoundBtn noteBtn'
                        onClick={() => {this.playNote('E', false, octave); ; this.displayArray('E')}}>E</button>

                    <button className='btn pianoSoundBtn noteBtn'
                        onClick={() => {this.playNote('F', false, octave); this.displayArray('F')}}>F</button>

                    <button className='btn pianoSoundBtn noteBtn' 
                        onClick={() => {this.playNote('F', true, octave); this.displayArray('F', true)}}>F#/G♭</button>

                    <button className='btn pianoSoundBtn noteBtn' 
                        onClick={() => {this.playNote('G', false, octave); this.displayArray('G')}}>G</button>

                    <button className='btn pianoSoundBtn noteBtn' 
                        onClick={() => {this.playNote('G', true, octave); this.displayArray('G', true)}}>G#/A♭</button>

                    <button className='btn pianoSoundBtn noteBtn'
                        onClick={() => {this.playNote('A', false, octave); this.displayArray('A')}}>A</button>

                    <button className='btn pianoSoundBtn noteBtn'
                        onClick={() => {this.playNote('A', true, octave); this.displayArray('A', true)}}>A#/B♭</button>

                    <button className='btn pianoSoundBtn noteBtn'
                        onClick={() => {this.playNote('B', false, octave); this.displayArray('B')}}>B</button>
                </div>
            </div>
        )
    }    
}

export default withRouter(PianoNotes)