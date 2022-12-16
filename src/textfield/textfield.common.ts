import { CSSType, Color, TextField as NTextField, ImageSource } from '@nativescript/core';
import { cssProperty } from '@nativescript-community/ui-material-core';
import { VerticalTextAlignment } from '@nativescript-community/text';

@CSSType('MDTextField')
export abstract class TextFieldBase extends NTextField {
    abstract requestFocus();
    abstract clearFocus();
    abstract setStartIcon: (imageSource: ImageSource, onTap?: (nativeView) => void) => void;

    // those 2 are not released yet
    secureWithoutAutofill: boolean;
    closeOnReturn: boolean;

    @cssProperty helper: string;
    @cssProperty helperColor: Color;
    @cssProperty counterMaxLength: number;
    @cssProperty errorColor: Color;
    @cssProperty floating = true;
    @cssProperty placeholderColor: Color;
    @cssProperty variant: 'outline' | 'underline' | 'filled' | 'none' = 'filled';
    @cssProperty error: string;
    @cssProperty strokeColor: Color;
    @cssProperty strokeInactiveColor: Color;
    @cssProperty strokeDisabledColor: Color;
    @cssProperty floatingColor: Color;
    @cssProperty floatingInactiveColor: Color;
    @cssProperty buttonColor: Color;
    @cssProperty digits: string;
    @cssProperty verticalTextAlignment: VerticalTextAlignment;
}
