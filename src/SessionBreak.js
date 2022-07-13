import React from 'react';
import { minutesToDuration } from './utils/duration';
import './styles/SessionBreak.module.css';

function SessionBreak({ breakDuration, setBreakDuration }) {
  return (
    <div>
      <div>
        <div>
          <div className='input-group input-group-lg break-group'>
            <span data-testid='duration-break' className='break'>
              Break Duration: {minutesToDuration(breakDuration)}
            </span>
            <div className='input-group-append break-button'>
              <button
                className='minus'
                type='button'
                data-testid='decrease-break'
                onClick={() =>
                  setBreakDuration((time) => (time > 1 ? time - 1 : time))
                }
              >
                <i class='bx bx-minus-circle bx-md'></i>
                {/* <box-icon type='regular' name='minus-circle'></box-icon> */}
                {/* <span className='oi oi-minus' /> */}
              </button>
              <button
                className='plus'
                type='button'
                data-testid='increase-break'
                onClick={() =>
                  setBreakDuration((time) => (time < 15 ? time + 1 : time))
                }
              >
                <i class='bx bx-plus-circle bx-md'></i>
                {/* <box-icon type='regular' name='plus-circle'></box-icon> */}
                {/* <span className='oi oi-plus' /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionBreak;
