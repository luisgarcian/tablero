 const vtas_scales = {
    yAxes: [{
      type: "linear",
      display: true,
      position: "left",
      id: "y-axis-1",
      labels: {
          show:true,
      },
      ticks: {
             callback: function(value, index, values) {
               return '$' + formatoMX(value);
           }
      },
      scaleLabel: {
         display: true,
         labelString: 'Pesos'
      }
    }, 
    {
      type: "linear",
      display: true,
      position: "right",
      id: "y-axis-2",
      labels: {
          show:true,
      },
      ticks: {
        callback: function(value, index, values) {
          return  formatoMX(value);
      }
      },
      scaleLabel: {
        display: true,
        labelString: 'Unidades'
     }
    }],
    xAxes: [{
      maxBarThickness: 30,
      maxBarLength: 2,  
      display:true,
      gridLines: {
        //display:false
      },
      ticks: {
          fontSize : 10,
          autoSkip : false,
          maxRotation: 45,
          minRotation:45
      }
    }]
 }
 
 const negadas_scales = {
    yAxes: [
      {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          labels: { 
              show:true,
          },
          ticks: {
                 callback: function(value, index, values) {
                  return  formatoMX(value);
                 }
          },
          scaleLabel: {
             display: true,
             labelString: 'Opciones'
          }
      }, 
      {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          labels: {
              show:true,
          },
          ticks: {
                 callback: function(value, index, values) {
                     return  formatoMX(value);
                  }
          },
          scaleLabel: {
              display: true,
              labelString: 'Negadas'
          }
      },
      {  
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-3",
          labels: {
              show:true,
          },
          ticks: {
             callback: function(value, index, values) {
                return  formatoMX(value) + "%";
             }
          },
          scaleLabel: {
              display: true,
              labelString: 'Porcentaje'
          }
      }
   ], //fin yAxes
   xAxes: [
     {
         display:true,
         maxBarThickness: 30,
         maxBarLength: 2,  
         gridLines: {
           //display:false
         },
         ticks: {
             fontSize : 10,
             autoSkip : false,
             maxRotation: 45,
             minRotation:45
         }
      }
   ] //fin xAxes
  };

