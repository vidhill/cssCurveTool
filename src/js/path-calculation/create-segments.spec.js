/* eslint-env jasmine */

import { default as createSegments, segmentMethods } from './create-segments.js';

describe('The \'createSegments\' method', () => {
    it('should exist as a method', () => {
        expect(createSegments).toEqual(jasmine.any(Function));
    });

    it('should return a correctly formatted path string', () => {
        let inputs = [{
            x: 0,
            y: 100,
            forwardCurve: {
                x: 100.5,
                y: 100
            }
        }, {
            x: 239,
            y: 400,
            backwardCurve: {
                x: 100.5,
                y: 400
            },
            forwardCurve: {
                x: 340.7,
                y: 400
            }
        }, {
            x: 479,
            y: 250,
            backwardCurve: {
                x: 340.7,
                y: 250
            },
            forwardCurve: {
                x: 581,
                y: 250
            }
        }, {
            x: 720,
            y: 400,
            backwardCurve: {
                x: 581,
                y: 400
            }
        }];
        let expectedResult = 'M0 100 C100.5 100 100.5 400 239 400 M239 400 C340.7 400 340.7 250 479 250 M479 250 C581 250 581 400 720 400';

        expect(createSegments(inputs)).toEqual(expectedResult);
    });

});

describe('The \'segmentMethods\' object', () => {
    it('should exist as an object', () => {
        expect(segmentMethods).toBeDefined();
    });

    describe('The \'segmentMethods.cubicBezier\' method', () => {
        it('should exist as a method', () => {
            expect(segmentMethods.cubicBezier).toEqual(jasmine.any(Function));
        });

        it('should return a correctly formatted cubicBezier path string', () => {
            let pointA = {
                x: 0,
                y: 100,
                forwardCurve: {
                    x: 100,
                    y: 100
                }
            };
            let pointB = {
                x: 239,
                y: 400,
                backwardCurve: {
                    x: 100,
                    y: 400
                }
            };

            let expectedResult = 'M0 100 C100 100 100 400 239 400';

            expect(segmentMethods.cubicBezier(pointA, pointB)).toEqual(expectedResult);
        });

    });

});
