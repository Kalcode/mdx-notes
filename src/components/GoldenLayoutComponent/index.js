/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import './goldenLayout-dependencies';
import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';

import { ReactComponentHandlerPatched } from './ReactComponentHandlerPatched';

export class GoldenLayoutComponent extends React.Component {
  static goldenLayoutInstance = undefined;

  state = {};

  containerRef = React.createRef();

  goldenLayoutInstance;
 
  componentDidMount() {
    this.goldenLayoutInstance = new GoldenLayout(
      this.props.config || {},
      this.containerRef.current
    );

    GoldenLayoutComponent.goldenLayoutInstance = this.goldenLayoutInstance;
    
    if (this.props.registerComponents instanceof Function)
      this.props.registerComponents(this.goldenLayoutInstance);

    this.goldenLayoutInstance.reactContainer = this;
    this.goldenLayoutInstance.init();

    window.addEventListener('resize', () => {
      this.goldenLayoutInstance.updateSize();
    });
  }

  componentRender(reactComponentHandler) {
    this.setState(state => {
      const newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.add(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }


  componentDestroy(reactComponentHandler) {
    this.setState(state => {
      const newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.delete(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }


  render() {
    const panels = Array.from(this.state.renderPanels || []);
    return (
      <div ref={this.containerRef} {...this.props.htmlAttrs}>
        {panels.map((panel) => {
          return ReactDOM.createPortal(
            panel._getReactComponent(),
            panel._container.getElement()[0]
          );
        })}
      </div>
    );
  }
}

GoldenLayout.__lm.utils.ReactComponentHandler = ReactComponentHandlerPatched;
