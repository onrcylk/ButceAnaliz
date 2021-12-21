//# sourceURL=OsbBasvuruDokuman.js
if (window.OsbBasvuruDokuman_Loaded == null) {
    var OsbBasvuruDokuman = {
        Init: function (fileType) {
            OsbBasvuruDokuman.LoadFormData(fileType);
        },
        LoadFormData: function (fileType) {
            Util.Elements.MultiDropzone('dosyaOrtak', 5, null, true, null, OsbBasvuruDokuman.CallBackDropzoneUpload);
            if (parseInt(fileType) + 1 !== basvuruDurum) {
                $("#externalDiv").addClass("disableDiv");
            } else {
                //Util.Elements.Dropzone('Dokuman', 1, null, true, null, null);
                Util.Elements.MultiDropzone('Dokuman', 10, null, true);
            }
            
        },

        CallBackDropzoneUpload: function (file) {
            //Util.BlockUI.Block("Dosyanız Yükleniyor..");
            var formData = new FormData();
            var selectBasgid = document.URL;
            var split = selectBasgid.split("=");
            var basvuruGid = split[1];
            var select = document.getElementById('dosyaTipi');
            var dosyaTipi = select.options[select.selectedIndex].value;
            formData.append("BasvuruDosyalar[0].File", $("#dosyaOrtak").get(0).dropzone.files[0]);
            //formData.append("BasvuruDosyalar[2].File", $("#dosyaOrtak").get(0).dropzone.files[2]);
            formData.append("basvuruGid", basvuruGid);
            formData.append("dosyaTip", dosyaTipi);
            Util.Ajax.Generic("SubeYerSecimi", "YerSecimFileUploadSave", OsbBasvuruDokuman.CallBackUpload, formData, true);
            OsbBasvuruDokuman.Yonlendir();
        },
        CallBackUpload: function (Response) {
            Util.BlockUI.UnBlock();
            if (Response.data) {
                Util.Notification.Swall(Response.Durum, Response.data, "Cevap", "Tamam");

            }
            $('.dz-remove')[0].click();
          
        },
        SoftDelete: function (globalId) {
            var formData = new FormData();
            formData.append("globalId", globalId);
            Util.Ajax.Generic("SubeYerSecimi", "YersecimiFileSoftDelete", OsbBasvuruDokuman.CallBackUpload, formData, true);
            location.reload();
            return false;
        },
        Update: function () {
            var formData = new FormData();
            var ebysNo = $("#EvrakSayisi").val();
            var durumId = 7;
            var selectBasgid = document.URL;
            var split = selectBasgid.split("=");
            var basvuruGid = split[1];
            formData.append("EbysNumarasi", ebysNo);
            formData.append("basvuruGlobalId", basvuruGid);
            formData.append("durumId", durumId);
            Util.Ajax.Generic("SubeYerSecimi", "EbysNoGuncelle", "", formData, false);
        },
        Yonlendir: function () {
            window.location.href = "/SubeYerSecimi/OsbBasvuruDuzenle?basvuruGlobalId=" + basvuruGlobalId;
        },
        DokumanKaydet: function () {
            var formData = new FormData();
            var index = 0;
            for (var i = 0; i < $("#bakanlikAltKomisyon").get(0).dropzone.files.length; i++) {
                formData.append("BasvuruDosyalar[" + index + "].File", $("#bakanlikAltKomisyon").get(0).dropzone.files[i]);
                formData.append("BasvuruDosyalar[" + index + "].FileTipId", 4);
                index++;
            }
            for (var i = 0; i < $("#digerBelgeler").get(0).dropzone.files.length; i++) {
                formData.append("BasvuruDosyalar[" + index + "].File", $("#digerBelgeler").get(0).dropzone.files[i]);
                formData.append("BasvuruDosyalar[" + index + "].FileTipId", 5);
                index++;
            }
            for (var i = 0; i < $("#yerSecimDokuman").get(0).dropzone.files.length; i++) {
                formData.append("BasvuruDosyalar[" + index + "].File", $("#yerSecimDokuman").get(0).dropzone.files[i]);
                formData.append("BasvuruDosyalar[" + index + "].FileTipId", 6);
                index++;
            }
            for (var i = 0; i < $("#kurumGorusleri").get(0).dropzone.files.length; i++) {
                formData.append("BasvuruDosyalar[" + index + "].File", $("#kurumGorusleri").get(0).dropzone.files[i]);
                formData.append("BasvuruDosyalar[" + index + "].FileTipId", 7);
                index++;
            }
            formData.append("basvuruGlobalId", basvuruGlobalId);
            Util.Ajax.Generic("SubeYerSecimi", "OsbBasvuruDokuman", OsbBasvuruDokuman.CallBackDokumanKaydet, formData, false);
        },

        CallBackDokumanKaydet: function () {
            //call back save fonksiyonu
        },

        GetDropzoneFile: function() {
            return $("#dosyaOrtak").get(0).dropzone.files;
        }
    }
    window.OsbBasvuruDokuman_Loaded = true;
};