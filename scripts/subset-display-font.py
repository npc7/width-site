#!/usr/bin/env python3
"""生成中文标题字体子集：src/assets/fonts/dart-display-zh.woff2

中文大标题用 Noto Sans SC Black（开源，SIL OFL 1.1）。整套字体有 17MB，不能直接放到网站上，
所以拆成两个文件：dart-display-zh.woff2 是全站中文页面目前用到的字（每个中文页面都会加载）；
dart-display-zh-ext.woff2 是其余的常用字，只有页面上出现了这些字才会加载。两个文件和 display-zh.css 都由本脚本生成。

什么时候要重跑：内容改动比较大之后跑一次，让常用到的字回到主文件里（不跑也不会缺字，只是多下载一个备用文件）。
用法：
  1. 下载源字体（只需一次，不要提交到仓库）：
     curl -L -o /tmp/NotoSansSC.ttf "https://github.com/google/fonts/raw/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf"
  2. 先构建一次网站：npx @11ty/eleventy
  3. python3 scripts/subset-display-font.py /tmp/NotoSansSC.ttf
依赖：pip install fonttools brotli
"""
import re, sys, glob, io
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.subset import Subsetter, Options

ROOT = Path(__file__).resolve().parent.parent
src = sys.argv[1] if len(sys.argv) > 1 else "/tmp/NotoSansSC.ttf"
site = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "_site"

chars = set()
pages = glob.glob(str(site / "zh/**/*.html"), recursive=True)
for p in pages:
    html = Path(p).read_text(encoding="utf-8")
    html = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", html)
    chars.update(re.sub(r"<[^>]+>", "", html))
# 源文件里的标题（草稿、还没构建出来的页面）
for p in glob.glob(str(ROOT / "src/zh/**/*.md"), recursive=True) + glob.glob(str(ROOT / "src/_data/*.yml")):
    chars.update(Path(p).read_text(encoding="utf-8"))
# 备用字：GB2312 一级常用字 3,755 个
rare = "".join(bytes([a, b]).decode("gb2312") for a in range(0xB0, 0xD8) for b in range(0xA1, 0xFF) if not (a == 0xD7 and b > 0xF9))
# 只留中文字和中文标点；拉丁字母和数字交给 Gotham
keep = {c for c in chars if "一" <= c <= "鿿" or c in "，。、；：？！（）「」《》“”‘’…—·％　"}
print(f"{len(pages)} pages, {len(keep)} glyphs")

def build(unicodes, path):
    font = instantiateVariableFont(TTFont(src), {"wght": 900})
    opt = Options(); opt.flavor = "woff2"; opt.layout_features = ["kern", "palt", "halt", "locl"]; opt.name_IDs = [1, 2]; opt.notdef_outline = True
    sub = Subsetter(opt); sub.populate(unicodes=sorted(unicodes)); sub.subset(font)
    font.flavor = "woff2"; font.save(path)
    print(path.name, f"{path.stat().st_size/1024:.0f} KB", len(unicodes), "glyphs")

def ranges(cps):
    cps = sorted(cps); out = []; start = prev = cps[0]
    for c in cps[1:] + [None]:
        if c is not None and c == prev + 1: prev = c; continue
        out.append(f"U+{start:X}" if start == prev else f"U+{start:X}-{prev:X}")
        if c is not None: start = prev = c
    return ",".join(out)

used = {ord(c) for c in keep}
extra = {ord(c) for c in rare} - used
fonts = ROOT / "src/assets/fonts"
build(used, fonts / "dart-display-zh.woff2")
build(extra, fonts / "dart-display-zh-ext.woff2")
css = f"""/* 由 scripts/subset-display-font.py 生成，不要手改。
   中文大标题字体：Noto Sans SC Black（SIL OFL 1.1）。
   第一段是备用字（常用字里网站目前没用到的），只有页面上真的出现这些字时浏览器才会下载；
   第二段是网站目前用到的字，写在后面所以优先。 */
@font-face {{ font-family: "DART Display ZH"; src: url("../fonts/dart-display-zh-ext.woff2") format("woff2"); font-weight: 700 900; font-display: swap; unicode-range: U+4E00-9FFF; }}
@font-face {{ font-family: "DART Display ZH"; src: url("../fonts/dart-display-zh.woff2") format("woff2"); font-weight: 700 900; font-display: swap; unicode-range: {ranges(used)}; }}
"""
(ROOT / "src/assets/css/display-zh.css").write_text(css, encoding="utf-8")
print("display-zh.css", len(css) // 1024, "KB")
