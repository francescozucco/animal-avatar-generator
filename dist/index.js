import { pick } from './utils/array.js';
import { createBackground, createBlackout, createSvg } from './utils/svg.js';
import { seedrandom } from './utils/random.js';
import { avatarColors as aColors, backgroundColors as bColors } from './palette/index.js';
import { faces, ears, muzzles, eyes, brows, patterns, hairs, emptyShape } from './shapes/index.js';
const avatar = (seed, { size = 150, avatarColors = aColors, backgroundColors = bColors, blackout = true, round = true, } = {}) => {
    const random = seedrandom(seed);
    const backgroundColor = pick(backgroundColors, random());
    const avatarColor = pick(avatarColors, random());
    const optional = (shapes) => shapes.map((shape) => random() % 2 ? shape : emptyShape);
    const shapes = [
        faces,
        optional(patterns),
        ears,
        optional(hairs),
        muzzles,
        eyes,
        brows,
    ];
    const createAvatar = () => shapes
        .map((shape) => pick(shape, random()))
        .map((shape) => shape(avatarColor))
        .join('');
    return createSvg(size, createBackground(round, backgroundColor), createAvatar(), blackout ? createBlackout(round) : '');
};
export default avatar;
