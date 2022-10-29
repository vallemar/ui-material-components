import { NativeScriptVue } from 'nativescript-vue';
import Vue from 'vue';
import { BottomSheetOptions } from '../bottomsheet';
import { View } from '@nativescript/core';

export interface VueBottomSheetOptions extends Omit<BottomSheetOptions, 'view'> {
    props?: any;
}

declare module 'nativescript-vue' {
    interface NativeScriptVue<V = View> extends Vue {
        $showBottomSheet(component: typeof Vue, options?: VueBottomSheetOptions): Promise<any>;
        $closeBottomSheet(...args);
    }
}

let sequentialCounter = 0;

function serializeModalOptions(options) {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    const allowed = ['fullscreen'];

    return (
        Object.keys(options)
            .filter((key) => allowed.includes(key))
            .map((key) => `${key}: ${options[key]}`)
            .concat(`uid: ${++sequentialCounter}`)
            .join(', ') + '_bottomsheet'
    );
}

const useSheet = () =>{
    const show = (component, options) => showSheet(component, options);
    const close = (...args) => closeSheet(args);

    return {
        show,
        close
    }
}

const showSheet = (component, options: VueBottomSheetOptions) =>{
    return new Promise((resolve) => {
        let resolved = false;

        let navEntryInstance = createNativeView(component, {
            props: options.props,
            key: serializeModalOptions(options)
        })

        Frame.topmost().showBottomSheet(Object.assign({}, options, {
            view: navEntryInstance,
            closeCallback: (...args) => {
                if (resolved) {
                    return;
                }
                resolved = true;
                if (navEntryInstance && navEntryInstance) {
                    options.closeCallback && options.closeCallback.apply(undefined, args);
                    resolve(...args);
                    //TODO: add emit
                    /*          navEntryInstance.$emit('bottomsheet:close');
                              navEntryInstance.$destroy();*/
                    navEntryInstance = null;
                }
            }
        }));
    });
}
const closeSheet = (...args) => {
    //TODO: implement
    this.nativeView.closeBottomSheet.apply(this.nativeView, args);
}

const BottomSheetPlugin = {
    install(app) {
        const globals = app.config.globalProperties;

        globals.$showBottomSheet = showSheet;
        globals.$closeBottomSheet = closeSheet;
    }
};

export default BottomSheetPlugin;
