import '../Style/component.css';

export default function NewsLetter() {
    return(
        <div className="newsletter"> 
            <h1>NEWSLETTER</h1>
            <div className='newsletter-content'>
                <div className="N-body" style={{width: "15%"}}>
                    <div className="N-child-1"></div>
                    <div id="child-1a">
                        <h5>NEWSLETTER</h5>
                        <h2>SETTLER HUB</h2>
                    </div>
                </div>
                <div className="N-body" style={{width: "60%"}}>
                    <div className="N-child-1" style={{display: "flex", 
                                                        flexDirecton: "row", 
                                                        justifyContent: "center", 
                                                        gap:"2rem"}}>
                        <h5>NEWS</h5><h5>NEWS</h5><h5>NEWS</h5><h5>NEWS</h5><h5>NEWS</h5>
                    </div>
                    <div className="N-child-center">
                        <h2>SIGN UP TO THE NEWSLETTER</h2>
                        <div className="subcribe-form" >
                            <input className="subcribe-input" type="text" placeholder="Name" name="name" required/>
                            <input className="subcribe-input" type="text" placeholder="Email address" name="mail" required/>
                            <input type="submit" value="Subscribe"></input>
                        </div>
                    </div>
                </div>
                <div className="N-body" style={{width: "25%"}}>
                    <div className="N-child-1"></div>
                    <div></div>
                </div>
                
            </div>
        </div>
    )
}