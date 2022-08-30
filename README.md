# **Music4Kids**

_Music4Kids_ is a JavaScript application designed for P300-BCI control to provide children with significant physical disabilities the opportunity to play digital instruments. This was achieved using Brain-Computer Interfaces which translate information recorded from the electrical changes in the user's brain, via electroencephalography (EEG), into desired outputs on a device (e.g. moving a wheelchair, clicking a button on an application).

## Table of Contents

1. [Background](#background)
   - [The Workings of Brain-Computer Interfaces](#the-workings-of-brain-computer-interfaces-bci)
   - [P300 BCI Paradigm](#p300-bci-paradigm)
2. [Methods](#methods)
   - [Building Music4Kids](#building-music4kids)
   - [Testing Music4Kids](#testing-music4kids)
3. [Results](#results)
4. [Discussion](#discussion)
5. [Conclusion](#conclusion)
6. [Acknowledgements](#acknowledgements)

## **Background**

Children suffering from quadriplegic cerebral palsy are unable to experience fun and meaningful aspects of childhood that nurture healthy development and learning. One of which is participation in musical activity, an activity that is fun, healthy for the development of children, and improves their behavior. Therefore, we must find novel solutions to enrich children's childhood. _Music4Kids_ aims to do just that by developing a BCI-controlled application to allow children with disabilities to learn and play music.

### _The Workings of Brain-Computer Interfaces (BCI)_

The process of BCIs begins by asking the user to perform a mental activity that produces a repeatable and identifiable neurophysiological pattern - this activity can vary from attending to a flashing stimulus or imagined movement. While they are doing so, their brain activity is being recorded by EEG electrodes on their scalp. That signal is then processed to remove any unwanted noise and artefacts. It is then classified through supervised learning to identify the neurophysiological pattern in the signal. Once classified, a control signal is sent to a device that executes a command.

### _P300 BCI Paradigm_

To navigate and play _Music4Kids_, a P300 BCI paradigm is used. This involves asking the user to focus on a target and count how many times it flashes. In doing so, it produces a large peak in EEG approximately 300ms after the presentation of the non-continuous stimuli (i.e. P300-response). Buttons on the page are clicked by matching the occurrence of the P300-response with the button that was flashed at the same time. This essentially allows the user to interact with the application without moving a muscle.

## **Methods**

### _Building Music4Kids_

_Music4Kids_ was first designed in Figma (see prototype here: https://www.figma.com/file/uF6cFDqFc1a1X8YwpxQAHW/Music4Kids?node-id=0%3A1), it currently offers a virtual piano keyboard that prompts the user to build a queue of selected notes and chords to be played in sequence.

![Music4Kids Demonstration](/src/components/photos/Music4Kids%20Demo.gif)

It was built using the JavaScript libraries React.js, Tone.js, and p5.js. React.js was used to build the user interface of the application, with each page being a react component. The start screen, song tutorial menu, instrument menu, and piano settings pages are all functional components. While the piano notes and chords pages are class components to ease the process of integrating p5 sketches into these pages. p5.js was used to create the piano keyboard illustration using [this method.](https://dev.to/christiankastner/integrating-p5-js-with-react-i0d) The audio for the piano notes/chords was recorded in FL Studio and implemented into the application using Tone.js' 'Player' function to play custom audio files on demand.

![Using Music4Kids with P300 Control](/src/components/photos/P300%20Music4Kids%20Demo.gif)

To interact with _Music4Kids_ using P300-control, _Mindset_, a P300 software provided by collaborators at the University of Toronto, was used. _Mindset_ works by detecting the buttons on a given page and overlaying a flashing stimulus over them. By connecting a BCI headset to the system, P300 control can be achieved.

### _Testing Music4Kids_

To test the feasibility of _Music4Kids_ with P300 control, typically developing adults (n=4, age = 27.5 ± 2.9) with previous BCI experience were given 9 separate tasks in _Music4Kids_ which included menu navigation, and note/chord selection. However, before using _Music4Kids_, they must first go through a calibration stage using _Mindset's_ P300 checkerboard (a grid of numbers from 1-9). This stage involves the software telling the user which number to target, and the user counting how many times it flashes over 9 separate trials. It then provides a training accuracy indicating how well the user's P300 response was able to target the given target. They used an [Emotive Epoc-X](https://www.emotiv.com/epoc-x/) BCI headset throughout the entirety of the tests.

## **Results**

The raw data collected from the tests are shown in the following table. Where the numbers under each task indicate how many attempts it required for them to select the correct target on the page. All participants were limited to 3 attempts and any attempts greater was considered a failure.

**Table 1: Raw Data from testing Music4Kids' feasibility with P300 control**
| Participant | Age (Years) | Training Accuracy (%) | Instrument Menu Navigation | Piano Menu Navigation (Notes) | Piano Menu Navigation (Chords) | Note 1 Selection | Note 2 Selection | Note 3 Selection | Chord 1 Selection | Chord 2 Selection | Chord 3 Selection |
| :---------: | :---------: | :-------------------: | :------------------------: | :---------------------------: | :----------------------------: | :--------------: | :--------------: | :--------------: | :---------------: | :---------------: | :---------------: |
| 1 | 24 | 63.39 | 1 | 1 | 1 | 3 | 2 | 4 / fail | 3 | 1 | 2 |
| 2 | 28 | 68.93 | 3 | 3 | 2 | 1 | 3 | 1 | 4 / fail | 2 | 1 |
| 3 | 31 | 71.13 | 1 | 1 | 3 | 1 | 4 / fail | 2 | 1 | 2 | 1 |
| 4 | 27 | 53.30 | 1 | 1 | 1 | 4 / fail | 4 / fail | 4 / fail | 4 / fail | 4 / fail | 4 / fail |

The mean and standard deviations for each task category are shown in the following table. Where the values under each category indicate the average attempts required to perform the tasks.
**Table 2: Summary of Perfomance for each Category**
| Menu Navigation Tasks | Note Selection Tasks | Chord Selection Tasks |
| :-----------------: | :-----------: | :---------------: |
| 1.58 ± 0.90 | 2.75 ± 1.29 | 2.42 ± 1.31 |

The overall online accuracy is summarized in the box plot below.
![Online Accuracy Box Plot](/src/components/photos/Online%20Accuracy%20Boxplot.png)
**Figure 1: Overall Online Accuracy of 4 Adult Users**

## **Discussion**

By taking a look at Table 2, we can see pages with fewer buttons are easier to use with P300-control, which is likely due to the fact that there is less flashing on the page, and therefore, fewer distractions.

## **Conclusion**

_Music4Kids_ shows promise to enable children with severe disabilities the opportunity to learn and play music for the first time - allowing them to participate in activities that nurture healthy development. However, improvements in the P300 control paradigm are required to achieve functional control (i.e. select target within only 1 attempt).

## **Acknowledgements**

This project was funded by the Biomedical Engineering - Alberta Children's Hospital Research Institute. _Mindset_ was provided by Jason Leung in the PRISM Lab at the University of Toronto. Special thanks to Erica Floreani, Eli Kinney-Lang, Garrett Flynn, and Adam Kirton for their endless support during this project, as well as, all my fellow team members in the BCI4Kids Lab.
