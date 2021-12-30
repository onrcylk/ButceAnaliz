var doviz_kuru_satis = new Array(1, 5.2750, 5.9800, 6.8510, 0.0481, 5.2670, 0.8011, 0.5697,
    0.6134, 1.4100, 3.7480, 3.9790, 0.0799, 0.7794, 0.3852, 0.2751, 3.5497, 0.0044, 1.4314, 17.3095, 13.9806);

var doviz_kuru_alis = new Array(1, 5.2250, 5.9200, 6.7110, 0.0470, 5.1800, 0.7839, 0.5575, 0.6003, 1.3740, 3.6050,
    3.8820, 0.0799, 0.7794, 0.3852, 0.2751, 3.5497, 0.0044, 1.4314, 17.3095, 13.9806);

function doviz() {
    var birim = document.getElementById('birim').selectedIndex;
    var birim2 = document.getElementById('birim2').selectedIndex;
    var para = document.getElementById('para').value.toString().replace(/,/g, '');

    if (document.getElementsByName('satisalis')[0].checked == true) {
        var cvr = para * ((doviz_kuru_satis[birim]) / (doviz_kuru_satis[birim2])) / 1;
    }

    else {
        var cvr = para * ((doviz_kuru_alis[birim]) / (doviz_kuru_alis[birim2])) / 1;
    }
    document.getElementById('para').value = numberFormat(para); if (!isNaN(cvr)) {
        document.getElementById('para2').value = numberFormat(cvr.toFixed(2)) + ' ' + document.getElementById('birim2').options[birim2].value;
    }
};

function numberFormat(nStr) {
    nStr += ''; x = nStr.split('.'); x1 = x[0]; x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(d+)(d{3})/; while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
};

function tersdoviz() {
    var birim = document.getElementById('birim');
    var birim2 = document.getElementById('birim2');
    tur = birim.selectedIndex;
    tur2 = birim2.selectedIndex;
    birim.options[tur2].selected = true; birim2.options[tur].selected = true;
    doviz();
};






















