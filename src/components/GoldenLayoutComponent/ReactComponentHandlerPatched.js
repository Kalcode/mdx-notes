/* eslint-disable no-underscore-dangle */
import React from 'react';
import GoldenLayout from 'golden-layout';
import $ from 'jquery';

const {ReactComponentHandler} = GoldenLayout.__lm.utils;

export class ReactComponentHandlerPatched extends ReactComponentHandler {
  _render() {
    const {reactContainer} = this._container.layoutManager; // Instance of GoldenLayoutComponent class
    if (reactContainer && reactContainer.componentRender)
      reactContainer.componentRender(this);
  }

  _destroy() {
    const {reactContainer} = this._container.layoutManager;
    if (reactContainer && reactContainer.componentDestroy) {
      reactContainer.componentDestroy(this);
    }
    
    this._container.off('open', this._render, this);
    this._container.off('destroy', this._destroy, this);
  }

  _getReactComponent() {
    // the following method is absolute copy of the original, provided to prevent depenency on window.React
    const defaultProps = {
      glEventHub: this._container.layoutManager.eventHub,
      glContainer: this._container
    };
    const props = $.extend(defaultProps, this._container._config.props);
    return React.createElement(this._reactClass, props);
  }
}