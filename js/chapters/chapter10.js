// Chương 10: Vòng lặp - Range
const chapter10 = {
    id: 10,
    title: "Vòng lặp - Range",
    description: "Vòng lặp for, hàm range(), duyệt list, duyệt chuỗi, break/continue/else.",
    theory: `
        <h2>1. Vòng lặp for</h2>
        <p>Dùng để lặp qua một dãy đối tượng: list, chuỗi, range...</p>
        <pre><code class="language-python">for biến in dãy:
    # Khối lệnh thực hiện cho mỗi phần tử</code></pre>

        <h2>2. Hàm range()</h2>
        <p><code>range()</code> tạo ra một dãy số.</p>
        <pre><code class="language-python"># range(n) → 0 đến n-1
for i in range(5):
    print(i)
# 0, 1, 2, 3, 4

# range(start, stop) → start đến stop-1
for i in range(2, 6):
    print(i)
# 2, 3, 4, 5

# range(start, stop, step) → bước nhảy
for i in range(0, 10, 2):
    print(i)
# 0, 2, 4, 6, 8

# Kiểm tra: in toàn bộ range
print(list(range(0, 10, 2)))  # [0, 2, 4, 6, 8]</code></pre>

        <h2>3. Duyệt danh sách</h2>
        <pre><code class="language-python">monhoc = ["C#", "Python", "Java"]
for mh in monhoc:
    print(mh)
# C#
# Python
# Java</code></pre>

        <h2>4. Duyệt chuỗi</h2>
        <pre><code class="language-python">word = "iif"
for letter in word:
    print(letter)
# i
# i
# f</code></pre>

        <h2>5. break — Thoát vòng lặp</h2>
        <pre><code class="language-python">for i in range(10):
    if i == 5:
        break    # Dừng tại i=5
    print(i)
# 0, 1, 2, 3, 4</code></pre>

        <h2>6. continue — Bỏ qua lần lặp</h2>
        <pre><code class="language-python">for i in range(5):
    if i == 3:
        continue  # Bỏ qua i=3
    print(i)
# 0, 1, 2, 4</code></pre>

        <h2>7. for...else</h2>
        <pre><code class="language-python"># else chạy khi vòng lặp hoàn thành KHÔNG bị break
for i in range(5):
    print(i)
else:
    print("Vòng lặp đã hoàn thành")

# Nếu có break → else KHÔNG chạy
for i in range(5):
    if i == 3:
        break
else:
    print("Không in ra vì có break")</code></pre>

        <h2>8. List Comprehension 🚀</h2>
        <p>Cách viết <strong>tắt</strong> để tạo list mới từ một iterable, thay thế vòng lặp for + append thông thường.</p>
        <pre><code class="language-python"># Cú pháp: [biểu_thức for biến in iterable]

# ❌ Cách thông thường
squares = []
for x in range(1, 6):
    squares.append(x ** 2)
print(squares)   # [1, 4, 9, 16, 25]

# ✅ List comprehension — 1 dòng!
squares = [x ** 2 for x in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]</code></pre>

        <h3>8.1 List Comprehension với điều kiện (filter)</h3>
        <pre><code class="language-python"># Cú pháp: [biểu_thức for biến in iterable if điều_kiện]

# Lọc số chẵn
chan = [x for x in range(1, 11) if x % 2 == 0]
print(chan)   # [2, 4, 6, 8, 10]

# Lọc từ dài hơn 4 ký tự
words = ["Python", "is", "fun", "and", "powerful"]
long_words = [w for w in words if len(w) > 4]
print(long_words)   # ['Python', 'powerful']</code></pre>

        <h3>8.2 List Comprehension với if-else</h3>
        <pre><code class="language-python"># Cú pháp: [giá_trị_True if điều_kiện else giá_trị_False for biến in iterable]
# ⚠️ Lưu ý: if-else đặt TRƯỚC for (khác với filter đặt SAU)

labels = ["Chẵn" if x % 2 == 0 else "Lẻ" for x in range(1, 6)]
print(labels)   # ['Lẻ', 'Chẵn', 'Lẻ', 'Chẵn', 'Lẻ']

# Thay giá trị âm bằng 0
nums = [5, -3, 8, -1, 0, 7]
positive = [x if x > 0 else 0 for x in nums]
print(positive)   # [5, 0, 8, 0, 0, 7]</code></pre>

        <div class="note-box note-box--tip">
            <div class="note-title">💡 Khi nào dùng List Comprehension?</div>
            Dùng khi logic <strong>đơn giản</strong> (1-2 điều kiện). Nếu phức tạp, nên dùng vòng lặp for thông thường để code dễ đọc hơn.
        </div>

        <h2>9. enumerate() — Lặp với chỉ số 🚀</h2>
        <p>Thay vì dùng <code>range(len(list))</code>, dùng <code>enumerate()</code> để lấy cả <strong>chỉ số</strong> và <strong>giá trị</strong> cùng lúc.</p>
        <pre><code class="language-python"># ❌ Cách cũ — dùng range(len())
fruits = ["Táo", "Cam", "Xoài", "Nho"]
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# ✅ enumerate() — gọn hơn, Pythonic hơn
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Bắt đầu từ 1 thay vì 0
for stt, fruit in enumerate(fruits, start=1):
    print(f"{stt}. {fruit}")
# 1. Táo
# 2. Cam
# 3. Xoài
# 4. Nho</code></pre>

        <h2>10. zip() — Lặp song song nhiều list 🚀</h2>
        <p><code>zip()</code> ghép các phần tử cùng vị trí từ nhiều iterable lại với nhau.</p>
        <pre><code class="language-python">names = ["An", "Bình", "Cường"]
scores = [8.5, 9.0, 7.5]
ranks = ["Giỏi", "Xuất sắc", "Khá"]

# Lặp song song 3 list
for name, score, rank in zip(names, scores, ranks):
    print(f"{name}: {score} → {rank}")
# An: 8.5 → Giỏi
# Bình: 9.0 → Xuất sắc
# Cường: 7.5 → Khá

# zip dừng ở list ngắn nhất
a = [1, 2, 3]
b = [10, 20]
print(list(zip(a, b)))   # [(1, 10), (2, 20)]</code></pre>

        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ zip + enumerate kết hợp</div>
            <code>for i, (name, score) in enumerate(zip(names, scores), 1):</code><br>
            Kết hợp enumerate và zip để có cả chỉ số lẫn giá trị từ nhiều list.
        </div>

        <h2>11. Nested For nâng cao — Vòng lặp lồng 🚀</h2>
        <pre><code class="language-python"># Nested list comprehension — tạo ma trận
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(matrix)   # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# Duyệt ma trận 2D
for row in matrix:
    for val in row:
        print(f"{val:3}", end="")
    print()
# Output:
#   1  2  3
#   2  4  6
#   3  6  9

# Flatten list 2D → 1D dùng list comprehension
flat = [val for row in matrix for val in row]
print(flat)   # [1, 2, 3, 2, 4, 6, 3, 6, 9]</code></pre>

        <div class="note-box note-box--warning">
            <div class="note-title">⚠️ Thứ tự nested comprehension</div>
            <code>[val for row in matrix for val in row]</code><br>
            Đọc từ <strong>trái sang phải</strong>: for row trước → for val sau. Giống thứ tự vòng lặp lồng thông thường.
        </div>
    `,
    exercises: [
        {
            title: "Bài tập 01 - range() cơ bản",
            content: "In bảng cửu chương dùng range.",
            code: `n = int(input("Nhập số (1-9): "))

print(f"\\nBảng cửu chương {n} ---")
for i in range(1, 11):
    print(f"{n} x {i} = {n*i}")`,
            explanation: "range(1, 11) tạo dãy 1-10. Mỗi vòng lặp i tăng 1."
        },
        {
            title: "Bài tập 02 - Duyệt danh sách & tính tổng",
            content: "Tính tổng và trung bình của một danh sách điểm.",
            code: `diem = [8, 7.5, 9, 6, 8.5]
tong = 0

print("Danh sách điểm:")
for i in range(len(diem)):
    print(f"  Môn {i+1}: {diem[i]}")
    tong += diem[i]

tb = tong / len(diem)
print(f"\\nTổng: {tong}")
print(f"Trung bình: {tb:.1f}")`,
            explanation: "len(diem) = số phần tử. range(len(diem)) duyệt theo chỉ số 0, 1, 2..."
        },
        {
            title: "Bài tập 03 - break & continue",
            content: "Tìm số đầu tiên chia hết cho 7 trong range.",
            code: `# Tìm số đầu tiên chia hết cho 7
print("Tìm số chia hết cho 7 trong 1-100:")
for i in range(1, 101):
    if i % 7 == 0:
        print(f"Tìm thấy: {i}")
        break

print()

# In số lẻ (bỏ qua số chẵn)
print("Số lẻ từ 1-10:")
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i, end=" ")`,
            explanation: "break dừng vòng lặp ngay. continue bỏ qua phần còn lại và nhảy sang lần lặp kế."
        },
        {
            title: "Bài tập 04 - Tam giác sao",
            content: "In tam giác sao bằng vòng lặp lồng nhau.",
            code: `n = 5
# Tam giác vuông
print("Tam giác vuông:")
for i in range(1, n + 1):
    print("* " * i)

print()

# Tam giác cân
print("Tam giác cân:")
for i in range(1, n + 1):
    print(" " * (n - i) + "* " * i)`,
            explanation: "Nhân chuỗi: '* ' * 3 = '* * * '. Khoảng trắng tạo khoảng cách trái."
        },
        {
            title: "Bài tập 05 - Tổng phần tử mảng (PDF Dariu)",
            content: "Tính tổng các phần tử trong mảng bằng vòng lặp for.",
            code: `a = [1, 2, 3, 4, 5]
N = len(a)
Tong = 0
for i in range(0, N):
    Tong = Tong + a[i]
print("Tong cac phan tu trong mang la:", Tong)`,
            explanation: "Nguồn: PDF Dariu Bài 1 Ch5. Khởi tạo Tong = 0, duyệt qua từng phần tử và cộng dồn."
        },
        {
            title: "Bài tập 06 - Đếm chẵn/lẻ trong mảng (PDF Dariu)",
            content: "Đếm số lượng số chẵn và số lẻ trong mảng.",
            code: `a = [1, 2, 3, 4, 5]
N = len(a)
chan = 0
le = 0
for i in range(0, N):
    if a[i] % 2 == 0:
        chan = chan + 1
    else:
        le = le + 1
print("So phan tu chan:", chan)
print("So phan tu le:", le)`,
            explanation: "Nguồn: PDF Dariu Bài 2-3 Ch5. Dùng phép chia dư % 2 để kiểm tra chẵn/lẻ."
        },
        {
            title: "Bài tập 07 - Tìm Max/Min trong mảng (PDF Dariu)",
            content: "Tìm phần tử lớn nhất và nhỏ nhất trong mảng.",
            code: `a = [3, 7, 1, 9, 2, 5]
N = len(a)

# Tìm max
max_val = a[0]
for i in range(1, N):
    if max_val < a[i]:
        max_val = a[i]

# Tìm min
min_val = a[0]
for i in range(1, N):
    if min_val > a[i]:
        min_val = a[i]

print("Phan tu lon nhat:", max_val)
print("Phan tu nho nhat:", min_val)`,
            explanation: "Nguồn: PDF Dariu Bài 4-5 Ch5. Giả định giá trị đầu tiên là max/min, so sánh với phần tử còn lại."
        },
        {
            title: "Bài tập 08 - Bảng cửu chương với List Comprehension 🚀",
            content: "Tạo và in bảng cửu chương từ 2 đến 9 sử dụng list comprehension và nested for.",
            code: `# Tạo bảng cửu chương dùng nested list comprehension
bang_cuu_chuong = {
    n: [f"{n} x {i} = {n*i}" for i in range(1, 11)]
    for n in range(2, 10)
}

# In bảng cửu chương
for so, bang in bang_cuu_chuong.items():
    print(f"\\n{'='*20}")
    print(f"  BẢNG {so}")
    print(f"{'='*20}")
    for dong in bang:
        print(f"  {dong}")

# === enumerate + zip ===
print("\\n\\n📊 So sánh bảng 2 và bảng 5:")
bang2 = [2 * i for i in range(1, 11)]
bang5 = [5 * i for i in range(1, 11)]

for stt, (b2, b5) in enumerate(zip(bang2, bang5), 1):
    print(f"  Lần {stt:2}: 2x{stt}={b2:3}  |  5x{stt}={b5:3}")`,
            explanation: "Dict comprehension tạo bảng cửu chương. enumerate + zip kết hợp duyệt song song với chỉ số."
        },
        {
            title: "Bài tập 09 - Lọc số nguyên tố với List Comprehension 🚀",
            content: "Sử dụng list comprehension và hàm kiểm tra số nguyên tố để lọc các số nguyên tố trong khoảng cho trước.",
            code: `def la_nguyen_to(n):
    """Kiểm tra n có phải số nguyên tố không."""
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# List comprehension lọc số nguyên tố
gioi_han = 50
nguyen_to = [n for n in range(2, gioi_han + 1) if la_nguyen_to(n)]
print(f"Số nguyên tố từ 2 đến {gioi_han}:")
print(nguyen_to)
print(f"Tổng cộng: {len(nguyen_to)} số")

# === enumerate() để đánh số thứ tự ===
print("\\nDanh sách có đánh số:")
for stt, so in enumerate(nguyen_to, 1):
    print(f"  {stt:2}. {so}", end="")
    if stt % 5 == 0:
        print()  # Xuống dòng mỗi 5 số

# === Comprehension với if-else ===
print("\\n\\nSố từ 1-20 (đánh dấu nguyên tố):")
danh_dau = [f"{n}✓" if la_nguyen_to(n) else f"{n}" for n in range(1, 21)]
print(" | ".join(danh_dau))`,
            explanation: "Hàm la_nguyen_to kiểm tra đến √n. List comprehension + if filter lọc số nguyên tố gọn gàng. enumerate() đánh số kết quả."
        },
        {
            title: "Bài tập 10 - Flatten List 2D & Ma trận 🚀",
            content: "Thao tác với ma trận 2D: tạo, duyệt, flatten, và chuyển vị (transpose) sử dụng list comprehension.",
            code: `# === 1. Tạo ma trận bằng list comprehension ===
rows, cols = 3, 4
matrix = [[row * cols + col + 1 for col in range(cols)] for row in range(rows)]

print("Ma trận gốc:")
for row in matrix:
    print("  ", [f"{x:2}" for x in row])
# [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]

# === 2. Flatten 2D → 1D ===
flat = [val for row in matrix for val in row]
print(f"\\nFlatten: {flat}")

# === 3. Lọc số chẵn từ ma trận 2D ===
chan_2d = [val for row in matrix for val in row if val % 2 == 0]
print(f"Số chẵn: {chan_2d}")

# === 4. Chuyển vị ma trận (transpose) ===
transpose = [[matrix[row][col] for row in range(rows)] for col in range(cols)]
print("\\nMa trận chuyển vị:")
for row in transpose:
    print("  ", [f"{x:2}" for x in row])

# === 5. zip() để transpose đơn giản hơn ===
transpose_zip = [list(col) for col in zip(*matrix)]
print("\\nTranspose bằng zip:")
for row in transpose_zip:
    print("  ", row)`,
            explanation: "Nested comprehension: for row trước → for val sau. zip(*matrix) 'unpack' ma trận để transpose. Flatten biến 2D thành 1D."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 5: Mảng 1 chiều & FOR)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Hàm range(5) tạo ra dãy số nào?
   A. 1, 2, 3, 4, 5
   B. 0, 1, 2, 3, 4
   C. 0, 1, 2, 3, 4, 5
   D. 1, 2, 3, 4

2. range(2, 8, 2) tạo ra dãy nào?
   A. 2, 4, 6
   B. 2, 4, 6, 8
   C. 2, 3, 4, 5, 6, 7
   D. 2, 4, 6, 8, 10

3. Lệnh break trong vòng lặp for dùng để:
   A. Bỏ qua lần lặp hiện tại
   B. Thoát khỏi vòng lặp ngay lập tức
   C. Tiếp tục vòng lặp
   D. Kết thúc chương trình

4. Lệnh continue trong vòng lặp dùng để:
   A. Thoát khỏi vòng lặp
   B. Bỏ qua phần còn lại và sang lần lặp kế tiếp
   C. Kết thúc chương trình
   D. Dừng tạm thời

5. Để nhập mảng từ bàn phím, cách phổ biến nhất là:
   A. Dùng while
   B. Dùng for + append
   C. Dùng input trực tiếp
   D. Dùng import array

6. Kết quả of list(range(0, 10, 3)) là:
   A. [0, 3, 6]
   B. [0, 3, 6, 9]
   C. [3, 6, 9]
   D. [0, 3, 6, 9, 12]

7. Phát biểu nào đúng về for...else?
   A. else luôn chạy
   B. else chạy khi vòng lặp bị break
   C. else chạy khi vòng lặp kết thúc bình thường (không break)
   D. else không dùng được với for`,
            code: `# ĐÁP ÁN:
# 1. B (0, 1, 2, 3, 4 — range(5) bắt đầu từ 0)
# 2. A (2, 4, 6 — bước 2, dừng trước 8)
# 3. B (Thoát khỏi vòng lặp ngay lập tức)
# 4. B (Bỏ qua phần còn lại, sang lần lặp kế tiếp)
# 5. B (Dùng for + append — nhập từng phần tử)
# 6. B ([0, 3, 6, 9] — bước 3, dừng trước 10)
# 7. C (else chạy khi không bị break)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. for + range() duyệt dãy số. break thoát, continue bỏ qua."
        },
        {
            title: "📝 Câu hỏi ôn tập nâng cao - List Comprehension & Itertools 🚀",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Kết quả của [x**2 for x in range(4)] là gì?
   A. [1, 4, 9, 16]
   B. [0, 1, 4, 9]
   C. [0, 1, 4, 9, 16]
   D. [1, 2, 3, 4]

2. Đoạn code [x for x in range(10) if x % 3 == 0] cho kết quả:
   A. [3, 6, 9]
   B. [0, 3, 6, 9]
   C. [0, 3, 6, 9, 12]
   D. [1, 3, 6, 9]

3. enumerate(["a", "b", "c"], start=1) cho ra các cặp nào?
   A. (0, "a"), (1, "b"), (2, "c")
   B. (1, "a"), (2, "b"), (3, "c")
   C. ("a", 1), ("b", 2), ("c", 3)
   D. (1, "a"), (1, "b"), (1, "c")

4. zip([1,2,3], [4,5]) dừng ở list nào?
   A. List dài hơn — cho ra [(1,4), (2,5), (3,None)]
   B. List ngắn hơn — cho ra [(1,4), (2,5)]
   C. Báo lỗi vì 2 list khác độ dài
   D. Cho ra [(1,4), (2,5), (3,)]`,
            code: `# ĐÁP ÁN:
# 1. B ([0, 1, 4, 9] — range(4) = 0,1,2,3 → 0²=0, 1²=1, 2²=4, 3²=9)
# 2. B ([0, 3, 6, 9] — 0%3=0 nên 0 cũng được lọc vào)
# 3. B ((1,"a"), (2,"b"), (3,"c") — start=1 bắt đầu đếm từ 1)
# 4. B ([(1,4), (2,5)] — zip dừng ở list ngắn hơn)`,
            explanation: "Nguồn: Giáo trình Python Nâng Cao. List comprehension, enumerate, zip là công cụ Pythonic thay thế vòng lặp truyền thống."
        }
    ]
};
