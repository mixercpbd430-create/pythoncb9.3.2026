// Chương 19: Làm việc với tệp (File Handling)
const chapter19 = {
    id: 19,
    title: "Làm việc với tệp (File Handling)",
    description: "Đọc/ghi file text, append, os, shutil, pathlib, CSV handling, JSON handling.",
    theory: `
        <h2>1. Quản lý file trong Python</h2>
        <h3>1.1 Mở và đọc file</h3>
        <pre><code class="language-python">with open("example.txt", "r") as file:
    content = file.read()
    print(content)</code></pre>
        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ Chế độ mở file</div>
            <code>"r"</code> = đọc, <code>"w"</code> = ghi (tạo mới), <code>"a"</code> = thêm cuối. <code>with open()</code> tự đóng file.
        </div>

        <h3>1.2 Ghi vào file</h3>
        <pre><code class="language-python">with open("example.txt", "w") as file:
    file.write("Hello, Python!")</code></pre>

        <h3>1.3 Thêm dữ liệu (append)</h3>
        <pre><code class="language-python">with open("example.txt", "a") as file:
    file.write("\\nAppended text.")</code></pre>

        <h3>1.4 Đọc từng dòng</h3>
        <pre><code class="language-python">with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())</code></pre>

        <h2>2. Quản lý thư mục (os)</h2>
        <pre><code class="language-python">import os

# Kiểm tra thư mục tồn tại
if not os.path.exists("my_folder"):
    os.mkdir("my_folder")

# Liệt kê file trong thư mục
files = os.listdir("my_folder")
print(files)

# Xóa thư mục rỗng
os.rmdir("my_folder")

# Xóa file
os.remove("example.txt")</code></pre>

        <h2>3. Quản lý file với shutil</h2>
        <pre><code class="language-python">import shutil

# Sao chép file
shutil.copy("example.txt", "copy_example.txt")

# Di chuyển file
shutil.move("example.txt", "my_folder/example.txt")</code></pre>

        <h2>4. pathlib — cách hiện đại</h2>
        <pre><code class="language-python">from pathlib import Path

file_path = Path("example.txt")

# Kiểm tra file tồn tại
if file_path.exists():
    print(f"File {file_path} tồn tại.")

# Tạo thư mục
folder = Path("my_folder")
folder.mkdir(exist_ok=True)</code></pre>

        <h2>5. Làm việc với CSV 📊</h2>
        <p><strong>CSV</strong> (Comma-Separated Values) là định dạng lưu dữ liệu dạng bảng, mỗi dòng là một bản ghi, các trường cách nhau bởi dấu phẩy.</p>

        <h3>5.1 Đọc file CSV</h3>
        <pre><code class="language-python">import csv

# Đọc CSV cơ bản — csv.reader
with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)  # Đọc dòng tiêu đề
    print(f"Cột: {header}")
    for row in reader:
        print(row)  # Mỗi row là list
# ['An', '20', '8.5']
# ['Bình', '22', '7.0']</code></pre>

        <h3>5.2 Ghi file CSV</h3>
        <pre><code class="language-python">import csv

data = [
    ["Tên", "Tuổi", "Điểm"],
    ["An", 20, 8.5],
    ["Bình", 22, 7.0],
    ["Chi", 19, 9.2]
]

with open("students.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(data)  # Ghi nhiều dòng
print("✅ Đã ghi students.csv")</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #3b82f6;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>📌 Lưu ý khi ghi CSV:</strong>
            <ul>
                <li><code>newline=""</code> tránh dòng trống thừa trên Windows</li>
                <li><code>encoding="utf-8"</code> hỗ trợ tiếng Việt</li>
                <li><code>writerow()</code> ghi 1 dòng, <code>writerows()</code> ghi nhiều dòng</li>
            </ul>
        </div>

        <h3>5.3 DictReader / DictWriter — đọc/ghi theo tên cột</h3>
        <pre><code class="language-python">import csv

# DictReader — mỗi dòng thành dict
with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f'{row["Tên"]}: {row["Điểm"]}')
# An: 8.5
# Bình: 7.0

# DictWriter — ghi từ dict
students = [
    {"Tên": "An", "Tuổi": 20, "Điểm": 8.5},
    {"Tên": "Bình", "Tuổi": 22, "Điểm": 7.0}
]

with open("output.csv", "w", newline="", encoding="utf-8") as f:
    fields = ["Tên", "Tuổi", "Điểm"]
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()       # Ghi tiêu đề
    writer.writerows(students) # Ghi data</code></pre>

        <h2>6. Làm việc với JSON 📋</h2>
        <p><strong>JSON</strong> (JavaScript Object Notation) là định dạng trao đổi dữ liệu phổ biến nhất. Cấu trúc tương tự dict/list trong Python.</p>

        <h3>6.1 Chuyển đổi Python ↔ JSON</h3>
        <table>
            <tr><th>Python</th><th>JSON</th></tr>
            <tr><td><code>dict</code></td><td>object <code>{}</code></td></tr>
            <tr><td><code>list, tuple</code></td><td>array <code>[]</code></td></tr>
            <tr><td><code>str</code></td><td>string</td></tr>
            <tr><td><code>int, float</code></td><td>number</td></tr>
            <tr><td><code>True / False</code></td><td>true / false</td></tr>
            <tr><td><code>None</code></td><td>null</td></tr>
        </table>

        <h3>6.2 json.dumps() — Python → JSON string</h3>
        <pre><code class="language-python">import json

data = {
    "ten": "An",
    "tuoi": 20,
    "diem": [8.5, 7.0, 9.2],
    "tot_nghiep": False
}

# Chuyển sang JSON string
json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)
# {
#   "ten": "An",
#   "tuoi": 20,
#   "diem": [8.5, 7.0, 9.2],
#   "tot_nghiep": false
# }</code></pre>

        <h3>6.3 json.loads() — JSON string → Python</h3>
        <pre><code class="language-python">import json

json_str = '{"ten": "An", "tuoi": 20, "diem": [8.5, 7.0]}'
data = json.loads(json_str)
print(type(data))      # <class 'dict'>
print(data["ten"])     # An
print(data["diem"])    # [8.5, 7.0]</code></pre>

        <h3>6.4 Đọc/Ghi file JSON</h3>
        <pre><code class="language-python">import json

# Ghi JSON file — json.dump()
students = [
    {"ten": "An", "tuoi": 20, "diem": 8.5},
    {"ten": "Bình", "tuoi": 22, "diem": 7.0},
    {"ten": "Chi", "tuoi": 19, "diem": 9.2}
]

with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students, f, ensure_ascii=False, indent=2)
print("✅ Đã ghi students.json")

# Đọc JSON file — json.load()
with open("students.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for sv in data:
    print(f'{sv["ten"]}: {sv["diem"]}')</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #f59e0b;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>💡 Phân biệt 4 hàm JSON:</strong>
            <table>
                <tr><th>Hàm</th><th>Input</th><th>Output</th><th>Dùng khi</th></tr>
                <tr><td><code>json.dumps()</code></td><td>Python object</td><td>JSON string</td><td>Chuyển thành chuỗi</td></tr>
                <tr><td><code>json.loads()</code></td><td>JSON string</td><td>Python object</td><td>Parse chuỗi JSON</td></tr>
                <tr><td><code>json.dump()</code></td><td>Python object</td><td>→ File</td><td>Ghi ra file .json</td></tr>
                <tr><td><code>json.load()</code></td><td>File</td><td>Python object</td><td>Đọc từ file .json</td></tr>
            </table>
        </div>

        <h3>6.5 Tùy chọn hữu ích</h3>
        <pre><code class="language-python">import json

data = {"tên": "Nguyễn An", "điểm": 8.5}

# ensure_ascii=False → hiển thị tiếng Việt
print(json.dumps(data, ensure_ascii=False))
# {"tên": "Nguyễn An", "điểm": 8.5}

# indent=2 → format đẹp
print(json.dumps(data, ensure_ascii=False, indent=2))

# sort_keys=True → sắp xếp key
print(json.dumps(data, ensure_ascii=False, sort_keys=True))</code></pre>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Ghi và đọc file",
            content: "Ghi danh sách sinh viên ra file rồi đọc lại.",
            code: `# Ghi file
ds = ["Nguyễn An", "Trần Bình", "Lê Cúc"]
with open("sinhvien.txt", "w", encoding="utf-8") as f:
    for i, sv in enumerate(ds, 1):
        f.write(f"{i}. {sv}\\n")
print("✅ Đã ghi file sinhvien.txt")

# Đọc file
print("\\n📖 Nội dung file:")
with open("sinhvien.txt", "r", encoding="utf-8") as f:
    for line in f:
        print("  " + line.strip())`,
            explanation: "encoding='utf-8' hỗ trợ tiếng Việt. enumerate(ds, 1) đếm từ 1."
        },
        {
            title: "Bài tập 02 - Append dữ liệu",
            content: "Thêm sinh viên mới vào file có sẵn.",
            code: `# Thêm sinh viên mới
sv_moi = ["Phạm Dũng", "Hoàng Em"]
with open("sinhvien.txt", "a", encoding="utf-8") as f:
    # Đếm số dòng hiện tại
    with open("sinhvien.txt", "r", encoding="utf-8") as r:
        so_dong = len(r.readlines())
    for i, sv in enumerate(sv_moi, so_dong + 1):
        f.write(f"{i}. {sv}\\n")

print("✅ Đã thêm sinh viên mới")

# Kiểm tra
with open("sinhvien.txt", "r", encoding="utf-8") as f:
    print(f.read())`,
            explanation: "'a' mở file để append — thêm cuối mà không mất dữ liệu cũ."
        },
        {
            title: "Bài tập 03 - Quản lý thư mục",
            content: "Tạo, liệt kê, kiểm tra thư mục với os.",
            code: `import os

folder = "du_lieu"

# Tạo thư mục
if not os.path.exists(folder):
    os.mkdir(folder)
    print(f"✅ Tạo thư mục '{folder}'")

# Tạo vài file trong thư mục
for i in range(1, 4):
    path = os.path.join(folder, f"file_{i}.txt")
    with open(path, "w") as f:
        f.write(f"Nội dung file {i}")

# Liệt kê
print(f"\\n📁 Nội dung '{folder}':")
for item in os.listdir(folder):
    full = os.path.join(folder, item)
    size = os.path.getsize(full)
    print(f"  {item} ({size} bytes)")`,
            explanation: "os.path.join() nối path an toàn. os.listdir() liệt kê nội dung thư mục."
        },
        {
            title: "Bài tập 04 - CSV thực hành 📊",
            content: "Đọc, ghi và xử lý dữ liệu CSV — quản lý điểm sinh viên.",
            code: `import csv

# === 1. Ghi CSV với csv.writer ===
students = [
    ["MSSV", "Tên", "Toán", "Lý", "Hóa"],
    ["SV001", "Nguyễn An", 8.5, 7.0, 9.0],
    ["SV002", "Trần Bình", 6.0, 8.5, 5.5],
    ["SV003", "Lê Chi", 9.5, 9.0, 8.0],
    ["SV004", "Võ Dũng", 4.5, 6.0, 7.5],
    ["SV005", "Hoàng Em", 7.0, 7.5, 8.0]
]

with open("diem_sv.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(students)
print("✅ Đã ghi diem_sv.csv")

# === 2. Đọc CSV với DictReader ===
print("\\n📊 BẢNG ĐIỂM SINH VIÊN:")
print("-" * 55)

with open("diem_sv.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    results = []
    for row in reader:
        toan = float(row["Toán"])
        ly = float(row["Lý"])
        hoa = float(row["Hóa"])
        tb = (toan + ly + hoa) / 3
        xep_loai = "Giỏi" if tb >= 8 else "Khá" if tb >= 6.5 else "TB" if tb >= 5 else "Yếu"
        results.append({
            "MSSV": row["MSSV"],
            "Tên": row["Tên"],
            "TB": round(tb, 1),
            "Xếp loại": xep_loai
        })
        print(f'{row["MSSV"]} | {row["Tên"]:12} | T:{toan} L:{ly} H:{hoa} | TB:{tb:.1f} | {xep_loai}')

# === 3. Ghi kết quả ra CSV mới ===
with open("ket_qua.csv", "w", newline="", encoding="utf-8") as f:
    fields = ["MSSV", "Tên", "TB", "Xếp loại"]
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(results)

print("\\n✅ Đã ghi ket_qua.csv")

# === 4. Thống kê từ CSV ===
tbs = [r["TB"] for r in results]
print(f"\\n📈 Thống kê:")
print(f"   Số SV: {len(tbs)}")
print(f"   TB cao nhất: {max(tbs)}")
print(f"   TB thấp nhất: {min(tbs)}")
print(f"   TB lớp: {sum(tbs)/len(tbs):.1f}")
print(f"   Giỏi: {sum(1 for r in results if r['Xếp loại']=='Giỏi')}")
print(f"   Yếu: {sum(1 for r in results if r['Xếp loại']=='Yếu')}")`,
            explanation: "csv.writer ghi list, csv.DictWriter ghi dict. DictReader đọc thành dict theo header. newline='' tránh dòng trống."
        },
        {
            title: "Bài tập 05 - JSON thực hành 📋",
            content: "Đọc, ghi, cập nhật dữ liệu JSON — quản lý sản phẩm.",
            code: `import json

# === 1. Tạo dữ liệu và ghi JSON ===
shop = {
    "ten_cua_hang": "Python Shop",
    "dia_chi": "123 Nguyễn Huệ, HCM",
    "san_pham": [
        {"id": 1, "ten": "Laptop", "gia": 15000000, "ton_kho": 10},
        {"id": 2, "ten": "Chuột", "gia": 250000, "ton_kho": 50},
        {"id": 3, "ten": "Bàn phím", "gia": 800000, "ton_kho": 30},
        {"id": 4, "ten": "Tai nghe", "gia": 1200000, "ton_kho": 20},
        {"id": 5, "ten": "Màn hình", "gia": 5000000, "ton_kho": 5}
    ]
}

# Ghi ra file JSON
with open("shop.json", "w", encoding="utf-8") as f:
    json.dump(shop, f, ensure_ascii=False, indent=2)
print("✅ Đã ghi shop.json")

# === 2. Đọc JSON và hiển thị ===
with open("shop.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"\\n🏪 {data['ten_cua_hang']}")
print(f"📍 {data['dia_chi']}")
print(f"{'─' * 50}")
print(f"{'ID':>3} | {'Sản phẩm':12} | {'Giá':>12} | {'Tồn kho':>8}")
print(f"{'─' * 50}")

for sp in data["san_pham"]:
    print(f'{sp["id"]:>3} | {sp["ten"]:12} | {sp["gia"]:>10,}đ | {sp["ton_kho"]:>8}')

# === 3. Cập nhật dữ liệu ===
# Thêm sản phẩm mới
sp_moi = {"id": 6, "ten": "USB 32GB", "gia": 150000, "ton_kho": 100}
data["san_pham"].append(sp_moi)
print(f"\\n➕ Đã thêm: {sp_moi['ten']}")

# Cập nhật giá
for sp in data["san_pham"]:
    if sp["ten"] == "Laptop":
        sp["gia"] = 14500000
        print(f"✏️ Cập nhật giá Laptop: {sp['gia']:,}đ")

# Ghi lại
with open("shop.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print("💾 Đã lưu thay đổi!")

# === 4. Tìm kiếm & lọc ===
print("\\n🔍 Sản phẩm giá > 1 triệu:")
expensive = [sp for sp in data["san_pham"] if sp["gia"] > 1000000]
for sp in expensive:
    print(f"   {sp['ten']}: {sp['gia']:,}đ")

# Tổng giá trị tồn kho
total = sum(sp["gia"] * sp["ton_kho"] for sp in data["san_pham"])
print(f"\\n💰 Tổng giá trị tồn kho: {total:,}đ")`,
            explanation: "json.dump() ghi file, json.load() đọc file. ensure_ascii=False cho tiếng Việt, indent=2 cho format đẹp."
        },
        {
            title: "Bài tập 06 - CSV ↔ JSON chuyển đổi 🔄",
            content: "Chuyển đổi qua lại giữa CSV và JSON, xử lý dữ liệu thực tế.",
            code: `import csv
import json

# === 1. CSV → JSON ===
def csv_to_json(csv_file, json_file):
    """Chuyển CSV thành JSON"""
    data = []
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Chuyển số thành float
            for key in row:
                try:
                    row[key] = float(row[key])
                    if row[key] == int(row[key]):
                        row[key] = int(row[key])
                except ValueError:
                    pass
            data.append(dict(row))

    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ {csv_file} → {json_file} ({len(data)} bản ghi)")
    return data

# === 2. JSON → CSV ===
def json_to_csv(json_file, csv_file):
    """Chuyển JSON thành CSV"""
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    if not data:
        print("❌ Không có dữ liệu!")
        return

    with open(csv_file, "w", newline="", encoding="utf-8") as f:
        fields = data[0].keys()
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(data)

    print(f"✅ {json_file} → {csv_file} ({len(data)} bản ghi)")

# === 3. Test ===
# Tạo file CSV mẫu
sample_csv = [
    ["Tên", "Môn", "Điểm", "Học kỳ"],
    ["An", "Python", 8.5, 1],
    ["Bình", "Python", 7.0, 1],
    ["Chi", "Java", 9.0, 1],
    ["An", "Java", 6.5, 1],
    ["Bình", "Java", 8.0, 1]
]
with open("diem_mon.csv", "w", newline="", encoding="utf-8") as f:
    csv.writer(f).writerows(sample_csv)

# Chuyển CSV → JSON
data = csv_to_json("diem_mon.csv", "diem_mon.json")

# Hiển thị JSON đẹp
print("\\n📋 Dữ liệu JSON:")
print(json.dumps(data[:2], ensure_ascii=False, indent=2))

# Chuyển ngược JSON → CSV
json_to_csv("diem_mon.json", "diem_mon_copy.csv")

# === 4. Xử lý nâng cao: Group by ===
print("\\n📊 Điểm TB theo sinh viên:")
from collections import defaultdict
groups = defaultdict(list)
for row in data:
    groups[row["Tên"]].append(row["Điểm"])

for ten, diems in groups.items():
    tb = sum(diems) / len(diems)
    print(f"  {ten}: {diems} → TB = {tb:.1f}")`,
            explanation: "CSV phẳng (tabular), JSON phân cấp (nested). Chuyển đổi qua lại là kỹ năng quan trọng trong xử lý dữ liệu."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 8: Các thao tác trên FILE)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Chế độ mở file "w" có tác dụng gì?
   A. Đọc file
   B. Ghi file (tạo mới hoặc ghi đè)
   C. Thêm dữ liệu cuối file
   D. Đọc và ghi

2. Chế độ "a" (append) khác "w" (write) ở điểm nào?
   A. "a" đọc file, "w" ghi file
   B. "a" thêm cuối file, "w" ghi đè toàn bộ
   C. Không có sự khác biệt
   D. "a" nhanh hơn "w"

3. Cú pháp nào tự động đóng file sau khi sử dụng?
   A. open("file.txt")
   B. with open("file.txt") as f:
   C. file.close()
   D. file.open()

4. Phương thức nào đọc toàn bộ nội dung file thành chuỗi?
   A. file.readline()
   B. file.readlines()
   C. file.read()
   D. file.readall()

5. Để đọc mảng 1 chiều từ file (mỗi số trên 1 dòng), dùng cách nào?
   A. arr = file.read()
   B. arr = [int(line) for line in file]
   C. arr = file.split()
   D. arr = file.array()

6. Để đọc mảng 2 chiều từ file (mỗi dòng chứa nhiều số cách nhau bởi dấu cách), dùng:
   A. arr = file.read()
   B. arr = [line.split() for line in file]
   C. arr = file.matrix()
   D. arr = file.readlines(2)

7. Hàm split() khi đọc file dùng để:
   A. Nối các dòng lại
   B. Tách chuỗi thành danh sách theo ký tự phân cách
   C. Xóa dòng trống
   D. Đếm số dòng

8. Khi ghi mảng ra file, cần chuyển số sang chuỗi bằng hàm nào?
   A. int()
   B. str()
   C. float()
   D. list()

9. os.path.exists("test.txt") trả về gì nếu file tồn tại?
   A. "test.txt"
   B. 1
   C. True
   D. File object

10. Khi ghi file tiếng Việt, cần thêm tham số gì?
    A. lang="vi"
    B. encoding="utf-8"
    C. charset="unicode"
    D. format="vietnamese"`,
            code: `# ĐÁP ÁN:
# 1. B ("w" = write, tạo mới hoặc ghi đè file)
# 2. B ("a" thêm cuối file, không mất dữ liệu cũ; "w" ghi đè toàn bộ)
# 3. B (with open() tự động đóng file khi thoát khối with)
# 4. C (file.read() đọc toàn bộ thành 1 chuỗi)
# 5. B ([int(line) for line in file] — list comprehension đọc từng dòng)
# 6. B ([line.split() for line in file] — split tách mỗi dòng thành list)
# 7. B (Tách chuỗi thành danh sách theo ký tự phân cách)
# 8. B (str() — chuyển số sang chuỗi để ghi file)
# 9. C (True — os.path.exists trả về boolean)
# 10. B (encoding="utf-8" hỗ trợ tiếng Việt và Unicode)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. File I/O: open/close, read/write/append, readline + split đọc mảng từ file."
        },
        {
            title: "📝 Câu hỏi ôn tập - CSV & JSON",
            content: `Trả lời các câu hỏi trắc nghiệm nâng cao:

1. Module nào dùng để xử lý CSV trong Python?
   A. pandas
   B. csv
   C. table
   D. excel

2. csv.DictReader đọc mỗi dòng thành kiểu gì?
   A. list
   B. tuple
   C. dict (OrderedDict)
   D. set

3. Khi ghi CSV trên Windows, cần thêm tham số gì?
   A. mode="windows"
   B. newline=""
   C. os="win"
   D. linebreak=False

4. json.dumps() làm gì?
   A. Đọc file JSON
   B. Chuyển Python object → JSON string
   C. Ghi ra file JSON
   D. Xóa file JSON

5. json.load() khác json.loads() ở điểm nào?
   A. load() đọc từ file, loads() đọc từ string
   B. Không khác nhau
   C. load() nhanh hơn
   D. loads() chỉ đọc list

6. ensure_ascii=False dùng để:
   A. Mã hóa file
   B. Hiển thị ký tự Unicode (tiếng Việt)
   C. Tăng tốc xử lý
   D. Nén dữ liệu

7. indent=2 trong json.dumps() dùng để:
   A. Thêm 2 phần tử
   B. Format JSON đẹp với 2 space
   C. Giới hạn 2 cấp
   D. Xóa 2 dòng đầu

8. CSV phù hợp cho dữ liệu dạng:
   A. Phân cấp (nested)
   B. Bảng phẳng (tabular)
   C. Hình ảnh
   D. Nhị phân

9. JSON phù hợp cho dữ liệu dạng:
   A. Chỉ số
   B. Chỉ chuỗi
   C. Phân cấp, nested
   D. Chỉ list

10. writeheader() trong DictWriter dùng để:
    A. Ghi dòng dữ liệu đầu tiên
    B. Ghi dòng tiêu đề (header)
    C. Xóa tiêu đề
    D. Đọc tiêu đề`,
            code: `# ĐÁP ÁN:
# 1. B (csv — module built-in xử lý CSV)
# 2. C (dict/OrderedDict — key là tên cột)
# 3. B (newline="" — tránh dòng trống thừa trên Windows)
# 4. B (dumps = dump string — chuyển Python → JSON string)
# 5. A (load đọc từ file object, loads đọc từ string)
# 6. B (Hiển thị tiếng Việt/Unicode thay vì \\uXXXX)
# 7. B (Format đẹp với thụt lề 2 spaces)
# 8. B (CSV = bảng phẳng, mỗi dòng là 1 bản ghi)
# 9. C (JSON hỗ trợ nested object/array phức tạp)
# 10. B (writeheader ghi dòng tiêu đề từ fieldnames)`,
            explanation: "Nguồn: Lập trình Python Nâng Cao. CSV cho bảng, JSON cho cấu trúc phức tạp. Cả hai đều dùng phổ biến trong thực tế."
        }
    ]
};

