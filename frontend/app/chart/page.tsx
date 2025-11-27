"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useRef, useState } from "react";
import style from "./chart.module.css";

interface ChartBook {
  sNamebook: string;
  nQuantity: number;
  sCategory: string;
}

export default function ChartPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ChartBook[]>([]);

  // โหลดข้อมูลจาก API
  useEffect(() => {
    fetch("https://localhost:7073/api/Book/GetBooksForChart/chart")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  // สีของแต่ละหมวด (ตรง ๆ ไม่ normalize)
  const categoryColors: Record<string, string> = {
    "นิยาย": "#f44336",
    "สารคดี": "#2196f3",
    "ธุรกิจและการเงิน": "#4caf50",
    "พัฒนาตนเอง": "#ff9800",
    "การศึกษา / ตำราเรียน": "#9c27b0",
    "การ์ตูนและนิยายภาพ": "#00bcd4",
    "ไลฟ์สไตล์": "#e91e63",
    "เทคโนโลยี": "#3f51b5",
    "ศิลปะและการออกแบบ": "#795548",
    "เด็กและเยาวชน": "#607d8b",
  };

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // รวมข้อมูลตามหมวด
    const grouped = data.reduce((acc, item) => {
      const cat = item.sCategory;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<string, ChartBook[]>);

    // สร้าง treeData
    const treeData = [
      {
        name: "หนังสือทั้งหมด",
        category: "root",
        children: Object.keys(grouped).map((cat) => ({
          name: cat,
          category: cat,
          children: grouped[cat].map((b) => ({
            name: b.sNamebook,
            value: b.nQuantity,
            category: cat,
          })),
        })),
      },
    ];

    const chart = root.container.children.push(
      am5hierarchy.Treemap.new(root, {
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        downDepth: 2,
        upDepth: 1,
        initialDepth: 2,
      })
    );

    chart.data.setAll(treeData);

    // Tooltip
    chart.set(
      "tooltip",
      am5.Tooltip.new(root, {
        labelText: "{name}\nจำนวน: {value}",
      })
    );

    // ใช้สีตาม category
    (chart.rectangles.template as any).setAll({
      getFillFromParent: false,
    });

    chart.rectangles.template.adapters.add("fill", (fill, target) => {
      const item: any = target.dataItem?.dataContext;
      if (item?.category && categoryColors[item.category]) {
        return am5.color(categoryColors[item.category]);
      }
      return fill;
    });

    // คลิกแต่ละกล่อง
    chart.rectangles.template.events.on("click", (ev) => {
      const item: any = ev.target.dataItem?.dataContext;
      if (item) {
        alert(`📘 ${item.name}\nหมวดหมู่: ${item.category}\nจำนวน: ${item.value}`);
      }
    });

    chart.appear(1000, 100);

    return () => root.dispose();
  }, [data]);

  return (
    <div>
      <h2 className={style.chartTitle}>Treemap: จำนวนหนังสือตามหมวดหมู่</h2>
      <div ref={chartRef} className={style.chartContainer}></div>
    </div>
  );
}
