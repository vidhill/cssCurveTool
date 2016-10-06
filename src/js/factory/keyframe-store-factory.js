/**
 * Created by davidhill on 02/08/2016.
 */


export default function () {
    let keyFrames = [];

    return {
        setKeyFrames(keys){
            keyFrames = keys;
            return keyFrames;

        },
        getKeyFrames(){
            return keyFrames;
        },
        addKeyFrame(key){
            if(key.hasOwnProperty('offset')){
                keyFrames.push(key);
            } else {
                throw new TypeError('Keyframes should have an offset property');
            }
        },
        removeKeyFrame(index){
            keyFrames.splice(index, 1);
            return keyFrames;
        },
        updateKeyOffset(index, newOffset){
            keyFrames[index].offset = newOffset;
            return keyFrames[index];
        }

    };
}
