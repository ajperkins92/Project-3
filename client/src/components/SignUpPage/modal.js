import React from "react";
import Modal from 'react-awesome-modal';

function OurModal(props) {
    return (
        <Modal visible={props.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => props.close()}>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ color: props.color }}>{props.messageheader}</h2>
                <p>{props.message}</p>
                <a href="javascript:void(0);" onClick={() => props.close()}>Close</a>
            </div>
        </Modal>
    );
}

export default OurModal;

