'use client'
import React, { useLayoutEffect, useState, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface Teacher {
  sTeacherId: string;
  sFirstName: string;
  sLastName: string;
  sGender: "ชาย" | "หญิง";
  sFaculty: string;
}

export default function SubByFacChart() {
  const [chartData, setChartData] = useState<{faculty:string, male:number, female:number}[]>([]);

  // ดึงข้อมูลจาก API
  useEffect(() => {
    fetch("https://localhost:7127/api/School/GetAllTeachers")
      .then(res => res.json())
      .then((data: Teacher[]) => {
        // แปลงข้อมูลเป็นรูปแบบ { faculty, male, female }
        const grouped: Record<string, { faculty: string; male: number; female: number }> = {};

        data.forEach(t => {
          if (!grouped[t.sFaculty]) {
            grouped[t.sFaculty] = { faculty: t.sFaculty, male: 0, female: 0 };
          }
          if (t.sGender === "ชาย") grouped[t.sFaculty].male += 1;
          else if (t.sGender === "หญิง") grouped[t.sFaculty].female += 1;
        });

        setChartData(Object.values(grouped));
      });
  }, []);

  useLayoutEffect(() => {
    if (chartData.length === 0) return;

    const root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "faculty",
        renderer: am5xy.AxisRendererY.new(root, { inversed: true, minGridDistance: 20 }),
      })
    );

    yAxis.children.push(
      am5.Label.new(root ,{
        text: "(คณะ)",
        y: am5.percent(0),
        x:am5.percent(20),
        centerY: am5.percent(50),
        fontSize: 16,
        fill:am5.color("#000")
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    yAxis.data.setAll(chartData);
    xAxis.set("extraMax", 0.1);

    function createSeries(field: "male" | "female", name: string, color: string) {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueXField: field,
          categoryYField: "faculty",
          stacked: true,
        })
      );

      series.columns.template.setAll({
        tooltipText: "{name}: {valueX}",
        fill: am5.color(color),
        stroke: am5.color(color),
      });

      series.data.setAll(chartData);
      return series;
    }

    createSeries("male", "ชาย", "#EED566");
    createSeries("female", "หญิง", "#EF976c");

    const legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    return () => root.dispose();
  }, [chartData]);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: 20 ,color:"black" }}>
        จำนวนอาจารย์จำแนกตามคณะและเพศ
      </h2>
      <div id="chartdiv"  style={{ width: "100%", height: 500 }}></div>
    </div>
  );
}
