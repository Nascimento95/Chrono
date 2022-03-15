
import './Chrono.css'
import PauseImg from '../Images/pause.svg'
import PlayImg from '../Images/play.svg'
import ResetImg from '../Images/reset.svg'
import { useState, useEffect, useReducer } from 'react';
const Chrono = () => {

    const [sessionTime , setSessionTime] = useState(1500)
    const [sessionTimeFix, setSessionTimeFix] = useState(1500)

    const [breakTime, setBreakTime] = useState(300)
    const [breakTimeFix, setBreackTimeFix] = useState(300)

    const [workingChrono, setWorkingChrono] = useState(false)

    const [state, dispatch] = useReducer(reducer)

    function reducer(state,action){
        switch(action.type){
            case 'TICK':
                if (sessionTime >= 0) { 
                    setSessionTime(sessionTime - 1)
                } else if (breakTime  >=1) {
                    setBreakTime(-1)
                } else if (breakTime >= 0 && breakTime <= 0){
                    setSessionTimeFix(sessionTimeFix)
                    setBreackTimeFix(breakTimeFix)
                }
                break;
                default :
                
        }
    }

    useEffect(() => {
        let id ;
        if(workingChrono){
            id = window.setInterval(() => {
                dispatch({type: 'TICK'})
            }, 1000)
        }
        return () => {
            window.clearInterval(id)
        }
    }, [workingChrono])
    const playPause = () => setWorkingChrono(!workingChrono)

    const handleSession = e => {
        const el = e.target
        if(el.classList.contains('minus')){
            if(sessionTime / 60 > 1) {
                setSessionTime(sessionTime - 60)
                setSessionTimeFix(sessionTimeFix - 60)
            }
        } else if (el.classList.contains('plus')){
            setSessionTime(sessionTime + 60)
            setSessionTimeFix(sessionTimeFix + 60)
        }
    }

    const handleBreack = e => {
        const el = e.target
        if(el.classList.contains('minus')){
            if(breakTime / 60 > 1) {
                setBreakTime(breakTime - 60)
                setBreackTimeFix(breakTimeFix - 60)
            }
        } else if (el.classList.contains('plus')){
            setBreakTime(breakTime + 60)
            setBreackTimeFix(breakTimeFix + 60)
        }
    }

    const handleReset = () => {
        if(workingChrono) {
            setWorkingChrono(!workingChrono)
        }
        setSessionTime(sessionTimeFix)
        setBreackTimeFix(breakTimeFix)
    }

    return (
        <div className={workingChrono ? 'container-chrono anim-glow' : 'container-chrono'}>
            <div className="container-config">
                <div className="box-btns session">
                    <button onClick={handleSession} className='minus'> - </button>
                    <span>{Math.trunc(sessionTime / 60)}</span>
                    <button onClick={handleSession} className="plus"> + </button>
                </div>
                <div className="box-btns break">
                    <button onClick={handleBreack} className="minus"> - </button>
                    <span>{breakTimeFix / 60}</span>
                    <button onClick={handleBreack} className="plus"> + </button>
                </div>
            </div>
            <h1>
                {sessionTime >= 0 ? (
                    <span>
                        {`${Math.trunc(sessionTime / 60)} : ${sessionTime % 60 < 10 ? `0${sessionTime % 60 }` : `${sessionTime % 60}`}`}
                    </span>
                ) : <span>
                        {`${Math.trunc(breakTime / 60)} : ${breakTime % 60 < 10 ? `0${breakTime % 60 }` : `${breakTime % 60}`}`}
                    </span>
                }
            </h1>
            <div className="container-controllers">
                <button onClick={playPause} >
                    <img src={workingChrono ? PlayImg : PauseImg} alt="img-pause-play" />
                </button>
                <button onClick={handleReset}>
                    <img src={ResetImg} alt="img-reset" />
                </button>
            </div>
        </div>
    );
};

export default Chrono;