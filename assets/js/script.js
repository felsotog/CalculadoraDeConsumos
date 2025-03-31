// Script para la Calculadora de Consumos

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del formulario principal
    const lecturaAnterior = document.getElementById('lecturaAnterior');
    const lecturaActual = document.getElementById('lecturaActual');
    const consumo = document.getElementById('consumo');
    const valorKwh = document.getElementById('valorKwh');
    const valorLuz = document.getElementById('valorLuz');
    const valorAgua = document.getElementById('valorAgua');
    const valorTotal = document.getElementById('valorTotal');

    // Referencias a elementos del formulario de agua
    const valorAguaTotal = document.getElementById('valorAguaTotal');
    const cantidadPersonas = document.getElementById('cantidadPersonas');
    const calcularAguaBtn = document.getElementById('calcularAgua');

    // Referencias a elementos del formulario de luz
    const valorTotalLuzBoleta = document.getElementById('valorTotalLuzBoleta');
    const valorTotalKwhBoleta = document.getElementById('valorTotalKwhBoleta');
    const calcularLuzBtn = document.getElementById('calcularLuz');

    // Función para formatear números en pesos chilenos
    function formatearPesosChilenos(valor) {
        // Redondear a entero (sin decimales)
        const valorEntero = Math.round(valor);
        // Formatear con separador de miles y símbolo de peso chileno
        return '$ ' + valorEntero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Función para calcular el consumo
    function calcularConsumo() {
        if (lecturaAnterior.value && lecturaActual.value) {
            const anterior = parseFloat(lecturaAnterior.value);
            const actual = parseFloat(lecturaActual.value);
            
            // Calcular el consumo sin importar si la lectura actual es menor que la anterior
            const consumoCalculado = actual - anterior;
            consumo.value = consumoCalculado;
            calcularValorLuz();
        } else {
            consumo.value = '';
            valorLuz.value = '';
            actualizarTotal();
        }
    }

    // Función para calcular el valor de la luz
    function calcularValorLuz() {
        if (consumo.value && valorKwh.value) {
            const consumoNum = parseFloat(consumo.value);
            const valorKwhNum = parseFloat(valorKwh.value.replace(/[^\d.-]/g, ''));
            const valorLuzCalculado = consumoNum * valorKwhNum;
            valorLuz.value = formatearPesosChilenos(valorLuzCalculado);
            actualizarTotal();
        } else if (consumo.value && !valorKwh.value) {
            alert('Falta llenar el dato del valor kWh. Por favor, complete el formulario de luz.');
            valorLuz.value = '';
            actualizarTotal();
        } else {
            valorLuz.value = '';
            actualizarTotal();
        }
    }

    // Función para actualizar el valor total
    function actualizarTotal() {
        let totalLuz = 0;
        let totalAgua = 0;

        if (valorLuz.value) {
            // Eliminar el símbolo $ y los puntos separadores de miles
            totalLuz = parseFloat(valorLuz.value.replace(/[$.]/g, '').replace(',', '.'));
        }

        if (valorAgua.value) {
            // Eliminar el símbolo $ y los puntos separadores de miles
            totalAgua = parseFloat(valorAgua.value.replace(/[$.]/g, '').replace(',', '.'));
        }

        const total = totalLuz + totalAgua;
        valorTotal.value = formatearPesosChilenos(total);
    }

    // Event listeners para el formulario principal
    lecturaAnterior.addEventListener('input', calcularConsumo);
    lecturaActual.addEventListener('input', calcularConsumo);

    // Event listener para el botón de cálculo de agua
    calcularAguaBtn.addEventListener('click', function() {
        if (valorAguaTotal.value && cantidadPersonas.value) {
            const totalAgua = parseFloat(valorAguaTotal.value);
            const personas = parseFloat(cantidadPersonas.value);
            
            if (personas > 0) {
                const valorAguaPorPersona = totalAgua / personas;
                valorAgua.value = formatearPesosChilenos(valorAguaPorPersona);
                actualizarTotal();
            } else {
                alert('La cantidad de personas debe ser mayor a cero');
            }
        } else {
            alert('Por favor, complete todos los campos del formulario de agua');
        }
    });

    // Event listener para el botón de cálculo de luz
    calcularLuzBtn.addEventListener('click', function() {
        if (valorTotalLuzBoleta.value && valorTotalKwhBoleta.value) {
            const totalLuz = parseFloat(valorTotalLuzBoleta.value);
            const totalKwh = parseFloat(valorTotalKwhBoleta.value);
            
            if (totalKwh > 0) {
                const valorKwhCalculado = totalLuz / totalKwh;
                valorKwh.value = formatearPesosChilenos(valorKwhCalculado);
                calcularValorLuz();
            } else {
                alert('El valor total de kWh debe ser mayor a cero');
            }
        } else {
            alert('Por favor, complete todos los campos del formulario de luz');
        }
    });
});