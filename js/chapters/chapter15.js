// Chương 15: Từ điển (Dictionaries)
const chapter15 = {
    id: 15,
    title: "Từ điển (Dictionaries)",
    description: "Dict key-value, thêm/sửa/xóa, duyệt, keys/values/items, ví dụ quản lý sản phẩm thực tế.",
    theory: `
        <h2>1. Dictionary là gì?</h2>
        <p>Lưu trữ dữ liệu dạng <strong>key-value</strong> (khóa-giá trị). Key là duy nhất.</p>
        <pre><code class="language-python">khach_hang = {
    "ten": "Nguyễn Văn A",
    "tuoi": 30,
    "email": "a@example.com"
}

print(khach_hang["ten"])    # Nguyễn Văn A
print(khach_hang["tuoi"])   # 30</code></pre>

        <h2>2. Thêm / Cập nhật</h2>
        <pre><code class="language-python">khach_hang["dia_chi"] = "Hà Nội"           # Thêm key mới
khach_hang["email"] = "new@example.com"    # Cập nhật
print(khach_hang)</code></pre>

        <h2>3. Xóa phần tử</h2>
        <pre><code class="language-python">del khach_hang["tuoi"]              # Xóa bằng del
khach_hang.pop("email")             # Xóa bằng pop (trả về giá trị)</code></pre>

        <h2>4. Duyệt Dictionary</h2>
        <pre><code class="language-python">for key, value in khach_hang.items():
    print(f"{key}: {value}")</code></pre>

        <h2>5. Kiểm tra key tồn tại</h2>
        <pre><code class="language-python">if "ten" in khach_hang:
    print("Có tên:", khach_hang["ten"])</code></pre>

        <h2>6. Keys, Values, Items</h2>
        <pre><code class="language-python">print(khach_hang.keys())     # dict_keys([...])
print(khach_hang.values())   # dict_values([...])
print(khach_hang.items())    # dict_items([...])</code></pre>

        <h2>7. Ví dụ thực tế: Quản lý sản phẩm</h2>
        <pre><code class="language-python">san_pham = {
    "SP001": {"ten": "Đồng hồ Casio", "gia": 1500000, "sl": 10},
    "SP002": {"ten": "Đồng hồ Seiko", "gia": 3500000, "sl": 5},
    "SP003": {"ten": "Đồng hồ Citizen", "gia": 2800000, "sl": 8},
}

# In danh sách
for ma, tt in san_pham.items():
    print(f"Mã: {ma}, Tên: {tt['ten']}, Giá: {tt['gia']:,}đ")

# Cập nhật số lượng
san_pham["SP001"]["sl"] -= 2

# Thêm sản phẩm mới
san_pham["SP004"] = {"ten": "Đồng hồ Rolex", "gia": 15000000, "sl": 2}

# Xóa sản phẩm
san_pham.pop("SP003")</code></pre>

        <h2>8. Dict Comprehension 🚀</h2>
        <p>Tạo dictionary mới từ iterable bằng cú pháp ngắn gọn.</p>
        <pre><code class="language-python"># Cú pháp: {key: value for biến in iterable}

# Bình phương các số
squares = {x: x**2 for x in range(1, 6)}
print(squares)   # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Với điều kiện (filter)
even_sq = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print(even_sq)   # {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}

# Đảo key-value
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)   # {1: 'a', 2: 'b', 3: 'c'}

# Tạo dict từ 2 list dùng zip
keys = ["ten", "tuoi", "lop"]
vals = ["An", 20, "CNTT"]
student = {k: v for k, v in zip(keys, vals)}
print(student)   # {'ten': 'An', 'tuoi': 20, 'lop': 'CNTT'}</code></pre>

        <h2>9. get() và setdefault() 🚀</h2>
        <p>Truy cập an toàn — tránh <code>KeyError</code> khi key không tồn tại.</p>
        <pre><code class="language-python">info = {"ten": "An", "tuoi": 20}

# ❌ Lỗi nếu key không có
# print(info["email"])   → KeyError

# ✅ get() — trả về None hoặc giá trị mặc định
print(info.get("email"))           # None
print(info.get("email", "N/A"))    # "N/A"

# ✅ setdefault() — thêm key nếu chưa có
info.setdefault("email", "default@mail.com")
print(info)   # {..., 'email': 'default@mail.com'}

# Nếu key đã tồn tại → không thay đổi
info.setdefault("ten", "Bình")
print(info["ten"])   # "An" (giữ nguyên)</code></pre>

        <h2>10. defaultdict & Counter (collections) 🚀</h2>
        <pre><code class="language-python">from collections import defaultdict, Counter

# === defaultdict ===
# Tự tạo giá trị mặc định khi truy cập key mới
word_count = defaultdict(int)   # default = 0
text = "python java python c# python java"
for word in text.split():
    word_count[word] += 1       # Không cần kiểm tra key
print(dict(word_count))   # {'python': 3, 'java': 2, 'c#': 1}

# defaultdict(list) — nhóm phần tử
groups = defaultdict(list)
students = [("CNTT", "An"), ("KT", "Bình"), ("CNTT", "Cường"), ("KT", "Dũng")]
for lop, ten in students:
    groups[lop].append(ten)
print(dict(groups))   # {'CNTT': ['An', 'Cường'], 'KT': ['Bình', 'Dũng']}

# === Counter ===
# Đếm tần suất siêu nhanh
colors = ["đỏ", "xanh", "đỏ", "vàng", "xanh", "đỏ"]
count = Counter(colors)
print(count)                    # Counter({'đỏ': 3, 'xanh': 2, 'vàng': 1})
print(count.most_common(2))     # [('đỏ', 3), ('xanh', 2)]</code></pre>

        <h2>11. Nested Dictionary (Dict lồng nhau) 🚀</h2>
        <pre><code class="language-python"># Dict nhiều cấp — mô phỏng cấu trúc dữ liệu phức tạp
truong = {
    "CNTT": {
        "sv_count": 150,
        "mon_hoc": ["Python", "Java", "Database"],
        "gv": {"truong_khoa": "TS. Nguyễn A"}
    },
    "KT": {
        "sv_count": 200,
        "mon_hoc": ["Kế toán", "Tài chính"],
        "gv": {"truong_khoa": "TS. Trần B"}
    }
}

# Truy cập sâu
print(truong["CNTT"]["mon_hoc"][0])           # Python
print(truong["KT"]["gv"]["truong_khoa"])      # TS. Trần B

# Duyệt nested dict
for khoa, info in truong.items():
    print(f"\\n📌 Khoa {khoa}:")
    print(f"   Số SV: {info['sv_count']}")
    print(f"   Môn học: {', '.join(info['mon_hoc'])}")</code></pre>

        <div class="note-box note-box--tip">
            <div class="note-title">💡 update() — Gộp 2 dict</div>
            <code>dict1.update(dict2)</code> gộp dict2 vào dict1. Key trùng sẽ bị <strong>ghi đè</strong> bởi dict2.<br>
            Python 3.9+: dùng toán tử <code>dict1 | dict2</code> để tạo dict mới.
        </div>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Dict cơ bản",
            content: "Tạo và thao tác Dictionary.",
            code: `sv = {
    "mssv": "SV001",
    "ten": "Nguyễn An",
    "diem": [8, 7.5, 9],
    "lop": "CNTT-K20"
}

print("Thông tin sinh viên:")
for k, v in sv.items():
    print(f"  {k}: {v}")

# Tính trung bình điểm
tb = sum(sv["diem"]) / len(sv["diem"])
sv["tb"] = round(tb, 1)
print(f"\\nĐiểm TB: {sv['tb']}")`,
            explanation: "Dict chứa được list làm giá trị. Thêm key mới bằng sv['tb'] = ..."
        },
        {
            title: "Bài tập 02 - Quản lý sản phẩm",
            content: "CRUD sản phẩm với Dictionary.",
            code: `kho = {}

# Thêm sản phẩm
kho["SP01"] = {"ten": "Gạo", "gia": 15000, "sl": 100}
kho["SP02"] = {"ten": "Đường", "gia": 20000, "sl": 50}
kho["SP03"] = {"ten": "Muối", "gia": 8000, "sl": 200}

# Hiển thị
print("{:<6} {:<10} {:>10} {:>6}".format("Mã", "Tên", "Giá", "SL"))
print("-" * 35)
for ma, sp in kho.items():
    print("{:<6} {:<10} {:>10,} {:>6}".format(
        ma, sp["ten"], sp["gia"], sp["sl"]))

# Tổng giá trị kho
tgkh = sum(sp["gia"] * sp["sl"] for sp in kho.values())
print(f"\\nTổng giá trị kho: {tgkh:,}đ")`,
            explanation: "Dict lồng dict mô phỏng database. Generator expression tính tổng giá trị."
        },
        {
            title: "Bài tập 03 - Đếm tần suất",
            content: "Đếm số lần xuất hiện của mỗi từ.",
            code: `text = "python java python c# python java c# python"
words = text.split()

freq = {}
for word in words:
    if word in freq:
        freq[word] += 1
    else:
        freq[word] = 1

print("Tần suất xuất hiện:")
for word, count in sorted(freq.items(), key=lambda x: -x[1]):
    print(f"  {word:10} → {count} lần")`,
            explanation: "Pattern đếm tần suất quen thuộc. sorted() + lambda sắp xếp theo count giảm dần."
        },
        {
            title: "Bài tập 04 - Đếm tần suất ký tự (Dict Comprehension + Counter) 🚀",
            content: "Đếm tần suất ký tự trong chuỗi sử dụng nhiều cách: dict thường, get(), defaultdict, Counter, và dict comprehension.",
            code: `from collections import defaultdict, Counter

text = "Lap Trinh Python"
print(f"Chuỗi: '{text}'")

# === Cách 1: Dict thường + kiểm tra key ===
freq1 = {}
for c in text.lower():
    if c != " ":
        freq1[c] = freq1.get(c, 0) + 1   # get() thay cho if-else
print(f"\\nCách 1 (get):      {freq1}")

# === Cách 2: defaultdict ===
freq2 = defaultdict(int)
for c in text.lower():
    if c != " ":
        freq2[c] += 1
print(f"Cách 2 (default):  {dict(freq2)}")

# === Cách 3: Counter (nhanh nhất!) ===
freq3 = Counter(c for c in text.lower() if c != " ")
print(f"Cách 3 (Counter):  {dict(freq3)}")
print(f"Top 3: {freq3.most_common(3)}")

# === Dict Comprehension: lọc ký tự xuất hiện > 1 lần ===
repeated = {k: v for k, v in freq3.items() if v > 1}
print(f"\\nKý tự lặp (>1 lần): {repeated}")

# === Biểu đồ tần suất ===
print("\\n📊 Biểu đồ:")
for char, count in freq3.most_common():
    bar = "█" * count
    print(f"  '{char}': {bar} ({count})")`,
            explanation: "get(key, default) tránh KeyError. defaultdict(int) tự tạo 0. Counter là cách Python nhất. Dict comprehension lọc kết quả."
        },
        {
            title: "Bài tập 05 - Quản lý danh bạ (Nested Dict + CRUD) 🚀",
            content: "Xây dựng hệ thống quản lý danh bạ đơn giản sử dụng nested dict, get(), setdefault().",
            code: `# === Danh bạ ===
danh_ba = {
    "An": {
        "sdt": "0901234567",
        "email": "an@gmail.com",
        "nhom": "Bạn bè"
    },
    "Bình": {
        "sdt": "0912345678",
        "email": "binh@yahoo.com",
        "nhom": "Công việc"
    },
    "Cường": {
        "sdt": "0923456789",
        "nhom": "Gia đình"
    }
}

# === 1. Hiển thị danh bạ ===
print("📱 DANH BẠ")
print("=" * 50)
for ten, info in danh_ba.items():
    email = info.get("email", "Chưa có")   # get() an toàn
    print(f"  {ten}: {info['sdt']} | {email} | [{info['nhom']}]")

# === 2. Thêm liên hệ mới ===
danh_ba["Dũng"] = {"sdt": "0934567890", "email": "dung@mail.com", "nhom": "Bạn bè"}
print(f"\\n✅ Đã thêm: Dũng")

# === 3. Cập nhật — setdefault() ===
danh_ba["Cường"].setdefault("email", "cuong@mail.com")  # Thêm email nếu chưa có
print(f"Email Cường: {danh_ba['Cường']['email']}")

# === 4. Tìm kiếm theo nhóm (dict comprehension) ===
nhom_tim = "Bạn bè"
ket_qua = {ten: info for ten, info in danh_ba.items() if info["nhom"] == nhom_tim}
print(f"\\n🔍 Nhóm '{nhom_tim}': {list(ket_qua.keys())}")

# === 5. Thống kê ===
from collections import Counter
nhom_count = Counter(info["nhom"] for info in danh_ba.values())
print(f"\\n📊 Thống kê nhóm: {dict(nhom_count)}")`,
            explanation: "get() truy cập an toàn. setdefault() thêm key nếu chưa có. Dict comprehension lọc theo điều kiện. Counter thống kê nhanh."
        },
        {
            title: "Bài tập 06 - Tạo Dict từ 2 List (zip + comprehension) 🚀",
            content: "Thực hành tạo dictionary từ 2 list, đảo key-value, gộp dict, và dict comprehension nâng cao.",
            code: `# === 1. Tạo dict từ 2 list ===
subjects = ["Toán", "Văn", "Anh", "Lý", "Hóa"]
scores = [8.5, 7.0, 9.0, 6.5, 8.0]

# Cách 1: dict(zip())
bang_diem = dict(zip(subjects, scores))
print(f"Bảng điểm: {bang_diem}")

# Cách 2: Dict comprehension + zip
bang_diem2 = {mon: diem for mon, diem in zip(subjects, scores)}
print(f"Comprehension: {bang_diem2}")

# === 2. Đảo key ↔ value ===
inverted = {v: k for k, v in bang_diem.items()}
print(f"\\nĐảo key-value: {inverted}")

# === 3. Lọc và biến đổi ===
gioi = {mon: diem for mon, diem in bang_diem.items() if diem >= 8}
print(f"Môn giỏi (≥8): {gioi}")

# Thêm xếp loại
xep_loai = {
    mon: {"diem": diem, "loai": "Giỏi" if diem >= 8 else "Khá" if diem >= 6.5 else "TB"}
    for mon, diem in bang_diem.items()
}
print("\\n📊 Chi tiết:")
for mon, info in xep_loai.items():
    print(f"  {mon}: {info['diem']} → {info['loai']}")

# === 4. Gộp 2 dict (update & |) ===
extra = {"Tin": 9.5, "Sinh": 7.5}
all_scores = {**bang_diem, **extra}   # Cách 1: ** unpacking
print(f"\\nTất cả môn: {all_scores}")

# Python 3.9+:
# all_scores = bang_diem | extra

# === 5. Tính thống kê ===
vals = list(all_scores.values())
print(f"\\nTB: {sum(vals)/len(vals):.2f}")
print(f"Cao nhất: {max(all_scores, key=all_scores.get)} ({max(vals)})")
print(f"Thấp nhất: {min(all_scores, key=all_scores.get)} ({min(vals)})")`,
            explanation: "zip() ghép 2 list thành dict. ** unpacking gộp dict. max(dict, key=dict.get) tìm key có value lớn nhất."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 10: Dictionary)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Dictionary lưu dữ liệu dạng gì?
   A. Danh sách có thứ tự
   B. Cặp key-value (khóa-giá trị)
   C. Tập hợp không trùng lặp
   D. Danh sách bất biến

2. d = {"a": 1, "b": 2}. Cách truy cập giá trị key "a":
   A. d(a)
   B. d["a"]
   C. d.a
   D. d[0]

3. Để thêm key mới vào Dictionary:
   A. d.add("key", value)
   B. d.insert("key", value)
   C. d["key"] = value
   D. d.append("key", value)

4. Phương thức .items() trả về:
   A. Chỉ các key
   B. Chỉ các value
   C. Các cặp (key, value)
   D. Số lượng phần tử

5. Kiểm tra key có tồn tại trong dict dùng:
   A. key == dict
   B. key in dict
   C. dict.has(key)
   D. dict.exists(key)

6. Sự khác biệt giữa del và pop() trong dict:
   A. del nhanh hơn
   B. pop() trả về giá trị đã xóa, del thì không
   C. del chỉ xóa key đầu tiên
   D. pop() xóa tất cả

7. Khi nào nên dùng Dictionary?
   A. Khi cần danh sách có thứ tự
   B. Khi cần lưu trữ dữ liệu cặp khóa-giá trị
   C. Khi cần dữ liệu bất biến
   D. Khi cần loại bỏ trùng lặp`,
            code: `# ĐÁP ÁN:
# 1. B (Cặp key-value)
# 2. B (d["a"] — truy cập bằng key)
# 3. C (d["key"] = value)
# 4. C (Các cặp (key, value))
# 5. B (key in dict)
# 6. B (pop() trả về giá trị, del không)
# 7. B (Lưu trữ dữ liệu cặp khóa-giá trị)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. Dict: key-value, thêm/sửa/xóa linh hoạt, duyệt bằng items()."
        },
        {
            title: "📝 Câu hỏi ôn tập nâng cao - Dict Comprehension & Collections 🚀",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Kết quả của {x: x**2 for x in range(4)} là:
   A. {1: 1, 2: 4, 3: 9}
   B. {0: 0, 1: 1, 2: 4, 3: 9}
   C. [0, 1, 4, 9]
   D. {0, 1, 4, 9}

2. d.get("key", "default") khi "key" KHÔNG có trong d sẽ:
   A. Báo lỗi KeyError
   B. Trả về None
   C. Trả về "default"
   D. Thêm "key" vào d

3. defaultdict(int) khi truy cập key chưa có sẽ:
   A. Báo lỗi
   B. Trả về None
   C. Tự tạo key với giá trị 0
   D. Trả về ""

4. Counter(["a","b","a","c","a"]).most_common(1) cho kết quả:
   A. "a"
   B. [("a", 3)]
   C. {"a": 3}
   D. 3`,
            code: `# ĐÁP ÁN:
# 1. B ({0: 0, 1: 1, 2: 4, 3: 9} — range(4) = 0,1,2,3)
# 2. C (Trả về "default" — get() không báo lỗi mà trả giá trị mặc định)
# 3. C (Tự tạo key với giá trị 0 — int() mặc định là 0)
# 4. B ([("a", 3)] — most_common(1) trả list gồm 1 tuple nhiều nhất)`,
            explanation: "Nguồn: Giáo trình Python Nâng Cao. Dict comprehension, get(), defaultdict, Counter là công cụ mạnh cho xử lý dữ liệu."
        }
    ]
};
