// Chương 17: Function - input parameter
const chapter17 = {
    id: 17,
    title: "Function - input parameter",
    description: "Tham số hàm, hàm math, hàm chuỗi, *args, **kwargs, argument unpacking nâng cao.",
    theory: `
        <h2>1. Hai loại hàm trong Python</h2>
        <table>
            <tr><th>Tiêu chí</th><th>Hàm tự viết</th><th>Hàm có sẵn</th></tr>
            <tr><td>Cách sử dụng</td><td>Phải def trước</td><td>Gọi trực tiếp</td></tr>
            <tr><td>Linh hoạt</td><td>Tùy chỉnh hoàn toàn</td><td>Chức năng cố định</td></tr>
            <tr><td>Ví dụ</td><td><code>def add(a,b)</code></td><td><code>len(), print(), max()</code></td></tr>
        </table>

        <h2>2. Hàm toán học (math)</h2>
        <pre><code class="language-python">import math</code></pre>
        <table>
            <tr><th>Hàm</th><th>Chức năng</th><th>Ví dụ</th></tr>
            <tr><td><code>math.fabs(x)</code></td><td>Giá trị tuyệt đối</td><td>fabs(-3.5) → 3.5</td></tr>
            <tr><td><code>math.ceil(x)</code></td><td>Làm tròn lên</td><td>ceil(3.2) → 4</td></tr>
            <tr><td><code>math.floor(x)</code></td><td>Làm tròn xuống</td><td>floor(3.7) → 3</td></tr>
            <tr><td><code>math.sqrt(x)</code></td><td>Căn bậc 2</td><td>sqrt(16) → 4.0</td></tr>
            <tr><td><code>math.pow(x,y)</code></td><td>Lũy thừa</td><td>pow(2,3) → 8.0</td></tr>
            <tr><td><code>math.factorial(x)</code></td><td>Giai thừa</td><td>factorial(5) → 120</td></tr>
            <tr><td><code>math.gcd(x,y)</code></td><td>Ước chung lớn nhất</td><td>gcd(24,36) → 12</td></tr>
            <tr><td><code>math.log(x,b)</code></td><td>Logarithm</td><td>log(8,2) → 3.0</td></tr>
        </table>

        <h2>3. Hàm xử lý chuỗi</h2>
        <table>
            <tr><th>Hàm</th><th>Chức năng</th><th>Ví dụ</th></tr>
            <tr><td><code>len(s)</code></td><td>Độ dài chuỗi</td><td>len("Hello") → 5</td></tr>
            <tr><td><code>s.lower()</code></td><td>Chữ thường</td><td>"HELLO".lower() → "hello"</td></tr>
            <tr><td><code>s.upper()</code></td><td>Chữ hoa</td><td>"hello".upper() → "HELLO"</td></tr>
            <tr><td><code>s.strip()</code></td><td>Xóa khoảng trắng 2 đầu</td><td>" hi ".strip() → "hi"</td></tr>
            <tr><td><code>s.replace()</code></td><td>Thay thế</td><td>"abc".replace("a","x") → "xbc"</td></tr>
            <tr><td><code>s.split()</code></td><td>Tách chuỗi</td><td>"a,b".split(",") → ["a","b"]</td></tr>
            <tr><td><code>s.find()</code></td><td>Tìm vị trí</td><td>"hello".find("ll") → 2</td></tr>
            <tr><td><code>s.count()</code></td><td>Đếm lần xuất hiện</td><td>"aabaa".count("a") → 4</td></tr>
            <tr><td><code>s.startswith()</code></td><td>Bắt đầu bằng</td><td>"Hi".startswith("H") → True</td></tr>
            <tr><td><code>s.endswith()</code></td><td>Kết thúc bằng</td><td>"Hi!".endswith("!") → True</td></tr>
            <tr><td><code>s.isdigit()</code></td><td>Toàn số?</td><td>"123".isdigit() → True</td></tr>
            <tr><td><code>s.isalpha()</code></td><td>Toàn chữ?</td><td>"abc".isalpha() → True</td></tr>
            <tr><td><code>sep.join()</code></td><td>Nối chuỗi</td><td>"-".join(["a","b"]) → "a-b"</td></tr>
        </table>

        <h2>4. Các loại tham số hàm 🔥</h2>
        <p>Python hỗ trợ nhiều cách truyền tham số linh hoạt:</p>
        <table>
            <tr><th>Loại</th><th>Cú pháp</th><th>Mô tả</th></tr>
            <tr><td>Positional</td><td><code>def f(a, b)</code></td><td>Tham số theo vị trí, bắt buộc</td></tr>
            <tr><td>Default</td><td><code>def f(a, b=10)</code></td><td>Có giá trị mặc định</td></tr>
            <tr><td>Keyword</td><td><code>f(b=5, a=3)</code></td><td>Truyền theo tên tham số</td></tr>
            <tr><td>*args</td><td><code>def f(*args)</code></td><td>Nhận nhiều tham số → tuple</td></tr>
            <tr><td>**kwargs</td><td><code>def f(**kwargs)</code></td><td>Nhận nhiều tham số → dict</td></tr>
        </table>

        <h3>Positional vs Keyword arguments:</h3>
        <pre><code class="language-python">def gioi_thieu(ten, tuoi, thanh_pho):
    print(f"{ten}, {tuoi} tuổi, ở {thanh_pho}")

# Positional — theo đúng thứ tự
gioi_thieu("An", 20, "Hà Nội")

# Keyword — theo tên, tùy thứ tự
gioi_thieu(thanh_pho="HCM", ten="Bình", tuoi=22)

# Kết hợp (positional phải trước keyword)
gioi_thieu("Chi", tuoi=19, thanh_pho="Đà Nẵng")</code></pre>

        <h2>5. *args — Tham số vị trí không giới hạn 📦</h2>
        <p><code>*args</code> cho phép hàm nhận <strong>bất kỳ số lượng tham số vị trí</strong> nào. Các tham số được gom vào một <strong>tuple</strong>.</p>
        <pre><code class="language-python"># Cú pháp
def ten_ham(*args):
    # args là một tuple
    for item in args:
        print(item)</code></pre>

        <p>Ví dụ chi tiết:</p>
        <pre><code class="language-python"># Hàm tính tổng bao nhiêu số cũng được
def tinh_tong(*args):
    print(f"Nhận được: {args}")      # Tuple
    print(f"Số lượng: {len(args)}")
    return sum(args)

print(tinh_tong(1, 2))           # 3
print(tinh_tong(1, 2, 3, 4, 5))  # 15
print(tinh_tong(10))             # 10

# *args kết hợp tham số thường
def greet(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet("Xin chào", "An", "Bình", "Chi")
# Xin chào, An!
# Xin chào, Bình!
# Xin chào, Chi!</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #3b82f6;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>📌 Lưu ý về *args:</strong>
            <ul>
                <li><code>args</code> chỉ là tên quy ước, có thể đổi: <code>*numbers</code>, <code>*items</code></li>
                <li>Dấu <code>*</code> mới là quan trọng — nó "gom" tham số thành tuple</li>
                <li>Tham số thường phải đặt <strong>TRƯỚC</strong> *args</li>
            </ul>
        </div>

        <h2>6. **kwargs — Tham số từ khóa không giới hạn 📋</h2>
        <p><code>**kwargs</code> cho phép hàm nhận <strong>bất kỳ số lượng tham số từ khóa</strong> nào. Các tham số được gom vào một <strong>dictionary</strong>.</p>
        <pre><code class="language-python"># Cú pháp
def ten_ham(**kwargs):
    # kwargs là một dict
    for key, value in kwargs.items():
        print(f"{key} = {value}")</code></pre>

        <p>Ví dụ chi tiết:</p>
        <pre><code class="language-python"># In thông tin sinh viên (bất kỳ field nào)
def in_thong_tin(**kwargs):
    print("=" * 30)
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

in_thong_tin(ten="An", tuoi=20, lop="CNTT01")
# ==============================
#   ten: An
#   tuoi: 20
#   lop: CNTT01

in_thong_tin(ten="Bình", email="binh@gmail.com", sdt="0901234567")
# ==============================
#   ten: Bình
#   email: binh@gmail.com
#   sdt: 0901234567</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #3b82f6;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>📌 Lưu ý về **kwargs:</strong>
            <ul>
                <li><code>kwargs</code> chỉ là tên quy ước, có thể đổi: <code>**options</code>, <code>**config</code></li>
                <li>Dấu <code>**</code> "gom" tham số keyword thành dict</li>
                <li>Truy cập giá trị: <code>kwargs["key"]</code> hoặc <code>kwargs.get("key", default)</code></li>
            </ul>
        </div>

        <h2>7. Thứ tự tham số chuẩn ⚡</h2>
        <p>Khi kết hợp tất cả loại tham số, phải tuân thủ thứ tự:</p>
        <pre><code class="language-python">def ham(positional, default=val, *args, **kwargs):
    pass</code></pre>
        <table>
            <tr><th>Thứ tự</th><th>Loại</th><th>Ví dụ</th></tr>
            <tr><td>1️⃣</td><td>Tham số thường</td><td><code>a, b</code></td></tr>
            <tr><td>2️⃣</td><td>Tham số mặc định</td><td><code>c=10</code></td></tr>
            <tr><td>3️⃣</td><td>*args</td><td><code>*args</code></td></tr>
            <tr><td>4️⃣</td><td>**kwargs</td><td><code>**kwargs</code></td></tr>
        </table>

        <pre><code class="language-python"># Ví dụ đầy đủ
def register(name, role="student", *courses, **extras):
    print(f"Tên: {name}")
    print(f"Vai trò: {role}")
    print(f"Môn học: {courses}")
    print(f"Thêm: {extras}")

register("An", "teacher", "Python", "Java",
         email="an@email.com", phone="0901234567")
# Tên: An
# Vai trò: teacher
# Môn học: ('Python', 'Java')
# Thêm: {'email': 'an@email.com', 'phone': '0901234567'}</code></pre>

        <h2>8. Argument Unpacking (Giải nén tham số) 🎁</h2>
        <p>Dùng <code>*</code> và <code>**</code> khi <strong>gọi hàm</strong> để giải nén list/tuple/dict thành tham số:</p>
        <pre><code class="language-python"># * giải nén list/tuple → positional args
def tinh_tong(a, b, c):
    return a + b + c

nums = [10, 20, 30]
print(tinh_tong(*nums))   # 60  (tương đương tinh_tong(10, 20, 30))

# ** giải nén dict → keyword args
info = {"ten": "An", "tuoi": 20, "thanh_pho": "HCM"}
gioi_thieu(**info)   # tương đương gioi_thieu(ten="An", tuoi=20, thanh_pho="HCM")

# Kết hợp
def order(product, quantity=1, **options):
    print(f"Sản phẩm: {product}, SL: {quantity}")
    for k, v in options.items():
        print(f"  {k}: {v}")

config = {"color": "đỏ", "size": "L"}
order("Áo", 2, **config)
# Sản phẩm: Áo, SL: 2
#   color: đỏ
#   size: L</code></pre>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Hàm math",
            content: "Thực hành các hàm toán học.",
            code: `import math

print("=== Hàm Toán Học ===")
print(f"fabs(-5.7) = {math.fabs(-5.7)}")
print(f"ceil(3.2)  = {math.ceil(3.2)}")
print(f"floor(3.7) = {math.floor(3.7)}")
print(f"sqrt(25)   = {math.sqrt(25)}")
print(f"pow(2, 10) = {math.pow(2, 10)}")
print(f"5!         = {math.factorial(5)}")
print(f"GCD(24,36) = {math.gcd(24, 36)}")
print(f"log2(8)    = {math.log(8, 2)}")
print(f"π          = {math.pi:.6f}")
print(f"e          = {math.e:.6f}")`,
            explanation: "Module math chứa hàm toán học nâng cao. math.pi và math.e là hằng số."
        },
        {
            title: "Bài tập 02 - Hàm chuỗi",
            content: "Thực hành tất cả hàm xử lý chuỗi.",
            code: `s = "  Hello, World!  "

print(f"Gốc: '{s}'")
print(f"strip:  '{s.strip()}'")
print(f"lower:  '{s.strip().lower()}'")
print(f"upper:  '{s.strip().upper()}'")
print(f"len:    {len(s.strip())}")

s2 = "apple,orange,banana"
print(f"\\nsplit:  {s2.split(',')}")
print(f"join:   {' | '.join(s2.split(','))}")

s3 = "Hello, Python World!"
print(f"\\nfind 'Python': vị trí {s3.find('Python')}")
print(f"count 'o': {s3.count('o')}")
print(f"replace: {s3.replace('World', 'Việt Nam')}")
print(f"starts 'Hello': {s3.startswith('Hello')}")
print(f"isdigit '123': {'123'.isdigit()}")`,
            explanation: "Hàm chuỗi trả về chuỗi mới (không đổi gốc). Rất quan trọng khi xử lý dữ liệu."
        },
        {
            title: "Bài tập 03 - Ứng dụng thực tế",
            content: "Xử lý email và số điện thoại.",
            code: `def validate_email(email):
    email = email.strip().lower()
    if "@" in email and email.endswith((".com", ".vn", ".org")):
        return f"✅ Email hợp lệ: {email}"
    return f"❌ Email không hợp lệ: {email}"

def format_phone(phone):
    phone = phone.strip().replace(" ", "").replace("-", "")
    if phone.isdigit() and len(phone) == 10:
        return f"✅ SĐT: {phone[:4]}.{phone[4:7]}.{phone[7:]}"
    return f"❌ SĐT không hợp lệ: {phone}"

print(validate_email("  USER@Gmail.COM  "))
print(validate_email("invalid-email"))
print(format_phone("0901 234 567"))
print(format_phone("0901-234-567"))`,
            explanation: "Kết hợp strip, lower, replace, isdigit, endswith để validate dữ liệu thực tế."
        },
        {
            title: "Bài tập 04 - *args thực hành 📦",
            content: "Viết các hàm sử dụng *args để nhận số lượng tham số linh hoạt.",
            code: `# 1. Hàm thống kê linh hoạt
def thong_ke(*args):
    if not args:
        print("Không có dữ liệu!")
        return
    print(f"Dữ liệu: {args}")
    print(f"Số phần tử: {len(args)}")
    print(f"Tổng: {sum(args)}")
    print(f"TB: {sum(args)/len(args):.2f}")
    print(f"Max: {max(args)}")
    print(f"Min: {min(args)}")
    print()

thong_ke(5, 8, 3, 9, 1, 7)
thong_ke(100, 200)

# 2. Hàm nối chuỗi linh hoạt
def noi_chuoi(sep=" ", *parts):
    return sep.join(str(p) for p in parts)

print(noi_chuoi("-", "2025", "03", "06"))  # 2025-03-06
print(noi_chuoi(" | ", "An", "Bình", "Chi"))  # An | Bình | Chi

# 3. Hàm tính giá tiền (có phí ship)
def tinh_tong_gia(ship=0, *prices):
    subtotal = sum(prices)
    total = subtotal + ship
    print(f"Sản phẩm: {prices}")
    print(f"Tạm tính: {subtotal:,}đ")
    print(f"Ship:     {ship:,}đ")
    print(f"Tổng:     {total:,}đ")
    return total

tinh_tong_gia(30000, 150000, 250000, 89000)

# 4. Hàm tìm số chung
def so_chung(*lists):
    """Tìm phần tử xuất hiện trong TẤT CẢ các list"""
    if not lists:
        return set()
    result = set(lists[0])
    for lst in lists[1:]:
        result &= set(lst)
    return result

a = [1, 2, 3, 4, 5]
b = [3, 4, 5, 6, 7]
c = [5, 6, 7, 8, 3]
print(f"\\nSố chung: {so_chung(a, b, c)}")  # {3, 5}`,
            explanation: "*args gom tất cả tham số vị trí vào tuple. Tham số thường phải đặt TRƯỚC *args."
        },
        {
            title: "Bài tập 05 - **kwargs thực hành 📋",
            content: "Viết các hàm sử dụng **kwargs để nhận tham số linh hoạt dạng key=value.",
            code: `# 1. Tạo thẻ sinh viên
def tao_the_sv(**kwargs):
    print("╔══════════════════════════╗")
    print("║     THẺ SINH VIÊN       ║")
    print("╠══════════════════════════╣")
    for key, value in kwargs.items():
        label = key.replace("_", " ").title()
        print(f"║ {label:12}: {str(value):10} ║")
    print("╚══════════════════════════╝")

tao_the_sv(ho_ten="Nguyễn An", mssv="SV001",
           lop="CNTT01", khoa="CNTT")

# 2. Config builder
def create_config(app_name, **settings):
    config = {"app_name": app_name}
    config.update(settings)
    print(f"\\n⚙️ Config cho '{app_name}':")
    for k, v in config.items():
        print(f"  {k}: {v}")
    return config

cfg = create_config("MyApp",
    debug=True,
    port=8080,
    database="postgresql",
    secret_key="abc123"
)

# 3. HTML tag builder
def html_tag(tag, content="", **attrs):
    attr_str = ""
    for key, value in attrs.items():
        key = key.replace("_", "-")  # class_ → class
        attr_str += f' {key}="{value}"'
    return f"<{tag}{attr_str}>{content}</{tag}>"

print("\\n" + html_tag("h1", "Tiêu đề", class_="title", id="main"))
print(html_tag("a", "Click me", href="https://python.org", target="_blank"))
print(html_tag("img", src="photo.jpg", alt="Ảnh", width="300"))

# 4. Hàm filter dict
def filter_data(data, **conditions):
    """Lọc list of dict theo nhiều điều kiện"""
    result = data
    for key, value in conditions.items():
        result = [item for item in result if item.get(key) == value]
    return result

students = [
    {"ten": "An", "lop": "A", "diem": 8},
    {"ten": "Bình", "lop": "B", "diem": 6},
    {"ten": "Chi", "lop": "A", "diem": 9},
    {"ten": "Dũng", "lop": "B", "diem": 7},
]

print("\\nLớp A:", filter_data(students, lop="A"))
print("Lớp B, điểm 7:", filter_data(students, lop="B", diem=7))`,
            explanation: "**kwargs gom tham số keyword thành dict. Rất hữu ích khi xây dựng hàm config, builder pattern."
        },
        {
            title: "Bài tập 06 - Kết hợp *args & **kwargs ⚡",
            content: "Kết hợp tất cả loại tham số trong hàm thực tế.",
            code: `# 1. Hàm log linh hoạt
def log(level, *messages, **metadata):
    icons = {"INFO": "ℹ️", "WARN": "⚠️", "ERROR": "❌", "OK": "✅"}
    icon = icons.get(level, "📝")
    msg = " ".join(str(m) for m in messages)
    print(f"{icon} [{level}] {msg}")
    if metadata:
        for k, v in metadata.items():
            print(f"   {k}: {v}")

log("INFO", "Server started")
log("ERROR", "Connection failed", "timeout",
    host="db.server.com", port=5432)
log("OK", "User", "An", "logged in",
    ip="192.168.1.1", time="10:30")

# 2. Hàm tạo SQL query
def build_query(table, *columns, **where):
    cols = ", ".join(columns) if columns else "*"
    query = f"SELECT {cols} FROM {table}"
    if where:
        conditions = " AND ".join(
            f"{k} = '{v}'" for k, v in where.items()
        )
        query += f" WHERE {conditions}"
    return query + ";"

print("\\n" + build_query("users"))
print(build_query("users", "name", "email"))
print(build_query("users", "name", "email",
                   role="admin", active="true"))

# 3. Unpacking khi gọi hàm
def send_email(to, subject, body, cc=None, bcc=None):
    print(f"\\n📧 To: {to}")
    print(f"   Subject: {subject}")
    print(f"   Body: {body}")
    if cc: print(f"   CC: {cc}")
    if bcc: print(f"   BCC: {bcc}")

# Unpacking từ dict
email_config = {
    "to": "an@email.com",
    "subject": "Thông báo",
    "body": "Bạn có tin nhắn mới!",
    "cc": "binh@email.com"
}
send_email(**email_config)

# Unpacking từ list + dict
args = ["chi@email.com", "Mời họp"]
kwargs = {"body": "Họp lúc 3pm", "bcc": "boss@email.com"}
send_email(*args, **kwargs)`,
            explanation: "Thứ tự: positional → default → *args → **kwargs. Unpacking (*list, **dict) giúp gọi hàm linh hoạt."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 10: Chuỗi)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Phương thức lower() của chuỗi dùng để:
   A. Chuyển sang chữ hoa
   B. Chuyển sang chữ thường
   C. Xóa khoảng trắng
   D. Đếm ký tự

2. "Hello".replace("l", "r") cho kết quả:
   A. "Herlo"
   B. "Herro"
   C. "Hello"
   D. "Herlo"

3. "apple,banana".split(",") cho kết quả:
   A. "apple banana"
   B. ["apple", "banana"]
   C. ("apple", "banana")
   D. {"apple", "banana"}

4. "-".join(["a", "b", "c"]) cho kết quả:
   A. ["a-b-c"]
   B. "a-b-c"
   C. "abc"
   D. "-abc-"

5. Phương thức strip() dùng để:
   A. Xóa tất cả khoảng trắng
   B. Xóa khoảng trắng ở đầu và cuối chuỗi
   C. Thêm khoảng trắng
   D. Đếm khoảng trắng

6. "123".isdigit() cho kết quả:
   A. True
   B. False
   C. 123
   D. "123"

7. math.sqrt(16) cho kết quả:
   A. 4
   B. 4.0
   C. 16
   D. 256`,
            code: `# ĐÁP ÁN:
# 1. B (Chuyển sang chữ thường)
# 2. B ("Herro" — thay TẤT CẢ "l" thành "r")
# 3. B (["apple", "banana"] — split tách thành list)
# 4. B ("a-b-c" — join nối bằng "-")
# 5. B (Xóa khoảng trắng ở đầu và cuối)
# 6. A (True — "123" toàn ký tự số)
# 7. B (4.0 — math.sqrt trả về float)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. Hàm chuỗi trả về chuỗi mới, không thay đổi gốc."
        },
        {
            title: "📝 Câu hỏi ôn tập - *args & **kwargs",
            content: `Trả lời các câu hỏi trắc nghiệm nâng cao:

1. *args trong hàm sẽ gom tham số thành kiểu gì?
   A. list
   B. tuple
   C. dict
   D. set

2. **kwargs trong hàm sẽ gom tham số thành kiểu gì?
   A. list
   B. tuple
   C. dict
   D. set

3. Thứ tự tham số đúng là:
   A. *args, positional, **kwargs
   B. **kwargs, *args, positional
   C. positional, default, *args, **kwargs
   D. positional, *args, default, **kwargs

4. def f(*args): print(args) → f(1,2,3) in ra:
   A. [1, 2, 3]
   B. (1, 2, 3)
   C. {1, 2, 3}
   D. 1 2 3

5. def f(**kw): print(kw) → f(a=1, b=2) in ra:
   A. (a=1, b=2)
   B. [a=1, b=2]
   C. {'a': 1, 'b': 2}
   D. a=1 b=2

6. nums = [1,2,3]. Gọi f(*nums) tương đương:
   A. f([1,2,3])
   B. f(1, 2, 3)
   C. f((1,2,3))
   D. f({1,2,3})

7. d = {"x":1,"y":2}. Gọi f(**d) tương đương:
   A. f(d)
   B. f({"x":1,"y":2})
   C. f(x=1, y=2)
   D. f("x","y")

8. def f(a, *b, **c) → f(1, 2, 3, x=4). Giá trị b là:
   A. (1, 2, 3)
   B. (2, 3)
   C. [2, 3]
   D. (2, 3, 4)

9. *args và **kwargs có thể đổi tên không?
   A. Không, bắt buộc dùng args/kwargs
   B. Có, quan trọng là dấu * và **
   C. Chỉ đổi được args
   D. Chỉ đổi được kwargs

10. Hàm nào khai báo SAI?
    A. def f(a, b=1, *args)
    B. def f(*args, **kwargs)
    C. def f(**kwargs, *args)
    D. def f(a, *args, **kwargs)`,
            code: `# ĐÁP ÁN:
# 1. B (tuple — *args gom thành tuple)
# 2. C (dict — **kwargs gom thành dictionary)
# 3. C (positional → default → *args → **kwargs)
# 4. B ((1, 2, 3) — args là tuple)
# 5. C ({'a': 1, 'b': 2} — kwargs là dict)
# 6. B (f(1, 2, 3) — * giải nén list thành tham số riêng)
# 7. C (f(x=1, y=2) — ** giải nén dict thành keyword args)
# 8. B ((2, 3) — a=1, còn lại vào *b, x=4 vào **c)
# 9. B (Có, dấu * và ** mới quan trọng)
# 10. C (SAI — **kwargs phải sau *args)`,
            explanation: "Nguồn: Lập trình Python Nâng Cao. *args/*kwargs là kỹ thuật quan trọng cho hàm linh hoạt."
        }
    ]
};
