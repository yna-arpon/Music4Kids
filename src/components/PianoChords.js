import React from 'react'
import p5 from 'p5';

class Sketch extends React.Component {
    constructor(props) {
        super(props)
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
    }

    // This uses p5's instance mode for sketch creation and namespacing
    Sketch = (p) => {

        let whiteKeys, C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5, whiteKeyWidth, whiteKeyHeight;
        let blackKeys, C4s, D4s, F4s, G4s, A4s, C5s, D5s, F5s, G5s, A5s;  

        p.setup = () => {
            p.createCanvas(p.windowWidth,  p.windowHeight);

            // Creates gradient background
            const leftCol = p.color(255, 151, 151);
            const rightCol = p.color(185, 255, 96);
            
            for(let x = 0; x < p.width; x++) {
                let n = p.map(x, 0, p.width, 0,1);
                let newCol = p.lerpColor(leftCol, rightCol, n);
                p.stroke(newCol);
                p.line(x, 0, x, p.height);
            }
            
            whiteKeys = [C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5]
            whiteKeys.forEach(createWhiteKey)

            blackKeys = [C4s, D4s, F4s, G4s, A4s, C5s, D5s, F5s, G5s, A5s];
            blackKeys.forEach(createBlackKey)

            
        }

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
            //Loop to create 2 octaves (14 piano keys)
            
        }

        
        
    }

    componentDidMount() {
        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef}>

            </div>
        )
    }
}

export default Sketch