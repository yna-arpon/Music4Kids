import React from 'react';
import { useNavigate } from 'react-router-dom';
import Play from './photos/playBtn.png';
import Reset from './photos/resetBtn.png';
import BackSpace from './photos/backSpaceBtn.png';

// Beat pad page - under development
const BeatPad = () => {
    let navigate = useNavigate();
    return(
        <div id='beatPad' className='page'>
            {/* Beat pad header div */}
            <div> 
                <div>
                    <button class='backBtn btn' id='beatPadToInstruments' onClick={() => {
                        navigate('/InstrumentChoices')}}>
                            BACK
                    </button>
                </div>
                <div>
                    <h1 className='instrumentTitle' id='beatPadTitle'>
                        FREE STYLE BEAT PAD
                    </h1>
                </div>
            </div>

            {/* Music bar container div */}
            <div id='beatBarContainer'>
                <div className='musicBar' id='beatMusicBar'>
                    <h1 className='displayNotes'>1  2  3</h1>
                </div>

                <button className='btn musicBarBtns playBtn'>
                    <img src={ Play } alt='Play'></img></button>

                <button className='btn musicBarBtns'>
                    <img src={ BackSpace } alt='Backspace'></img></button>

                <button className='btn musicBarBtns'>
                    <img src={ Reset } alt='Reset'></img></button>

            </div>

            {/* Beat Contaner div */}
            <div id='beatContainer'>
                <button className='beatBtn btn'>1</button>
                <button className='beatBtn btn'>2</button>
                <button className='beatBtn btn'>3</button>
                <button className='beatBtn btn'>4</button>
                <button className='beatBtn btn'>5</button>
                <button className='beatBtn btn'>6</button>
                <button className='beatBtn btn'>7</button>
                <button className='beatBtn btn'>8</button>
                <button className='beatBtn btn'>9</button>
            </div>
        </div>
    )
}

export default BeatPad