import React from 'react';
import Particles from "react-particles-js";
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Clarifai from 'clarifai';
import Signin from "./components/Signin/Signin";

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

const app = new Clarifai.App({
    apiKey: '8024f31f965b49bcb769af17d8cf828c'
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin'
        }
    }

    calculateFaceLocation = (data) => {
        const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('input-image');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifyFace.left_col * width,
            topRow: clarifyFace.top_row * height,
            rightCol: width - (clarifyFace.right_col * width),
            bottomRow: height - (clarifyFace.bottom_row * height)
        }
    };

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box: box})
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    };

    onRouteChange = (route) => {
        this.setState({route})
    };

    render() {
        return (
            <div className="App">
                <Particles
                    className={'particles'}
                    params={particlesOptions}/>
                {this.state.route === 'signin'
                    ? <Signin onRouteChange={this.onRouteChange}/>
                    : <div>
                        <Navigation onRouteChange={this.onRouteChange}/>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
                    </div>
                }
            </div>
        );
    }
}

export default App;
