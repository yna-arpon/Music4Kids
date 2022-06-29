import React from 'react'
import p5 from 'p5';
import {withRouter} from './withRouter'
import * as Tone from 'tone'

class Sketch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            octave: 4,
            octaveTitle: 'Octave 4',
            C4: false,
            D4: false,
            E4: false,
            F4: false,
            G4: false,
            A4: false,
            B4: false,
            C5: false,
            D5: false,
            E5: false,
            F5: false,
            G5: false,
            A5: false,
            B5: false,
            C4s: false, 
            D4s: false, 
            F4s: false, 
            G4s: false, 
            A4s: false, 
            C5s: false, 
            D5s: false, 
            F5s: false, 
            G5s: false, 
            A5s: false
        }
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
        this.toChoices=this.toChoices.bind(this);
        this.toNotes = this.toNotes.bind(this);
        this.C = this.C.bind(this);
        this.D = this.D.bind(this);
        this.E = this.E.bind(this);
    } 

    toChoices() {
        this.props.navigate('/InstrumentChoices');
    }

    toNotes() {
        this.props.navigate('/');
        // To be changed to a page that leads to piano chords
    }


    // This uses p5's instance mode for sketch creation and namespacing
    Sketch = (p) => {

        let whiteKeys, C4Key, D4Key, E4Key, F4Key, G4Key, A4Key, B4Key, C5Key, D5Key, E5Key, F5Key, G5Key, A5Key, B5Key, whiteKeyWidth, whiteKeyHeight;
        let blackKeys, C4KeySharp, D4KeySharp, F4KeySharp, G4KeySharp, A4KeySharp, C5KeySharp, D5KeySharp, F5KeySharp, G5KeySharp, A5KeySharp;
        let whiteKeyState;

        p.setup = () => {
            p.createCanvas(p.windowWidth,  p.windowHeight);

            // List of piano keys in octaves 4 and 5Key
            whiteKeys = [C4Key, D4Key, E4Key, F4Key, G4Key, A4Key, B4Key, C5Key, D5Key, E5Key, F5Key, G5Key, A5Key, B5Key];
            whiteKeys.forEach(createWhiteKey);

            //List of black piano keys
            blackKeys = [C4KeySharp, D4KeySharp, F4KeySharp, G4KeySharp, A4KeySharp, C5KeySharp, D5KeySharp, F5KeySharp, G5KeySharp, A5KeySharp];
            blackKeys.forEach(createBlackKey);
        }

        p.draw = () => {
            const {C4} = this.state;
            const {C5} = this.state;
            const {D4} = this.state;
            const {D5} = this.state;
            const {E4} = this.state;
            const {E5} = this.state;
            const {F4} = this.state;
            const {F5} = this.state;
            const {G4} = this.state;
            const {G5} = this.state;
            const {A4} = this.state;
            const {A5} = this.state;
            const {B4} = this.state;
            const {B5} = this.state;

            whiteKeyState = [C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5];       
            whiteKeyState.forEach(checkState);
        }

        // Creates white piano keys
        function createWhiteKey() { 
            let xPos = 0;

            for(let i = 0; i < 14; i++) {

                // Creates and styles white keys 
                whiteKeyWidth = p.windowWidth / 14;
                whiteKeyHeight = p.windowHeight / 2.75;

                whiteKeys[i] = p.createButton('');
                whiteKeys[i].size(whiteKeyWidth, whiteKeyHeight);
                whiteKeys[i].style('background-color', p.color(255));
                whiteKeys[i].style('border: 1px solid black')
                whiteKeys[i].style('border-bottom-left-radius: 10px;')
                whiteKeys[i].style('border-bottom-right-radius: 10px;')
                whiteKeys[i].position(xPos, p.windowHeight - whiteKeyHeight);
                
                xPos += whiteKeyWidth;

            }
        }

        // Creates black piano keys
        function createBlackKey() {
            let blackKeyWidth = 0.553 * whiteKeyWidth;
            let blackKeyHeight = 0.6197 * whiteKeyHeight; 
            let xPos = whiteKeyWidth - (blackKeyWidth * 0.5);

            for(let i = 0; i < 10; i++) {

                // Creates and styles black keys
                blackKeys[i] = p.createButton('');
                blackKeys[i].size(blackKeyWidth, blackKeyHeight);
                blackKeys[i].style('background-color', p.color(0));
                blackKeys[i].style('border-bottom-left-radius: 10px;');
                blackKeys[i].style('border-bottom-right-radius: 10px;');
                blackKeys[i].position(xPos, p.windowHeight - whiteKeyHeight)

                if (i === 1 || i === 4 || i === 6) {
                    xPos += 2 * whiteKeyWidth;
                } else {
                    xPos += whiteKeyWidth
                }
            }
        }
        // Checks the state of each white key     
        function checkState() {
            for(let i = 0; i < 14; i++) {
                // If the state of the white true -> changes colour to yellow, else -> keeps it white
                if (whiteKeyState[i]) {
                    whiteKeys[i].style('background-color', p.color(255, 249, 192));
                } else {
                    whiteKeys[i].style('background-color', p.color(255))
                }
            }
        }
    }

    componentDidMount() {
        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    C() {
        const synth = new Tone.PolySynth().toDestination();
        const {octave} = this.state;

        if (octave == 4) {
            synth.triggerAttackRelease("C4","8n");
            // This function will only change the state
            this.setState({C4: true});
        } else {
            synth.triggerAttackRelease("C5","8n");
            this.setState({C5: true});
        }
    }

    D() {
 
        const synth = new Tone.PolySynth().toDestination();
        const {octave} = this.state;

        if (octave == 4) {
            synth.triggerAttackRelease("D4","8n");
            // This function will only change the state
            this.setState({D4: true});
        } else {
            synth.triggerAttackRelease("D5","8n");
            this.setState({D5: true});
        }
    }

    E() {
 
        const synth = new Tone.PolySynth().toDestination();
        const {octave} = this.state;

        if (octave == 4) {
            synth.triggerAttackRelease("E4","8n");
            // This function will only change the state
            this.setState({E4: true});
        } else {
            synth.triggerAttackRelease("E5","8n");
            this.setState({E5: true});
        }
    }


    render() {
        const {octave} = this.state;
        const {octaveTitle} = this.state;

        return (
            //This div will contain our p5 sketch
            <div id='pianoPage' className='page' ref={this.myRef}>
                <div className='pianoHeader'>
                    <button className='btn pianoBtns' id='choicesBackBtn'
                        onClick={this.toChoices}>BACK</button>
                    
                    <button className='btn pianoBtns' id='octaveBtn' 
                        onClick={() => {
                            if (octave == 4) {
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

                <div className='noteContainer'>
                    <button className='btn noteBtn' 
                        onMouseDown={() => {this.C()}}
                        onMouseUp={() => {
                            if (octave == 4) {
                                this.setState({C4: false})
                            } else {
                                this.setState({C5: false})
                            }
                        }}>C</button>

                    <button className='btn noteBtn' >C#/D♭</button>

                    <button className='btn noteBtn' onMouseDown={() => {this.D()}}
                        onMouseUp={() => {
                            if (octave == 4) {
                                this.setState({D4: false})
                            } else {
                                this.setState({D5: false})
                            }
                        }}>D</button>

                    <button className='btn noteBtn' >D#/E♭</button>

                    <button className='btn noteBtn'onMouseDown={() => {this.E()}}
                        onMouseUp={() => {
                            if (octave == 4) {
                                this.setState({E4: false})
                            } else {
                                this.setState({E5: false})
                            }
                        }}>E</button>

                    <button className='btn noteBtn' >F</button>
                    <button className='btn noteBtn' >F#/G♭</button>
                    <button className='btn noteBtn' >G</button>
                    <button className='btn noteBtn' >G#/A♭</button>
                    <button className='btn noteBtn' >A</button>
                    <button className='btn noteBtn' >A#/B♭</button>
                    <button className='btn noteBtn' >B</button>
                </div>
            </div>
        )
    }    
}

export default withRouter(Sketch)