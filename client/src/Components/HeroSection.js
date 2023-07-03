import '../Style/component.css';
import NavBar from "../Features/NavBar";
import Header from './Header';
import londonA from '../Assets/londonA.jpg';
import service1 from '../Assets/service1.jpg';
import redphone from '../Assets/redphone.jpg'

export default function HeroSectionA() {
    return(
        <div className="heroSection" style={{backgroundImage: `url("${londonA}")`}}>
            <Header/>
            <NavBar/>
            <h1 style={{
                display:"flex", 
                flexDirection:"column", 
                justifyContent: "center", 
                height:"100%",
                color:"whitesmoke"}}>
            Some Main Text Should Be Here
            </h1>
        </div>
    )
}

export function HeroSectionB() {
    return (
        <div className="heroSection" style={{backgroundImage: `url("${service1}")`}}>
            <Header/>
            <NavBar/>
            <h1 style={{
                display:"flex", 
                flexDirection:"column", 
                justifyContent: "center", 
                height:"100%",
                color:"whitesmoke"}}>
            Some Main Text Should Be Here
            </h1>
        </div>
    )
}

export function HeroSectionC() {
    return (
        <div className="heroSection" style={{backgroundImage: `url("${redphone}")`}}>
            <Header/>
            <NavBar/>
            <h1 style={{
                display:"flex", 
                flexDirection:"column", 
                justifyContent: "center", 
                height:"100%",
                color:"whitesmoke"}}>
            Some Main Text Should Be Here
            </h1>
        </div>
    )
}