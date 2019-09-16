import GoldenLayout from 'golden-layout'

const ReactComponentHandler = GoldenLayout["__lm"].utils.ReactComponentHandler

//Patching react component handler to propagate parent context: https://github.com/deepstreamIO/golden-layout/issues/395
// see source of the class here file://./home/pmunin/Documents/retrolator/ui/node_modules/golden-layout/src/js/utils/ReactComponentHandler.js
//Source: https://github.com/WolframHempel/golden-layout/blob/88b5449915aacec6cc228964f6b57cb083b98c18/src/js/utils/ReactComponentHandler.js
class ReactComponentHandlerPatched extends ReactComponentHandler {
    _render() {
        var reactContainer = this._container.layoutManager.reactContainer
        if(reactContainer&&reactContainer.componentRender)
            reactContainer.componentRender(this)
    }
    _destroy() {
		this._container.off( 'open', this._render, this );
		this._container.off( 'destroy', this._destroy, this );
	}
}

GoldenLayout["__lm"].utils.ReactComponentHandler = ReactComponentHandlerPatched

