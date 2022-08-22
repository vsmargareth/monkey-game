
function start(){

    $("#inicio").hide();
    
    $("#fundogame").append("<div id='jogador' class='anima1'></div>");
    $("#fundogame").append("<div id='arvore'></div>");
    $("#fundogame").append("<div id='banana1' class='bananas'></div>")
    $("#fundogame").append("<div id='banana2' class='bananas'></div>")
    $("#fundogame").append("<div id='banana3' class='bananas'></div>")
    $("#fundogame").append("<div id='tronco1' class='troncos'></div>")
    $("#fundogame").append("<div id='tronco2' class='troncos'></div>")
    $("#fundogame").append("<div id='pedra'></div>")
    $("#fundogame").append("<div id='energia'></div>")
    $("#fundogame").append("<div id='placar'></div>")
      
    //principais variáveis do jogo
    var bananas=0;
    var pontos=0;
    var perdidas=0;
    var energiaAtual=3;
    var fimDeJogo= false;
    var jogo = {};
    var velocidade1=5;
    var velocidade2=2;
    var velocidade3=4;
    var posicaoY= parseInt(Math.random()* 350);
    var TECLA = {
        Q: 81,
        Z: 90
        }
   
    var somGameOver= document.getElementById("somGameOver");
    var somFundo= document.getElementById("somFundo");
    
    var sons=[];
    sons[0]= new Audio('/sounds/pegar-banana.mp3');
    sons[1]=new Audio('/sounds/explosao.mp3')

    //Fim das principais variáveis

    //musica em loop
    somFundo.addEventListener("ended", function(){ somFundo.currentTime = 0; somFundo.play(); }, false);
    somFundo.play();
    
    jogo.pressionou = [];

    $(document).keydown(function(e){
        jogo.pressionou[e.which]=true;
        });
    $(document).keyup(function(e){
        jogo.pressionou[e.which]=false;
        });

    //game Loop
    jogo.timer= setInterval(loop, 30);
    
    //função loop
    function loop(){
        moveFundo();
        moveJogador();
        moveTronco1();
        moveTronco2();
        movePedra();
        moveBanana1();
        moveBanana2();
        moveBanana3();
        colisao();
        placar();
        energia();
        
    }//fim da função loop

    function moveFundo(){
        esquerda= parseInt($("#fundogame").css("background-position"));
        $("#fundogame").css("background-position",esquerda+3);
    }// fim da função move fundo

    function moveJogador(){

        if(jogo.pressionou[TECLA.Q]) {
            var topo=parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo -10) //AGORA MOVE 10UNIDAES PARA CIMA
            if(topo <=150 ){
                $("#jogador").css("top",topo +10)
            }
        }
        
        if(jogo.pressionou[TECLA.Z]){
            var topo=parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo +10)
                if(topo >= 500 ){
                        $("#jogador").css("top",topo -10)
                }
            }
    }//fim da funçãomove jogador

    function moveTronco1(){
        posicaoX= parseInt($("#tronco1").css("left"));
        $("#tronco1").css("left", posicaoX-velocidade1);
        
        
        if(posicaoX<=0){
            posicaoY= parseInt(Math.random()* 330);
            $("#tronco1").css("top", (posicaoY+200));
            $("#tronco1").css("left",820);
        }
    }

    function moveTronco2(){
        posicaoX= parseInt($("#tronco2").css("left"));
        $("#tronco2").css("left", posicaoX-velocidade2);
       
        
        if(posicaoX<=0){
            posicaoY= parseInt(Math.random()* 330);
            $("#tronco2").css("top", (posicaoY+200));
            $("#tronco2").css("left",820);
        }
    }
    function movePedra(){
        posicaoX= parseInt($("#pedra").css("left"));
        $("#pedra").css("left", posicaoX-velocidade3);

        if(posicaoX<=0){
            $("#pedra").remove();
            reposicionaPedra();
        }
    }
    function moveBanana1(){
        posicaoX= parseInt($("#banana1").css("left"));
        $("#banana1").css("left", posicaoX-velocidade3);

        if(posicaoX<=0){
            perdidas++;
            $("#banana1").remove();
            reposicionaBanana1();
        }
    }
    function moveBanana2(){
        posicaoX= parseInt($("#banana2").css("left"));
        $("#banana2").css("left", posicaoX-velocidade2);

        if(posicaoX<=0){
            perdidas++;
            posicaoY=parseInt(Math.random()*330);
            $("#banana2").css("top",(posicaoY+200));
            $("#banana2").css("left",820);
        }
    }
    function moveBanana3(){
      
        posicaoX= parseInt($("#banana3").css("left"));
        $("#banana3").css("left", posicaoX-velocidade1);

        if(posicaoX<=0){
            perdidas++;
            posicaoY=parseInt(Math.random()*330);
            $("#banana3").css("top",(posicaoY+200));
            $("#banana3").css("left",820);
        }
    }

    function colisao(){
        var colisao1= ($("#jogador").collision($("#tronco1")));
        var colisao2= ($("#jogador").collision($("#tronco2")))
        var colisao3= ($("#jogador").collision($("#pedra")))
        var colisao4= ($("#jogador").collision($("#banana1")))
        var colisao5= ($("#jogador").collision($("#banana2")))
        var colisao6= ($("#jogador").collision($("#banana3")))

        if (colisao1.length>0) { //jogador X tronco1
            energiaAtual--;
            sons[1].play();

            tronco1X = parseInt($("#jogador").css("left"));
            tronco1Y = parseInt($("#jogador").css("top"));

            explosao1(tronco1X,tronco1Y);

            posicaoY=parseInt(Math.random()*330);
            $("#tronco1").css("left",841);
            $("#tronco1").css("top",posicaoY+200);
        }
        if(colisao2.length>0){//jogador X tronco2
            energiaAtual--;
            sons[1].play();

            tronco2X=parseInt($("#jogador").css("left"));
            tronco2Y=parseInt($("#jogador").css("top"));

            explosao2(tronco2X,tronco2Y);

            posicaoY=parseInt(Math.random()*330);
            $("#tronco2").css("left",841);
            $("#tronco2").css("top",posicaoY+200)
        }
        if(colisao3.length>0){ //jogador X pedra

            energiaAtual-- //RETIRANDO ENERGIA
            sons[1].play();

            pedraX=parseInt($("#jogador").css("left"));
            pedraY=parseInt($("#jogador").css("top"));

            explosao3(pedraX,pedraY);// APARECENDO EXPLOSÃO
            $("#pedra").remove();
            reposicionaPedra();
           
        }
        if(colisao4.length>0){ //jogador X banana1
            
            // somBanana.play()
            sons[0].play();

            velocidade3= velocidade3 + 0.5;
            bananas++;
            pontos=pontos+10;
            $("#banana1").remove();
            reposicionaBanana1();
             
        }
        if(colisao5.length>0){ //jogador X banana2
            sons[0].play();
            velocidade2= velocidade2 + 0.5;
            bananas++;
            pontos=pontos+50;
            $("#banana2").remove();
            reposicionaBanana2();
        }
        if(colisao6.length>0){ //jogador X banana3
            
            sons[0].play();
           velocidade1 = velocidade1 + 0.5;
           bananas++;

           pontos= pontos+100;
           $("#banana3").remove();
           reposicionaBanana3();
        }
    }//fim da função colisão

    function explosao1(tronco1X, tronco1Y){
        $("#fundogame").append("<div id='explosao1'></div>")
        $("#explosao1").css("background-image","url(/img/boom.png)");
        var div=$("#explosao1");
        div.css("top", tronco1Y);
        div.css("#left",tronco1X);
        div.animate({width:96, opaccity:0},"slow");

        var tempoExplosao=window.setInterval(removeExplosao1,500);
        function removeExplosao1(){
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao=null;
        }
    }// fim da função explosão1
    function explosao2(tronco2X, tronco2Y){
        $("#fundogame").append("<div id='explosao2'></div>");
        $("#explosao2").css("background-image","url(/img/boom.png)");
        var div2= $("#explosao2");
        div2.css("top", tronco2Y);
        div2.css("left", tronco2X);
        div2.animate({width:96, opaccity:0},"slow");
        var tempoExplosao2= window.setInterval(removeExplosao2,1000);

        function removeExplosao2(){
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2=null;
        }
    }//fim dafunção explosao2
    function explosao3(pedraX,pedraY){
        
        // somColisao.play();
        $("#fundogame").append("<div id='explosao3'></div")
        $("#explosao3").css("background-image", "url(/img/boom.png)")
        var div3=$("#explosao3");
        div3.css("top", pedraY);
        div3.css("left", pedraX);
        div3.animate({width:96, opaccity:0}, "slow");

        var tempoExplosao3 = window.setInterval(removeExplosao3, 1000);
        function removeExplosao3(){
            div3.remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3=null;
        }
    }// fim da função explosão3

    function reposicionaPedra(){
        var tempoDeColisao3= window.setInterval(reposicionaP,6000);
        function reposicionaP(){
            window.clearInterval(tempoDeColisao3);
            tempoDeColisao3=null;
            if(fimDeJogo == false){
                $("#fundogame").append("<div id='pedra'></div>")
                posicaoY=parseInt(Math.random()*330);//REPOSICIONANDO PEDRA
                $("#pedra").css("top",posicaoY+200)
                movePedra();
            }
        }
    }

    function reposicionaBanana1(){
        var tempoDeColisao4= window.setInterval(reposicionaB1,5000);
        function reposicionaB1(){
            window.clearInterval(tempoDeColisao4);
            tempoDeColisao4=null;

            if (fimDeJogo == false){
                $("#fundogame").append("<div id='banana1' class='bananas'></div>")
                posicaoY=parseInt(Math.random()*330);//REPOSICIONANDO PEDRA
                $("#banana1").css("top",posicaoY+200)
                moveBanana1();
            }
        }
    }// fim função reposiciona banana1

    function reposicionaBanana2(){
        var tempoDeColisao5= window.setInterval(reposicionaB2,4000);
        function reposicionaB2(){
            window.clearInterval(tempoDeColisao5);
            tempoDeColisao5=null;

            if (fimDeJogo == false){
                $("#fundogame").append("<div id='banana2' class='bananas'></div>")
            }
        }
    }// fim função reposiciona banana2

    function reposicionaBanana3(){
        var tempoDeColisao6= window.setInterval(reposicionaB3,4000);
        function reposicionaB3(){
            window.clearInterval(tempoDeColisao6);
            tempoDeColisao6=null;

            if (fimDeJogo == false){
                $("#fundogame").append("<div id='banana3' class='bananas'></div>")
            }
        }
    }// fim função reposiciona banana3

    function placar(){
        $("#placar").html("<h2> Pontos: "+ pontos + "  Bananas: " + bananas + "  Perdidas: "+ perdidas +"</h2>");

    }// fim da função placar
    function energia(){
        if (energiaAtual == 3){
            $("#energia").css("background-image","url(/img/energia3.png)")
        }
        if(energiaAtual == 2){
            $("#energia").css("background-image","url(/img/energia2.png)")
        }
        if(energiaAtual == 1){
            $("#energia").css("background-image","url(/img/energia1.png)")
        }
        if (energiaAtual == 0){
            gameOver();
        }
    }//fim da função energia

    function gameOver(){
        fimDeJogo=true;

        somFundo.pause();
        somGameOver.play();

        window.clearInterval(jogo.timer)
        jogo.timer= null;
        $("#jogador").remove();
        $("#tronco1").remove();
        $("#tronco2").remove();
        $("#pedra").remove();
        $("#banana1").remove();
        $("#banana2").remove();
        $("#banana3").remove();
        $("#energia").remove();
        $("#placar").remove();

        $("#fundogame").append("<div id='fim'> </div>");
        $("#fim").html("<h1>Game Over</h1><p>Sua pontuação foi: "+pontos+ "</p>" +"<div id='reinicia' onClick= reiniciaJogo()> <h3>Jogar Novamente </h3></div>");
    }

}// fim da função start

function reiniciaJogo(){
        $("#fim").remove();
       
        start();
}//fim da função reinicia jogo
function loop(){

}

