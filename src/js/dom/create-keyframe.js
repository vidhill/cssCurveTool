

const thumbDimensions = {
    width: 5,
    height: 15
};

export default function(refContain, group, timeLine){
    refContain.line = group.path(`M0,${timeLine.yPos},v-${timeLine.height}`)
        .attr({
            stroke: '#000',
            strokeOpacity: 0.5,
            strokeWidth: 1
        });

    refContain.thumb = group.rect(0, timeLine.yPos , thumbDimensions.width, thumbDimensions.height)
        .transform(`translate(-${thumbDimensions.width/2} -${thumbDimensions.height/2})`);


    refContain.labelText = group.text(0, timeLine.yPos + 30, '')
        .attr({
            textAnchor: 'middle'
        });

    refContain.timeText = group.text(0, timeLine.yPos + 60, '')
        .attr({
            textAnchor: 'middle'
        });

    refContain.pathPoint = group.circle(0, 0, 5);

    return refContain;
}
