import React, { Component } from "react";
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail";

class QuestionEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null
        };
    }

    onSave = content => {
        this.setState({ content });
        console.log(content);
    };

    render() {
        return (
            <DraftailEditor
                style={{ margin: "16px" }}
                rawContentState={null}
                onSave={this.onSave}
                blockTypes={[
                    { type: BLOCK_TYPE.HEADER_THREE },
                    { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
                    { type: BLOCK_TYPE.ORDERED_LIST_ITEM }
                ]}
                inlineStyles={[
                    { type: INLINE_STYLE.BOLD },
                    { type: INLINE_STYLE.ITALIC }
                ]}
            />
        );
    }
}

export default QuestionEditor;
