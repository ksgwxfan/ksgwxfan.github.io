rgb = [[0,0,0],[255,255,255],[128,0,0],[255,0,0],[255,128,128],[0,128,0],[0,255,0],[128,255,128],[0,0,128],[0,0,255],[128,128,255],[255,140,0],[255,255,0],[0,255,255]]

for x in rgb:
	print('<div class="row"><div class="col" style="background-color: rgb({},{},{});" onClick="chg_clr(\'rgb({},{},{})\')"><!--black --></div></div>'.format(x[0],x[1],x[2],x[0],x[1],x[2]))