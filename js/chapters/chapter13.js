// Chương 13: List - 2 chiều
const chapter13 = {
    id: 13,
    title: "List - 2 chiều",
    description: "Ma trận, list lồng list, bài toán quản lý, min/max/sum cột, duyệt 2 chiều.",
    theory: `
        <h2>1. List 2 chiều là gì?</h2>
        <p>List 2 chiều = list lồng list (list chứa list). Giống ma trận gồm dòng và cột.</p>

        <h2>2. Ma trận số đơn giản</h2>
        <pre><code class="language-python"># Dữ liệu:  1  2  3
#            4  5  6
#            7  8  9

arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Truy cập: arr[dòng][cột]
print(arr[0][1])   # 2 (dòng 0, cột 1)
print(arr[2][0])   # 7 (dòng 2, cột 0)

# Thêm hàng mới
arr.append([10, 11, 12])</code></pre>

        <h2>3. Duyệt list 2 chiều</h2>
        <pre><code class="language-python">for dong in arr:
    for ptu in dong:
        print(ptu, end="\\t")
    print()  # Xuống dòng</code></pre>

        <h2>4. Bài toán quản lý</h2>
        <pre><code class="language-python">data = [
    [1, "Trần A", 8],
    [2, "Lê B", 7],
    [3, "Thị Nâu", 10]
]

# In dạng bảng
print("{:<5} {:<15} {:<6}".format("TT", "Tên", "Điểm"))
print("-" * 26)
for row in data:
    print("{:<5} {:<15} {:<6}".format(*row))</code></pre>

        <h2>5. Thống kê: min, max, sum</h2>
        <pre><code class="language-python">data = [
    [1, "Trần A", 8],
    [2, "Lê B", 7],
    [3, "Thị Nâu", 10]
]

# Điểm cao nhất
max_val = max(data, key=lambda x: x[2])
print("Cao nhất:", max_val)

# Điểm thấp nhất
min_val = min(data, key=lambda x: x[2])
print("Thấp nhất:", min_val)

# Tổng điểm
total = sum(row[2] for row in data)
print("Tổng điểm:", total)</code></pre>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Ma trận và duyệt",
            content: "Tạo ma trận 3x3 và in ra dạng bảng.",
            code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("Ma trận:")
for row in matrix:
    for val in row:
        print(f"{val:4}", end="")
    print()

# Tính tổng tất cả phần tử
tong = sum(val for row in matrix for val in row)
print(f"\\nTổng tất cả: {tong}")`,
            explanation: "2 vòng for lồng: ngoài duyệt dòng, trong duyệt phần tử. sum() với generator expression."
        },
        {
            title: "Bài tập 02 - Quản lý học sinh",
            content: "Tạo danh sách học sinh và thống kê.",
            code: `ds = [
    [1, "Nguyễn An", 8.5],
    [2, "Trần Bình", 7.0],
    [3, "Lê Cúc", 9.2],
    [4, "Phạm Dũng", 6.5],
    [5, "Hoàng Em", 8.0]
]

print("{:<4} {:<15} {:>6} {:<8}".format("TT", "Họ tên", "Điểm", "XL"))
print("-" * 35)

for sv in ds:
    xl = "Giỏi" if sv[2] >= 8 else "Khá" if sv[2] >= 6.5 else "TB"
    print("{:<4} {:<15} {:>6.1f} {:<8}".format(sv[0], sv[1], sv[2], xl))

diem_list = [sv[2] for sv in ds]
print(f"\\nCao nhất: {max(diem_list)}")
print(f"Thấp nhất: {min(diem_list)}")
print(f"Trung bình: {sum(diem_list)/len(diem_list):.1f}")`,
            explanation: "List comprehension [sv[2] for sv in ds] trích cột điểm. Ternary xếp loại nhanh."
        },
        {
            title: "Bài tập 03 - Cộng 2 ma trận",
            content: "Cộng 2 ma trận 3x3.",
            code: `A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
B = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]

# Ma trận tổng
C = []
for i in range(3):
    row = []
    for j in range(3):
        row.append(A[i][j] + B[i][j])
    C.append(row)

print("Ma trận A + B:")
for row in C:
    print(row)`,
            explanation: "Cộng ma trận: C[i][j] = A[i][j] + B[i][j]. Duyệt 2 vòng for theo dòng/cột."
        },
        {
            title: "📝 Câu hỏi ôn tập (PDF Dariu - Chương 6: Mảng nhiều chiều)",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. List 2 chiều trong Python là gì?
   A. List chứa 2 phần tử
   B. List lồng list (list chứa list)
   C. List chứa 2 kiểu dữ liệu
   D. List có 2 index

2. arr = [[1,2],[3,4],[5,6]]. Kết quả arr[1][0] là:
   A. 1
   B. 2
   C. 3
   D. 4

3. Để duyệt tất cả phần tử của list 2 chiều, cần dùng:
   A. 1 vòng for
   B. 2 vòng for lồng nhau
   C. while
   D. if

4. arr = [[1,2,3],[4,5,6]]. Số dòng của mảng là:
   A. 2
   B. 3
   C. 6
   D. 1

5. Để thêm 1 dòng mới vào list 2 chiều, dùng:
   A. arr.insert()
   B. arr.append([...])
   C. arr.add()
   D. arr.push()

6. Để nhập mảng 2 chiều từ bàn phím, cần kết hợp:
   A. for + input + append
   B. while + print
   C. if + input
   D. for + print

7. arr = [[1,2],[3,4]]. Kết quả len(arr) là:
   A. 4
   B. 2
   C. 1
   D. 3`,
            code: `# ĐÁP ÁN:
# 1. B (List lồng list)
# 2. C (3 — dòng 1, cột 0)
# 3. B (2 vòng for lồng nhau — ngoài duyệt dòng, trong duyệt cột)
# 4. A (2 — len(arr) = số dòng)
# 5. B (arr.append([...]) — thêm list vào cuối)
# 6. A (for + input + append — nhập từng dòng)
# 7. B (2 — len() đếm số phần tử cấp 1 = số dòng)`,
            explanation: "Nguồn: Giáo trình Python Cơ Bản v2 - Dariu Foundation. List 2D = list lồng list, duyệt bằng 2 for lồng nhau."
        }
    ]
};
