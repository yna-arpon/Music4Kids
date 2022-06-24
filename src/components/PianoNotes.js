import React from 'react'
import p5 from 'p5';
import {withRouter} from './withRouter'

class Sketch extends React.Component {
    constructor(props) {
        super(props)
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
        this.toChoices=this.toChoices.bind(this);
        this.toNotes = this.toNotes.bind(this);
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
            whiteKeys = [C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5]
            whiteKeys.forEach(createWhiteKey)

            //List of black piano keys
            blackKeys = [C4s, D4s, F4s, G4s, A4s, C5s, D5s, F5s, G5s, A5s];
            blackKeys.forEach(createBlackKey)
        }

        // Creates white piano keys
        function createWhiteKey() { 
            let xPos = 0;

            for(let i = 0; i < 14; i++) {
                whiteKeyWidth = p.windowWidth / 14;
                whiteKeyHeight = p.windowHeight / 2.33;

                whiteKeys[i] = p.createButton('');
                whiteKeys[i].size(whiteKeyWidth, whiteKeyHeight);
                whiteKeys[i].style('background-color', p.color(255));
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
                blackKeys[i] = p.createButton('');
                blackKeys[i].size(blackKeyWidth, blackKeyHeight);
                blackKeys[i].style('background-color', p.color(0));
                blackKeys[i].position(xPos, p.windowHeight - whiteKeyHeight)

                if (i == 2 || i == 5 || i == 7) {
                    xPos += 2 * whiteKeyWidth;
                } else {
                    xPos += whiteKeyWidth
                }
            }
        }

        p.draw = () => {
            
        }
    }

    componentDidMount() {
        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            //This div will contain our p5 sketch
            <div id='pianoNotes' className='page' ref={this.myRef}>
                <button className='btn pianoBtns' id='choicesBackBtn'
                    onClick={this.toChoices}>BACK</button>
                <div className='pianoOptns'>
                    <button className='btn pianoBtns' 
                        onClick={this.toNotes}>CHORDS</button> 
                    {/* To be changed to page that leads to Piano chords */}
                </div>
                    
                
            </div>
        )
    }
}

export default withRouter(Sketch)