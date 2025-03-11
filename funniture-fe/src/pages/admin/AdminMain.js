import { useEffect, useState } from "react";
import AdminTop from "../../component/adminpage/AdminTop";
import AdMainCss from "./adminMain.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { getProductCount } from "../../apis/ProductAPI";
import ReactApexChart from "react-apexcharts";

function AdminMain() {

    const [productCount, setProductCount] = useState([])

    async function getProductCountData() {
        const response = await getProductCount();

        console.log("response : ", response)

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
        console.log("productCount : ", productCount)
    }, [productCount])

    useEffect(() => {
        getProductCountData()
    }, [])

    // 상품 등록 현황 원형 차트
    const ProductCountChart = () => {
        const labels = productCount.map(item => item.categoryName)
        const values = productCount.map(item => item.count)

        console.log("labels : ", labels)
        console.log("values : ", values)

        return (
            < ReactApexChart
                options={{
                    chart: { width: 380, type: "pie" },
                    labels,
                    dataLabels: {
                        formatter: function (val, { seriesIndex }) {
                            return `${labels[seriesIndex]} (${values[seriesIndex]})`;
                        },
                        style: {
                            fontWeight: 'regular',
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
                        enabled: true,
                    },
                    stroke: {
                        // curve: 'smooth'
                    },
                    // grid: {
                    //     borderColor: '#e7e7e7',
                    //     row: {
                    //         colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    //         opacity: 0.5
                    //     },
                    // },
                    markers: {
                        size: 1
                    },
                    xaxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                        title: {
                            text: '일별'
                        }
                    },
                    yaxis: {
                        title: {
                            text: '접속자 수'
                        },
                        min: 5,
                        max: 40
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
                        name: "High - 2013",
                        data: [28, 29, 33, 36, 32, 32, 33]
                    },
                    {
                        name: "Low - 2013",
                        data: [12, 11, 14, 18, 17, 13, 13]
                    }
                ]}

                type="line"
                height={"100%"}
            />

        )
    };


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
                    <div>
                        매출 현황
                    </div>
                </div>
                <div>
                    <div>
                        공지 사항
                    </div>
                </div>
                <div>
                    <div>
                        접속자 수
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