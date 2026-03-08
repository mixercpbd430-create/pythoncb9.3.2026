// Chương 16: Functions
const chapter16 = {
    id: 16,
    title: "Functions",
    description: "def, return, *args, **kwargs, lambda, map, filter, decorator — từ cơ bản đến nâng cao.",
    theory: `
        <h2>1. Hàm là gì?</h2>
        <p>Hàm là khối mã thực hiện nhiệm vụ cụ thể, giúp tái sử dụng code.</p>

        <h2>2. Cú pháp tạo hàm</h2>
        <pre><code class="language-python">def ten_ham(tham_so1, tham_so2):
    # Các câu lệnh
    ket_qua = tham_so1 + tham_so2
    return ket_qua</code></pre>

        <h2>3. Ví dụ</h2>
        <pre><code class="language-python"># Hàm tính tổng
def tinh_tong(a, b):
    return a + b

result = tinh_tong(3, 5)
print(result)   # 8

# Hàm kiểm tra chẵn/lẻ
def kiem_tra_chan_le(number):
    if number % 2 == 0:
        return "Chẵn"
    else:
        return "Lẻ"

print(kiem_tra_chan_le(4))   # Chẵn
print(kiem_tra_chan_le(7))   # Lẻ</code></pre>

        <h2>4. Bốn kiểu hàm phổ biến</h2>
        <h3>(1) Không tham số, không trả về</h3>
        <pre><code class="language-python">def say_hello():
    print("Hello, World!")

say_hello()</code></pre>

        <h3>(2) Có tham số, không trả về</h3>
        <pre><code class="language-python">def greet(name):
    print(f"Hello, {name}!")

greet("An")</code></pre>

        <h3>(3) Có tham số, có trả về</h3>
        <pre><code class="language-python">def tinh_tong(a, b):
    return a + b

kq = tinh_tong(3, 5)
print(kq)   # 8</code></pre>

        <h3>(4) Tham số mặc định</h3>
        <pre><code class="language-python">def greet(name="Guest"):
    print(f"Hello, {name}!")

greet("Alice")   # Hello, Alice!
greet()          # Hello, Guest!</code></pre>

        <h2>5. *args và **kwargs</h2>
        <pre><code class="language-python"># *args — nhận nhiều tham số dạng tuple
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4))   # 10

# **kwargs — nhận nhiều tham số dạng dict
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25)</code></pre>

        <h2>6. Hàm có sẵn vs Hàm tự viết</h2>
        <table>
            <tr><th>Tiêu chí</th><th>Hàm tự viết</th><th>Hàm có sẵn</th></tr>
            <tr><td>Định nghĩa</td><td>Người lập trình tạo</td><td>Python cung cấp sẵn</td></tr>
            <tr><td>Sử dụng</td><td>Phải def trước</td><td>Gọi trực tiếp</td></tr>
            <tr><td>Ví dụ</td><td><code>def add(a,b)</code></td><td><code>len(), print(), sum()</code></td></tr>
        </table>

        <h2>7. Lambda (Hàm ẩn danh) 🔥</h2>
        <p><strong>Lambda</strong> là hàm ngắn gọn, không cần đặt tên, viết trên một dòng. Cú pháp:</p>
        <pre><code class="language-python">lambda tham_so: bieu_thuc</code></pre>
        <p>So sánh hàm thường và lambda:</p>
        <pre><code class="language-python"># Hàm thường
def binh_phuong(x):
    return x ** 2

# Lambda tương đương
binh_phuong = lambda x: x ** 2

print(binh_phuong(5))   # 25</code></pre>

        <p>Lambda với nhiều tham số:</p>
        <pre><code class="language-python"># Lambda tính tổng
tong = lambda a, b: a + b
print(tong(3, 7))   # 10

# Lambda tính diện tích hình chữ nhật
dien_tich = lambda dai, rong: dai * rong
print(dien_tich(5, 3))   # 15

# Lambda với điều kiện (ternary)
kiem_tra = lambda x: "Chẵn" if x % 2 == 0 else "Lẻ"
print(kiem_tra(4))   # Chẵn
print(kiem_tra(7))   # Lẻ</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #3b82f6;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>📌 Khi nào dùng lambda?</strong>
            <ul>
                <li>Hàm đơn giản, chỉ 1 biểu thức</li>
                <li>Dùng kết hợp với <code>map()</code>, <code>filter()</code>, <code>sorted()</code></li>
                <li>Không nên dùng lambda cho logic phức tạp</li>
            </ul>
        </div>

        <h2>8. Hàm map() 🗺️</h2>
        <p><strong>map()</strong> áp dụng một hàm lên <em>từng phần tử</em> của iterable (list, tuple...) và trả về map object.</p>
        <pre><code class="language-python">map(function, iterable)</code></pre>

        <p>Ví dụ cơ bản:</p>
        <pre><code class="language-python"># Bình phương tất cả phần tử
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x ** 2, numbers))
print(squares)   # [1, 4, 9, 16, 25]

# Chuyển list string → int
str_nums = ["10", "20", "30", "40"]
int_nums = list(map(int, str_nums))
print(int_nums)   # [10, 20, 30, 40]

# Viết hoa tất cả tên
names = ["an", "bình", "chi", "dũng"]
upper_names = list(map(str.upper, names))
print(upper_names)   # ['AN', 'BÌNH', 'CHI', 'DŨNG']</code></pre>

        <p>map() với nhiều iterable:</p>
        <pre><code class="language-python"># Cộng từng cặp phần tử
a = [1, 2, 3]
b = [10, 20, 30]
tong = list(map(lambda x, y: x + y, a, b))
print(tong)   # [11, 22, 33]</code></pre>

        <h2>9. Hàm filter() 🔍</h2>
        <p><strong>filter()</strong> lọc các phần tử thỏa điều kiện (hàm trả về True).</p>
        <pre><code class="language-python">filter(function, iterable)</code></pre>

        <p>Ví dụ:</p>
        <pre><code class="language-python"># Lọc số chẵn
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
chan = list(filter(lambda x: x % 2 == 0, numbers))
print(chan)   # [2, 4, 6, 8, 10]

# Lọc số dương
data = [-5, 3, -1, 7, -2, 8, 0]
duong = list(filter(lambda x: x > 0, data))
print(duong)   # [3, 7, 8]

# Lọc từ có độ dài > 3
words = ["hi", "hello", "ok", "python", "go", "world"]
long_words = list(filter(lambda w: len(w) > 3, words))
print(long_words)   # ['hello', 'python', 'world']</code></pre>

        <p>So sánh map() vs filter():</p>
        <table>
            <tr><th>Tiêu chí</th><th>map()</th><th>filter()</th></tr>
            <tr><td>Mục đích</td><td>Biến đổi từng phần tử</td><td>Lọc phần tử theo điều kiện</td></tr>
            <tr><td>Kết quả</td><td>List cùng kích thước</td><td>List ≤ kích thước gốc</td></tr>
            <tr><td>Hàm trả về</td><td>Giá trị mới</td><td>True/False</td></tr>
            <tr><td>Ví dụ</td><td><code>map(lambda x: x*2, nums)</code></td><td><code>filter(lambda x: x>0, nums)</code></td></tr>
        </table>

        <h2>10. Decorator 🎀</h2>
        <p><strong>Decorator</strong> là hàm bao bọc (wrap) một hàm khác để <em>mở rộng chức năng</em> mà không thay đổi code gốc. Dùng ký hiệu <code>@</code>.</p>

        <h3>Cú pháp cơ bản:</h3>
        <pre><code class="language-python">def decorator_name(func):
    def wrapper(*args, **kwargs):
        # Code TRƯỚC khi gọi hàm gốc
        result = func(*args, **kwargs)
        # Code SAU khi gọi hàm gốc
        return result
    return wrapper

@decorator_name
def my_function():
    pass</code></pre>

        <h3>Ví dụ 1: Decorator đo thời gian chạy</h3>
        <pre><code class="language-python">import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"⏱️ {func.__name__} chạy trong {end - start:.4f} giây")
        return result
    return wrapper

@timer
def tinh_tong(n):
    return sum(range(n))

tinh_tong(1000000)
# ⏱️ tinh_tong chạy trong 0.0312 giây</code></pre>

        <h3>Ví dụ 2: Decorator log (ghi nhật ký)</h3>
        <pre><code class="language-python">def logger(func):
    def wrapper(*args, **kwargs):
        print(f"📝 Gọi hàm: {func.__name__}")
        print(f"   Args: {args}, Kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"   Kết quả: {result}")
        return result
    return wrapper

@logger
def nhan(a, b):
    return a * b

nhan(3, 5)
# 📝 Gọi hàm: nhan
#    Args: (3, 5), Kwargs: {}
#    Kết quả: 15</code></pre>

        <h3>Ví dụ 3: Decorator kiểm tra quyền truy cập</h3>
        <pre><code class="language-python">def require_admin(func):
    def wrapper(user, *args, **kwargs):
        if user.get("role") != "admin":
            print("⛔ Bạn không có quyền truy cập!")
            return None
        return func(user, *args, **kwargs)
    return wrapper

@require_admin
def xoa_du_lieu(user, table):
    print(f"🗑️ Đã xóa bảng {table}")

admin = {"name": "An", "role": "admin"}
guest = {"name": "Bình", "role": "user"}

xoa_du_lieu(admin, "users")    # 🗑️ Đã xóa bảng users
xoa_du_lieu(guest, "users")    # ⛔ Bạn không có quyền truy cập!</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #f59e0b;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>💡 Decorator phổ biến trong thực tế:</strong>
            <ul>
                <li><code>@staticmethod</code>, <code>@classmethod</code> — trong OOP</li>
                <li><code>@property</code> — biến method thành thuộc tính</li>
                <li><code>@app.route()</code> — trong Flask web framework</li>
                <li><code>@login_required</code> — kiểm tra đăng nhập</li>
            </ul>
        </div>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Các kiểu hàm",
            content: "Viết 4 kiểu hàm khác nhau.",
            code: `# (1) Không tham số, không trả về
def xin_chao():
    print("Xin chào Python! 🐍")

# (2) Có tham số, không trả về
def in_thongtin(ten, tuoi):
    print(f"{ten}, {tuoi} tuổi")

# (3) Có tham số, có trả về
def tinh_bmi(cn, cc):
    return cn / (cc ** 2)

# (4) Tham số mặc định
def chao(ten="Bạn", lang="vi"):
    if lang == "vi":
        print(f"Xin chào, {ten}!")
    else:
        print(f"Hello, {ten}!")

# Gọi hàm
xin_chao()
in_thongtin("An", 20)
bmi = tinh_bmi(65, 1.70)
print(f"BMI: {bmi:.1f}")
chao()
chao("Alice", "en")`,
            explanation: "4 pattern hàm cơ bản. Tham số mặc định cho phép gọi hàm linh hoạt."
        },
        {
            title: "Bài tập 02 - *args tính tổng",
            content: "Hàm nhận số lượng tham số không cố định.",
            code: `def thong_ke(*args):
    print(f"Dữ liệu: {args}")
    print(f"Số phần tử: {len(args)}")
    print(f"Tổng: {sum(args)}")
    print(f"TB: {sum(args)/len(args):.1f}")
    print(f"Max: {max(args)}")
    print(f"Min: {min(args)}")

thong_ke(5, 8, 3, 9, 1, 7)`,
            explanation: "*args nhận tất cả tham số vào tuple. Có thể gọi với bao nhiêu tham số tùy ý."
        },
        {
            title: "Bài tập 03 - Giải phương trình bậc 1",
            content: "Viết hàm giải phương trình ax + b = 0.",
            code: `def giai_pt_bac1(a, b):
    """Giải phương trình ax + b = 0"""
    if a == 0:
        if b == 0:
            return "Vô số nghiệm"
        else:
            return "Vô nghiệm"
    else:
        x = -b / a
        return f"x = {x}"

# Test
print(giai_pt_bac1(2, -6))    # x = 3.0
print(giai_pt_bac1(0, 5))     # Vô nghiệm
print(giai_pt_bac1(0, 0))     # Vô số nghiệm`,
            explanation: "Hàm nhận tham số a, b → trả về chuỗi kết quả. return kết thúc hàm."
        },
        {
            title: "Bài tập 04 - Lambda cơ bản 🔥",
            content: "Sử dụng lambda để tạo hàm ngắn gọn: tính toán, kiểm tra, sắp xếp.",
            code: `# Lambda tính toán cơ bản
binh_phuong = lambda x: x ** 2
lap_phuong = lambda x: x ** 3
tinh_tong = lambda a, b: a + b

print(binh_phuong(5))     # 25
print(lap_phuong(3))      # 27
print(tinh_tong(10, 20))  # 30

# Lambda với điều kiện
xep_loai = lambda diem: "Đạt" if diem >= 5 else "Không đạt"
print(xep_loai(8))    # Đạt
print(xep_loai(3))    # Không đạt

# Lambda để sắp xếp (sorted với key)
students = [
    {"ten": "An", "diem": 8.5},
    {"ten": "Bình", "diem": 7.0},
    {"ten": "Chi", "diem": 9.2},
    {"ten": "Dũng", "diem": 6.5}
]

# Sắp xếp theo điểm giảm dần
top = sorted(students, key=lambda sv: sv["diem"], reverse=True)
for sv in top:
    print(f'{sv["ten"]}: {sv["diem"]}')
# Chi: 9.2
# An: 8.5
# Bình: 7.0
# Dũng: 6.5`,
            explanation: "Lambda thường dùng cho hàm đơn giản 1 dòng. Kết hợp với sorted() rất mạnh để sắp xếp custom."
        },
        {
            title: "Bài tập 05 - map() biến đổi dữ liệu 🗺️",
            content: "Sử dụng map() để biến đổi từng phần tử trong list.",
            code: `# 1. Chuyển nhiệt độ Celsius → Fahrenheit
celsius = [0, 20, 37, 100]
fahrenheit = list(map(lambda c: c * 9/5 + 32, celsius))
print(f"Celsius:    {celsius}")
print(f"Fahrenheit: {fahrenheit}")
# [32.0, 68.0, 98.6, 212.0]

# 2. Tính thuế (10%) cho danh sách giá
gia_goc = [100000, 250000, 500000, 1200000]
gia_sau_thue = list(map(lambda g: int(g * 1.1), gia_goc))
print(f"Giá gốc:      {gia_goc}")
print(f"Sau thuế 10%: {gia_sau_thue}")

# 3. Format tên học sinh
ten_sv = ["nguyễn văn an", "trần thị bình", "lê chi"]
formatted = list(map(lambda t: t.title(), ten_sv))
print(formatted)
# ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Chi']

# 4. map() với hàm tự viết
def tinh_diem_tb(sv):
    tb = sum(sv["diem"]) / len(sv["diem"])
    return {**sv, "tb": round(tb, 1)}

ds_sv = [
    {"ten": "An", "diem": [8, 7, 9]},
    {"ten": "Bình", "diem": [6, 7, 5]},
    {"ten": "Chi", "diem": [9, 10, 8]}
]
ket_qua = list(map(tinh_diem_tb, ds_sv))
for sv in ket_qua:
    print(f'{sv["ten"]}: TB = {sv["tb"]}')`,
            explanation: "map() áp dụng hàm lên từng phần tử. Kết quả là map object, cần list() để chuyển thành list."
        },
        {
            title: "Bài tập 06 - filter() lọc dữ liệu 🔍",
            content: "Sử dụng filter() để lọc phần tử thỏa điều kiện.",
            code: `# 1. Lọc số nguyên tố
def la_so_nguyen_to(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

numbers = list(range(2, 50))
primes = list(filter(la_so_nguyen_to, numbers))
print(f"Số nguyên tố < 50: {primes}")
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

# 2. Lọc sinh viên đạt (điểm >= 5)
students = [
    {"ten": "An", "diem": 8.5},
    {"ten": "Bình", "diem": 4.0},
    {"ten": "Chi", "diem": 9.2},
    {"ten": "Dũng", "diem": 3.5},
    {"ten": "Em", "diem": 6.0}
]
dat = list(filter(lambda sv: sv["diem"] >= 5, students))
rot = list(filter(lambda sv: sv["diem"] < 5, students))
print(f"Đạt: {[sv['ten'] for sv in dat]}")    # ['An', 'Chi', 'Em']
print(f"Rớt: {[sv['ten'] for sv in rot]}")    # ['Bình', 'Dũng']

# 3. Kết hợp filter() + map()
# Lọc số chẵn rồi bình phương
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))
print(f"Số chẵn bình phương: {result}")
# [4, 16, 36, 64, 100]

# 4. Lọc email hợp lệ
emails = ["user@gmail.com", "invalid", "test@yahoo.com", "bad@", "ok@domain.vn"]
valid = list(filter(lambda e: "@" in e and "." in e.split("@")[-1], emails))
print(f"Email hợp lệ: {valid}")`,
            explanation: "filter() chỉ giữ phần tử mà hàm trả về True. Kết hợp filter + map để lọc rồi biến đổi."
        },
        {
            title: "Bài tập 07 - Decorator thực hành 🎀",
            content: "Tự viết decorator: đo thời gian, ghi log, kiểm tra đầu vào.",
            code: `import time

# 1. Decorator đo thời gian
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"⏱️ {func.__name__}: {elapsed:.4f}s")
        return result
    return wrapper

# 2. Decorator đếm số lần gọi
def counter(func):
    count = 0
    def wrapper(*args, **kwargs):
        nonlocal count
        count += 1
        print(f"📊 {func.__name__} đã gọi {count} lần")
        return func(*args, **kwargs)
    return wrapper

# 3. Decorator kiểm tra kiểu dữ liệu
def validate_positive(func):
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                print(f"❌ Lỗi: tham số {arg} phải >= 0")
                return None
        return func(*args, **kwargs)
    return wrapper

# Áp dụng decorator
@timer
@counter
def fibonacci(n):
    """Tính số Fibonacci thứ n"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

@validate_positive
def tinh_can(x):
    return x ** 0.5

# Test
print(f"Fib(30) = {fibonacci(30)}")
print(f"Fib(35) = {fibonacci(35)}")
print(f"√16 = {tinh_can(16)}")
print(f"√(-4) = {tinh_can(-4)}")   # Lỗi!`,
            explanation: "Decorator wrap hàm gốc. Dùng *args, **kwargs để nhận mọi tham số. nonlocal để truy cập biến ngoài."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 9: Hàm)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Từ khóa nào dùng để định nghĩa hàm trong Python?
   A. function
   B. def
   C. func
   D. define

2. Từ khóa return dùng để:
   A. In giá trị ra màn hình
   B. Trả về giá trị và kết thúc hàm
   C. Khai báo biến
   D. Tạo vòng lặp

3. Hàm không có return sẽ trả về giá trị gì?
   A. 0
   B. False
   C. None
   D. ""

4. Câu lệnh pass trong hàm dùng để:
   A. Bỏ qua hàm
   B. Giữ chỗ cho thân hàm rỗng
   C. Trả về giá trị
   D. Xóa hàm

5. Tham số mặc định là gì?
   A. Tham số bắt buộc
   B. Tham số có giá trị sẵn nếu không truyền
   C. Tham số toàn cục
   D. Tham số kiểu số

6. Giai thừa 5! bằng:
   A. 25
   B. 120
   C. 60
   D. 720

7. Đệ quy là gì?
   A. Hàm gọi vòng lặp
   B. Hàm gọi chính nó
   C. Hàm gọi hàm khác
   D. Hàm không có return

8. Biến khai báo bên ngoài hàm gọi là:
   A. Biến cục bộ
   B. Biến toàn cục
   C. Biến tĩnh
   D. Biến tham chiếu

9. Từ khóa global dùng để:
   A. Tạo biến mới
   B. Khai báo biến toàn cục bên trong hàm
   C. Xóa biến
   D. Sao chép biến

10. Dãy Fibonacci là:
   A. 1, 2, 3, 4, 5...
   B. 0, 1, 1, 2, 3, 5, 8...
   C. 1, 3, 5, 7, 9...
   D. 2, 4, 6, 8, 10...`,
            code: `# ĐÁP ÁN:
# 1. B (def)
# 2. B (Trả về giá trị và kết thúc hàm)
# 3. C (None)
# 4. B (Giữ chỗ cho thân hàm rỗng)
# 5. B (Tham số có giá trị sẵn nếu không truyền)
# 6. B (120 = 5×4×3×2×1)
# 7. B (Hàm gọi chính nó)
# 8. B (Biến toàn cục)
# 9. B (Khai báo biến toàn cục bên trong hàm)
# 10. B (0, 1, 1, 2, 3, 5, 8... — mỗi số = tổng 2 số trước)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. def + return, tham số mặc định, đệ quy, global."
        },
        {
            title: "📝 Câu hỏi ôn tập - Lambda, Map, Filter, Decorator",
            content: `Trả lời các câu hỏi trắc nghiệm nâng cao:

1. Lambda function là gì?
   A. Hàm có nhiều dòng code
   B. Hàm ẩn danh, viết trên 1 dòng
   C. Hàm có tên đặc biệt
   D. Hàm chỉ dùng trong class

2. Cú pháp lambda nào đúng?
   A. lambda: x + y
   B. lambda x, y => x + y
   C. lambda x, y: x + y
   D. def lambda(x, y): x + y

3. map(lambda x: x*2, [1,2,3]) cho kết quả:
   A. [1, 2, 3]
   B. [2, 4, 6]
   C. 12
   D. Lỗi

4. filter(lambda x: x > 3, [1,2,3,4,5]) cho kết quả:
   A. [1, 2, 3]
   B. [4, 5]
   C. [3, 4, 5]
   D. True

5. map() trả về kiểu dữ liệu gì?
   A. list
   B. tuple
   C. map object
   D. dict

6. Decorator dùng ký hiệu gì?
   A. #
   B. @
   C. $
   D. &

7. Decorator dùng để:
   A. Xóa hàm
   B. Mở rộng chức năng hàm không sửa code gốc
   C. Tạo class mới
   D. Import thư viện

8. Kết quả: list(map(int, ["1","2","3"]))?
   A. ["1", "2", "3"]
   B. [1, 2, 3]
   C. (1, 2, 3)
   D. Lỗi

9. sorted(data, key=lambda x: x["age"]) sẽ:
   A. Sắp xếp theo tuổi
   B. Lọc theo tuổi
   C. Xóa key "age"
   D. Tạo dict mới

10. Trong decorator, wrapper function cần nhận gì để linh hoạt?
    A. Không cần tham số
    B. Chỉ self
    C. *args, **kwargs
    D. Chỉ func`,
            code: `# ĐÁP ÁN:
# 1. B (Hàm ẩn danh, viết trên 1 dòng)
# 2. C (lambda x, y: x + y)
# 3. B ([2, 4, 6] — nhân đôi từng phần tử)
# 4. B ([4, 5] — chỉ giữ phần tử > 3)
# 5. C (map object — cần list() để chuyển)
# 6. B (@ — ví dụ @decorator_name)
# 7. B (Mở rộng chức năng hàm không sửa code gốc)
# 8. B ([1, 2, 3] — chuyển string → int)
# 9. A (Sắp xếp theo tuổi — key chỉ định tiêu chí)
# 10. C (*args, **kwargs — nhận mọi loại tham số)`,
            explanation: "Nguồn: Lập trình Python Nâng Cao. Lambda, map, filter là functional programming. Decorator là design pattern quan trọng."
        }
    ]
};
