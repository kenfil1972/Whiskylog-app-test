
const KEY='whiskylog_appstore_v19';
/* v1.19 emergency listener */

document.addEventListener('click', function(e){
  const btn=e.target.closest && e.target.closest('[data-go]');
  if(!btn) return;
  e.preventDefault();
  e.stopPropagation();
  if(typeof show==='function') show(btn.dataset.go);
}, true);
const PRELOADED_CATALOG=[{"name":"Woodford Reserve Double Oaked","type":"Bourbon","distillery":"Woodford Reserve / Brown-Forman","abv":43.2,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Woodford Reserve Kentucky Straight Bourbon","type":"Bourbon","distillery":"Woodford Reserve / Brown-Forman","abv":43.2,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Woodford Reserve Rye","type":"Rye Whiskey","distillery":"Woodford Reserve / Brown-Forman","abv":45.2,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Elijah Craig Small Batch","type":"Bourbon","distillery":"Heaven Hill","abv":47.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Wild Turkey 101","type":"Bourbon","distillery":"Wild Turkey","abv":50.5,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Wild Turkey Rare Breed","type":"Bourbon","distillery":"Wild Turkey","abv":58.4,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Buffalo Trace","type":"Bourbon","distillery":"Buffalo Trace Distillery","abv":40.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Eagle Rare 10 Year","type":"Bourbon","distillery":"Buffalo Trace Distillery","abv":45.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Four Roses Bourbon","type":"Bourbon","distillery":"Four Roses","abv":40.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Four Roses Small Batch","type":"Bourbon","distillery":"Four Roses","abv":45.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Four Roses Single Barrel","type":"Bourbon","distillery":"Four Roses","abv":50.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Maker's Mark","type":"Bourbon","distillery":"Maker's Mark","abv":45.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Maker's Mark 46","type":"Bourbon","distillery":"Maker's Mark","abv":47.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Bulleit Bourbon","type":"Bourbon","distillery":"Bulleit / Diageo","abv":45.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Bulleit Rye","type":"Rye Whiskey","distillery":"Bulleit / Diageo","abv":45.0,"volume":700,"price":0,"region":"USA","image":""},{"name":"Jack Daniel's Old No. 7","type":"Whisky","distillery":"Jack Daniel Distillery","abv":40.0,"volume":700,"price":0,"region":"Tennessee, USA","image":""},{"name":"Jack Daniel's Bonded","type":"Whisky","distillery":"Jack Daniel Distillery","abv":50.0,"volume":700,"price":0,"region":"Tennessee, USA","image":""},{"name":"Jack Daniel's Single Barrel Select","type":"Whisky","distillery":"Jack Daniel Distillery","abv":45.0,"volume":700,"price":0,"region":"Tennessee, USA","image":""},{"name":"Gentleman Jack","type":"Whisky","distillery":"Jack Daniel Distillery","abv":40.0,"volume":700,"price":0,"region":"Tennessee, USA","image":""},{"name":"Angel's Envy Bourbon","type":"Bourbon","distillery":"Angel's Envy","abv":43.3,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Knob Creek 9 Year","type":"Bourbon","distillery":"Jim Beam / Beam Suntory","abv":50.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Jim Beam White","type":"Bourbon","distillery":"Jim Beam","abv":40.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Jim Beam Black","type":"Bourbon","distillery":"Jim Beam","abv":43.0,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Michter's US*1 Bourbon","type":"Bourbon","distillery":"Michter's","abv":45.7,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Michter's US*1 Rye","type":"Rye Whiskey","distillery":"Michter's","abv":42.4,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"1792 Small Batch","type":"Bourbon","distillery":"Barton 1792","abv":46.85,"volume":700,"price":0,"region":"Kentucky, USA","image":""},{"name":"Glenfiddich 12 Year","type":"Single Malt Scotch","distillery":"Glenfiddich","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"Glenfiddich 15 Year Solera","type":"Single Malt Scotch","distillery":"Glenfiddich","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"Glenfiddich 18 Year","type":"Single Malt Scotch","distillery":"Glenfiddich","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"The Glenlivet 12 Year","type":"Single Malt Scotch","distillery":"The Glenlivet","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"The Glenlivet 15 Year","type":"Single Malt Scotch","distillery":"The Glenlivet","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"The Macallan Double Cask 12 Year","type":"Single Malt Scotch","distillery":"The Macallan","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"The Macallan Sherry Oak 12 Year","type":"Single Malt Scotch","distillery":"The Macallan","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"Highland Park 12 Year","type":"Single Malt Scotch","distillery":"Highland Park","abv":40.0,"volume":700,"price":0,"region":"Orkney, Scotland","image":""},{"name":"Highland Park 18 Year","type":"Single Malt Scotch","distillery":"Highland Park","abv":43.0,"volume":700,"price":0,"region":"Orkney, Scotland","image":""},{"name":"Talisker 10 Year","type":"Single Malt Scotch","distillery":"Talisker","abv":45.8,"volume":700,"price":0,"region":"Isle of Skye, Scotland","image":""},{"name":"Talisker Skye","type":"Single Malt Scotch","distillery":"Talisker","abv":45.8,"volume":700,"price":0,"region":"Isle of Skye, Scotland","image":""},{"name":"Lagavulin 16 Year","type":"Single Malt Scotch","distillery":"Lagavulin","abv":43.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Lagavulin 8 Year","type":"Single Malt Scotch","distillery":"Lagavulin","abv":48.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Laphroaig 10 Year","type":"Single Malt Scotch","distillery":"Laphroaig","abv":40.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Laphroaig Quarter Cask","type":"Single Malt Scotch","distillery":"Laphroaig","abv":48.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Ardbeg 10 Year","type":"Single Malt Scotch","distillery":"Ardbeg","abv":46.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Ardbeg Uigeadail","type":"Single Malt Scotch","distillery":"Ardbeg","abv":54.2,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Ardbeg Corryvreckan","type":"Single Malt Scotch","distillery":"Ardbeg","abv":57.1,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Bunnahabhain 12 Year","type":"Single Malt Scotch","distillery":"Bunnahabhain","abv":46.3,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Caol Ila 12 Year","type":"Single Malt Scotch","distillery":"Caol Ila","abv":43.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Bowmore 12 Year","type":"Single Malt Scotch","distillery":"Bowmore","abv":40.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Bruichladdich The Classic Laddie","type":"Single Malt Scotch","distillery":"Bruichladdich","abv":50.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Port Charlotte 10 Year","type":"Single Malt Scotch","distillery":"Bruichladdich","abv":50.0,"volume":700,"price":0,"region":"Islay, Scotland","image":""},{"name":"Aberlour 12 Year","type":"Single Malt Scotch","distillery":"Aberlour","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"Aberlour A'bunadh","type":"Single Malt Scotch","distillery":"Aberlour","abv":60.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"Balvenie DoubleWood 12 Year","type":"Single Malt Scotch","distillery":"The Balvenie","abv":40.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"Balvenie Caribbean Cask 14 Year","type":"Single Malt Scotch","distillery":"The Balvenie","abv":43.0,"volume":700,"price":0,"region":"Speyside, Scotland","image":""},{"name":"Oban 14 Year","type":"Single Malt Scotch","distillery":"Oban","abv":43.0,"volume":700,"price":0,"region":"Highlands, Scotland","image":""},{"name":"Dalwhinnie 15 Year","type":"Single Malt Scotch","distillery":"Dalwhinnie","abv":43.0,"volume":700,"price":0,"region":"Highlands, Scotland","image":""},{"name":"Glenmorangie Original 10 Year","type":"Single Malt Scotch","distillery":"Glenmorangie","abv":40.0,"volume":700,"price":0,"region":"Highlands, Scotland","image":""},{"name":"Glenmorangie Lasanta","type":"Single Malt Scotch","distillery":"Glenmorangie","abv":43.0,"volume":700,"price":0,"region":"Highlands, Scotland","image":""},{"name":"GlenDronach 12 Year","type":"Single Malt Scotch","distillery":"GlenDronach","abv":43.0,"volume":700,"price":0,"region":"Highlands, Scotland","image":""},{"name":"Glengoyne 12 Year","type":"Single Malt Scotch","distillery":"Glengoyne","abv":43.0,"volume":700,"price":0,"region":"Highlands, Scotland","image":""},{"name":"Deanston 12 Year","type":"Single Malt Scotch","distillery":"Deanston","abv":46.3,"volume":700,"price":0,"region":"Highlands, Scotland","image":""},{"name":"Springbank 10 Year","type":"Single Malt Scotch","distillery":"Springbank","abv":46.0,"volume":700,"price":0,"region":"Campbeltown, Scotland","image":""},{"name":"Kilkerran 12 Year","type":"Single Malt Scotch","distillery":"Glengyle","abv":46.0,"volume":700,"price":0,"region":"Campbeltown, Scotland","image":""},{"name":"Johnnie Walker Black Label","type":"Blended Scotch","distillery":"Johnnie Walker","abv":40.0,"volume":700,"price":0,"region":"Scotland","image":""},{"name":"Johnnie Walker Green Label","type":"Blended Scotch","distillery":"Johnnie Walker","abv":43.0,"volume":700,"price":0,"region":"Scotland","image":""},{"name":"Johnnie Walker Double Black","type":"Blended Scotch","distillery":"Johnnie Walker","abv":40.0,"volume":700,"price":0,"region":"Scotland","image":""},{"name":"Chivas Regal 12 Year","type":"Blended Scotch","distillery":"Chivas Brothers","abv":40.0,"volume":700,"price":0,"region":"Scotland","image":""},{"name":"Monkey Shoulder","type":"Blended Scotch","distillery":"William Grant & Sons","abv":40.0,"volume":700,"price":0,"region":"Scotland","image":""},{"name":"Compass Box Orchard House","type":"Blended Malt Scotch","distillery":"Compass Box","abv":46.0,"volume":700,"price":0,"region":"Scotland","image":""},{"name":"Jameson Irish Whiskey","type":"Irish Whiskey","distillery":"Midleton Distillery","abv":40.0,"volume":700,"price":0,"region":"Ireland","image":""},{"name":"Jameson Black Barrel","type":"Irish Whiskey","distillery":"Midleton Distillery","abv":40.0,"volume":700,"price":0,"region":"Ireland","image":""},{"name":"Redbreast 12 Year","type":"Irish Whiskey","distillery":"Midleton Distillery","abv":40.0,"volume":700,"price":0,"region":"Ireland","image":""},{"name":"Green Spot","type":"Irish Whiskey","distillery":"Mitchell & Son / Midleton","abv":40.0,"volume":700,"price":0,"region":"Ireland","image":""},{"name":"Bushmills 10 Year","type":"Irish Whiskey","distillery":"Old Bushmills Distillery","abv":40.0,"volume":700,"price":0,"region":"Northern Ireland","image":""},{"name":"Tullamore D.E.W.","type":"Irish Whiskey","distillery":"Tullamore D.E.W.","abv":40.0,"volume":700,"price":0,"region":"Ireland","image":""},{"name":"Nikka From The Barrel","type":"Japanese Whisky","distillery":"Nikka","abv":51.4,"volume":500,"price":0,"region":"Japan","image":""},{"name":"Nikka Days","type":"Japanese Whisky","distillery":"Nikka","abv":40.0,"volume":700,"price":0,"region":"Japan","image":""},{"name":"Hibiki Japanese Harmony","type":"Japanese Whisky","distillery":"Suntory","abv":43.0,"volume":700,"price":0,"region":"Japan","image":""},{"name":"Toki Suntory Whisky","type":"Japanese Whisky","distillery":"Suntory","abv":43.0,"volume":700,"price":0,"region":"Japan","image":""},{"name":"Yamazaki Distiller's Reserve","type":"Japanese Whisky","distillery":"Suntory","abv":43.0,"volume":700,"price":0,"region":"Japan","image":""},{"name":"Hakushu Distiller's Reserve","type":"Japanese Whisky","distillery":"Suntory","abv":43.0,"volume":700,"price":0,"region":"Japan","image":""},{"name":"Canadian Club","type":"Canadian Whisky","distillery":"Canadian Club","abv":40.0,"volume":700,"price":0,"region":"Canada","image":""},{"name":"Crown Royal","type":"Canadian Whisky","distillery":"Crown Royal","abv":40.0,"volume":700,"price":0,"region":"Canada","image":""},{"name":"Diplomático Reserva Exclusiva","type":"Aged Rum","distillery":"Destilerías Unidas","abv":40.0,"volume":700,"price":0,"region":"Venezuela","image":""},{"name":"Diplomático Mantuano","type":"Aged Rum","distillery":"Destilerías Unidas","abv":40.0,"volume":700,"price":0,"region":"Venezuela","image":""},{"name":"Don Papa Baroko","type":"Aged Rum","distillery":"Bleeding Heart Rum Company","abv":40.0,"volume":700,"price":0,"region":"Philippines","image":""},{"name":"Don Papa 7 Year","type":"Aged Rum","distillery":"Bleeding Heart Rum Company","abv":40.0,"volume":700,"price":0,"region":"Philippines","image":""},{"name":"Plantation XO 20th Anniversary","type":"Aged Rum","distillery":"Maison Ferrand","abv":40.0,"volume":700,"price":0,"region":"Barbados","image":""},{"name":"Plantation Original Dark","type":"Dark Rum","distillery":"Maison Ferrand","abv":40.0,"volume":700,"price":0,"region":"Caribbean","image":""},{"name":"Ron Zacapa 23","type":"Aged Rum","distillery":"Licorera Zacapaneca","abv":40.0,"volume":700,"price":0,"region":"Guatemala","image":""},{"name":"Ron Zacapa XO","type":"Aged Rum","distillery":"Licorera Zacapaneca","abv":40.0,"volume":700,"price":0,"region":"Guatemala","image":""},{"name":"Appleton Estate 8 Year Reserve","type":"Aged Rum","distillery":"Appleton Estate","abv":43.0,"volume":700,"price":0,"region":"Jamaica","image":""},{"name":"Appleton Estate 12 Year Rare Casks","type":"Aged Rum","distillery":"Appleton Estate","abv":43.0,"volume":700,"price":0,"region":"Jamaica","image":""},{"name":"Mount Gay Eclipse","type":"Rum","distillery":"Mount Gay","abv":40.0,"volume":700,"price":0,"region":"Barbados","image":""},{"name":"Mount Gay XO","type":"Aged Rum","distillery":"Mount Gay","abv":43.0,"volume":700,"price":0,"region":"Barbados","image":""},{"name":"Havana Club 7 Year","type":"Aged Rum","distillery":"Havana Club","abv":40.0,"volume":700,"price":0,"region":"Cuba","image":""},{"name":"Havana Club Selección de Maestros","type":"Aged Rum","distillery":"Havana Club","abv":45.0,"volume":700,"price":0,"region":"Cuba","image":""},{"name":"Flor de Caña 12 Year","type":"Aged Rum","distillery":"Flor de Caña","abv":40.0,"volume":700,"price":0,"region":"Nicaragua","image":""},{"name":"Flor de Caña 18 Year","type":"Aged Rum","distillery":"Flor de Caña","abv":40.0,"volume":700,"price":0,"region":"Nicaragua","image":""},{"name":"El Dorado 12 Year","type":"Aged Rum","distillery":"Demerara Distillers","abv":40.0,"volume":700,"price":0,"region":"Guyana","image":""},{"name":"El Dorado 15 Year","type":"Aged Rum","distillery":"Demerara Distillers","abv":43.0,"volume":700,"price":0,"region":"Guyana","image":""},{"name":"Pyrat XO Reserve","type":"Aged Rum","distillery":"Patrón Spirits","abv":40.0,"volume":700,"price":0,"region":"Caribbean","image":""},{"name":"Goslings Black Seal","type":"Dark Rum","distillery":"Goslings","abv":40.0,"volume":700,"price":0,"region":"Bermuda","image":""},{"name":"Smith & Cross Traditional Jamaica Rum","type":"Rum","distillery":"Hampden/Worthy Park blend","abv":57.0,"volume":700,"price":0,"region":"Jamaica","image":""},{"name":"Wray & Nephew Overproof","type":"White Rum","distillery":"J. Wray & Nephew","abv":63.0,"volume":700,"price":0,"region":"Jamaica","image":""},{"name":"Clément VSOP Rhum Agricole","type":"Agricole Rum","distillery":"Habitation Clément","abv":40.0,"volume":700,"price":0,"region":"Martinique","image":""},{"name":"Hennessy VS","type":"Cognac","distillery":"Hennessy","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Hennessy VSOP","type":"Cognac","distillery":"Hennessy","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Hennessy XO","type":"Cognac","distillery":"Hennessy","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Rémy Martin VSOP","type":"Cognac","distillery":"Rémy Martin","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Rémy Martin XO","type":"Cognac","distillery":"Rémy Martin","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Martell VS","type":"Cognac","distillery":"Martell","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Martell VSOP","type":"Cognac","distillery":"Martell","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Martell Cordon Bleu","type":"Cognac","distillery":"Martell","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Bache-Gabrielsen VSOP","type":"Cognac","distillery":"Bache-Gabrielsen","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Bache-Gabrielsen XO","type":"Cognac","distillery":"Bache-Gabrielsen","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Braastad VSOP","type":"Cognac","distillery":"Tiffon / Braastad","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Braastad XO","type":"Cognac","distillery":"Tiffon / Braastad","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Courvoisier VSOP","type":"Cognac","distillery":"Courvoisier","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Camus VSOP","type":"Cognac","distillery":"Camus","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Delamain Pale & Dry XO","type":"Cognac","distillery":"Delamain","abv":40.0,"volume":700,"price":0,"region":"Cognac, France","image":""},{"name":"Torres 10 Gran Reserva","type":"Brandy","distillery":"Torres","abv":38.0,"volume":700,"price":0,"region":"Spain","image":""},{"name":"Carlos I Brandy de Jerez","type":"Brandy","distillery":"Osborne","abv":40.0,"volume":700,"price":0,"region":"Spain","image":""},{"name":"Lepanto Brandy Solera Gran Reserva","type":"Brandy","distillery":"González Byass","abv":36.0,"volume":700,"price":0,"region":"Spain","image":""},{"name":"Calvados Boulard Grand Solage","type":"Calvados","distillery":"Boulard","abv":40.0,"volume":700,"price":0,"region":"Normandy, France","image":""},{"name":"Calvados Père Magloire VSOP","type":"Calvados","distillery":"Père Magloire","abv":40.0,"volume":700,"price":0,"region":"Normandy, France","image":""},{"name":"Château du Breuil Fine Calvados","type":"Calvados","distillery":"Château du Breuil","abv":40.0,"volume":700,"price":0,"region":"Normandy, France","image":""},{"name":"Janneau VSOP Armagnac","type":"Armagnac","distillery":"Janneau","abv":40.0,"volume":700,"price":0,"region":"Armagnac, France","image":""},{"name":"Darroze Les Grands Assemblages 12 Year","type":"Armagnac","distillery":"Darroze","abv":43.0,"volume":700,"price":0,"region":"Armagnac, France","image":""},{"name":"Gammel Opland","type":"Aquavit","distillery":"Arcus","abv":41.5,"volume":700,"price":0,"region":"Norway","image":""},{"name":"Gammel Opland Edel Madeira","type":"Aquavit","distillery":"Arcus","abv":41.5,"volume":700,"price":0,"region":"Norway","image":""},{"name":"Lysholm Linie Aquavit","type":"Aquavit","distillery":"Arcus","abv":41.5,"volume":700,"price":0,"region":"Norway","image":""},{"name":"Løiten Linie Aquavit","type":"Aquavit","distillery":"Arcus","abv":41.5,"volume":700,"price":0,"region":"Norway","image":""},{"name":"Aalborg Taffel Akvavit","type":"Aquavit","distillery":"Aalborg","abv":45.0,"volume":700,"price":0,"region":"Denmark","image":""},{"name":"Aalborg Jubilæums Akvavit","type":"Aquavit","distillery":"Aalborg","abv":40.0,"volume":700,"price":0,"region":"Denmark","image":""},{"name":"Opland Edel Portvin","type":"Aquavit","distillery":"Arcus","abv":41.5,"volume":700,"price":0,"region":"Norway","image":""},{"name":"Hellstrøm Juleaquavit","type":"Aquavit","distillery":"Arcus","abv":40.0,"volume":700,"price":0,"region":"Norway","image":""},{"name":"Tanqueray London Dry Gin","type":"Gin","distillery":"Tanqueray","abv":43.1,"volume":700,"price":0,"region":"England","image":""},{"name":"Tanqueray No. Ten","type":"Gin","distillery":"Tanqueray","abv":47.3,"volume":700,"price":0,"region":"England","image":""},{"name":"Hendrick's Gin","type":"Gin","distillery":"Hendrick's","abv":41.4,"volume":700,"price":0,"region":"Scotland","image":""},{"name":"Bombay Sapphire","type":"Gin","distillery":"Bombay Sapphire","abv":40.0,"volume":700,"price":0,"region":"England","image":""},{"name":"Beefeater London Dry Gin","type":"Gin","distillery":"Beefeater","abv":40.0,"volume":700,"price":0,"region":"England","image":""},{"name":"Monkey 47 Schwarzwald Dry Gin","type":"Gin","distillery":"Black Forest Distillers","abv":47.0,"volume":500,"price":0,"region":"Germany","image":""},{"name":"Harahorn Norwegian Gin","type":"Gin","distillery":"Det Norske Brenneri","abv":46.0,"volume":500,"price":0,"region":"Norway","image":""},{"name":"Bareksten Botanical Gin","type":"Gin","distillery":"Oss Craft Distillery","abv":46.0,"volume":700,"price":0,"region":"Norway","image":""},{"name":"Bareksten Navy Strength Gin","type":"Gin","distillery":"Oss Craft Distillery","abv":58.0,"volume":700,"price":0,"region":"Norway","image":""},{"name":"Patrón Silver","type":"Tequila","distillery":"Patrón","abv":40.0,"volume":700,"price":0,"region":"Mexico","image":""},{"name":"Don Julio Blanco","type":"Tequila","distillery":"Don Julio","abv":38.0,"volume":700,"price":0,"region":"Mexico","image":""},{"name":"Don Julio Reposado","type":"Tequila","distillery":"Don Julio","abv":38.0,"volume":700,"price":0,"region":"Mexico","image":""},{"name":"Herradura Reposado","type":"Tequila","distillery":"Casa Herradura","abv":40.0,"volume":700,"price":0,"region":"Mexico","image":""},{"name":"Ocho Blanco","type":"Tequila","distillery":"Tequila Ocho","abv":40.0,"volume":700,"price":0,"region":"Mexico","image":""},{"name":"Del Maguey Vida Mezcal","type":"Mezcal","distillery":"Del Maguey","abv":42.0,"volume":700,"price":0,"region":"Mexico","image":""},{"name":"Montelobos Espadín Mezcal","type":"Mezcal","distillery":"Montelobos","abv":43.2,"volume":700,"price":0,"region":"Mexico","image":""},{"name":"Grey Goose Vodka","type":"Vodka","distillery":"Grey Goose","abv":40.0,"volume":700,"price":0,"region":"France","image":""},{"name":"Belvedere Vodka","type":"Vodka","distillery":"Belvedere","abv":40.0,"volume":700,"price":0,"region":"Poland","image":""},{"name":"Absolut Vodka","type":"Vodka","distillery":"Absolut","abv":40.0,"volume":700,"price":0,"region":"Sweden","image":""},{"name":"Jägermeister","type":"Liqueur","distillery":"Mast-Jägermeister","abv":35.0,"volume":700,"price":0,"region":"Germany","image":""},{"name":"Cointreau","type":"Liqueur","distillery":"Cointreau","abv":40.0,"volume":700,"price":0,"region":"France","image":""},{"name":"Grand Marnier Cordon Rouge","type":"Liqueur","distillery":"Marnier-Lapostolle","abv":40.0,"volume":700,"price":0,"region":"France","image":""},{"name":"Chartreuse Green","type":"Liqueur","distillery":"Chartreuse","abv":55.0,"volume":700,"price":0,"region":"France","image":""},{"name":"Amaro Montenegro","type":"Amaro","distillery":"Montenegro","abv":23.0,"volume":700,"price":0,"region":"Italy","image":""},{"name":"Fernet-Branca","type":"Amaro","distillery":"Fratelli Branca","abv":39.0,"volume":700,"price":0,"region":"Italy","image":""}];
window.WHISKYLOG_CATALOG = PRELOADED_CATALOG;
const TYPES=["Whisky", "Single Malt Scotch", "Blended Scotch", "Bourbon", "Rye Whiskey", "Tennessee Whiskey", "Irish Whiskey", "Japanese Whisky", "Canadian Whisky", "Rum", "Dark Rum", "Aged Rum", "Agricole Rum", "Cognac", "Armagnac", "Brandy", "Calvados", "Aquavit", "Gin", "Vodka", "Tequila", "Mezcal", "Liqueur", "Amaro", "Other"];
const DENSITY_TABLE=[
  {abv:0,dens:0.9982},{abv:5,dens:0.9892},{abv:10,dens:0.9807},{abv:15,dens:0.9723},{abv:20,dens:0.9640},
  {abv:25,dens:0.9559},{abv:30,dens:0.9479},{abv:35,dens:0.9399},{abv:40,dens:0.9319},{abv:45,dens:0.9239},
  {abv:50,dens:0.9157},{abv:55,dens:0.9073},{abv:60,dens:0.8987}
];

const state=load();
let pendingBaseImage='';

const SETTINGS_KEY='whiskylog_settings_v26';
const settings=Object.assign({currency:"NOK",ownerName:"Kenneth",language:"en",defaultTastingMl:20}, JSON.parse(localStorage.getItem(SETTINGS_KEY)||"{}"));
(function absorbSettingsFromQuery(){
  const params=new URLSearchParams(window.location.search||'');
  let changed=false;
  if(params.get('ownerName')){ settings.ownerName=params.get('ownerName'); changed=true; }
  if(params.get('currency')){ settings.currency=params.get('currency'); changed=true; }
  if(params.get('language')){ settings.language=params.get('language'); changed=true; }
  if(params.get('defaultTastingMl')){ settings.defaultTastingMl=Number(params.get('defaultTastingMl')||20); changed=true; }
  if(changed){
    localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));
    history.replaceState(null,'',location.pathname);
  }
})();
function saveSettings(){localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}
function updateAppTitle(){const el=document.getElementById('appTitle');if(el){el.textContent=(settings.ownerName||'Kenneth')+"'s WhiskyLog";}}
function formatMoney(value){
  return `${formatPrice(value)} ${settings.currency||'NOK'}`;
}

let currentBottleId=null;
let detailReturnView='home';

/* v1.23 robust save delegation */
document.addEventListener('submit', function(e){
  const form=e.target;
  if(!form || !form.id) return;
  if(['wishlistForm','baseForm','bottleForm','settingsForm'].includes(form.id)){
    e.preventDefault();
    e.stopPropagation();
    try{
      if(form.id==='wishlistForm') return saveWishlistItem(e);
      if(form.id==='baseForm') return saveBase(e);
      if(form.id==='bottleForm') return saveBottle(e);
      if(form.id==='settingsForm') return saveSettingsForm(e);
    }catch(err){
      console.error('WhiskyLog save failed',err);
      alert('Save failed: '+(err && err.message ? err.message : err));
    }
  }
}, true);

function saveSettingsForm(e){
  e.preventDefault();
  const sf=document.getElementById('settingsForm');
  if(!sf) return;
  settings.ownerName=(sf.ownerName.value||'').trim()||'Kenneth';
  settings.currency=sf.currency.value||'NOK';
  settings.language=sf.language.value||'en';
  settings.defaultTastingMl=Number(sf.defaultTastingMl.value||20);
  saveSettings();
  updateAppTitle();
  render();
  show('home');
}


document.addEventListener('DOMContentLoaded',()=>{try{init();render();}catch(err){console.error('WhiskyLog init failed',err);}});

function load(){const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):{bases:[],bottles:[],tastings:[],comments:[]};}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8);}
function esc(v=''){return String(v).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
function avg(a){return a.length?a.reduce((s,x)=>s+x,0)/a.length:0;}
function ml(n){return Math.round(Number(n||0)).toLocaleString('en-US')+' ml';}
function parseDecimal(value){
  if(value===undefined||value===null)return 0;
  let s=String(value).trim(); if(!s)return 0;
  s=s.replace(/\s/g,'');
  const hasComma=s.includes(','),hasDot=s.includes('.');
  if(hasComma&&hasDot){
    if(s.lastIndexOf(',')>s.lastIndexOf('.')) s=s.replace(/\./g,'').replace(',', '.');
    else s=s.replace(/,/g,'');
  }else s=s.replace(',', '.');
  const n=Number(s); return Number.isFinite(n)?n:0;
}
function formatPrice(value){return parseDecimal(value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}

function init(){
  document.getElementById('typeSelect').innerHTML=TYPES.map(t=>`<option>${t}</option>`).join('');
  document.querySelectorAll('[data-go]').forEach(b=>{ b.onclick=(ev)=>{ ev.preventDefault(); ev.stopPropagation(); show(b.dataset.go); }; });
  document.getElementById('backupButton').onclick=()=>show('backup');
  const cs=document.getElementById('currencySelect'); if(cs){cs.value=settings.currency||'NOK'; cs.onchange=()=>{settings.currency=cs.value;saveSettings();render();};}
  document.getElementById('baseForm').onsubmit=saveBase;
  document.getElementById('bottleForm').onsubmit=saveBottle;
  document.getElementById('baseCancelButton').onclick=resetBaseForm;
  document.getElementById('bottleCancelButton').onclick=resetBottleForm;
  document.getElementById('exportButton').onclick=exportBackup;
  document.getElementById('importInput').onchange=importBackup;
  document.getElementById('resetButton').onclick=resetAll;
  document.getElementById('baseSearch').oninput=renderBaseList;
  const ar=document.getElementById('analyticsRange'); if(ar){ar.onchange=()=>renderAnalytics();}
  document.getElementById('bottleSearch')?.addEventListener('input',renderAllBottleLists);
  document.getElementById('baseImageInput').onchange=handleBaseImage;
  document.getElementById('detailBackButton').onclick=()=>show(detailReturnView||'home');
  ['abv','volume','fullWeight'].forEach(name=>document.querySelector(`#baseForm [name="${name}"]`).addEventListener('input',updateBaseHints));
  const today=new Date().toISOString().slice(0,10);
  document.querySelector('#bottleForm [name="purchaseDate"]').value=today;
  updateBaseHints();

  populateCatalogSuggestions();
  attachCatalogAutoFill();
  attachVisibleCatalogPicker();
  const sf=document.getElementById('settingsForm');
  if(sf){
    sf.ownerName.value=settings.ownerName||'';
    sf.currency.value=settings.currency||'NOK';
    sf.language.value=settings.language||'en';
    sf.defaultTastingMl.value=settings.defaultTastingMl||20;
    sf.onsubmit=saveSettingsForm;
  }
  const wf=document.getElementById('wishlistForm'); if(wf){wf.onsubmit=saveWishlistItem;}
  const wcb=document.getElementById('wishlistCancelButton'); if(wcb){wcb.onclick=resetWishlistForm;}
  const ffc=document.getElementById('fillFromCatalogButton'); if(ffc){ffc.onclick=fillLibraryFromCatalog;}
  updateAppTitle();

}
function show(name){
  document.querySelectorAll('main > section.view').forEach(v=>{
    const active=v.dataset.view===name;
    v.classList.toggle('active',active);
    v.hidden=!active;
    v.style.display=active?'block':'none';
  });
  window.scrollTo({top:0,behavior:'smooth'});
}
async function handleBaseImage(e){
  const file=e.target.files[0]; if(!file)return;
  pendingBaseImage=await resizeImage(file);
  const p=document.getElementById('baseImagePreview');p.src=pendingBaseImage;p.classList.remove('hidden');
}
function resizeImage(file){
  return new Promise((resolve,reject)=>{
    const fr=new FileReader();
    fr.onload=()=>{const img=new Image();img.onload=()=>{const ratio=Math.min(1,1200/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*ratio);c.height=Math.round(img.height*ratio);c.getContext('2d').drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL('image/jpeg',0.82));};img.onerror=reject;img.src=fr.result;};
    fr.onerror=reject;fr.readAsDataURL(file);
  });
}
function densityFromAbv(abv){
  let a=Math.max(0,Math.min(60,Number(abv||0)));
  for(let i=0;i<DENSITY_TABLE.length-1;i++){
    const lo=DENSITY_TABLE[i],hi=DENSITY_TABLE[i+1];
    if(a>=lo.abv&&a<=hi.abv){const t=(a-lo.abv)/(hi.abv-lo.abv);return lo.dens+t*(hi.dens-lo.dens);}
  }
  return DENSITY_TABLE[DENSITY_TABLE.length-1].dens;
}
function computedEmptyWeight(base){
  const fw=Number(base.fullWeight||0),vol=Number(base.volume||0),dens=densityFromAbv(Number(base.abv||0));
  if(fw>0&&vol>0)return fw-vol*dens;
  return null;
}
function updateBaseHints(){
  const f=document.getElementById('baseForm');
  const abv=Number(f.querySelector('[name="abv"]').value||0);
  const vol=Number(f.querySelector('[name="volume"]').value||0);
  const fw=Number(f.querySelector('[name="fullWeight"]').value||0);
  const dens=densityFromAbv(abv);
  document.getElementById('densityHint').textContent=dens.toFixed(4)+' g/ml';
  const empty=(fw>0&&vol>0)?fw-vol*dens:null;
  document.getElementById('emptyHint').textContent=empty!==null?Math.round(empty)+' g':'—';
}
function getBase(id){return state.bases.find(b=>b.id===id);}
function getBottle(id){return state.bottles.find(b=>b.id===id);}
function bottleTastings(id){return state.tastings.filter(t=>t.bottleId===id);}
function bottleComments(id){return state.comments.filter(c=>c.bottleId===id);}
function bottleAvg(id){return avg(bottleTastings(id).map(t=>Number(t.score||0)));}
function bottleUsed(id){return bottleTastings(id).reduce((s,t)=>s+Number(t.ml||0),0);}
function bottleVolume(id){
  const bottle=getBottle(id); if(!bottle)return 0;
  const base=getBase(bottle.baseId); if(!base)return 0;
  const ew=computedEmptyWeight(base),fw=Number(base.fullWeight||0),cw=Number(bottle.currentWeight||0);
  if(ew!==null&&fw>ew&&cw>0){
    const fraction=Math.max(0,Math.min(1,(cw-ew)/(fw-ew)));
    return Math.round(Number(base.volume||0)*fraction);
  }
  return Math.max(0,Math.round(Number(base.volume||0)-bottleUsed(id)));
}
function bottleStatus(id){
  const bottle=getBottle(id);
  if(!bottle)return 'unopened';
  if(bottle.forceEmpty || bottleVolume(id)<=0)return 'empty';
  return bottle.openedDate||bottleTastings(id).length>0?'opened':'unopened';
}
function lastTasted(id){
  const arr=bottleTastings(id).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  return arr[0]?.date||'—';
}
function firstTasted(id){
  const arr=bottleTastings(id).sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  return arr[0]?.date||'';
}
function bottleName(b){
  const base=getBase(b.baseId),parts=[];
  if(b.batchNo)parts.push('Batch '+b.batchNo);
  if(b.bottleNo)parts.push('Bottle '+b.bottleNo);
  return `${base?base.name:'Unknown'}${parts.length?' ('+parts.join(' · ')+')':''}`;
}
function bestValueScore(id){
  const bottle=getBottle(id),base=getBase(bottle?.baseId);
  if(!bottle||!base)return 0;
  const ppm=parseDecimal(bottle.price)/Math.max(1,Number(base.volume||0));
  return bottleAvg(id)/Math.max(0.001,ppm);
}
function thumb(base){return base?.image?`<img class="thumb" src="${base.image}" alt="">`:`<div class="thumb placeholder">🥃</div>`;}

function saveBase(e){
  e.preventDefault();
  const f=new FormData(e.target),id=f.get('editId')||uid();
  upsert(state.bases,{id,name:f.get('name'),distillery:f.get('distillery')||'',type:f.get('type')||'Whisky',abv:Number(f.get('abv')||0),volume:Number(f.get('volume')||0),fullWeight:Number(f.get('fullWeight')||0),region:f.get('region')||'',notes:f.get('notes')||'',image:pendingBaseImage||(getBase(id)?.image||'')});
  save();resetBaseForm();render();show('library');
}
function saveBottle(e){
  e.preventDefault();
  const f=new FormData(e.target),id=f.get('editId')||uid();
  upsert(state.bottles,{id,baseId:f.get('baseId'),batchNo:f.get('batchNo')||'',bottleNo:f.get('bottleNo')||'',price:parseDecimal(f.get('price')),purchasePlace:f.get('purchasePlace')||'',purchaseDate:f.get('purchaseDate')||'',openedDate:getBottle(id)?.openedDate||'',currentWeight:Number(f.get('currentWeight')||0),comments:f.get('comments')||''});
  save();resetBottleForm();render();show('home');
}
function addTastingForBottle(id){
  const bottle=getBottle(id); if(!bottle)return;
  const date=prompt('Date',new Date().toISOString().slice(0,10)); if(date===null)return;
  const mlAmount=parseDecimal(prompt('Amount ml',String(settings.defaultTastingMl||20))); if(!mlAmount)return;
  const nose=parseDecimal(prompt('Nose 1-10','7'));
  const palate=parseDecimal(prompt('Palate 1-10','7'));
  const finish=parseDecimal(prompt('Finish 1-10','7'));
  const overall=parseDecimal(prompt('Overall 1-10','7'));
  const notes=prompt('Tasting notes','')||'';
  const score=Number(((nose+palate+finish+overall)/4).toFixed(1));
  state.tastings.unshift({id:uid(),bottleId:id,date,ml:mlAmount,nose,palate,finish,balance:overall,score,notes});
  if(!bottle.openedDate)bottle.openedDate=date;
  save();render();openBottleDetail(id, detailReturnView);
}
function addCommentForBottle(id){
  const text=prompt('Comment',''); if(text===null||!text.trim())return;
  state.comments.unshift({id:uid(),bottleId:id,date:new Date().toISOString().slice(0,10),text:text.trim()});
  save();render();openBottleDetail(id, detailReturnView);
}
function weighBottle(id){
  const b=getBottle(id); if(!b)return;
  const val=prompt('Current weight in grams',b.currentWeight||''); if(val===null)return;
  b.currentWeight=Number(val||0); save();render();openBottleDetail(id, detailReturnView);
}
function markEmpty(id){
  const b=getBottle(id); if(!b)return;
  const ok=confirm('Confirm empty bottle\n\nThis will mark the bottle as empty, set remaining volume to 0 ml and move it to Empty bottles. This action cannot be undone.');
  if(!ok)return;
  b.currentWeight = Math.max(0, Math.round(computedEmptyWeight(getBase(b.baseId))||0));
  b.forceEmpty = true;
  save();render();openBottleDetail(id, detailReturnView);
}
function upsert(arr,item){const idx=arr.findIndex(x=>x.id===item.id);if(idx>=0)arr[idx]=item;else arr.unshift(item);}
function resetBaseForm(){document.getElementById('baseForm').reset();document.querySelector('#baseForm [name="editId"]').value='';pendingBaseImage='';const p=document.getElementById('baseImagePreview');p.src='';p.classList.add('hidden');document.getElementById('baseSaveButton').textContent='Save library item';document.getElementById('baseCancelButton').classList.add('hidden');updateBaseHints();}
function resetBottleForm(){document.getElementById('bottleForm').reset();document.querySelector('#bottleForm [name="editId"]').value='';document.getElementById('bottleSaveButton').textContent='Save bottle';document.getElementById('bottleCancelButton').classList.add('hidden');document.querySelector('#bottleForm [name="purchaseDate"]').value=new Date().toISOString().slice(0,10);}
function editBase(id){const b=getBase(id);if(!b)return;const f=document.getElementById('baseForm');f.querySelector('[name="name"]').value=b.name||'';f.querySelector('[name="distillery"]').value=b.distillery||'';f.querySelector('[name="type"]').value=b.type||'Whisky';f.querySelector('[name="abv"]').value=b.abv||'';f.querySelector('[name="volume"]').value=b.volume||'';f.querySelector('[name="fullWeight"]').value=b.fullWeight||'';f.querySelector('[name="region"]').value=b.region||'';f.querySelector('[name="notes"]').value=b.notes||'';f.querySelector('[name="editId"]').value=b.id;if(b.image){pendingBaseImage=b.image;const p=document.getElementById('baseImagePreview');p.src=b.image;p.classList.remove('hidden');}document.getElementById('baseSaveButton').textContent='Update library item';document.getElementById('baseCancelButton').classList.remove('hidden');updateBaseHints();show('library');}
function editBottle(id){const b=getBottle(id);if(!b)return;const f=document.getElementById('bottleForm');f.querySelector('[name="baseId"]').value=b.baseId||'';f.querySelector('[name="batchNo"]').value=b.batchNo||'';f.querySelector('[name="bottleNo"]').value=b.bottleNo||'';f.querySelector('[name="price"]').value=formatPrice(b.price);f.querySelector('[name="purchasePlace"]').value=b.purchasePlace||'';f.querySelector('[name="purchaseDate"]').value=b.purchaseDate||'';f.querySelector('[name="currentWeight"]').value=b.currentWeight||'';f.querySelector('[name="comments"]').value=b.comments||'';f.querySelector('[name="editId"]').value=b.id;document.getElementById('bottleSaveButton').textContent='Update bottle';document.getElementById('bottleCancelButton').classList.remove('hidden');show('new-bottle');}
function deleteBase(id){if(!confirm('Delete this library item? Related bottles and tastings will also be deleted.'))return;const ids=state.bottles.filter(b=>b.baseId===id).map(b=>b.id);state.bases=state.bases.filter(b=>b.id!==id);state.bottles=state.bottles.filter(b=>b.baseId!==id);state.tastings=state.tastings.filter(t=>!ids.includes(t.bottleId));state.comments=state.comments.filter(c=>!ids.includes(c.bottleId));save();render();}
function deleteBottle(id){if(!confirm('Delete this bottle? Related tastings and comments will also be deleted.'))return;state.bottles=state.bottles.filter(b=>b.id!==id);state.tastings=state.tastings.filter(t=>t.bottleId!==id);state.comments=state.comments.filter(c=>c.bottleId!==id);save();render();show('home');}
function deleteTasting(id){if(!confirm('Delete this tasting?'))return;state.tastings=state.tastings.filter(t=>t.id!==id);save();render();if(currentBottleId)openBottleDetail(currentBottleId,detailReturnView);}
function exportBackup(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='whiskylog-backup.json';a.click();}
function importBackup(e){const file=e.target.files[0];if(!file)return;const fr=new FileReader();fr.onload=()=>{try{const data=JSON.parse(fr.result);state.bases=Array.isArray(data.bases)?data.bases:[];state.bottles=Array.isArray(data.bottles)?data.bottles:[];state.tastings=Array.isArray(data.tastings)?data.tastings:[];state.comments=Array.isArray(data.comments)?data.comments:[];state.wishlist=Array.isArray(data.wishlist)?data.wishlist:[];save();render();alert('Backup imported.');}catch{alert('Could not read backup file.');}};fr.readAsText(file);}
function resetAll(){if(!confirm('Reset all data?'))return;state.bases=[];state.bottles=[];state.tastings=[];state.comments=[];state.wishlist=[];save();render();}


function dateToKey(d){return d.toISOString().slice(0,10);}
function parseDate(s){return s?new Date(s+'T00:00:00'):null;}
function rangeStart(){
  const range=document.getElementById('analyticsRange')?.value||'all';
  if(range==='all')return null;
  const now=new Date(); const d=new Date(now);
  const map={ '1m':1,'3m':3,'6m':6,'9m':9,'1y':12,'5y':60,'10y':120 };
  d.setMonth(d.getMonth()-(map[range]||12));
  return d;
}
function inRange(dateStr){
  const start=rangeStart(); if(!start)return true;
  const d=parseDate(dateStr); if(!d)return true;
  return d>=start;
}
function currentInventoryValue(){
  return state.bottles.reduce((sum,b)=>{
    const base=getBase(b.baseId); if(!base)return sum;
    const totalVol=Number(base.volume||0);
    const left=bottleVolume(b.id);
    const fraction=totalVol>0?Math.max(0,Math.min(1,left/totalVol)):0;
    if(bottleStatus(b.id)==='empty')return sum;
    return sum + parseDecimal(b.price)*fraction;
  },0);
}
function currentStockVolume(){
  return state.bottles.reduce((s,b)=>s+(bottleStatus(b.id)==='empty'?0:bottleVolume(b.id)),0);
}
function tastingVolumeByDay(){
  const days={};
  state.tastings.filter(t=>inRange(t.date)).forEach(t=>{
    const k=t.date||'Unknown';
    days[k]=(days[k]||0)+Number(t.ml||0);
  });
  return Object.entries(days).sort((a,b)=>String(a[0]).localeCompare(String(b[0])));
}
function valueTimeline(){
  const events=[];
  state.bottles.forEach(b=>{ if(inRange(b.purchaseDate)) events.push([b.purchaseDate||'Unknown', parseDecimal(b.price)]); });
  return events.sort((a,b)=>String(a[0]).localeCompare(String(b[0])));
}
function stockTimeline(){
  const events=[];
  state.bottles.forEach(b=>{ if(inRange(b.purchaseDate)) events.push([b.purchaseDate||'Unknown', Number(getBase(b.baseId)?.volume||0)]); });
  state.tastings.forEach(t=>{ if(inRange(t.date)) events.push([t.date||'Unknown', -Number(t.ml||0)]); });
  return events.sort((a,b)=>String(a[0]).localeCompare(String(b[0])));
}
function drawChart(canvasId, points, options={}){
  const canvas=document.getElementById(canvasId); if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const rect=canvas.getBoundingClientRect();
  const ratio=window.devicePixelRatio||1;
  canvas.width=Math.max(320,Math.floor(rect.width*ratio));
  canvas.height=Math.floor((options.height||180)*ratio);
  ctx.scale(ratio,ratio);
  const w=canvas.width/ratio,h=canvas.height/ratio,pad=28;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='rgba(216,165,92,.35)';
  ctx.lineWidth=1;
  ctx.strokeRect(8,8,w-16,h-16);
  ctx.fillStyle='rgba(245,234,220,.9)';
  ctx.font='12px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';
  if(!points.length){ctx.fillText('No data yet',pad,h/2);return;}
  let values=points.map(p=>Number(p[1]||0));
  let max=Math.max(...values,1),min=Math.min(...values,0);
  if(options.cumulative){
    let running=0; points=points.map(p=>[p[0], running+=Number(p[1]||0)]);
    values=points.map(p=>p[1]); max=Math.max(...values,1); min=Math.min(...values,0);
  }
  const xStep=points.length>1?(w-pad*2)/(points.length-1):0;
  function y(v){return h-pad-((v-min)/(max-min||1))*(h-pad*2);}
  ctx.strokeStyle='#d8a55c';
  ctx.lineWidth=2;
  ctx.beginPath();
  points.forEach((p,i)=>{
    const x=pad+i*xStep, yy=y(p[1]);
    if(i===0)ctx.moveTo(x,yy); else ctx.lineTo(x,yy);
  });
  ctx.stroke();
  ctx.fillStyle='#f5eadc';
  points.forEach((p,i)=>{
    const x=pad+i*xStep, yy=y(p[1]);
    ctx.beginPath();ctx.arc(x,yy,3,0,Math.PI*2);ctx.fill();
  });
  ctx.fillStyle='rgba(213,184,143,.95)';
  ctx.fillText(`${Math.round(min)} - ${Math.round(max)}`,pad,18);
}
function renderAnalytics(){
  if(!document.getElementById('valueChart'))return;
  drawChart('valueChart', valueTimeline(), {cumulative:true});
  drawChart('tastingChart', tastingVolumeByDay(), {});
  drawChart('stockChart', stockTimeline(), {cumulative:true});
}





function setFieldValue(form, selector, value){
  const el=form.querySelector(selector);
  if(!el || value===undefined || value===null) return;
  el.value=String(value);
  el.dispatchEvent(new Event('input',{bubbles:true}));
  el.dispatchEvent(new Event('change',{bubbles:true}));
}
function normalizeText(value){
  return String(value||'').trim().toLowerCase().replace(/[’']/g,"'").replace(/\s+/g,' ');
}
function findCatalogByName(name){
  const q=normalizeText(name);
  if(!q) return null;
  return PRELOADED_CATALOG.find(p=>normalizeText(p.name)===q)
      || PRELOADED_CATALOG.find(p=>normalizeText(p.name).startsWith(q))
      || PRELOADED_CATALOG.find(p=>normalizeText(p.name).includes(q));
}
function fillLibraryFromCatalog(){
  const f=document.getElementById('baseForm');
  if(!f) return false;
  const item=findCatalogByName(f.querySelector('[name="name"]')?.value || document.getElementById('catalogSearchInput')?.value || '');
  if(!item){alert('No matching catalog item found.');return false;}
  return applyCatalogItemToLibrary(item);
}
function attachCatalogAutoFill(){
  const input=document.getElementById('libraryNameInput');
  if(!input) return;
  const tryFill=()=>{ const item=findCatalogByName(input.value); if(item) fillLibraryFromCatalog(); };
  input.addEventListener('input', ()=>{ const item=findCatalogByName(input.value); if(item && normalizeText(item.name)===normalizeText(input.value)) fillLibraryFromCatalog(); });
  input.addEventListener('change', tryFill);
  input.addEventListener('blur', tryFill);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ setTimeout(tryFill,0); } });
}

function populateCatalogSuggestions(){
  const dl=document.getElementById('catalogSuggestions');
  if(!dl)return;
  dl.innerHTML=PRELOADED_CATALOG.map(p=>`<option value="${esc(p.name)}"></option>`).join('');
}




// auto-fill when selecting from suggestions

{
  const f=document.getElementById('baseForm');
  const item=findCatalogByName(f.querySelector('[name="name"]').value);
  if(!item){alert('No matching catalog item found.');return;}
  f.querySelector('[name="name"]').value=item.name||'';
  f.querySelector('[name="type"]').value=item.type||'Whisky';
  f.querySelector('[name="abv"]').value=item.abv||'';
  f.querySelector('[name="volume"]').value=item.volume||'';
  f.querySelector('[name="region"]').value=item.region||'';
  updateBaseHints();
}
function saveWishlistItem(e){
  if(e){e.preventDefault();e.stopPropagation();}
  const form=document.getElementById('wishlistForm');
  if(!form) return;
  const f=new FormData(form);
  const name=String(f.get('name')||'').trim();
  if(!name){alert('Name is required.');return;}
  const id=String(f.get('editId')||'') || uid();
  if(!Array.isArray(state.wishlist)) state.wishlist=[];
  const isEdit=state.wishlist.some(x=>x.id===id);
  if(!isEdit && state.wishlist.length>=50){alert('Wishlist limit is 50 items.');return;}
  const item={
    id,
    name,
    image:String(f.get('image')||'').trim(),
    type:String(f.get('type')||'').trim(),
    targetPrice:parseDecimal(f.get('targetPrice')),
    priority:Number(f.get('priority')||state.wishlist.length+1),
    notes:String(f.get('notes')||'').trim()
  };
  upsert(state.wishlist,item);
  state.wishlist.sort((a,b)=>Number(a.priority||99)-Number(b.priority||99));
  save();
  resetWishlistForm();
  render();
  show('wishlist');
}
function resetWishlistForm(){
  const f=document.getElementById('wishlistForm'); if(!f)return;
  f.reset(); f.querySelector('[name="editId"]').value='';
}
function editWishlistItem(id){
  const item=(state.wishlist||[]).find(x=>x.id===id); if(!item)return;
  const f=document.getElementById('wishlistForm');
  f.querySelector('[name="editId"]').value=item.id;
  f.querySelector('[name="name"]').value=item.name||'';
  f.querySelector('[name="image"]').value=item.image||'';
  f.querySelector('[name="type"]').value=item.type||'';
  f.querySelector('[name="targetPrice"]').value=item.targetPrice?formatPrice(item.targetPrice):'';
  f.querySelector('[name="priority"]').value=item.priority||'';
  f.querySelector('[name="notes"]').value=item.notes||'';
  show('wishlist');
}
function deleteWishlistItem(id){
  if(!confirm('Delete this wishlist item?'))return;
  state.wishlist=(state.wishlist||[]).filter(x=>x.id!==id);
  save();renderWishlist();
}
function renderWishlist(){
  const el=document.getElementById('wishlistList'); if(!el)return;
  const items=[...(state.wishlist||[])].sort((a,b)=>Number(a.priority||99)-Number(b.priority||99)).slice(0,50);
  if(!items.length){el.innerHTML='<div class="sub">No wishlist items yet.</div>';return;}
  const top=items.slice(0,5);
  const rest=items.slice(5);
  let html=top.map((w,i)=>`<div class="item">${w.image?`<img class="thumb" src="${w.image}" alt="">`:`<div class="thumb placeholder">⭐</div>`}<div><div class="title">${i+1}. ${esc(w.name)}</div><div class="meta">${esc(w.type||'')} ${w.targetPrice?` · ${formatMoney(w.targetPrice)}`:''}</div><div class="sub">${esc(w.notes||'')}</div></div><div class="side"><button class="smallbtn" onclick="editWishlistItem('${w.id}')">Edit</button><button class="smallbtn" onclick="deleteWishlistItem('${w.id}')">Delete</button></div></div>`).join('');
  if(rest.length){
    html+=`<div class="card"><h3>Other wishes</h3>`+rest.map((w,i)=>`<div class="simple-row"><span>${i+6}. ${esc(w.name)}</span><span><button class="smallbtn" onclick="editWishlistItem('${w.id}')">Edit</button></span></div>`).join('')+`</div>`;
  }
  el.innerHTML=html;
}


function renderTastingBottleList(){
  const el=document.getElementById('tastingBottleList');
  if(!el) return;
  const items=state.bottles.filter(b=>['unopened','opened'].includes(bottleStatus(b.id)));
  if(!items.length){
    el.innerHTML='<div class="sub">No unopened or opened bottles available. Add a bottle to your collection first.</div>';
    return;
  }
  el.innerHTML=items.map(b=>{
    const base=getBase(b.baseId);
    const status=bottleStatus(b.id);
    return `<div class="item" onclick="addTastingForBottle('${b.id}')">${thumb(base)}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">${status==='unopened'?'Unopened':'Opened'} · ${base?.abv||'—'}% · ${ml(bottleVolume(b.id))} left</div><div class="sub">${esc(base?.type||'')}</div></div><div class="side"><button class="smallbtn" onclick="event.stopPropagation();addTastingForBottle('${b.id}')">Add tasting</button></div></div>`;
  }).join('');
}


function applyCatalogItemToLibrary(item){
  const f=document.getElementById('baseForm');
  if(!f || !item) return false;
  setFieldValue(f,'[name="name"]',item.name||'');
  setFieldValue(f,'[name="type"]',item.type||'Whisky');
  setFieldValue(f,'[name="abv"]',item.abv ?? '');
  setFieldValue(f,'[name="volume"]',item.volume ?? '');
  setFieldValue(f,'[name="distillery"]',item.distillery||'');
  setFieldValue(f,'[name="region"]',item.region||'');
  if(item.image){
    pendingBaseImage=item.image;
    const p=document.getElementById('baseImagePreview');
    if(p){p.src=item.image;p.classList.remove('hidden');}
  }
  updateBaseHints();
  document.getElementById('catalogSearchInput')?.blur();
  return true;
}
function renderCatalogSuggestions(query=''){
  const box=document.getElementById('catalogSuggestionsBox');
  if(!box) return;
  const q=normalizeText(query);
  const items=PRELOADED_CATALOG
    .filter(p=>!q || normalizeText([p.name,p.type,p.distillery,p.region].join(' ')).includes(q))
    .slice(0,25);
  if(!items.length){
    box.innerHTML='<div class="sub">No matches.</div>';
    return;
  }
  box.innerHTML=items.map((p,i)=>`
    <div class="catalog-suggestion" data-catalog-index="${PRELOADED_CATALOG.indexOf(p)}">
      <div>
        <strong>${esc(p.name)}</strong>
        <small>${esc(p.type||'')} · ${esc(p.distillery||'')} · ${p.abv||'—'}% · ${p.volume||'—'} ml · ${esc(p.region||'')}</small>
      </div>
      <span class="pill">Use</span>
    </div>
  `).join('');
}
function attachVisibleCatalogPicker(){
  const input=document.getElementById('catalogSearchInput');
  const box=document.getElementById('catalogSuggestionsBox');
  if(!input || !box) return;
  renderCatalogSuggestions('');
  input.addEventListener('input',()=>renderCatalogSuggestions(input.value));
  box.addEventListener('click',e=>{
    const row=e.target.closest('.catalog-suggestion');
    if(!row) return;
    const item=PRELOADED_CATALOG[Number(row.dataset.catalogIndex)];
    applyCatalogItemToLibrary(item);
  });
}

function render(){updateAppTitle();renderPickers();renderHome();renderBaseList();renderAllBottleLists();renderTastingBottleList();renderWishlist();renderAnalytics();}
function renderPickers(){document.getElementById('basePick').innerHTML=state.bases.length?state.bases.map(b=>`<option value="${b.id}">${esc(b.name)} — ${esc(b.type)}</option>`).join(''):'<option value="">No library items</option>';}




function renderHomeCategoryImages(){
  renderCategoryStrip('unopened','homeUnopenedImages');
  renderCategoryStrip('opened','homeOpenedImages');
  renderCategoryStrip('empty','homeEmptyImages');
}
function renderCategoryStrip(status, targetId){
  const el=document.getElementById(targetId);
  if(!el) return;
  const items=state.bottles.filter(b=>bottleStatus(b.id)===status).slice(0,4);
  let html='';
  for(let i=0;i<4;i++){
    const b=items[i];
    const base=b?getBase(b.baseId):null;
    if(base && base.image){
      html += `<img src="${base.image}" alt="">`;
    }else{
      html += `<div class="fallback-bottle">🥃</div>`;
    }
  }
  el.innerHTML=html;
}

function renderHome(){
  renderHomeCategoryImages();
  document.getElementById('totalCost').textContent=formatMoney(state.bottles.reduce((s,b)=>s+parseDecimal(b.price),0));
  document.getElementById('totalVolume').textContent=ml(state.bottles.reduce((s,b)=>s+bottleVolume(b.id),0));
  document.getElementById('openedCount').textContent=state.bottles.filter(b=>bottleStatus(b.id)==='opened').length;
  document.getElementById('tastingCount').textContent=state.tastings.length;
  const best=[...state.bottles].filter(b=>bottleAvg(b.id)>0).sort((a,b)=>bestValueScore(b.id)-bestValueScore(a.id)).slice(0,5);
  document.getElementById('bestValueList').innerHTML=best.length?best.map(b=>miniBottle(b,'home')).join(''):'<div class="sub">No rated bottles yet.</div>';
  const low=[...state.bottles].filter(b=>bottleStatus(b.id)==='opened'&&bottleVolume(b.id)<=200).sort((a,b)=>bottleVolume(a.id)-bottleVolume(b.id)).slice(0,5);
  document.getElementById('lowStockList').innerHTML=low.length?low.map(b=>miniBottle(b,'home')).join(''):'<div class="sub">No low-stock bottles.</div>';
  const recent=[...state.tastings].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,5);
  document.getElementById('recentList').innerHTML=recent.length?recent.map(t=>`<div class="item"><div class="thumb placeholder">📝</div><div><div class="title">${esc(bottleName(getBottle(t.bottleId)||{}))}</div><div class="meta">${esc(t.date)} · Score ${t.score} · ${t.ml} ml</div><div class="sub">${esc(t.notes||'')}</div></div></div>`).join(''):'<div class="sub">No tastings yet.</div>';
  const typeTotals={};state.bottles.forEach(b=>{const base=getBase(b.baseId);const type=base?.type||'Other';typeTotals[type]=(typeTotals[type]||0)+bottleVolume(b.id);});
  document.getElementById('typeVolumeList').innerHTML=Object.keys(typeTotals).length?Object.entries(typeTotals).sort((a,b)=>b[1]-a[1]).map(([type,vol])=>`<div class="item"><div class="thumb placeholder">📊</div><div><div class="title">${esc(type)}</div><div class="meta">${ml(vol)}</div></div></div>`).join(''):'<div class="sub">No bottles yet.</div>';
}
function renderBaseList(){
  const q=(document.getElementById('baseSearch').value||'').toLowerCase().trim();
  const items=state.bases.filter(b=>[b.name,b.distillery,b.type,b.region,b.notes].join(' ').toLowerCase().includes(q));
  document.getElementById('baseList').innerHTML=items.length?items.map(b=>{const dens=densityFromAbv(Number(b.abv||0)),empty=computedEmptyWeight(b);return `<div class="item">${thumb(b)}<div><div class="title">${esc(b.name)}</div><div class="meta">${esc(b.type)} · ${esc(b.distillery||'')}</div><div class="meta">${esc(b.region||'')} · ${b.abv?b.abv+'%':'ABV not set'} · density ${dens.toFixed(4)} g/ml</div><div class="tags"><span class="pill">${ml(b.volume)}</span><span class="pill">${b.fullWeight?Math.round(b.fullWeight)+' g full':'Full weight not set'}</span><span class="pill ok">${empty!==null?Math.round(empty)+' g empty':'Empty unavailable'}</span></div></div><div class="side"><button class="smallbtn" onclick="editBase('${b.id}')">Edit</button><button class="smallbtn" onclick="deleteBase('${b.id}')">Delete</button></div></div>`;}).join(''):'<div class="sub">No library items.</div>';
}
function renderAllBottleLists(){
  renderBottleCategory('unopened','unopenedList');
  renderBottleCategory('opened','openedList');
  renderBottleCategory('empty','emptyList');
}
function renderBottleCategory(status, target){
  const items=state.bottles.filter(b=>bottleStatus(b.id)===status);
  document.getElementById(target).innerHTML=items.length?items.map(b=>categoryBottleCard(b,status)).join(''):`<div class="card sub">No ${status} bottles.</div>`;
}
function categoryBottleCard(b,status){
  const base=getBase(b.baseId);
  let details='';
  if(status==='unopened') details=`<div class="meta">Purchased ${esc(b.purchaseDate||'—')} · ${base?.abv||'—'}% · ${ml(base?.volume||0)}</div>`;
  if(status==='opened') details=`<div class="meta">Purchased ${esc(b.purchaseDate||'—')} · Opened ${esc(b.openedDate||firstTasted(b.id)||'—')} · Last tasted ${esc(lastTasted(b.id))} · ${ml(bottleVolume(b.id))} left</div>`;
  if(status==='empty') details=`<div class="meta">Purchased ${esc(b.purchaseDate||'—')} · Opened ${esc(b.openedDate||firstTasted(b.id)||'—')} · Last tasted ${esc(lastTasted(b.id))}</div>`;
  return `<div class="item" onclick="openBottleDetail('${b.id}','${status}')">${thumb(base)}<div><div class="title">${esc(bottleName(b))}</div>${details}<div class="sub">${esc(b.comments||'')}</div></div><div class="side"><button class="smallbtn" onclick="event.stopPropagation();openBottleDetail('${b.id}','${status}')">Open</button></div></div>`;
}
function miniBottle(b,returnView){
  const base=getBase(b.baseId);
  return `<div class="item" onclick="openBottleDetail('${b.id}','${returnView}')">${thumb(base)}<div><div class="title">${esc(bottleName(b))}</div><div class="meta">${ml(bottleVolume(b.id))} left · Avg ${bottleAvg(b.id).toFixed(1)} · Value ${bestValueScore(b.id).toFixed(2)}</div></div></div>`;
}
function openBottleDetail(id, returnView='home'){
  currentBottleId=id; detailReturnView=returnView||'home';
  const b=getBottle(id),base=getBase(b?.baseId); if(!b||!base)return;
  const status=bottleStatus(id);
  const tastings=bottleTastings(id).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const comments=bottleComments(id);
  const detail=document.getElementById('bottleDetail');
  detail.innerHTML=`
    <div class="card detail-hero">${thumb(base)}
      <div>
        <div class="eyebrow">${status.toUpperCase()}</div>
        <h2>${esc(bottleName(b))}</h2>
        <p>${esc(base.type)} · ${esc(base.distillery||'')}</p>
        <div class="tags">
          <span class="pill">${base.abv||'—'}%</span>
          <span class="pill">${ml(base.volume||0)}</span>
          <span class="pill">${formatMoney(b.price)}</span>
          <span class="pill ok">${ml(bottleVolume(id))} left</span>
          <span class="pill ok">Avg ${bottleAvg(id).toFixed(1)}</span>
        </div>
      </div>
    </div>
    <div class="grid two">
      <div class="card"><h3>Summary</h3>
        <div class="meta">Purchase date: ${esc(b.purchaseDate||'—')}</div>
        <div class="meta">Opened date: ${esc(b.openedDate||firstTasted(id)||'—')}</div>
        <div class="meta">Last tasted: ${esc(lastTasted(id))}</div>
        <div class="meta">Remaining volume: ${ml(bottleVolume(id))}</div>
        <div class="sub">${esc(b.comments||'')}</div>
      </div>
      <div class="card"><h3>Actions</h3>
        <div class="side" style="justify-content:flex-start;margin-top:8px">
          <button class="smallbtn" onclick="addTastingForBottle('${id}')">Add tasting</button>
          <button class="smallbtn" onclick="addCommentForBottle('${id}')">Add comment</button>
          <button class="smallbtn" onclick="weighBottle('${id}')">Weigh</button>
          <button class="smallbtn" onclick="editBottle('${id}')">Edit bottle</button>
          <button class="smallbtn" onclick="markEmpty('${id}')">Last sip enjoyed</button>
          <button class="smallbtn" onclick="deleteBottle('${id}')">Delete</button>
        </div>
      </div>
    </div>
    <div class="card"><h3>Tastings</h3>${tastings.length?tastings.map(t=>`<div class="item"><div class="thumb placeholder">📝</div><div><div class="title">${esc(t.date)}</div><div class="meta">${t.ml} ml · Score ${t.score}</div><div class="sub">${esc(t.notes||'')}</div></div><div class="side"><button class="smallbtn" onclick="deleteTasting('${t.id}')">Delete</button></div></div>`).join(''):'<div class="sub">No tastings yet.</div>'}</div>
    <div class="card"><h3>Comments</h3>${comments.length?comments.map(c=>`<div class="item"><div class="thumb placeholder">💬</div><div><div class="title">${esc(c.date)}</div><div class="sub">${esc(c.text)}</div></div></div>`).join(''):'<div class="sub">No comments yet.</div>'}</div>
  `;
  show('bottle-detail');
}
function formatPrice(value){return parseDecimal(value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}


/* v1.24 override visible catalog picker */
function renderCatalogSuggestions(query=''){
  const box=document.getElementById('catalogSuggestionsBox');
  if(!box) return;
  const q=normalizeText(query);
  const items=(window.WHISKYLOG_CATALOG||PRELOADED_CATALOG||[])
    .filter(p=>!q || normalizeText([p.name,p.type,p.distillery,p.region].join(' ')).includes(q))
    .slice(0,30);
  if(!items.length){ box.innerHTML='<div class="sub">No catalog matches.</div>'; return; }
  box.innerHTML=items.map(p=>`
    <button type="button" class="catalog-hard-row" data-catalog-name="${esc(p.name)}">
      <strong>${esc(p.name)}</strong>
      <small>${esc(p.type||'')} · ${esc(p.distillery||'')} · ${p.abv||'—'}% · ${p.volume||'—'} ml · ${esc(p.region||'')}</small>
    </button>
  `).join('');
}
function attachVisibleCatalogPicker(){
  const input=document.getElementById('catalogSearchInput');
  const box=document.getElementById('catalogSuggestionsBox');
  if(!input || !box) return;
  renderCatalogSuggestions(input.value || '');
  input.oninput=()=>renderCatalogSuggestions(input.value);
  input.onfocus=()=>renderCatalogSuggestions(input.value);
  box.onclick=(e)=>{
    const row=e.target.closest('.catalog-hard-row');
    if(!row) return;
    e.preventDefault();
    const name=row.dataset.catalogName;
    const item=(window.WHISKYLOG_CATALOG||PRELOADED_CATALOG||[]).find(p=>p.name===name);
    applyCatalogItemToLibrary(item);
    input.value=name;
    renderCatalogSuggestions(name);
  };
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(attachVisibleCatalogPicker,200));


/* v1.26 catalog removed for stability */
function attachVisibleCatalogPicker(){ return; }

/* v1.28 */
function fillLibraryFromCatalog(){return false;}


/* v1.29 type dropdown fallback */
function fillAllTypeDropdowns(){
  const types=["Whisky", "Single Malt Scotch", "Blended Scotch", "Bourbon", "Rye Whiskey", "Tennessee Whiskey", "Irish Whiskey", "Japanese Whisky", "Canadian Whisky", "Rum", "Dark Rum", "Aged Rum", "Agricole Rum", "Cognac", "Armagnac", "Brandy", "Calvados", "Aquavit", "Gin", "Vodka", "Tequila", "Mezcal", "Liqueur", "Amaro", "Other"];
  document.querySelectorAll('select[name="type"]').forEach(sel=>{
    if(sel.options.length>1) return;
    const current=sel.value||'';
    sel.innerHTML='<option value="">Choose type</option>'+types.map(t=>`<option value="${t}">${t}</option>`).join('');
    if(current) sel.value=current;
  });
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(fillAllTypeDropdowns,100));
