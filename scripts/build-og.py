#!/usr/bin/env python3
"""生成 OPC Story 案例 OG 分享图（1200×630 JPEG）。

复刻 site/og/ 现有视觉：深色网格底 + 左侧金色竖条 + 右上角域名 +
大标题 + 灰色副标题 + 蓝色结论行 + 底部说明与赛道标签。

用法：python3 scripts/build-og.py <slug> <标题> <副标题> <蓝色结论行> <赛道>
"""
from __future__ import annotations

import os
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (16, 22, 34)
GRID = (23, 31, 46)
GOLD = (230, 178, 76)
WHITE = (240, 244, 250)
GREY = (138, 152, 172)
BLUE = (96, 165, 250)
FOOT = (98, 112, 132)
TRACK = (230, 178, 76)

CJK_BOLD = "/System/Library/Fonts/Hiragino Sans GB.ttc"
CJK = "/System/Library/Fonts/Hiragino Sans GB.ttc"
MONO = "/System/Library/Fonts/Supplemental/Menlo.ttc"

FONT_BOLD_INDEX = 1  # Hiragino Sans GB.ttc: 0=W3, 1=W6
FONT_REG_INDEX = 0


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size, index=index)


def wrap_cjk(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    """按像素宽度折行，中文逐字、西文按词。"""
    lines: list[str] = []
    cur = ""
    cur_w = 0
    i = 0
    while i < len(text):
        ch = text[i]
        if ch == "\n":
            lines.append(cur)
            cur, cur_w = "", 0
            i += 1
            continue
        # 西文单词整体处理
        if ch.isascii() and (ch.isalnum() or ch in "-_./:"):
            j = i
            while j < len(text) and text[j].isascii() and (text[j].isalnum() or text[j] in "-_./:"):
                j += 1
            token = text[i:j]
        else:
            token = ch
            j = i + 1
        tw = draw.textlength(token, font=f)
        if cur_w + tw > max_w and cur:
            lines.append(cur)
            cur, cur_w = "", 0
        cur += token
        cur_w += tw
        i = j
    if cur:
        lines.append(cur)
    return lines


def draw_tracked(draw: ImageDraw.ImageDraw, xy, text: str, f, fill, tracking: int = 6) -> None:
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking


def build(slug: str, title: str, subtitle: str, result: str, track: str, out_path: str) -> None:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # 网格
    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill=GRID, width=1)
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill=GRID, width=1)

    # 左侧金色竖条
    d.rectangle([0, 0, 5, H], fill=GOLD)

    # 顶部标识
    f_logo = font(MONO, 24)
    draw_tracked(d, (78, 58), "OPC STORY", f_logo, GOLD, tracking=5)
    f_domain = font(MONO, 18)
    dw = d.textlength("opc-story.top", font=f_domain)
    d.text((W - 78 - dw, 62), "opc-story.top", font=f_domain, fill=(116, 134, 158))

    # 主标题
    f_title = font(CJK_BOLD, 54, FONT_BOLD_INDEX)
    lines = wrap_cjk(d, title, f_title, 1010)
    if len(lines) > 2:
        f_title = font(CJK_BOLD, 44, FONT_BOLD_INDEX)
        lines = wrap_cjk(d, title, f_title, 1010)
    ty = 130
    for ln in lines[:2]:
        d.text((78, ty), ln, font=f_title, fill=WHITE)
        ty += int(f_title.size * 1.22)

    # 副标题（灰）
    f_sub = font(CJK, 26)
    sub_lines = wrap_cjk(d, subtitle, f_sub, 1010)
    sy = max(ty + 18, 392)
    for ln in sub_lines[:1]:
        d.text((78, sy), ln, font=f_sub, fill=GREY)

    # 结论行（蓝）
    f_res = font(CJK_BOLD, 30, FONT_BOLD_INDEX)
    res_lines = wrap_cjk(d, result, f_res, 1010)
    ry = sy + 48
    for ln in res_lines[:1]:
        d.text((78, ry), ln, font=f_res, fill=BLUE)

    # 底部分隔线
    d.line([(78, 556), (W - 78, 556)], fill=(44, 56, 76), width=1)

    # 底部说明
    f_foot = font(CJK, 20)
    d.text((78, 570), "国内 AI 一人公司案例 · 逐条信源核验的深度报告", font=f_foot, fill=FOOT)

    # 底部赛道
    f_track = font(CJK, 21)
    tw = d.textlength(track, font=f_track)
    d.text((W - 78 - tw, 568), track, font=f_track, fill=TRACK)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"已生成 {out_path}（{os.path.getsize(out_path)} 字节）")


def main() -> None:
    if len(sys.argv) < 7:
        print(__doc__)
        sys.exit(1)
    slug, title, subtitle, result, track, out_path = sys.argv[1:7]
    build(slug, title, subtitle, result, track, out_path)


if __name__ == "__main__":
    main()
