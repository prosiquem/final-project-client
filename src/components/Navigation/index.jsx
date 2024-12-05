import NavigationDesktop from '../Navigation/NavigationDesktop'
import NavigationMobile from './NavigationMobile.jsx'

const Navigation = () => {

    return (
        <div className="Navigation">
            <NavigationDesktop />
            <NavigationMobile />
        </div>
    )
    
}

export default Navigation