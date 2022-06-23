import React from 'react'
import p5 from 'p5'

class Sketch extends React.Component {
    constructor(props) {
        super(props)
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
    }

    // This uses p5's instance mode for sketch creation and namespacing
    Sketch = (p) => {
        
        let leftCol, rightCol
        p.setup = () => {
            p.createCanvas(p.windowWidth,  p.windowHeight);

            // Creates gradient background
            leftCol = p.color(255, 151, 151);
            rightCol = p.color(185, 255, 96);
            
            for(let x = 0; x < p.width; x++){
                let n = p.map(x, 0, p.width, 0,1);
                let newCol = p.lerpColor(leftCol, rightCol, n);
                p.stroke(newCol);
                p.line(x, 0, x, p.height);
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
            <div ref={this.myRef}>

            </div>
        )
    }
}

export default Sketch