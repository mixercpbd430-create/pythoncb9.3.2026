// Chương 14: Tuples và Sets
const chapter14 = {
    id: 14,
    title: "Tuples và Sets",
    description: "Tuple (immutable), Set (không trùng lặp), phép toán tập hợp, so sánh Tuple vs Set.",
    theory: `
        <h2>1. Tuple trong Python</h2>
        <p>Tuple là cấu trúc dữ liệu <strong>bất biến (immutable)</strong> — không thể thay đổi sau khi tạo.</p>
        <pre><code class="language-python">my_tuple = (1, 2, 3, "Hello", True)
print(my_tuple[0])    # 1
print(my_tuple[-1])   # True
print(len(my_tuple))  # 5

# Nested tuple
nested = ((1, 2), (3, 4))
print(nested[0])      # (1, 2)</code></pre>

        <h3>Tính chất Tuple</h3>
        <pre><code class="language-python"># ❌ Không thể thay đổi
# my_tuple[1] = 100  → TypeError

# ⚠️ Tuple 1 phần tử cần dấu phẩy
single = (5,)       # Tuple ✅
not_tuple = (5)     # Chỉ là số 5 ❌</code></pre>

        <h2>2. Set trong Python</h2>
        <p>Set là tập hợp <strong>không thứ tự, không trùng lặp</strong>.</p>
        <pre><code class="language-python">my_set = {1, 2, 3, "Hello", True}
print(my_set)

# Tự động loại bỏ trùng lặp
my_set = {1, 2, 2, 3, 3, 3}
print(my_set)   # {1, 2, 3}</code></pre>

        <h3>Thao tác với Set</h3>
        <pre><code class="language-python">my_set = {1, 2, 3}

# Thêm
my_set.add(4)

# Xóa
my_set.remove(2)       # Lỗi nếu không có
my_set.discard(10)     # Không lỗi nếu không có

# Kiểm tra tồn tại
print(1 in my_set)     # True

# Xóa tất cả
# my_set.clear()</code></pre>

        <h2>3. Phép toán tập hợp</h2>
        <pre><code class="language-python">set_a = {1, 2, 3}
set_b = {3, 4, 5}

# Hợp (Union) |
print(set_a | set_b)           # {1, 2, 3, 4, 5}

# Giao (Intersection) &
print(set_a & set_b)           # {3}

# Hiệu (Difference) -
print(set_a - set_b)           # {1, 2}

# Đối xứng (Symmetric) ^
print(set_a ^ set_b)           # {1, 2, 4, 5}</code></pre>

        <h2>4. So sánh Tuple và Set</h2>
        <table>
            <tr><th>Đặc điểm</th><th>Tuple</th><th>Set</th></tr>
            <tr><td>Có thứ tự?</td><td>✅ Có</td><td>❌ Không</td></tr>
            <tr><td>Truy cập index?</td><td>✅ Có</td><td>❌ Không</td></tr>
            <tr><td>Phần tử trùng?</td><td>✅ Cho phép</td><td>❌ Không</td></tr>
            <tr><td>Thay đổi được?</td><td>❌ Không</td><td>✅ Có</td></tr>
        </table>

        <h2>5. frozenset — Set bất biến 🚀</h2>
        <p><code>frozenset</code> là phiên bản <strong>immutable</strong> của Set — không thể thêm/xóa phần tử sau khi tạo.</p>
        <pre><code class="language-python"># Tạo frozenset
fs = frozenset([1, 2, 3, 4, 5])
print(fs)   # frozenset({1, 2, 3, 4, 5})

# ❌ Không thể thay đổi
# fs.add(6)      → AttributeError
# fs.remove(1)   → AttributeError

# ✅ Vẫn dùng được phép toán tập hợp
fs2 = frozenset([4, 5, 6, 7])
print(fs | fs2)    # frozenset({1, 2, 3, 4, 5, 6, 7})
print(fs & fs2)    # frozenset({4, 5})

# Ứng dụng: frozenset làm key trong dict (set thường không được)
permissions = {
    frozenset(["read"]): "Viewer",
    frozenset(["read", "write"]): "Editor",
    frozenset(["read", "write", "admin"]): "Admin"
}
user_perms = frozenset(["read", "write"])
print(f"Role: {permissions[user_perms]}")   # Editor</code></pre>

        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ Khi nào dùng frozenset?</div>
            • Khi cần dùng set làm <strong>key</strong> trong dictionary<br>
            • Khi cần set làm <strong>phần tử</strong> của set khác<br>
            • Khi muốn đảm bảo dữ liệu <strong>không bị thay đổi</strong> (an toàn hơn)
        </div>

        <h2>6. Set Comprehension 🚀</h2>
        <p>Tương tự list comprehension nhưng tạo ra <strong>set</strong> (tự loại trùng).</p>
        <pre><code class="language-python"># Cú pháp: {biểu_thức for biến in iterable}

# Tạo set bình phương
squares = {x**2 for x in range(-5, 6)}
print(squares)   # {0, 1, 4, 9, 16, 25}  ← tự loại trùng!

# Set comprehension với điều kiện
even_squares = {x**2 for x in range(1, 11) if x % 2 == 0}
print(even_squares)   # {4, 16, 36, 64, 100}

# Lọc ký tự unique từ chuỗi
text = "programming"
vowels = {c for c in text if c in "aeiou"}
print(vowels)   # {'o', 'a', 'i'}</code></pre>

        <h2>7. Ứng dụng thực tế của Set 🚀</h2>
        <h3>7.1 Kiểm tra tập con, tập cha</h3>
        <pre><code class="language-python">A = {1, 2, 3, 4, 5}
B = {2, 3}
C = {6, 7}

# issubset — B có phải tập con của A?
print(B.issubset(A))       # True  (B ⊆ A)
print(B <= A)              # True  (cú pháp ngắn)

# issuperset — A có phải tập cha của B?
print(A.issuperset(B))     # True  (A ⊇ B)
print(A >= B)              # True

# isdisjoint — 2 tập có rời nhau? (không có phần tử chung)
print(A.isdisjoint(C))     # True  (A ∩ C = ∅)
print(A.isdisjoint(B))     # False (có {2, 3} chung)</code></pre>

        <h3>7.2 Loại bỏ trùng lặp giữ thứ tự</h3>
        <pre><code class="language-python"># set() loại trùng nhưng MẤT thứ tự
# Cách giữ thứ tự: dùng dict.fromkeys() (Python 3.7+)

data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]

# Cách 1: dict.fromkeys (giữ thứ tự)
unique_ordered = list(dict.fromkeys(data))
print(unique_ordered)   # [3, 1, 4, 5, 9, 2, 6]

# Cách 2: Dùng set + vòng lặp
seen = set()
result = []
for x in data:
    if x not in seen:
        seen.add(x)
        result.append(x)
print(result)   # [3, 1, 4, 5, 9, 2, 6]</code></pre>

        <div class="note-box note-box--tip">
            <div class="note-title">💡 Hiệu suất tra cứu</div>
            Kiểm tra <code>x in set</code> có độ phức tạp <strong>O(1)</strong>, nhanh hơn rất nhiều so với <code>x in list</code> là <strong>O(n)</strong>. Khi cần kiểm tra nhiều lần, hãy chuyển list thành set!
        </div>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Tuple cơ bản",
            content: "Thực hành tạo và truy cập Tuple.",
            code: `# Thông tin cố định → dùng Tuple
colors = ("Đỏ", "Xanh", "Vàng", "Tím", "Cam")

print(f"Tổng: {len(colors)} màu")
print(f"Đầu tiên: {colors[0]}")
print(f"Cuối cùng: {colors[-1]}")
print(f"Giữa: {colors[1:4]}")

# Unpacking tuple
r, g, b = (255, 128, 0)
print(f"\\nRGB: ({r}, {g}, {b})")

# Đếm và tìm
nums = (1, 2, 3, 2, 4, 2)
print(f"\\nSố 2 xuất hiện: {nums.count(2)} lần")
print(f"Vị trí số 3: index {nums.index(3)}")`,
            explanation: "Tuple thích hợp cho dữ liệu cố định. count() đếm, index() tìm vị trí."
        },
        {
            title: "Bài tập 02 - Set: Loại bỏ trùng lặp",
            content: "Dùng Set để loại bỏ phần tử trùng.",
            code: `ds = [1, 2, 3, 2, 4, 3, 5, 1, 6, 5]
print("Danh sách gốc:", ds)

# Loại bỏ trùng lặp
ds_unique = list(set(ds))
print("Sau loại trùng:", sorted(ds_unique))
print(f"Giảm từ {len(ds)} → {len(ds_unique)} phần tử")`,
            explanation: "set() tự loại trùng. list(set(ds)) chuyển lại thành list. sorted() sắp xếp."
        },
        {
            title: "Bài tập 03 - Phép toán tập hợp",
            content: "Tìm học sinh chung 2 môn học.",
            code: `python = {"An", "Bình", "Cúc", "Dũng", "Em"}
java = {"Cúc", "Fang", "An", "Giang"}

print("Học Python:", python)
print("Học Java:", java)

# Giao — học cả 2
chung = python & java
print(f"\\nHọc cả 2: {chung}")

# Hợp — tất cả
tat_ca = python | java
print(f"Tất cả: {tat_ca}")

# Chỉ Python
chi_python = python - java
print(f"Chỉ Python: {chi_python}")

# Chỉ 1 trong 2
rieng = python ^ java
print(f"Chỉ 1 môn: {rieng}")`,
            explanation: "& giao, | hợp, - hiệu, ^ đối xứng. Set rất mạnh cho bài toán tập hợp."
        },
        {
            title: "Bài tập 04 - Giao/Hợp/Hiệu 2 danh sách 🚀",
            content: "Nhập 2 danh sách số, tìm giao, hợp, hiệu và sử dụng set comprehension.",
            code: `# Hai danh sách có trùng lặp
list1 = [1, 2, 3, 4, 5, 3, 2]
list2 = [4, 5, 6, 7, 8, 5, 6]

set1 = set(list1)
set2 = set(list2)

print(f"List 1 (unique): {sorted(set1)}")
print(f"List 2 (unique): {sorted(set2)}")

# Phép toán tập hợp
print(f"\\n🔗 Giao (chung):     {sorted(set1 & set2)}")
print(f"📦 Hợp (tất cả):    {sorted(set1 | set2)}")
print(f"➖ Chỉ trong L1:    {sorted(set1 - set2)}")
print(f"➖ Chỉ trong L2:    {sorted(set2 - set1)}")
print(f"🔀 Đối xứng (riêng): {sorted(set1 ^ set2)}")

# === Set Comprehension ===
print("\\n--- Set Comprehension ---")
# Bình phương những số chung
common_squares = {x**2 for x in set1 & set2}
print(f"Bình phương số chung: {common_squares}")

# Tìm số chẵn từ hợp
even_union = {x for x in set1 | set2 if x % 2 == 0}
print(f"Số chẵn từ hợp: {sorted(even_union)}")

# === Kiểm tra subset / superset ===
print("\\n--- Subset / Superset ---")
small = {4, 5}
print(f"{small} ⊆ set1? {small <= set1}")
print(f"{small} ⊆ set2? {small <= set2}")
print(f"set1 ∩ set2 = ∅? {set1.isdisjoint(set2)}")`,
            explanation: "Set tự loại trùng từ list. Phép & | - ^ giải quyết bài toán tập hợp. Set comprehension tạo set mới. <= kiểm tra tập con."
        },
        {
            title: "Bài tập 05 - Loại bỏ trùng lặp giữ thứ tự 🚀",
            content: "So sánh các cách loại bỏ phần tử trùng lặp: set (mất thứ tự) vs dict.fromkeys (giữ thứ tự). Ứng dụng frozenset.",
            code: `# === 1. So sánh 3 cách loại trùng ===
data = ["Python", "Java", "Python", "C++", "Java", "Go", "Python"]
print(f"Gốc ({len(data)} phần tử): {data}")

# Cách 1: set() — mất thứ tự
way1 = list(set(data))
print(f"\\nCách 1 (set):        {way1}")

# Cách 2: dict.fromkeys — giữ thứ tự
way2 = list(dict.fromkeys(data))
print(f"Cách 2 (fromkeys):   {way2}")

# Cách 3: set + loop — giữ thứ tự
seen = set()
way3 = []
for item in data:
    if item not in seen:
        seen.add(item)
        way3.append(item)
print(f"Cách 3 (set+loop):   {way3}")

# === 2. frozenset ===
print("\\n--- frozenset ---")
# Dùng frozenset làm key dict
menu = {
    frozenset(["Cơm", "Canh"]): 35000,
    frozenset(["Phở"]): 45000,
    frozenset(["Cơm", "Canh", "Thịt"]): 55000,
}

order = frozenset(["Cơm", "Canh"])
print(f"Đơn hàng: {set(order)}")
print(f"Giá: {menu[order]:,}đ")

# frozenset trong set (set of sets)
groups = {
    frozenset(["An", "Bình"]),
    frozenset(["Cường", "Dũng"]),
    frozenset(["An", "Bình"]),   # Trùng → bị loại
}
print(f"\\nSố nhóm unique: {len(groups)}")  # 2`,
            explanation: "dict.fromkeys() giữ thứ tự khi loại trùng. frozenset là set immutable — dùng làm dict key hoặc phần tử của set khác."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 10: Tuple & Set)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Đặc điểm nào đúng về Tuple?
   A. Có thể thay đổi phần tử
   B. Không thể thay đổi sau khi tạo (immutable)
   C. Không có thứ tự
   D. Loại bỏ trùng lặp tự động

2. Cách tạo Tuple 1 phần tử đúng là:
   A. t = (5)
   B. t = (5,)
   C. t = [5]
   D. t = {5}

3. Set trong Python có đặc điểm gì?
   A. Có thứ tự và cho phép trùng lặp
   B. Không có thứ tự, không cho phép trùng lặp
   C. Có thứ tự, không cho phép trùng lặp
   D. Không có thứ tự, cho phép trùng lặp

4. Kết quả {1,2,3} | {3,4,5} là:
   A. {3}
   B. {1,2,3,4,5}
   C. {1,2,4,5}
   D. {1,2,3}

5. Kết quả {1,2,3} & {3,4,5} là:
   A. {3}
   B. {1,2,3,4,5}
   C. {1,2,4,5}
   D. {}

6. Phương thức remove() của Set lỗi khi phần tử không tồn tại, dùng gì thay thế?
   A. delete()
   B. discard()
   C. pop()
   D. clear()

7. Khi nào nên dùng Tuple thay vì List?
   A. Khi cần thay đổi dữ liệu
   B. Khi dữ liệu cố định, không thay đổi
   C. Khi cần sắp xếp
   D. Khi cần thêm phần tử`,
            code: `# ĐÁP ÁN:
# 1. B (immutable — không thể thay đổi)
# 2. B ((5,) — cần dấu phẩy cho tuple 1 phần tử)
# 3. B (Không thứ tự, không trùng lặp)
# 4. B ({1,2,3,4,5} — phép hợp union)
# 5. A ({3} — phép giao intersection)
# 6. B (discard() — không lỗi nếu không có)
# 7. B (Dữ liệu cố định — tuple an toàn hơn)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. Tuple bất biến, Set không trùng lặp + phép toán tập hợp."
        },
        {
            title: "📝 Câu hỏi ôn tập nâng cao - Set Operations 🚀",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. frozenset khác set ở điểm nào?
   A. frozenset nhanh hơn
   B. frozenset là immutable (không thể thay đổi)
   C. frozenset cho phép trùng lặp
   D. frozenset có thứ tự

2. Kết quả của {x**2 for x in [-2, -1, 0, 1, 2]} là gì?
   A. {4, 1, 0, 1, 4}
   B. {0, 1, 4}
   C. [0, 1, 4]
   D. {-4, -1, 0, 1, 4}

3. Kiểm tra "x in set" có độ phức tạp bao nhiêu?
   A. O(n)
   B. O(log n)
   C. O(1)
   D. O(n²)`,
            code: `# ĐÁP ÁN:
# 1. B (frozenset là immutable — không add/remove được)
# 2. B ({0, 1, 4} — set tự loại trùng: (-2)²=4, (-1)²=1, trùng với 2² và 1²)
# 3. C (O(1) — set dùng hash table, tra cứu nhanh)`,
            explanation: "Nguồn: Giáo trình Python Nâng Cao. frozenset dùng làm dict key. Set comprehension tự loại trùng. Set tra cứu O(1) nhờ hash."
        }
    ]
};
