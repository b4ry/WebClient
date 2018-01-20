import { trigger, state, style, transition, animate } from "@angular/core";

export const techIconAnimations = 
trigger('itemState', [
    state('selected', style({transition: 'transform 2s',  transform: 'translateX(0) scale(1.5)'})),
    state('unselected', style({transition: 'transform 2s',  transform: 'translateX(0) scale(0.5)'})),
    state('listed', style({transition: 'transform 2s',  transform: 'translateX(0) scale(1)'})),
    state('void',   style({opacity: 0, display: 'none', transform: 'translateX(0) scale(0.5)'})),
    transition('* => void', [
        animate('1000ms', style({
            opacity: 0,
            transform: 'translateX(0) scale(0.5)'
        }))
    ]),
    transition('void => unselected', [
        animate('1000ms', style({
            opacity: 1,
            transform: 'translateX(0) scale(0.5)'
        }))
    ]),
    transition('void => listed', [
        animate('1000ms', style({
            opacity: 1,
            transform: 'translateX(0) scale(1)'
        }))
    ]),
])