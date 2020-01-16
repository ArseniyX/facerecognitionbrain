import React from "react";

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className={'center'}>
            <div className={'absolute mt2'}>
                <img id={'input-image'} src={imageUrl} alt="" width={'400px'} height={'auto'}/>
                <div className={'bounding-box'}/>
            </div>
        </div>
    );
};

export default FaceRecognition;