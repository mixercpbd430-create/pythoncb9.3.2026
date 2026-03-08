// Chương 12: Danh sách (Lists)
const chapter12 = {
        id: 12,
        title: "Danh sách (Lists)",
        description: "List: tạo, truy cập, slicing, append, insert, remove, pop, sort, del vs pop, min/max/sum.",
        theory: `
        <h2>1. List trong Python là gì?</h2>
        <p>List là kiểu dữ liệu lưu trữ tập hợp phần tử, có thể thay đổi (mutable), chứa nhiều kiểu dữ liệu khác nhau.</p>
        <pre><code class="language-python">numbers = [1, 2, 3, 4, 5]
monhoc = ["C#", "Python", "Java"]
mixed = [1, "Hello", 3.14, True]</code></pre>

        <h2>2. Truy cập phần tử</h2>
        <pre><code class="language-python">lst = [10, 20, 30, 40]
print(lst[0])    # 10 (đầu tiên)
print(lst[-1])   # 40 (cuối cùng)
print(lst[1])    # 20</code></pre>

        <h2>3. Cắt danh sách (Slicing)</h2>
        <pre><code class="language-python">lst = [10, 20, 30, 40, 50]
print(lst[1:4])   # [20, 30, 40]
print(lst[:3])    # [10, 20, 30]
print(lst[2:])    # [30, 40, 50]</code></pre>

        <h2>4. Thêm phần tử</h2>
        <pre><code class="language-python">lst = [1, 2, 3]
lst.append(4)           # Thêm cuối → [1, 2, 3, 4]
lst.insert(1, 15)       # Thêm tại vị trí 1 → [1, 15, 2, 3, 4]</code></pre>

        <h2>5. Xóa phần tử</h2>
        <pre><code class="language-python">lst = [1, 2, 3, 4, 5]
lst.remove(3)           # Xóa theo giá trị → [1, 2, 4, 5]
lst.pop(2)              # Xóa theo chỉ mục → [1, 2, 5]
lst.pop()               # Xóa cuối → [1, 2]</code></pre>

        <h2>6. del vs pop()</h2>
        <table>
            <tr><th>Tiêu chí</th><th>del</th><th>pop()</th></tr>
            <tr><td>Loại</td><td>Câu lệnh (statement)</td><td>Phương thức (method)</td></tr>
            <tr><td>Trả về</td><td>Không trả về giá trị</td><td>Trả về giá trị đã xóa</td></tr>
        </table>
        <pre><code class="language-python"># del — không trả về
lst = [1, 2, 3, 4]
del lst[1]
print(lst)          # [1, 3, 4]

# pop() — trả về giá trị
lst = [1, 2, 3, 4]
x = lst.pop(1)
print(lst)          # [1, 3, 4]
print(x)            # 2 ← giá trị đã xóa</code></pre>

        <h2>7. Sắp xếp</h2>
        <pre><code class="language-python">lst = [3, 1, 4, 5, 2]
lst.sort()                # Tăng dần → [1, 2, 3, 4, 5]
lst.sort(reverse=True)    # Giảm dần → [5, 4, 3, 2, 1]</code></pre>

        <h2>8. Các hàm hữu ích</h2>
        <pre><code class="language-python">my_list = [5, 1, 2, 8]
print(max(my_list))    # 8
print(min(my_list))    # 1
print(sum(my_list))    # 16
print(len(my_list))    # 4</code></pre>

        <h2>9. Thuật toán sắp xếp (Sorting Algorithms) 🚀</h2>
        <h3>9.1 Bubble Sort (Sắp xếp nổi bọt)</h3>
        <p>So sánh và hoán đổi <strong>2 phần tử liền kề</strong> liên tục. Phần tử lớn nhất sẽ "nổi" lên cuối sau mỗi vòng lặp.</p>
        <pre><code class="language-python">def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # Hoán đổi
                swapped = True
        if not swapped:   # Nếu không hoán đổi → đã sắp xếp
            break
    return arr

data = [64, 34, 25, 12, 22, 11, 90]
print("Trước:", data)
print("Sau:  ", bubble_sort(data))</code></pre>

        <div class="note-box note-box--info">
            <div class="note-title">ℹ️ Độ phức tạp Bubble Sort</div>
            <strong>Trung bình / Xấu nhất:</strong> O(n²) — chậm với dữ liệu lớn.<br>
            <strong>Tốt nhất:</strong> O(n) — khi mảng đã sắp xếp (nhờ cờ <code>swapped</code>).<br>
            Phù hợp để <strong>học thuật toán</strong>, không dùng trong thực tế với dữ liệu lớn.
        </div>

        <h3>9.2 Selection Sort (Sắp xếp chọn)</h3>
        <p>Tìm phần tử <strong>nhỏ nhất</strong> trong phần chưa sắp xếp, hoán đổi với vị trí đầu tiên.</p>
        <pre><code class="language-python">def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Hoán đổi phần tử nhỏ nhất với vị trí i
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

data = [29, 10, 14, 37, 13]
print("Trước:", data)
print("Sau:  ", selection_sort(data))</code></pre>

        <div class="note-box note-box--tip">
            <div class="note-title">💡 So sánh Bubble vs Selection Sort</div>
            <table>
                <tr><th>Tiêu chí</th><th>Bubble Sort</th><th>Selection Sort</th></tr>
                <tr><td>Cách hoạt động</td><td>Hoán đổi liền kề</td><td>Tìm min rồi hoán đổi</td></tr>
                <tr><td>Số lần hoán đổi</td><td>Nhiều</td><td>Ít (tối đa n-1)</td></tr>
                <tr><td>Độ phức tạp</td><td>O(n²)</td><td>O(n²)</td></tr>
                <tr><td>Ổn định?</td><td>Có (stable)</td><td>Không (unstable)</td></tr>
            </table>
        </div>

        <h2>10. List Slicing nâng cao 🚀</h2>
        <h3>10.1 Gán giá trị qua Slicing</h3>
        <pre><code class="language-python"># Thay thế một phần list
lst = [1, 2, 3, 4, 5]
lst[1:3] = [20, 30]        # Thay vị trí 1-2
print(lst)   # [1, 20, 30, 4, 5]

# Thay bằng số phần tử khác nhau
lst[1:3] = [200, 300, 400]
print(lst)   # [1, 200, 300, 400, 4, 5]

# Xóa một phần bằng slicing
lst[1:4] = []
print(lst)   # [1, 4, 5]

# Chèn không thay thế
lst[1:1] = [2, 3]
print(lst)   # [1, 2, 3, 4, 5]</code></pre>

        <h3>10.2 Copy list — Shallow vs Deep</h3>
        <pre><code class="language-python">import copy

original = [1, [2, 3], 4]

# Shallow copy (chỉ copy tầng 1)
shallow = original[:]          # hoặc original.copy()
shallow[0] = 99
print(original)   # [1, [2, 3], 4] — không bị ảnh hưởng

shallow[1][0] = 99
print(original)   # [1, [99, 3], 4] — BỊ ảnh hưởng! (list lồng)

# Deep copy (copy tất cả tầng)
original = [1, [2, 3], 4]
deep = copy.deepcopy(original)
deep[1][0] = 99
print(original)   # [1, [2, 3], 4] — KHÔNG bị ảnh hưởng</code></pre>

        <h2>11. List Unpacking (Giải nén danh sách) 🚀</h2>
        <pre><code class="language-python"># Unpacking cơ bản
a, b, c = [10, 20, 30]
print(a, b, c)   # 10 20 30

# Unpacking với * (phần còn lại)
first, *middle, last = [1, 2, 3, 4, 5]
print(first)    # 1
print(middle)   # [2, 3, 4]
print(last)     # 5

# Swap 2 biến không cần temp
x, y = 10, 20
x, y = y, x
print(x, y)   # 20 10

# Unpacking trong vòng lặp
students = [("An", 8.5), ("Bình", 9.0), ("Cường", 7.5)]
for name, score in students:
    print(f"{name}: {score}")</code></pre>

        <h2>12. Các phương thức List nâng cao 🚀</h2>
        <table>
            <tr><th>Phương thức</th><th>Mô tả</th><th>Ví dụ</th></tr>
            <tr><td><code>extend()</code></td><td>Nối list khác vào cuối</td><td><code>[1,2].extend([3,4])</code> → [1,2,3,4]</td></tr>
            <tr><td><code>index(x)</code></td><td>Tìm vị trí đầu tiên của x</td><td><code>[1,2,3].index(2)</code> → 1</td></tr>
            <tr><td><code>count(x)</code></td><td>Đếm số lần xuất hiện</td><td><code>[1,2,2,3].count(2)</code> → 2</td></tr>
            <tr><td><code>reverse()</code></td><td>Đảo ngược tại chỗ</td><td><code>[1,2,3].reverse()</code> → [3,2,1]</td></tr>
            <tr><td><code>clear()</code></td><td>Xóa tất cả phần tử</td><td><code>lst.clear()</code> → []</td></tr>
            <tr><td><code>copy()</code></td><td>Shallow copy</td><td><code>new = lst.copy()</code></td></tr>
        </table>

        <pre><code class="language-python"># extend vs append
a = [1, 2]
a.append([3, 4])     # Thêm list như 1 phần tử
print(a)   # [1, 2, [3, 4]]

b = [1, 2]
b.extend([3, 4])     # Nối từng phần tử
print(b)   # [1, 2, 3, 4]

# + operator (tạo list mới)
c = [1, 2] + [3, 4]
print(c)   # [1, 2, 3, 4]</code></pre>
    `,
        exercises: [
                {
                        title: "Bài tập 01 - Thao tác List cơ bản",
                        content: "Tạo list, thêm, xóa, hiển thị.",
                        code: `ds = [10, 20, 30, 40, 50]
print("Ban đầu:", ds)

ds.append(60)
print("Append 60:", ds)

ds.insert(2, 25)
print("Insert 25 vị trí 2:", ds)

ds.remove(40)
print("Remove 40:", ds)

x = ds.pop(0)
print(f"Pop vị trí 0 (={x}):", ds)

print(f"\\nMax: {max(ds)}, Min: {min(ds)}")
print(f"Tổng: {sum(ds)}, Số phần tử: {len(ds)}")`,
                        explanation: "append()=cuối, insert()=vị trí, remove()=giá trị, pop()=chỉ mục+trả về."
                },
                {
                        title: "Bài tập 02 - Sắp xếp và tìm kiếm",
                        content: "Sắp xếp danh sách điểm và tìm min/max.",
                        code: `diem = [7.5, 8, 6, 9.5, 5, 8.5]

# Sắp xếp tăng dần
diem_tang = sorted(diem)
print("Tăng dần:", diem_tang)

# Sắp xếp giảm dần
diem_giam = sorted(diem, reverse=True)
print("Giảm dần:", diem_giam)

# Tìm cao nhất, thấp nhất
print(f"\\nĐiểm cao nhất: {max(diem)}")
print(f"Điểm thấp nhất: {min(diem)}")
print(f"Trung bình: {sum(diem)/len(diem):.1f}")`,
                        explanation: "sorted() trả list mới (không đổi gốc). .sort() thay đổi list gốc."
                },
                {
                        title: "Bài tập 03 - Slicing nâng cao",
                        content: "Cắt danh sách theo nhiều cách.",
                        code: `ds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print("ds[2:7]  →", ds[2:7])     # [2, 3, 4, 5, 6]
print("ds[:5]   →", ds[:5])      # [0, 1, 2, 3, 4]
print("ds[5:]   →", ds[5:])      # [5, 6, 7, 8, 9]
print("ds[::2]  →", ds[::2])     # [0, 2, 4, 6, 8]
print("ds[::-1] →", ds[::-1])    # [9, 8, 7, ..., 0] đảo ngược
print("ds[-3:]  →", ds[-3:])     # [7, 8, 9]`,
                        explanation: "ds[start:end:step]. [::-1] đảo ngược. Chỉ mục âm đếm từ cuối."
                },
                {
                        title: "Bài tập 04 - Cài đặt Bubble Sort 🚀",
                        content: "Cài đặt thuật toán Bubble Sort có hiển thị từng bước hoán đổi, kèm đếm số lần so sánh và hoán đổi.",
                        code: `def bubble_sort_visual(arr):
    """Bubble Sort có hiển thị từng bước."""
    n = len(arr)
    so_sanh = 0
    hoan_doi = 0
    
    print(f"Mảng ban đầu: {arr}")
    print("-" * 40)
    
    for i in range(n - 1):
        swapped = False
        print(f"\\nVòng {i + 1}:")
        
        for j in range(n - 1 - i):
            so_sanh += 1
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                hoan_doi += 1
                swapped = True
                print(f"  Hoán đổi {arr[j]} ↔ {arr[j+1]}: {arr}")
        
        if not swapped:
            print("  Không cần hoán đổi → ĐÃ SẮP XẾP!")
            break
    
    print(f"\\n{'='*40}")
    print(f"Kết quả: {arr}")
    print(f"Số lần so sánh: {so_sanh}")
    print(f"Số lần hoán đổi: {hoan_doi}")
    return arr

# Test
data = [64, 34, 25, 12, 22, 11, 90]
bubble_sort_visual(data.copy())`,
                        explanation: "Bubble Sort: O(n²) trung bình. Cờ swapped giúp tối ưu — dừng sớm nếu mảng đã sắp xếp. Hoán đổi bằng a,b = b,a (Pythonic)."
                },
                {
                        title: "Bài tập 05 - Tìm phần tử trùng lặp 🚀",
                        content: "Tìm các phần tử xuất hiện nhiều hơn 1 lần trong list, sử dụng nhiều cách khác nhau.",
                        code: `data = [1, 3, 5, 3, 7, 9, 1, 5, 5, 2]

# === Cách 1: Dùng count() ===
trung_1 = []
for x in data:
    if data.count(x) > 1 and x not in trung_1:
        trung_1.append(x)
print(f"Cách 1 (count): {trung_1}")

# === Cách 2: Dùng set ===
seen = set()
trung_2 = set()
for x in data:
    if x in seen:
        trung_2.add(x)
    seen.add(x)
print(f"Cách 2 (set):   {sorted(trung_2)}")

# === Cách 3: List comprehension + count ===
trung_3 = list(set([x for x in data if data.count(x) > 1]))
print(f"Cách 3 (comp):  {sorted(trung_3)}")

# === Đếm tần suất xuất hiện ===
print("\\n📊 Tần suất:")
unique = sorted(set(data))
for x in unique:
    count = data.count(x)
    bar = "█" * count
    label = " ← trùng!" if count > 1 else ""
    print(f"  {x}: {bar} ({count} lần){label}")`,
                        explanation: "3 cách tìm trùng lặp: count() đơn giản, set() hiệu quả (O(n)), comprehension gọn gàng. set() loại bỏ trùng tự động."
                },
                {
                        title: "Bài tập 06 - List Unpacking & Slicing nâng cao 🚀",
                        content: "Thực hành list unpacking với *, slicing assignment, và các phương thức list nâng cao.",
                        code: `# === 1. Unpacking với * ===
scores = [95, 88, 76, 92, 84, 71, 90]

highest, *middle, lowest_two = sorted(scores, reverse=True)
*rest, last = sorted(scores)
print(f"Điểm cao nhất: {highest}")
print(f"Điểm giữa: {middle}")
print(f"Điểm thấp nhất: {last}")

# === 2. Swap nhiều biến ===
a, b, c = 1, 2, 3
a, b, c = c, a, b    # Xoay vòng
print(f"\\nSau swap: a={a}, b={b}, c={c}")

# === 3. Slicing Assignment ===
lst = list(range(10))
print(f"\\nGốc: {lst}")

lst[2:5] = [20, 30, 40]
print(f"Thay [2:5]: {lst}")

lst[::3] = [100, 200, 300, 400]   # Thay tại step=3
print(f"Thay [::3]: {lst}")

# === 4. extend vs + ===
a = [1, 2, 3]
b = [4, 5, 6]
c = a + b              # list mới
a.extend(b)            # thay đổi a
print(f"\\na + b = {c}")
print(f"a.extend(b) → a = {a}")

# === 5. Đảo ngược và sắp xếp ===
words = ["banana", "apple", "cherry", "date"]
print(f"\\nTheo alphabet: {sorted(words)}")
print(f"Theo độ dài: {sorted(words, key=len)}")
print(f"Theo chữ cuối: {sorted(words, key=lambda w: w[-1])}")`,
                        explanation: "* trong unpacking gom phần còn lại. sorted(key=) sắp xếp theo tiêu chí tùy chỉnh. Slicing assignment thay thế một phần list."
                },
                {
                        title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 5: Mảng 1 chiều)",
                        content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Cách khai báo một List rỗng trong Python:
   A. list = {}
   B. list = []
   C. list = ()
   D. list = ""

2. lst = [10, 20, 30]. Kết quả của lst[-1] là:
   A. 10
   B. 20
   C. 30
   D. Lỗi

3. Phương thức append() dùng để:
   A. Thêm phần tử vào đầu list
   B. Thêm phần tử vào cuối list
   C. Xóa phần tử cuối
   D. Sắp xếp list

4. Sự khác biệt giữa del và pop() là:
   A. del nhanh hơn
   B. pop() trả về giá trị đã xóa, del thì không
   C. del xóa theo giá trị
   D. pop() chỉ xóa phần tử cuối

5. lst = [5, 1, 3]. Sau lst.sort(), kết quả là:
   A. [5, 1, 3]
   B. [1, 3, 5]
   C. [5, 3, 1]
   D. [3, 1, 5]

6. Kết quả của lst[1:4] với lst = [0, 1, 2, 3, 4] là:
   A. [0, 1, 2, 3]
   B. [1, 2, 3]
   C. [1, 2, 3, 4]
   D. [0, 1, 2]

7. Hàm nào tính tổng các phần tử của list?
   A. total()
   B. count()
   C. sum()
   D. add()`,
                        code: `# ĐÁP ÁN:
# 1. B ([] — dấu ngoặc vuông cho list)
# 2. C (30 — chỉ mục -1 là phần tử cuối)
# 3. B (Thêm phần tử vào cuối list)
# 4. B (pop() trả về giá trị, del không trả về)
# 5. B ([1, 3, 5] — sắp xếp tăng dần)
# 6. B ([1, 2, 3] — từ index 1 đến 3)
# 7. C (sum() — tính tổng)`,
                        explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. List: append/insert (thêm), remove/pop/del (xóa), sort (sắp xếp)."
                },
                {
                        title: "📝 Câu hỏi ôn tập nâng cao - Sorting & List Methods 🚀",
                        content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Bubble Sort có độ phức tạp trung bình là:
   A. O(n)
   B. O(n log n)
   C. O(n²)
   D. O(2ⁿ)

2. Kết quả của: first, *rest = [1, 2, 3, 4, 5]   →   rest là gì?
   A. [2, 3, 4, 5]
   B. (2, 3, 4, 5)
   C. 2
   D. [1]

3. Sự khác biệt giữa sorted() và .sort() là:
   A. sorted() chỉ dùng cho số
   B. sorted() trả list mới, .sort() thay đổi list gốc
   C. .sort() nhanh hơn sorted()
   D. Không có khác biệt

4. lst = [1,2]; lst.append([3,4])  →  kết quả lst là gì?
   A. [1, 2, 3, 4]
   B. [1, 2, [3, 4]]
   C. [[1, 2], [3, 4]]
   D. Lỗi`,
                        code: `# ĐÁP ÁN:
# 1. C (O(n²) — Bubble Sort so sánh n*(n-1)/2 lần)
# 2. A ([2, 3, 4, 5] — * gom phần còn lại thành list)
# 3. B (sorted() trả list mới, .sort() thay đổi tại chỗ)
# 4. B ([1, 2, [3, 4]] — append thêm nguyên list, dùng extend để nối)`,
                        explanation: "Nguồn: Giáo trình Python Nâng Cao. Bubble/Selection Sort là nền tảng thuật toán. Unpacking và sorted(key=) là kỹ năng Pythonic."
                }
        ]
};
