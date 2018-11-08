//js to generate tuto and about page from translation on spreadsheet

/**
* @func update the content of about tab in function of language
* @lang actual language to display
*/
function update_about(lang) {
  //clean about tab
  var about_tab = document.getElementById("about");
  about_tab.innerHTML = "";

  //get all translations for about tab
  var arr_trans = list_from_json(json_lang_translate[lang], "about_");

  //place them along with images and buttons, etc
  var h = document.createElement("h1");
  h.innerHTML = json_lang_translate[lang]["about_title"];
  about_tab.appendChild(h);

  var sp = document.createElement("span");
  sp.innerHTML = json_lang_translate[lang]["about_lang"];
  about_tab.appendChild(sp);

  var sel = document.createElement("select");
  sel.name = "language";
  var keys = Object.keys(json_lang_translate);
  for (var i = 0; i < keys.length; ++i) {
    var new_opt = document.createElement("option");
    if (keys[i] == global_language)
      new_opt.setAttribute("selected", "selected");
    new_opt.value = keys[i];
    new_opt.text = json_lang_translate[keys[i]]["name"];
    sel.add(new_opt);
  }
  about_tab.appendChild(sel);

  //set the on function for selector to update language
  $("[name='language']").on("change", function(event) {
    var language = $(this).val();
    if (language != global_language)
    {
      /* update HTML text */
      updateLanguageText(language);
      /* update Analysis table */
      updateTableLanguageAnalysis(language);
      /* update metadata table */
      updateTableLanguageMetadata(language);
      /* update forensic table */
      updateTableLanguageForensic(language);
      /* update about tab */
      update_about(language);
      /* update tuto tab */
      update_tuto(language);
      setCookieLang(language);
    }
  });

  for (var i = 0; i < arr_trans.length; ++i) {
    var p = document.createElement("p");
    p.innerHTML = arr_trans[i];
    about_tab.appendChild(p);
  }

  var imgs = document.createElement("p");
  var img1 = document.createElement("img");
  img1.src = "img/Logo-AFP-384.png";
  img1.height = "83";
  var img2 = document.createElement("img");
  img2.src = "img/iti.jpg";
  img2.height = "70";
  var img3 = document.createElement("img");
  img3.src = "img/logo_EUh2020_horizontal.png";
  img3.height = "83";
  img3.width = "462";
  img3.alt = "Europe";

  imgs.appendChild(img1);
  imgs.appendChild(img2);
  imgs.appendChild(img3);

  about_tab.appendChild(imgs);
}

/**
* @func update the content of tuto tab in function of language
* @lang actual language to display
*/
function update_tuto(lang) {
  //clean about tab
  var tuto_tab = document.getElementById("tutorial");
  tuto_tab.innerHTML = "";

  //get all translations for about tab
  var arr_trans = list_from_json(json_lang_translate[lang], "tuto_");

  //place them along with images and buttons, etc
  var h = document.createElement("h1");
  h.innerHTML = json_lang_translate[lang]["tuto_title"];
  tuto_tab.appendChild(h);

  var h = document.createElement("h2");
  h.innerHTML = json_lang_translate[lang]["tuto_h_1"];
  tuto_tab.appendChild(h);

  var img = document.createElement("img");
  img.src = "img/VideoURLmenu.png";
  tuto_tab.appendChild(img);

  for (var i = 0; i < 3; ++i) {
    var p = document.createElement("p");
    p.innerHTML = arr_trans[i];
    tuto_tab.appendChild(p);
  }

  var img = document.createElement("img");
  img.src = "img/InstagramDemo.png";
  img.width = "100%";
  tuto_tab.appendChild(img);

  var h = document.createElement("h2");
  h.innerHTML = json_lang_translate[lang]["tuto_h_2"];
  tuto_tab.appendChild(h);

  var div = document.createElement("div");
  div.style = "text-align: center";
  var iframe = document.createElement("iframe");
  iframe.width = "640";
  iframe.height = "385";
  iframe.src = "https://www.youtube.com/embed/nmgbFODPiBY";
  iframe.frameborder = "0"
  div.appendChild(iframe);
  tuto_tab.appendChild(div);

  for (var i = 3; i < 8; ++i) {
    var p = document.createElement("p");
    p.innerHTML = arr_trans[i];
    tuto_tab.appendChild(p);
  }

  var div = document.createElement("div");
  div.style = "text-align: center";
  var iframe = document.createElement("iframe");
  iframe.width = "640";
  iframe.height = "385";
  iframe.src = "https://www.youtube.com/embed/8S59OMBvT8w";
  iframe.frameborder = "0"
  div.appendChild(iframe);
  tuto_tab.appendChild(div);

  for (var i = 8; i < 12; ++i) {
    var p = document.createElement("p");
    p.innerHTML = arr_trans[i];
    tuto_tab.appendChild(p);
  }
}