import React from 'react';

const Popup = ({data, closePopup}) => {
    
    return (
        <div className="popupModal">
            <div className="popupContainer">
                <div className="popupHeader">
                    <span>{data&&data.type}</span>
                    <span className="closeBtn" onClick={closePopup}>X</span>
                </div>
                <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <div className="popupTitle">{data && data.message}</div>
                    <div style={{ display: 'flex', gap: '20px', margin: '0px auto 15px auto' }}>
                        {(data && data.buttons) && data.buttons.map((btn) => {
                            return <>
                                <div style={{ backgroundColor: btn.color, color: 'white', padding: '5px 15px', textTransform: 'capitalize', borderRadius: '3px', cursor: 'pointer' }} onClick={()=>btn.action()}>{btn.title}</div>
                            </>
                        })}
                    </div>
                </div>
                <div style={{margin: '0 0px 10px 10px'}}>{data&&data.disclaimer}</div>
            </div>
        </div>
    );
};

export default Popup;