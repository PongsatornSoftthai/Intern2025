"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useRef } from "react";
import style from "./chart.module.css"; 

interface Item {
  sID: string;
  nNo: number;
  sName: string;
  nPrice: number;
  nQuantity: number;
  sAuthor: string;
  dReleaseDate: Date;
}

export default function ChartPage() {
  const chartRef = useRef<HTMLDivElement>(null);

  const items: Item[] = [
    { sID: "1", nNo: 1, sName: "เจ้าชายน้อย", nPrice: 199, nQuantity: 12, sAuthor: "Antoine", dReleaseDate: new Date("2022-02-11") },
    { sID: "2", nNo: 2, sName: "ปีศาจตัวนั้น คือฉันเอง", nPrice: 360, nQuantity: 9, sAuthor: "MAY-I", dReleaseDate: new Date("2025-09-25") },
    { sID: "3", nNo: 3, sName: "ใครรู้ คนนั้นรอด", nPrice: 225, nQuantity: 99, sAuthor: "ดร.ตฤณห์", dReleaseDate: new Date("2024-09-17") },
    { sID: "4", nNo: 4, sName: "จดหมายจากดาวแมว", nPrice: 209, nQuantity: 365, sAuthor: "นทธี", dReleaseDate: new Date("2025-07-15") },
    { sID: "5", nNo: 5, sName: "จิตวิทยาสายดาร์ก", nPrice: 250, nQuantity: 63, sAuthor: "Dr. Hiro", dReleaseDate: new Date("2024-10-25") }
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    // Chart container
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
      })
    );

    // Prepare data
    const data = items.map((item) => ({
      name: item.sName,
      quantity: item.nQuantity,
    }));

    // X Axis (Book Names)
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 40,
        }),
      })
    );
    xAxis.data.setAll(data);

    // Y Axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Column Series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Quantity",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "quantity",
        categoryXField: "name",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}"
        }),
      })
    );

    // Style for each column
    series.columns.template.setAll({
      cornerRadiusTL: 8,
      cornerRadiusTR: 8,
      strokeOpacity: 0,
    });

    // ⭐ Event คลิกที่แท่งกราฟ (แก้ไขแล้ว)
    series.columns.template.events.on("click", (ev) => {
      const dataItem = ev.target.dataItem;

      if (dataItem) {
        const ctx: any = dataItem.dataContext;

        const bookName = ctx.name;
        const qty = ctx.quantity;

        alert(`📘 ${bookName}\nจำนวนคงเหลือ: ${qty} เล่ม`);
      }
    });

    series.data.setAll(data);

    // Animations
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div>
      <h2 className={style.chartTitle}>
        กราฟจำนวนหนังสือ (Bar Chart)
      </h2>

      <div
        ref={chartRef}
        className={style.chartContainer}
      ></div>

    </div>
  );
}
