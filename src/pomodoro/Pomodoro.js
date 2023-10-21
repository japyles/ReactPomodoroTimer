import React, { useState } from 'react';
import classNames from '../utils/class-names';
import useInterval from '../utils/useInterval';
import { minutesToDuration, secondsToDuration } from '../utils/duration';
import SessionFocus from '../SessionFocus';
import SessionBreak from '../SessionBreak';
import '../styles/Pomodoro.module.css';

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState = {}) {
  if (!prevState) return;
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === 'Focusing') {
      return {
        label: 'On Break',
        timeRemaining: breakDuration * 60,
      };
    }

    return {
      label: 'Focusing',
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);

  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  useInterval(
    () => {
      if (session && session.timeRemaining === 0) {
        new Audio('https://bigsoundbank.com/UPLOAD/mp3/1482.mp3').play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession === null) {
            return {
              label: 'Focusing',
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className='pomodoro'>
      {/* <div className='items'>
        <div className='focus'>
          <SessionFocus
            focusDuration={focusDuration}
            setFocusDuration={setFocusDuration}
          />
        </div>
        <div className='break'>
          <SessionBreak
            breakDuration={breakDuration}
            setBreakDuration={setBreakDuration}
          />
        </div>
      </div> */}

      <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        {session && (
          <div>
            <div className='timer'>
              <div className='col'>
                {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
                <h2
                  data-testid='session-title'
                  className='session'
                  style={{ fontSize: '0.6em' }}
                >
                  {session.label} for{' '}
                  {session.label === 'Focusing'
                    ? minutesToDuration(focusDuration)
                    : minutesToDuration(breakDuration)}{' '}
                  minutes
                </h2>
                {/* TODO: Update message below correctly format the time remaining in the current session */}
                <p className='lead remaining' data-testid='session-sub-title'>
                  {secondsToDuration(session.timeRemaining)} remaining
                </p>
              </div>
            </div>
            <div>
              <div>
                <div className='progress' style={{ height: '20px' }}>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    aria-valuenow={
                      session.label === 'Focusing'
                        ? (1 - session.timeRemaining / (focusDuration * 60)) *
                          100
                        : (1 - session.timeRemaining / (breakDuration * 60)) *
                          100
                    } // TODO: Increase aria-valuenow as elapsed time increases
                    style={{
                      width:
                        session.label === 'Focusing'
                          ? (1 - session.timeRemaining / (focusDuration * 60)) *
                              100 +
                            '%'
                          : (1 - session.timeRemaining / (breakDuration * 60)) *
                              100 +
                            '%',
                    }} // TODO: Increase width % as elapsed time increases
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div>
          <div
            className='btn-group btn-group-lg mb-2'
            role='group'
            aria-label='Timer controls'
          >
            <button
              type='button'
              data-testid='play-pause'
              title='Start or pause timer'
              onClick={playPause}
            >
              <div className='play'>
                {!isTimerRunning ? (
                  <i className='bx bx-play-circle bx-md'></i>
                ) : (
                  // <box-icon type='regular' name='play-circle'></box-icon>
                  <i className='bx bx-pause-circle bx-md'></i>
                  // <box-icon type='regular' name='pause-circle'></box-icon>
                )}
              </div>

              {/* <span
                className={classNames({
                  oi: true,
                  'oi-media-play': !isTimerRunning,
                  'oi-media-pause': isTimerRunning,
                })}
              /> */}
            </button>

            <button
              className='stop'
              type='button'
              data-testid='stop'
              disabled={session == null}
              onClick={() => {
                setSession(null);
                setIsTimerRunning(false);
              }}
              title='Stop the session'
            >
              <i className='bx bx-stop-circle bx-md'></i>
              {/* <box-icon type='regular' name='stop-circle'></box-icon> */}
              {/* <span className='oi oi-media-stop' /> */}
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: session ? 'none' : 'flex' }}>
        <div className='items'>
          <div className='focus-placeholder'>
            <SessionFocus
              focusDuration={focusDuration}
              setFocusDuration={setFocusDuration}
            />
          </div>
          <div className='break-placeholder'>
            <SessionBreak
              breakDuration={breakDuration}
              setBreakDuration={setBreakDuration}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
