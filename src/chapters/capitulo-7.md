---
layout: chapter.njk
title: "El crédito, los bancos y la expansión artificial"
subtitle: ""
chapterSlug: capitulo-7
---

### Lo que creés que hace un banco

<img src="/assets/img/capitulo-7.png" />

Cuando la mayoría de las personas piensa en cómo funciona un banco, tiene en mente algo así: la gente deposita dinero, el banco lo guarda, y cuando alguien necesita un préstamo, el banco toma parte de ese dinero depositado y se lo presta.

Esa imagen es razonable, intuitiva, y está profundamente equivocada.

No porque sea completamente falsa. Sino porque omite algo fundamental que cambia todo: **los bancos no prestan el dinero que reciben. Crean dinero nuevo cuando otorgan crédito.**

### Cómo empezó todo: los orfebres

En la Europa medieval, quien quería guardar su oro de manera segura lo llevaba a un orfebre. A cambio del oro, emitía un recibo que decía "el portador de este documento tiene depositado X cantidad de oro en mi bóveda". Con el tiempo, la gente empezó a intercambiar esos recibos en lugar del oro físico. El recibo era más cómodo.

Hasta ahí el sistema era honesto. Cada recibo representaba oro real guardado en alguna bóveda.

Pero los orfebres observaron que en condiciones normales, nunca todos venían a retirar el oro al mismo tiempo. Siempre había una fracción quieta en la bóveda. Y ahí nació la tentación: emitir recibos adicionales por oro que en realidad no estaba ahí. Mientras no todos vinieran a retirar el oro al mismo tiempo, nadie se daría cuenta.

Eso es exactamente lo que empezaron a hacer. Y eso es, en esencia, lo que hacen los bancos modernos hasta el día de hoy.

### La banca de reserva fraccionaria

El sistema que describimos tiene un nombre técnico: **banca de reserva fraccionaria**. Significa que los bancos guardan solo una fracción del dinero depositado como reserva, y crean crédito nuevo por encima de lo que tienen.

Con números concretos: depositás 1.000 pesos. El banco mantiene el 10% como reserva y presta los otros 900. Esos 900 se depositan en otro banco, que guarda 90 y presta 810. Y así sucesivamente. Al final del proceso, tus 1.000 pesos originales se convirtieron en aproximadamente 10.000 pesos en depósitos circulando en el sistema.

Ese proceso se llama **multiplicación del crédito**, y es el mecanismo por el cual el sistema bancario crea dinero.

<div class="widget" id="widget-multiplicador">
<span class="widget-label">&#9650; Interactivo &mdash; La multiplicación del crédito</span>
<p class="widget-intro">Con reserva del 10%, $1.000 depositados originalmente se convierten en $10.000 circulando en el sistema. Cambiá la tasa de reserva y mirá cómo cambia todo.</p>
<div class="mult-controls">
<label class="interes-slider-label" for="mult-slider">Reserva bancaria obligatoria: <strong id="mult-rate-val">10</strong>%</label>
<input type="range" id="mult-slider" class="interes-slider" min="5" max="30" value="10" step="1">
</div>
<div class="mult-cascade-wrap">
<div class="mult-cascade-header">
<span class="mult-col-bank"></span>
<span class="mult-col-received">Recibió</span>
<span class="mult-col-keep">Guarda</span>
<span class="mult-col-lend">Presta →</span>
</div>
<div id="mult-cascade"></div>
<div class="mult-more">&#8942; el proceso continúa</div>
</div>
<div class="mult-total-box">
<div class="mult-total-row">
<span class="mult-total-lbl">Total en el sistema</span>
<span class="mult-total-val" id="mult-total-val"></span>
</div>
<div class="mult-total-row">
<span class="mult-total-lbl">Multiplicador (1 &divide; reserva)</span>
<span class="mult-total-mult" id="mult-multiplier"></span>
</div>
<div class="mult-total-row mult-total-row--highlight">
<span class="mult-total-lbl">Dinero creado de la nada</span>
<span class="mult-total-new" id="mult-new-money"></span>
</div>
</div>
</div>
<script src="/assets/js/widgets/multiplicador.js"></script>

### Crédito genuino versus crédito artificial

El crédito genuino es el que canaliza ahorro real hacia inversión productiva. Alguien consume menos de lo que produce, ese excedente queda disponible, y a través del sistema financiero llega a manos de quien quiere invertir.

El crédito artificial es diferente. No proviene de ahorro real. Es dinero creado de la nada por el sistema bancario, sin que nadie haya resignado consumo presente para generarlo.

Cuando el crédito es genuino, los recursos reales están disponibles. Cuando el crédito es artificial, el dinero existe pero los recursos reales no necesariamente están disponibles en la misma medida. Muchas empresas reciben crédito simultáneamente y todas intentan acceder a los mismos recursos escasos. El resultado es que los precios suben y los proyectos se vuelven más costosos de lo esperado.

### Qué hace realmente el banco central

El banco central puede crear dinero de la nada, sin ningún respaldo en ahorro real ni en ningún bien físico. Puede hacerlo comprando bonos del gobierno, prestando a los bancos, o simplemente acreditando números en una pantalla.

Cuando el banco central crea dinero e inyecta liquidez al sistema, los bancos pueden expandir el crédito más allá de lo que el ahorro real de la economía justificaría. Las tasas de interés bajan artificialmente. El crédito se abarata. La economía parece expandirse. Pero esa expansión tiene pies de barro.

### Por qué el sistema es intrínsecamente frágil

La banca de reserva fraccionaria tiene una vulnerabilidad estructural: está permanentemente expuesta a una **corrida bancaria**. Si todos los depositantes intentan retirar su dinero al mismo tiempo, el banco no puede pagarlo. Por definición. Porque solo tiene una fracción del dinero depositado como reserva.

La respuesta del sistema moderno fue crear el banco central como prestamista de última instancia. El problema es que eso elimina el riesgo para los bancos y los incentiva a tomar riesgos aún mayores, sabiendo que si las cosas salen mal alguien los va a rescatar. Ese fenómeno se llama **riesgo moral**.

### Lo que esto significa para tu dinero

El dinero que tenés en el banco no está ahí guardado esperándote. Está prestado, en gran parte. Lo que tenés es un crédito contra el banco, una promesa de pago que en situaciones de crisis puede volverse difícil de cumplir.

El crédito barato y abundante distorsiona los precios de los activos. Cuando hay mucho crédito disponible a tasas bajas, la gente lo usa para comprar inmuebles, acciones, o cualquier activo que crea que va a subir. Eso infla los precios más allá de lo que justificaría su valor real.

### Lo que aprendiste en este capítulo

- Los bancos no guardan el dinero que depositás: crean dinero nuevo cuando otorgan crédito
- La banca de reserva fraccionaria permite que un depósito inicial se multiplique en muchos más pesos en crédito
- El crédito genuino canaliza ahorro real; el crédito artificial crea dinero sin respaldo en recursos reales
- El banco central puede crear dinero de la nada, expandiendo el crédito más allá de lo que el ahorro real justifica
- La banca de reserva fraccionaria es estructuralmente frágil: una corrida bancaria puede colapsar cualquier banco
- El riesgo moral emerge cuando los bancos saben que serán rescatados
- Tu dinero en el banco no está guardado: es una promesa de pago que depende de la estabilidad del sistema