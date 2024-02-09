/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface TooltipStencilComponent {
        "text": string;
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLTooltipStencilComponentElement extends Components.TooltipStencilComponent, HTMLStencilElement {
    }
    var HTMLTooltipStencilComponentElement: {
        prototype: HTMLTooltipStencilComponentElement;
        new (): HTMLTooltipStencilComponentElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "tooltip-stencil-component": HTMLTooltipStencilComponentElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface TooltipStencilComponent {
        "text"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "tooltip-stencil-component": TooltipStencilComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "tooltip-stencil-component": LocalJSX.TooltipStencilComponent & JSXBase.HTMLAttributes<HTMLTooltipStencilComponentElement>;
        }
    }
}
