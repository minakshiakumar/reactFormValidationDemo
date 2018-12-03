import React, { Component } from 'react';
import './tooltipComponent.css';

const ToolTip = ({ show, content }) => {
    return (
        <div>
            {show &&
                <div className="toolTip mt-4">
                    <div className="tooltiptext">
                        {content}
                    </div>
                </div>
                }
        </div>
    );
}

export default ToolTip;
