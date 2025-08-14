class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.total = price * quantity;
  }
}

class ProductManager {
  constructor() {
    // Lấy dữ liệu từ localStorage hoặc mảng rỗng
    this.products = JSON.parse(localStorage.getItem("products")) || [];
  }

  saveData() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }

  showMenu() {
    let choice;
    do {
      choice = prompt(
        "=== MENU QUẢN LÝ SẢN PHẨM ===\n" +
          "1. Hiển thị danh sách sản phẩm\n" +
          "2. Thêm mới sản phẩm\n" +
          "3. Sửa sản phẩm\n" +
          "4. Xóa sản phẩm\n" +
          "0. Thoát\n" +
          "Nhập lựa chọn của bạn:"
      );

      switch (choice) {
        case "1":
          this.displayProducts();
          break;
        case "2":
          this.addProduct();
          break;
        case "3":
          this.editProduct();
          break;
        case "4":
          this.deleteProduct();
          break;
        case "0":
          alert("Chương trình kết thúc!");
          break;
        default:
          alert("Lựa chọn không hợp lệ!");
      }
    } while (choice !== "0");
  }

  displayProducts() {
    if (this.products.length === 0) {
      alert("Danh sách sản phẩm trống!");
      return;
    }

    let table = "ID\tTên\tGiá\tSố lượng\tTổng\n";
    table += "--------------------------------------\n";
    this.products.forEach((p) => {
      table += `${p.id}\t${p.name}\t${p.price}\t${p.quantity}\t${p.total}\n`;
    });
    alert(table);
  }

  addProduct() {
    let id, name, price, quantity;

    // Validate ID
    do {
      id = prompt("Nhập ID sản phẩm:");
      if (!id) alert("ID không được để trống!");
    } while (!id);

    // Validate Name
    do {
      name = prompt("Nhập tên sản phẩm:");
      if (!name) alert("Tên không được để trống!");
    } while (!name);

    // Validate Price
    do {
      price = parseFloat(prompt("Nhập giá sản phẩm:"));
      if (isNaN(price) || price <= 0) alert("Giá phải là số > 0!");
    } while (isNaN(price) || price <= 0);

    // Validate Quantity
    do {
      quantity = parseInt(prompt("Nhập số lượng sản phẩm:"));
      if (isNaN(quantity) || quantity <= 0) alert("Số lượng phải là số > 0!");
    } while (isNaN(quantity) || quantity <= 0);

    const newProduct = new Product(id, name, price, quantity);
    this.products.push(newProduct);
    this.saveData();
    alert("Thêm sản phẩm thành công!");
  }

  editProduct() {
    const id = prompt("Nhập ID sản phẩm muốn sửa:");
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      alert("Không tìm thấy sản phẩm!");
      return;
    }

    const newName = prompt(`Tên sản phẩm (${product.name}):`) || product.name;
    const newPrice =
      parseFloat(prompt(`Giá sản phẩm (${product.price}):`)) || product.price;
    const newQuantity =
      parseInt(prompt(`Số lượng (${product.quantity}):`)) || product.quantity;

    product.name = newName;
    product.price = newPrice;
    product.quantity = newQuantity;
    product.total = product.price * product.quantity;

    this.saveData();
    alert("Cập nhật sản phẩm thành công!");
  }

  deleteProduct() {
    const id = prompt("Nhập ID sản phẩm muốn xóa:");
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) {
      alert("Không tìm thấy sản phẩm!");
      return;
    }

    const confirmDelete = confirm(`Bạn có chắc muốn xóa sản phẩm ID: ${id}?`);
    if (confirmDelete) {
      this.products.splice(index, 1);
      this.saveData();
      alert("Xóa sản phẩm thành công!");
    }
  }
}

// Chạy chương trình
const manager = new ProductManager();
manager.showMenu();
