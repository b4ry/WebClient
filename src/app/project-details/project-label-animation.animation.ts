import { trigger, state, style, transition, animate } from "@angular/core";

export const projectLabelAnimation =
trigger("itemState", [
    state("next", style({opacity: 1})),
    state("void-next",   style({opacity: 0, transform: "translateX(-100%)"})),
    state("previous", style({opacity: 1})),
    state("void-previous",   style({opacity: 0, transform: "translateX(100%)"})),
    transition("* => void-next", [
        animate("0.3s", style({
            opacity: 0,
            transform: "translateX(100%)"
        }))
    ]),
    transition("void-next => next", [
        animate("0.3s", style({
            opacity: 1,
            transform: "translateX(0)"
        }))
    ]),
    transition("* => void-previous", [
        animate("0.3s", style({
            opacity: 0,
            transform: "translateX(-100%)"
        }))
    ]),
    transition("void-previous => previous", [
        animate("0.3s", style({
            opacity: 1,
            transform: "translateX(0)"
        }))
    ])
]);