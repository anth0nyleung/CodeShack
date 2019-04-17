import React, { Component } from "react";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";

class InfoPopover extends Component {
    state = {};
    render() {
        return (
            <div>
                <span>
                    <a href="#popover" id={this.props.id}>
                        {this.props.buttonText}
                    </a>
                </span>
                <UncontrolledPopover
                    trigger="hover"
                    placement="left"
                    target={this.props.id}
                >
                    <PopoverHeader>
                        {this.props.popoverHeaderText}
                    </PopoverHeader>
                    <PopoverBody>{this.props.popoverBodyText}</PopoverBody>
                </UncontrolledPopover>
            </div>
        );
    }
}

export default InfoPopover;
