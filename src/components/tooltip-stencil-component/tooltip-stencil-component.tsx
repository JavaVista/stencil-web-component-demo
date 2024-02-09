import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'tooltip-stencil-component',
  styleUrl: 'tooltip-stencil-component.css',
  shadow: true,
})
export class TooltipStencilComponent {
  // @Prop to define to define attribute that can be passed to the component
  @Prop() text: string = 'This is a Marvelous default tooltip text';

  // @State to manage internal state changes
  @State() tooltipVisible: boolean = false;

  private showTooltip() {
    this.tooltipVisible = true;
  }

  private removeTooltip() {
    this.tooltipVisible = false;
  }

  render() {
    return (
      <div>
        <slot>Marvelous placeholder for default text</slot>
        <span onMouseMove={this.showTooltip.bind(this)} onMouseOut={this.removeTooltip.bind(this)}>
          ❔
        </span>
        {this.tooltipVisible && <div class="tooltip-container">{this.text}</div>}
      </div>
    );
  }
}
