const Producto = function (nombre, precio, stock, image) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.image = image;
  };
  
  let producto1 = new Producto("monster clasica", 3500, 212, null);
    let producto2 = new Producto("monster mango loco", 3500, 150, null);
    let producto3 = new Producto("monster zero", 3500, 90, null);
    let producto4 = new Producto("monster sin azucar", 3500, 100, null);
    let producto5 = new Producto("monster limon", 3500, 30, null);
    let producto6 = new Producto("monster black", 3500, 65, null);
    let producto7 = new Producto("monster sandia", 3500, 55, null);
  
  let lista = [
    producto1,
    producto2,
    producto3,
    producto4,
    producto5,
    producto6,
    producto7,
  ];
  
  if (localStorage.getItem("productos")) {
    lista = JSON.parse(localStorage.getItem("productos"));
  } else {
    lista = lista;
  }
  
  function filtrarProducto() {
    Swal.fire({
      title: "Ingresa el producto que deseas buscar",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Buscar",
      showLoaderOnConfirm: true,
      preConfirm: (palabraClave) => {
        palabraClave = palabraClave.trim().toUpperCase();
        let resultado = lista.filter((producto) =>
          producto.nombre.toUpperCase().includes(palabraClave)
        );
  
        if (resultado.length > 0) {
          Swal.fire({
            title: "Este es el resultado de tu búsqueda",
            html:
              "<table> <tr> <th>Nombre</th> <th>Precio</th> <th>Stock</th> <th>Imagen</th></tr>" +
              resultado
                .map(
                  (producto) =>
                    `<tr><td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td><td><img src="${producto.image}" style="width: 100px; height: auto;" /></td></tr>`
                )
                .join("") +
              "</table>",
          });
        } else {
          Swal.fire({
            title: `No se encuentran coincidencias`,
            icon: "error",
            confirmButtonText: `Ok`,
          });
        }
      },
    });
  }
  
  function agregarProducto() {
    Swal.fire({
      title: `Agregar Producto`,
      html: `<label>Nombre:</label> <input id="nombre-input" class="swal2-input" type="text" autofocus>
               <label>Precio:</label><input id="precio-input" class="swal2-input" type="number" step="0.01">
               <label>Stock:</label><input id="stock-input" class="swal2-input" type="number" step="1">
               <label>Imagen:</label><input id="image-input" class="swal2-input" type="file">`,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let nombre = document.getElementById("nombre-input").value.trim();
        let precio = document.getElementById("precio-input").value.trim();
        let stock = document.getElementById("stock-input").value.trim();
        let image = document.getElementById("image-input").files[0];
  
        if (isNaN(precio) || isNaN(stock) || nombre === "") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor ingresa valores válidos",
          });
          return;
        }
  
        let producto = new Producto(nombre, precio, stock, null); 
  
        if (image) {
          const reader = new FileReader();
          reader.onloadend = function () {
            producto.image = reader.result; 
            agregarProductoALaLista(producto);
          };
          reader.readAsDataURL(image); 
        } else {
          agregarProductoALaLista(producto);
        }
      }
    });
  }
  
  function agregarProductoALaLista(producto) {
    if (lista.some((elemento) => elemento.nombre === producto.nombre)) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "El producto ya existe en la lista",
      });
      return;
    }
  
    lista.push(producto);
  
    localStorage.setItem("productos", JSON.stringify(lista));
  
    Swal.fire({
      icon: "success",
      title: "Producto Agregado",
      text: `Se agregó el producto ${producto.nombre} a la lista`,
      timer: 3000,
    });
  
    console.table(lista);
  }
  
  let agregar = document.getElementById("agregar");
  agregar.addEventListener("click", agregarProducto);
  
  let filtrar = document.getElementById("filtrar");
  filtrar.addEventListener("click", filtrarProducto);
  