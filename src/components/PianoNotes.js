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

        let whiteKeys, C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5, whiteKeyWidth, whiteKeyHeight;
        let blackKeys, C4s, D4s, F4s, G4s, A4s, C5s, D5s, F5s, G5s, A5s;

        p.setup = () => {
            p.createCanvas(p.windowWidth,  p.windowHeight);

            // List of piano keys in octaves 4 and 5
            whiteKeys = [C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5];
            whiteKeys.forEach(createWhiteKey);

            //List of black piano keys
            blackKeys = [C4s, D4s, F4s, G4s, A4s, C5s, D5s, F5s, G5s, A5s];
            blackKeys.forEach(createBlackKey);
        }

        p.draw = () => {
            const {C4} = this.state;
            const {C5} = this.state;

            if (C4) { 
                changeWhiteKey(0);
            } else {
                whiteKeys[0].style('background-color', p.color(255));
            }

            if (C5) { 
                changeWhiteKey(7);
            } else {
                whiteKeys[7].style('background-color', p.color(255));
            }
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

        function changeWhiteKey(key) {
            whiteKeys[key].style('background-color', p.color(255, 249, 192));
        }
    }

    componentDidMount() {
        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    C() {
        // To be abstracted to a different file containing only tone.js notes 
        const synth = new Tone.Synth().toDestination();
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

                    <button className='btn noteBtn' onClick={this.C4}>C#/D♭</button>
                    <button className='btn noteBtn' onClick={this.C4}>D</button>
                    <button className='btn noteBtn' onClick={this.C4}>D#/E♭</button>
                    <button className='btn noteBtn' onClick={this.C4}>E</button>
                    <button className='btn noteBtn' onClick={this.C4}>F</button>
                    <button className='btn noteBtn' onClick={this.C4}>F#/G♭</button>
                    <button className='btn noteBtn' onClick={this.C4}>G</button>
                    <button className='btn noteBtn' onClick={this.C4}>G#/A♭</button>
                    <button className='btn noteBtn' onClick={this.C4}>A</button>
                    <button className='btn noteBtn' onClick={this.C4}>A#/B♭</button>
                    <button className='btn noteBtn' onClick={this.C4}>B</button>
                </div>
            </div>
        )
    }    
}

export default withRouter(Sketch)