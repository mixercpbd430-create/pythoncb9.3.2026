// Chương 20: Lập trình hướng đối tượng (OOP)
const chapter20 = {
    id: 20,
    title: "Lập trình hướng đối tượng (OOP)",
    description: "Class, Object, kế thừa nâng cao, đa hình, duck typing, encapsulation, @property, abstract class.",
    theory: `
        <h2>1. Lớp (Class) và Đối tượng (Object)</h2>
        <p><strong>Lớp</strong> = bản thiết kế. <strong>Đối tượng</strong> = thực thể cụ thể của lớp.</p>
        <pre><code class="language-python">class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Chào, tôi là {self.name}, {self.age} tuổi.")

person1 = Person("Alice", 25)
person2 = Person("Bob", 30)
person1.introduce()   # Chào, tôi là Alice, 25 tuổi.
person2.introduce()   # Chào, tôi là Bob, 30 tuổi.</code></pre>

        <h3>self là gì?</h3>
        <p><code>self</code> tham chiếu đến đối tượng hiện tại. Dùng để truy cập thuộc tính và phương thức bên trong lớp.</p>

        <h2>2. __init__ (Phương thức khởi tạo)</h2>
        <pre><code class="language-python">class Car:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year

    def display_info(self):
        print(f"{self.year} {self.brand} {self.model}")

car1 = Car("Toyota", "Corolla", 2020)
car1.display_info()   # 2020 Toyota Corolla</code></pre>

        <h2>3. Kế thừa (Inheritance) 🔥</h2>
        <p>Lớp con <strong>kế thừa</strong> thuộc tính và phương thức từ lớp cha. Dùng <code>super()</code> để gọi phương thức lớp cha.</p>
        <pre><code class="language-python">class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
    def speak(self):
        print(f"{self.name} barks")

dog1 = Dog("Buddy", "Golden Retriever")
dog1.speak()   # Buddy barks</code></pre>

        <h3>3.1 Kế thừa đa cấp (Multi-level Inheritance)</h3>
        <pre><code class="language-python">class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def bark(self):
        print(f"{self.name}: Gâu gâu!")

class Puppy(Dog):
    def play(self):
        print(f"{self.name}: Đang chơi! 🐶")

puppy = Puppy("Lucky")
puppy.bark()    # Lucky: Gâu gâu!   (từ Dog)
puppy.play()    # Lucky: Đang chơi!  (từ Puppy)</code></pre>

        <h3>3.2 Đa kế thừa (Multiple Inheritance)</h3>
        <pre><code class="language-python">class Flyable:
    def fly(self):
        print(f"{self.name} đang bay! 🦅")

class Swimmable:
    def swim(self):
        print(f"{self.name} đang bơi! 🏊")

class Duck(Animal, Flyable, Swimmable):
    def speak(self):
        print(f"{self.name}: Quạc quạc!")

duck = Duck("Donald")
duck.speak()   # Donald: Quạc quạc!
duck.fly()     # Donald đang bay! 🦅
duck.swim()    # Donald đang bơi! 🏊</code></pre>

        <h3>3.3 MRO — Method Resolution Order</h3>
        <p>Khi đa kế thừa, Python dùng <strong>MRO</strong> để xác định thứ tự tìm method:</p>
        <pre><code class="language-python"># Xem MRO
print(Duck.__mro__)
# (Duck, Animal, Flyable, Swimmable, object)

# Hoặc
print(Duck.mro())</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #3b82f6;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>📌 Thứ tự MRO:</strong> Python tìm method từ lớp hiện tại → lớp cha thứ 1 → lớp cha thứ 2 → ... → object
        </div>

        <h2>4. Đa hình (Polymorphism) 🎭</h2>
        <p><strong>Đa hình</strong> = cùng một phương thức nhưng hành vi khác nhau ở mỗi lớp con.</p>
        <pre><code class="language-python">class Dog(Animal):
    def speak(self):
        print("Dog barks")

class Cat(Animal):
    def speak(self):
        print("Cat meows")

animals = [Dog("Rex"), Cat("Mimi")]
for a in animals:
    a.speak()    # Mỗi Object gọi speak() riêng</code></pre>

        <h3>4.1 Duck Typing — "Nếu nó kêu như vịt..."</h3>
        <p>Python không quan tâm <em>kiểu</em> đối tượng, chỉ quan tâm đối tượng <em>có phương thức cần gọi hay không</em>.</p>
        <pre><code class="language-python">class Dog:
    def speak(self): return "Gâu gâu!"

class Cat:
    def speak(self): return "Meo meo!"

class Robot:
    def speak(self): return "Beep boop!"

# Không cần chung lớp cha — chỉ cần có speak()
def make_it_talk(thing):
    print(thing.speak())

make_it_talk(Dog())     # Gâu gâu!
make_it_talk(Cat())     # Meo meo!
make_it_talk(Robot())   # Beep boop!</code></pre>

        <h3>4.2 Abstract Class (Lớp trừu tượng)</h3>
        <p>Lớp trừu tượng <strong>bắt buộc</strong> lớp con phải implement phương thức. Không thể tạo object trực tiếp từ abstract class.</p>
        <pre><code class="language-python">from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

# shape = Shape()  # ❌ TypeError: Can't instantiate abstract class
circle = Circle(5)
rect = Rectangle(4, 6)
print(f"Circle: S={circle.area():.1f}, C={circle.perimeter():.1f}")
print(f"Rect: S={rect.area()}, C={rect.perimeter()}")</code></pre>

        <h2>5. Đóng gói nâng cao (Encapsulation) 🔒</h2>

        <h3>5.1 Quy ước đặt tên:</h3>
        <table>
            <tr><th>Cú pháp</th><th>Tên</th><th>Ý nghĩa</th></tr>
            <tr><td><code>self.name</code></td><td>Public</td><td>Truy cập tự do từ mọi nơi</td></tr>
            <tr><td><code>self._name</code></td><td>Protected</td><td>Quy ước: chỉ dùng nội bộ (vẫn truy cập được)</td></tr>
            <tr><td><code>self.__name</code></td><td>Private</td><td>Name mangling → không truy cập trực tiếp</td></tr>
        </table>

        <pre><code class="language-python">class MyClass:
    def __init__(self):
        self.public = "Ai cũng thấy"
        self._protected = "Quy ước nội bộ"
        self.__private = "Thực sự ẩn"

obj = MyClass()
print(obj.public)           # ✅ OK
print(obj._protected)       # ⚠️ Hoạt động nhưng không nên
# print(obj.__private)      # ❌ AttributeError
print(obj._MyClass__private)  # 🔓 Name mangling (vẫn truy cập được!)</code></pre>

        <h3>5.2 @property — Getter / Setter Pythonic</h3>
        <p><code>@property</code> biến method thành thuộc tính, cho phép kiểm soát get/set mà code bên ngoài dùng như thuộc tính thường.</p>
        <pre><code class="language-python">class Student:
    def __init__(self, name, score):
        self.name = name
        self._score = score  # protected

    @property
    def score(self):
        """Getter"""
        return self._score

    @score.setter
    def score(self, value):
        """Setter — kiểm tra dữ liệu"""
        if not (0 <= value <= 10):
            raise ValueError("Điểm phải từ 0 đến 10!")
        self._score = value

    @property
    def grade(self):
        """Read-only property"""
        if self._score >= 8: return "Giỏi"
        elif self._score >= 6.5: return "Khá"
        elif self._score >= 5: return "TB"
        else: return "Yếu"

sv = Student("An", 8.5)
print(sv.score)      # 8.5 (gọi getter)
print(sv.grade)      # Giỏi (read-only)
sv.score = 9.0       # Gọi setter
# sv.score = 15      # ❌ ValueError!
# sv.grade = "Giỏi"  # ❌ AttributeError (read-only)</code></pre>

        <h3>5.3 __slots__ — tối ưu bộ nhớ</h3>
        <pre><code class="language-python">class Point:
    __slots__ = ['x', 'y']  # Chỉ cho phép 2 thuộc tính

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p.x, p.y)    # 3 4
# p.z = 5          # ❌ AttributeError (không thêm thuộc tính mới được)</code></pre>

        <h2>6. Magic Methods (Dunder Methods) ✨</h2>
        <pre><code class="language-python">class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
v3 = v1 + v2        # __add__
print(v3)            # Vector(4, 6) — __str__
print(len(v1))       # 5 — __len__
print(v1 == v2)      # False — __eq__</code></pre>

        <table>
            <tr><th>Method</th><th>Dùng khi</th><th>Ví dụ</th></tr>
            <tr><td><code>__str__</code></td><td>print(obj)</td><td>Hiển thị đẹp</td></tr>
            <tr><td><code>__repr__</code></td><td>repr(obj)</td><td>Debug</td></tr>
            <tr><td><code>__add__</code></td><td>obj1 + obj2</td><td>Phép cộng</td></tr>
            <tr><td><code>__eq__</code></td><td>obj1 == obj2</td><td>So sánh</td></tr>
            <tr><td><code>__lt__</code></td><td>obj1 < obj2</td><td>Nhỏ hơn</td></tr>
            <tr><td><code>__len__</code></td><td>len(obj)</td><td>Độ dài</td></tr>
            <tr><td><code>__getitem__</code></td><td>obj[key]</td><td>Truy cập index</td></tr>
        </table>

        <h2>7. @classmethod & @staticmethod 🏭</h2>
        <p>Python có 3 loại method trong class:</p>
        <table>
            <tr><th>Loại</th><th>Decorator</th><th>Tham số đầu</th><th>Truy cập</th><th>Khi nào dùng</th></tr>
            <tr><td><strong>Instance method</strong></td><td>(không cần)</td><td><code>self</code></td><td>Instance + Class</td><td>Thao tác với object cụ thể</td></tr>
            <tr><td><strong>Class method</strong></td><td><code>@classmethod</code></td><td><code>cls</code></td><td>Chỉ Class</td><td>Factory method, đếm instances</td></tr>
            <tr><td><strong>Static method</strong></td><td><code>@staticmethod</code></td><td>(không có)</td><td>Không cần class/instance</td><td>Utility/helper function</td></tr>
        </table>

        <h3>7.1 @classmethod — Phương thức lớp</h3>
        <p><code>@classmethod</code> nhận <code>cls</code> (class) thay vì <code>self</code> (instance). Dùng để tạo factory method hoặc thao tác với class attribute.</p>
        <pre><code class="language-python">class Person:
    instances = []    # Class attribute — danh sách tất cả instances

    def __init__(self, firstname, lastname):
        self.firstname = firstname
        self.lastname = lastname
        Person.instances.append(self)

    @classmethod
    def count_instances(cls):
        """Class method — đếm số instances đã tạo"""
        return len(cls.instances)

    @classmethod
    def from_fullname(cls, fullname):
        """Factory method — tạo Person từ chuỗi 'Họ Tên'"""
        firstname, lastname = fullname.split(' ', 1)
        return cls(firstname, lastname)

    def __repr__(self):
        return f"Person('{self.firstname}', '{self.lastname}')"

# Tạo bằng __init__ thông thường
p1 = Person("An", "Nguyễn")
p2 = Person("Bình", "Trần")

# Tạo bằng factory method
p3 = Person.from_fullname("Chi Lê")

print(Person.count_instances())   # 3
print(p3)                         # Person('Chi', 'Lê')</code></pre>

        <h3>7.2 @staticmethod — Phương thức tĩnh</h3>
        <p><code>@staticmethod</code> không nhận <code>self</code> hay <code>cls</code>. Đây là hàm tiện ích nằm trong class cho gọn.</p>
        <pre><code class="language-python">import uuid
import time

class Book:
    def __init__(self, title, author):
        self.book_id = Book.get_id()    # Gọi static method
        self.title = title
        self.author = author

    @staticmethod
    def get_id():
        """Tạo ID 6 ký tự ngẫu nhiên"""
        return str(uuid.uuid4().fields[-1])[:6]

    @staticmethod
    def get_current_time():
        """Trả về thời gian hiện tại"""
        return time.strftime('%H:%M:%S', time.localtime())

    def __repr__(self):
        return f"Book('{self.title}', id={self.book_id})"

book = Book('Python OOP', 'Edcorner')
print(book)                        # Book('Python OOP', id=54274)
print(Book.get_current_time())     # 09:45:10</code></pre>

        <div class="note-box" style="background:#1a2332;border-left:4px solid #818cf8;padding:12px;margin:10px 0;border-radius:6px;">
            <strong>🏭 Khi nào dùng gì?</strong><br>
            • <strong>Instance method</strong> (self): thao tác dữ liệu của 1 object → <code>person.introduce()</code><br>
            • <strong>@classmethod</strong> (cls): thao tác dữ liệu class, factory method → <code>Person.from_fullname("An Nguyen")</code><br>
            • <strong>@staticmethod</strong>: utility function, không cần self/cls → <code>Book.get_id()</code>
        </div>

        <h2>8. Tóm tắt OOP</h2>
        <table>
            <tr><th>Khái niệm</th><th>Ý nghĩa</th></tr>
            <tr><td>Class</td><td>Bản thiết kế cho đối tượng</td></tr>
            <tr><td>Object</td><td>Thực thể cụ thể của lớp</td></tr>
            <tr><td>Kế thừa</td><td>Lớp con kế thừa lớp cha (đơn, đa cấp, đa kế thừa)</td></tr>
            <tr><td>Đa hình</td><td>Cùng method, hành vi khác → Duck typing</td></tr>
            <tr><td>Đóng gói</td><td>Ẩn dữ liệu, @property getter/setter</td></tr>
            <tr><td>Trừu tượng</td><td>ABC + @abstractmethod bắt buộc implement</td></tr>
            <tr><td>@classmethod</td><td>Phương thức lớp — nhận cls, factory method, đếm instances</td></tr>
            <tr><td>@staticmethod</td><td>Phương thức tĩnh — utility function, không cần self/cls</td></tr>
        </table>
    `,
    exercises: [
        {
            title: "Bài tập 01 - Class cơ bản",
            content: "Tạo lớp SinhVien với thuộc tính và phương thức.",
            code: `class SinhVien:
    def __init__(self, mssv, ten, diem):
        self.mssv = mssv
        self.ten = ten
        self.diem = diem

    def xep_loai(self):
        if self.diem >= 8: return "Giỏi"
        elif self.diem >= 6.5: return "Khá"
        elif self.diem >= 5: return "TB"
        else: return "Yếu"

    def hien_thi(self):
        xl = self.xep_loai()
        print(f"{self.mssv} | {self.ten:15} | {self.diem:.1f} | {xl}")

# Tạo đối tượng
ds = [SinhVien("SV01", "An", 8.5),
      SinhVien("SV02", "Bình", 6.0),
      SinhVien("SV03", "Cúc", 9.2)]

print(f"{'MSSV':5} | {'Tên':15} | Điểm | XL")
print("-" * 40)
for sv in ds:
    sv.hien_thi()`,
            explanation: "Mỗi SinhVien là 1 object riêng biệt. Phương thức xep_loai() xử lý logic bên trong."
        },
        {
            title: "Bài tập 02 - Giải PT bậc 1 OOP",
            content: "Tạo class giải phương trình ax + b = 0.",
            code: `class GPTB1:
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def giai(self):
        if self.a == 0:
            print("Nhập số a khác 0!")
        else:
            x = -self.b / self.a
            print(f"PT: {self.a}x + {self.b} = 0")
            print(f"Nghiệm x = {x}")

# Giải 2 phương trình khác nhau
pt1 = GPTB1(4, 2)
pt1.giai()

print()
pt2 = GPTB1(3, -9)
pt2.giai()`,
            explanation: "OOP giúp tạo nhiều bài toán khác nhau từ cùng 1 class. Mỗi object có a, b riêng."
        },
        {
            title: "Bài tập 03 - Kế thừa & Đa hình",
            content: "Hệ thống quản lý nhân viên với kế thừa.",
            code: `class NhanVien:
    def __init__(self, ten, luong_co_ban):
        self.ten = ten
        self.luong_co_ban = luong_co_ban

    def tinh_luong(self):
        return self.luong_co_ban

class NhanVienFulltime(NhanVien):
    def tinh_luong(self):
        return self.luong_co_ban + 2000000  # Phụ cấp

class NhanVienParttime(NhanVien):
    def __init__(self, ten, luong_co_ban, so_gio):
        super().__init__(ten, luong_co_ban)
        self.so_gio = so_gio

    def tinh_luong(self):
        return self.luong_co_ban * self.so_gio

# Đa hình
ds = [NhanVienFulltime("An", 10000000),
      NhanVienParttime("Bình", 50000, 100)]

for nv in ds:
    print(f"{nv.ten}: {nv.tinh_luong():,.0f}đ")`,
            explanation: "Đa hình: cùng gọi tinh_luong() nhưng mỗi loại tính khác nhau."
        },
        {
            title: "Bài tập 04 - Kế thừa nâng cao 🔥",
            content: "Hệ thống hình học với abstract class, đa kế thừa và polymorphism.",
            code: `from abc import ABC, abstractmethod
import math

# === Abstract Base Class ===
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

    def describe(self):
        print(f"  📐 {self.__class__.__name__}")
        print(f"     Diện tích: {self.area():.2f}")
        print(f"     Chu vi:    {self.perimeter():.2f}")

# === Các lớp con ===
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def perimeter(self):
        return 2 * math.pi * self.radius

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Square(Rectangle):
    """Square kế thừa Rectangle"""
    def __init__(self, side):
        super().__init__(side, side)

class Triangle(Shape):
    def __init__(self, a, b, c):
        self.a, self.b, self.c = a, b, c

    def area(self):
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s*(s-self.a)*(s-self.b)*(s-self.c))

    def perimeter(self):
        return self.a + self.b + self.c

# === Đa hình — xử lý chung tất cả Shape ===
shapes = [
    Circle(5),
    Rectangle(4, 6),
    Square(3),
    Triangle(3, 4, 5)
]

print("🔷 DANH SÁCH HÌNH:")
total_area = 0
for shape in shapes:
    shape.describe()
    total_area += shape.area()

print(f"\\n📊 Tổng diện tích: {total_area:.2f}")

# === isinstance() kiểm tra kiểu ===
for s in shapes:
    if isinstance(s, Rectangle):
        print(f"{s.__class__.__name__} là Rectangle")`,
            explanation: "ABC bắt buộc implement abstract methods. Square kế thừa Rectangle (đa cấp). Đa hình: xử lý chung qua Shape."
        },
        {
            title: "Bài tập 05 - @property & Encapsulation 🔒",
            content: "Tạo class BankAccount với @property, getter/setter, validation đầy đủ.",
            code: `class BankAccount:
    _interest_rate = 0.05  # Class variable — lãi suất chung

    def __init__(self, owner, balance=0):
        self._owner = owner
        self.__balance = balance  # Private
        self.__transactions = []  # Lịch sử giao dịch

    @property
    def owner(self):
        return self._owner

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        raise AttributeError("Không thể set balance trực tiếp! Dùng deposit/withdraw.")

    @property
    def transaction_count(self):
        """Read-only"""
        return len(self.__transactions)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Số tiền phải > 0!")
        self.__balance += amount
        self.__transactions.append(f"+{amount:,.0f}đ")
        print(f"✅ Gửi {amount:,.0f}đ → Số dư: {self.__balance:,.0f}đ")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Số tiền phải > 0!")
        if amount > self.__balance:
            raise ValueError(f"Không đủ số dư! Hiện có: {self.__balance:,.0f}đ")
        self.__balance -= amount
        self.__transactions.append(f"-{amount:,.0f}đ")
        print(f"💰 Rút {amount:,.0f}đ → Số dư: {self.__balance:,.0f}đ")

    def add_interest(self):
        interest = self.__balance * self._interest_rate
        self.__balance += interest
        self.__transactions.append(f"+{interest:,.0f}đ (lãi)")
        print(f"📈 Lãi: {interest:,.0f}đ → Số dư: {self.__balance:,.0f}đ")

    def show_history(self):
        print(f"\\n📋 Lịch sử giao dịch ({self._owner}):")
        for i, tx in enumerate(self.__transactions, 1):
            print(f"  {i}. {tx}")
        print(f"  → Số dư hiện tại: {self.__balance:,.0f}đ")

    def __str__(self):
        return f"BankAccount({self._owner}, {self.__balance:,.0f}đ)"

    def __repr__(self):
        return self.__str__()

# === Test ===
acc = BankAccount("Nguyễn An", 1000000)
print(acc)

acc.deposit(500000)
acc.deposit(2000000)
acc.withdraw(300000)
acc.add_interest()
acc.show_history()

# Property
print(f"\\nOwner: {acc.owner}")
print(f"Balance: {acc.balance:,.0f}đ")
print(f"Giao dịch: {acc.transaction_count}")

# Thử set trực tiếp
try:
    acc.balance = 999999
except AttributeError as e:
    print(f"❌ {e}")`,
            explanation: "@property tạo getter, @x.setter tạo setter. Private (__) + property = encapsulation hoàn hảo."
        },
        {
            title: "Bài tập 06 - Magic Methods & Operator Overloading ✨",
            content: "Tạo class Money hỗ trợ phép tính, so sánh, format.",
            code: `class Money:
    RATES = {"VND": 1, "USD": 25000, "EUR": 27000, "JPY": 170}

    def __init__(self, amount, currency="VND"):
        self.amount = amount
        self.currency = currency.upper()

    def to_vnd(self):
        """Chuyển sang VND"""
        return self.amount * self.RATES.get(self.currency, 1)

    # === Magic Methods ===
    def __str__(self):
        return f"{self.amount:,.0f} {self.currency}"

    def __repr__(self):
        return f"Money({self.amount}, '{self.currency}')"

    def __add__(self, other):
        """Cộng tiền (quy đổi sang VND)"""
        total = self.to_vnd() + other.to_vnd()
        return Money(total, "VND")

    def __sub__(self, other):
        diff = self.to_vnd() - other.to_vnd()
        return Money(diff, "VND")

    def __mul__(self, factor):
        return Money(self.amount * factor, self.currency)

    def __eq__(self, other):
        return self.to_vnd() == other.to_vnd()

    def __lt__(self, other):
        return self.to_vnd() < other.to_vnd()

    def __le__(self, other):
        return self.to_vnd() <= other.to_vnd()

    def __gt__(self, other):
        return self.to_vnd() > other.to_vnd()

    def __bool__(self):
        return self.amount > 0

    def __format__(self, spec):
        if spec == "vnd":
            return f"{self.to_vnd():,.0f} VND"
        return str(self)

# === Test ===
salary = Money(1000, "USD")
bonus = Money(500, "EUR")
tip = Money(5000000, "VND")

print(f"Lương:  {salary}")
print(f"Thưởng: {bonus}")
print(f"Tips:   {tip}")

# Phép cộng
total = salary + bonus + tip
print(f"\\nTổng: {total}")

# Phép nhân
double = salary * 2
print(f"Gấp đôi lương: {double}")

# So sánh
print(f"\\nLương > Thưởng? {salary > bonus}")
print(f"Lương == 25tr VND? {salary == Money(25000000)}")

# Format
print(f"\\nLương (VND): {salary:vnd}")

# Sort
incomes = [Money(500, "USD"), Money(10000000), Money(300, "EUR")]
incomes.sort()  # Dùng __lt__
print("\\nSắp xếp tăng dần:")
for m in incomes:
    print(f"  {m} = {m:vnd}")`,
            explanation: "Magic methods cho phép dùng operators (+, -, *, ==, <, >) với object. __format__ cho f-string."
        },
        {
            title: "Bài tập 07 - Person @classmethod 🏭",
            content: "Tạo class Person với @classmethod đếm instances và factory method from_fullname().",
            code: `class Person:
    instances = []

    def __init__(self, firstname, lastname):
        self.firstname = firstname
        self.lastname = lastname
        Person.instances.append(self)

    @classmethod
    def count_instances(cls):
        """Đếm số Person đã tạo"""
        return len(cls.instances)

    @classmethod
    def from_fullname(cls, fullname):
        """Factory: tạo Person từ 'Họ Tên'"""
        parts = fullname.split(' ', 1)
        return cls(parts[0], parts[1])

    def __repr__(self):
        return f"Person('{self.firstname}', '{self.lastname}')"

# === 1. Tạo bằng __init__ ===
p1 = Person("An", "Nguyễn")
p2 = Person("Bình", "Trần")
print(f"Số instance: {Person.count_instances()}")   # 2

# === 2. Factory method ===
p3 = Person.from_fullname("Chi Lê")
p4 = Person.from_fullname("Dũng Phạm")
print(f"Số instance: {Person.count_instances()}")   # 4
print(p3)   # Person('Chi', 'Lê')
print(p4)   # Person('Dũng', 'Phạm')

# === 3. Duyệt tất cả instances ===
print("\\nDanh sách:")
for p in Person.instances:
    print(f"  {p.firstname} {p.lastname}")`,
            explanation: "@classmethod nhận cls (class) thay vì self. Factory method tạo object từ dữ liệu khác format. instances list là class attribute dùng chung."
        },
        {
            title: "Bài tập 08 - Book @staticmethod 📘",
            content: "Tạo class Book với @staticmethod tạo ID ngẫu nhiên và lấy thời gian hiện tại.",
            code: `import uuid
import time

class Book:
    def __init__(self, title, author):
        self.book_id = Book.get_id()
        self.title = title
        self.author = author

    @staticmethod
    def get_id():
        """Tạo ID 6 ký tự ngẫu nhiên"""
        return str(uuid.uuid4().fields[-1])[:6]

    @staticmethod
    def get_current_time():
        """Thời gian hiện tại"""
        return time.strftime('%H:%M:%S', time.localtime())

    def __repr__(self):
        return f"Book(title='{self.title}', author='{self.author}')"

# === 1. Tạo sách ===
book1 = Book('Python OOP Vol.2', 'Edcorner')
book2 = Book('Clean Code', 'Robert Martin')

print(book1)
print(f"  ID: {book1.book_id}")
print(book2)
print(f"  ID: {book2.book_id}")

# === 2. Gọi static method từ class ===
print(f"\\nThời gian: {Book.get_current_time()}")
print(f"ID mới: {Book.get_id()}")

# === 3. __dict__ ===
print(f"\\nKeys: {book1.__dict__.keys()}")`,
            explanation: "@staticmethod không nhận self hay cls — là hàm tiện ích nằm trong class. uuid tạo ID duy nhất, time.strftime format thời gian."
        },
        {
            title: "Bài tập 09 - Vector đầy đủ operators ➕➖✖️➗",
            content: "Xây dựng class Vector với đầy đủ special methods: __repr__, __str__, __len__, __add__, __sub__, __mul__, __truediv__.",
            code: `class Vector:
    def __init__(self, *components):
        self.components = components

    def __repr__(self):
        return f"Vector{self.components}"

    def __str__(self):
        return f"{self.components}"

    def __len__(self):
        return len(self.components)

    def __add__(self, other):
        result = tuple(x + y for x, y in zip(self.components, other.components))
        return Vector(*result)

    def __sub__(self, other):
        result = tuple(x - y for x, y in zip(self.components, other.components))
        return Vector(*result)

    def __mul__(self, other):
        result = tuple(x * y for x, y in zip(self.components, other.components))
        return Vector(*result)

    def __truediv__(self, other):
        result = tuple(x / y for x, y in zip(self.components, other.components))
        return Vector(*result)

    def __bool__(self):
        return len(self.components) > 0 and self.components[0] != 0

# === Test ===
v1 = Vector(4, 2)
v2 = Vector(-1, 3)

print(f"v1 = {repr(v1)}")          # Vector(4, 2)
print(f"v2 = {repr(v2)}")          # Vector(-1, 3)
print(f"len(v1) = {len(v1)}")      # 2

print(f"\\nv1 + v2 = {v1 + v2}")    # (3, 5)
print(f"v1 - v2 = {v1 - v2}")      # (5, -1)
print(f"v1 * v2 = {v1 * v2}")      # (-4, 6)
print(f"v1 / v2 = {v1 / v2}")      # (-4.0, 0.666...)

# === __bool__ ===
v3 = Vector(0, 5)
v4 = Vector()
print(f"\\nbool(v1) = {bool(v1)}")   # True
print(f"bool(v3) = {bool(v3)}")     # False (tọa độ đầu = 0)
print(f"bool(v4) = {bool(v4)}")     # False (rỗng)`,
            explanation: "zip() ghép cặp tọa độ tương ứng. Mỗi __dunder__ method cho phép dùng 1 operator: + → __add__, - → __sub__, * → __mul__, / → __truediv__."
        },
        {
            title: "Bài tập 10 - Doc class: __add__, __eq__, __lt__ 📄",
            content: "Tạo class Doc lưu văn bản với operators: cộng (nối), so sánh bằng, so sánh nhỏ hơn, gán cộng (+=).",
            code: `class Doc:
    def __init__(self, string):
        self.string = string

    def __repr__(self):
        return f"Doc(string='{self.string}')"

    def __str__(self):
        return self.string

    def __add__(self, other):
        """Nối 2 Doc bằng dấu cách"""
        return Doc(self.string + ' ' + other.string)

    def __eq__(self, other):
        """So sánh bằng — cùng nội dung"""
        return self.string == other.string

    def __lt__(self, other):
        """Nhỏ hơn — chuỗi ngắn hơn"""
        return len(self.string) < len(other.string)

    def __iadd__(self, other):
        """Gán cộng += nối bằng ' & '"""
        return Doc(self.string + ' & ' + other.string)

# === 1. Cộng ===
d1 = Doc('Python')
d2 = Doc('3.12')
print(d1 + d2)                 # Python 3.12

# === 2. So sánh ===
d3 = Doc('Finance')
d4 = Doc('Finance')
d5 = Doc('Education')
print(f"\\nd3 == d4: {d3 == d4}")   # True (cùng nội dung)
print(f"d3 == d5: {d3 == d5}")     # False

# === 3. Nhỏ hơn ===
print(f"d3 < d5: {d3 < d5}")      # True (7 < 9 ký tự)

# === 4. Gán cộng ===
sport = Doc('sport')
activity = Doc('activity')
sport += activity
print(f"\\nsport += activity: {sport}")   # sport & activity`,
            explanation: "__add__ cho +, __eq__ cho ==, __lt__ cho <, __iadd__ cho +=. Mỗi operator mapping đến 1 magic method cụ thể."
        },
        {
            title: "Bài tập 11 - Đa kế thừa: Person + Department → Worker 👨‍💼",
            content: "Tạo class Worker kế thừa từ Person và Department. Hiển thị MRO (Method Resolution Order).",
            code: `class Person:
    def __init__(self, first_name, last_name, age):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def info(self):
        return f"{self.first_name} {self.last_name}, {self.age} tuổi"

class Department:
    def __init__(self, dept_name, short_name):
        self.dept_name = dept_name
        self.short_name = short_name

    def dept_info(self):
        return f"{self.dept_name} ({self.short_name})"

class Worker(Person, Department):
    """Đa kế thừa: kết hợp Person + Department"""
    def __init__(self, first_name, last_name, age, dept_name, short_name):
        Person.__init__(self, first_name, last_name, age)
        Department.__init__(self, dept_name, short_name)

    def __repr__(self):
        return f"Worker('{self.first_name} {self.last_name}', dept='{self.short_name}')"

# === 1. Tạo Worker ===
w1 = Worker('An', 'Nguyễn', 28, 'Công nghệ thông tin', 'IT')
w2 = Worker('Bình', 'Trần', 35, 'Nhân sự', 'HR')

print(w1.info())           # An Nguyễn, 28 tuổi
print(w1.dept_info())      # Công nghệ thông tin (IT)
print(w1.__dict__)

# === 2. MRO ===
print("\\nMRO (Method Resolution Order):")
for cls in Worker.mro():
    print(f"  {cls.__name__}")
# Worker → Person → Department → object

# === 3. isinstance ===
print(f"\\nw1 là Worker? {isinstance(w1, Worker)}")     # True
print(f"w1 là Person? {isinstance(w1, Person)}")       # True
print(f"w1 là Department? {isinstance(w1, Department)}")  # True`,
            explanation: "Đa kế thừa: class Worker(Person, Department). Gọi __init__ từng lớp cha. MRO quyết định thứ tự tìm method: Worker → Person → Department → object."
        },
        {
            title: "Bài tập 12 - Abstract Class: Figure → Square, Circle 📐",
            content: "Tạo abstract class Figure với ABC, implement Square và Circle tính diện tích + chu vi.",
            code: `from abc import ABC, abstractmethod
import math

class Figure(ABC):
    """Abstract class — không thể tạo instance trực tiếp"""

    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Square(Figure):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

    def perimeter(self):
        return 4 * self.side

    def __repr__(self):
        return f"Square(side={self.side})"

class Circle(Figure):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def perimeter(self):
        return 2 * math.pi * self.radius

    def __repr__(self):
        return f"Circle(radius={self.radius})"

# === 1. Không thể tạo Figure ===
try:
    fig = Figure()
except TypeError as e:
    print(f"❌ {e}")

# === 2. Tạo Square và Circle ===
sq = Square(10)
ci = Circle(5)

print(f"\\n{sq}")
print(f"  Diện tích: {sq.area()}")
print(f"  Chu vi: {sq.perimeter()}")

print(f"\\n{ci}")
print(f"  Diện tích: {ci.area():.2f}")
print(f"  Chu vi: {ci.perimeter():.2f}")

# === 3. Polymorphism ===
shapes = [Square(3), Circle(7), Square(5), Circle(2)]
print("\\n📊 Tổng diện tích:")
total = sum(s.area() for s in shapes)
print(f"  {total:.2f}")`,
            explanation: "ABC + @abstractmethod bắt buộc lớp con implement method. Không thể tạo instance của abstract class. Polymorphism: gọi area() trên mọi shape."
        },
        {
            title: "Bài tập 13 - TaxPayer: ABC + Đa hình 💰",
            content: "Hệ thống tính thuế với abstract class TaxPayer và 3 loại: Student (15%), Disabled (12%, tối đa 5000), Worker (17%/32%).",
            code: `from abc import ABC, abstractmethod

class TaxPayer(ABC):
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    @abstractmethod
    def calculate_tax(self):
        pass

    def __repr__(self):
        return f"{self.__class__.__name__}('{self.name}', {self.salary:,.0f})"

class StudentTaxPayer(TaxPayer):
    """Sinh viên: thuế 15%"""
    def calculate_tax(self):
        return self.salary * 0.15

class DisabledTaxPayer(TaxPayer):
    """Người khuyết tật: thuế 12%, tối đa 5,000"""
    def calculate_tax(self):
        return min(self.salary * 0.12, 5000.0)

class WorkerTaxPayer(TaxPayer):
    """Công nhân: ≤80k → 17%, >80k → 32%"""
    def calculate_tax(self):
        if self.salary <= 80000:
            return self.salary * 0.17
        return 80000 * 0.17 + (self.salary - 80000) * 0.32

# === Tạo danh sách đóng thuế ===
taxpayers = [
    StudentTaxPayer('An', 50000),
    DisabledTaxPayer('Bình', 70000),
    WorkerTaxPayer('Chi', 68000),
    WorkerTaxPayer('Dũng', 120000),
]

print("📋 BẢNG THUẾ:")
print(f"{'Tên':<10} {'Loại':<20} {'Lương':>10} {'Thuế':>10}")
print("-" * 55)
for tp in taxpayers:
    tax = tp.calculate_tax()
    tp_type = tp.__class__.__name__.replace('TaxPayer', '')
    print(f"{tp.name:<10} {tp_type:<20} {tp.salary:>10,.0f} {tax:>10,.0f}")

total_tax = sum(tp.calculate_tax() for tp in taxpayers)
print(f"\\n💰 Tổng thuế: {total_tax:,.0f}")`,
            explanation: "Đa hình thực tế: cùng gọi calculate_tax() nhưng mỗi loại tính khác nhau. ABC bắt buộc implement — không thể quên."
        },
        {
            title: "📝 Câu hỏi ôn tập - Lập trình hướng đối tượng",
            content: `Trả lời các câu hỏi trắc nghiệm sau:

1. Trong OOP, "class" là gì ?
    A.Một biến
B.Bản thiết kế để tạo đối tượng
C.Một hàm
D.Một module

2. Phương thức __init__ dùng để:
A.Xóa đối tượng
B.In đối tượng
C.Khởi tạo thuộc tính khi tạo đối tượng
D.Kế thừa lớp cha

3. Tham số "self" trong class Python đại diện cho:
A.Lớp cha
B.Đối tượng hiện tại
C.Biến toàn cục
D.Module

4. Kế thừa(Inheritance) là gì ?
    A.Sao chép code
B.Lớp con nhận thuộc tính và phương thức của lớp cha
C.Xóa lớp cũ
D.Tạo biến mới

5. Đa hình(Polymorphism) cho phép:
A.Tạo nhiều class
    B. Cùng phương thức nhưng hành vi khác nhau ở các lớp con
C.Xóa phương thức
D.Thêm biến

6. Thuộc tính __balance(2 gạch dưới) trong class là:
A.Thuộc tính public
B.Thuộc tính protected
C.Thuộc tính private(đóng gói)
D.Thuộc tính static

7. super().__init__() dùng để:
A.Tạo đối tượng mới
B.Gọi phương thức __init__ của lớp cha
C.Xóa đối tượng
D.In thông tin lớp`,
            code: `# ĐÁP ÁN:
# 1. B(Class = bản thiết kế, Object = thực thể cụ thể)
# 2. C(__init__ = constructor, khởi tạo thuộc tính ban đầu)
# 3. B(self tham chiếu đến đối tượng hiện tại đang gọi phương thức)
# 4. B(Kế thừa: lớp con nhận thuộc tính / phương thức từ lớp cha)
# 5. B(Đa hình: cùng tên phương thức, hành vi khác ở mỗi lớp con)
# 6. C(__ = private, không truy cập trực tiếp từ bên ngoài)
# 7. B(super().__init__() gọi constructor của lớp cha)`,
            explanation: "OOP gồm 4 trụ cột: Đóng gói (Encapsulation), Kế thừa (Inheritance), Đa hình (Polymorphism), Trừu tượng (Abstraction)."
        },
        {
            title: "📝 Câu hỏi ôn tập - OOP Nâng Cao",
            content: `Trả lời các câu hỏi trắc nghiệm nâng cao:

1. @property dùng để:
A.Tạo biến static
B.Biến method thành thuộc tính(getter)
C.Xóa thuộc tính
D.Import module

2. @abstractmethod bắt buộc lớp con phải:
A.Gọi super()
B.Implement phương thức đó
C.Tạo __init__
D.Dùng @property

3. Duck typing nghĩa là:
A.Kiểm tra kiểu nghiêm ngặt
B.Không quan tâm kiểu, chỉ cần có method cần gọi
C.Tạo class Duck
   D.Kế thừa bắt buộc

4. MRO(Method Resolution Order) dùng để:
A.Sắp xếp methods
B.Xác định thứ tự tìm method trong đa kế thừa
C.Xóa method trùng
D.Tạo method mới

5. __str__ được gọi khi nào ?
    A.Khi tạo object
B.Khi print(object)
C.Khi xóa object
D.Khi import class

6. self._name(1 gạch dưới) là:
A.Private — không truy cập được
B.Protected — quy ước nội bộ, vẫn truy cập được
C.Public
D.Static

7. __slots__ dùng để:
A.Tạo nhiều method
B.Giới hạn thuộc tính, tối ưu bộ nhớ
C.Kế thừa nhiều class
    D. Tạo abstract class

8. Đa kế thừa: class C(A, B) — nếu A và B đều có method x(), Python gọi:
A.B.x()
B.A.x()(theo MRO, A trước B)
C.Cả hai
D.Báo lỗi

9. isinstance(dog, Animal) trả về True khi:
A.dog là Animal hoặc lớp con của Animal
B.dog chỉ là Animal
C.dog có thuộc tính animal
D.dog là string "Animal"

10. class MyError(Exception): pass — đây là:
A.Đa hình
B.Kế thừa(MyError kế thừa Exception)
C.Đóng gói
D.Duck typing`,
            code: `# ĐÁP ÁN:
# 1. B(@property biến method thành getter attribute)
# 2. B(Lớp con PHẢI implement abstract method)
# 3. B(Duck typing: có method → gọi được, không cần kiểm tra kiểu)
# 4. B(MRO xác định thứ tự tìm method trong đa kế thừa)
# 5. B(print() tự gọi __str__ của object)
# 6. B(1 gạch = protected, quy ước, vẫn truy cập)
# 7. B(__slots__ giới hạn thuộc tính, tiết kiệm RAM)
# 8. B(MRO: C → A → B → object, nên gọi A.x() trước)
# 9. A(isinstance kiểm tra cả lớp con — kế thừa)
# 10. B(Kế thừa: MyError là lớp con của Exception)`,
            explanation: "Nguồn: Lập trình Python Nâng Cao. @property, ABC, duck typing, magic methods là OOP chuyên nghiệp."
        },
    ]
};
