import React from 'react';
import { minutesToDuration } from './utils/duration';


function SessionFocus({ focusDuration, setFocusDuration }) {
  
  return (
    
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            Focus Duration: {minutesToDuration(focusDuration)}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              onClick={() => setFocusDuration(time => time > 5 ? time - 5 : time)}
            >
              <span className="oi oi-minus" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
              onClick={() => setFocusDuration(time => time < 60 ? time + 5 : time)}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
     </div>
    );
}

export default SessionFocus; 