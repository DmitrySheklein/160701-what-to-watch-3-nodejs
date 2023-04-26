import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { Film } from '../../types/film';
import { AppRoute } from '../../const';
import { formatRemainingTime } from '../../util';

type VideoPlayerProps = {
  film: Film;
};

function VideoPlayer({ film }: VideoPlayerProps) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { posterImage, videoLink, name } = film;

  useEffect(() => {
    isPlaying ? videoRef.current?.play() : videoRef.current?.pause();
  }, [isPlaying]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="player">
        <video
          src={videoLink}
          className="player__video"
          autoPlay
          poster={posterImage}
          ref={videoRef}
          onLoadedData={() => setIsLoading(false)}
          onTimeUpdate={(evt) =>
            setCurrentTime(Math.round(evt.currentTarget.currentTime))}
          onDurationChange={(evt) =>
            setDuration(Math.round(evt.currentTarget.duration))}
        >
        </video>

        <button
          type="button"
          className="player__exit"
          onClick={() => navigate(`${AppRoute.Film}/${film.id}`)}
        >
          Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress
                className="player__progress"
                value={currentTime}
                max={duration}
              />
              <div
                className="player__toggler"
                style={{
                  left: `${duration ? (100 / duration) * currentTime : 0}%`,
                }}
              >
                Toggler
              </div>
            </div>
            <div className="player__time-value">
              {formatRemainingTime(duration - currentTime)}
            </div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={() => setIsPlaying((prevState) => !prevState)}
            >
              {isPlaying ? (
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>
            <div className="player__name">{name}</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={() => videoRef.current?.requestFullscreen()}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;
