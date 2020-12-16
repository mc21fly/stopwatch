import { useEffect } from 'react';
import anime from 'animejs/lib/anime.es';
import Time from '../Time';
import './Laps.scss';

const Laps = ({ laps }) => {
  useEffect(() => {
    if (laps) {
      anime({
        targets: '.laps',
        opacity: 1,
        duration: 2000,
      });
    } else {
      anime({
        targets: '.laps',
        opacity: 0,
      });
    }
  }, [laps]);

  const getLapTime = (lap) => {
    const { m, s, ms } = lap.formatted();

    return `${m}:${s}.${ms}`;
  };

  const getLapDifference = (array, index) => {
    const currentLap = array[index].origin;
    const prevLap = array[index - 1].origin;
    let diff;
    if (currentLap > prevLap) {
      diff = new Time(currentLap - prevLap).formatted();
    } else if (currentLap < prevLap) {
      diff = new Time(prevLap - currentLap).formatted();
    } else {
      diff = new Time(0).formatted();
    }

    return `${diff.m}:${diff.s}.${diff.ms}`;
  };

  const isBetter = (array, index) => {
    const currentLap = array[index].origin;
    const prevLap = array[index - 1].origin;

    if (currentLap > prevLap) {
      return 'worse';
    } else if (currentLap < prevLap) {
      return 'better';
    } else {
      return 'same';
    }
  };

  const isBest = (array) => {
    const lapsTimes = [];

    for (const lap in array) {
      if (lap > 0) {
        lapsTimes.push(laps[lap].origin);
      }
    }
    const bestTime = Math.min.apply(Math, lapsTimes);
    return lapsTimes.indexOf(bestTime) + 1;
  };

  const isWorst = (array) => {
    const lapsTimes = [];

    for (const lap in array) {
      if (lap > 0) {
        lapsTimes.push(laps[lap].origin);
      }
    }
    const bestTime = Math.max.apply(Math, lapsTimes);
    return lapsTimes.indexOf(bestTime) + 1;
  };

  const getTotalTime = (array, index) => {
    const sliced = array.slice(0, index + 1);
    const added = sliced.reduce((p, c) => {
      return new Time(p.origin + c.origin);
    });

    const { m, s, ms } = added.formatted();

    return `${m}:${s}.${ms}`;
  };

  const showLaps = () => {
    return laps.map((lap, index, array) => {
      return index > 0 ? (
        <Lap
          key={index}
          isBest={index === isBest(array) ? 'best' : ''}
          isWorst={index === isWorst(array) ? 'worst' : ''}
          isBetter={index > 1 ? isBetter(array, index) : 'same'}
          number={index}
          time={getLapTime(lap)}
          difference={index > 1 ? getLapDifference(array, index) : '−−:−−.−−−'}
          total={getTotalTime(array, index)}
        />
      ) : null;
    });
  };

  useEffect(() => {
    const times = document.querySelector('.laps__times');

    times.scrollTop = times.offsetHeight - times.scrollHeight;
  });

  return (
    <div className="laps">
      <Header />
      <div className="laps__times">{showLaps()}</div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="laps__header">
      <div className="laps__header--lap">Lap</div>
      <div className="laps__header--time">Lap time</div>
      <div className="laps__header--difference">Difference</div>
      <div className="laps__header--total">Total time</div>
    </div>
  );
};

const Lap = ({
  isBest,
  isWorst,
  isBetter,
  number,
  time,
  difference,
  total,
}) => {
  return (
    <div className={`lap ${isBest} ${isWorst}`}>
      <div className="lap__number">{number.toString().padStart(2, '0')}</div>
      <div className="lap__time">{time}</div>
      <div className={`lap__difference ${isBetter}`}>{difference}</div>
      <div className="lap__total">{total}</div>
    </div>
  );
};

export default Laps;
