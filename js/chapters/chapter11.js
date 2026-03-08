// Chương 11: Vòng lặp - While
const chapter11 = {
    id: 11,
    title: "Vòng lặp - While",
    description: "Vòng lặp while, while vô hạn, break dừng vòng lặp, while...else, so sánh for vs while.",
    theory: `
        <h2>1. Vòng lặp while</h2>
        <p>Lặp lại khối mã <strong>miễn là điều kiện là True</strong>. Khi False → dừng.</p>
        <pre><code class="language-python">while điều_kiện:
    # Khối lệnh lặp lại</code></pre>

        <pre><code class="language-python">i = 0
while i < 5:
    print(i)
    i += 1    # QUAN TRỌNG: phải thay đổi biến điều kiện!
# 0, 1, 2, 3, 4</code></pre>

        <div class="note-box note-box--warning">
            <div class="note-title">⚠️ Lỗi vòng lặp vô hạn</div>
            Nếu quên <code>i += 1</code>, điều kiện luôn True → lặp mãi mãi! Nhấn <strong>Ctrl+C</strong> để dừng.
        </div>

        <h2>2. Vòng lặp vô hạn + break</h2>
        <pre><code class="language-python">while True:
    response = input("Nhập 'exit' để thoát: ")
    if response == "exit":
        print("Thoát khỏi vòng lặp!")
        break
    else:
        print("Bạn nhập:", response)</code></pre>

        <h2>3. while...else</h2>
        <pre><code class="language-python"># else chạy khi while kết thúc bình thường (không break)
i = 0
while i < 3:
    print(i)
    i += 1
else:
    print("Hoàn thành!")
# 0, 1, 2, Hoàn thành!

# Nếu break → else KHÔNG chạy
i = 0
while i < 5:
    if i == 3:
        break
    i += 1
else:
    print("Không in ra vì break")</code></pre>

        <h2>4. So sánh for vs while</h2>
        <table>
            <tr><th>Tiêu chí</th><th>for</th><th>while</th></tr>
            <tr><td>Khi nào dùng?</td><td>Biết trước số lần lặp</td><td>Không biết trước, lặp đến khi sai</td></tr>
            <tr><td>Duyệt dữ liệu</td><td>List, chuỗi, range</td><td>Ít dùng duyệt dữ liệu</td></tr>
            <tr><td>Rủi ro</td><td>An toàn</td><td>Có thể lặp vô hạn</td></tr>
        </table>

        <pre><code class="language-python"># Cùng kết quả — 2 cách viết
# for
for i in range(5):
    print(i)

# while
i = 0
while i < 5:
    print(i)
    i += 1</code></pre>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Đếm ngược",
            content: "Đếm ngược từ 10 về 0.",
            code: `n = 10
while n >= 0:
    print(n, end=" ")
    n -= 1
print("\\n🚀 Phóng!")`,
            explanation: "n -= 1 giảm n mỗi vòng. Khi n < 0 → điều kiện False → dừng."
        },
        {
            title: "Bài tập 02 - Nhập đến khi đúng",
            content: "Yêu cầu nhập mật khẩu cho đến khi đúng.",
            code: `mat_khau = "python123"
so_lan = 0

while True:
    mk = input("Nhập mật khẩu: ")
    so_lan += 1
    
    if mk == mat_khau:
        print(f"✅ Đăng nhập thành công! (lần {so_lan})")
        break
    else:
        print(f"❌ Sai mật khẩu! (lần {so_lan})")
        if so_lan >= 3:
            print("🔒 Tài khoản bị khóa!")
            break`,
            explanation: "while True lặp vô hạn. break thoát khi đúng hoặc quá 3 lần."
        },
        {
            title: "Bài tập 03 - Tính tổng đến n",
            content: "Nhập n, tính tổng 1+2+3+...+n.",
            code: `n = int(input("Nhập n: "))

tong = 0
i = 1
while i <= n:
    tong += i
    i += 1

print(f"Tổng 1 + 2 + ... + {n} = {tong}")
print(f"Kiểm tra: n*(n+1)/2 = {n*(n+1)//2}")`,
            explanation: "Công thức Gauss: 1+2+...+n = n*(n+1)/2. Dùng while để cộng dồn."
        },
        {
            title: "Bài tập 04 - Menu chương trình",
            content: "Tạo menu với while True + break.",
            code: `while True:
    print("\\n=== MENU ===")
    print("1. Cộng hai số")
    print("2. Nhân hai số")
    print("0. Thoát")
    
    chon = input("Chọn: ")
    
    if chon == "0":
        print("Tạm biệt! 👋")
        break
    elif chon == "1":
        a = float(input("Số a: "))
        b = float(input("Số b: "))
        print(f"Kết quả: {a} + {b} = {a+b}")
    elif chon == "2":
        a = float(input("Số a: "))
        b = float(input("Số b: "))
        print(f"Kết quả: {a} × {b} = {a*b}")
    else:
        print("Lựa chọn không hợp lệ!")`,
            explanation: "Pattern rất phổ biến: while True + menu + break khi chọn thoát."
        },
        {
            title: "Bài tập 05 - Tổng mảng bằng while (PDF Dariu)",
            content: "Tính tổng các phần tử trong mảng bằng vòng lặp while.",
            code: `a = [1, 2, 3, 4, 5]
N = len(a)
Tong = 0
i = 0
while i < N:
    Tong = Tong + a[i]
    i = i + 1
print("Tong cac phan tu trong mang la:", Tong)`,
            explanation: "Nguồn: PDF Dariu Bài 1 Ch7. So với for: phải tự khởi tạo i=0 và tăng i=i+1."
        },
        {
            title: "Bài tập 06 - Đếm chẵn/lẻ bằng while (PDF Dariu)",
            content: "Đếm số chẵn và lẻ trong mảng bằng while.",
            code: `a = [1, 2, 3, 4, 5]
N = len(a)
chan = 0
le = 0
i = 0
while i < N:
    if a[i] % 2 == 0:
        chan = chan + 1
    else:
        le = le + 1
    i = i + 1
print("So phan tu chan:", chan)
print("So phan tu le:", le)`,
            explanation: "Nguồn: PDF Dariu Bài 2-3 Ch7. Cùng logic với for nhưng dùng while — cần nhớ tăng i."
        },
        {
            title: "Bài tập 07 - Tìm Max/Min bằng while (PDF Dariu)",
            content: "Tìm phần tử lớn nhất và nhỏ nhất bằng while.",
            code: `a = [3, 7, 1, 9, 2, 5]
N = len(a)

max_val = a[0]
min_val = a[0]
i = 0
while i < N:
    if a[i] > max_val:
        max_val = a[i]
    if a[i] < min_val:
        min_val = a[i]
    i = i + 1

print("Phan tu lon nhat:", max_val)
print("Phan tu nho nhat:", min_val)`,
            explanation: "Nguồn: PDF Dariu Bài 4-5 Ch7. Kết hợp tìm max và min trong cùng 1 vòng lặp while."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 7: Vòng lặp While)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Vòng lặp while thực thi khi nào?
   A. Khi điều kiện là False
   B. Khi điều kiện là True
   C. Chạy đúng 1 lần rồi kiểm tra
   D. Luôn chạy

2. Nếu quên cập nhật biến điều kiện trong while, điều gì xảy ra?
   A. Lỗi SyntaxError
   B. Chương trình dừng
   C. Vòng lặp vô hạn
   D. Python tự sửa

3. Để dừng vòng lặp vô hạn, nhấn phím gì?
   A. Ctrl + Z
   B. Ctrl + C
   C. Esc
   D. Alt + F4

4. while True:... kết hợp với lệnh gì để thoát?
   A. exit
   B. continue
   C. break
   D. return

5. Phát biểu nào đúng về while...else?
   A. else luôn chạy
   B. else chạy khi có break
   C. else chạy khi vòng lặp kết thúc bình thường (không break)
   D. while không có else

6. Khi nào nên dùng while thay vì for?
   A. Khi biết trước số lần lặp
   B. Khi duyệt danh sách
   C. Khi không biết trước số lần lặp
   D. Khi cần tốc độ cao`,
            code: `# ĐÁP ÁN:
# 1. B (Khi điều kiện là True)
# 2. C (Vòng lặp vô hạn — luôn True)
# 3. B (Ctrl + C — dừng chương trình)
# 4. C (break — thoát khỏi vòng lặp)
# 5. C (else chạy khi không bị break)
# 6. C (Khi không biết trước số lần lặp)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. while lặp khi True, dùng break để thoát, continue để bỏ qua."
        }
    ]
};
