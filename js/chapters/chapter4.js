// Chương 4: Biến và kiểu dữ liệu
const chapter4 = {
        id: 4,
        title: "Biến và kiểu dữ liệu",
        description: "Biến, quy tắc đặt tên, kiểu dữ liệu (int, float, str, bool, list, tuple, dict, set, None), Stack/Heap, type().",
        theory: `
        <h2>1. Biến trong Python là gì?</h2>
        <p>Biến là một vùng nhớ được đặt tên để lưu trữ dữ liệu. Python tự động nhận diện kiểu dữ liệu khi gán giá trị.</p>
        <pre><code class="language-python">x = 10            # int
monhoc = "Python"  # str

print(x)
print(monhoc)</code></pre>

        <h2>2. Quy tắc đặt tên biến</h2>
        <ul>
            <li>Bắt đầu bằng chữ cái hoặc dấu <code>_</code> (ví dụ: <code>x</code>, <code>my_var</code>, <code>_hidden</code>)</li>
            <li>Chứa chữ cái, số, <code>_</code> (ví dụ: <code>var_1</code>, <code>totalAmount</code>)</li>
            <li>Không dùng từ khóa Python: <code>if</code>, <code>else</code>, <code>True</code>, <code>class</code>...</li>
            <li>Phân biệt HOA/thường: <code>myVar</code> ≠ <code>myvar</code> ≠ <code>MYVAR</code></li>
            <li>Không dùng dấu cách: dùng <code>my_variable</code> thay vì <code>my variable</code></li>
        </ul>
        <pre><code class="language-python"># ✅ Hợp lệ
my_var = 10
_hidden_var = "secret"
totalAmount = 500

# ❌ Không hợp lệ
# 1var = 10        # Bắt đầu bằng số
# class = "ABC"    # Từ khóa Python
# my variable = 5  # Có dấu cách</code></pre>

        <h2>3. Kiểu dữ liệu trong Python</h2>
        <h3>3.1 Số nguyên (int) và Số thực (float)</h3>
        <pre><code class="language-python">x = 5       # int
y = -3      # int
z = 3.14    # float

print(x + y)   # 2
print(x / y)   # -1.666...
print(x // y)  # -2 (chia nguyên)
print(x ** 2)  # 25 (lũy thừa)</code></pre>

        <h3>3.2 Chuỗi (str)</h3>
        <pre><code class="language-python">hoten = "Mr Nhật"
monhoc = 'Python'
noi_chuoi = hoten + " - " + monhoc
print(noi_chuoi)</code></pre>

        <h3>3.3 Boolean (bool)</h3>
        <pre><code class="language-python">is_active = True
is_deleted = False
print(type(is_active))  # &lt;class 'bool'&gt;</code></pre>

        <h3>3.4 List, Tuple, Dict, Set, None</h3>
        <pre><code class="language-python"># List — có thể thay đổi
numbers = [1, 2, 3, 4, 5]

# Tuple — không thể thay đổi
so = (10, 20)

# Dict — cặp key-value
thongtin = {"Ten": "Nhật", "NamKN": 12}

# Set — không trùng lặp
my_set = {1, 2, 3}

# None — không có giá trị
a = None</code></pre>

        <h2>4. Nguyên lý cấp phát bộ nhớ (Stack & Heap)</h2>
        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ Stack vs Heap</div>
            <strong>Stack:</strong> lưu biến và tham chiếu (nhanh, giới hạn kích thước).<br>
            <strong>Heap:</strong> lưu giá trị thực sự của đối tượng (linh hoạt, chậm hơn).
        </div>
        <pre><code class="language-python">a = 10      # Stack: a → [10 trong Heap]
b = a       # Stack: b → [cùng 10 trong Heap]
a = 20      # Stack: a → [20 mới], b vẫn → [10]

print("a =", a)  # 20
print("b =", b)  # 10 (không đổi!)</code></pre>
        <p><strong>Khi gán b = a</strong>: chỉ copy tham chiếu, không copy giá trị. Khi đổi a = 20, Python tạo giá trị mới trong Heap.</p>

        <h2>5. Kiểm tra kiểu dữ liệu</h2>
        <pre><code class="language-python">x = 5
print(type(x))       # &lt;class 'int'&gt;

name = "John"
print(type(name))    # &lt;class 'str'&gt;

is_ok = True
print(type(is_ok))   # &lt;class 'bool'&gt;</code></pre>

        <h2>6. Chuỗi nâng cao (String Operations) 🚀</h2>
        <h3>6.1 String Slicing (Cắt chuỗi)</h3>
        <p>Truy cập từng ký tự hoặc cắt chuỗi con bằng cú pháp <code>str[start:end:step]</code>.</p>
        <pre><code class="language-python">s = "Python Nâng Cao"

print(s[0])       # P (ký tự đầu)
print(s[-1])      # o (ký tự cuối)
print(s[0:6])     # Python (từ vị trí 0 đến 5)
print(s[::2])     # Pto âgCo (bước nhảy 2)
print(s[::-1])    # oaC gnâN nohtyP (đảo chuỗi!)</code></pre>

        <h3>6.2 F-string (Formatted String)</h3>
        <p>Cách hiện đại nhất để chèn biến vào chuỗi (Python 3.6+).</p>
        <pre><code class="language-python">ten = "Nhật"
tuoi = 25
diem = 9.567

print(f"Tên: {ten}, Tuổi: {tuoi}")
print(f"Điểm: {diem:.2f}")           # Làm tròn 2 chữ số
print(f"{'Xin chào':*^20}")          # ***Xin chào****
print(f"2 + 3 = {2 + 3}")            # Tính toán trong f-string</code></pre>

        <h3>6.3 Các phương thức chuỗi thông dụng</h3>
        <table>
            <tr><th>Phương thức</th><th>Mô tả</th><th>Ví dụ</th></tr>
            <tr><td><code>upper()</code></td><td>Chuyển thành HOA</td><td><code>"abc".upper()</code> → "ABC"</td></tr>
            <tr><td><code>lower()</code></td><td>Chuyển thành thường</td><td><code>"ABC".lower()</code> → "abc"</td></tr>
            <tr><td><code>strip()</code></td><td>Xóa khoảng trắng đầu/cuối</td><td><code>" hi ".strip()</code> → "hi"</td></tr>
            <tr><td><code>replace(a, b)</code></td><td>Thay thế a bằng b</td><td><code>"cat".replace("c","b")</code> → "bat"</td></tr>
            <tr><td><code>split(sep)</code></td><td>Tách chuỗi thành list</td><td><code>"a,b,c".split(",")</code> → ['a','b','c']</td></tr>
            <tr><td><code>join(list)</code></td><td>Nối list thành chuỗi</td><td><code>"-".join(["a","b"])</code> → "a-b"</td></tr>
            <tr><td><code>find(sub)</code></td><td>Tìm vị trí chuỗi con</td><td><code>"hello".find("ll")</code> → 2</td></tr>
            <tr><td><code>count(sub)</code></td><td>Đếm số lần xuất hiện</td><td><code>"banana".count("a")</code> → 3</td></tr>
            <tr><td><code>startswith()</code></td><td>Kiểm tra bắt đầu</td><td><code>"Python".startswith("Py")</code> → True</td></tr>
            <tr><td><code>isdigit()</code></td><td>Kiểm tra toàn chữ số</td><td><code>"123".isdigit()</code> → True</td></tr>
        </table>
    `,
        exercises: [
                {
                        title: "Bài tập 01 - Tạo biến và kiểm tra kiểu",
                        content: "Tạo các biến khác kiểu và dùng type() để kiểm tra.",
                        code: `so_nguyen = 42
so_thuc = 3.14
chuoi = "Hello"
logic = True
ds = [1, 2, 3]
bo = (4, 5)
tu_dien = {"a": 1}
tap_hop = {1, 2, 3}
rong = None

for ten, bien in [("int", so_nguyen), ("float", so_thuc),
                   ("str", chuoi), ("bool", logic),
                   ("list", ds), ("tuple", bo),
                   ("dict", tu_dien), ("set", tap_hop),
                   ("None", rong)]:
    print(f"{ten:6} → {type(bien).__name__:6} → {bien}")`,
                        explanation: "type().__name__ lấy tên kiểu ngắn gọn. Python có 9 kiểu dữ liệu cơ bản."
                },
                {
                        title: "Bài tập 02 - Stack & Heap",
                        content: "Chứng minh quy trình cấp phát bộ nhớ.",
                        code: `a = 10
print("a =", a, "| id(a) =", id(a))

b = a
print("b =", b, "| id(b) =", id(b))
print("a và b cùng id?", id(a) == id(b))  # True

a = 20
print("\\nSau khi a = 20:")
print("a =", a, "| id(a) =", id(a))
print("b =", b, "| id(b) =", id(b))
print("a và b cùng id?", id(a) == id(b))  # False`,
                        explanation: "id() trả về địa chỉ bộ nhớ. Sau khi đổi a=20, id(a) thay đổi nhưng id(b) giữ nguyên."
                },
                {
                        title: "Bài tập 03 - Quy tắc đặt tên",
                        content: "Phân biệt tên biến hợp lệ và không hợp lệ.",
                        code: `# Hợp lệ
my_var = 1
_private = 2
camelCase = 3
CONSTANT = 4
var2 = 5

# Kiểm tra từ khóa Python
import keyword
print("Danh sách từ khóa Python:")
print(keyword.kwlist)
print(f"\\nTổng cộng: {len(keyword.kwlist)} từ khóa")

# Kiểm tra 1 từ có phải từ khóa không
print("\\n'class' là từ khóa?", keyword.iskeyword("class"))
print("'myVar' là từ khóa?", keyword.iskeyword("myVar"))`,
                        explanation: "keyword.kwlist liệt kê tất cả từ khóa không được dùng làm tên biến."
                },
                {
                        title: "Bài tập 04 - Đảo chuỗi & Slicing 🚀",
                        content: "Sử dụng slicing để đảo ngược chuỗi và trích xuất chuỗi con.",
                        code: `s = "Lap Trinh Python"

# Đảo ngược toàn bộ chuỗi
print(s[::-1])         # nohtyP hnirT paL

# Lấy 3 ký tự đầu
print(s[:3])           # Lap

# Lấy từ "Python"
print(s[10:])          # Python

# Lấy các ký tự ở vị trí chẵn
print(s[::2])          # LpTihPto

# Kiểm tra palindrome (chuỗi đối xứng)
word = "madam"
print(f"'{word}' là palindrome? {word == word[::-1]}")  # True`,
                        explanation: "s[::-1] đảo chuỗi bằng bước nhảy -1. Cú pháp [start:end:step] rất mạnh để xử lý chuỗi."
                },
                {
                        title: "Bài tập 05 - Xử lý chuỗi với String Methods 🚀",
                        content: "Sử dụng các phương thức chuỗi để xử lý dữ liệu thực tế.",
                        code: `email = "  User@Gmail.COM  "

# 1. Xóa khoảng trắng + chuyển thường
email_clean = email.strip().lower()
print(f"Email chuẩn: {email_clean}")  # user@gmail.com

# 2. Tách tên user và domain
user, domain = email_clean.split("@")
print(f"User: {user}, Domain: {domain}")

# 3. Thay thế domain
new_email = email_clean.replace("gmail.com", "yahoo.com")
print(f"Email mới: {new_email}")

# 4. Đếm nguyên âm trong chuỗi
text = "Hoc Lap Trinh Python That Vui"
nguyen_am = sum(1 for c in text.lower() if c in "aeiou")
print(f"Số nguyên âm: {nguyen_am}")

# 5. Tách và nối chuỗi
words = text.split()
result = " → ".join(words)
print(f"Nối lại: {result}")`,
                        explanation: "strip() + lower() chuẩn hóa dữ liệu. split('@') tách email. sum() + generator đếm ký tự thỏa điều kiện."
                },
                {
                        title: "Bài tập 06 - F-string & Format nâng cao 🚀",
                        content: "Thực hành f-string với các format phức tạp.",
                        code: `# Bảng thông tin học sinh
students = [
    ("Nguyễn Văn An", 8.5, 9.0),
    ("Trần Thị Bình", 7.0, 8.5),
    ("Lê Hoàng Nam", 9.5, 10.0)
]

print(f"{'Họ tên':<20} {'Toán':>6} {'Văn':>6} {'TB':>6}")
print("-" * 40)

for ten, toan, van in students:
    tb = (toan + van) / 2
    print(f"{ten:<20} {toan:>6.1f} {van:>6.1f} {tb:>6.1f}")

# Format số lớn
tien = 1500000
print(f"\\nSố tiền: {tien:,}đ")         # 1,500,000đ
print(f"Nhị phân: {255:08b}")           # 11111111
print(f"Hex: {255:#x}")                 # 0xff`,
                        explanation: "f-string: < căn trái, > căn phải, ^ căn giữa. :, thêm dấu phẩy phân cách. :b nhị phân, :x hex."
                },
                {
                        title: "📝 Câu hỏi ôn tập nâng cao - Chuỗi (String) 🚀",
                        content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Kết quả của "Python"[::-1] là gì?
   A. Python
   B. nohtyP
   C. Pytho
   D. Lỗi cú pháp

2. Phương thức nào dùng để tách chuỗi thành list?
   A. cut()
   B. divide()
   C. split()
   D. separate()

3. Kết quả của "Hello World".replace("World", "Python") là:
   A. Hello World
   B. Hello Python
   C. Python World
   D. Lỗi

4. Kết quả của " abc ".strip() là:
   A. " abc "
   B. "abc "
   C. " abc"
   D. "abc"

5. Cú pháp f-string nào đúng để in số 3.14159 với 2 chữ số thập phân?
   A. f"{3.14159:.2f}"
   B. f"{3.14159:2f}"
   C. f"{3.14159,.2}"
   D. f"{3.14159|.2f}"`,
                        code: `# ĐÁP ÁN:
# 1. B (nohtyP — [::-1] đảo chuỗi)
# 2. C (split() — tách chuỗi thành list)
# 3. B (Hello Python — replace thay thế chuỗi con)
# 4. D ("abc" — strip() xóa khoảng trắng đầu và cuối)
# 5. A (f"{3.14159:.2f}" — :.2f làm tròn 2 chữ số thập phân)`,
                        explanation: "Nguồn: Giáo trình Python Nâng Cao. String slicing, methods, f-string là kỹ năng cốt lõi xử lý chuỗi."
                },
                {
                        title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 3: Biến & Kiểu dữ liệu)",
                        content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Để khai báo biến trong Python, ta cần:
   A. Khai báo kiểu dữ liệu trước tên biến (ví dụ: int x = 5)
   B. Chỉ cần gán giá trị cho biến (ví dụ: x = 5)
   C. Dùng từ khóa var (ví dụ: var x = 5)
   D. Dùng từ khóa let (ví dụ: let x = 5)

2. Tên biến nào sau đây là HỢP LỆ trong Python?
   A. 1abc
   B. my-var
   C. _hidden_var
   D. class

3. Phát biểu nào đúng về kiểu dữ liệu trong Python?
   A. Python yêu cầu khai báo kiểu trước khi dùng
   B. Python tự nhận diện kiểu dữ liệu khi gán giá trị
   C. Python chỉ hỗ trợ kiểu số
   D. Python không phân biệt int và float

4. Hàm type() dùng để làm gì?
   A. Tạo biến mới
   B. Ép kiểu dữ liệu
   C. Kiểm tra kiểu dữ liệu của biến
   D. Xóa biến

5. Kiểu dữ liệu nào KHÔNG thể thay đổi (immutable) trong Python?
   A. List
   B. Dict
   C. Tuple
   D. Set

6. Kết quả của lệnh print(type(3.14)) là gì?
   A. <class 'int'>
   B. <class 'float'>
   C. <class 'str'>
   D. <class 'double'>

7. Khi gán b = a (a = 10), sau đó a = 20, giá trị của b là:
   A. 20
   B. 10
   C. 30
   D. None`,
                        code: `# ĐÁP ÁN:
# 1. B (Chỉ cần gán giá trị — Python tự nhận kiểu)
# 2. C (_hidden_var — bắt đầu bằng "_", hợp lệ)
# 3. B (Python tự nhận diện kiểu dữ liệu)
# 4. C (Kiểm tra kiểu dữ liệu của biến)
# 5. C (Tuple — không thể thay đổi sau khi tạo)
# 6. B (<class 'float'>)
# 7. B (10 — b vẫn trỏ đến 10 trong Heap, a chuyển sang 20)`,
                        explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. Python tự nhận diện kiểu dữ liệu, có cơ chế tham chiếu Stack/Heap."
                }
        ]
};
