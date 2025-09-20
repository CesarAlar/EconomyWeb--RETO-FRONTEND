const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');

const invercion = document.getElementById('invercion')
const formulario__inversion = document.querySelector('.formulario__inversion')
const contacto_form = document.querySelector(".contacto_form")
const contacto = document.querySelector(".contacto")

contacto_form.addEventListener("submit", formulario_contacto )
formulario__inversion.addEventListener('submit', btnInvercion)

let resultados = [] ;


const labels = Array.from({ length: 6 }, (_, i) => {
  return new Date(0, i).toLocaleString("es-ES", { month: "long" });
});

function btnInvercion(e) {
    e.preventDefault()
    if(invercion.value === ''){
        const contenido_principal = document.getElementById('contenido_principal');
        const alertaExistente = document.querySelector('.alerta');

        if (alertaExistente) return; // Si ya existe, no hacer nada

        const p = document.createElement('p')
        p.classList.add('alerta')
        p.textContent = 'Campo Vacio'
        contenido_principal.insertBefore(p,formulario__inversion)
        console.log('campo vacio')

        setTimeout(() => {
          p.remove()
        }, 2000);
    }else{
      
      for (let i = 1; i <= 6; i++) {
          resultados.push(Number(invercion.value) * i);
      }
      // grafica 1
      const data = {
        labels: labels,
        datasets: [{
          label: 'Ganancias en acciones',
          data:  resultados,
          fill: false,
          borderColor: 'rgba(91, 255, 121, 1)',
          tension: 0.1,
          borderWidth: 5,
        }]
      };
      const grafica1 = new Chart(ctx, {
          type: 'line',
          data: data ,
          options: {
              scales: {
              y: {
                  beginAtZero: true
              }
              }
          }
      });
      // grafica 2
      const data2 = {
      labels: labels,
      datasets: [{
        label: 'Ganancias en Cripto',
        data: resultados,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    const grafica2 = new Chart(ctx2, {
        type: 'bar',
        data: data2 ,
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
    }); 
        console.log(resultados)
    }
}



function formulario_contacto(e) {
    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefono: document.getElementById("telefono").value.trim()
    };

    // Validar campos vacíos
    if (Object.values(data).includes('')) {
        const alertaExistente = document.querySelector('.campos');

        if (alertaExistente) return; // Si ya existe, no hacer nada

        const p = document.createElement('p')
        p.classList.add('campos', 'alerta')
        p.textContent = 'Todos los campos son obligatorios.'
        contacto.insertBefore(p,contacto_form)

        setTimeout(() => {
          p.remove()
        }, 2000);
        return;
    }

    // Validar email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(data.email)) {
        const alertaExistente = document.querySelector('.correo');

        if (alertaExistente) return; // Si ya existe, no hacer nada

        const p = document.createElement('p')
        p.classList.add('correo', 'alerta')
        p.textContent = 'Por favor, ingresa un email válido.'
        contacto_form.insertBefore(p,document.getElementById('correo'))

        setTimeout(() => {
          p.remove()
        }, 2000);
        return;
    }

    // Validar teléfono (10 dígitos numéricos)
    const regexTelefono = /^[0-9]{10}$/;
    if (!regexTelefono.test(data.telefono)) {
        const alertaExistente = document.querySelector('.tel');

        if (alertaExistente) return; // Si ya existe, no hacer nada

        const p = document.createElement('p')
        p.classList.add('tel', 'alerta')
        p.textContent = 'El teléfono debe tener exactamente 10 dígitos.'
        contacto_form.insertBefore(p,document.getElementById('tel'))

        setTimeout(() => {
          p.remove()
        }, 2000);
        return;
    }

    const alertaExistente = document.querySelector('.enviado');

    if (alertaExistente) return; // Si ya existe, no hacer nada

    const p = document.createElement('p')
    p.classList.add('enviado',)
    p.textContent = 'Nos contactaremos lo mas pronto posible'
    contacto.insertBefore(p,contacto_form)

    setTimeout(() => {
      p.remove()
    }, 3000);
    contacto_form.reset()
    
};


