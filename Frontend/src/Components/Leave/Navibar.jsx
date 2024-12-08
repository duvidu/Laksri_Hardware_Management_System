import { Link } from 'react-router-dom'
import leaveCss from './leave.module.css';


const Navibar =  () => {
    return(
        <header>
            <div className="#">
                <Link to="/">
                    <h1 className={leaveCss.LevDet}>Laeve details</h1>
                </Link>
                
            </div>
        </header>
    )
}

export default Navibar