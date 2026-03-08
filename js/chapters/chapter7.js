// Chương 7: Kiểu ngày trong Python
const chapter7 = {
    id: 7,
    title: "Kiểu ngày trong Python",
    description: "Module datetime: date, time, datetime, timedelta, strftime, strptime. Module datetime chi tiết.",
    theory: `
        <h2>1. Kiểu ngày là gì?</h2>
        <p>Kiểu dữ liệu chứa: ngày, tháng, năm, giờ, phút, giây. Python xử lý bằng module <code>datetime</code>.</p>

        <h2>2. Tại sao dùng DateTime?</h2>
        <pre><code class="language-python"># ❌ Cách sai — dữ liệu rời rạc
ngay = 20
thang = 10
nam = 2025

# ✅ Cách đúng — dùng datetime
import datetime
d = datetime.date(2025, 2, 18)
print(d)
print(d.year, d.month, d.day)</code></pre>

        <h2>3. Các lớp trong module datetime</h2>
        <table>
            <tr><th>Lớp</th><th>Chức năng</th><th>Ví dụ</th></tr>
            <tr><td><code>date</code></td><td>Ngày (năm, tháng, ngày)</td><td><code>datetime.date(2025, 2, 18)</code></td></tr>
            <tr><td><code>time</code></td><td>Giờ (giờ, phút, giây)</td><td><code>datetime.time(14, 30, 15)</code></td></tr>
            <tr><td><code>datetime</code></td><td>Ngày + Giờ</td><td><code>datetime.datetime.now()</code></td></tr>
            <tr><td><code>timedelta</code></td><td>Khoảng cách thời gian</td><td><code>timedelta(days=7)</code></td></tr>
        </table>

        <h3>Lớp date</h3>
        <pre><code class="language-python">import datetime
d = datetime.date(2025, 2, 18)
print(d)                    # 2025-02-18
print(d.year, d.month, d.day)  # 2025 2 18

today = datetime.date.today()
print("Hôm nay:", today)</code></pre>

        <h3>Lớp time</h3>
        <pre><code class="language-python">t = datetime.time(14, 30, 15)
print(t)                           # 14:30:15
print(t.hour, t.minute, t.second)  # 14 30 15</code></pre>

        <h3>Lớp datetime</h3>
        <pre><code class="language-python">dt = datetime.datetime(2025, 2, 18, 14, 30, 15)
print(dt)  # 2025-02-18 14:30:15

now = datetime.datetime.now()
print("Hiện tại:", now)</code></pre>

        <h3>Lớp timedelta</h3>
        <pre><code class="language-python">today = datetime.date.today()
delta = datetime.timedelta(days=7)
next_week = today + delta
print("Tuần sau:", next_week)

# Ngày mai
one_day = datetime.timedelta(days=1)
print("Ngày mai:", today + one_day)</code></pre>

        <h2>4. strftime — Định dạng ngày thành chuỗi</h2>
        <p><code>strftime</code> = "string format time"</p>
        <pre><code class="language-python">today = datetime.date.today()
print(today.strftime("%d/%m/%Y"))   # 18/02/2025

now = datetime.datetime.now()
print(now.strftime("%A, %d %B %Y, %I:%M %p"))</code></pre>
        <table>
            <tr><th>Ký hiệu</th><th>Ý nghĩa</th><th>Ví dụ</th></tr>
            <tr><td>%Y</td><td>Năm 4 chữ số</td><td>2025</td></tr>
            <tr><td>%m</td><td>Tháng (01-12)</td><td>02</td></tr>
            <tr><td>%d</td><td>Ngày (01-31)</td><td>18</td></tr>
            <tr><td>%H</td><td>Giờ 24h (00-23)</td><td>14</td></tr>
            <tr><td>%I</td><td>Giờ 12h (01-12)</td><td>02</td></tr>
            <tr><td>%M</td><td>Phút (00-59)</td><td>30</td></tr>
            <tr><td>%S</td><td>Giây (00-59)</td><td>15</td></tr>
            <tr><td>%p</td><td>AM/PM</td><td>PM</td></tr>
        </table>

        <h2>5. strptime — Chuỗi thành datetime</h2>
        <p><code>strptime</code> = "string parse time"</p>
        <pre><code class="language-python">from datetime import datetime

date_str = "2025-02-22 14:30:00"
fmt = "%Y-%m-%d %H:%M:%S"
date_obj = datetime.strptime(date_str, fmt)
print(date_obj)  # 2025-02-22 14:30:00</code></pre>

        <h2>6. from datetime vs import datetime</h2>
        <pre><code class="language-python"># Cách 1: Gọn hơn
from datetime import datetime
now = datetime.now()

# Cách 2: Dài hơn
import datetime
now = datetime.datetime.now()</code></pre>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Ngày hiện tại & định dạng",
            content: "Lấy ngày hiện tại và format theo kiểu Việt Nam.",
            code: `import datetime

now = datetime.datetime.now()
print("Ngày giờ:", now)
print("Ngày:", now.strftime("%d/%m/%Y"))
print("Giờ:", now.strftime("%H:%M:%S"))
print("Đầy đủ:", now.strftime("%d-%m-%Y %H:%M"))`,
            explanation: "strftime chuyển datetime thành chuỗi theo format. %d/%m/%Y là kiểu ngày Việt Nam."
        },
        {
            title: "Bài tập 02 - Tính khoảng cách ngày",
            content: "Tính số ngày từ ngày sinh đến hôm nay.",
            code: `import datetime

ngay_sinh = datetime.date(2000, 5, 15)
hom_nay = datetime.date.today()
khoang_cach = hom_nay - ngay_sinh

print(f"Ngày sinh: {ngay_sinh.strftime('%d/%m/%Y')}")
print(f"Hôm nay: {hom_nay.strftime('%d/%m/%Y')}")
print(f"Đã sống: {khoang_cach.days} ngày")
print(f"Khoảng: {khoang_cach.days // 365} năm")`,
            explanation: "Trừ 2 đối tượng date cho ra timedelta. .days lấy số ngày."
        },
        {
            title: "Bài tập 03 - strptime chuyển chuỗi",
            content: "Chuyển chuỗi ngày nhập vào thành đối tượng datetime.",
            code: `from datetime import datetime

chuoi = "22/02/2025 14:30"
fmt = "%d/%m/%Y %H:%M"
dt = datetime.strptime(chuoi, fmt)

print(f"Đối tượng: {dt}")
print(f"Năm: {dt.year}")
print(f"Tháng: {dt.month}")
print(f"Ngày: {dt.day}")
print(f"Giờ: {dt.hour}:{dt.minute}")`,
            explanation: "strptime chuyển ngược từ chuỗi → datetime. Format phải khớp chính xác với chuỗi."
        },
        {
            title: "📝 Câu hỏi ôn tập (Kiểu ngày trong Python)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Module nào dùng để xử lý ngày tháng trong Python?
   A. date
   B. calendar
   C. datetime
   D. time

2. Để lấy ngày hiện tại, dùng lệnh nào?
   A. datetime.date.now()
   B. datetime.date.today()
   C. datetime.today()
   D. date.current()

3. strftime dùng để làm gì?
   A. Chuỗi → datetime
   B. datetime → chuỗi
   C. Tính khoảng cách ngày
   D. Tạo ngày mới

4. Ký hiệu %Y trong strftime nghĩa là gì?
   A. Tháng 2 chữ số
   B. Năm 2 chữ số
   C. Năm 4 chữ số
   D. Ngày trong năm

5. Lớp timedelta dùng để:
   A. Lưu trữ ngày tháng
   B. Định dạng ngày
   C. Tính khoảng cách và cộng trừ thời gian
   D. Chuyển đổi múi giờ

6. Để cộng thêm 7 ngày vào ngày hiện tại, cách viết đúng:
   A. today + 7
   B. today + datetime.timedelta(days=7)
   C. today.add(7)
   D. today + datetime.days(7)

7. strptime dùng để:
   A. datetime → chuỗi
   B. Chuỗi → datetime
   C. Tính khoảng cách ngày
   D. Lấy ngày hiện tại`,
            code: `# ĐÁP ÁN:
# 1. C (datetime)
# 2. B (datetime.date.today())
# 3. B (datetime → chuỗi: string format time)
# 4. C (Năm 4 chữ số, VD: 2025)
# 5. C (Tính khoảng cách và cộng trừ thời gian)
# 6. B (today + datetime.timedelta(days=7))
# 7. B (Chuỗi → datetime: string parse time)`,
            explanation: "Module datetime: date (ngày), time (giờ), datetime (ngày+giờ), timedelta (khoảng cách). strftime → format, strptime → parse."
        }
    ]
};
