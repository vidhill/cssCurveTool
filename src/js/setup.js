/**
 * Created by davidhill on 12/07/2016.
 */

export default function (snap, docSetting) {
    var tLineSetting = {
        width: (docSetting.width - (docSetting.sidePad * 2)),
        height: 300,
        yPos: docSetting.height - docSetting.bottomPad
    };

    // draw timeline
    tLineSetting.objRef = snap.path(`M0 ${tLineSetting.yPos} h${tLineSetting.width}`)
        .attr({
            stroke: '#000',
            strokeWidth: 1
        });

    //tLineSetting.objRef = objRef;

    return tLineSetting;
}
