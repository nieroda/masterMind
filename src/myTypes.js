
export const colorNumbers = {
    BlueViolet: 0,
    Crimson: 1,
    Cyan: 2,
    Magenta: 3,
    Violet: 4,
    Yellow: 5
}

export const colorMap = {
    0: "BlueViolet",
    1: "Crimson",
    2: "Cyan",
    3: "Magenta",
    4: "Violet",
    5: "Yellow"
}

export type Color = $Keys<typeof colorNumbers> | null


export const colorTransition = {
    null: "BlueViolet",
    "BlueViolet": "Crimson",
    "Crimson": "Cyan",
    "Cyan": "Magenta",
    "Magenta": "Violet",
    "Violet": "Yellow",
    "Yellow": "BlueViolet"
}

export type HintColor = white | red | null


