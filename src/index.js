import { paint } from "./lib/shaderBinder";
import {FlatGrayConvert} from  "./shaders/flat-gray";
import { GrayScaleConverter } from "./shaders/graScale";

const FlatGray = (fileName, canvas) => {
    paint(fileName, canvas, FlatGrayConvert)
}

const GrayScale = (fileName, canvas) => {
    paint(fileName, canvas, GrayScaleConverter)
}

export default paint;
export {
    FlatGray,
    GrayScale
}