/**
 * Created by davidhill on 12/07/2016.
 */

export default function (docSetting, tLineSetting) {

    // create root svg element
    const snapDoc = Snap(docSetting.width, docSetting.height);

    // draw background
    snapDoc.rect(0, 0, docSetting.width, docSetting.height).attr({
        fill: docSetting.bgColour
    });

    // create a group element to contain all elements
    const containAll = snapDoc.g();

    // draw timeline
    containAll.path(`M0 0 h${tLineSetting.width}`)
        .attr({
            stroke: '#000',
            strokeWidth: 1
        });

    // move everything over to the right
    containAll.transform(`translate(${docSetting.sidePad} ${tLineSetting.yPos})`);

    return containAll;
}
