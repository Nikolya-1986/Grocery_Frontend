import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

export const scaleImage = {
    animation: [
        trigger('scaleImageState', [
            state('rest', style({
                transform: 'scale(1)',
                filter: 'contrast(70%)'
            })),
            state('hover', style({
                transform: 'scale(1.26)',
                filter: 'contrast(100%)'
            })),
            transition('rest => hover', animate('600ms ease-in')),
            transition('hover => rest', animate('200ms ease-out'))
        ])
    ]
};

export const rorateImage = {
    animation: [
        trigger('rotatedImageState', [
            state('default', style({
                transform: 'rotate(0)'
            })),
            state('rotated', style({
                transform: 'rotate(-180deg)'
            })),
            transition('rotated => default', animate('1500ms ease-out')),
            transition('default => rotated', animate('500ms ease-in'))
        ])
    ]
}