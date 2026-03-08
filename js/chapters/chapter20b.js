// Chương 20b: OOP Nâng cao — Scope, Namespace, Attributes, Validation
const chapter20b = {
    id: 23,
    sortOrder: 20.5,
    displayLabel: "20b",
    title: "OOP Nâng cao — Scope & Attributes",
    description: "Scope & LEGB Rule, Namespace, Class vs Instance Attributes, Validation trong __init__(), Computed Attributes.",
    theory: `
        <h2>1. Scope & LEGB Rule 🔍</h2>
        <p>Khi sử dụng biến trong Python, trình thông dịch tìm kiếm biến theo thứ tự <strong>LEGB</strong>:</p>
        <table>
            <tr><th>Scope</th><th>Viết tắt</th><th>Giải thích</th></tr>
            <tr><td><strong>Local</strong></td><td>L</td><td>Biến bên trong hàm/method hiện tại</td></tr>
            <tr><td><strong>Enclosed</strong></td><td>E</td><td>Biến trong hàm bao ngoài (nested function)</td></tr>
            <tr><td><strong>Global</strong></td><td>G</td><td>Biến ở cấp module (file)</td></tr>
            <tr><td><strong>Built-in</strong></td><td>B</td><td>Tên dựng sẵn của Python (print, len, ...)</td></tr>
        </table>

        <h3>1.1 Ví dụ LEGB</h3>
        <pre><code class="language-python">x = "Global"          # Global scope

def outer():
    x = "Enclosed"     # Enclosed scope

    def inner():
        x = "Local"    # Local scope
        print(x)       # → "Local" (tìm Local trước)

    inner()
    print(x)           # → "Enclosed"

outer()
print(x)               # → "Global"</code></pre>

        <h3>1.2 global — Sửa biến toàn cục từ trong hàm</h3>
        <p>Mặc định, gán giá trị trong hàm sẽ tạo biến <strong>local mới</strong>. Dùng <code>global</code> để sửa biến global.</p>
        <pre><code class="language-python">counter = 0

def increment():
    global counter      # Khai báo dùng biến global
    counter += 1

increment()
increment()
print(counter)          # 2 (đã sửa biến global)

# ❌ Không dùng global → UnboundLocalError
def bad_increment():
    counter += 1        # Lỗi! Python nghĩ counter là local</code></pre>

        <h3>1.3 nonlocal — Sửa biến hàm bao ngoài</h3>
        <p>Dùng <code>nonlocal</code> trong hàm lồng (nested function) để sửa biến của hàm bao ngoài.</p>
        <pre><code class="language-python">def display_info(number_of_updates=1):
    counter = 100
    dot_counter = ''

    def update_counter():
        nonlocal counter, dot_counter   # Sửa biến enclosed
        counter += 1
        dot_counter += '.'

    for _ in range(number_of_updates):
        update_counter()

    print(counter)        # 110
    print(dot_counter)    # ..........

display_info(10)</code></pre>

        <h3>1.4 Namespace — Không gian tên</h3>
        <p><strong>Namespace</strong> là dictionary chứa tên biến và giá trị. Mỗi scope có namespace riêng.</p>
        <pre><code class="language-python">import datetime

# Xem namespace của module
for name in sorted(datetime.__dict__):
    if not name.startswith('_'):
        print(name)
# date, datetime, time, timedelta, timezone, tzinfo

# Xem namespace của class
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

p = Product("Laptop", 5000)
print(Product.__dict__.keys())   # class namespace
# dict_keys(['__module__', '__init__', '__dict__', ...])
print(p.__dict__)                # instance namespace
# {'name': 'Laptop', 'price': 5000}</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #22d3ee;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>💡 Mẹo nhớ LEGB:</strong> Python tìm biến từ trong ra ngoài: <strong>L</strong>ocal → <strong>E</strong>nclosed → <strong>G</strong>lobal → <strong>B</strong>uilt-in. Dùng <code>global</code> để sửa biến G, dùng <code>nonlocal</code> để sửa biến E.
        </div>

        <h2>2. Class Attributes vs Instance Attributes 🏷️</h2>
        <p>Python phân biệt rõ 2 loại thuộc tính:</p>
        <table>
            <tr><th>Loại</th><th>Khai báo ở đâu</th><th>Dùng chung?</th><th>Ví dụ</th></tr>
            <tr><td><strong>Class Attribute</strong></td><td>Trong class, ngoài method</td><td>✅ Dùng chung cho mọi object</td><td><code>Phone.brand</code></td></tr>
            <tr><td><strong>Instance Attribute</strong></td><td>Trong <code>__init__</code> hoặc gán qua <code>self</code></td><td>❌ Riêng từng object</td><td><code>self.name</code></td></tr>
        </table>

        <h3>2.1 Class Attribute — dùng chung</h3>
        <pre><code class="language-python">class Phone:
    brand = 'Apple'       # Class attribute — dùng chung
    model = 'iPhone X'    # Class attribute

# Truy cập qua class
print(Phone.brand)        # Apple
print(Phone.model)        # iPhone X

# Sửa class attribute
Phone.brand = 'Samsung'
Phone.model = 'Galaxy'
print(f"brand: {Phone.brand}")    # brand: Samsung
print(f"model: {Phone.model}")    # model: Galaxy</code></pre>

        <h3>2.2 Instance Attribute — riêng từng object</h3>
        <pre><code class="language-python">class Book:
    language = 'ENG'      # Class attribute
    is_ebook = True       # Class attribute

book_1 = Book()
book_2 = Book()

# Gán instance attributes (riêng từng object)
book_1.author = 'Dan Brown'
book_1.title = 'Inferno'

book_2.author = 'Dan Brown'
book_2.title = 'The Da Vinci Code'
book_2.year = 2003        # book_2 có thêm thuộc tính year

print(book_1.__dict__)
# {'author': 'Dan Brown', 'title': 'Inferno'}
print(book_2.__dict__)
# {'author': 'Dan Brown', 'title': 'The Da Vinci Code', 'year': 2003}</code></pre>

        <h3>2.3 __dict__ — Xem namespace</h3>
        <pre><code class="language-python">class OnlineShop:
    sector = 'electronics'
    sector_code = 'ELE'
    is_public = False

# Class __dict__ → mappingproxy (chỉ đọc)
print(type(OnlineShop.__dict__))   # <class 'mappingproxy'>

# Lọc user-defined attributes (bỏ __ dunder)
attrs = [k for k in OnlineShop.__dict__ if not k.startswith('_')]
print(attrs)   # ['sector', 'sector_code', 'is_public']

# Hiển thị tên + giá trị
for attr in attrs:
    print(f"{attr} -> {OnlineShop.__dict__[attr]}")
# sector -> electronics
# sector_code -> ELE
# is_public -> False</code></pre>

        <h3>2.4 getattr(), setattr(), delattr()</h3>
        <p>Python cung cấp 3 hàm built-in để thao tác thuộc tính một cách linh hoạt:</p>
        <pre><code class="language-python">class Laptop:
    brand = 'Lenovo'
    model = 'ThinkPad'

# getattr() — đọc thuộc tính
print(getattr(Laptop, 'brand'))    # Lenovo
print(getattr(Laptop, 'model'))    # ThinkPad

# setattr() — sửa thuộc tính
setattr(Laptop, 'brand', 'Acer')
setattr(Laptop, 'model', 'Predator')
print(f"brand: {getattr(Laptop, 'brand')}")    # brand: Acer
print(f"model: {getattr(Laptop, 'model')}")    # model: Predator

# Thêm thuộc tính mới bằng dot notation hoặc setattr
Laptop.country = 'usa'
setattr(Laptop, 'year', 2024)

# delattr() — xóa thuộc tính
delattr(Laptop, 'year')
# del Laptop.country      # Cách 2: dùng del

# Kiểm tra thuộc tính còn lại
attrs = [k for k in Laptop.__dict__ if not k.startswith('_')]
print(attrs)   # ['brand', 'model', 'country']</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #a78bfa;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>📌 Ghi nhớ:</strong><br>
            • <strong>Class attribute</strong>: khai báo trong class body → dùng chung mọi instance<br>
            • <strong>Instance attribute</strong>: gán qua <code>self.x</code> trong <code>__init__</code> → riêng từng object<br>
            • <code>__dict__</code> trả về namespace (dict) của class hoặc instance<br>
            • Dùng <code>getattr()</code> / <code>setattr()</code> / <code>delattr()</code> khi tên thuộc tính là biến (dynamic)
        </div>

        <h2>3. Validation trong __init__() ✅</h2>
        <p>Kiểm tra dữ liệu đầu vào khi tạo object là thói quen tốt — giúp phát hiện lỗi sớm, tránh bug khó tìm.</p>

        <h3>3.1 Kiểm tra kiểu dữ liệu — isinstance()</h3>
        <pre><code class="language-python">class Laptop:
    def __init__(self, brand, model, price):
        self.brand = brand
        self.model = model
        # Validation: price phải là int hoặc float > 0
        if not isinstance(price, (int, float)):
            raise TypeError('price phải là int hoặc float!')
        if price <= 0:
            raise ValueError('price phải là số dương!')
        self.price = price

# ✅ OK
laptop1 = Laptop('Acer', 'Predator', 5490)
print(laptop1.__dict__)
# {'brand': 'Acer', 'model': 'Predator', 'price': 5490}

# ❌ TypeError
try:
    laptop2 = Laptop('Acer', 'Predator', '5900')
except TypeError as e:
    print(f"Lỗi: {e}")   # Lỗi: price phải là int hoặc float!

# ❌ ValueError
try:
    laptop3 = Laptop('Dell', 'XPS', -1000)
except ValueError as e:
    print(f"Lỗi: {e}")   # Lỗi: price phải là số dương!</code></pre>

        <h3>3.2 Validation với default parameter</h3>
        <pre><code class="language-python">class Car:
    def __init__(self, brand, model, price, type_of_car=None):
        self.brand = brand
        self.model = model
        self.price = price
        # Default value: nếu không truyền → 'sedan'
        self.type_of_car = type_of_car if type_of_car else 'sedan'

car1 = Car('Opel', 'Insignia', 115000)
print(car1.__dict__)
# {'brand': 'Opel', 'model': 'Insignia', 'price': 115000, 'type_of_car': 'sedan'}

car2 = Car('BMW', 'X3', 200000, 'SUV')
print(car2.__dict__)
# {'brand': 'BMW', 'model': 'X3', 'price': 200000, 'type_of_car': 'SUV'}</code></pre>

        <h3>3.3 Validation trong setter method</h3>
        <pre><code class="language-python">class Book:
    language = 'ENG'
    is_ebook = True

    def set_title(self, value):
        """Setter với kiểm tra kiểu dữ liệu"""
        if not isinstance(value, str):
            raise TypeError('title phải là kiểu str!')
        self.title = value

book = Book()

# ✅ OK
book.set_title('Python OOP Exercises')
print(book.title)   # Python OOP Exercises

# ❌ TypeError
try:
    book.set_title(False)
except TypeError as e:
    print(e)   # title phải là kiểu str!</code></pre>

        <h3>3.4 *args và **kwargs trong __init__()</h3>
        <p>Dùng <code>*args</code> và <code>**kwargs</code> để tạo class linh hoạt:</p>
        <pre><code class="language-python"># *args — nhận nhiều tham số vị trí
class Vector:
    def __init__(self, *components):
        self.components = components

v1 = Vector(1, 2)
v2 = Vector(4, 5, 2)
print(f"v1 -> {v1.components}")   # v1 -> (1, 2)
print(f"v2 -> {v2.components}")   # v2 -> (4, 5, 2)

# **kwargs — nhận nhiều tham số tên
class Bucket:
    def __init__(self, **kwargs):
        # Tên tham số → tên thuộc tính
        for key, value in kwargs.items():
            setattr(self, key, value)

bucket = Bucket(apple=3.5, milk=2.5, juice=4.9)
print(bucket.__dict__)
# {'apple': 3.5, 'milk': 2.5, 'juice': 4.9}</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #f59e0b;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>⚡ Best Practice:</strong><br>
            • Luôn validate dữ liệu trong <code>__init__()</code> — phát hiện lỗi ngay khi tạo object<br>
            • Dùng <code>isinstance()</code> kiểm tra kiểu, <code>raise TypeError</code> nếu sai kiểu<br>
            • Dùng <code>raise ValueError</code> nếu kiểu đúng nhưng giá trị không hợp lệ<br>
            • Dùng <code>try...except</code> khi gọi code có thể raise exception
        </div>

        <h2>4. Computed Attributes (Lazy Evaluation) 🧮</h2>
        <p><strong>Computed attribute</strong> = thuộc tính được <strong>tính toán</strong> từ các thuộc tính khác, chỉ tính khi cần (lazy) và cache kết quả để tránh tính lại.</p>

        <h3>4.1 Circle — area tính khi cần, cache kết quả</h3>
        <pre><code class="language-python">import math

class Circle:
    def __init__(self, radius):
        self._area = None        # Cache — chưa tính
        self.radius = radius     # Gọi setter

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        self._radius = value
        self._area = None        # Reset cache khi radius thay đổi

    @property
    def area(self):
        """Chỉ tính khi cần, cache kết quả"""
        if self._area is None:
            self._area = math.pi * self._radius ** 2
        return self._area

    @property
    def perimeter(self):
        return 2 * math.pi * self._radius

circle = Circle(3)
print(f"Area: {circle.area:.4f}")          # 28.2743 (tính lần 1)
print(f"Area: {circle.area:.4f}")          # 28.2743 (dùng cache!)
print(f"Perimeter: {circle.perimeter:.4f}")  # 18.8496

circle.radius = 5                          # Đổi radius → reset cache
print(f"New area: {circle.area:.4f}")      # 78.5398 (tính lại)</code></pre>

        <h3>4.2 Rectangle — area cache thông minh</h3>
        <pre><code class="language-python">class Rectangle:
    def __init__(self, width, height):
        self._area = None
        self.width = width
        self.height = height

    @property
    def width(self):
        return self._width

    @width.setter
    def width(self, value):
        self._width = value
        self._area = None        # Reset cache

    @property
    def height(self):
        return self._height

    @height.setter
    def height(self, value):
        self._height = value
        self._area = None        # Reset cache

    @property
    def area(self):
        """Computed — chỉ tính khi width/height thay đổi"""
        if self._area is None:
            self._area = self._width * self._height
        return self._area

rect = Rectangle(3, 4)
print(f"width: {rect.width}, height: {rect.height} -> area: {rect.area}")
# width: 3, height: 4 -> area: 12

rect.width = 10                  # Đổi width → area tự tính lại
print(f"New area: {rect.area}")  # 40</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #34d399;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>🧮 Khi nào dùng Computed Attributes?</strong><br>
            • Thuộc tính phụ thuộc vào thuộc tính khác (area phụ thuộc radius)<br>
            • Phép tính tốn thời gian — cache để không tính lại<br>
            • Dùng <code>@property</code> để truy cập như thuộc tính thường: <code>circle.area</code> thay vì <code>circle.area()</code><br>
            • Reset cache (<code>self._area = None</code>) trong setter khi thuộc tính gốc thay đổi
        </div>

        <h2>5. Composition — "Has-a" Relationship 🧩</h2>
        <p><strong>Composition</strong> = class chứa object của class khác. Thay vì kế thừa ("is-a"), dùng composition ("has-a") khi object này SỞ HỮU object kia.</p>
        
        <table>
            <tr><th>Quan hệ</th><th>Ý nghĩa</th><th>Ví dụ</th><th>Cú pháp</th></tr>
            <tr><td><strong>Inheritance</strong> (is-a)</td><td>Lớp con LÀ lớp cha</td><td>Dog is Animal</td><td><code>class Dog(Animal)</code></td></tr>
            <tr><td><strong>Composition</strong> (has-a)</td><td>Object A CHỨA object B</td><td>Warehouse has Products</td><td><code>self.products = []</code></td></tr>
        </table>

        <pre><code class="language-python">import uuid

class Product:
    def __init__(self, name, price):
        self.product_id = str(uuid.uuid4().fields[-1])[:6]
        self.name = name
        self.price = price

    def __repr__(self):
        return f"Product('{self.name}', {self.price})"

class Warehouse:
    """Warehouse HAS products (composition)"""
    def __init__(self):
        self.products = []    # List[Product] — composition!

    def add_product(self, name, price):
        # Không thêm trùng tên
        if name not in [p.name for p in self.products]:
            self.products.append(Product(name, price))

    def remove_product(self, name):
        self.products = [p for p in self.products if p.name != name]

    def search(self, query):
        """Tìm sản phẩm chứa query trong tên"""
        return [p for p in self.products
                if query.lower() in p.name.lower()]

    def sort_by_price(self, ascending=True):
        return sorted(self.products, key=lambda p: p.price,
                       reverse=not ascending)

    def total_value(self):
        return sum(p.price for p in self.products)

# Sử dụng
wh = Warehouse()
wh.add_product('Laptop', 15000000)
wh.add_product('Mouse', 250000)
wh.add_product('Monitor', 5000000)
wh.add_product('Keyboard', 800000)

print(f"Tổng giá trị: {wh.total_value():,.0f} VND")
print(f"Tìm 'mo': {wh.search('mo')}")
print(f"Giá tăng dần: {wh.sort_by_price()}")</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #34d399;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>🧩 Khi nào dùng Composition?</strong><br>
            • <strong>Inheritance</strong>: Dog IS Animal, Square IS Figure — quan hệ phân loại<br>
            • <strong>Composition</strong>: Warehouse HAS Products, Car HAS Engine — quan hệ sở hữu<br>
            • <em>Nguyên tắc</em>: "Favor composition over inheritance" — ưu tiên composition khi không rõ ràng
        </div>

        <h2>6. Tóm tắt OOP Nâng cao</h2>
        <table>
            <tr><th>Khái niệm</th><th>Ý nghĩa</th></tr>
            <tr><td>Class</td><td>Bản thiết kế cho đối tượng</td></tr>
            <tr><td>Object</td><td>Thực thể cụ thể của lớp</td></tr>
            <tr><td>Kế thừa</td><td>Lớp con kế thừa lớp cha (đơn, đa cấp, đa kế thừa)</td></tr>
            <tr><td>Đa hình</td><td>Cùng method, hành vi khác → Duck typing</td></tr>
            <tr><td>Đóng gói</td><td>Ẩn dữ liệu, @property getter/setter</td></tr>
            <tr><td>Trừu tượng</td><td>ABC + @abstractmethod bắt buộc implement</td></tr>
            <tr><td>Scope/LEGB</td><td>Quy tắc tìm biến: Local → Enclosed → Global → Built-in</td></tr>
            <tr><td>Namespace</td><td>Dictionary chứa tên biến — mỗi scope có namespace riêng</td></tr>
            <tr><td>Class Attr</td><td>Thuộc tính chung mọi object — khai báo trong class body</td></tr>
            <tr><td>Instance Attr</td><td>Thuộc tính riêng từng object — gán qua self trong __init__</td></tr>
            <tr><td>Validation</td><td>isinstance() + raise TypeError/ValueError trong __init__</td></tr>
            <tr><td>Computed Attr</td><td>Thuộc tính tính toán từ thuộc tính khác — lazy + cache</td></tr>
            <tr><td>Composition</td><td>Class chứa object class khác — "has-a" thay vì "is-a"</td></tr>
        </table>
    `,
    exercises: [
        {
            title: "Bài tập 07 - global & nonlocal counter 🔢",
            content: "Sửa lỗi hàm update_counter() bằng global/nonlocal. Gọi hàm 40 lần và in kết quả.",
            code: `# === 1. global — sửa biến toàn cục ===
counter = 0
dot_counter = ''

def update_counters():
    global counter, dot_counter   # Khai báo global
    counter += 1
    dot_counter += '.'

# Gọi 40 lần
for _ in range(40):
    update_counters()

print(counter)        # 40
print(dot_counter)    # ........................................

# === 2. nonlocal — sửa biến hàm bao ngoài ===
def display_info(number_of_updates=1):
    counter = 100
    dot_counter = ''

    def update_counter():
        nonlocal counter, dot_counter
        counter += 1
        dot_counter += '.'

    for _ in range(number_of_updates):
        update_counter()

    print(counter)
    print(dot_counter)

display_info(10)      # 110 và ..........

# === 3. Ứng dụng: Đếm số lần gọi hàm ===
call_count = 0

def tracked_function(name):
    global call_count
    call_count += 1
    print(f"[Lần {call_count}] Xin chào {name}!")

tracked_function("An")     # [Lần 1] Xin chào An!
tracked_function("Bình")   # [Lần 2] Xin chào Bình!
tracked_function("Chi")    # [Lần 3] Xin chào Chi!
print(f"Tổng: {call_count} lần gọi")`,
            explanation: "global dùng khi cần SỬA biến toàn cục từ trong hàm. nonlocal dùng khi hàm lồng (nested) cần sửa biến hàm bao ngoài."
        },
        {
            title: "Bài tập 08 - Namespace & Module 📦",
            content: "Khám phá namespace của module và class bằng __dict__.",
            code: `import datetime

# === 1. Namespace của module ===
print("📦 Namespace của module datetime:")
for name in sorted(datetime.__dict__):
    if not name.startswith('_'):
        print(f"  {name}")
# date, datetime, time, timedelta, timezone, tzinfo

# === 2. Namespace của class ===
import uuid

class Product:
    def __init__(self, product_name, price):
        self.product_id = str(uuid.uuid4().fields[-1])[:6]
        self.product_name = product_name
        self.price = price

    def __repr__(self):
        return f"Product('{self.product_name}', {self.price})"

# Namespace class → chứa methods
print("\\n📋 Class namespace:")
for key in Product.__dict__:
    print(f"  {key}")

# Namespace instance → chứa data
product = Product('Điện thoại', 5000000)
print(f"\\n📝 Instance namespace:")
print(f"  {product.__dict__}")
# {'product_id': '54274', 'product_name': 'Điện thoại', 'price': 5000000}

# === 3. So sánh kiểu __dict__ ===
print(f"\\nClass __dict__ type: {type(Product.__dict__)}")  # mappingproxy
print(f"Instance __dict__ type: {type(product.__dict__)}")  # dict`,
            explanation: "Class __dict__ là mappingproxy (read-only), Instance __dict__ là dict thường. Module cũng có namespace riêng."
        },
        {
            title: "Bài tập 09 - isinstance & issubclass 🔍",
            content: "Kiểm tra kiểu đối tượng và quan hệ kế thừa.",
            code: `# === 1. isinstance — kiểm tra object có thuộc class không ===
class Model:
    pass

class View:
    pass

model = Model()
view = View()

print(isinstance(model, Model))    # True
print(isinstance(view, Model))     # False
print(isinstance(model, object))   # True (mọi class đều kế thừa object)

# === 2. isinstance với list, dict ===
object1 = Model()
object2 = [Model(), Model()]   # Đây là list, không phải Model!
object3 = {}                   # Đây là dict

print(f"\\nobject1 là Model? {isinstance(object1, Model)}")   # True
print(f"object2 là Model? {isinstance(object2, Model)}")   # False (list!)
print(f"object3 là Model? {isinstance(object3, Model)}")   # False (dict!)

# === 3. issubclass — kiểm tra kế thừa ===
class Animal:
    pass

class Dog(Animal):
    pass

class Cat(Animal):
    pass

print(f"\\nDog kế thừa Animal? {issubclass(Dog, Animal)}")    # True
print(f"Cat kế thừa Animal? {issubclass(Cat, Animal)}")    # True
print(f"Dog kế thừa Cat? {issubclass(Dog, Cat)}")          # False
print(f"Model kế thừa object? {issubclass(Model, object)}") # True

# === 4. Ứng dụng: filter theo kiểu ===
class SinhVien:
    def __init__(self, ten): self.ten = ten

class GiaoVien:
    def __init__(self, ten): self.ten = ten

people = [SinhVien("An"), GiaoVien("Thầy B"), SinhVien("Chi"), GiaoVien("Cô D")]
students = [p for p in people if isinstance(p, SinhVien)]
print(f"\\nDanh sách SV: {[s.ten for s in students]}")`,
            explanation: "isinstance() kiểm tra object thuộc class hoặc lớp con. issubclass() kiểm tra quan hệ kế thừa giữa 2 class."
        },
        {
            title: "Bài tập 10 - getattr/setattr/delattr 🏷️",
            content: "Thao tác thuộc tính class động với getattr, setattr, delattr.",
            code: `class OnlineShop:
    sector = 'electronics'
    sector_code = 'ELE'
    is_public_company = False

# === 1. getattr — đọc thuộc tính ===
print("📖 Đọc thuộc tính:")
print(f"  sector: {getattr(OnlineShop, 'sector')}")
print(f"  code: {getattr(OnlineShop, 'sector_code')}")

# === 2. setattr — thêm/sửa thuộc tính ===
setattr(OnlineShop, 'country', 'Vietnam')
setattr(OnlineShop, 'sector', 'technology')  # Sửa giá trị

# === 3. Liệt kê user-defined attributes ===
attrs = [k for k in OnlineShop.__dict__ if not k.startswith('_')]
print(f"\\n📋 Thuộc tính: {attrs}")
# ['sector', 'sector_code', 'is_public_company', 'country']

# === 4. Hiển thị tên + giá trị ===
print("\\n📊 Chi tiết:")
for attr in attrs:
    print(f"  {attr} -> {getattr(OnlineShop, attr)}")

# === 5. delattr — xóa thuộc tính ===
delattr(OnlineShop, 'sector_code')
remaining = [k for k in OnlineShop.__dict__ if not k.startswith('_')]
print(f"\\n🗑️ Sau khi xóa sector_code: {remaining}")

# === 6. Hàm describe_attrs() ===
def describe_attrs(cls):
    """Hiển thị tất cả user-defined attributes"""
    print(f"\\n📝 Class: {cls.__name__}")
    for key, value in cls.__dict__.items():
        if not key.startswith('_') and not callable(value):
            print(f"  {key} -> {value}")

describe_attrs(OnlineShop)`,
            explanation: "getattr/setattr/delattr hữu ích khi tên thuộc tính là biến (dynamic). Dùng __dict__ để duyệt tất cả thuộc tính."
        },
        {
            title: "Bài tập 11 - Book class instance attrs 📚",
            content: "Tạo instance attributes, duyệt __dict__, tạo object từ dict data.",
            code: `class Book:
    language = 'ENG'       # Class attribute
    is_ebook = True        # Class attribute

# === 1. Gán instance attributes qua dot notation ===
book_1 = Book()
book_2 = Book()

book_1.author = 'Dan Brown'
book_1.title = 'Inferno'

book_2.author = 'Dan Brown'
book_2.title = 'The Da Vinci Code'
book_2.year_of_publishment = 2003

# === 2. Xem __dict__ ===
print("📖 book_1:", book_1.__dict__)
# {'author': 'Dan Brown', 'title': 'Inferno'}
print("📖 book_2:", book_2.__dict__)
# {'author': 'Dan Brown', 'title': 'The Da Vinci Code', 'year_of_publishment': 2003}

# === 3. Duyệt attributes bằng loop ===
books = [book_1, book_2]
for book in books:
    for key, value in book.__dict__.items():
        print(f"  {key} -> {value}")
    print("-" * 30)

# === 4. Tạo object từ dict data (nâng cao) ===
books_data = [
    {'author': 'J.K. Rowling', 'title': 'Harry Potter'},
    {'author': 'Nguyễn Nhật Ánh', 'title': 'Tôi thấy hoa vàng', 'year': 2010}
]

book_objects = []
for data in books_data:
    book = Book()
    for key, value in data.items():
        setattr(book, key, value)   # Gán dynamic!
    book_objects.append(book)

print("\\n📚 Tạo từ dict data:")
for b in book_objects:
    print(f"  {b.__dict__}")`,
            explanation: "Instance attributes gán qua dot notation hoặc setattr(). __dict__ chỉ chứa instance attrs, không chứa class attrs."
        },
        {
            title: "Bài tập 12 - Laptop class với validation 💻",
            content: "Tạo class Laptop với __init__ validation, hiển thị thuộc tính, kiểm tra lỗi.",
            code: `class Laptop:
    def __init__(self, brand, model, price):
        self.brand = brand
        self.model = model
        # Validation
        if not isinstance(price, (int, float)):
            raise TypeError('Giá phải là int hoặc float!')
        if price <= 0:
            raise TypeError('Giá phải là số dương!')
        self.price = price

    def display_instance_attrs(self):
        """Hiển thị tên thuộc tính"""
        for key in self.__dict__:
            print(f"  {key}")

    def display_attrs_with_values(self):
        """Hiển thị tên + giá trị"""
        for key, value in self.__dict__.items():
            print(f"  {key} - {value}")

# === 1. Tạo object thành công ===
laptop = Laptop('Dell', 'Inspiron', 3699)
print("🖥️ Thuộc tính:")
laptop.display_instance_attrs()

print("\\n📋 Chi tiết:")
laptop.display_attrs_with_values()

# === 2. Kiểm tra __dict__ ===
print(f"\\n__dict__: {laptop.__dict__}")
# {'brand': 'Dell', 'model': 'Inspiron', 'price': 3699}

# === 3. Xử lý lỗi — price là string ===
try:
    bad_laptop = Laptop('Acer', 'Predator', '5900')
except TypeError as e:
    print(f"\\n❌ Lỗi: {e}")

# === 4. Xử lý lỗi — price âm ===
try:
    bad_laptop2 = Laptop('HP', 'Envy', -1000)
except TypeError as e:
    print(f"❌ Lỗi: {e}")`,
            explanation: "Validation trong __init__ giúp phát hiện lỗi ngay khi tạo object. isinstance() kiểm tra kiểu, raise để ném lỗi."
        },
        {
            title: "Bài tập 13 - Vector & Bucket (*args, **kwargs) 🧳",
            content: "Tạo class linh hoạt với *args và **kwargs trong __init__.",
            code: `# === 1. Vector — *args (nhận N tọa độ) ===
class Vector:
    def __init__(self, *components):
        self.components = components

    def __str__(self):
        return f"Vector{self.components}"

    def dimension(self):
        return len(self.components)

v1 = Vector(1, 2)
v2 = Vector(4, 5, 2)
v3 = Vector(1, 0, 0, 0)

print(f"v1 = {v1}, {v1.dimension()}D")   # Vector(1, 2), 2D
print(f"v2 = {v2}, {v2.dimension()}D")   # Vector(4, 5, 2), 3D
print(f"v3 = {v3}, {v3.dimension()}D")   # Vector(1, 0, 0, 0), 4D

# === 2. Bucket — **kwargs (nhận N thuộc tính) ===
class Bucket:
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)

    def show(self):
        for key, value in self.__dict__.items():
            print(f"  {key}: {value}")

print("\\n🛒 Giỏ hàng:")
bucket = Bucket(apple=3.5, milk=2.5, juice=4.9, water=2.5)
bucket.show()
print(f"  Tổng: " + "$" + f"{sum(bucket.__dict__.values()):.1f}")

# === 3. Kết hợp * args + ** kwargs ===
        class FlexClass:
        def __init__(self, * args, ** kwargs):
        self.positional = args
        self.named = kwargs

obj = FlexClass(1, 2, 3, name = "An", age = 25)
print(f"\\n📦 Positional: {obj.positional}")
print(f"📝 Named: {obj.named}")`,
            explanation: "*args nhận tuple các tham số vị trí. **kwargs nhận dict các tham số tên. Kết hợp cả 2 tạo class cực kỳ linh hoạt."
        },
        {
            title: "Bài tập 14 - Car class default params 🚗",
            content: "Tạo class Car với tham số mặc định và hiển thị thông tin.",
            code: `class Car:
        def __init__(self, brand, model, price, type_of_car = None):
        self.brand = brand
        self.model = model
        self.price = price
        self.type_of_car = type_of_car if type_of_car else 'sedan'

    def info(self):
        return (f"🚗 {self.brand} {self.model} | "
                f"{self.price:,}đ | Loại: {self.type_of_car}")

# === Tạo nhiều xe ===
    cars =[
        Car('Toyota', 'Camry', 1200000000),          # Mặc định sedan
    Car('BMW', 'X3', 2000000000, 'SUV'),
        Car('Honda', 'CR-V', 1100000000, 'SUV'),
        Car('Opel', 'Insignia', 115000000),           # Mặc định sedan
    Car('VinFast', 'VF9', 1500000000, 'Electric SUV'),
    ]

print("🏪 DANH SÁCH XE:")
print("-" * 60)
for car in cars:
    print(car.info())

# === Thống kê ===
    sedans =[c for c in cars if c.type_of_car == 'sedan']
suvs = [c for c in cars if 'SUV' in c.type_of_car]
print(f"\\n📊 Sedan: {len(sedans)} xe")
print(f"📊 SUV:   {len(suvs)} xe")
print(f"💰 Tổng: {sum(c.price for c in cars):,}đ")

# === __dict__ ===
    print(f"\\n📋 Chi tiết xe 1:")
print(cars[0].__dict__)`,
            explanation: "Default parameter (type_of_car=None) cho phép không truyền → dùng giá trị mặc định. Giúp tạo object linh hoạt hơn."
        },
        {
            title: "Bài tập 15 - Visibility: public/protected/private 🔐",
            content: "Demo 3 mức truy cập thuộc tính và cách hiển thị riêng từng loại.",
            code: `class Laptop:
    def __init__(self, brand, model, code, price, margin):
self.brand = brand           # Public
self._model = model          # Protected
self._code = code            # Protected
self.__price = price         # Private
self.__margin = margin       # Private

    def display_public_attrs(self):
"""Hiển thị thuộc tính public"""
print("🟢 Public attributes:")
for key in self.__dict__:
    if not key.startswith('_'):
print(f"  {key} = {self.__dict__[key]}")

    def display_protected_attrs(self):
"""Hiển thị thuộc tính protected (bắt đầu _)"""
print("🟡 Protected attributes:")
for key in self.__dict__:
    if key.startswith('_') and not key.startswith(f'_{self.__class__.__name__}__'):
print(f"  {key}")

    def display_private_attrs(self):
"""Hiển thị thuộc tính private (bắt đầu __)"""
print("🔴 Private attributes:")
for key in self.__dict__:
    if key.startswith(f'_{self.__class__.__name__}__'):
        print(f"  {key}")

    def get_price(self):
"""Truy cập private qua method"""
return self.__price

# === Test ===
    laptop = Laptop('Acer', 'Predator', 'AC-100', 5490, 0.2)

# Xem __dict__ — Private bị đổi tên(name mangling)
print(f"📋 __dict__: {laptop.__dict__}")

laptop.display_public_attrs()
laptop.display_protected_attrs()
laptop.display_private_attrs()

# Truy cập các mức
print(f"\\n✅ Public: {laptop.brand}")
print(f"⚠️ Protected: {laptop._model}")
print(f"🔒 Private qua method: {laptop.get_price()}")
# print(laptop.__price)                    # ❌ AttributeError!
print(f"🔓 Name mangling: {laptop._Laptop__price}")  # Hack!`,
            explanation: "Public (self.x): tự do truy cập. Protected (self._x): quy ước nội bộ. Private (self.__x): name mangling → _ClassName__x."
        },
        {
            title: "Bài tập 16 - Laptop getter/setter/validation 🛡️",
            content: "Xây dựng getter/setter với validation — kiểm tra cả kiểu và giá trị.",
            code: `class Laptop:
    def __init__(self, price):
self.set_price(price)    # Dùng setter ngay trong __init__!

    def get_price(self):
"""Getter — đọc giá"""
return self._price

    def set_price(self, value):
"""Setter — kiểm tra trước khi gán"""
if not isinstance(value, (int, float)):
            raise TypeError('Giá phải là int hoặc float!')
if not value > 0:
            raise ValueError('Giá phải là số dương!')
self._price = value

# === 1. Tạo thành công ===
    laptop = Laptop(3499)
print(f"💰 Giá: {laptop.get_price():,}")   # 3, 499

# === 2. Sửa giá qua setter ===
    laptop.set_price(3999)
print(f"💰 Giá mới: {laptop.get_price():,}")   # 3, 999

# === 3. Lỗi TypeError — truyền string ===
try:
laptop.set_price('3000')
except TypeError as e:
print(f"❌ {e}")

# === 4. Lỗi ValueError — giá âm ===
try:
laptop.set_price(-3000)
except ValueError as e:
print(f"❌ {e}")

# === 5. Lỗi ngay khi tạo object ===
try:
bad_laptop = Laptop(-3499)
except ValueError as e:
print(f"❌ Tạo thất bại: {e}")`,
            explanation: "Gọi setter ngay trong __init__ → validation cả lúc tạo object và lúc sửa. TypeError cho sai kiểu, ValueError cho sai giá trị."
        },
        {
            title: "Bài tập 17 - Person class property (standard) 👤",
            content: "Tạo property bằng hàm property() — cách standard.",
            code: `class Person:
    def __init__(self, first_name, last_name):
self._first_name = first_name
self._last_name = last_name

    # === Getter methods ===
    def get_first_name(self):
return self._first_name

    def get_last_name(self):
return self._last_name

    # === Setter methods ===
    def set_first_name(self, value):
self._first_name = value

    def set_last_name(self, value):
self._last_name = value

    # === Delete method ===
    def del_first_name(self):
        del self._first_name

    # === Tạo property bằng property() ===
    first_name = property(
        fget = get_first_name,
        fset = set_first_name,
        fdel = del_first_name
    )
last_name = property(fget = get_last_name, fset = set_last_name)

# === Test ===
    person = Person('Nguyễn', 'An')
print(f"Họ: {person.first_name}")    # Dùng như thuộc tính thường!
print(f"Tên: {person.last_name}")

# Sửa qua property(gọi setter tự động)
person.first_name = 'Trần'
person.last_name = 'Bình'
print(f"\\nSau khi sửa: {person.__dict__}")
# { '_first_name': 'Trần', '_last_name': 'Bình' }

# Xóa thuộc tính
del person.first_name
print(f"Sau khi xóa: {person.__dict__}")
# { '_last_name': 'Bình' } `,
            explanation: "property(fget, fset, fdel) tạo property truy cập như thuộc tính nhưng thực ra gọi getter/setter/deleter tương ứng."
        },
        {
            title: "Bài tập 18 - Pet class @property decorator 🐾",
            content: "Tạo property bằng @property decorator — cách Pythonic. Thêm validation cho age.",
            code: `class Pet:
    def __init__(self, name, age):
self._name = name
self.age = age        # Gọi setter → có validation!

    # === name property(đọc + sửa) ===
    @property
    def name(self):
return self._name

@name.setter
    def name(self, value):
self._name = value

    # === age property(đọc + sửa + validation) ===
    @property
    def age(self):
return self._age

@age.setter
    def age(self, value):
if not isinstance(value, int):
            raise TypeError('age phải là kiểu int!')
if not value > 0:
            raise ValueError('age phải là số dương!')
self._age = value

    def info(self):
return f"🐾 {self.name}, {self.age} tuổi"

# === 1. Tạo thành công ===
    pet = Pet('Max', 5)
print(pet.info())              # 🐾 Max, 5 tuổi
print(f"__dict__: {pet.__dict__}")
# { '_name': 'Max', '_age': 5 }

# === 2. Sửa qua property ===
    pet.name = 'Oscar'
pet.age = 7
print(pet.info())              # 🐾 Oscar, 7 tuổi

# === 3. Lỗi — age là string ===
try:
bad_pet = Pet('Rex', 'seven')
except TypeError as e:
print(f"❌ {e}")          # age phải là kiểu int!

# === 4. Lỗi — age âm ===
try:
pet.age = -10
except ValueError as e:
print(f"❌ {e}")          # age phải là số dương!`,
            explanation: "@property = Pythonic way. Trong __init__ dùng self.age = value (gọi setter) thay vì self._age = value (bypass validation)."
        },
        {
            title: "Bài tập 19 - Game class validation property 🎮",
            content: "Tạo class Game với level [0..100], tự clamp giá trị vượt biên.",
            code: `class Game:
    def __init__(self, level = 0):
self.level = level    # Gọi setter

@property
    def level(self):
return self._level

@level.setter
    def level(self, value):
if not isinstance(value, int):
            raise TypeError('level phải là kiểu int!')
        # Clamp: giới hạn trong[0, 100]
if value < 0:
    self._level = 0
        elif value > 100:
self._level = 100
        else:
self._level = value

    def __str__(self):
bar = '█' * (self.level // 5) + '░' * (20 - self.level // 5)
        return f"Game Level {self.level:3d} [{bar}]"

# === Tạo 4 game với các giá trị khác nhau ===
    games =[Game(), Game(10), Game(-10), Game(120)]

print("🎮 DANH SÁCH GAME:")
for game in games:
    print(f"  {game}")
# Game Level   0[░░░░░░░░░░░░░░░░░░░░]
# Game Level  10[██░░░░░░░░░░░░░░░░░░]
# Game Level   0[░░░░░░░░░░░░░░░░░░░░]  ← -10 bị clamp về 0
# Game Level 100[████████████████████]  ← 120 bị clamp về 100

# === Test sửa level ===
    g = Game(50)
print(f"\\nTrước: {g}")
g.level = 200        # Vượt 100 → clamp về 100
print(f"Sau:   {g}")

# === Test lỗi kiểu ===
try:
Game('high')
except TypeError as e:
print(f"\\n❌ {e}")`,
            explanation: "Property setter có thể 'clamp' giá trị thay vì raise lỗi — ép giá trị vào khoảng hợp lệ [0, 100]. Linh hoạt hơn strict validation."
        },
        {
            title: "Bài tập 20 - Circle computed area 🔵",
            content: "Tạo class Circle với computed area — lazy evaluation và cache thông minh.",
            code: `import math

class Circle:
    def __init__(self, radius):
self._area = None
self._perimeter = None
self.radius = radius     # Gọi setter

@property
    def radius(self):
return self._radius

@radius.setter
    def radius(self, value):
self._radius = value
self._area = None        # Reset cache
self._perimeter = None   # Reset cache

@property
    def area(self):
"""Computed — chỉ tính khi cần"""
if self._area is None:
self._area = math.pi * self._radius ** 2
print("  📐 Tính area mới!")
return self._area

@property
    def perimeter(self):
"""Computed — chỉ tính khi cần"""
if self._perimeter is None:
self._perimeter = 2 * math.pi * self._radius
print("  📏 Tính perimeter mới!")
return self._perimeter

    def info(self):
return (f"⭕ r={self.radius} | "
                f"S={self.area:.4f} | "
                f"C={self.perimeter:.4f}")

# === Test ===
    print("Tạo circle(3):")
c = Circle(3)
print(c.info())        # Tính lần 1
print(c.info())        # Dùng cache — không tính lại!

print(f"\\nĐổi radius = 5:")
c.radius = 5           # Reset cache
print(c.info())        # Tính lại!

# === So sánh nhiều hình tròn ===
    print("\\n📊 So sánh:")
circles = [Circle(r) for r in [1, 3, 5, 10]]
for c in circles:
    print(f"  r={c.radius:2d} → S={c.area:8.2f} C={c.perimeter:7.2f}")`,
            explanation: "Lazy evaluation: chỉ tính khi truy cập (.area). Cache: lưu kết quả, không tính lại. Reset cache trong setter khi dữ liệu gốc thay đổi."
        },
        {
            title: "Bài tập 21 - Rectangle computed area 🟦",
            content: "Tạo class Rectangle với computed area — giống Circle nhưng 2 chiều.",
            code: `class Rectangle:
    def __init__(self, width, height):
self._area = None
self.width = width
self.height = height

@property
    def width(self):
return self._width

@width.setter
    def width(self, value):
self._width = value
self._area = None

@property
    def height(self):
return self._height

@height.setter
    def height(self, value):
self._height = value
self._area = None

@property
    def area(self):
if self._area is None:
self._area = self._width * self._height
return self._area

@property
    def perimeter(self):
return 2 * (self._width + self._height)

@property
    def is_square(self):
return self._width == self._height

    def __str__(self):
shape = "⬜ Square" if self.is_square else "🟦 Rectangle"
return f"{shape}({self.width}x{self.height}) S={self.area} C={self.perimeter}"

# === Test ===
    rect = Rectangle(3, 4)
print(rect)               # 🟦 Rectangle(3x4) S = 12 C = 14

rect.width = 4            # Đổi → thành hình vuông
print(rect)               # ⬜ Square(4x4) S = 16 C = 16

rect.height = 10
print(rect)               # 🟦 Rectangle(4x10) S = 40 C = 28

# === Bảng so sánh ===
    print("\\n📊 Bảng hình chữ nhật:")
print(f"{'W':>3} {'H':>3} {'Area':>6} {'Peri':>6} {'Square?':>8}")
print("-" * 30)
for w, h in [(2, 3), (4, 4), (5, 8), (6, 6), (3, 10)]:
    r = Rectangle(w, h)
sq = "✅" if r.is_square else ""
print(f"{w:3d} {h:3d} {r.area:6d} {r.perimeter:6d} {sq:>8}")`,
            explanation: "Computed area reset khi width HOẶC height thay đổi. is_square là computed property không cần cache (tính nhanh)."
        },
        {
            title: "Bài tập 16 - Point: khoảng cách & translate 📍",
            content: "Tạo class Point với method tính khoảng cách Euclid, translate (dịch chuyển), và reset về gốc.",
            code: `import math

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def calc_distance(self, other):
        """Khoảng cách Euclid giữa 2 điểm"""
        return math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)

    def translate(self, dx, dy):
        """Dịch chuyển điểm"""
        self.x += dx
        self.y += dy

    def reset(self):
        """Reset về gốc tọa độ"""
        self.x = 0
        self.y = 0

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

# === 1. Tạo 2 điểm ===
p1 = Point(0, 3)
p2 = Point(4, 0)
print(f"p1 = {p1}")
print(f"p2 = {p2}")
print(f"Khoảng cách: {p1.calc_distance(p2)}")   # 5.0

# === 2. Translate ===
p1.translate(2, -1)
print(f"\\nSau translate(2,-1): {p1}")   # Point(x=2, y=2)

# === 3. Reset ===
p1.reset()
print(f"Sau reset: {p1}")               # Point(x=0, y=0)

# === 4. Nhiều điểm ===
points = [Point(1,2), Point(5,8), Point(-3,4), Point(0,0)]
print("\\nKhoảng cách từ gốc:")
origin = Point(0, 0)
for p in points:
    d = p.calc_distance(origin)
    print(f"  {p} → {d:.2f}")`,
            explanation: "calc_distance dùng công thức Euclid √((x₂-x₁)² + (y₂-y₁)²). translate thay đổi tọa độ tại chỗ (mutate). reset đưa về (0,0)."
        },
        {
            title: "Bài tập 17 - Sắp xếp objects theo thuộc tính 🔢",
            content: "Sắp xếp danh sách Person theo tuổi, tên, và sử dụng key function + lambda.",
            code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

# === Danh sách người ===
people = [
    Person('Tùng', 25),
    Person('An', 19),
    Person('Mai', 30),
    Person('Bình', 22),
    Person('Chi', 27),
]

# === 1. Sắp xếp theo tuổi (tăng dần) ===
by_age = sorted(people, key=lambda p: p.age)
print("Theo tuổi (tăng):")
for p in by_age:
    print(f"  {p.name} → {p.age}")

# === 2. Sắp xếp theo tên (A-Z) ===
by_name = sorted(people, key=lambda p: p.name)
print("\\nTheo tên (A-Z):")
for p in by_name:
    print(f"  {p.name} → {p.age}")

# === 3. Sắp xếp theo tuổi (giảm dần) ===
by_age_desc = sorted(people, key=lambda p: p.age, reverse=True)
print("\\nTheo tuổi (giảm):")
for p in by_age_desc:
    print(f"  {p.name} → {p.age}")

# === 4. Tìm người trẻ nhất / già nhất ===
youngest = min(people, key=lambda p: p.age)
oldest = max(people, key=lambda p: p.age)
print(f"\\nTrẻ nhất: {youngest.name} ({youngest.age})")
print(f"Già nhất: {oldest.name} ({oldest.age})")`,
            explanation: "sorted() với key=lambda cho phép sắp xếp objects theo bất kỳ thuộc tính nào. min()/max() cũng dùng key function tương tự."
        },
        {
            title: "Bài tập 18 - StringList: Custom Container 📦",
            content: "Tạo class StringList chỉ chứa chuỗi, với validation, filter, và các magic methods.",
            code: `class StringList:
    def __init__(self, *items):
        self._data = []
        for item in items:
            self.add(item)

    def add(self, item):
        """Chỉ thêm string"""
        if not isinstance(item, str):
            raise TypeError(f"Chỉ chấp nhận str, nhận {type(item).__name__}")
        self._data.append(item)

    def filter_by(self, keyword):
        """Lọc các chuỗi chứa keyword"""
        return [s for s in self._data if keyword.lower() in s.lower()]

    def to_upper(self):
        """Trả về list viết hoa"""
        return [s.upper() for s in self._data]

    def __len__(self):
        return len(self._data)

    def __getitem__(self, index):
        return self._data[index]

    def __repr__(self):
        return f"StringList({self._data})"

    def __contains__(self, item):
        return item in self._data

# === 1. Tạo và thêm ===
sl = StringList('Python', 'Java', 'JavaScript', 'TypeScript')
print(sl)                        # StringList([...])
print(f"Số phần tử: {len(sl)}")  # 4

# === 2. Truy cập index ===
print(f"sl[0] = {sl[0]}")       # Python
print(f"sl[-1] = {sl[-1]}")     # TypeScript

# === 3. Filter ===
print(f"\\nChứa 'script': {sl.filter_by('script')}")
print(f"Viết hoa: {sl.to_upper()}")

# === 4. Kiểm tra ===
print(f"\\n'Python' in sl: {'Python' in sl}")
print(f"'C++' in sl: {'C++' in sl}")

# === 5. Validation ===
try:
    sl.add(123)
except TypeError as e:
    print(f"\\n❌ {e}")`,
            explanation: "__len__ cho len(), __getitem__ cho sl[i], __contains__ cho 'in' operator. Validation trong add() bắt lỗi sớm."
        },
        {
            title: "Bài tập 19 - Warehouse CRUD đầy đủ 🏭",
            content: "Hệ thống quản lý kho hàng với Composition: Product + Warehouse. CRUD + search + sort.",
            code: `import uuid

class Product:
    def __init__(self, name, price):
        self.product_id = str(uuid.uuid4().fields[-1])[:6]
        self.name = name
        self.price = price

    def __repr__(self):
        return f"Product('{self.name}', {self.price:,.0f})"

class Warehouse:
    def __init__(self):
        self.products = []

    def add_product(self, name, price):
        """Thêm sản phẩm (không trùng tên)"""
        names = [p.name for p in self.products]
        if name in names:
            print(f"  ⚠️ '{name}' đã tồn tại!")
            return
        self.products.append(Product(name, price))
        print(f"  ✅ Thêm '{name}' ({price:,.0f})")

    def remove_product(self, name):
        """Xóa sản phẩm theo tên"""
        before = len(self.products)
        self.products = [p for p in self.products if p.name != name]
        if len(self.products) < before:
            print(f"  🗑️ Đã xóa '{name}'")
        else:
            print(f"  ❌ Không tìm thấy '{name}'")

    def search(self, query):
        """Tìm sản phẩm chứa query (không phân biệt hoa/thường)"""
        return [p for p in self.products
                if query.lower() in p.name.lower()]

    def sort_by_price(self, ascending=True):
        """Sắp xếp theo giá"""
        return sorted(self.products,
                       key=lambda p: p.price,
                       reverse=not ascending)

    def display(self):
        """Hiển thị bảng sản phẩm"""
        print(f"{'ID':<8} {'Tên':<20} {'Giá':>12}")
        print("-" * 42)
        for p in self.products:
            print(f"{p.product_id:<8} {p.name:<20} {p.price:>12,.0f}")
        print(f"\\nTổng: {sum(p.price for p in self.products):,.0f} | "
              f"Số SP: {len(self.products)}")

# === Demo ===
wh = Warehouse()
print("📦 THÊM SẢN PHẨM:")
wh.add_product('Laptop', 15_000_000)
wh.add_product('Mouse', 250_000)
wh.add_product('Monitor', 5_000_000)
wh.add_product('Keyboard', 800_000)
wh.add_product('USB Cable', 50_000)
wh.add_product('Laptop', 20_000_000)   # Trùng!

print("\\n📋 DANH SÁCH:")
wh.display()

print("\\n🔍 TÌM 'mo':")
for p in wh.search('mo'):
    print(f"  {p}")

print("\\n💰 GIÁ TĂNG DẦN:")
for p in wh.sort_by_price():
    print(f"  {p}")

print("\\n🗑️ XÓA:")
wh.remove_product('USB Cable')
wh.remove_product('Webcam')      # Không tồn tại
print(f"\\nCòn {len(wh.products)} sản phẩm")`,
            explanation: "Composition: Warehouse HAS Products. CRUD = Create/Read/Update/Delete. search() dùng list comprehension + lower() tìm không phân biệt hoa/thường."
        },
        {
            title: "📝 Câu hỏi ôn tập - Scope, Namespace & OOP Nâng Cao",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Quy tắc LEGB tìm biến theo thứ tự nào?
A. Local → Enclosed → Global → Built-in
B. Built-in → Global → Enclosed → Local
C. Global → Local → Built-in → Enclosed
D. Enclosed → Local → Global → Built-in

2. Từ khóa "nonlocal" dùng để:
A. Khai báo biến toàn cục
B. Sửa biến của hàm bao ngoài (enclosed)
C. Xóa biến
D. Import module

3. Class attribute và Instance attribute khác nhau ở:
A. Class attr khai báo trong __init__, Instance attr khai báo ngoài
B. Class attr dùng chung mọi object, Instance attr riêng từng object
C. Không có sự khác biệt
D. Instance attr không thể sửa được

4. __dict__ của class trả về kiểu gì?
A. list
B. tuple
C. mappingproxy (chỉ đọc)
D. set

5. getattr(obj, 'name') tương đương với:
A. obj.name = value
B. del obj.name
C. obj.name
D. obj.__name__

6. isinstance(5, (int, float)) trả về:
A. False
B. True
C. None
D. Error

7. Trong __init__, nếu price là string thì nên raise:
A. ValueError
B. TypeError
C. IndexError
D. KeyError

8. *args trong __init__ nhận dữ liệu dạng:
A. dict
B. list
C. tuple
D. set

9. Computed attribute (lazy evaluation) có ưu điểm gì?
A. Luôn tính lại mỗi lần truy cập
B. Chỉ tính khi cần, cache kết quả
C. Xóa thuộc tính tự động
D. Tạo class mới

10. Khi radius thay đổi, computed area cần:
A. Tính lại ngay lập tức
B. Reset cache (self._area = None) trong setter
C. Xóa object và tạo lại
D. Không cần làm gì`,
            code: `# ĐÁP ÁN:
# 1. A (LEGB: Local → Enclosed → Global → Built-in)
# 2. B (nonlocal sửa biến hàm bao ngoài, global sửa biến toàn cục)
# 3. B (Class attr dùng chung, Instance attr riêng từng object)
# 4. C (Class __dict__ là mappingproxy, Instance __dict__ là dict)
# 5. C (getattr(obj, 'name') = obj.name — đọc thuộc tính)
# 6. B (5 là int, isinstance kiểm tra tuple kiểu → True)
# 7. B (Sai kiểu → TypeError, sai giá trị → ValueError)
# 8. C (*args nhận tuple, **kwargs nhận dict)
# 9. B (Lazy = chỉ tính khi cần, cache = lưu kết quả)
# 10. B (Reset cache trong setter, tính lại khi truy cập property)`,
            explanation: "Quiz này kiểm tra kiến thức về Scope/LEGB, Namespace, Class vs Instance Attributes, Validation, và Computed Attributes."
        }
    ]
};
