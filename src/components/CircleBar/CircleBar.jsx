import css from './CircleBar.module.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

function CircleBar({ percentage }) {
  return (
    <div className={css.circleContainer}>
      <CircularProgressbar
        value={percentage}
        styles={buildStyles({
          rotation: 0.25,

          strokeLinecap: 'round',

          strokeWidth: '20',

          pathTransitionDuration: 0.5,

          pathColor: `rgba(43, 214, 39, ${percentage / 100})`,
          textColor: '#f88',
          trailColor: '#d4f8d3ff',
          backgroundColor: '#3e98c7',
        })}
      />
    </div>
  );
}

export default CircleBar;
