// Chương 22: Vòng lặp kết hợp biến - Tư duy bài toán thực tế
const chapter22 = {
    id: 22,
    title: "Vòng lặp kết hợp biến - Tư duy bài toán thực tế",
    description: "tkinter GUI, Trợ lý ảo AI, hồi quy tuyến tính, dự án tổng hợp, bài toán thực tế.",
    theory: `
        <h2>1. tkinter — Tạo giao diện đồ họa (GUI)</h2>
        <p>tkinter là thư viện GUI có sẵn trong Python, không cần cài thêm.</p>
        <pre><code class="language-python">import tkinter as tk

# Tạo cửa sổ chính
window = tk.Tk()
window.title("Ứng dụng Python")
window.geometry("400x300")

# Thêm label
label = tk.Label(window, text="Xin chào!", font=("Arial", 20))
label.pack(pady=20)

# Thêm button
def click():
    label.config(text="Bạn đã nhấn nút! ✅")

btn = tk.Button(window, text="Nhấn tôi", command=click,
                font=("Arial", 14), bg="#4CAF50", fg="white")
btn.pack(pady=10)

window.mainloop()  # Chạy ứng dụng</code></pre>

        <h3>Các widget phổ biến trong tkinter</h3>
        <table>
            <tr><th>Widget</th><th>Chức năng</th><th>Ví dụ</th></tr>
            <tr><td><code>Label</code></td><td>Hiển thị text</td><td>tk.Label(text="Hi")</td></tr>
            <tr><td><code>Button</code></td><td>Nút bấm</td><td>tk.Button(text="OK")</td></tr>
            <tr><td><code>Entry</code></td><td>Ô nhập liệu 1 dòng</td><td>tk.Entry()</td></tr>
            <tr><td><code>Text</code></td><td>Ô nhập nhiều dòng</td><td>tk.Text(height=5)</td></tr>
            <tr><td><code>Listbox</code></td><td>Danh sách chọn</td><td>tk.Listbox()</td></tr>
            <tr><td><code>Checkbutton</code></td><td>Checkbox</td><td>tk.Checkbutton()</td></tr>
            <tr><td><code>Radiobutton</code></td><td>Radio button</td><td>tk.Radiobutton()</td></tr>
            <tr><td><code>Frame</code></td><td>Khung chứa</td><td>tk.Frame()</td></tr>
        </table>

        <h3>Layout Manager</h3>
        <table>
            <tr><th>Phương thức</th><th>Mô tả</th></tr>
            <tr><td><code>pack()</code></td><td>Sắp xếp theo thứ tự (trên-dưới hoặc trái-phải)</td></tr>
            <tr><td><code>grid(row, column)</code></td><td>Sắp xếp theo lưới (hàng, cột)</td></tr>
            <tr><td><code>place(x, y)</code></td><td>Đặt vị trí chính xác bằng tọa độ</td></tr>
        </table>

        <h2>2. Trợ lý ảo AI với Python</h2>
        <p>Kết hợp <strong>Speech Recognition + TTS + xử lý lệnh</strong> để tạo trợ lý ảo.</p>
        <pre><code class="language-python"># pip install pyttsx3 SpeechRecognition pyaudio
import pyttsx3
import speech_recognition as sr
from datetime import datetime

engine = pyttsx3.init()

def noi(text):
    print(f"🤖 Bot: {text}")
    engine.say(text)
    engine.runAndWait()

def nghe():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎤 Đang nghe...")
        audio = r.listen(source, timeout=5)
    try:
        return r.recognize_google(audio, language="vi-VN")
    except:
        return None

def xu_ly(lenh):
    lenh = lenh.lower()
    if "mấy giờ" in lenh:
        noi(f"Bây giờ là {datetime.now().strftime('%H giờ %M phút')}")
    elif "tên" in lenh:
        noi("Tôi là trợ lý ảo Python!")
    elif "tạm biệt" in lenh:
        noi("Tạm biệt! Hẹn gặp lại!")
        return False
    else:
        noi("Xin lỗi, tôi chưa hiểu.")
    return True</code></pre>

        <h2>3. Hồi quy tuyến tính (Linear Regression)</h2>
        <p>Dự đoán giá trị dựa trên mối quan hệ tuyến tính giữa biến.</p>
        <p>Công thức: <strong>y = mx + b</strong></p>
        <ul>
            <li>y = giá trị dự đoán</li>
            <li>x = biến đầu vào</li>
            <li>m = hệ số góc (slope)</li>
            <li>b = hệ số chặn (intercept)</li>
        </ul>

        <h3>Ví dụ: Dự đoán chiều cao theo tuổi</h3>
        <pre><code class="language-python">import numpy as np
from sklearn.linear_model import LinearRegression

# Dữ liệu: Tuổi → Chiều cao
X = np.array([3, 4, 5, 6, 7]).reshape(-1, 1)
y = np.array([90, 95, 100, 105, 110])

# Tạo và huấn luyện mô hình
model = LinearRegression()
model.fit(X, y)

# Dự đoán
new_ages = np.array([8, 9, 10]).reshape(-1, 1)
predictions = model.predict(new_ages)

for age, height in zip(new_ages.flatten(), predictions):
    print(f"Trẻ {age} tuổi → dự đoán {height:.0f} cm")</code></pre>

        <h2>4. MicroPython — Lập trình IoT</h2>
        <p>MicroPython chạy trên vi điều khiển (ESP32, Raspberry Pi Pico...).</p>
        <pre><code class="language-python"># Nháy LED trên ESP32
from machine import Pin
import time

led = Pin(2, Pin.OUT)
while True:
    led.value(1)    # Bật
    time.sleep(1)
    led.value(0)    # Tắt
    time.sleep(1)</code></pre>

        <h2>5. Lộ trình học Python</h2>
        <ol>
            <li>Nền tảng: biến, kiểu, vòng lặp, hàm</li>
            <li>Cấu trúc dữ liệu: list, dict, tuple, set</li>
            <li>OOP: class, kế thừa, đa hình</li>
            <li>Thư viện: NumPy, Pandas, Flask, tkinter</li>
            <li>Dự án thực tế: GUI app, web app, trợ lý ảo AI</li>
        </ol>
    `,
    exercises: [
        {
            title: "Bài tập 01 - tkinter Máy tính đơn giản",
            content: "Tạo ứng dụng máy tính GUI với tkinter.",
            code: `import tkinter as tk

def tinh_toan():
    try:
        a = float(entry_a.get())
        b = float(entry_b.get())
        phep = phep_tinh.get()
        
        if phep == "+": kq = a + b
        elif phep == "-": kq = a - b
        elif phep == "*": kq = a * b
        elif phep == "/":
            if b == 0:
                label_kq.config(text="❌ Lỗi: Chia cho 0!")
                return
            kq = a / b
        
        label_kq.config(text=f"✅ Kết quả: {kq:.2f}")
    except ValueError:
        label_kq.config(text="❌ Nhập số hợp lệ!")

# Tạo cửa sổ
window = tk.Tk()
window.title("🧮 Máy Tính Python")
window.geometry("350x280")
window.config(bg="#2C3E50")

# Tiêu đề
tk.Label(window, text="Máy Tính Python 🐍", 
         font=("Arial", 16, "bold"), bg="#2C3E50", fg="white").pack(pady=10)

# Frame nhập liệu
frame = tk.Frame(window, bg="#2C3E50")
frame.pack(pady=5)

tk.Label(frame, text="Số A:", bg="#2C3E50", fg="white").grid(row=0, column=0)
entry_a = tk.Entry(frame, width=10, font=("Arial", 14))
entry_a.grid(row=0, column=1, padx=5)

phep_tinh = tk.StringVar(value="+")
menu = tk.OptionMenu(frame, phep_tinh, "+", "-", "*", "/")
menu.grid(row=0, column=2, padx=5)

tk.Label(frame, text="Số B:", bg="#2C3E50", fg="white").grid(row=1, column=0)
entry_b = tk.Entry(frame, width=10, font=("Arial", 14))
entry_b.grid(row=1, column=1, padx=5, pady=5)

# Nút tính
tk.Button(window, text="= Tính =", command=tinh_toan,
          font=("Arial", 14, "bold"), bg="#27AE60", fg="white").pack(pady=10)

# Kết quả
label_kq = tk.Label(window, text="", font=("Arial", 14), 
                     bg="#2C3E50", fg="#F1C40F")
label_kq.pack(pady=5)

window.mainloop()`,
            explanation: "tkinter.Entry nhận input, StringVar lưu giá trị OptionMenu. grid() sắp xếp theo hàng/cột."
        },
        {
            title: "Bài tập 02 - Trợ lý ảo đơn giản",
            content: "Tạo trợ lý ảo kết hợp TTS + xử lý lệnh text.",
            code: `import pyttsx3
from datetime import datetime

engine = pyttsx3.init()
engine.setProperty('rate', 150)

def noi(text):
    print(f"🤖 Bot: {text}")
    engine.say(text)
    engine.runAndWait()

def xu_ly_lenh(lenh):
    lenh = lenh.lower().strip()
    
    if "mấy giờ" in lenh or "giờ" in lenh:
        gio = datetime.now().strftime("%H giờ %M phút")
        noi(f"Bây giờ là {gio}")
    elif "ngày" in lenh or "hôm nay" in lenh:
        ngay = datetime.now().strftime("%d/%m/%Y")
        noi(f"Hôm nay là ngày {ngay}")
    elif "tên" in lenh:
        noi("Tôi là trợ lý ảo Python! Rất vui được giúp bạn.")
    elif "tính" in lenh:
        try:
            # Tách phép tính từ câu lệnh
            bieu_thuc = lenh.replace("tính", "").strip()
            kq = eval(bieu_thuc)
            noi(f"Kết quả là {kq}")
        except:
            noi("Xin lỗi, tôi không hiểu phép tính này.")
    elif "tạm biệt" in lenh:
        noi("Tạm biệt! Chúc bạn một ngày tốt lành!")
        return False
    else:
        noi("Xin lỗi, tôi chưa hiểu. Hãy thử lại!")
    return True

# Chạy trợ lý
noi("Xin chào! Tôi là trợ lý ảo Python.")
print("\\n💡 Thử các lệnh: 'mấy giờ', 'hôm nay', 'tính 5+3', 'tạm biệt'")
print("-" * 50)

while True:
    lenh = input("\\n👤 Bạn: ")
    if not xu_ly_lenh(lenh):
        break`,
            explanation: "Kết hợp pyttsx3 (TTS) + logic xử lý lệnh. datetime lấy giờ/ngày hiện tại."
        },
        {
            title: "Bài tập 03 - tkinter Quản lý sinh viên GUI",
            content: "Ứng dụng GUI quản lý danh sách sinh viên.",
            code: `import tkinter as tk
from tkinter import messagebox

class QuanLySVApp:
    def __init__(self, root):
        root.title("📚 Quản Lý Sinh Viên")
        root.geometry("500x450")
        root.config(bg="#1A1A2E")
        
        self.ds = []
        
        # Tiêu đề
        tk.Label(root, text="Quản Lý Sinh Viên 🎓",
                 font=("Arial", 18, "bold"), bg="#1A1A2E", fg="#E94560"
        ).pack(pady=10)
        
        # Frame nhập liệu
        frame = tk.Frame(root, bg="#1A1A2E")
        frame.pack(pady=5)
        
        tk.Label(frame, text="MSSV:", bg="#1A1A2E", fg="white").grid(row=0, column=0)
        self.e_mssv = tk.Entry(frame, width=15)
        self.e_mssv.grid(row=0, column=1, padx=5, pady=2)
        
        tk.Label(frame, text="Tên:", bg="#1A1A2E", fg="white").grid(row=1, column=0)
        self.e_ten = tk.Entry(frame, width=15)
        self.e_ten.grid(row=1, column=1, padx=5, pady=2)
        
        tk.Label(frame, text="Điểm:", bg="#1A1A2E", fg="white").grid(row=2, column=0)
        self.e_diem = tk.Entry(frame, width=15)
        self.e_diem.grid(row=2, column=1, padx=5, pady=2)
        
        # Buttons
        btn_frame = tk.Frame(root, bg="#1A1A2E")
        btn_frame.pack(pady=5)
        
        tk.Button(btn_frame, text="➕ Thêm", command=self.them_sv,
                  bg="#0F3460", fg="white", width=10).grid(row=0, column=0, padx=3)
        tk.Button(btn_frame, text="📊 Thống kê", command=self.thong_ke,
                  bg="#533483", fg="white", width=10).grid(row=0, column=1, padx=3)
        tk.Button(btn_frame, text="🗑️ Xóa hết", command=self.xoa_het,
                  bg="#E94560", fg="white", width=10).grid(row=0, column=2, padx=3)
        
        # Listbox hiển thị
        self.listbox = tk.Listbox(root, width=55, height=12, 
                                   font=("Consolas", 10), bg="#16213E", fg="white")
        self.listbox.pack(pady=10)
    
    def them_sv(self):
        mssv = self.e_mssv.get().strip()
        ten = self.e_ten.get().strip()
        try:
            diem = float(self.e_diem.get())
        except:
            messagebox.showerror("Lỗi", "Điểm phải là số!")
            return
        
        if not mssv or not ten:
            messagebox.showwarning("Thiếu", "Nhập đầy đủ MSSV và Tên!")
            return
        
        xl = "Giỏi" if diem>=8 else "Khá" if diem>=6.5 else "TB" if diem>=5 else "Yếu"
        self.ds.append({"mssv": mssv, "ten": ten, "diem": diem, "xl": xl})
        self.listbox.insert(tk.END, f"  {mssv:8} | {ten:15} | {diem:5.1f} | {xl}")
        
        # Xóa input
        self.e_mssv.delete(0, tk.END)
        self.e_ten.delete(0, tk.END)
        self.e_diem.delete(0, tk.END)
    
    def thong_ke(self):
        if not self.ds:
            messagebox.showinfo("Trống", "Chưa có sinh viên!")
            return
        diem = [sv["diem"] for sv in self.ds]
        msg = f"Tổng: {len(diem)} SV\\nTB: {sum(diem)/len(diem):.1f}\\n"
        msg += f"Max: {max(diem)} | Min: {min(diem)}"
        messagebox.showinfo("📊 Thống kê", msg)
    
    def xoa_het(self):
        if messagebox.askyesno("Xác nhận", "Xóa toàn bộ?"):
            self.ds.clear()
            self.listbox.delete(0, tk.END)

root = tk.Tk()
app = QuanLySVApp(root)
root.mainloop()`,
            explanation: "OOP + tkinter tạo ứng dụng GUI hoàn chỉnh. messagebox hiển thị thông báo. Listbox hiển thị danh sách."
        },
        {
            title: "Bài tập 04 - Dự án tổng hợp",
            content: "Kết hợp tất cả kiến thức: OOP, List, Dict, File, Exception.",
            code: `class QuanLySV:
    def __init__(self):
        self.ds = []

    def them(self, mssv, ten, diem):
        self.ds.append({"mssv": mssv, "ten": ten, "diem": diem})
        print(f"✅ Thêm {ten}")

    def hien_thi(self):
        if not self.ds:
            print("Danh sách trống!")
            return
        print(f"{'MSSV':<8} {'Tên':<15} {'Điểm':>5} {'XL':<6}")
        print("-" * 38)
        for sv in self.ds:
            xl = "Giỏi" if sv["diem"]>=8 else "Khá" if sv["diem"]>=6.5 else "TB"
            print(f"{sv['mssv']:<8} {sv['ten']:<15} {sv['diem']:>5.1f} {xl:<6}")

    def thong_ke(self):
        if not self.ds:
            return
        diem = [sv["diem"] for sv in self.ds]
        print(f"\\nTổng: {len(diem)} SV")
        print(f"TB: {sum(diem)/len(diem):.1f}")
        print(f"Max: {max(diem)}, Min: {min(diem)}")

ql = QuanLySV()
ql.them("SV01", "An", 8.5)
ql.them("SV02", "Bình", 6.0)
ql.them("SV03", "Cúc", 9.2)
ql.hien_thi()
ql.thong_ke()`,
            explanation: "Dự án tổng hợp OOP + List + Dict + format. Pattern quản lý rất phổ biến."
        },
        {
            title: "Bài tập 05 - Ứng dụng phần mềm bán hàng",
            content: "Tạo ứng dụng bán hàng đơn giản với vòng lặp và biến tích lũy.",
            code: `# Ứng dụng bán hàng đơn giản
san_pham = {
    "SP01": {"ten": "Áo thun", "gia": 150000},
    "SP02": {"ten": "Quần jean", "gia": 350000},
    "SP03": {"ten": "Giày", "gia": 500000},
    "SP04": {"ten": "Nón", "gia": 80000}
}

gio_hang = []
tong_tien = 0

print("🛒 PHẦN MỀM BÁN HÀNG")
print("=" * 40)
print("Danh sách sản phẩm:")
for ma, sp in san_pham.items():
    print(f"  {ma}: {sp['ten']:15} - {sp['gia']:>10,.0f}đ")

print("\\nNhập mã SP để thêm vào giỏ (gõ 'xong' để thanh toán)")
print("-" * 40)

while True:
    ma = input("Mã SP: ").strip().upper()
    if ma == "XONG":
        break
    if ma in san_pham:
        try:
            sl = int(input("Số lượng: "))
            if sl > 0:
                sp = san_pham[ma]
                thanh_tien = sp["gia"] * sl
                gio_hang.append({"ten": sp["ten"], "sl": sl, "thanh_tien": thanh_tien})
                tong_tien += thanh_tien
                print(f"  ✅ {sp['ten']} x{sl} = {thanh_tien:,.0f}đ")
        except ValueError:
            print("  ❌ Số lượng không hợp lệ!")
    else:
        print(f"  ❌ Mã '{ma}' không tồn tại!")

# In hóa đơn
print("\\n" + "=" * 40)
print("📋 HÓA ĐƠN BÁN HÀNG")
print("=" * 40)
for i, item in enumerate(gio_hang, 1):
    print(f"{i}. {item['ten']:15} x{item['sl']:2} = {item['thanh_tien']:>10,.0f}đ")
print("-" * 40)
print(f"💰 TỔNG CỘNG: {tong_tien:>10,.0f}đ")`,
            explanation: "Kết hợp dict, list, vòng lặp while, biến tích lũy để tạo ứng dụng bán hàng thực tế."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 13: Trí thông minh trợ lý ảo, Chương 15: Hàm xử lý nút nhấn, Chương 16: Xử lý lỗi giao diện)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Thư viện nào dùng để chuyển văn bản thành giọng nói (TTS) trong Python?
   A. speech_recognition
   B. pyttsx3
   C. tkinter
   D. numpy

2. Trong tkinter, widget nào dùng để tạo nút bấm?
   A. tk.Label
   B. tk.Entry
   C. tk.Button
   D. tk.Text

3. Tham số command trong tk.Button dùng để làm gì?
   A. Đặt tên nút
   B. Thay đổi màu nút
   C. Gán hàm xử lý khi nhấn nút
   D. Đặt kích thước nút

4. Phương thức nào dùng để sắp xếp widget theo lưới (hàng, cột)?
   A. pack()
   B. place()
   C. grid()
   D. layout()

5. Để trợ lý ảo nhận diện giọng nói tiếng Việt, ta dùng:
   A. recognize_google(audio, language="en-US")
   B. recognize_google(audio, language="vi-VN")
   C. recognize_google(audio, language="vn")
   D. recognize_google(audio)

6. window.mainloop() trong tkinter có chức năng gì?
   A. Đóng cửa sổ
   B. Giữ cửa sổ mở và lắng nghe sự kiện
   C. Tạo cửa sổ mới
   D. Xóa tất cả widget

7. Để xử lý lỗi nhập liệu trên giao diện tkinter, nên dùng:
   A. if-else
   B. for loop
   C. try-except
   D. while loop

8. Hàm messagebox.showerror() trong tkinter dùng để:
   A. Hiển thị thông báo thành công
   B. Hiển thị hộp thoại lỗi cho người dùng
   C. Đóng ứng dụng
   D. Nhập dữ liệu từ người dùng

9. Trong trợ lý ảo, để xử lý lệnh người dùng nói, ta thường dùng kỹ thuật nào?
   A. Dùng vòng lặp for duyệt từ
   B. Dùng if-elif kiểm tra từ khóa trong câu lệnh
   C. Dùng try-except bắt lỗi
   D. Dùng class kế thừa

10. Phương thức entry.get() trong tkinter trả về kiểu dữ liệu gì?
    A. int
    B. float
    C. str
    D. list`,
            code: `# ĐÁP ÁN:
# 1. B (pyttsx3 — Text To Speech engine)
# 2. C (tk.Button — tạo nút bấm)
# 3. C (Gán hàm xử lý khi nhấn nút — callback function)
# 4. C (grid() — sắp xếp theo lưới row/column)
# 5. B (language="vi-VN" — mã ngôn ngữ tiếng Việt)
# 6. B (Giữ cửa sổ mở, lắng nghe sự kiện — event loop)
# 7. C (try-except — bắt lỗi ValueError khi ép kiểu)
# 8. B (Hiển thị hộp thoại lỗi — thông báo lỗi cho user)
# 9. B (if-elif kiểm tra từ khóa — pattern matching đơn giản)
# 10. C (str — Entry luôn trả về chuỗi, cần ép kiểu)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. tkinter tạo GUI, pyttsx3 + speech_recognition tạo trợ lý ảo, try-except xử lý lỗi trên giao diện."
        }
    ]
};
