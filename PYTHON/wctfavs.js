let products = document.getElementById("products");

function populate_products() {
	for (product of prod_list) {
		opt = document.createElement("option");
		opt.value = product.value;
		opt.innerText = product.description;
		products.appendChild(opt);
	}
}

	let prod_list = [
        {"value": "null", "description": "TDWR PRODUCTS -----------------------------------------------"},
        {"value": "180z0", "description": "TZ0 - Base Reflectivity - 48 nmi Range - 0.1-0.8deg"},
        {"value": "180z1", "description": "TZ1 - Base Reflectivity - 48 nmi Range - 1.0deg"},
        {"value": "180z2", "description": "TZ2 - Base Reflectivity - 48 nmi Range - 1.6-3.7deg"},
        {"value": "182v0", "description": "TV0 - Base Radial Velocity - 48 nmi Range - 0.1-0.8deg"},
        {"value": "182v1", "description": "TV1 - Base Radial Velocity - 48 nmi Range - 1.0deg"},
        {"value": "182v2", "description": "TV2 - Base Radial Velocity - 48 nmi Range - 1.6-3.7deg"},
        {"value": "186zl", "description": "TZL - Long Range Reflectivity - 225 nmi Range - 0.6deg"},
        {"value": "null", "description": "------ WSR88D SPECIALTY PRODUCTS ---------------------------------"},
        {"value": "57vil", "description": "NVL - Vertical Integrated Liquid"},
        {"value": "134il", "description": "DVL - Digital Vertical Integrated Liquid"},
        {"value": "p41et", "description": "NET - Echo Tops"},
        {"value": "135et", "description": "EET - Enhanced Echo Tops"},
        {"value": "48vwp", "description": "NVW - Velocity Azimuth Dispaly VAD Wind Profile"},
        {"value": "null", "description": "------ WSR88D - minus0.2 DEG -------------------------------------"},
        {"value": "p94rx", "description": "NXQ - Base Reflectivity - 248 nmi Range - -0.2deg"},
        {"value": "p99vx", "description": "NXU - Base Velocity - 162 nmi Range - -0.2deg"},
        {"value": "159xx", "description": "NXX - Digital Differential Reflectivity - -0.2deg"},
        {"value": "161cx", "description": "NXC - Digital Correlation Coefficient - -0.2deg"},
        {"value": "163kx", "description": "NXK - Digital Specific Differential Phase - -0.2deg"},
        {"value": "165hx", "description": "NXH - Digital Hydrometeor Classification - -0.2deg"},
        {"value": "null", "description": "------ WSR88D - 0.0-0.2 DEG --------------------------------------"},
        {"value": "p94ry", "description": "NYQ - Base Reflectivity - 248 nmi Range - 0.0-0.2deg"},
        {"value": "p99vy", "description": "NYU - Base Velocity - 162 nmi Range - 0.0-0.2deg"},
        {"value": "159xy", "description": "NYX - Digital Differential Reflectivity - 0.0-0.2deg"},
        {"value": "161cy", "description": "NYC - Digital Correlation Coefficient - 0.0-0.2deg"},
        {"value": "163ky", "description": "NYK - Digital Specific Differential Phase - 0.0-0.2deg"},
        {"value": "165hy", "description": "NYH - Digital Hydrometeor Classification - 0.0-0.2deg"},
        {"value": "null", "description": "------ WSR88D - 0.3-0.4 DEG --------------------------------------"},
        {"value": "p94rz", "description": "NZQ - Base Reflectivity - 248 nmi Range - 0.3-0.4deg"},
        {"value": "p99vz", "description": "NZU - Base Velocity - 162 nmi Range - 0.3-0.4deg"},
        {"value": "159xz", "description": "NZX - Digital Differential Reflectivity - 0.3-0.4deg"},
        {"value": "161cz", "description": "NZC - Digital Correlation Coefficient - 0.3-0.4deg"},
        {"value": "163kz", "description": "NZK - Digital Specific Differential Phase - 0.3-0.4deg"},
        {"value": "165hz", "description": "NZH - Digital Hydrometeor Classification - 0.3-0.4deg"},
        {"value": "null", "description": "------ WSR88D - 0.5 DEG ------------------------------------------"},
        {"value": "p19r0", "description": "N0R - Base Reflectivity - 124 nmi Range - 0.5deg - Low Resolution"},
        {"value": "p20-r", "description": "N0Z - Base Reflectivity - 248 nmi Range - 0.5deg - Low Resolution"},
        {"value": "p94r0", "description": "N0Q - Base Reflectivity - 248 nmi Range - 0.5deg"},
        {"value": "32dhr", "description": "DHR - Digital Hybrid Scan Reflectivity"},
        {"value": "p27v0", "description": "N0V - Base Radial Velocity - 124 nmi Range - 0.5deg - Low Resolution"},
        {"value": "p99v0", "description": "N0U - Base Radial Velocity - 162 nmi Range - 0.5deg"},
        {"value": "56rm0", "description": "N0S - Storm Relative Mean Velocity - 0.5deg"},
        {"value": "159x0", "description": "N0X - Digital Differential Reflectivity - 0.5deg"},
        {"value": "161c0", "description": "N0C - Digital Correlation Coefficient - 0.5deg"},
        {"value": "163k0", "description": "N0K - Digital Specific Differential Phase - 0.5deg"},
        {"value": "p30sw", "description": "NSW - Base Spectrum Width - 124km"},
        {"value": "165h0", "description": "N0H - Digital Hydrometeor Classification - 0.5deg"},
        {"value": "177hh", "description": "HHC - Hybrid Scan Hydrometeor Classification"},
        {"value": "null", "description": "------ WSR88D - 0.9 DEG ------------------------------------------"},
        {"value": "p94ra", "description": "NAQ - Base Reflectivity - 248 nmi Range - 0.9deg"},
        {"value": "p99va", "description": "NAU - Base Radial Velocity - 162 nmi Range - 0.9deg"},
        {"value": "159xa", "description": "NAX - Digital Differential Reflectivity - 0.9deg"},
        {"value": "161ca", "description": "NAC - Digital Correlation Coefficient - 0.9deg"},
        {"value": "163ka", "description": "NAK - Digital Specific Differential Phase - 0.9deg"},
        {"value": "165ha", "description": "NAH - Digital Hydrometeor Classification - 0.9deg"},
        {"value": "null", "description": "------ WSR88D - 1.3 DEG ------------------------------------------"},
        {"value": "p94r1", "description": "N1Q - Base Reflectivity - 248 nmi Range - 1.3-1.5deg"},
        {"value": "p99v1", "description": "N1U - Base Radial Velocity - 162 nmi Range - 1.3-1.5deg"},
        {"value": "56rm1", "description": "N1S - Storm Rel. Mean radial velocity map - 1.3-1.5deg"},
        {"value": "159x1", "description": "N1X - Digital Differential Reflectivity - 1.3-1.5deg"},
        {"value": "161c1", "description": "N1C - Digital Correlation Coefficient - 1.3-1.5deg"},
        {"value": "163k1", "description": "N1K - Digital Specific Differential Phase - 1.3-1.5deg"},
        {"value": "165h1", "description": "N1H - Digital Hydrometeor Classification - 1.3-1.5deg"},
        {"value": "null", "description": "------ WSR88D - 1.8 DEG ------------------------------------------"},
        {"value": "p94rb", "description": "NBQ - Base Reflectivity - 248 nmi Range - 1.8deg"},
        {"value": "p99vb", "description": "NBU - Base Radial Velocity - 162 nmi Range - 1.8deg"},
        {"value": "159xb", "description": "NBX - Digital Differential Reflectivity - 1.8deg"},
        {"value": "161cb", "description": "NBC - Digital Correlation Coefficient - 1.8deg"},
        {"value": "163kb", "description": "NBK - Digital Specific Differential Phase - 1.8deg"},
        {"value": "165hb", "description": "NBH - Digital Hydrometeor Classification - 1.8deg"},
        {"value": "null", "description": "------ WSR88D - 2.4 DEG ------------------------------------------"},
        {"value": "p94r2", "description": "N2Q - Base Reflectivity - 248 nmi Range - 2.4-2.5deg"},
        {"value": "p99v2", "description": "N2U - Base Radial Velocity - 162 nmi Range - 2.4-2.5deg"},
        {"value": "56rm2", "description": "N2S - Storm Rel. Mean radial velocity map - 2.4-2.5deg"},
        {"value": "159x2", "description": "N2X - Digital Differential Reflectivity - 2.4-2.5deg"},
        {"value": "161c2", "description": "N2C - Digital Correlation Coefficient - 2.4-2.5deg"},
        {"value": "163k2", "description": "N2K - Digital Specific Differential Phase - 2.4-2.5deg"},
        {"value": "165h2", "description": "N2H - Digital Hydrometeor Classification - 2.4-2.5deg"},
        {"value": "null", "description": "------ WSR88D - 3.1 DEG ------------------------------------------"},
        {"value": "p94r3", "description": "N3Q - Base Reflectivity - 248 nmi Range - 3.1-3.4-3.5deg"},
        {"value": "p99v3", "description": "N3U - Base Radial Velocity - 162 nmi Range - 3.1-3.4-3.5deg"},
        {"value": "56rm3", "description": "N3S - Storm Rel. Mean radial velocity map - 3.1-3.4-3.5deg"},
        {"value": "159x3", "description": "N3X - Digital Differential Reflectivity - 3.1-3.4-3.5deg"},
        {"value": "161c3", "description": "N3C - Digital Correlation Coefficient - 3.1-3.4-3.5deg"},
        {"value": "163k3", "description": "N3K - Digital Specific Differential Phase - 3.1-3.4-3.5deg"},
        {"value": "165h3", "description": "N3H - Digital Hydrometeor Classification - 3.1-3.4-3.5deg"},
        {"value": "null", "description": "------ COMPOSITE REFLECTIVITY ------------------------------------"},
        {"value": "p37cr", "description": "NCR - Composite Reflectivity - 16 levels - 124nmi"},
        {"value": "p38cr", "description": "NCZ - Composite Reflectivity - 16 levels - 248nmi"},
        {"value": "90lrm", "description": "NHL - Layer composite reflectivity Maximum - Upper Level"},
        {"value": "67apr", "description": "NLA - Layer Composite Reflectivity with AP removed"},
        {"value": "66lrm", "description": "NML - Layer Composite Reflectivity Maximum Mid-Level"},
        {"value": "null", "description": "------ PRECIPITATION ---------------------------------------------"},
        {"value": "78ohp", "description": "N1P - Surface Rainfall Accumulation - 1HR Total"},
        {"value": "81dpr", "description": "DPA - Digital Precipitation Array - 1HR"},
        {"value": "169oh", "description": "OHA - One Hour Accumulation - Dual Pol - BIASED"},
        {"value": "170aa", "description": "DAA - Digital Accumulation Array - 1HR - Dual Pol - UNBIASED"},
        {"value": "174od", "description": "DOD - Digital One Hour Difference Accumulation (DAA-N1P)"},
        {"value": "176pr", "description": "DPR - Digital Instantaneous Precipitation Rate"},
        {"value": "79thp", "description": "N3P - Surface Rainfall Accumulation - 3HR Total"},
        {"value": "173u1", "description": "DU3 - Digital User-Selectable Accumulation: 3HR-hrly"},
        {"value": "173u3", "description": "DU6 - Digital User-Selectable Accumulation: 24HR-12Z"},
        {"value": "80stp", "description": "NTP - Surface Rainfall Accumulation - Storm Total"},
        {"value": "171st", "description": "PTA - Storm Total Accumulation - Dual Pol"},
        {"value": "138dp", "description": "DSP - Digital Storm Total Accumulation - PPS"},
        {"value": "172dt", "description": "DTA - Digital Storm Total Accumulation - Dual Pol"},
        {"value": "175sd", "description": "DSD - Digital Storm Total Difference Accumulation (DTA-NTP)"},
        {"value": "null", "description": "------ DATA PRODUCTS ---------------------------------------------"},
        {"value": "p62ss", "description": "NSS - Storm Structure"},
        {"value": "58sti", "description": "NST - Storm Tracking Information"},
        {"value": "141md", "description": "NMD - Mesocyclone"},
        {"value": "61tvs", "description": "NTV - Tornadic Vortex Signature"},
        {"value": "p59hi", "description": "NHI - Hail Index"},
        {"value": "82spd", "description": "SPD - Supplemental precip data"},
        {"value": "null", "description": "------ TEXT PRODUCTS ---------------------------------------------"},
        {"value": "p2gsm", "description": "GSM - General Status Message"},
        {"value": "75ftm", "description": "FTM - Free Text message"},
        {"value": "152rs", "description": "ASP - Archive III Status Product"},
        {"value": "74rcm", "description": "RCM - Radar Coded message"},
        {"value": "null", "description": "------ MELTING LAYER ---------------------------------------------"},
        {"value": "166mx", "description": "NXM - Melting Layer - -0.2deg"},
        {"value": "166my", "description": "NYM - Melting Layer - 0.0-0.2deg"},
        {"value": "166mz", "description": "NZM - Melting Layer - 0.3-0.4deg"},
        {"value": "166m0", "description": "N0M - Melting Layer - 0.5deg"},
        {"value": "166ma", "description": "N1M - Melting Layer - 0.9deg"},
        {"value": "166m1", "description": "N2M - Melting Layer - 1.3-1.5deg"},
        {"value": "166mb", "description": "N3M - Melting Layer - 1.8deg"},
        {"value": "166m2", "description": "NAM - Melting Layer - 2.4-2.5deg"},
        {"value": "166m3", "description": "NBM - Melting Layer - 3.1-3.5deg"},
        {"value": "null", "description": "------ POWER-REMOVED CONTROL -------------------------------------"},
        {"value": "113fx", "description": "NXF - Power-Removed Control - -0.2deg"},
        {"value": "113fy", "description": "NYF - Power-Removed Control - 0.0-0.2deg"},
        {"value": "113fz", "description": "NZF - Power-Removed Control - 0.3-0.4deg"},
        {"value": "113f0", "description": "N0F - Power-Removed Control - 0.5deg"},
        {"value": "113fa", "description": "NAF - Power-Removed Control - 0.9deg"},
        {"value": "113f1", "description": "N1F - Power-Removed Control - 1.3-1.5deg"},
        {"value": "113fb", "description": "NBF - Power-Removed Control - 1.8deg"},
        {"value": "113f2", "description": "N2F - Power-Removed Control - 2.4-2.5deg"},
        {"value": "113f3", "description": "N3F - Power-Removed Control - 3.1-3.5deg"},
        {"value": "null", "description": "------ CLUTTER FILTER --------------------------------------------"},
        {"value": "34cf1", "description": "NC1 - Clutter Filter Control - Segment 1"},
        {"value": "34cf2", "description": "NC2 - Clutter Filter Control - Segment 2"},
        {"value": "34cf3", "description": "NC3 - Clutter Filter Control - Segment 3"},
        {"value": "34cf4", "description": "NC4 - Clutter Filter Control - Segment 4"},
        {"value": "34cf5", "description": "NC5 - Clutter Filter Control - Segment 5"}
	];
