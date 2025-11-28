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

interface CategoryColor {
  name: string;
  color: string;
}

const CATEGORY_COLOR_MAP: CategoryColor[] = [
  { name: "นิยาย", color: "#36a2eb" },
  { name: "สารคดี", color: "#9966ff" },
  { name: "ธุรกิจและการเงิน", color: "#36c4ebff" },
  { name: "พัฒนาตนเอง", color: "#d870ad" }, 
  { name: "การศึกษา / ตำราเรียน", color: "#7ed19bff" }, 
  { name: "การ์ตูนและนิยายภาพ", color: "#ff9f40" }, 
  { name: "ไลฟ์สไตล์", color: "#ffce56" }, 
  { name: "เทคโนโลยี", color: "#baf66cff" },
  { name: "ศิลปะและการออกแบบ", color: "#54dbdbff" }, 
  { name: "เด็กและเยาวชน", color: "#ff6384" },
];

export default function ChartPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ChartBook[]>([]);
  const [categoryColors, setCategoryColors] = useState<CategoryColor[]>([]);

  useEffect(() => {
    fetch("https://localhost:7073/api/Book/GetBooksForChart/chart")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const grouped = data.reduce((acc, item) => {
      const cat = item.sCategory;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<string, ChartBook[]>);

    const treeData = [
      {
        name: "หนังสือทั้งหมด",
        children: Object.keys(grouped).map(cat => ({
          name: cat,
          children: grouped[cat].map(b => ({
            name: b.sNamebook,
            value: b.nQuantity,
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
        heatRules: [],
      })
    );

    chart.data.setAll(treeData);

    (chart.nodes.template as any).adapters.add("fill", (fill: any, target: any) => {
      const dataContext = target.dataItem?.dataContext;
      if (dataContext && target.dataItem.level === 1) {
        const colorObj = CATEGORY_COLOR_MAP.find(c => c.name === dataContext.name);
        if (colorObj) return am5.color(colorObj.color);
      }
      return fill;
    });

    (chart.nodes.template as any).adapters.add("stroke", (stroke: any, target: any) => {
      const dataContext = target.dataItem?.dataContext;
      if (dataContext && target.dataItem.level === 1) {
        const colorObj = CATEGORY_COLOR_MAP.find(c => c.name === dataContext.name);
        if (colorObj) return am5.color(colorObj.color);
      }
      return stroke;
    });

    chart.set(
      "tooltip",
      am5.Tooltip.new(root, {
        labelText: "{name}\nจำนวน: {value}",
      })
    );

    chart.appear(1000, 100);

    setCategoryColors(CATEGORY_COLOR_MAP);

    return () => root.dispose();
  }, [data]);

  return (
    <div>
      <h2 className={style.chartTitle}>Treemap: จำนวนหนังสือตามหมวดหมู่</h2>
      <div ref={chartRef} className={style.chartContainer}></div>
      <div className={style.legendBox}>
        {categoryColors.map(c => (
          <div key={c.name} className={style.legendItem}>
            <span
              className={style.legendColor}
              style={{ backgroundColor: c.color }}
            />
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
