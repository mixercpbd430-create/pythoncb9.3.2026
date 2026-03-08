// Chương 21: Một số thư viện hữu ích
const chapter21 = {
    id: 21,
    title: "Một số thư viện hữu ích",
    description: "regex (re), os, sys, NumPy, Flask/Django, TTS, Speech Recognition, MicroPython.",
    theory: `
        <h2>1. Thư viện phổ biến trong Python</h2>
        <table>
            <tr><th>Lĩnh vực</th><th>Thư viện</th><th>Chức năng</th></tr>
            <tr><td>Data Science</td><td>NumPy, Pandas</td><td>Mảng, DataFrame, xử lý dữ liệu</td></tr>
            <tr><td>Trực quan hóa</td><td>Matplotlib</td><td>Vẽ biểu đồ</td></tr>
            <tr><td>Web</td><td>Flask, Django</td><td>Tạo ứng dụng web</td></tr>
            <tr><td>AI / ML</td><td>scikit-learn, TensorFlow</td><td>Học máy, deep learning</td></tr>
            <tr><td>Giọng nói</td><td>pyttsx3, gTTS, SpeechRecognition</td><td>Text-to-Speech, nhận diện giọng nói</td></tr>
            <tr><td>Ảnh/Video</td><td>OpenCV</td><td>Nhận diện hình ảnh</td></tr>
            <tr><td>IoT</td><td>MicroPython</td><td>Lập trình vi điều khiển</td></tr>
        </table>

        <h2>2. NumPy — Mảng hiệu quả</h2>
        <pre><code class="language-python">import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr + 5)        # [6, 7, 8, 9, 10]

# Ma trận
arr_2d = np.array([[1, 2], [3, 4]])
print(arr_2d)

# Khởi tạo
print(np.zeros(5))         # [0, 0, 0, 0, 0]
print(np.ones(3))          # [1, 1, 1]
print(np.arange(0, 10, 2)) # [0, 2, 4, 6, 8]</code></pre>

        <h2>3. Text-to-Speech (TTS) — Chuyển văn bản thành giọng nói</h2>
        <h3>3.1 pyttsx3 — TTS offline</h3>
        <pre><code class="language-python"># pip install pyttsx3
import pyttsx3

engine = pyttsx3.init()
engine.setProperty('rate', 150)     # Tốc độ nói
engine.setProperty('volume', 0.9)   # Âm lượng (0.0 - 1.0)

engine.say("Xin chào! Tôi là trợ lý Python.")
engine.runAndWait()</code></pre>
        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ pyttsx3 vs gTTS</div>
            <strong>pyttsx3</strong>: Chạy offline, không cần internet, hỗ trợ nhiều giọng.<br>
            <strong>gTTS</strong>: Dùng Google Translate API, cần internet, chất lượng giọng tốt hơn.
        </div>

        <h3>3.2 gTTS — Google Text-to-Speech</h3>
        <pre><code class="language-python"># pip install gTTS
from gtts import gTTS
import os

tts = gTTS(text="Xin chào Việt Nam!", lang="vi")
tts.save("output.mp3")
os.system("start output.mp3")  # Phát file âm thanh</code></pre>

        <h2>4. Speech Recognition — Nhận diện giọng nói</h2>
        <pre><code class="language-python"># pip install SpeechRecognition pyaudio
import speech_recognition as sr

recognizer = sr.Recognizer()

with sr.Microphone() as source:
    print("🎤 Đang nghe... Hãy nói gì đó!")
    recognizer.adjust_for_ambient_noise(source)
    audio = recognizer.listen(source)

try:
    text = recognizer.recognize_google(audio, language="vi-VN")
    print(f"Bạn nói: {text}")
except sr.UnknownValueError:
    print("❌ Không nhận diện được giọng nói!")
except sr.RequestError:
    print("❌ Lỗi kết nối Google API!")</code></pre>

        <h2>5. Flask — Web Python</h2>
        <pre><code class="language-python"># pip install flask
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)  # http://127.0.0.1:5000</code></pre>

        <h3>Flask vs Django</h3>
        <table>
            <tr><th>Flask</th><th>Django</th></tr>
            <tr><td>Nhẹ, linh hoạt</td><td>Toàn diện, nhiều tính năng</td></tr>
            <tr><td>Dự án nhỏ/vừa</td><td>Dự án lớn, phức tạp</td></tr>
            <tr><td>Dễ học</td><td>Cần thời gian hơn</td></tr>
        </table>

        <h2>6. Pseudocode — Mã giả</h2>
        <p>Mã giả là bản phác thảo thuật toán bằng ngôn ngữ tự nhiên, giúp tư duy trước khi code.</p>
        <pre><code class="language-python"># Pseudocode: Tìm số lớn nhất trong 3 số
# Bước 1: Giả sử số 1 là lớn nhất
# Bước 2: Nếu số 2 > lớn nhất → cập nhật
# Bước 3: Nếu số 3 > lớn nhất → cập nhật

SoThu1 = 7
SoThu2 = 16
SoThu3 = 3
SoLonNhat = SoThu1
if SoThu2 > SoLonNhat:
    SoLonNhat = SoThu2
if SoThu3 > SoLonNhat:
    SoLonNhat = SoThu3
print("Lớn nhất:", SoLonNhat)</code></pre>

        <h2>7. Mẹo học Python hiệu quả</h2>
        <ul>
            <li>🔹 Hiểu <strong>cú pháp cơ bản</strong>: biến, kiểu, vòng lặp, hàm</li>
            <li>🔹 Nắm vững <strong>cấu trúc dữ liệu</strong>: list, tuple, dict, set</li>
            <li>🔹 Học qua <strong>dự án nhỏ</strong>: máy tính, quản lý danh bạ, game</li>
            <li>🔹 Code <strong>mỗi ngày</strong> ít nhất 1 giờ</li>
            <li>🔹 <strong>Debug</strong> tự mình tìm lỗi, đọc hiểu lỗi</li>
            <li>🔹 Luyện trên <strong>LeetCode, HackerRank, CodeWars</strong></li>
        </ul>

        <h2>8. Regular Expressions (regex) — Module re 🔍</h2>
        <p><strong>Regex</strong> là chuỗi mẫu dùng để tìm kiếm, trích xuất, thay thế văn bản theo pattern.</p>
        <pre><code class="language-python">import re</code></pre>
        <table>
            <tr><th>Hàm</th><th>Chức năng</th></tr>
            <tr><td><code>re.search()</code></td><td>Tìm match đầu tiên</td></tr>
            <tr><td><code>re.findall()</code></td><td>Tìm TẤT CẢ matches → list</td></tr>
            <tr><td><code>re.sub()</code></td><td>Thay thế pattern</td></tr>
            <tr><td><code>re.match()</code></td><td>Match từ ĐẦU chuỗi</td></tr>
            <tr><td><code>re.split()</code></td><td>Tách chuỗi theo pattern</td></tr>
        </table>

        <h3>Ký hiệu regex phổ biến:</h3>
        <table>
            <tr><th>Pattern</th><th>Ý nghĩa</th><th>Ví dụ</th></tr>
            <tr><td><code>\d</code></td><td>Chữ số (0-9)</td><td>\d+ = nhiều số</td></tr>
            <tr><td><code>\w</code></td><td>Chữ/số/gạch dưới</td><td>\w+ = 1 từ</td></tr>
            <tr><td><code>\s</code></td><td>Khoảng trắng</td><td>\s+ = nhiều space</td></tr>
            <tr><td><code>.</code></td><td>Bất kỳ ký tự nào</td><td>.+ = mọi thứ</td></tr>
            <tr><td><code>^</code> / <code>$</code></td><td>Đầu / cuối chuỗi</td><td>^Hello, end$</td></tr>
            <tr><td><code>*</code> / <code>+</code> / <code>?</code></td><td>0+, 1+, 0-1 lần</td><td>a* ab+ c?</td></tr>
            <tr><td><code>[abc]</code></td><td>a hoặc b hoặc c</td><td>[0-9] = số</td></tr>
            <tr><td><code>(group)</code></td><td>Nhóm capture</td><td>(\d{4})</td></tr>
        </table>

        <pre><code class="language-python">import re

# Tìm tất cả số trong chuỗi
text = "Điểm: Toán 8.5, Lý 7.0, Hóa 9.2"
numbers = re.findall(r'\d+\.?\d*', text)
print(numbers)   # ['8.5', '7.0', '9.2']

# Kiểm tra email hợp lệ
email = "user@gmail.com"
if re.match(r'^[\w.+-]+@[\w-]+\.[\w.]+$', email):
    print("✅ Email hợp lệ")

# Thay thế
result = re.sub(r'\d+', 'X', "Mã: A123, B456")
print(result)   # Mã: AX, BX</code></pre>

        <h2>9. Module os — Tương tác hệ điều hành 💻</h2>
        <pre><code class="language-python">import os

# Thư mục hiện tại
print(os.getcwd())

# Liệt kê files
print(os.listdir("."))

# Tạo / xóa thư mục
os.makedirs("a/b/c", exist_ok=True)
os.rmdir("a/b/c")

# Kiểm tra tồn tại
print(os.path.exists("file.txt"))
print(os.path.isfile("file.txt"))
print(os.path.isdir("folder"))

# Thông tin file
print(os.path.getsize("file.txt"))   # bytes
print(os.path.abspath("file.txt"))   # đường dẫn tuyệt đối
print(os.path.splitext("img.png"))   # ('img', '.png')

# Biến môi trường
print(os.environ.get("PATH"))
os.environ["MY_VAR"] = "hello"</code></pre>

        <h2>10. Module sys — Hệ thống Python ⚙️</h2>
        <pre><code class="language-python">import sys

# Phiên bản Python
print(sys.version)       # 3.11.5
print(sys.platform)      # win32 / linux / darwin

# Tham số dòng lệnh
# python script.py arg1 arg2
print(sys.argv)          # ['script.py', 'arg1', 'arg2']

# Đường dẫn tìm module
print(sys.path)

# Kích thước object (bytes)
print(sys.getsizeof([1,2,3]))   # 88
print(sys.getsizeof("hello"))   # 54

# Thoát chương trình
# sys.exit(0)   # Thoát bình thường
# sys.exit(1)   # Thoát với lỗi</code></pre>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Text-to-Speech cơ bản",
            content: "Tạo chương trình đọc văn bản bằng giọng nói với pyttsx3.",
            code: `# pip install pyttsx3
import pyttsx3

def doc_van_ban(text, rate=150):
    engine = pyttsx3.init()
    engine.setProperty('rate', rate)
    engine.setProperty('volume', 0.9)
    
    # Liệt kê giọng nói có sẵn
    voices = engine.getProperty('voices')
    print(f"Có {len(voices)} giọng nói:")
    for i, voice in enumerate(voices):
        print(f"  [{i}] {voice.name}")
    
    engine.say(text)
    engine.runAndWait()

# Sử dụng
doc_van_ban("Xin chào! Tôi là trợ lý Python.")
doc_van_ban("Hôm nay bạn học bài gì?", rate=120)`,
            explanation: "pyttsx3 chạy offline, không cần internet. setProperty thay đổi tốc độ và âm lượng."
        },
        {
            title: "Bài tập 02 - gTTS lưu file âm thanh",
            content: "Dùng gTTS tạo file MP3 từ văn bản tiếng Việt.",
            code: `# pip install gTTS
from gtts import gTTS
import os

def tao_audio(text, filename="output.mp3", lang="vi"):
    tts = gTTS(text=text, lang=lang, slow=False)
    tts.save(filename)
    print(f"✅ Đã lưu: {filename}")
    return filename

# Tạo các file âm thanh
tao_audio("Chào mừng bạn đến với Python!", "chao.mp3")
tao_audio("Hôm nay chúng ta học về Text to Speech.", "bai_hoc.mp3")

# Tạo bảng cửu chương bằng giọng nói
text = ""
for i in range(1, 11):
    text += f"5 nhân {i} bằng {5*i}. "
tao_audio(text, "cuu_chuong_5.mp3")
print("✅ Đã tạo bảng cửu chương 5!")`,
            explanation: "gTTS cần internet (dùng Google API). lang='vi' cho giọng tiếng Việt. slow=False đọc tốc độ bình thường."
        },
        {
            title: "Bài tập 03 - Speech Recognition",
            content: "Nhận diện giọng nói và chuyển thành văn bản.",
            code: `# pip install SpeechRecognition pyaudio
import speech_recognition as sr

def nghe_giong_noi():
    recognizer = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("🎤 Đang nghe... (nói trong 5 giây)")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        
        try:
            audio = recognizer.listen(source, timeout=5)
            print("⏳ Đang xử lý...")
            
            # Nhận diện tiếng Việt
            text = recognizer.recognize_google(audio, language="vi-VN")
            print(f"✅ Bạn nói: {text}")
            return text
            
        except sr.WaitTimeoutError:
            print("⏰ Hết thời gian chờ!")
        except sr.UnknownValueError:
            print("❌ Không nhận diện được!")
        except sr.RequestError as e:
            print(f"❌ Lỗi API: {e}")
    
    return None

# Chạy
ket_qua = nghe_giong_noi()
if ket_qua:
    print(f"Kết quả: {ket_qua}")`,
            explanation: "SpeechRecognition dùng Google API để nhận diện giọng nói. language='vi-VN' cho tiếng Việt."
        },
        {
            title: "Bài tập 04 - Flask Hello World",
            content: "Tạo web đơn giản với Flask.",
            code: `# File: app.py
# pip install flask

from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "<h1>Xin chào Flask! 🐍</h1>"

@app.route("/info")
def info():
    return "<h1>Trang thông tin</h1><p>Đây là web Python</p>"

if __name__ == "__main__":
    app.run(debug=True, port=5000)

# Sau khi chạy, mở browser: http://127.0.0.1:5000`,
            explanation: "@app.route() định nghĩa URL. debug=True tự reload khi sửa code."
        },
        {
            title: "Bài tập 05 - Regex thực hành 🔍",
            content: "Dùng regex để validate, tìm kiếm và trích xuất dữ liệu.",
            code: `import re\n\n# 1. Validate email\ndef validate_email(email):\n    pattern = r'^[\\w.+-]+@[\\w-]+\\.[\\w.]+$'\n    return bool(re.match(pattern, email))\n\nemails = ["an@gmail.com", "bad@", "test@yahoo.vn", "@no.com"]\nfor e in emails:\n    status = "✅" if validate_email(e) else "❌"\n    print(f"{status} {e}")\n\n# 2. Trích xuất SĐT\ntext = "Liên hệ: 0901-234-567 hoặc 0912.345.678 hoặc 0923456789"\nphones = re.findall(r'0\\d{2,3}[-.\\s]?\\d{3}[-.\\s]?\\d{3,4}', text)\nprint(f"\\nSĐT tìm được: {phones}")\n\n# 3. Ẩn thông tin nhạy cảm\ndata = "CMND: 123456789, SĐT: 0901234567"\nmasked = re.sub(r'\\d{3}(\\d+)\\d{2}', lambda m: "***" + "*"*len(m.group(1)) + "**", data)\nprint(f"Đã ẩn: {masked}")\n\n# 4. Parse log file\nlog = "[2025-03-06 10:30:15] ERROR: Connection timeout"\nmatch = re.match(r'\\[(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2})\\] (\\w+): (.+)', log)\nif match:\n    date, time, level, msg = match.groups()\n    print(f"\\nNgày: {date}, Giờ: {time}")\n    print(f"Level: {level}, Message: {msg}")`,
            explanation: "re.findall() tìm tất cả matches. re.sub() thay thế. re.match().groups() trích xuất nhóm."
        },
        {
            title: "Bài tập 06 - os module thực hành 💻",
            content: "Quản lý file/thư mục, duyệt cây thư mục với os.",
            code: `import os\n\n# 1. Thông tin hệ thống\nprint(f"📂 Thư mục hiện tại: {os.getcwd()}")\nprint(f"💻 Hệ điều hành: {os.name}")\nprint(f"👤 User: {os.environ.get('USERNAME', os.environ.get('USER', 'N/A'))}")\n\n# 2. Tạo cấu trúc thư mục cho project\ndef tao_project(name):\n    dirs = ["src", "tests", "docs", "data"]\n    for d in dirs:\n        path = os.path.join(name, d)\n        os.makedirs(path, exist_ok=True)\n        print(f"  📁 Tạo: {path}")\n    # Tạo file rỗng\n    files = ["README.md", "src/main.py", "tests/test_main.py"]\n    for f in files:\n        path = os.path.join(name, f)\n        with open(path, "w") as file:\n            file.write(f"# {os.path.basename(f)}\\n")\n        print(f"  📄 Tạo: {path}")\n\ntao_project("my_project")\n\n# 3. Duyệt cây thư mục\nprint(f"\\n🌳 Cây thư mục:")\nfor root, dirs, files in os.walk("my_project"):\n    level = root.replace("my_project", "").count(os.sep)\n    indent = "  " * level\n    print(f"{indent}📁 {os.path.basename(root)}/")\n    for f in files:\n        print(f"{indent}  📄 {f} ({os.path.getsize(os.path.join(root, f))} bytes)")\n\n# 4. Tìm file theo extension\ndef tim_file(folder, ext):\n    result = []\n    for root, dirs, files in os.walk(folder):\n        for f in files:\n            if f.endswith(ext):\n                result.append(os.path.join(root, f))\n    return result\n\npy_files = tim_file("my_project", ".py")\nprint(f"\\n🐍 File Python: {py_files}")`,
            explanation: "os.walk() duyệt đệ quy. os.makedirs() tạo nested dirs. os.path xử lý đường dẫn an toàn."
        },
        {
            title: "Bài tập 07 - sys module & CLI 🖥️",
            content: "Sử dụng sys để tạo công cụ dòng lệnh.",
            code: `import sys\nimport os\n\n# 1. Thông tin Python\nprint(f"🐍 Python {sys.version}")\nprint(f"💻 Platform: {sys.platform}")\nprint(f"📦 Executable: {sys.executable}")\n\n# 2. Kích thước các kiểu dữ liệu\ndata_types = {\n    "int(0)": 0, "int(1M)": 1000000,\n    "float": 3.14, "str ''": "",\n    "str 'hello'": "hello", "list []": [],\n    "list [1,2,3]": [1,2,3], "dict {}": {},\n    "set()": set(), "True": True, "None": None\n}\n\nprint(f"\\n📊 Kích thước kiểu dữ liệu:")\nfor name, obj in data_types.items():\n    print(f"  {name:15}: {sys.getsizeof(obj):>4} bytes")\n\n# 3. Giả lập CLI tool\ndef cli_calculator():\n    """Máy tính từ dòng lệnh"""\n    # Giả lập sys.argv\n    args = ["calc.py", "add", "10", "20"]\n    \n    if len(args) < 4:\n        print("Cách dùng: python calc.py <add|sub|mul|div> <a> <b>")\n        return\n    \n    op, a, b = args[1], float(args[2]), float(args[3])\n    ops = {"add": a+b, "sub": a-b, "mul": a*b, "div": a/b if b else "Err"}\n    \n    if op in ops:\n        print(f"\\n🔢 {a} {op} {b} = {ops[op]}")\n    else:\n        print(f"❌ Phép tính '{op}' không hợp lệ!")\n\ncli_calculator()\n\n# 4. sys.path — nơi Python tìm modules\nprint(f"\\n📂 Module paths (top 5):")\nfor p in sys.path[:5]:\n    print(f"  {p}")`,
            explanation: "sys.argv nhận tham số CLI. sys.getsizeof() đo bộ nhớ. sys.path chứa đường dẫn tìm module."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 11: TTS & Chương 12: Speech Recognition)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

📢 PHẦN 1: Text-to-Speech (TTS)

1. Thư viện pyttsx3 dùng để làm gì?
   A. Nhận diện giọng nói
   B. Chuyển văn bản thành giọng nói (Text-to-Speech)
   C. Xử lý hình ảnh
   D. Tạo giao diện GUI

2. Để cài đặt pyttsx3, dùng lệnh gì?
   A. import pyttsx3
   B. pip install pyttsx3
   C. install pyttsx3
   D. python -m pyttsx3

3. Phương thức nào dùng để nói văn bản trong pyttsx3?
   A. engine.speak()
   B. engine.say()
   C. engine.talk()
   D. engine.read()

4. Phương thức engine.runAndWait() dùng để:
   A. Tạm dừng chương trình
   B. Chờ engine xử lý và phát âm thanh xong
   C. Khởi động engine
   D. Đọc file âm thanh

5. Tham số 'rate' trong pyttsx3 dùng để:
   A. Thay đổi âm lượng
   B. Thay đổi tốc độ nói
   C. Thay đổi giọng nói
   D. Thay đổi ngôn ngữ

6. Sự khác biệt chính giữa pyttsx3 và gTTS là:
   A. pyttsx3 cần internet, gTTS không cần
   B. pyttsx3 chạy offline, gTTS cần internet
   C. Không có sự khác biệt
   D. gTTS miễn phí, pyttsx3 trả phí

🎤 PHẦN 2: Speech Recognition (Nhận diện giọng nói)

7. Thư viện SpeechRecognition dùng để:
   A. Phát giọng nói
   B. Chuyển giọng nói thành văn bản
   C. Ghi âm nhạc
   D. Chỉnh sửa âm thanh

8. Để nhận diện tiếng Việt, tham số language nào đúng?
   A. language="vi"
   B. language="vi-VN"
   C. language="vietnamese"
   D. language="vn"

9. Phương thức recognizer.listen(source) dùng để:
   A. Phát âm thanh
   B. Thu âm từ microphone
   C. Đọc file văn bản
   D. Hiển thị text

10. Khi giọng nói không nhận diện được, exception nào được raise?
    A. ValueError
    B. sr.UnknownValueError
    C. TypeError
    D. FileNotFoundError

11. Để cài SpeechRecognition, lệnh đúng là:
    A. pip install speech_recognition
    B. pip install SpeechRecognition
    C. pip install sr
    D. pip install voice

12. Phương thức adjust_for_ambient_noise() dùng để:
    A. Tăng âm lượng
    B. Điều chỉnh cho tiếng ồn môi trường
    C. Lọc giọng nói
    D. Ghi âm nền`,
            code: `# ĐÁP ÁN:
# === PHẦN TTS ===
# 1. B (Chuyển văn bản thành giọng nói)
# 2. B (pip install pyttsx3)
# 3. B (engine.say() — thêm text vào hàng đợi phát)
# 4. B (Chờ engine xử lý và phát âm thanh xong)
# 5. B (Thay đổi tốc độ nói — mặc định khoảng 200)
# 6. B (pyttsx3 offline, gTTS cần internet qua Google API)
#
# === PHẦN SPEECH RECOGNITION ===
# 7. B (Chuyển giọng nói thành văn bản — Speech-to-Text)
# 8. B (language="vi-VN" — mã ngôn ngữ chuẩn)
# 9. B (Thu âm từ microphone)
# 10. B (sr.UnknownValueError — không nhận diện được)
# 11. B (pip install SpeechRecognition — viết hoa đúng)
# 12. B (Điều chỉnh cho tiếng ồn môi trường — cải thiện nhận diện)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. pyttsx3 (TTS offline), gTTS (TTS online), SpeechRecognition (Speech-to-Text)."
        },
        {
            title: "📝 Câu hỏi ôn tập - regex, os, sys",
            content: `Trả lời các câu hỏi trắc nghiệm nâng cao:\n\n1. re.findall(r'\\d+', "a1b23c456") cho kết quả:\n   A. ["1", "23", "456"]\n   B. ["a", "b", "c"]\n   C. ["1"]\n   D. 480\n\n2. re.sub() dùng để:\n   A. Tìm kiếm\n   B. Thay thế theo pattern\n   C. Tách chuỗi\n   D. Nối chuỗi\n\n3. Ký hiệu \\w trong regex match với:\n   A. Chỉ chữ cái\n   B. Chữ cái, số và gạch dưới\n   C. Chỉ số\n   D. Khoảng trắng\n\n4. os.getcwd() trả về:\n   A. Danh sách file\n   B. Thư mục hiện tại\n   C. Tên file\n   D. Kích thước file\n\n5. os.path.exists() trả về kiểu gì?\n   A. string\n   B. int\n   C. bool\n   D. list\n\n6. os.walk() dùng để:\n   A. Xóa thư mục\n   B. Duyệt đệ quy cây thư mục\n   C. Tạo file\n   D. Di chuyển file\n\n7. sys.argv là gì?\n   A. Phiên bản Python\n   B. List tham số dòng lệnh\n   C. Đường dẫn module\n   D. Biến môi trường\n\n8. sys.getsizeof() trả về:\n   A. Kiểu dữ liệu\n   B. Kích thước object (bytes)\n   C. Độ dài chuỗi\n   D. Số phần tử\n\n9. os.makedirs("a/b/c", exist_ok=True) làm gì?\n   A. Chỉ tạo thư mục c\n   B. Tạo cả a, b, c lồng nhau\n   C. Xóa thư mục\n   D. Báo lỗi nếu tồn tại\n\n10. re.match() khác re.search() ở điểm nào?\n    A. match tìm từ ĐẦU chuỗi, search tìm BẤT KỲ đâu\n    B. Không khác nhau\n    C. search nhanh hơn\n    D. match tìm tất cả`,
            code: `# ĐÁP ÁN:\n# 1. A (["1", "23", "456"] — \\d+ tìm 1+ chữ số)\n# 2. B (sub = substitute, thay thế theo pattern)\n# 3. B (\\w = word character: chữ, số, gạch dưới)\n# 4. B (getcwd = get current working directory)\n# 5. C (bool — True/False)\n# 6. B (walk duyệt đệ quy, trả về root, dirs, files)\n# 7. B (argv = argument vector, list tham số CLI)\n# 8. B (Kích thước object trong bộ nhớ, tính bằng bytes)\n# 9. B (makedirs tạo nested, exist_ok=True không lỗi nếu đã có)\n# 10. A (match chỉ đầu chuỗi, search tìm bất kỳ vị trí nào)`,
            explanation: "Nguồn: Lập trình Python Nâng Cao. re (regex), os (hệ điều hành), sys (hệ thống Python) là 3 built-in modules quan trọng."
        }
    ]
};
