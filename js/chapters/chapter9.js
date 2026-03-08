// Chương 9: Cấu trúc điều kiện
const chapter9 = {
    id: 9,
    title: "Cấu trúc điều kiện",
    description: "Câu lệnh if, if-else, if-elif-else, if lồng nhau, kết hợp logic, ví dụ thực tế.",
    theory: `
        <h2>1. Câu lệnh if đơn giản</h2>
        <pre><code class="language-python">if điều_kiện:
    # Khối lệnh thực thi nếu True</code></pre>
        <p>Ví dụ thực tế: Đi xem phim</p>
        <pre><code class="language-python">ve = "có"
if ve == "có":
    print("Đi xem phim")
print("Về nhà")   # Luôn in dù có vé hay không</code></pre>

        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ Python vs C#/Java</div>
            C#/Java dùng <code>{ }</code> cho khối lệnh. Python dùng <strong>thụt lề</strong> — cùng cấp thụt = cùng khối.
        </div>

        <pre><code class="language-python"># if với True/False trực tiếp
if True:
    print("Hi")    # In ra Hi

if False:
    print("Hi")    # Không in ra gì

# 1==1 là biểu thức so sánh → True
if 1 == 1:
    print("Đúng rồi!")</code></pre>

        <h2>2. if và else</h2>
        <pre><code class="language-python">x = -3
if x > 0:
    print("x là số dương")
else:
    print("x là số không dương")
# Output: x là số không dương</code></pre>

        <h2>3. if...elif...else</h2>
        <pre><code class="language-python">x = 0
if x > 0:
    print("x là số dương")
elif x == 0:
    print("x bằng 0")
else:
    print("x là số âm")
# Output: x bằng 0</code></pre>

        <h2>4. Kết hợp nhiều điều kiện</h2>
        <pre><code class="language-python">x = 5
y = 10
if x > 0 and y > 0:
    print("Cả x và y đều là số dương")
else:
    print("Một trong các giá trị không dương")</code></pre>

        <h2>5. Khối lệnh nhiều dòng</h2>
        <pre><code class="language-python">x = 3
if x > 5:
    print("x lớn hơn 5")
    x = x + 2
    print("Giá trị mới:", x)
elif x == 3:
    print("x bằng 3")
else:
    print("x nhỏ hơn hoặc bằng 5")</code></pre>

        <div class="note-box note-box--warning">
            <div class="note-title">⚠️ Thụt lề quan trọng</div>
            <code>print("Chào")</code> ngang hàng với <code>if</code> → KHÔNG thuộc khối lệnh if.<br>
            Muốn thuộc if → phải thụt vào cùng cấp các lệnh bên trong.
        </div>

        <h2>6. Toán tử điều kiện rút gọn (Ternary Operator) 🚀</h2>
        <p>Python hỗ trợ viết <code>if-else</code> trên 1 dòng — gọi là <strong>conditional expression</strong> hay <strong>ternary operator</strong>.</p>
        <pre><code class="language-python"># Cú pháp: giá_trị_True if điều_kiện else giá_trị_False
x = 10
ket_qua = "Dương" if x > 0 else "Không dương"
print(ket_qua)   # Dương

# So sánh với cách viết truyền thống:
# if x > 0:
#     ket_qua = "Dương"
# else:
#     ket_qua = "Không dương"</code></pre>

        <pre><code class="language-python"># Ternary lồng nhau (nested ternary)
diem = 8.5
xep_loai = "Giỏi" if diem >= 8 else "Khá" if diem >= 6.5 else "TB" if diem >= 5 else "Yếu"
print(f"Điểm {diem} → {xep_loai}")   # Điểm 8.5 → Giỏi</code></pre>

        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ Khi nào dùng Ternary?</div>
            Chỉ dùng khi điều kiện <strong>đơn giản</strong> và biểu thức <strong>ngắn gọn</strong>. Ternary lồng nhiều cấp sẽ khó đọc — nên dùng if-elif-else thông thường.
        </div>

        <h2>7. Tối ưu điều kiện lồng nhau (Nested Conditions) 🚀</h2>
        <p>Thay vì lồng nhiều cấp <code>if</code>, có thể dùng kỹ thuật <strong>guard clause</strong> (return sớm) hoặc kết hợp logic để code dễ đọc hơn.</p>

        <h3>7.1 Guard Clause — Thoát sớm</h3>
        <pre><code class="language-python"># ❌ Lồng sâu — khó đọc
def kiem_tra_dang_ky(tuoi, email, da_xac_nhan):
    if tuoi >= 18:
        if email != "":
            if da_xac_nhan:
                return "Đăng ký thành công ✅"
            else:
                return "Chưa xác nhận email"
        else:
            return "Thiếu email"
    else:
        return "Chưa đủ tuổi"

# ✅ Guard clause — dễ đọc hơn
def kiem_tra_dang_ky(tuoi, email, da_xac_nhan):
    if tuoi < 18:
        return "Chưa đủ tuổi"
    if email == "":
        return "Thiếu email"
    if not da_xac_nhan:
        return "Chưa xác nhận email"
    return "Đăng ký thành công ✅"</code></pre>

        <h3>7.2 Kết hợp điều kiện thay vì lồng</h3>
        <pre><code class="language-python"># ❌ Lồng if
if x > 0:
    if x < 100:
        print("x nằm trong khoảng (0, 100)")

# ✅ Kết hợp and
if 0 < x < 100:   # Python hỗ trợ chained comparison!
    print("x nằm trong khoảng (0, 100)")

# ✅ Toán tử in thay cho nhiều or
day = "Thứ 7"
if day == "Thứ 7" or day == "Chủ nhật":
    print("Cuối tuần!")

# Cách tốt hơn:
if day in ("Thứ 7", "Chủ nhật"):
    print("Cuối tuần!")</code></pre>

        <div class="note-box note-box--tip">
            <div class="note-title">💡 Chained Comparison</div>
            Python cho phép viết <code>a < x < b</code> thay vì <code>a < x and x < b</code>. Cú pháp này giúp code ngắn gọn và dễ đọc hơn.
        </div>

        <h2>8. match-case — Structural Pattern Matching (Python 3.10+) 🚀</h2>
        <p>Từ Python <strong>3.10</strong>, có thêm cú pháp <code>match-case</code> tương tự <code>switch-case</code> trong các ngôn ngữ khác nhưng mạnh mẽ hơn.</p>
        <pre><code class="language-python"># Cú pháp cơ bản
match biến:
    case giá_trị_1:
        # Khối lệnh 1
    case giá_trị_2:
        # Khối lệnh 2
    case _:
        # Default — nếu không khớp case nào</code></pre>

        <pre><code class="language-python"># Ví dụ: Kiểm tra ngày trong tuần
ngay = input("Nhập ngày (T2-CN): ")

match ngay:
    case "T2" | "T3" | "T4" | "T5" | "T6":
        print(f"{ngay}: Ngày đi làm 💼")
    case "T7":
        print("Thứ 7: Nghỉ ngơi 😴")
    case "CN":
        print("Chủ nhật: Nghỉ ngơi 🎉")
    case _:
        print("Ngày không hợp lệ ❌")</code></pre>

        <h3>8.1 Pattern Matching nâng cao</h3>
        <pre><code class="language-python"># Match với tuple
def phan_tich_diem(point):
    match point:
        case (0, 0):
            return "Gốc tọa độ"
        case (x, 0):
            return f"Trên trục X, x = {x}"
        case (0, y):
            return f"Trên trục Y, y = {y}"
        case (x, y):
            return f"Điểm ({x}, {y})"

print(phan_tich_diem((0, 0)))    # Gốc tọa độ
print(phan_tich_diem((5, 0)))    # Trên trục X, x = 5
print(phan_tich_diem((3, 4)))    # Điểm (3, 4)</code></pre>

        <pre><code class="language-python"># Match với guard (điều kiện bổ sung)
def phan_loai_so(n):
    match n:
        case n if n > 0:
            return f"{n} là số dương"
        case 0:
            return "Số không"
        case n if n < 0:
            return f"{n} là số âm"

print(phan_loai_so(5))    # 5 là số dương
print(phan_loai_so(-3))   # -3 là số âm</code></pre>

        <div class="note-box note-box--warning">
            <div class="note-title">⚠️ Yêu cầu phiên bản</div>
            <code>match-case</code> chỉ hoạt động từ <strong>Python 3.10</strong> trở lên. Kiểm tra phiên bản bằng <code>python --version</code>. Nếu dùng Python cũ hơn, hãy dùng <code>if-elif-else</code> thay thế.
        </div>

        <h2>9. Truthy và Falsy values 🚀</h2>
        <p>Trong Python, mọi giá trị đều có thể được đánh giá là <strong>True</strong> hoặc <strong>False</strong> trong ngữ cảnh logic.</p>
        <pre><code class="language-python"># Falsy values — được coi là False:
# False, 0, 0.0, "", [], (), {}, set(), None

# Truthy values — mọi thứ khác:
# True, 1, -5, "hello", [1,2], (1,), {"a": 1}

# Ứng dụng thực tế:
name = input("Nhập tên: ")

# Thay vì: if name != "":
if name:
    print(f"Xin chào, {name}!")
else:
    print("Bạn chưa nhập tên!")

# Kiểm tra list rỗng
items = []
if not items:
    print("Danh sách trống!")

# Dùng or để đặt giá trị mặc định
username = input("Username: ") or "Anonymous"
print(f"Chào {username}")</code></pre>

        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ Short-circuit Evaluation</div>
            Python dùng <strong>đánh giá ngắn mạch</strong>:<br>
            • <code>A and B</code> → nếu A là False, trả về A ngay (không kiểm tra B)<br>
            • <code>A or B</code> → nếu A là True, trả về A ngay (không kiểm tra B)<br>
            Điều này hữu ích khi B có thể gây lỗi: <code>if x != 0 and 10/x > 2</code>
        </div>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Xác định số dương/âm/không",
            content: "Nhập 1 số, xác định nó là dương, âm hay bằng 0.",
            code: `so = float(input("Nhập số: "))

if so > 0:
    print(f"{so} là số dương")
elif so < 0:
    print(f"{so} là số âm")
else:
    print("Số bằng 0")`,
            explanation: "Dùng if-elif-else khi có 3+ trường hợp. Python kiểm tra từ trên xuống."
        },
        {
            title: "Bài tập 02 - Xếp loại học lực",
            content: "Nhập điểm, xếp loại Giỏi/Khá/Trung bình/Yếu.",
            code: `diem = float(input("Nhập điểm (0-10): "))

if diem < 0 or diem > 10:
    print("Điểm không hợp lệ!")
elif diem >= 8:
    print(f"Điểm {diem} - Xếp loại: Giỏi 🏆")
elif diem >= 6.5:
    print(f"Điểm {diem} - Xếp loại: Khá 👍")
elif diem >= 5:
    print(f"Điểm {diem} - Xếp loại: Trung bình")
else:
    print(f"Điểm {diem} - Xếp loại: Yếu ⚠️")`,
            explanation: "Kiểm tra hợp lệ trước, rồi xếp loại theo thứ tự giảm dần."
        },
        {
            title: "Bài tập 03 - Kết hợp logic",
            content: "Kiểm tra năm nhuận.",
            code: `nam = int(input("Nhập năm: "))

# Năm nhuận: chia hết 4 VÀ (không chia hết 100 HOẶC chia hết 400)
if (nam % 4 == 0 and nam % 100 != 0) or (nam % 400 == 0):
    print(f"{nam} là năm nhuận ✅")
else:
    print(f"{nam} không phải năm nhuận ❌")`,
            explanation: "Kết hợp and, or, () để tạo điều kiện phức tạp. Ngoặc () ưu tiên cao nhất."
        },
        {
            title: "Bài tập 04 - Giải phương trình bậc 1",
            content: "Nhập a, b và giải phương trình ax + b = 0.",
            code: `a = float(input("Nhập a: "))
b = float(input("Nhập b: "))

print(f"\\nPhương trình: {a}x + {b} = 0")

if a == 0:
    if b == 0:
        print("Vô số nghiệm")
    else:
        print("Vô nghiệm")
else:
    x = -b / a
    print(f"Nghiệm x = {x}")`,
            explanation: "if lồng nhau kiểm tra trường hợp đặc biệt (a=0). ax+b=0 → x=-b/a."
        },
        {
            title: "Bài tập 05 - Kiểm tra số chẵn/lẻ (PDF Dariu)",
            content: "Nhập 1 số từ bàn phím, in ra kết quả đó là số chẵn hay số lẻ.",
            code: `num = float(input("Nhap mot so: "))
if num % 2 == 0:
    print("So chan")
else:
    print("So le")`,
            explanation: "Nguồn: PDF Dariu Bài 1 Ch4. Dùng phép chia dư (%) để kiểm tra chẵn/lẻ: nếu num % 2 == 0 → chẵn."
        },
        {
            title: "Bài tập 06 - Giải phương trình bậc 2 (PDF Dariu)",
            content: "Nhập a, b, c và giải phương trình ax² + bx + c = 0 (đầy đủ các trường hợp).",
            code: `from math import sqrt

print("Phuong trinh bac hai: ax^2 + bx + c = 0")
a = float(input("a = "))
b = float(input("b = "))
c = float(input("c = "))

if a == 0:
    if b == 0:
        if c == 0:
            print("Phuong trinh vo so nghiem!")
        else:
            print("Phuong trinh vo nghiem!")
    else:
        if c == 0:
            print("Phuong trinh co 1 nghiem x = 0")
        else:
            x = -c / b
            print("Phuong trinh co 1 nghiem x =", x)
else:
    delta = b ** 2 - 4 * a * c
    if delta < 0:
        print("Phuong trinh vo nghiem!")
    elif delta == 0:
        x = -b / (2 * a)
        print("Phuong trinh co 1 nghiem x =", x)
    else:
        print("Phuong trinh co 2 nghiem phan biet!")
        x1 = float((-b - sqrt(delta)) / (2 * a))
        x2 = float((-b + sqrt(delta)) / (2 * a))
        print("x1 =", x1)
        print("x2 =", x2)`,
            explanation: "Nguồn: PDF Dariu Bài 4 Ch4. Dùng from math import sqrt để tính căn. Delta = b²-4ac quyết định số nghiệm."
        },
        {
            title: "Bài tập 07 - Máy tính đơn giản với match-case 🚀",
            content: "Viết chương trình máy tính đơn giản sử dụng match-case (Python 3.10+). Nhập 2 số và phép toán, trả về kết quả.",
            code: `# Yêu cầu Python 3.10+
a = float(input("Nhập số thứ nhất: "))
phep = input("Nhập phép toán (+, -, *, /, //, %, **): ")
b = float(input("Nhập số thứ hai: "))

print(f"\\nPhép tính: {a} {phep} {b}")

match phep:
    case "+":
        print(f"Kết quả: {a + b}")
    case "-":
        print(f"Kết quả: {a - b}")
    case "*":
        print(f"Kết quả: {a * b}")
    case "/":
        if b != 0:
            print(f"Kết quả: {a / b:.4f}")
        else:
            print("Lỗi: Không thể chia cho 0! ❌")
    case "//":
        if b != 0:
            print(f"Kết quả: {a // b}")
        else:
            print("Lỗi: Không thể chia cho 0! ❌")
    case "%":
        if b != 0:
            print(f"Kết quả: {a % b}")
        else:
            print("Lỗi: Không thể chia cho 0! ❌")
    case "**":
        print(f"Kết quả: {a ** b}")
    case _:
        print(f"Phép toán '{phep}' không hợp lệ! ❌")`,
            explanation: "match-case (Python 3.10+) giúp code rõ ràng hơn if-elif khi có nhiều nhánh. Dấu _ là wildcard (default). Luôn kiểm tra chia cho 0."
        },
        {
            title: "Bài tập 08 - Xếp loại học lực nâng cao (Ternary + Guard Clause) 🚀",
            content: "Nhập điểm Toán, Văn, Anh — tính trung bình, xếp loại chi tiết. Sử dụng ternary operator và kỹ thuật guard clause.",
            code: `def xep_loai_hoc_luc(toan, van, anh):
    """Xếp loại học lực dựa trên 3 môn."""
    # Guard clause — kiểm tra hợp lệ trước
    if not all(0 <= d <= 10 for d in [toan, van, anh]):
        return "Điểm không hợp lệ (phải từ 0 đến 10)! ❌"

    tb = (toan + van + anh) / 3
    
    # Kiểm tra môn yếu
    mon_yeu = [m for m, d in [("Toán", toan), ("Văn", van), ("Anh", anh)] if d < 5]
    
    # Ternary operator xếp loại
    xep_loai = (
        "Xuất sắc 🌟" if tb >= 9 else
        "Giỏi 🏆" if tb >= 8 else
        "Khá 👍" if tb >= 6.5 else
        "Trung bình 📚" if tb >= 5 else
        "Yếu ⚠️"
    )
    
    # Cảnh báo môn yếu
    canh_bao = f" (Cần cải thiện: {', '.join(mon_yeu)})" if mon_yeu else ""
    
    return f"TB: {tb:.2f} → {xep_loai}{canh_bao}"

# Input
toan = float(input("Điểm Toán: "))
van = float(input("Điểm Văn: "))
anh = float(input("Điểm Anh: "))

print(f"\\n📊 Kết quả: {xep_loai_hoc_luc(toan, van, anh)}")`,
            explanation: "Guard clause kiểm tra lỗi trước rồi return sớm. Ternary lồng dùng cho xếp loại ngắn gọn. List comprehension lọc môn yếu."
        },
        {
            title: "Bài tập 09 - Ternary Operator và Truthy/Falsy 🚀",
            content: "Thực hành sử dụng ternary operator, truthy/falsy values và short-circuit evaluation.",
            code: `# === 1. Ternary cơ bản ===
tuoi = int(input("Nhập tuổi: "))
loai = "Người lớn" if tuoi >= 18 else "Trẻ em"
gia_ve = 100000 if tuoi >= 18 else 50000 if tuoi >= 6 else 0
mien_phi = " (Miễn phí!)" if gia_ve == 0 else ""
print(f"{loai} - Giá vé: {gia_ve:,}đ{mien_phi}")

# === 2. Truthy/Falsy ===
print("\\n--- Truthy / Falsy ---")
test_values = [0, 1, -1, "", "hello", [], [1,2], None, True, False]
for val in test_values:
    trang_thai = "Truthy ✅" if val else "Falsy ❌"
    print(f"  {str(val):10} → {trang_thai}")

# === 3. Short-circuit evaluation ===
print("\\n--- Short-circuit ---")

# or: trả về giá trị truthy đầu tiên
print(0 or "" or "Python" or "Java")   # "Python"

# and: trả về giá trị falsy đầu tiên
print(1 and "a" and "" and "b")         # ""

# Ứng dụng: giá trị mặc định
ten = input("\\nNhập tên (Enter để dùng mặc định): ") or "Khách"
print(f"Xin chào, {ten}!")

# Ứng dụng: tránh lỗi chia cho 0
mau = int(input("Nhập mẫu số: "))
ket_qua = mau != 0 and f"10 / {mau} = {10/mau:.2f}" or "Không thể chia cho 0!"
print(ket_qua)`,
            explanation: "Ternary lồng tính giá vé theo tuổi. Truthy/Falsy giúp kiểm tra nhanh. Short-circuit: or dùng đặt default, and tránh lỗi runtime."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 4: Câu lệnh IF)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Câu lệnh if trong Python kết thúc bằng ký tự gì?
   A. Dấu chấm phẩy ;
   B. Dấu ngoặc nhọn }
   C. Dấu hai chấm :
   D. Không cần ký tự kết thúc

2. elif là viết tắt của:
   A. else-if
   B. else if
   C. elsif
   D. else + if

3. Phát biểu nào đúng về if-elif-else?
   A. Có thể có nhiều else
   B. elif phải đặt trước if
   C. else là tùy chọn, có thể không có
   D. Bắt buộc phải có else

4. Phương trình bậc 1: ax + b = 0. Khi a = 0 và b = 0, phương trình:
   A. Vô nghiệm
   B. Có nghiệm x = 0
   C. Vô số nghiệm
   D. Không xác định

5. Phương trình bậc 2: ax² + bx + c = 0. Khi delta < 0, phương trình:
   A. Có 2 nghiệm
   B. Có 1 nghiệm kép
   C. Vô nghiệm
   D. Vô số nghiệm

6. Kết quả đoạn code sau:
   x = 5
   if x > 10:
       print("A")
   elif x > 3:
       print("B")
   else:
       print("C")
   A. A
   B. B
   C. C
   D. AB

7. Câu lệnh if lồng nhau nghĩa là:
   A. Nhiều câu if trên cùng 1 dòng
   B. Đặt câu if bên trong khối lệnh của if khác
   C. Dùng nhiều elif
   D. Dùng and/or trong điều kiện`,
            code: `# ĐÁP ÁN:
# 1. C (Dấu hai chấm :)
# 2. A (else-if — kiểm tra điều kiện tiếp theo)
# 3. C (else là tùy chọn)
# 4. C (Vô số nghiệm — 0x + 0 = 0 đúng với mọi x)
# 5. C (Vô nghiệm — delta < 0 không có nghiệm thực)
# 6. B (x=5 > 3 nên in "B", elif dừng tại điều kiện đúng đầu tiên)
# 7. B (Đặt if bên trong khối lệnh của if khác)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. if/elif/else kiểm tra tuần tự, dừng tại điều kiện đúng đầu tiên."
        },
        {
            title: "📝 Câu hỏi ôn tập nâng cao - Toán tử Logic & Điều kiện 🚀",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Kết quả của biểu thức: "Chẵn" if 7 % 2 == 0 else "Lẻ" là gì?
   A. Chẵn
   B. Lẻ
   C. True
   D. Lỗi cú pháp

2. Trong Python, giá trị nào KHÔNG phải là Falsy?
   A. 0
   B. ""
   C. None
   D. [0]

3. Kết quả của: 0 or "" or [] or "Python" or None
   A. 0
   B. ""
   C. "Python"
   D. None

4. Cú pháp match-case yêu cầu phiên bản Python tối thiểu nào?
   A. Python 3.6
   B. Python 3.8
   C. Python 3.10
   D. Python 3.12`,
            code: `# ĐÁP ÁN:
# 1. B ("Lẻ" — 7 % 2 = 1, 1 != 0 → False → trả về "Lẻ")
# 2. D ([0] — list có phần tử là Truthy, dù phần tử đó là 0)
# 3. C ("Python" — or trả về giá trị truthy đầu tiên)
# 4. C (Python 3.10 — match-case ra mắt trong PEP 634)`,
            explanation: "Nguồn: Giáo trình Python Nâng Cao. Ternary, truthy/falsy, short-circuit và match-case là kỹ năng nâng cao quan trọng."
        }
    ]
};
