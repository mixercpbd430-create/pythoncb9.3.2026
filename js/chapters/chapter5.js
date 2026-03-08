// Chương 5: Ép kiểu dữ liệu trong Python
const chapter5 = {
    id: 5,
    title: "Ép kiểu dữ liệu trong Python",
    description: "Tại sao ép kiểu, int(), float(), str(), bool(), sai lệch số thực, Decimal, kinh nghiệm tài chính.",
    theory: `
        <h2>1. Tại sao phải ép kiểu?</h2>
        <pre><code class="language-python">a = "7"
b = "10"
print(a + b)  # 710 ← nối chuỗi, không phải cộng số!

# Sửa lại:
print(int(a) + int(b))  # 17 ✅</code></pre>

        <h2>2. Các hàm ép kiểu</h2>
        <table>
            <tr><th>Hàm</th><th>Chức năng</th><th>Ví dụ</th></tr>
            <tr><td><code>int()</code></td><td>→ Số nguyên</td><td><code>int("10")</code> → 10</td></tr>
            <tr><td><code>float()</code></td><td>→ Số thực</td><td><code>float("10.5")</code> → 10.5</td></tr>
            <tr><td><code>str()</code></td><td>→ Chuỗi</td><td><code>str(10)</code> → "10"</td></tr>
            <tr><td><code>bool()</code></td><td>→ Boolean</td><td><code>bool(0)</code> → False</td></tr>
        </table>

        <h3>Chuyển đổi thành int</h3>
        <pre><code class="language-python">x = "10"
x_int = int(x)
print(x_int, type(x_int))  # 10 &lt;class 'int'&gt;

# ❌ Lỗi nếu không phải số:
# int("abc")  → ValueError</code></pre>

        <h3>Chuyển đổi thành float</h3>
        <pre><code class="language-python">x = "10.5"
x_float = float(x)
print(x_float, type(x_float))  # 10.5 &lt;class 'float'&gt;</code></pre>

        <h3>Chuyển đổi thành bool</h3>
        <pre><code class="language-python"># Mọi giá trị khác 0 → True, 0 → False
print(bool(1))    # True
print(bool(0))    # False
print(bool(""))   # False (chuỗi rỗng)
print(bool("hi")) # True</code></pre>

        <h2>3. Sai lệch số thực (Floating-point precision)</h2>
        <pre><code class="language-python">a = 0.1
b = 0.2
c = a + b
print(c)         # 0.30000000000000004 ← Sai!
print(c == 0.3)  # False</code></pre>

        <div class="note-box note-box--warning">
            <div class="note-title">⚠️ Tại sao 0.1 + 0.2 ≠ 0.3?</div>
            Máy tính lưu trữ số thực theo chuẩn IEEE 754 dạng nhị phân. Các số như 0.1, 0.2 không thể biểu diễn chính xác → sai lệch nhỏ.
        </div>

        <h2>4. Khắc phục bằng Decimal</h2>
        <pre><code class="language-python">from decimal import Decimal

a = Decimal('0.1')
b = Decimal('0.2')
c = a + b
print(c)         # 0.3 ✅
print(c == Decimal('0.3'))  # True ✅</code></pre>

        <h2>5. Kinh nghiệm lập trình tài chính</h2>
        <div class="note-box note-box--tip">
            <div class="note-title">💡 Khi nào dùng Decimal?</div>
            <strong>Dùng float:</strong> Khoa học, kỹ thuật, đồ họa — sai số nhỏ không ảnh hưởng.<br>
            <strong>Dùng Decimal:</strong> Tài chính, tiền tệ, thuế — cần chính xác tuyệt đối.
        </div>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Ép kiểu cơ bản",
            content: "Thực hành ép kiểu giữa các kiểu dữ liệu.",
            code: `# str → int
tuoi_str = "25"
tuoi = int(tuoi_str)
print(f"Năm sinh: {2025 - tuoi}")

# str → float
diem_str = "8.5"
diem = float(diem_str)
print(f"Điểm: {diem}")

# int → str
so = 100
print("Giá: " + str(so) + "đ")

# Kiểm tra bool
for val in [0, 1, "", "hi", [], [1], None]:
    print(f"bool({str(val):5}) = {bool(val)}")`,
            explanation: "Ép kiểu là chuyển đổi giữa int, float, str, bool. bool() có quy tắc: 0, '', [], None → False."
        },
        {
            title: "Bài tập 02 - Sai lệch số thực",
            content: "Chứng minh sai lệch 0.1 + 0.2 và cách khắc phục.",
            code: `# Chứng minh sai lệch
a = 0.1
b = 0.2
c = a + b
print(f"0.1 + 0.2 = {c}")
print(f"== 0.3? {c == 0.3}")

# Khắc phục bằng Decimal
from decimal import Decimal
a = Decimal('0.1')
b = Decimal('0.2')
c = a + b
print(f"\\nDecimal: 0.1 + 0.2 = {c}")
print(f"== 0.3? {c == Decimal('0.3')}")`,
            explanation: "float có sai lệch do IEEE 754. Decimal('0.1') lưu chính xác từ chuỗi."
        },
        {
            title: "Bài tập 03 - Ứng dụng: Tính tiền",
            content: "Nhập giá và số lượng, tính tổng tiền chính xác.",
            code: `from decimal import Decimal

# Giả lập nhập liệu
gia = Decimal(input("Nhập giá: "))
sl = int(input("Nhập số lượng: "))
thue = Decimal('0.10')  # Thuế 10%

# Tính toán chính xác
tien_hang = gia * sl
tien_thue = tien_hang * thue
tong = tien_hang + tien_thue

print(f"Tiền hàng: {tien_hang:>12}đ")
print(f"Thuế 10%:  {tien_thue:>12}đ")
print(f"Tổng:      {tong:>12}đ")`,
            explanation: "Trong phần mềm tài chính, luôn dùng Decimal để tránh sai 1-2 đồng do float."
        },
        {
            title: "Bài tập 04 - Chuyển đổi hệ cơ số 🚀",
            content: "Thực hành chuyển đổi giữa các hệ cơ số: nhị phân, bát phân, thập lục phân.",
            code: `so = 255

# Chuyển sang các hệ cơ số
print(f"Thập phân: {so}")
print(f"Nhị phân:  {bin(so)}")      # 0b11111111
print(f"Bát phân:  {oct(so)}")      # 0o377
print(f"Thập lục:  {hex(so)}")      # 0xff

# Chuyển ngược lại về thập phân
print(f"\\n0b11111111 = {int('11111111', 2)}")  # 255
print(f"0o377      = {int('377', 8)}")          # 255
print(f"0xff       = {int('ff', 16)}")          # 255

# Ứng dụng: Mã màu RGB
r, g, b = 255, 128, 0
hex_color = f"#{r:02x}{g:02x}{b:02x}"
print(f"\\nRGB({r},{g},{b}) = {hex_color}")  # #ff8000`,
            explanation: "bin(), oct(), hex() chuyển số sang hệ cơ số khác. int(str, base) chuyển ngược lại."
        },
        {
            title: "Bài tập 05 - Mã ASCII & ord/chr 🚀",
            content: "Tìm hiểu mã ASCII và chuyển đổi giữa ký tự và số.",
            code: `# ord() → ký tự thành mã ASCII
print(f"'A' = {ord('A')}")   # 65
print(f"'a' = {ord('a')}")   # 97
print(f"'0' = {ord('0')}")   # 48

# chr() → mã ASCII thành ký tự
print(f"65  = '{chr(65)}'")   # A
print(f"97  = '{chr(97)}'")   # a

# Ứng dụng: In bảng chữ cái
print("\\nBảng chữ cái:")
for i in range(65, 91):  # A-Z
    print(chr(i), end=" ")

# Ứng dụng: Mã hóa Caesar đơn giản
def ma_hoa(text, shift=3):
    result = ""
    for c in text:
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            result += chr((ord(c) - base + shift) % 26 + base)
        else:
            result += c
    return result

msg = "Hello Python"
encoded = ma_hoa(msg)
print(f"\\n\\nGốc:    {msg}")
print(f"Mã hóa: {encoded}")
print(f"Giải:   {ma_hoa(encoded, -3)}")`,
            explanation: "ord() và chr() chuyển đổi ký tự ↔ số ASCII. Mã hóa Caesar dịch ký tự theo bước shift."
        },
        {
            title: "📝 Câu hỏi ôn tập nâng cao - Ép kiểu 🚀",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Kết quả của bin(10) là gì?
   A. "10"
   B. "0b1010"
   C. 1010
   D. Lỗi

2. ord('A') trả về giá trị gì?
   A. "A"
   B. 65
   C. 97
   D. 1

3. chr(97) trả về giá trị gì?
   A. "97"
   B. "A"
   C. "a"
   D. 97

4. int('ff', 16) trả về giá trị gì?
   A. 15
   B. 225
   C. 255
   D. Lỗi`,
            code: `# ĐÁP ÁN:
# 1. B ("0b1010" — bin() trả về chuỗi nhị phân có prefix 0b)
# 2. B (65 — mã ASCII của 'A')
# 3. C ("a" — chr(97) trả về ký tự có mã ASCII 97)
# 4. C (255 — ff trong hệ 16 = 15*16 + 15 = 255)`,
            explanation: "Nguồn: Giáo trình Python Nâng Cao. bin/oct/hex chuyển hệ cơ số, ord/chr xử lý ký tự."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 3: Nhập dữ liệu & Kiểu dữ liệu)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Hàm int() dùng để làm gì?
   A. Chuyển đổi giá trị thành chuỗi
   B. Chuyển đổi giá trị thành số nguyên
   C. Chuyển đổi giá trị thành số thực
   D. Chuyển đổi giá trị thành boolean

2. Kết quả của int("abc") là gì?
   A. 0
   B. None
   C. Lỗi ValueError
   D. "abc"

3. Kết quả của bool(0) là gì?
   A. True
   B. False
   C. 0
   D. None

4. Tại sao 0.1 + 0.2 không bằng 0.3 trong Python?
   A. Python bị lỗi
   B. Do chuẩn IEEE 754 lưu số thực dạng nhị phân không chính xác
   C. Do lỗi hệ điều hành
   D. Do phiên bản Python cũ

5. Để tính toán chính xác với số thực (tiền tệ), nên dùng gì?
   A. float
   B. int
   C. Decimal
   D. str

6. Kết quả của float("10.5") là gì?
   A. "10.5"
   B. 10
   C. 10.5
   D. Lỗi

7. Giá trị nào sau đây khi ép bool() sẽ cho kết quả False?
   A. 1
   B. "hello"
   C. [1, 2]
   D. ""`,
            code: `# ĐÁP ÁN:
# 1. B (Chuyển đổi giá trị thành số nguyên)
# 2. C (Lỗi ValueError — "abc" không phải số)
# 3. B (False — 0 ép bool thành False)
# 4. B (Do chuẩn IEEE 754 — số thực lưu nhị phân không chính xác)
# 5. C (Decimal — chính xác tuyệt đối)
# 6. C (10.5)
# 7. D ("" — chuỗi rỗng ép bool thành False)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. Ép kiểu: int(), float(), str(), bool(). Sai lệch số thực dùng Decimal() để khắc phục."
        }
    ]
};
