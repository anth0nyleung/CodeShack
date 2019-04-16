/* @flow */
import React from "react";
import type { Node } from "react";
import type { ContentBlock } from "draft-js";
import { BLOCK_TYPE } from "draftail";
import Prism from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-sql";

type Options = {|
    defaultLanguage: String
|};

/**
 * Syntax highlighting with Prism as a Draft.js decorator.
 * This code is an adaptation of https://github.com/SamyPesse/draft-js-prism
 * to use the CompositeDecorator strategy API.
 */
class PrismDecorator {
    /* :: options: Options; */
    /* :: highlighted: {}; */
    /* :: component: (props: { children: Node, offsetKey: string }) => Node; */
    /* :: strategy: (block: ContentBlock, (start: number, end: number) => void) => void; */

    constructor(options: Options) {
        this.options = options;
        this.highlighted = {};

        this.component = this.renderToken.bind(this);
        this.strategy = this.getDecorations.bind(this);
    }

    // Renders the decorated tokens.
    renderToken({
        children,
        offsetKey
    }: {
        children: Node,
        offsetKey: string
    }) {
        const type = this.getTokenTypeForKey(offsetKey);
        //console.log(children, type, offsetKey);
        return <span className={`token ${type}`}>{children}</span>;
    }

    getTokenTypeForKey(key: string) {
        const [blockKey, tokId] = key.split("-");
        //console.log(this.highlighted, blockKey, tokId);
        const token = this.highlighted[blockKey][tokId];
        //console.log(token);
        return token ? token.type : "";
    }

    getDecorations(
        block: ContentBlock,
        callback: (start: number, end: number) => void
    ) {
        // Only process code blocks.
        if (block.getType() !== BLOCK_TYPE.CODE) {
            return;
        }

        const language = block
            .getData()
            .get("language", this.options.defaultLanguage);

        // Allow for no syntax highlighting
        if (language == null) {
            console.log("no language");
            return;
        }

        const blockKey = block.getKey();
        const blockText = block.getText();

        let tokens;

        try {
            //console.log(Prism.languages);
            tokens = Prism.tokenize(blockText, Prism.languages[language]);
            //console.log(tokens);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            return;
        }

        this.highlighted[blockKey] = {};

        let tokenCount = 0;
        tokens.reduce((startOffset, token) => {
            const endOffset = startOffset + token.length;

            //console.log(token, blockKey);

            this.highlighted[blockKey][tokenCount] = token;
            tokenCount += 1;
            callback(startOffset, endOffset);

            return endOffset;
        }, 0);
    }
}

export default PrismDecorator;
