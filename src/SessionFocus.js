import React from 'react';
import { minutesToDuration } from './utils/duration';
import './styles/SessionFocus.module.css';

function SessionFocus({ focusDuration, setFocusDuration }) {
  return (
    <div>
      <div>
        <div className='input-group input-group-lg focus-group'>
          <span data-testid='duration-focus' className='focus'>
            Focus Duration: {minutesToDuration(focusDuration)}
          </span>
          <div className='input-group-append focus-button'>
            <button
              className='minus'
              type='button'
              data-testid='decrease-focus'
              onClick={() =>
                setFocusDuration((time) => (time > 5 ? time - 5 : time))
              }
            >
              <i class='bx bx-minus-circle bx-md'></i>
              {/* <box-icon type='regular' name='minus-circle'></box-icon> */}
              {/* <span className='oi oi-minus' /> */}
            </button>
            <button
              className='plus'
              type='button'
              data-testid='increase-focus'
              onClick={() =>
                setFocusDuration((time) => (time < 60 ? time + 5 : time))
              }
            >
              <i class='bx bx-plus-circle bx-md'></i>
              {/* <box-icon type='regular' name='plus-circle' size='lg'></box-icon> */}
              {/* <span className='oi oi-plus' /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionFocus;
