"use client";

import { useEffect} from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function SubjectsByFacultyChart() {
    useEffect(() => {
        //สมมติข้อมูล
        const data = [
            { faculty: "วิทยาศาสตร์และเทคโนโลยี", subjects: 18 },
            { faculty: "ศึกษาศาสตร์", subjects: 10 },
            { faculty: "รัฐศาสตร์", subjects: 7 },
        ];

        //สร้าง root
        const root = am5.Root.new("chartdiv");

        //ใส่ theme ที่ทำให้กราฟมี อนิเมชัน ตอนโหลดหรือเปลี่ยนข้อมูล
        root.setThemes([am5themes_Animated.new(root)]);

        //สร้างกราฟ XY
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "none",
                wheelY: "none",
            })
        );

        //กำหนดแกน x
        const xAxis = chart.xAxes.push(
            //สร้างแกน X แบบ Category Axis
            am5xy.CategoryAxis.new(root, {
                categoryField: "faculty",
                //คุมการแสดงผลของแกน X
                renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
            })
        );
        //ใส่ข้อมูลลงไปในแกน X
        xAxis.data.setAll(data);

        //กำหนดแกน Y
        const yAxis = chart.yAxes.push(
            //สร้างแกน Y แบบ Value Axis
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            })
        );

        //สร้าง series แบบแท่ง เพิ่ม Series ลงในกราฟ Series = ชุดข้อมูลที่จะแสดงผล เช่นแท่ง, เส้น, จุด ฯลฯ
        const series = chart.series.push(
            //สร้าง series แบบแท่ง (Bar/Column)
            am5xy.ColumnSeries.new(root, {
                name: "จำนวนรายวิชา",
                xAxis: xAxis, //CategoryAxis ที่ตั้งไว้ก่อนหน้านี้
                yAxis: yAxis, //ValueAxis ที่ตั้งไว้ก่อนหน้านี้
                valueYField: "subjects", //ค่าตัวเลขบนแกน Y มาจากฟิลด์ "subjects"
                categoryXField: "faculty", //แกน X ต้องใช้ค่าจากฟิลด์ "faculty"
                //สร้าง tooltip เมื่อเอาเมาส์ไปชี้ที่แท่ง
                tooltip: am5.Tooltip.new(root, {
                    labelText: "{categoryX}:{valueY}",
                }),
            })
        );

        series.data.setAll(data);

        //animation
        series.appear(1000); //ค่อย ๆ แสดงผลขึ้นมา 1 วินาที (1000 ms)
        chart.appear(1000, 100);

        //ลบ chart ทั้งหมดออกจาก memory\
        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div>
            <h2 style={{textAlign: "center"}}>จำนวนรายวิชาตามคณะ</h2>
            <div id="chartdiv" style={{width:"90%" , height: "400px",maxWidth: "1200px"}}/>
        </div>
    );
}
