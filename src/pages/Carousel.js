import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../providers/UserProvider';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function Carousel() {
    const [getData, setData] = useState([]);
    const { setAudioPlayerSong, setSongId } = useUser();
    useEffect(() => {
        musicList();
    }, []);
    const musicList = async () => {
        try {
            const res = await axios.get('https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Evergreen melodies"}', {
                headers: {
                    'projectId': 'cp0doe0u3fx9'
                }
            });
            setData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    const onMusicHandler = (index) => {
        let list = getData[index];
        setAudioPlayerSong(list);
        setSongId(list._id);
    };
    const CustomPrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} style={{ ...arrowStyle, left: '5px' }} onClick={onClick}>
                {/* <img src="/path/to/prev-arrow.svg" alt="Prev" style={{ width: '20px', height: '20px' }} /> */}
            </div>
        );
    };
    const CustomNextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} style={{ ...arrowStyle, right: '5px' }} onClick={onClick}>
                {/* <img src="/path/to/next-arrow.svg" alt="Next" style={{ width: '20px', height: '20px' }} /> */}
            </div>
        );
    };
    const arrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        cursor: 'pointer',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        padding: '5px'
    };
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // 3 seconds
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };
    return (
        <div style={carouselContainerStyle}>
            <Slider {...settings}>
                {getData.map((obj, index) => (
                    <div key={index} onClick={() => onMusicHandler(index)} style={carouselItemStyle}>
                        <img src={obj.thumbnail} alt={`Slide ${index}`} style={carouselImageStyle} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
const carouselContainerStyle = {
    width: '100%',
    margin: '15px 0',
    marginTop: '90px',
    position: 'relative',
    padding: '0 10px',
    boxSizing: 'border-box'
};
const carouselItemStyle = {
    padding: '0 10px',
    margin: '0 10px',
    boxSizing: 'border-box',
    textAlign: 'center'
};
const carouselImageStyle = {
    width: '92%',
    height: 'auto',
    maxHeight: '275px',
    borderRadius: '20px',
    objectFit: 'cover'
};
export default Carousel;