import React, { Component } from "react";
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";

/**
 * Text editor for replying
 */
class Reply extends Component {
    render() {
        return (
            <div>
                <DraftailEditor
                    style={{ margin: "16px" }}
                    rawContentState={null}
                    onSave={this.props.onSave}
                    blockTypes={[{ type: BLOCK_TYPE.CODE }]}
                    inlineStyles={[
                        { type: INLINE_STYLE.BOLD },
                        { type: INLINE_STYLE.ITALIC },
                        { type: INLINE_STYLE.UNDERLINE }
                    ]}
                />
            </div>
        );
    }
}

export default Reply;
