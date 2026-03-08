// Chương 1: Giới thiệu về Python
const chapter1 = {
    id: 1,
    title: "Giới thiệu về Python",
    description: "Python là gì, ứng dụng, cài đặt Python & PyCharm/VS Code, trình thông dịch, chương trình đầu tiên.",
    theory: `
        <h2>Python là gì?</h2>
        <p>Python là một ngôn ngữ lập trình cấp cao và dễ tiếp cận hơn đối với những người mới bắt đầu. Nếu so sánh Python với các ngôn ngữ truyền thống như Pascal hay C thì mức độ phức tạp của Python là thấp hơn.</p>

        <h2>Ưu điểm của Python</h2>
        <ul>
            <li><strong>Cú pháp đơn giản:</strong> Dễ đọc và viết hơn rất nhiều so với Pascal hay C. Python tạo điều kiện cho bạn "giao tiếp ngôn ngữ" hơn là phải "học ngôn ngữ" theo cách truyền thống.</li>
            <li><strong>Mã nguồn mở rộng rãi:</strong> Cộng đồng rộng lớn, không ngừng cải thiện. Rất nhiều mã nguồn liên quan đến AI, nhận diện giọng nói có sẵn trên Python.</li>
            <li><strong>Tương thích đa nền tảng:</strong> Từ máy tính cho đến các bo mạch nhúng như MicroBit đều hỗ trợ Python. Phần mềm chỉ cần phát triển một lần có thể sử dụng cho nhiều nền tảng.</li>
        </ul>

        <h2>Trình thông dịch (Interpreter) vs Trình biên dịch (Compiler)</h2>
        <div class="note-box note-box--info">
            <div class="note-title">💡 Kiến thức quan trọng</div>
            <p><strong>Python là ngôn ngữ thông dịch:</strong> Dịch từng lệnh và thực thi lệnh đó, rồi mới dịch tiếp lệnh thứ 2.</p>
            <p><strong>Pascal là ngôn ngữ biên dịch:</strong> Dịch toàn bộ chương trình rồi mới thực thi.</p>
            <p>Chính vì vậy, chương trình Python chỉ là một file văn bản, chỉ khi thực thi nó mới được dịch sang ngôn ngữ mà nền tảng phần cứng hiểu được.</p>
        </div>

        <h2>Cài đặt Python & IDE</h2>
        <h3>Cách 1: VS Code (khuyên dùng cho người mới)</h3>
        <p>Truy cập <a href="https://code.visualstudio.com/" target="_blank">code.visualstudio.com</a>, tải về và cài đặt.</p>

        <h3>Cách 2: PyCharm (chuyên nghiệp)</h3>
        <p>Truy cập <a href="https://www.jetbrains.com/pycharm/download/" target="_blank">jetbrains.com/pycharm</a>, chọn phiên bản Community (miễn phí).</p>

        <h3>Cài đặt Python</h3>
        <p>Truy cập <a href="https://www.python.org/downloads/" target="_blank">python.org/downloads</a> để tải Python 3.x.</p>
        <div class="note-box note-box--warning">
            <div class="note-title">⚠️ Quan trọng</div>
            Khi cài đặt, hãy <strong>tích vào ô "Add Python to PATH"</strong> và <strong>"Install for all users"</strong>, sau đó nhấn Install Now.
        </div>

        <h3>Kiểm tra cài đặt</h3>
        <pre><code class="language-python">python --version</code></pre>

        <h2>Chương trình đầu tiên</h2>
        <pre><code class="language-python">print("Hello World")</code></pre>
        <p>Khi chạy chương trình, kết quả sẽ hiển thị: <code>Hello World</code></p>

        <h2>Hướng dẫn setup PyCharm</h2>
        <ol>
            <li>Mở PyCharm → chọn <strong>Do not import settings</strong> → OK</li>
            <li>Chọn <strong>Skip Remaining and Set Defaults</strong></li>
            <li>Nhấn <strong>Create New Project</strong> → chọn thư mục → nhấn Create</li>
            <li>Mở file <code>main.py</code> → viết code → nhấn nút Run (▶) hoặc Shift+F10</li>
        </ol>
        <div class="note-box note-box--tip">
            <div class="note-title">💡 Mẹo PyCharm</div>
            <p>Đổi tông màu: File → Settings → Appearance → chọn theme ưa thích.</p>
            <p>Đổi cỡ chữ: File → Settings → Editor → Font → thay đổi Size.</p>
        </div>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Kiểm tra Python",
            content: "Kiểm tra phiên bản Python đã cài đặt trên máy.",
            code: `# Mở Terminal (CMD) và gõ:
# python --version

# Trong Python, kiểm tra version:
import sys
print(sys.version)
print(f"Python {sys.version_info.major}.{sys.version_info.minor}")`,
            explanation: "Kiểm tra version Python đảm bảo bạn đang dùng Python 3.x (khuyến nghị 3.8+)."
        },
        {
            title: "Bài tập 02 - Chương trình đầu tiên",
            content: "Viết chương trình in ra thông tin cá nhân.",
            code: `print("==========================")
print("  THÔNG TIN CÁ NHÂN")
print("==========================")
print("Họ tên: Nguyễn Văn A")
print("Tuổi: 20")
print("Lớp: CNTT-K20")
print("Sở thích: Lập trình Python")
print("==========================")`,
            explanation: "Dùng print() để in nội dung ra màn hình. Mỗi lệnh print sẽ xuống dòng."
        },
        {
            title: "Bài tập 03 - Tính toán đơn giản",
            content: "Dùng Python như máy tính để thực hiện các phép toán.",
            code: `print("5 + 3 =", 5 + 3)
print("10 - 4 =", 10 - 4)
print("6 * 7 =", 6 * 7)
print("15 / 4 =", 15 / 4)
print("15 // 4 =", 15 // 4)  # Chia lấy phần nguyên
print("15 % 4 =", 15 % 4)    # Chia lấy dư
print("2 ** 10 =", 2 ** 10)  # Lũy thừa`,
            explanation: "Python hỗ trợ: + (cộng), - (trừ), * (nhân), / (chia), // (chia nguyên), % (dư), ** (lũy thừa)."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 1)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Phát biểu nào là đúng về ngôn ngữ Python?
   A. Ngôn ngữ lập trình cấp thấp
   B. Ngôn ngữ lập trình cấp cao
   C. Ngôn ngữ máy
   D. Ngôn ngữ MicroBit

2. Các lợi thế của Python so với Pascal là gì?
   A. Đơn giản dễ tiếp cận
   B. Tương thích với nhiều nền tảng
   C. Mã nguồn mở với nhiều thư viện hỗ trợ
   D. Tất cả đều đúng

3. Để chuyển từ ngôn ngữ Python sang ngôn ngữ mà máy tính hiểu được, chúng ta cần:
   A. Trình biên dịch Python3
   B. Trình thông dịch Python3
   C. Cả 2 chương trình trên
   D. Tất cả đều sai

4. Đặc điểm nào là đúng cho trình thông dịch?
   A. Dịch từng lệnh và thực thi lệnh đó
   B. Dịch toàn bộ chương trình và thực thi
   C. Tùy trường hợp
   D. Tất cả đều đúng

5. Ngôn ngữ lập trình Python là:
   A. Ngôn ngữ biên dịch
   B. Ngôn ngữ thông dịch
   C. Tất cả đều đúng
   D. Tất cả đều sai`,
            code: `# ĐÁP ÁN:
# 1. B (Ngôn ngữ lập trình cấp cao)
# 2. D (Tất cả đều đúng)
# 3. B (Trình thông dịch Python3)
# 4. A (Dịch từng lệnh và thực thi lệnh đó)
# 5. B (Ngôn ngữ thông dịch)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. Python là ngôn ngữ thông dịch (interpreted), khác với Pascal là ngôn ngữ biên dịch (compiled)."
        }
    ]
};
