// Chương 8: Mệnh đề so sánh trong Python
const chapter8 = {
        id: 8,
        title: "Mệnh đề so sánh trong Python",
        description: "Toán tử so sánh, logic (and/or/not), biểu thức toán học, so sánh, logic, chuỗi, ưu tiên.",
        theory: `
        <h2>1. Mệnh đề so sánh là gì?</h2>
        <p>Dùng toán tử so sánh để so sánh giá trị. Kết quả luôn là <strong>True</strong> hoặc <strong>False</strong>.</p>
        <pre><code class="language-python"># Ví dụ thực tế: Nam 50kg, Mai 40kg
so_sanh = (50 > 40)   # True → Nam nặng hơn Mai</code></pre>

        <h2>2. Bảng toán tử so sánh</h2>
        <table>
            <tr><th>Toán tử</th><th>Mô tả</th><th>Ví dụ</th><th>Kết quả</th></tr>
            <tr><td><code>==</code></td><td>Bằng</td><td>5 == 5</td><td>True</td></tr>
            <tr><td><code>!=</code></td><td>Khác</td><td>5 != 3</td><td>True</td></tr>
            <tr><td><code>&gt;</code></td><td>Lớn hơn</td><td>5 &gt; 3</td><td>True</td></tr>
            <tr><td><code>&lt;</code></td><td>Nhỏ hơn</td><td>5 &lt; 3</td><td>False</td></tr>
            <tr><td><code>&gt;=</code></td><td>Lớn hơn hoặc bằng</td><td>5 &gt;= 5</td><td>True</td></tr>
            <tr><td><code>&lt;=</code></td><td>Nhỏ hơn hoặc bằng</td><td>5 &lt;= 6</td><td>True</td></tr>
            <tr><td><code>is</code></td><td>Cùng đối tượng</td><td>a is b</td><td>True/False</td></tr>
        </table>
        <pre><code class="language-python">a = 5
b = 10
print(a == b)   # False
print(a != b)   # True
print(a > b)    # False
print(a < b)    # True
print(a >= 5)   # True
print(b <= 10)  # True</code></pre>

        <h2>3. Phép so sánh kết hợp (Logic)</h2>
        <table>
            <tr><th>Toán tử</th><th>Ý nghĩa</th></tr>
            <tr><td><code>and</code></td><td>Cả 2 đều True → True</td></tr>
            <tr><td><code>or</code></td><td>Ít nhất 1 True → True</td></tr>
            <tr><td><code>not</code></td><td>Đảo ngược giá trị</td></tr>
        </table>
        <pre><code class="language-python">x, y, z = 5, 10, 15
print(x < y and y < z)   # True
print(x > y or y < z)    # True

print(3==2 and 2==2)  # False
print(2>1 and 3>2)    # True
print(1==1 or 1==2)   # True
print(2<1 or 3<2)     # False</code></pre>

        <h2>4. Biểu thức trong Python</h2>
        <h3>a. Biểu thức toán học</h3>
        <pre><code class="language-python">3 + 5      # 8
10 - 2     # 8
4 * 7      # 28
9 / 3      # 3.0
10 // 3    # 3
10 % 3     # 1
2 ** 3     # 8</code></pre>

        <h3>b. Biểu thức chuỗi</h3>
        <pre><code class="language-python">"Hello" + " " + "World"   # "Hello World"
"Python" * 3              # "PythonPythonPython"</code></pre>

        <h3>c. Biểu thức với hàm</h3>
        <pre><code class="language-python">len("Hello")      # 5
abs(-10)          # 10
max(1, 3, 5, 2)   # 5</code></pre>

        <h2>5. Thứ tự ưu tiên toán tử</h2>
        <pre><code class="language-python"># ** → * / // % → + - → so sánh → logic
result = 3 + 5 * 2     # 13 (nhân trước)
result = (3 + 5) * 2   # 16 (ngoặc trước)

x, y, z = 5, 10, 2
result = (x + y) * z - 4 / (x - 1)  # 29.0</code></pre>
    `,
        exercises: [
                {
                        title: "Bài tập 01 - So sánh cơ bản",
                        content: "Thực hành tất cả toán tử so sánh.",
                        code: `a = 10
b = 20

print(f"{a} == {b} → {a == b}")
print(f"{a} != {b} → {a != b}")
print(f"{a} >  {b} → {a > b}")
print(f"{a} <  {b} → {a < b}")
print(f"{a} >= 10  → {a >= 10}")
print(f"{b} <= 20  → {b <= 20}")`,
                        explanation: "So sánh luôn trả về True/False. == là so sánh bằng, = là gán giá trị."
                },
                {
                        title: "Bài tập 02 - Logic and/or/not",
                        content: "Kết hợp nhiều điều kiện logic.",
                        code: `tuoi = 20
co_cmnd = True
co_tien = False

# and — cả 2 phải đúng
du_tuoi = tuoi >= 18 and co_cmnd
print(f"Đủ điều kiện đăng ký: {du_tuoi}")

# or — 1 cái đúng là được
co_phuong_tien = co_tien or co_cmnd
print(f"Có phương tiện: {co_phuong_tien}")

# not — đảo ngược
print(f"Không có tiền: {not co_tien}")`,
                        explanation: "and: cả 2 True → True. or: 1 True → True. not: đảo ngược."
                },
                {
                        title: "Bài tập 03 - Biểu thức & ưu tiên",
                        content: "Tính toán biểu thức phức tạp.",
                        code: `# Không có ngoặc → theo thứ tự ưu tiên
r1 = 2 + 3 * 4       # 14
r2 = 2 ** 3 + 1      # 9
r3 = 10 // 3 + 10 % 3  # 3 + 1 = 4

# Có ngoặc → tính ngoặc trước
r4 = (2 + 3) * 4     # 20
r5 = (10 + 5) / (3 - 1)  # 7.5

print(f"2 + 3 * 4 = {r1}")
print(f"(2 + 3) * 4 = {r4}")
print(f"2 ** 3 + 1 = {r2}")
print(f"(10 + 5) / (3 - 1) = {r5}")`,
                        explanation: "Thứ tự: ** → * / // % → + - → so sánh → logic. Dùng ngoặc () để thay đổi."
                },
                {
                        title: "📝 Câu hỏi ôn tập (Mệnh đề so sánh)",
                        content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Kết quả của phép so sánh 5 == 5 là gì?
   A. 5
   B. True
   C. False
   D. "5"

2. Toán tử != nghĩa là gì?
   A. Bằng
   B. Khác (không bằng)
   C. Nhỏ hơn
   D. Lớn hơn hoặc bằng

3. Kết quả của (3 > 2) and (1 > 5) là gì?
   A. True
   B. False
   C. 3
   D. 1

4. Kết quả của not True là gì?
   A. True
   B. False
   C. None
   D. 0

5. Phép toán nào có ưu tiên cao nhất?
   A. +
   B. *
   C. **
   D. ==

6. Kết quả của 2 + 3 * 4 là gì?
   A. 20
   B. 14
   C. 12
   D. 24

7. (2 > 1) or (3 < 2) cho kết quả gì?
   A. True
   B. False
   C. 2
   D. 1`,
                        code: `# ĐÁP ÁN:
# 1. B (True — 5 bằng 5)
# 2. B (Khác — không bằng)
# 3. B (False — and cần cả 2 True, nhưng 1>5 là False)
# 4. B (False — not đảo ngược True thành False)
# 5. C (** lũy thừa ưu tiên cao nhất)
# 6. B (14 — nhân trước cộng: 3*4=12, 2+12=14)
# 7. A (True — or chỉ cần 1 True: 2>1 là True)`,
                        explanation: "So sánh trả về True/False. Logic: and (cả 2), or (ít nhất 1), not (đảo). Ưu tiên: ** > */% > +- > so sánh > logic."
                }
        ]
};
