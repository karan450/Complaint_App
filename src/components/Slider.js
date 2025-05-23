import SimpleImageSlider from "react-simple-image-slider";
import "../cssfiles/dashboard.css";

const images = [
    {url : require("../sliderimage/animalwellfare.jpg")},
    {url : require("../sliderimage/cvc.jpg")},
    {url : require("../sliderimage/gujarat.png")}
]

export default function Slider(){
    return(
        <div className="slider_container">
            <SimpleImageSlider
            width={896}
            height={400}
            images={images}
            showBullets={true}
            showNavs={true}
            className="sliderimage"
            style={{
                width: "200px",
            }}
            autoPlay/>
        </div>    
    )
}