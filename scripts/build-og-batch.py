#!/usr/bin/env python3
"""批量生成 10 个新案例的 OG 分享图。"""
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# slug, 标题, 副标题（创始人 + 一句话）, 结论行, 赛道
BATCH = [
    (
        "heyi-manju",
        "张金慧与「和艺」",
        "张金慧 · 美术专业出身 · 杭州鸿鹄汇首批入驻 OPC",
        "AI 漫剧流水线 · 一周一部 42 集 · 预计年底营收超 1000 万元（自述）",
        "内容创作",
    ),
    (
        "conghua-touyan",
        "葱花投研",
        "徐翀 · 上海葱花投研智能科技 · 公募 REITs 垂类投研",
        "两年 40 余家 B 端机构客户 · 2026 年营收预计约 400 万元",
        "垂直应用",
    ),
    (
        "suanli-yunchao",
        "算力云巢 PowerNest",
        "施云飞 · AI 工程化落地一站式方案与工作站交付",
        "8 个月服务 150+ 家 OPC · 交付 2400+ 套 AI 工作站并已盈利",
        "开发者工具",
    ),
    (
        "mars-wave",
        "MarsWave 火星电波",
        "冯雷 · 前 MiniMax 海螺 AI 产品负责人",
        "ARR 300 万美元 · 央视口径年度营收约 2000 万元",
        "开发者工具",
    ),
    (
        "chaishao-kuajing",
        "张顺与 5 个 AI 员工",
        "张顺 · 柴烧网络科技（澄迈）· eBay 汽摩配件出海",
        "1 名真人 + 5 个 AI 员工 · 单店月营收超 2 万美元",
        "营销电商",
    ),
    (
        "wall-ball-bag",
        "《壁球包 · 周睿》",
        "周睿 · 上海达钊实业 · 壁球装备设计与外贸",
        "产品迭代 4 次 · 2025 年公司营收近 150 万元（受访者口径）",
        "垂直应用",
    ),
    (
        "shuoshu-community",
        "模数 OPC 社区 · 郭浩",
        "郭浩 · 前 UI 设计师 · 1 个老板 + 多名 AI 员工",
        "年营收约 100–200 万元 · 社区两个多月入驻 50+ 家 OPC",
        "内容创作",
    ),
    (
        "shouyi-compute",
        "手亿科技",
        "许展玮 · 清华大学自动化系博士 · 腕带式手部动捕",
        "四个月融三轮 · 累计融资超千万元 · 产品迭代至第三代",
        "垂直应用",
    ),
    (
        "aichu-dai",
        "爱穿搭 AI 试衣魔镜",
        "陈顺洋 · 前腾讯员工 · 43 英寸 AI 试衣魔镜",
        "上线 3 个月营收 10 万元 · 4 月计划量产 200 台",
        "营销电商",
    ),
    (
        "longgu-animation",
        "《龙骨动画 DragonBones / LoongBones》",
        "苏魁 · 北京哪吒互娱科技 · AI 辅助 2D 骨骼动画平台",
        "国内注册近 6000 + 海外超 1000 · 年运营成本不足 5000 元",
        "开发者工具",
    ),
]


def main() -> None:
    script = os.path.join(ROOT, "scripts", "build-og.py")
    for slug, title, subtitle, result, track in BATCH:
        out = os.path.join(ROOT, "site", "og", slug + ".jpg")
        subprocess.run(
            [sys.executable, script, slug, title, subtitle, result, track, out],
            check=True,
        )


if __name__ == "__main__":
    main()
