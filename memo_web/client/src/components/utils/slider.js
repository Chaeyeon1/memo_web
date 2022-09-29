import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                {/* <h2> 명언 구절</h2> */}
                <Slider {...settings}>
                    <div>
                        <blockquote>
                            “오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아간다.”
                        </blockquote>

                        <cite>- 앙드레지드</cite>
                    </div>
                    <div>
                        <blockquote>
                            “벽돌이 쌓인다고 집이 되지 않듯이 시간이 쌓인다고 삶이 만들어지지 않는다."
                        </blockquote>

                        <cite>- 에리스 로럴드 미리에리</cite>
                    </div>
                    <div>
                        <blockquote>
                            “나는 날마다 모든면에서 점점 좋아지고 있다.”
                        </blockquote>

                        <cite>- 에밀쿠에</cite>
                    </div>
                    <div>
                        <blockquote>
                            “자신의 능력을 믿어야 한다. 그리고 끝까지 굳세게 밀고 나가라.”
                        </blockquote>

                        <cite>- 로잘린 카터</cite>
                    </div>
                    <div>
                        <blockquote>
                            “할 수 있다고 믿는 사람은 그렇게 되고, 할 수 없다고 믿는 사람 역시 그렇게 된다.”
                        </blockquote>

                        <cite>- 샤를 드골</cite>
                    </div>
                    <div>
                        <blockquote>
                            “승리하는 것이 전부는 아니다. 승리하고 싶다는 마음이 중요한 것이다.”
                        </blockquote>

                        <cite>- 빈스 롬바르디</cite>
                    </div>
                </Slider>
            </div>
        );
    }
}