import { useEffect, useRef, useState } from "react";
import AdminTop from "../../component/adminpage/AdminTop";
import AdMainCss from "./adminMain.module.css"
import { useLocation, useNavigate, Link, useSearchParams } from "react-router-dom";
import { getProductCount } from "../../apis/ProductAPI";
import ReactApexChart from "react-apexcharts";
import { getConnectInfo } from "../../apis/MemberAPI";
import { getSalesByMonthChartData, getTopMonthlySales } from "../../apis/RentalAPI"

function AdminMain() {

    const [productCount, setProductCount] = useState([])

    async function getProductCountData() {
        const response = await getProductCount();

        if (response != null) {
            const array = []
            for (const item of response.result) {

                const data = {
                    "categoryName": Object.keys(item)[0],
                    "count": Object.values(item)[0]
                }

                array.push(data)
            }

            setProductCount(array)
        }
    }

    useEffect(() => {
        getProductCountData()
    }, [])

    // 상품 등록 현황 원형 차트
    const ProductCountChart = () => {
        const labels = productCount.map(item => item.categoryName)
        const values = productCount.map(item => item.count)

        // 데이터 개수만큼 색상 배열 생성
        const colors = [
            '#f94144', '#f8961e', '#f9844a', '#f9c74f', '#90be6d',
            '#43aa8b', '#4d908e', '#577590', '#277da1', '#3d405b'
        ].slice(0, productCount.length); // 데이터 개수만큼 색상 제한

        return (
            < ReactApexChart
                options={{
                    chart: { width: 380, type: "pie" },
                    labels,
                    colors,
                    dataLabels: {
                        formatter: function (val, { seriesIndex }) {
                            return `${labels[seriesIndex]}`;
                        },
                        style: {
                            fontSize: '11px',
                            fontWeight: 'bold',
                        },
                        dropShadow: false,
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                offset: -10
                            }
                        }
                    },
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: { width: 200 },
                                legend: { position: "bottom" }
                            }
                        }
                    ]
                }}
                series={values}
                type="pie"
                height={"100%"}
            />
        )
    }

    // 접속자 수 꺽은선 그래프
    const [connectDays, setConnectDays] = useState([])
    const [ownerConnect, setOwnerConnect] = useState([])
    const [userConnect, setUserConnect] = useState([])
    const [viewTypeWeek, setViewTypeWeek] = useState(true)

    async function getConnectData() {
        const response = await getConnectInfo()

        if (response.results?.result.length > 0) {
            const filteredOwner = response.results.result.filter(data => data.connectAuth == "OWNER")
            setOwnerConnect(setConnectData(filteredOwner, connectDays))

            const filteredUser = response.results.result.filter(data => data.connectAuth == "USER")
            setUserConnect(setConnectData(filteredUser, connectDays))
        }
    }

    useEffect(() => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;

        if (viewTypeWeek == true) {
            setConnectDays(getLast7Days)
        } else {
            setConnectDays(getDayArray(year, month))
        }
    }, [viewTypeWeek])

    useEffect(() => {
        if (connectDays.length > 0) {
            getConnectData()
        }
    }, [connectDays])

    // 이번달 날짜 배열 만들기 (오늘까지만)
    function getDayArray(year, month) {
        const today = new Date().getDate();
        // const lastDate = new Date(year, month, 0).getDate()

        return Array.from({ length: today }, (_, i) => new Date(year, month - 1, month == 3 ? i + 2 : i + 1).toISOString().split('T')[0])
    }

    // 최근 7일 날짜 배열 생성 함수
    function getLast7Days() {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(today.getDate() - (6 - i)); // 7일 전부터 오늘까지
            return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
        });
    }

    // 날짜별 기본값 0, 있는 날짜는 데이터 넣기
    function setConnectData(data, connectDays) {
        const connectData = new Map(data.map(item => [item.connectDate, item.connectCount]))

        return connectDays.map(date => ({
            connectDate: date,
            connectCount: connectData.get(date) || 0
        }))
    }


    const ConnectCountChart = () => {
        return (
            <ReactApexChart
                options={{
                    chart: {
                        // height: 350,
                        type: 'line',
                        dropShadow: {
                            enabled: true,
                            color: '#000',
                            top: 10,
                            left: 7,
                            blur: 3,
                            opacity: 0.5
                        },
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: true
                        }
                    },
                    colors: ['#77B6EA', '#545454'],
                    dataLabels: {
                        enabled: false,
                    },
                    markers: {
                        size: 1
                    },
                    xaxis: {
                        categories: connectDays,
                        title: {
                            text: '일별'
                        }
                    },
                    yaxis: {
                        title: {
                            text: '접속자 수'
                        },
                        min: 0,
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5
                    }
                }}

                series={[
                    {
                        name: "일반 사용자",
                        data: userConnect.map(item => item.connectCount)
                    },
                    {
                        name: "업체(제공자)",
                        data: ownerConnect.map(item => item.connectCount)
                    }
                ]}

                type="line"
                height={"100%"}
                width={"100%"}
            />

        )
    };


    // 매출 데이터 관리
    const [salesData, setSalesData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const type = searchParams.get('type') || 'month';
    const month = searchParams.get('month');

    // 현재 날짜 기준으로 이전 10개월 생성
    const getPreviousMonths = (numMonths) => {
        const months = [];
        const today = new Date();

        for (let i = 0; i < numMonths; i++) {
            const year = today.getFullYear();
            const month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
            const formattedMonth = `${year}-${month.toString().padStart(2, '0')}`;
            months.unshift(formattedMonth); // 최신 월이 뒤에 오도록 추가
            today.setMonth(today.getMonth() - 1); // 이전 달로 이동
        } return months;
    };

    // 선택한 월의 1일부터 말일까지 날짜 생성
    const getPreviousDays = (selectedMonth) => {
        const days = [];
        const [year, month] = selectedMonth.split('-').map(Number);
        const lastDay = new Date(year, month, 0).getDate(); // 해당 월의 마지막 날짜 계산

        for (let day = 1; day <= lastDay; day++) {
            const formattedDay = `${selectedMonth}-${day.toString().padStart(2, '0')}`;
            days.push(formattedDay);
        }

        return days;
    };

    // 관리자 매출 현황 차트 데이터 부르는 함수
    async function getSalesData(type, month) {
        try {
            let data = [];
            if (type === 'month') {
                const months = getPreviousMonths(10);
                const allDataPromises = months.map(async (month) => {
                    try {
                        const response = await getSalesByMonthChartData(month, "month");
                        const sales = response?.results?.sales ?? [];
                        return sales.length > 0
                            ? { month, totalAmount: sales[0].totalAmount }
                            : { month, totalAmount: 0 };
                    } catch (error) {
                        console.error(`Error fetching data for ${month}:`, error);
                        return { month, totalAmount: 0 };
                    }
                });
                data = await Promise.all(allDataPromises);
            } else if (type === 'day' && month) {
                const days = getPreviousDays(month);
                const allDataPromises = days.map(async (day) => {
                    try {
                        const response = await getSalesByMonthChartData(day, "day");
                        const sales = response?.results?.sales ?? [];
                        return sales.length > 0
                            ? { month: day, totalAmount: sales[0].totalAmount }
                            : { month: day, totalAmount: 0 };
                    } catch (error) {
                        console.error(`Error fetching data for ${day}:`, error);
                        return { month: day, totalAmount: 0 };
                    }
                });
                data = await Promise.all(allDataPromises);
            }
            setSalesData(data);
        } catch (error) {
            console.error("매출 조회 실패:", error);
        }
    }

    useEffect(() => {
        getSalesData(type, month);
    }, [type, month]);

    const MonthSalesChart = ({ salesData }) => {
        const labels = salesData.map(item => item.month);
        const values = salesData.map(item => item.totalAmount);

        // 클릭 이벤트 핸들러
        const handleBarClick = (event, chartContext, config) => {
            const clickedIndex = config.dataPointIndex;
            if (clickedIndex !== -1) {
                const selectedMonth = labels[clickedIndex];
                setSearchParams({ type: 'day', month: selectedMonth });
            }
        };

        return (
            <>
                {type === 'day' ? (
                    <Link to="/admin" style={{ fontSize: '0.9em', textDecoration: 'none' }}>월별 데이터로 돌아가기</Link>
                ) : null}
                <ReactApexChart
                    options={{
                        chart: {
                            type: "bar",
                            events: {
                                dataPointSelection: handleBarClick
                            }
                        },
                        labels,
                        dataLabels: {
                            enabled: true,
                            style: {
                                colors: ['#34495E'] // 어두운 청회색 (모든 막대에서 잘 보임)
                            }
                        },
                        plotOptions: {
                            bar: {
                                colors: {
                                    ranges: [
                                        { from: 0, to: 200000, color: '#F44336' }, // 0 ~ 10000 사이 값은 파란색
                                        { from: 200000, to: 400000, color: '#00E396' }, // 10001 ~ 20000 사이 값은 초록색
                                        { from: 400000, to: Infinity, color: '#FEB019' }, // 20001 이상은 노란색
                                    ]
                                }
                            }
                        },
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    chart: { width: 200 },
                                    legend: { position: "bottom" }
                                }
                            }
                        ],

                        tooltip: {
                            enabled: true,
                            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                                const value = series[seriesIndex][dataPointIndex];
                                const category = w.globals.labels[dataPointIndex];
                                return `
                                    <div style="padding: 8px; background:rgb(248, 248, 248); color: #00000; border-radius: 5px;">
                                        <strong>${category}</strong><br/>
                                        총 매출액 : ${value.toLocaleString()} 원
                                    </div>
                                `;
                            }
                        },
                        xaxis: {
                            categories: labels
                        },
                        dataLabels: {
                            enabled: false
                        },

                    }}
                    series={[{ data: values }]}
                    type="bar"
                    height={"100%"}
                />
            </>
        );
    };

    // top5 제공자 매출

    const [topLabel, setTopLabel] = useState([])
    const [topValue, setTopValue] = useState([])

    useEffect(() => {
        const year = new Date().getFullYear()
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0')
        const yearMonth = year + '-' + month

        async function getTop5() {
            const reposne = await getTopMonthlySales(yearMonth)

            if (reposne.results != null) {
                const dataList = reposne.results.topSalesData

                setTopLabel(dataList.map(item => item.storeName))
                setTopValue(dataList.map(item => item.totalSales))
            }
        }

        getTop5();
    }, [])

    const TopOwner = () => {

        if (!topLabel.length || !topValue.length) {
            return <div>로딩중....</div>
        }

        const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']; // 원하는 색상 지정

        const seriesData = [{
            name: "매출",  // 원하는 시리즈 이름
            data: topValue,  // 각 매장의 매출 값
        }];

        return (
            <ReactApexChart
                options={{
                    chart: {
                        type: 'bar',
                        height: 380
                    },
                    colors: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'],
                    plotOptions: {
                        bar: {
                            barHeight: '100%',
                            distributed: true,
                            horizontal: true,
                            dataLabels: {
                                position: 'bottom'
                            },
                        }
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        width: 1,
                        colors: ['#fff']
                    },
                    xaxis: {
                        categories: topLabel,  // topLabel을 사용하여 카테고리 지정
                        labels: {
                            show: false  // x축 레이블을 보이지 않게 설정
                        }
                    },
                    yaxis: {
                        labels: {
                            show: true
                        }
                    }
                }}
                series={seriesData}  // seriesData 사용
                type="bar"
                height="100%"
            />
        )

    }


    return (
        <>
            <AdminTop title={'메인 페이지'} />

            <div className={AdMainCss.mainContent}>
                <div>
                    <div>상품 등록 현황</div>
                    <div className={AdMainCss.chartBox}>
                        <ProductCountChart />
                    </div>
                </div>
                <div>
                    <div>매출 현황</div>
                    <div className={AdMainCss.chartBox}>
                        <MonthSalesChart salesData={salesData} />
                    </div>
                </div>
                <div>
                    <div>
                        이번 달 매출 TOP {topLabel.length} 업체
                    </div>
                    <div className={AdMainCss.chartBox}>
                        <TopOwner />
                    </div>
                </div>
                <div>
                    <div>
                        접속자 수
                        <span>&#40;</span>
                        <button className={AdMainCss.viewType} onClick={() => setViewTypeWeek(prev => !prev)}>{viewTypeWeek ? "최근 7일" : "이번달"}</button>
                        <span>&#41;</span>
                    </div>
                    <div className={AdMainCss.chartBox}>
                        <ConnectCountChart />
                    </div>
                </div>
            </div>
        </>
    )

}

export default AdminMain;