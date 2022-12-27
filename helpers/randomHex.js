/*
* Copyright (c) 2022 Barbara Kälin
* All rights reserved.
* MIT License
*/

export function randomHex() {
    let randomFill = (`#${(`000000${(Math.floor(Math.random() * 16777215)).toString(16)}`).slice(-6)}`)
    return randomFill;
};
