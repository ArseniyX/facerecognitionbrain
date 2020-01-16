import React from "react";
import Tilt from 'react-tilt';
import brain from './logo.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className={'ma4 mt0'}>
            <Tilt className="Tilt br2 shadow-3" options={{max: 55}} style={{height: 150, width: 150}}>
                <span aria-label={'Tile-img pa2'} role={'img'} className="Tilt-inner">
                    <img
                        height={'125px'}
                        width={'125px'}
                        style={{paddingTop: '12px'}}
                        alt={'logo'}
                        src={brain}
                    />
                </span>
            </Tilt>
        </div>
    );
};

export default Logo;