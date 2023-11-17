import { FC, ReactChild } from "react";
import { Carousel } from "react-responsive-carousel";
import { animated, useSpring } from "@react-spring/web";
import {
    sliderImage1,
    sliderImage2,
    sliderImage3,
    sliderImage4,
    sliderImage5
} from "assets/media/slider";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.scss";

const Slider: FC = () => {

    const animationProps = useSpring({
        from: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
        config: {
            friction: 10
        },
        delay: 500
    });

    const settingsSlider = {
        autoPlay: true,
        infiniteLoop: true,
        showThumbs: false,
        interval: 5000
    };

    const sliders: ReactChild[] = [
        (
            <animated.div className="slide" style={animationProps}>
                <img className="slide__img" src={sliderImage1} alt="Slider" />
                <h2 className="slide__title">Освітні програми</h2>
                <a className="slide__link" href="http://www.viti.edu.ua/epp-1"
                   rel="noreferrer" target="_blank">
                    Детальніше
                </a>
            </animated.div>
        ) as ReactChild,
        (
            <animated.div className="slide" style={animationProps}>
                <img className="slide__img" src={sliderImage2} alt="Slider" />
                <h2 className="slide__title">Бібліотека</h2>
                <a className="slide__link" href="http://www.viti.edu.ua/library"
                   rel="noreferrer" target="_blank">
                    Детальніше
                </a>
            </animated.div>
        ) as ReactChild,
        (
            <animated.div className="slide" style={animationProps}>
                <img className="slide__img" src={sliderImage3} alt="Slider" />
                <h2 className="slide__title">Нормативні документи</h2>
                <a className="slide__link" href="http://www.viti.edu.ua/study"
                   rel="noreferrer" target="_blank">
                    Детальніше
                </a>
            </animated.div>
        ) as ReactChild,
        (
            <animated.div className="slide" style={animationProps}>
                <img className="slide__img" src={sliderImage4} alt="Slider" />
                <h2 className="slide__title">Ліцензія та акредитація</h2>
                <a className="slide__link" href="http://www.viti.edu.ua/license"
                   rel="noreferrer" target="_blank">
                    Детальніше
                </a>
            </animated.div>
        ) as ReactChild,
        (
            <animated.div className="slide" style={animationProps}>
                <img className="slide__img" src={sliderImage5} alt="Slider" />
                <h2 className="slide__title">Навчальні плани, силабуси</h2>
                <a className="slide__link" href="http://www.viti.edu.ua/epp-2"
                   rel="noreferrer" target="_blank">
                    Детальніше
                </a>
            </animated.div>
        ) as ReactChild
    ];

    return (
        <div className="slider">
            <Carousel {...settingsSlider}>
                {sliders.map((slider, index) =>
                    <div className="slide-wrapper" key={index}>{slider}</div>)}
            </Carousel>
        </div>
    );
};

export { Slider };
