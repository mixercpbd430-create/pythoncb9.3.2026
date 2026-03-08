// Chương 18: Xử lý ngoại lệ (Exception Handling)
const chapter18 = {
    id: 18,
    title: "Xử lý ngoại lệ (Exception Handling)",
    description: "try/except/else/finally, raise, custom exception, context manager (with), contextlib.",
    theory: `
        <h2>1. Ngoại lệ là gì?</h2>
        <p>Ngoại lệ xảy ra khi lỗi xuất hiện lúc chạy chương trình (chia cho 0, file không tồn tại...). Python cung cấp <code>try-except</code> để chương trình không bị dừng đột ngột.</p>

        <h2>2. Hai loại lỗi</h2>
        <ul>
            <li><strong>Lỗi cú pháp (Syntax Error):</strong> Sai cú pháp → Python báo lỗi ngay khi biên dịch.</li>
            <li><strong>Lỗi thực thi (Runtime Error):</strong> Xảy ra khi đang chạy (chia cho 0, truy cập ngoài phạm vi...).</li>
        </ul>

        <h2>3. Cú pháp try-except</h2>
        <pre><code class="language-python">try:
    x = 10 / 0
except ZeroDivisionError as e:
    print(f"Lỗi: {e}")     # Lỗi: division by zero</code></pre>

        <h2>4. Bắt nhiều loại lỗi</h2>
        <pre><code class="language-python">try:
    value = int(input("Nhập số: "))
    result = 10 / value
except ZeroDivisionError:
    print("Lỗi: Không thể chia cho 0!")
except ValueError:
    print("Lỗi: Nhập số hợp lệ!")
except Exception as e:
    print(f"Lỗi không xác định: {e}")</code></pre>

        <h2>5. else và finally</h2>
        <pre><code class="language-python">try:
    x = 5 / 1
except ZeroDivisionError:
    print("Lỗi chia cho 0!")
else:
    print("Không có lỗi xảy ra.")      # Chạy khi KHÔNG lỗi
finally:
    print("Luôn luôn thực hiện.")       # LUÔN chạy</code></pre>

        <h2>6. Bắt tất cả ngoại lệ</h2>
        <pre><code class="language-python">try:
    x = 10 / 0
except Exception as e:
    print(f"Có lỗi: {e}")</code></pre>

        <h2>7. Tự tạo ngoại lệ (raise)</h2>
        <pre><code class="language-python">def check_positive(value):
    if value < 0:
        raise ValueError("Giá trị phải là số dương!")
    return value

try:
    check_positive(-5)
except ValueError as e:
    print(f"Lỗi: {e}")</code></pre>

        <h2>8. Bảng ngoại lệ thông dụng</h2>
        <table>
            <tr><th>Ngoại lệ</th><th>Mô tả</th></tr>
            <tr><td><code>ZeroDivisionError</code></td><td>Chia cho 0</td></tr>
            <tr><td><code>ValueError</code></td><td>Giá trị không hợp lệ</td></tr>
            <tr><td><code>TypeError</code></td><td>Sai kiểu dữ liệu</td></tr>
            <tr><td><code>IndexError</code></td><td>Chỉ mục ngoài phạm vi</td></tr>
            <tr><td><code>KeyError</code></td><td>Key không tồn tại trong dict</td></tr>
            <tr><td><code>FileNotFoundError</code></td><td>File không tồn tại</td></tr>
            <tr><td><code>PermissionError</code></td><td>Không có quyền truy cập</td></tr>
        </table>

        <h2>9. Custom Exception (Ngoại lệ tùy chỉnh) 🔥</h2>
        <p>Bạn có thể tạo <strong>lớp ngoại lệ riêng</strong> bằng cách kế thừa từ <code>Exception</code>. Giúp code rõ ràng và dễ debug hơn.</p>

        <h3>Cú pháp cơ bản:</h3>
        <pre><code class="language-python"># Tạo custom exception
class MyError(Exception):
    pass

# Sử dụng
raise MyError("Đây là lỗi tùy chỉnh!")</code></pre>

        <h3>Custom exception với thuộc tính:</h3>
        <pre><code class="language-python">class ValidationError(Exception):
    """Lỗi khi dữ liệu không hợp lệ"""
    def __init__(self, field, value, message="Dữ liệu không hợp lệ"):
        self.field = field
        self.value = value
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f"{self.message}: {self.field}='{self.value}'"

# Sử dụng
try:
    age = -5
    if age < 0:
        raise ValidationError("tuổi", age, "Tuổi phải >= 0")
except ValidationError as e:
    print(f"❌ {e}")           # ❌ Tuổi phải >= 0: tuổi='-5'
    print(f"   Field: {e.field}")
    print(f"   Value: {e.value}")</code></pre>

        <h3>Hệ thống phân cấp exception:</h3>
        <pre><code class="language-python"># Tạo hệ thống phân cấp
class AppError(Exception):
    """Base exception cho ứng dụng"""
    pass

class DatabaseError(AppError):
    """Lỗi liên quan database"""
    pass

class AuthError(AppError):
    """Lỗi xác thực"""
    pass

class PermissionDenied(AuthError):
    """Không có quyền"""
    pass

class LoginFailed(AuthError):
    """Đăng nhập thất bại"""
    pass

# Bắt theo nhóm
try:
    raise LoginFailed("Sai mật khẩu!")
except AuthError as e:
    # Bắt được cả LoginFailed và PermissionDenied
    print(f"Lỗi xác thực: {e}")</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #3b82f6;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>📌 Khi nào tạo Custom Exception?</strong>
            <ul>
                <li>Khi cần phân biệt rõ <strong>loại lỗi của ứng dụng</strong></li>
                <li>Khi muốn truyền thêm <strong>thông tin chi tiết</strong> về lỗi</li>
                <li>Khi xây dựng <strong>thư viện/framework</strong> cho người khác dùng</li>
                <li>Tên class nên kết thúc bằng <code>Error</code> hoặc <code>Exception</code></li>
            </ul>
        </div>

        <h2>10. Context Manager (with statement) 🎯</h2>
        <p><strong>Context Manager</strong> quản lý tài nguyên tự động: mở → sử dụng → <em>tự đóng</em>. Dùng lệnh <code>with</code>.</p>

        <h3>Ví dụ quen thuộc — đọc file:</h3>
        <pre><code class="language-python"># KHÔNG dùng with — phải tự đóng file
f = open("data.txt", "r")
try:
    content = f.read()
finally:
    f.close()    # Phải nhớ đóng!

# DÙNG with — tự động đóng file!
with open("data.txt", "r") as f:
    content = f.read()
# File tự đóng khi ra khỏi with, dù có lỗi hay không!</code></pre>

        <h3>Tự tạo Context Manager bằng class:</h3>
        <p>Cần implement 2 phương thức: <code>__enter__</code> và <code>__exit__</code></p>
        <pre><code class="language-python">class Timer:
    """Đo thời gian thực thi"""
    def __enter__(self):
        import time
        self.start = time.time()
        print("⏱️ Bắt đầu đo thời gian...")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        elapsed = time.time() - self.start
        print(f"⏱️ Hoàn thành trong {elapsed:.4f} giây")
        return False  # Không nuốt exception

# Sử dụng
with Timer():
    total = sum(range(1000000))
    print(f"Tổng: {total}")
# ⏱️ Bắt đầu đo thời gian...
# Tổng: 499999500000
# ⏱️ Hoàn thành trong 0.0312 giây</code></pre>

        <h3>Context Manager xử lý lỗi:</h3>
        <pre><code class="language-python">class SafeOperation:
    """Bắt và log lỗi tự động"""
    def __init__(self, operation_name):
        self.name = operation_name

    def __enter__(self):
        print(f"▶️ Bắt đầu: {self.name}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            print(f"❌ Lỗi trong '{self.name}': {exc_val}")
            return True  # True = nuốt exception, không crash
        print(f"✅ Hoàn thành: {self.name}")
        return False

with SafeOperation("Tính toán"):
    result = 10 / 0  # Lỗi nhưng không crash!
print("Chương trình vẫn tiếp tục!")</code></pre>

        <h3>Context Manager bằng contextlib (đơn giản hơn):</h3>
        <pre><code class="language-python">from contextlib import contextmanager

@contextmanager
def open_database(db_name):
    print(f"🔗 Kết nối database: {db_name}")
    db = {"name": db_name, "connected": True}
    try:
        yield db  # Trả về tài nguyên
    finally:
        print(f"🔌 Đóng kết nối: {db_name}")
        db["connected"] = False

# Sử dụng
with open_database("myapp.db") as db:
    print(f"Đang dùng: {db['name']}")
    # Làm việc với database...
# Tự động đóng kết nối!</code></pre>

        <p>So sánh hai cách tạo Context Manager:</p>
        <table>
            <tr><th>Tiêu chí</th><th>Class (__enter__/__exit__)</th><th>contextlib (@contextmanager)</th></tr>
            <tr><td>Độ phức tạp</td><td>Cần 2 methods</td><td>Chỉ 1 function + yield</td></tr>
            <tr><td>Phù hợp</td><td>Logic phức tạp, tái sử dụng</td><td>Logic đơn giản, nhanh gọn</td></tr>
            <tr><td>State management</td><td>Dùng self attributes</td><td>Dùng biến local</td></tr>
            <tr><td>Ví dụ thực tế</td><td>Database connection pool</td><td>Temporary file, lock</td></tr>
        </table>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #f59e0b;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>💡 Context Manager phổ biến trong Python:</strong>
            <ul>
                <li><code>open()</code> — đọc/ghi file tự động đóng</li>
                <li><code>threading.Lock()</code> — lock/unlock tự động</li>
                <li><code>sqlite3.connect()</code> — kết nối database</li>
                <li><code>tempfile.TemporaryFile()</code> — file tạm tự xóa</li>
                <li><code>decimal.localcontext()</code> — thay đổi precision tạm thời</li>
            </ul>
        </div>
    `,
    exercises: [
        {
            title: "Bài tập 01 - try-except cơ bản",
            content: "Xử lý lỗi chia cho 0 và nhập sai kiểu.",
            code: `while True:
    try:
        a = float(input("Nhập a: "))
        b = float(input("Nhập b: "))
        kq = a / b
        print(f"{a} / {b} = {kq:.2f}")
        break
    except ZeroDivisionError:
        print("❌ Không thể chia cho 0! Nhập lại.")
    except ValueError:
        print("❌ Vui lòng nhập số! Nhập lại.")`,
            explanation: "try-except trong while True cho phép nhập lại khi lỗi. break thoát khi thành công."
        },
        {
            title: "Bài tập 02 - else và finally",
            content: "Sử dụng đầy đủ try/except/else/finally.",
            code: `def doc_file(ten_file):
    try:
        with open(ten_file, "r") as f:
            noi_dung = f.read()
    except FileNotFoundError:
        print(f"❌ File '{ten_file}' không tồn tại!")
    except PermissionError:
        print(f"❌ Không có quyền đọc file!")
    else:
        print(f"✅ Đọc thành công ({len(noi_dung)} ký tự)")
        return noi_dung
    finally:
        print("📁 Kết thúc thao tác file.")

doc_file("test.txt")`,
            explanation: "else: chạy khi không lỗi. finally: LUÔN chạy (dọn dẹp tài nguyên)."
        },
        {
            title: "Bài tập 03 - Quản lý tài khoản ngân hàng",
            content: "OOP + Exception Handling thực tế.",
            code: `class TaiKhoan:
    def __init__(self, ten, so_du=0):
        self.ten = ten
        self.so_du = so_du

    def gui_tien(self, tien):
        if tien <= 0:
            raise ValueError("Số tiền phải > 0!")
        self.so_du += tien
        print(f"✅ Gửi {tien:,}đ. Số dư: {self.so_du:,}đ")

    def rut_tien(self, tien):
        if tien <= 0:
            raise ValueError("Số tiền phải > 0!")
        if tien > self.so_du:
            raise ValueError("Không đủ số dư!")
        self.so_du -= tien
        print(f"✅ Rút {tien:,}đ. Số dư: {self.so_du:,}đ")

tk = TaiKhoan("An", 1000000)

try:
    tk.gui_tien(500000)
    tk.rut_tien(200000)
    tk.rut_tien(5000000)  # Lỗi!
except ValueError as e:
    print(f"❌ Lỗi: {e}")`,
            explanation: "raise ValueError tạo lỗi khi dữ liệu không hợp lệ. try-except bắt lỗi bên ngoài."
        },
        {
            title: "Bài tập 04 - Custom Exception 🔥",
            content: "Tạo hệ thống ngoại lệ riêng cho ứng dụng quản lý sinh viên.",
            code: `# === Định nghĩa Custom Exceptions ===
class StudentError(Exception):
    """Base exception cho quản lý sinh viên"""
    pass

class InvalidScoreError(StudentError):
    """Điểm không hợp lệ"""
    def __init__(self, score, subject=""):
        self.score = score
        self.subject = subject
        super().__init__(f"Điểm {score} không hợp lệ (0-10)")

    def __str__(self):
        msg = f"❌ Điểm '{self.score}' không hợp lệ"
        if self.subject:
            msg += f" (môn {self.subject})"
        msg += ". Điểm phải từ 0 đến 10."
        return msg

class DuplicateStudentError(StudentError):
    """Sinh viên đã tồn tại"""
    def __init__(self, mssv):
        self.mssv = mssv
        super().__init__(f"MSSV {mssv} đã tồn tại")

class StudentNotFoundError(StudentError):
    """Không tìm thấy sinh viên"""
    def __init__(self, mssv):
        self.mssv = mssv
        super().__init__(f"Không tìm thấy MSSV {mssv}")

# === Lớp quản lý sinh viên ===
class QuanLySV:
    def __init__(self):
        self.students = {}

    def them_sv(self, mssv, ten, diem):
        if mssv in self.students:
            raise DuplicateStudentError(mssv)
        if not (0 <= diem <= 10):
            raise InvalidScoreError(diem)
        self.students[mssv] = {"ten": ten, "diem": diem}
        print(f"✅ Thêm: {ten} ({mssv}), điểm: {diem}")

    def tim_sv(self, mssv):
        if mssv not in self.students:
            raise StudentNotFoundError(mssv)
        return self.students[mssv]

    def cap_nhat_diem(self, mssv, mon, diem):
        sv = self.tim_sv(mssv)  # Có thể raise StudentNotFoundError
        if not (0 <= diem <= 10):
            raise InvalidScoreError(diem, mon)
        sv["diem"] = diem
        print(f"✅ Cập nhật {sv['ten']}: {mon} = {diem}")

# === Test ===
ql = QuanLySV()

tests = [
    lambda: ql.them_sv("SV001", "Nguyễn An", 8.5),
    lambda: ql.them_sv("SV002", "Trần Bình", 7.0),
    lambda: ql.them_sv("SV001", "Lê Chi", 9.0),       # Trùng!
    lambda: ql.them_sv("SV003", "Võ Dũng", 15),        # Điểm sai!
    lambda: ql.tim_sv("SV999"),                          # Không tìm thấy!
    lambda: ql.cap_nhat_diem("SV001", "Python", -2),    # Điểm âm!
]

for test in tests:
    try:
        test()
    except InvalidScoreError as e:
        print(e)
    except DuplicateStudentError as e:
        print(f"⚠️ {e}")
    except StudentNotFoundError as e:
        print(f"🔍 {e}")
    except StudentError as e:
        print(f"❓ Lỗi SV: {e}")`,
            explanation: "Custom exception giúp phân loại lỗi rõ ràng. Kế thừa từ base exception để bắt theo nhóm."
        },
        {
            title: "Bài tập 05 - Context Manager cơ bản 🎯",
            content: "Tự tạo context manager bằng class và contextlib.",
            code: `import time
from contextlib import contextmanager

# === 1. Timer Context Manager (class) ===
class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, *args):
        self.elapsed = time.time() - self.start
        print(f"⏱️ Thời gian: {self.elapsed:.4f}s")
        return False

with Timer() as t:
    total = sum(i**2 for i in range(100000))
    print(f"Tổng bình phương: {total}")

# === 2. File Logger (class) ===
class FileLogger:
    def __init__(self, filename):
        self.filename = filename
        self.logs = []

    def __enter__(self):
        self.logs.append(f"[START] Mở log: {self.filename}")
        print(f"📝 Bắt đầu ghi log → {self.filename}")
        return self

    def log(self, message):
        entry = f"[{time.strftime('%H:%M:%S')}] {message}"
        self.logs.append(entry)
        print(f"  📌 {entry}")

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.logs.append(f"[ERROR] {exc_val}")
        self.logs.append(f"[END] Đóng log")
        # Ghi ra file (giả lập bằng print)
        print(f"💾 Đã lưu {len(self.logs)} dòng log")
        for line in self.logs:
            print(f"    {line}")
        return False

with FileLogger("app.log") as logger:
    logger.log("Khởi động ứng dụng")
    logger.log("Kết nối database")
    logger.log("Xử lý 100 bản ghi")

# === 3. contextlib — đơn giản hơn ===
@contextmanager
def change_directory(new_dir):
    """Giả lập chuyển thư mục tạm thời"""
    old_dir = "/home/user"
    print(f"📂 Chuyển từ {old_dir} → {new_dir}")
    try:
        yield new_dir
    finally:
        print(f"📂 Quay về {old_dir}")

with change_directory("/tmp/data") as d:
    print(f"   Đang ở: {d}")
    print(f"   Xử lý file...")

# === 4. Suppress errors ===
@contextmanager
def suppress(*exceptions):
    """Bỏ qua các exception chỉ định"""
    try:
        yield
    except exceptions as e:
        print(f"⚡ Bỏ qua lỗi: {type(e).__name__}: {e}")

with suppress(ZeroDivisionError, ValueError):
    x = 10 / 0  # Không crash!
print("✅ Chương trình tiếp tục!")`,
            explanation: "__enter__ chạy khi vào with, __exit__ chạy khi ra. contextlib.contextmanager dùng yield đơn giản hơn."
        },
        {
            title: "Bài tập 06 - Context Manager thực tế 🔧",
            content: "Áp dụng context manager cho database connection, transaction và resource pool.",
            code: `from contextlib import contextmanager

# === 1. Database Connection Manager ===
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connected = False
        self.data = {}

    def __enter__(self):
        self.connected = True
        print(f"🔗 Kết nối → {self.db_name}")
        return self

    def query(self, sql):
        if not self.connected:
            raise RuntimeError("Chưa kết nối database!")
        print(f"  📊 Query: {sql}")
        return [{"id": 1, "name": "An"}, {"id": 2, "name": "Bình"}]

    def insert(self, table, **data):
        if not self.connected:
            raise RuntimeError("Chưa kết nối database!")
        print(f"  ➕ Insert vào {table}: {data}")

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connected = False
        if exc_type:
            print(f"  ❌ Lỗi: {exc_val}")
            print(f"  🔄 Rollback thay đổi...")
        else:
            print(f"  ✅ Commit thay đổi")
        print(f"🔌 Đóng kết nối → {self.db_name}")
        return False

# Sử dụng
with DatabaseConnection("students.db") as db:
    results = db.query("SELECT * FROM students")
    db.insert("students", name="Chi", score=9.0)
    print(f"  📋 Kết quả: {results}")

# === 2. Transaction Context Manager ===
@contextmanager
def transaction(name=""):
    """Quản lý transaction: commit nếu OK, rollback nếu lỗi"""
    print(f"\\n🔒 BEGIN TRANSACTION {name}")
    changes = []
    try:
        yield changes
        print(f"✅ COMMIT {name} ({len(changes)} thay đổi)")
        for c in changes:
            print(f"   ✓ {c}")
    except Exception as e:
        print(f"❌ ROLLBACK {name}: {e}")
        changes.clear()
        raise

# Test transaction
with transaction("Cập nhật SV") as tx:
    tx.append("Thêm SV003: Lê Chi")
    tx.append("Cập nhật điểm SV001: 9.5")
    tx.append("Xóa SV002")

# === 3. Nested Context Managers ===
@contextmanager
def acquire_lock(name):
    print(f"🔐 Khóa: {name}")
    try:
        yield name
    finally:
        print(f"🔓 Mở khóa: {name}")

# Nhiều context manager lồng nhau
with acquire_lock("database") as db_lock:
    with acquire_lock("cache") as cache_lock:
        print(f"   Đang giữ: {db_lock}, {cache_lock}")
        print(f"   Thực hiện cập nhật...")`,
            explanation: "Context manager đảm bảo cleanup luôn chạy dù có lỗi. Transaction pattern rất phổ biến trong thực tế."
        },
        {
            title: "📝 Câu hỏi ôn tập - Xử lý ngoại lệ",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Khối lệnh nào dùng để bắt lỗi trong Python?
   A. catch
   B. try-except
   C. error
   D. handle

2. Khối "else" trong try-except chạy khi nào?
   A. Khi có lỗi xảy ra
   B. Luôn luôn chạy
   C. Khi KHÔNG có lỗi xảy ra
   D. Khi chương trình kết thúc

3. Khối "finally" trong try-except có đặc điểm gì?
   A. Chỉ chạy khi có lỗi
   B. Chỉ chạy khi không có lỗi
   C. LUÔN LUÔN chạy dù có lỗi hay không
   D. Không bao giờ chạy

4. Lệnh "raise" dùng để:
   A. Bắt lỗi
   B. Tự tạo (ném) ngoại lệ
   C. Xóa lỗi
   D. In lỗi ra màn hình

5. Khi chia cho 0, Python phát sinh lỗi gì?
   A. ValueError
   B. TypeError
   C. ZeroDivisionError
   D. IndexError

6. Đoạn code sau in ra gì?
   try:
       x = int("abc")
   except ValueError:
       print("A")
   except TypeError:
       print("B")
   A. A
   B. B
   C. AB
   D. Không in gì

7. Ngoại lệ FileNotFoundError xảy ra khi:
   A. File bị hỏng
   B. File không tồn tại
   C. File quá lớn
   D. File bị khóa`,
            code: `# ĐÁP ÁN:
# 1. B (try-except là cú pháp bắt lỗi trong Python)
# 2. C (else chạy khi KHÔNG có lỗi xảy ra trong try)
# 3. C (finally LUÔN LUÔN chạy, thường dùng dọn dẹp tài nguyên)
# 4. B (raise dùng để tự tạo/ném ngoại lệ)
# 5. C (ZeroDivisionError — lỗi chia cho 0)
# 6. A (int("abc") gây ValueError → except ValueError bắt → in "A")
# 7. B (FileNotFoundError — file không tồn tại)`,
            explanation: "Xử lý ngoại lệ giúp chương trình không bị dừng đột ngột. try bắt lỗi, except xử lý, else chạy khi OK, finally luôn chạy."
        },
        {
            title: "📝 Câu hỏi ôn tập - Custom Exception & Context Manager",
            content: `Trả lời các câu hỏi trắc nghiệm nâng cao:

1. Để tạo custom exception, phải kế thừa từ lớp nào?
   A. Object
   B. Exception
   C. Error
   D. BaseException

2. Custom exception nên đặt tên kết thúc bằng gì?
   A. Class
   B. Error hoặc Exception
   C. Type
   D. Custom

3. Context manager dùng lệnh nào?
   A. use
   B. open
   C. with
   D. context

4. Phương thức nào chạy khi VÀO with block?
   A. __init__
   B. __enter__
   C. __start__
   D. __open__

5. Phương thức nào chạy khi RA KHỎI with block?
   A. __del__
   B. __close__
   C. __exit__
   D. __end__

6. __exit__ trả về True thì:
   A. Raise exception mới
   B. Nuốt exception (không crash)
   C. In lỗi ra màn hình
   D. Chạy lại __enter__

7. contextlib.contextmanager dùng keyword nào?
   A. return
   B. yield
   C. await
   D. raise

8. with open("f.txt") as f: — khi xong, file sẽ:
   A. Vẫn mở
   B. Tự động đóng
   C. Bị xóa
   D. Bị khóa

9. Lợi ích chính của context manager là:
   A. Code chạy nhanh hơn
   B. Tự động dọn dẹp tài nguyên dù có lỗi
   C. Tạo biến mới
   D. Import thư viện

10. Đâu là custom exception hợp lệ?
    A. class MyError: pass
    B. class MyError(Exception): pass
    C. def MyError(Exception): pass
    D. MyError = Exception()`,
            code: `# ĐÁP ÁN:
# 1. B (Exception — lớp base cho tất cả ngoại lệ)
# 2. B (Error hoặc Exception — quy ước đặt tên chuẩn)
# 3. C (with — lệnh sử dụng context manager)
# 4. B (__enter__ — chạy khi vào with block)
# 5. C (__exit__ — chạy khi ra khỏi with block)
# 6. B (True = nuốt exception, chương trình tiếp tục)
# 7. B (yield — trả về tài nguyên tạm thời)
# 8. B (Tự động đóng — đó là tính năng context manager)
# 9. B (Tự động dọn dẹp dù có lỗi — cleanup guaranteed)
# 10. B (class MyError(Exception): pass — phải kế thừa Exception)`,
            explanation: "Nguồn: Lập trình Python Nâng Cao. Custom exception + context manager là kỹ thuật quan trọng trong Python chuyên nghiệp."
        }
    ]
};

