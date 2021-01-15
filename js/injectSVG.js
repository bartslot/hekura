$(function(){  
    var container = $("#btn");
    var svgUrl    = "../assets/SVG/btn.svg";
    
    $.get(svgUrl)
      .then(injectSvg)
    //   .always(startAnimation);
    
    function injectSvg(xmlDoc) {
      var svg = $(xmlDoc).find("svg");
      container.append(svg);
    }
  });