import { useEffect, useState } from 'react';
import './Stopwatch.scss';
import { Time, Timer, Buttons, Laps } from '../';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(new Time(0));
  const [stopTime, setStopTime] = useState(new Time(0));
  const [lapStartTime, setLapStartTime] = useState(new Time(0));
  const [lapStopTime, setLapStopTime] = useState(new Time(0));
  const [laps, setLaps] = useState([new Time(0)]);

  const handleStart = () => {
    const now = Date.now();

    setIsRunning(true);
    setStartTime(new Time(now));
    setLapStartTime(new Time(now));
  };

  const handleStop = () => {
    const now = Date.now();

    setIsRunning(false);
    setStopTime(new Time(now));
    setLapStopTime(new Time(now));
  };

  const handleResume = () => {
    const now = Date.now();

    setIsRunning(true);
    setStartTime(new Time(now - (stopTime.origin - startTime.origin)));
    setLapStartTime(new Time(now - (lapStopTime.origin - lapStartTime.origin)));
  };

  const handleRun = () => {
    isRunning
      ? handleStop()
      : startTime.origin > 0
      ? handleResume()
      : handleStart();
  };

  /**
   * If `Stopwatch` is running, put a new lap `Time` to `laps` array
   */
  const handleLap = () => {
    if (isRunning) {
      const now = Date.now();

      const lap = new Time(now - lapStartTime.origin);
      setLaps([...laps, lap]);
      setLapStartTime(new Time(now));
    }
  };

  /**
   * Function for reset `Stopwatch` values
   */
  const handleReset = () => {
    if (!isRunning) {
      setStartTime(new Time(0));
      setStopTime(new Time(0));
      setLapStartTime(new Time(0));
      setLapStopTime(new Time(0));
      setLaps([new Time(0)]);
    }
  };

  /**
   * Returns a value of `Time` measured from `start` to `now`
   */
  const getCurrentTime = () => {
    return new Time(Date.now() - startTime.origin);
  };

  /**
   * Returns a value of `Time` measured from `start` to `stop`
   */
  const getStoppedTime = () => {
    return new Time(stopTime.origin - startTime.origin);
  };

  /**
   * Returns a function for getting `Time` depends on `isRunning` boolean
   */
  const getTime = () => {
    return isRunning ? getCurrentTime() : getStoppedTime();
  };

  /**
   * Returns a value of `Time` measured from `lapTimeStart` to `now`
   */
  const getCurrentLapTime = () => {
    return new Time(Date.now() - lapStartTime.origin);
  };

  /**
   * Returns a value of `Time` measured from `lapTimeStart` to `lapTimeStop`
   */
  const getStoppedLapTime = () => {
    return new Time(lapStopTime.origin - lapStartTime.origin);
  };

  /**
   * Returns a function for getting `Time` depends on `isRunning` boolean
   */
  const getLapTime = () => {
    return isRunning ? getCurrentLapTime() : getStoppedLapTime();
  };

  const handleKeyDown = (key) => {
    if (key.code === 'KeyS') {
      handleRun();
    }

    if (key.code === 'KeyL') {
      handleLap();
    }

    if (key.code === 'KeyR') {
      handleReset();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      className="stopwatch"
      style={{ marginTop: laps.length > 1 ? 112 : 291 }}>
      <Timer
        stopwatchTime={getTime}
        lapTime={getLapTime}
        showLapTimer={laps.length > 1}
      />
      <Buttons>
        <Buttons.Button
          id={1}
          show={isRunning || (!isRunning && startTime.origin > 0)}
          role={isRunning ? 'stop' : startTime.origin ? 'resume' : 'start'}
          callback={handleRun}
        />
        <Buttons.Button
          id={2}
          show={isRunning || (!isRunning && startTime.origin > 0)}
          role={isRunning ? 'lap' : startTime.origin ? 'reset' : ''}
          callback={
            isRunning ? handleLap : startTime.origin ? handleReset : null
          }
        />
      </Buttons>
      {laps.length > 1 ? <Laps laps={laps} /> : null}
    </div>
  );
};

export default Stopwatch;
