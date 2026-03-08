// Chương 6: Hàm input python
const chapter6 = {
        id: 6,
        title: "Hàm input python",
        description: "Nhập dữ liệu từ bàn phím, chuyển kiểu, split, các lỗi phổ biến khi dùng input.",
        theory: `
        <h2>1. Hàm input trong Python</h2>
        <p>Hàm <code>input()</code> dùng để nhận dữ liệu từ bàn phím. Chương trình sẽ dừng lại chờ người dùng nhập và nhấn Enter.</p>
        <div class="note-box note-box--warning">
            <div class="note-title">⚠️ Quan trọng</div>
            <code>input()</code> <strong>luôn trả về kiểu chuỗi (str)</strong>, dù người dùng nhập số!
        </div>

        <h2>2. Cú pháp</h2>
        <pre><code class="language-python">biến_chữ = input("Thông báo: ")
biến_số = int(input("Nhập số: "))
biến_thập_phân = float(input("Nhập số thực: "))</code></pre>

        <h2>3. Ví dụ sử dụng</h2>
        <h3>Nhận chuỗi</h3>
        <pre><code class="language-python">name = input("Nhập tên của bạn: ")
print("Xin chào, " + name + "!")</code></pre>

        <h3>Nhận số và chuyển kiểu</h3>
        <pre><code class="language-python">age = input("Nhập tuổi: ")
age = int(age)  # Chuyển str → int
print("Tuổi của bạn là:", age)</code></pre>

        <h3>Nhận nhiều giá trị bằng split()</h3>
        <pre><code class="language-python">x, y = input("Nhập 2 số cách nhau bởi dấu cách: ").split()
x = int(x)
y = int(y)
print("Tổng:", x + y)</code></pre>

        <h2>4. Chương trình thực tế</h2>
        <pre><code class="language-python"># Tính diện tích hình chữ nhật
width = float(input("Nhập chiều rộng: "))
height = float(input("Nhập chiều cao: "))
area = width * height
print(f"Diện tích: {area}")</code></pre>

        <h2>5. Các lỗi hay gặp</h2>
        <h3>Lỗi 1: Thiếu dấu ngoặc kép</h3>
        <pre><code class="language-python"># ❌ Sai
# x = input(Nhập tên)  → SyntaxError

# ✅ Đúng
x = input("Nhập tên: ")</code></pre>

        <h3>Lỗi 2: Thiếu dấu ngoặc tròn</h3>
        <pre><code class="language-python"># ❌ Sai
# x = input "Nhập: "  → SyntaxError

# ✅ Đúng
x = input("Nhập: ")</code></pre>

        <h3>Lỗi 3: Không chuyển kiểu khi tính toán</h3>
        <pre><code class="language-python"># ❌ Sai
so = input("Số: ")
# print(so + 10)  → TypeError

# ✅ Đúng
print(int(so) + 10)</code></pre>
    `,
        exercises: [
                {
                        title: "Bài tập 01 - Nhập thông tin cá nhân",
                        content: "Nhập họ tên, tuổi, lớp và in ra thông tin.",
                        code: `hoten = input("Họ tên: ")
tuoi = int(input("Tuổi: "))
lop = input("Lớp: ")

print(f"\\n--- THÔNG TIN ---")
print(f"Họ tên: {hoten}")
print(f"Tuổi: {tuoi}")
print(f"Năm sinh: {2025 - tuoi}")
print(f"Lớp: {lop}")`,
                        explanation: "input() nhận chuỗi. Khi cần tính toán (tuổi → năm sinh), phải ép int()."
                },
                {
                        title: "Bài tập 02 - Tính diện tích hình tròn",
                        content: "Nhập bán kính và tính diện tích.",
                        code: `import math

r = float(input("Nhập bán kính: "))
dien_tich = math.pi * r ** 2
chu_vi = 2 * math.pi * r

print(f"Bán kính: {r}")
print(f"Diện tích: {dien_tich:.2f}")
print(f"Chu vi: {chu_vi:.2f}")`,
                        explanation: "math.pi = 3.14159... :.2f làm tròn 2 chữ số thập phân."
                },
                {
                        title: "Bài tập 03 - Nhập nhiều giá trị bằng split",
                        content: "Nhập 3 số trên 1 dòng, tính trung bình.",
                        code: `data = input("Nhập 3 số cách nhau bởi dấu cách: ")
a, b, c = data.split()
a, b, c = float(a), float(b), float(c)

tb = (a + b + c) / 3
print(f"Ba số: {a}, {b}, {c}")
print(f"Trung bình: {tb:.2f}")`,
                        explanation: "split() tách chuỗi thành list theo dấu cách. Unpacking gán vào 3 biến cùng lúc."
                },
                {
                        title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 3: Nhập dữ liệu)",
                        content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Hàm input() trong Python luôn trả về kiểu dữ liệu gì?
   A. int
   B. float
   C. str
   D. Tùy theo người dùng nhập

2. Để nhập một số nguyên từ bàn phím, cách viết đúng là:
   A. x = input("Nhập số: ")
   B. x = int(input("Nhập số: "))
   C. x = int("Nhập số: ")
   D. x = number(input("Nhập số: "))

3. Khi người dùng nhập chữ "abc" vào int(input()), điều gì xảy ra?
   A. Trả về 0
   B. Trả về None
   C. Lỗi ValueError
   D. Tự động bỏ qua

4. Hàm split() trong Python dùng để làm gì?
   A. Nối các chuỗi lại
   B. Tách chuỗi thành danh sách
   C. Xóa khoảng trắng
   D. Đếm số ký tự

5. Đoạn code: x, y = input("Nhập: ").split() — điều gì xảy ra khi người dùng nhập "5 10"?
   A. x = 5, y = 10 (kiểu int)
   B. x = "5", y = "10" (kiểu str)
   C. Lỗi
   D. x = "5 10"

6. Để xử lý lỗi nhập liệu, ta nên dùng:
   A. if-else
   B. for loop
   C. try-except
   D. while loop

7. Kết quả của đoạn code sau:
   so = input("Số: ")  # người dùng nhập 5
   print(so + 10)
   A. 15
   B. 510
   C. Lỗi TypeError
   D. "510"`,
                        code: `# ĐÁP ÁN:
# 1. C (str — input() luôn trả về chuỗi)
# 2. B (int(input("Nhập số: ")) — ép kiểu từ str sang int)
# 3. C (Lỗi ValueError — "abc" không ép được sang int)
# 4. B (Tách chuỗi thành danh sách theo dấu phân cách)
# 5. B (x = "5", y = "10" — split() trả về chuỗi, không tự ép kiểu)
# 6. C (try-except — bắt và xử lý lỗi)
# 7. C (Lỗi TypeError — không thể cộng str với int)`,
                        explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. input() luôn trả về str, cần ép kiểu khi tính toán. try-except xử lý lỗi nhập."
                }
        ]
};
