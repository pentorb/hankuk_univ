import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import '../comm/css/Main.css';

const items = [
    {
        id: 1,
        content: (
            <span style={{ display: 'flex', margin: '0 80px', justifyContent: 'space-around' }}>
                <div className="newsBox" style={{ display: 'flex' }}>
                    <div className="col-4 newsImg" style={{ backgroundImage: 'url(/images/medi.png)' }} />
                    <div className="col-8 newsContent">
                        <div className="headLine">의과대학 증원 정책에 따라 <br />한국대학교 의예과 신설된다 </div>
                        <div className="newsText">최근 정부에서 내세운 의과대학 정원 증가 정책을 발판으로 한국대학교에서 의예과를 신설한다. 한국대학교 의예과는 2025년 수학능력시험 응시자부터 ...</div>
                    </div>
                </div>
                <div className="newsBox" style={{ display: 'flex' }}>
                    <div className="col-4 newsImg" style={{ backgroundImage: 'url(/images/news2.png)' }} />
                    <div className="col-8 newsContent">
                        <div className="headLine">한국대 사회과학대학 한완상 교수, <br /> 故 이상백 교수 기리는 장학기금 출연</div>
                        <div className="newsText">서울대학교 사회과학대학 사회학과의 한완상 前 교수(사회학 학사 55-60)가 사회학과 한민(韓民) 한완상 장학기금 1억 원을 출연했다.</div>
                    </div>
                </div>
            </span>
        )
    },
    {
        id: 2,
        content: (
            <span style={{ display: 'flex', margin: '0 80px', justifyContent: 'space-around' }}>
                <div className="newsBox" style={{ display: 'flex' }}>
                    <div className="col-4 newsImg" style={{ backgroundImage: 'url(/images/news3.png)' }} />
                    <div className="col-8 newsContent">
                        <div className="headLine">한국대학교 ‘천원의 식샤’ <br/>캠페인 아너월 제막식 개최</div>
                        <div className="newsText">한국대학교발전재단(이사장 유홍림 총장, 이하 재단)은 3월 13일(수) 관악캠퍼스 학생회관 1층 식당에서 유홍림 총장과 기부자, 교내 보직교수들이 참석한 가운데 한국대학교 천원의 식사를 위한 모금 사업인 ‘천원의 식샤’ 아너 ... </div>
                    </div>
                </div>
                <div className="newsBox" style={{ display: 'flex' }}>
                    <div className="col-4 newsImg" style={{ backgroundImage: 'url(/images/news4.png)' }} />
                    <div className="col-8 newsContent">
                        <div className="headLine">‘On the Lounge: 총장과의 대화’, <br/>학생생활관에서 생활과 배움을 논하다</div>
                        <div className="newsText">'On the Lounge: 총장과의 대화'(이하 온더라운지) 네 번째 행사가 관악학생생활관 920동 사랑채에서 열렸다. 이번 행사의 주제는 ‘관악학생생 ...</div>
                    </div>
                </div>
            </span>
        )
    },
    {
        id: 3,
        content: (
            <span style={{ display: 'flex', margin: '0 80px', justifyContent: 'space-around' }}>
                <div className="newsBox" style={{ display: 'flex' }}>
                    <div className="col-4 newsImg" style={{ backgroundImage: 'url(/images/news5.png)' }} />
                    <div className="col-8 newsContent">
                        <div className="headLine">활기찬 일상 함께 만들어요! ‘2024 한국대학교 건강 주간’ 개최</div>
                        <div className="newsText">활기차고 건강한 캠퍼스를 만들기 위한 ‘2024 한국대학교 건강 주간’이 11월 1일(수)부터 11월 3일(금)까지 열린다. 청명한 가을을 맞아 학내 구성원에게 건강에 관한 관심을 유도하고, 생활 속 건강 습관을 만들 수 있도록 돕겠다는 취지다.</div>
                    </div>
                </div>
                <div className="newsBox" style={{ display: 'flex' }}>
                    <div className="col-4 newsImg" style={{ backgroundImage: 'url(/images/news6.png)' }} />
                    <div className="col-8 newsContent">
                        <div className="headLine">농업생명과학대학 수목원, 식물 보전과 교육에 앞장서다</div>
                        <div className="newsText">완연한 봄, 산과 자연을 찾는 사람들의 발걸음이 끊이지 않는다. 푸른 잎사귀와 알록달록한 꽃, 시원한 나무 그늘은 ‘힐링’의 대명사다. 한편 숲은 다양한 생태 자원의 보고(寶庫)이자 풍성한 배움의 터전이기도 하다. </div>
                    </div>
                </div>
            </span>
        )
    }
];

class NewsCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.id}
                >
                    {item.content}
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                interval={5000}
            >
                {slides}
                {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> */}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default NewsCarousel;
