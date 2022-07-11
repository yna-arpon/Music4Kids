import React from 'react';
import p5 from 'p5';
import * as Tone from 'tone';
import { withRouter } from './withRouter';
import Play from './photos/pianoPlayBtn.png';
import Reset from './photos/pianoResetBtn.png';

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
    displayNotes: []
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
        this.toChoices=this.toChoices.bind(this);
        this.toChords = this.toChords.bind(this);
        this.playNote = this.playNote.bind(this);
        this.displayArray = this.displayArray.bind(this);
        // this.playArray = this.playArray.bind(this);
        this.clearArray = this.clearArray.bind(this);
    } 

    toChoices() {
        this.props.navigate('/InstrumentChoices');
    }

    toChords() {
        this.props.navigate('/');
        // To be changed to a page that leads to piano chords
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
        //We create a new p5 object on component mount, feed it 
        if (!window.myP5) {
            window.myP5 = new p5(this.Sketch, this.myRef.current)
        }
    }

    createKey(str, i) {
        console.log(str,i)
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

    playNote(note, sharp=false){
        let lengthOfAudioFile = 1880
        return new Promise(resolve => {

            const {octave} = this.state;
            let noteWithOctave = (note + octave)
            if (sharp) noteWithOctave += 's'
 
            this.setState({[noteWithOctave]: true});
            notes.get(noteWithOctave).start()
            setTimeout(() => {
                this.setState({[noteWithOctave]: false})
                resolve()
                } , lengthOfAudioFile);
            }) 

    }

    displayArray(note) {
        const {octave} = this.state;

        if (octave === 4) {
            this.setState({displayNotes: this.state.displayNotes.concat([note + '4'])})
        } else {
            this.setState({displayNotes: this.state.displayNotes.concat([note + '5'])});
        }
    }

    isBlack = (str) => {
        return str.includes('s') | str.includes('#') | str.includes('♭')
    }
    
    async playArray() {
        const {displayNotes} = this.state;

        const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

        for (let i = 0; i < displayNotes.length; i++){
            const note = displayNotes[i]
            await this.playNote(note[0], this.isBlack(note))
            await sleepNow(200)
        }
    }

    clearArray() {
        this.setState({displayNotes: []})
    }

    render() {
        const {octave} = this.state;
        const {octaveTitle} = this.state;
        const {displayNotes} = this.state;

        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef} id='pianoPage' className='page'>
                <div className='pianoHeader'>
                    <button className='btn pianoBtns' id='choicesBackBtn'
                        onClick={this.toChoices}>BACK</button>
                    
                    <button className='btn pianoBtns' id='octaveBtn' 
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
                    <button className='btn pianoBtns' id='chordsBtn'>
                        CHORDS
                    </button> 
                    {/* To be changed to page that leads to Piano chords  */}
                </div>

                <div id='musicBarContainer'>
                    <div id='noteBar'>
                        {displayNotes.map((note, index) => 
                            <h1 key={index} className='displayNotes'>{note}</h1>
                        )}
                    </div>
                    <button className='btn pianoBarBtns' id='playBtn'
                        onClick={() => {this.playArray()}}>
                        <img className='pianoBarImg' src={ Play } alt='Play'/></button>
                    <button className='btn pianoBarBtns' id='resetBtn' 
                        onClick={() => {this.clearArray()}}>
                        <img className='pianoBarImg' src={ Reset } alt='Reset'/></button>
                </div>

                <div className='noteContainer'>
                    <button className='btn noteBtn' 
                        onClick={() => {this.playNote('C'); this.displayArray('C')}}>C</button>

                    <button className='btn noteBtn'
                        onClick={() => {this.playNote('C', true); this.displayArray('D♭')}}>C#/D♭</button>

                    <button className='btn noteBtn' 
                        onClick={() => {this.playNote('D'); this.displayArray('D')}}>D</button>

                    <button className='btn noteBtn' 
                        onClick={() => {this.playNote('D', true); this.displayArray('E♭')}}>D#/E♭</button>

                    <button className='btn noteBtn'
                        onClick={() => {this.playNote('E'); ; this.displayArray('E')}}>E</button>

                    <button className='btn noteBtn'
                        onClick={() => {this.playNote('F'); this.displayArray('F')}}>F</button>

                    <button className='btn noteBtn' 
                        onClick={() => {this.playNote('F', true); this.displayArray('G♭')}}>F#/G♭</button>

                    <button className='btn noteBtn' 
                        onClick={() => {this.playNote('G'); this.displayArray('G')}}>G</button>

                    <button className='btn noteBtn' 
                        onClick={() => {this.playNote('G', true); this.displayArray('A♭')}}>G#/A♭</button>

                    <button className='btn noteBtn'
                        onClick={() => {this.playNote('A'); this.displayArray('A')}}>A</button>

                    <button className='btn noteBtn'
                        onClick={() => {this.playNote('A', true); this.displayArray('B♭')}}>A#/B♭</button>

                    <button className='btn noteBtn'
                        onClick={() => {this.playNote('B'); this.displayArray('B')}}>B</button>
                </div>
            </div>
        )
    }    
}

export default withRouter(PianoNotes)