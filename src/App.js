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
import Register from "./components/Register/Register";

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
            route: 'signin',
            signedIn: false
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
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    };

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                { route === 'home'
                    ? <div>
                        <Logo />
                        <Rank/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                    : (
                        route === 'signin'
                            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}


export default App;
