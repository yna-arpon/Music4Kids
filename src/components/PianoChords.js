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

        let whiteKeys, C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5, A5, B5;

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

            whiteKeys.forEach(createKey)

        }

        function createKey() { 
            let xPos = 0;

            for(let i = 0; i < 14; i++) {
                whiteKeys[i] = p.createButton('');
                whiteKeys[i].size(107.1, 367.8);
                whiteKeys[i].style('background-color', p.color(255));
                whiteKeys[i].position(xPos, 489.2);
                xPos += 107.1;
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