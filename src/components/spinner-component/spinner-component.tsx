import { Component, h } from '@stencil/core';
// The h import is used behind the scenes by stencil to create the virtual DOM elements

@Component({
  tag: 'spinner-component',
  styleUrl: 'spinner-component.css',
  shadow: true,
})
export class SpinnerComponent {
  render() {
    return <div class="lds-hourglass"></div>;
  }
}
