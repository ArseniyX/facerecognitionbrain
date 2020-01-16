import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className={'center'}>
            <div className={'absolute mt2'}>
                <img id={'input-image'} src={imageUrl} alt="" width={'400px'} height={'auto'}/>
                {document.createElement('div').style.top = box.topRow}
                <div className={'bounding-box'} style={{
                    top: box.topRow,
                    bottom: box.bottomRow,
                    right: box.rightCol,
                    left: box.leftCol
                }}/>
            </div>
        </div>
    );
};

export default FaceRecognition;