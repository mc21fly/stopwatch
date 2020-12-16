import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es';
import './Timer.scss';

const Timer = ({ stopwatchTime, lapTime, showLapTimer }) => {
  const time = useRef();
  const lap = useRef();

  useEffect(() => {
    function run() {
      const { m, s, ms } = stopwatchTime().formatted();
      const { m: lm, s: ls, ms: lms } = lapTime().formatted();
      time.current.innerHTML = `${m}:${s}.<div class="timer__stopwatchTime--ms">${ms}</div>`;
      lap.current.innerHTML = `${lm}:${ls}.<div class="timer__lapTime--ms">${lms}</div>`;

      // document.title = `${m}:${s}:${ms}`;
      requestAnimationFrame(run);
    }

    run();
    // const int = setInterval(run, 60 / 1000);

    return () => {
      cancelAnimationFrame(run);
      // clearInterval(int);
    };
  }, [stopwatchTime, lapTime]);

  useEffect(() => {
    if (showLapTimer) {
      anime({
        targets: '.timer__lapTime',
        opacity: 1,
        height: 43,
        duration: 150,
        easing: 'linear',
      });
    } else {
      anime({
        targets: '.timer__lapTime',
        opacity: 0,
        height: 0,
        duration: 150,
        easing: 'linear',
      });
    }
  }, [showLapTimer]);

  return (
    <div className="timer">
      <div ref={time} className="timer__stopwatchTime"></div>
      <div ref={lap} className="timer__lapTime"></div>
    </div>
  );
};

export default Timer;
