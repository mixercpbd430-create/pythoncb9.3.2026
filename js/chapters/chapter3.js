// Chương 3: Hàm print và giải thích chi tiết A-Z
const chapter3 = {
    id: 3,
    title: "Hàm print và giải thích chi tiết A-Z",
    description: "Hàm print đầy đủ: sep, end, f-string, format table, ký tự đặc biệt, ghi vào file.",
    theory: `
        <h2>Hàm print là gì?</h2>
        <p>Là hàm có chức năng in giá trị từ chuỗi / biến / biểu thức ra màn hình.</p>

        <h2>Cú pháp đầy đủ</h2>
        <pre><code class="language-python">print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)</code></pre>

        <h2>1. Print cơ bản</h2>
        <pre><code class="language-python"># In chuỗi
print("Xin chào bạn đến với Python")

# In biến
hoten = "iif"
print(hoten)

# In biểu thức
print(5 + 2)   # 7

tong = 2 + 7
print(tong)     # 9

# In kết hợp
str_val = "Đào tạo lập trình"
print("Xin chào:", str_val)</code></pre>

        <h2>2. Print sử dụng f-string</h2>
        <pre><code class="language-python">a = 5
b = 2
print(f"{a}+{b}={a+b}")  # 5+2=7

ten = "An"
diem = 8.5
print(f"Sinh viên {ten} đạt {diem} điểm")</code></pre>

        <h2>3. Tham số sep (phân cách)</h2>
        <pre><code class="language-python"># Mặc định sep là khoảng trắng
print("Lập trình", "C#", "Python")
# Lập trình C# Python

# Thay đổi sep
print("PhP", "C#", "Python", sep="-")
# PhP-C#-Python

print("A", "B", "C", sep=" | ")
# A | B | C</code></pre>

        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ Tham số sep</div>
            Tham số <code>sep</code> là tính năng đặc biệt của Python mà C#, Java không có!
        </div>

        <h2>4. Tham số end (ký tự kết thúc)</h2>
        <pre><code class="language-python"># Mặc định end='\\n' (xuống dòng)
print("Chào", end=" ")
print("bạn!")
# Chào bạn!

print("1", "2", "3", sep=", ", end=".")
# 1, 2, 3.</code></pre>

        <h2>5. Ký tự đặc biệt (Escape Characters)</h2>
        <pre><code class="language-python"># \\n - Xuống dòng
print("Hello\\nWorld")

# \\t - Tab ngang
print("Tên\\tTuổi\\tLớp")
print("An\\t15\\t9A")

# \\\\ - In dấu \\
print("C:\\\\Windows")

# \\" - In dấu "
print("He said: \\"Hello\\"")

# \\' - In dấu '
print('It\\'s OK')

# \\r - Về đầu dòng
print("ABC\\rD")   # DBC

# \\b - Xóa ký tự trước (Backspace)
print("Helloo\\b")  # Hello</code></pre>

        <h2>6. In vào file</h2>
        <pre><code class="language-python">with open("output.txt", "w") as file:
    print("Hello, File!", file=file)</code></pre>

        <h2>7. Trang trí dạng table với print</h2>
        <pre><code class="language-python">data = [
    [101, "An", 8.5],
    [102, "Hùng", 7.0],
    [103, "Cường", 9.2]
]
# In tiêu đề
print("{:<15} {:<20} {:<15}".format("Mã", "Tên", "Điểm"))
print("-" * 40)

# In dữ liệu
for row in data:
    print("{:<15} {:<20} {:<15}".format(row[0], row[1], row[2]))</code></pre>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Print cơ bản & f-string",
            content: "Tạo biến và in thông tin dùng f-string.",
            code: `ten = "Nguyễn Văn A"
tuoi = 25
luong = 15000000

print(f"Họ tên: {ten}")
print(f"Tuổi: {tuoi}")
print(f"Lương: {luong:,.0f}đ")
print(f"Năm sinh: {2025 - tuoi}")`,
            explanation: "f-string cho phép chèn biến và biểu thức vào chuỗi. :,.0f định dạng số có dấu phẩy."
        },
        {
            title: "Bài tập 02 - Tham số sep và end",
            content: "Sử dụng sep và end để tùy chỉnh output.",
            code: `# In ngày tháng dùng sep
print(18, 2, 2025, sep="/")
# 18/2/2025

# In trên 1 dòng dùng end
for i in range(1, 6):
    print(i, end=" ")
print()  # Xuống dòng

# Kết hợp sep và end
print("A", "B", "C", sep=" → ", end=" ✓\\n")`,
            explanation: "sep thay đổi ký tự phân cách giữa các đối tượng. end thay đổi ký tự kết thúc dòng."
        },
        {
            title: "Bài tập 03 - Ký tự đặc biệt",
            content: "Thực hành với các ký tự escape.",
            code: `# Tab tạo bảng
print("Mã\\tTên\\tGiá")
print("SP01\\tGạo\\t15,000đ")
print("SP02\\tĐường\\t20,000đ")
print()

# Xuống dòng trong 1 lệnh print
print("Dòng 1\\nDòng 2\\nDòng 3")
print()

# In đường dẫn Windows
print("C:\\\\Users\\\\phinho\\\\Desktop")`,
            explanation: "\\n xuống dòng, \\t tab ngang, \\\\\\\\ in dấu \\\\. Các ký tự này rất quan trọng trong format output."
        },
        {
            title: "Bài tập 04 - Format table",
            content: "Tạo bảng dữ liệu đẹp với print và format.",
            code: `ds = [
    ["SV01", "Trần An", 8.5, "Giỏi"],
    ["SV02", "Lê Bình", 7.0, "Khá"],
    ["SV03", "Nguyễn Cúc", 9.2, "Giỏi"],
]

print("{:<8} {:<15} {:>6} {:<8}".format("Mã", "Họ tên", "Điểm", "Xếp loại"))
print("-" * 40)
for sv in ds:
    print("{:<8} {:<15} {:>6.1f} {:<8}".format(*sv))`,
            explanation: "format() với <(trái), >(phải), ^(giữa) và độ rộng cột giúp tạo bảng gọn gàng."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 2: Hiển thị kết quả)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Hàm print() trong Python dùng để làm gì?
   A. Nhập dữ liệu từ bàn phím
   B. Hiển thị kết quả ra màn hình
   C. Khai báo biến
   D. Tạo vòng lặp

2. Kết quả của lệnh print("A", "B", "C", sep="-") là gì?
   A. A B C
   B. A-B-C
   C. ABC
   D. A, B, C

3. Tham số end trong hàm print dùng để làm gì?
   A. Kết thúc chương trình
   B. Thay đổi ký tự phân cách
   C. Thay đổi ký tự kết thúc dòng (mặc định là xuống dòng)
   D. Xóa nội dung in ra

4. Kết quả của đoạn code sau là gì?
   print("Xin", end=" ")
   print("chào!")
   A. Xin\\nchào!
   B. Xin chào!
   C. Xinchào!
   D. Xin, chào!

5. Cú pháp %.2f dùng để làm gì?
   A. Hiển thị số nguyên 2 chữ số
   B. Hiển thị số thực với 2 chữ số thập phân
   C. Nhân số với 2
   D. Chia số cho 2

6. Tham số sep mặc định của hàm print là gì?
   A. Dấu phẩy
   B. Không có gì
   C. Dấu cách (khoảng trắng)
   D. Dấu gạch ngang

7. Kết quả của print(1, 2, 3, sep=", ", end=".") là gì?
   A. 1 2 3
   B. 1, 2, 3.
   C. 1-2-3.
   D. 123.`,
            code: `# ĐÁP ÁN:
# 1. B (Hiển thị kết quả ra màn hình)
# 2. B (A-B-C)
# 3. C (Thay đổi ký tự kết thúc dòng)
# 4. B (Xin chào! — vì end=" " thay xuống dòng bằng khoảng trắng)
# 5. B (Hiển thị số thực với 2 chữ số thập phân)
# 6. C (Dấu cách - khoảng trắng)
# 7. B (1, 2, 3.)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. Hàm print() có các tham số quan trọng: sep (phân cách), end (kết thúc), file (đầu ra)."
        }
    ]
};
