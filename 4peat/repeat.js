var s,ULcolor=["Yellow","#ffec80"],URcolor=["Crimson","Red"],LLcolor=["CornflowerBlue","Cyan"],LRcolor=["#FFCC99","#FF7F50"],v="",n="",winqty=0,seq_choice=0,seq_array=[],roundnum=0,seq_index=0,chc_array=[],chc_index=0,roundwin=!1,no_input=!0,record=0,newGame=document.getElementById("start"),ongoing_game=!1;function sequence(){ongoing_game=!0,newGame.removeEventListener("click",sequence),newGame.innerHTML="",newGame.style.opacity="0",newGame.style.filter="alpha(opacity=0)",document.getElementById("indicator").innerHTML="ROUND # "+parseInt(winqty+1)+" ... Watch and Listen!",seq_choice=Math.floor(1+4*Math.random()),seq_array.push(seq_choice),no_input=!0,s=setInterval(seq_display,580)}function seq_display(){seq_index<=seq_array.length-1?(1==seq_array[seq_index]?(v=1,n="UL_Button"):2==seq_array[seq_index]?(v=2,n="UR_Button"):3==seq_array[seq_index]?(v=3,n="LL_Button"):(v=4,n="LR_Button"),seq_index+=1,highlight()):(clearInterval(s),no_input=!1,document.getElementById("indicator").innerHTML="GO!...")}function buttonclick(e,t){1==no_input||(v=e,n=t,highlight(),chc_array.push(e),check())}function check(){chc_index<=seq_array.length-1&&(chc_array[chc_index]==seq_array[chc_index]?chc_index==seq_array.length-1?endgame(roundwin=!0):chc_index+=1:(endgame(roundwin=!1),sound("4peat/snd_wrong.wav")))}function endgame(e){1==e?(document.getElementById("indicator").innerHTML="YOU WON THAT ROUND!",(winqty+=1)>record&&(record=winqty,document.getElementById("NEW_RECORD").innerHTML=record),setTimeout(sequence,2e3)):(document.getElementById("indicator").innerHTML="WRONG BUTTON! GAME OVER! TRY AGAIN!",winqty=0,seq_array=[],ongoinggame=!1,newGame.addEventListener("click",sequence),newGame.innerHTML="New Game",newGame.style.opacity="1",newGame.style.filter="alpha(opacity=100)"),chc_array=[],no_input=!0,seq_index=0,chc_index=0,document.getElementById("rounds_won").innerHTML=winqty}function highlight(){1==v?(document.getElementById(n).style.backgroundColor=ULcolor[1],document.getElementById(n).style.boxShadow="0px 0px 50px "+ULcolor[1],sound("4peat/snd_ylw.wav")):2==v?(document.getElementById(n).style.backgroundColor=URcolor[1],document.getElementById(n).style.boxShadow="0px 0px 50px "+URcolor[1],sound("4peat/snd_red.wav")):3==v?(document.getElementById(n).style.backgroundColor=LLcolor[1],document.getElementById(n).style.boxShadow="0px 0px 50px "+LLcolor[1],sound("4peat/snd_blu.wav")):(document.getElementById(n).style.backgroundColor=LRcolor[1],document.getElementById(n).style.boxShadow="0px 0px 50px "+LRcolor[1],sound("4peat/snd_orange.wav")),document.getElementById(n).style.border="1px solid gray",document.getElementById(n).style.color=document.getElementById(n).style.backgroundColor,setTimeout(dehighlight,180)}function sound(e){document.getElementById("snd").src=e,document.getElementById("snd").play()}function dehighlight(){document.getElementById(n).style.backgroundColor=1==v?ULcolor[0]:2==v?URcolor[0]:3==v?LLcolor[0]:LRcolor[0],document.getElementById(n).style.boxShadow="0px 0px 30px black",document.getElementById(n).style.border="2px solid black",document.getElementById(n).style.color="black"}newGame.addEventListener("click",sequence);