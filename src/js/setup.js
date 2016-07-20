/**
 * Created by davidhill on 12/07/2016.
 */

export default function (snap, docSetting) {
    var tLineSetting = {
        width: (docSetting.width - (docSetting.sidePad * 2)),
        height: 300,
        xPos: docSetting.sidePad,
        yPos: docSetting.height - docSetting.bottomPad
    };

    snap.rect(0, 0, docSetting.width, docSetting.height).attr({
        fill: docSetting.bgColour
    });

    var objRef = snap.path(`M${tLineSetting.xPos} ${tLineSetting.yPos} h${tLineSetting.width}`)
        .attr({
            stroke: "#000",
            strokeWidth: 1
        });

    tLineSetting.objRef = objRef;

    return tLineSetting;
};