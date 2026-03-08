// Chương 2: Câu lệnh cơ bản
const chapter2 = {
    id: 2,
    title: "Câu lệnh cơ bản",
    description: "Cú pháp Python, comment, thụt lề (indentation), biến nhanh, kiểu dữ liệu tổng quan.",
    theory: `
        <h2>Cú pháp Python (Python Syntax)</h2>
        <p>Cú pháp Python đề cập đến các quy tắc cấu trúc của ngôn ngữ. Python nổi tiếng với cú pháp đơn giản, dễ đọc.</p>

        <pre><code class="language-python"># Biến và Kiểu dữ liệu — Không cần khai báo kiểu
x = 10          # int
name = "John"   # str
is_valid = True  # bool

# Câu lệnh điều kiện
if x > 0:
    print("x là số dương")

# Vòng lặp
for i in range(5):
    print(i)

# Hàm
def greet(name):
    return "Hello " + name</code></pre>

        <h2>Thụt lề (Indentation)</h2>
        <p>Python sử dụng <strong>thụt lề</strong> thay vì dấu ngoặc nhọn <code>{}</code> để xác định phạm vi khối mã.</p>
        <pre><code class="language-python"># ✅ Đúng — thụt 4 khoảng trắng
if True:
    print("Đây là khối mã trong if")
    print("Cùng cấp thụt lề")

# ❌ Sai — thiếu thụt lề → lỗi IndentationError
# if True:
# print("Lỗi!")</code></pre>

        <div class="note-box note-box--warning">
            <div class="note-title">⚠️ So sánh với C#/Java</div>
            Các ngôn ngữ khác dùng <code>{ }</code> để xác định khối lệnh. Python dùng thụt lề — sai thụt lề = lỗi ngay!
        </div>

        <h2>Comment trong Python</h2>
        <h3>1. Comment dòng đơn</h3>
        <pre><code class="language-python"># Đây là comment dòng đơn
print("Hello!")  # Comment cuối dòng</code></pre>

        <h3>2. Comment nhiều dòng</h3>
        <pre><code class="language-python">'''
Đây là comment nhiều dòng
dùng dấu ba nháy đơn
'''

"""
Hoặc dùng dấu ba nháy kép
cũng được
"""</code></pre>

        <h3>3. Phím tắt Comment</h3>
        <table>
            <tr><th>IDE</th><th>Comment dòng đơn</th><th>Comment nhiều dòng</th></tr>
            <tr><td>VS Code</td><td>Ctrl + /</td><td>Shift + Alt + A</td></tr>
            <tr><td>PyCharm</td><td>Ctrl + /</td><td>Ctrl + Shift + /</td></tr>
            <tr><td>IDLE</td><td>Ctrl + 1</td><td>—</td></tr>
        </table>

        <h2>Tổng quan nhanh cú pháp</h2>
        <pre><code class="language-python"># 1. Biến — không cần khai báo kiểu
x = 10
name = "Python"

# 2. In ra màn hình
print("Chào bạn!")
print(x, name)

# 3. Nhập từ bàn phím
# tuoi = input("Nhập tuổi: ")

# 4. Điều kiện
if x > 5:
    print("Lớn hơn 5")

# 5. Vòng lặp
for i in range(3):
    print(i)

# 6. Hàm
def cong(a, b):
    return a + b</code></pre>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Cú pháp cơ bản",
            content: "Viết chương trình tạo biến và in ra giá trị.",
            code: `# Tạo các biến
ten = "Python"
version = 3
mien_phi = True

# In ra thông tin
print("Ngôn ngữ:", ten)
print("Phiên bản:", version)
print("Miễn phí:", mien_phi)`,
            explanation: "Python tự nhận diện kiểu dữ liệu khi gán giá trị — không cần khai báo kiểu."
        },
        {
            title: "Bài tập 02 - Thụt lề",
            content: "Tìm và sửa lỗi thụt lề trong đoạn code.",
            code: `# Đoạn code đúng (đã sửa)
x = 10
if x > 5:
    print("x lớn hơn 5")   # Thụt 4 space
    print("Đúng rồi!")      # Cùng cấp
print("Kết thúc")           # Ngoài khối if

# Khối lệnh nhiều cấp
for i in range(3):
    if i % 2 == 0:
        print(f"{i} là số chẵn")
    else:
        print(f"{i} là số lẻ")`,
            explanation: "Thụt lề 4 khoảng trắng cho mỗi cấp. Dòng cùng cấp = cùng khối lệnh."
        },
        {
            title: "Bài tập 03 - Comment",
            content: "Viết chương trình có sử dụng comment giải thích.",
            code: `# Chương trình tính BMI
# BMI = cân nặng / (chiều cao ^ 2)

can_nang = 65    # kg
chieu_cao = 1.70  # mét

# Tính BMI
bmi = can_nang / (chieu_cao ** 2)

# Hiển thị kết quả
print(f"Cân nặng: {can_nang} kg")
print(f"Chiều cao: {chieu_cao} m")
print(f"BMI: {bmi:.1f}")

"""
Phân loại BMI:
- Dưới 18.5: Thiếu cân
- 18.5 - 24.9: Bình thường
- 25 - 29.9: Thừa cân
- 30 trở lên: Béo phì
"""`,
            explanation: "Comment giúp giải thích code cho người đọc. Python bỏ qua comment khi chạy."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Cú pháp cơ bản)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Python sử dụng gì để xác định phạm vi khối mã?
   A. Dấu ngoặc nhọn { }
   B. Dấu ngoặc vuông [ ]
   C. Thụt lề (Indentation)
   D. Dấu chấm phẩy ;

2. Comment dòng đơn trong Python bắt đầu bằng ký tự gì?
   A. //
   B. #
   C. /* */
   D. --

3. Comment nhiều dòng trong Python dùng gì?
   A. /* ... */
   B. // ... //
   C. ''' ... ''' hoặc """ ... """
   D. <!-- ... -->

4. Phím tắt comment dòng đơn trong VS Code là gì?
   A. Ctrl + K
   B. Ctrl + /
   C. Ctrl + C
   D. Alt + C

5. Phát biểu nào SAI về cú pháp Python?
   A. Python phân biệt chữ hoa chữ thường
   B. Python dùng thụt lề thay cho dấu ngoặc nhọn
   C. Python bắt buộc phải khai báo kiểu dữ liệu cho biến
   D. Python là ngôn ngữ cấp cao

6. Thụt lề sai trong Python sẽ gây ra lỗi gì?
   A. SyntaxError
   B. IndentationError
   C. NameError
   D. TypeError`,
            code: `# ĐÁP ÁN:
# 1. C (Thụt lề - Indentation)
# 2. B (Dấu #)
# 3. C (''' ... ''' hoặc """ ... """)
# 4. B (Ctrl + /)
# 5. C (Python KHÔNG cần khai báo kiểu - tự nhận diện)
# 6. B (IndentationError)`,
            explanation: "Python dùng thụt lề thay vì { } để xác định khối mã. Comment giúp giải thích code. Python tự nhận diện kiểu dữ liệu."
        }
    ]
};
