var Util = {
    JsonDateToDate: function (value) {

        if (value && value != "") {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            var dt = new Date(parseFloat(results[1]));
            return dt;
        } else {
            return null;
        }
    }
};

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return parseFloat((bytes / (1024 ** i)).toFixed(1))
}

Util.XssPrevent = {
    Prevent: function (element) {
        var lt = "<",
            gt = ">",
            ap = "'",
            ic = '"';

        var count = 0;

        if ($("#" + element.id).val().indexOf(lt) != -1)
            count++;
        if ($("#" + element.id).val().indexOf(gt) != -1)
            count++;
        if ($("#" + element.id).val().indexOf(ap) != -1)
            count++;
        if ($("#" + element.id).val().indexOf(ic) != -1)
            count++;

        if (count > 0) {
            Util.Notification.Toastr("error", "Geçersiz bir karekter girdiniz, lütfen tekrar deneyiniz.", "Bilgi");
            $("#" + element.id).val("");
        }
    }
}


Util.BlockUI = {
    Block: function (text) {
        KTApp.blockPage({
            overlayColor: '#000000',
            type: 'v2',
            state: 'primary',
            message: text,
        });
        $('.blockUI').css('z-index', '1050');
        $('.blockOverlay').css('z-index', '1050');
    },
    UnBlock: function () {
        KTApp.unblockPage();
    }
}
Util.FileDownload = {
    FileDownloader: function () {
        Util.URL.Redirect('/Home/OrnekDosyaIndirBasvuru?tur=1');
    },

    FileDownloaderExcel: function () {
        Util.URL.Redirect('/Home/OrnekDosyaIndirBasvuru?tur=3');
    }
}
Util.Notification = {
    Toastr: function (type, msg, title, positionClass) {
        if (!positionClass)
            positionClass = "toast-top-right";

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": positionClass,
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "10000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        if (type == "error")
            toastr.error(msg, title);
        else if (type == "success")
            toastr.success(msg, title);
        else if (type == "info")
            toastr.info(msg, title);
        else if (type == "warning")
            toastr.warning(msg, title);
    },
    Swall: function (type, msg, title, confirmBtnText, isCancelBtn, cancelBtnText, dismissFunction, dismissTitle, dismissMessage, dismissType, targetButton, routeUrl) {
        if (!dismissFunction) {
            swal.fire({
                title: title,
                text: msg,
                type: type,

                buttonsStyling: false,

                confirmButtonText: confirmBtnText,
                confirmButtonClass: "btn btn-danger",

                allowEscapeKey: false,
                allowOutsideClick: false,

                showCancelButton: isCancelBtn,
                cancelButtonText: cancelBtnText,
                cancelButtonClass: "btn btn-default"
            });
        }
        else {
            swal.fire({
                title: title,
                text: msg,
                type: type,
                showCancelButton: isCancelBtn,
                confirmButtonText: confirmBtnText,
                cancelButtonText: cancelBtnText,
                reverseButtons: true,
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(function (result) {
                if (result.value) {
                    dismissFunction(routeUrl, targetButton);
                    //swal.fire(
                    //    dismissTitle,
                    //    dismissMessage,
                    //    dismissType
                    //);
                } else {
                    if (targetButton)
                        KTApp.unprogress(targetButton);
                }
            });
        }
    },
    SwallOptionalParameter: function (type, msg, title, confirmBtnText, isCancelBtn, cancelBtnText, dismissFunction, targetButton, ...args) {
        if (!dismissFunction) {
            swal.fire({
                title: title,
                text: msg,
                type: type,

                buttonsStyling: false,

                confirmButtonText: confirmBtnText,
                confirmButtonClass: "btn btn-danger",

                allowEscapeKey: false,
                allowOutsideClick: false,

                showCancelButton: isCancelBtn,
                cancelButtonText: cancelBtnText,
                cancelButtonClass: "btn btn-default"
            });
        }
        else {
            swal.fire({
                title: title,
                text: msg,
                type: type,
                showCancelButton: isCancelBtn,
                confirmButtonText: confirmBtnText,
                cancelButtonText: cancelBtnText,
                reverseButtons: true,
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(function (result) {
                if (result.value) {
                    dismissFunction(args);
                    //swal.fire(
                    //    dismissTitle,
                    //    dismissMessage,
                    //    dismissType
                    //);
                } else {
                    if (targetButton)
                        KTApp.unprogress(targetButton);
                }
            });
        }
    }
}

Util.Ajax = {
    Navigate: function (url, method, data, contentholder) {
        var returnData = null;
        $('.mcx-loader').fadeIn("slow");
        $("#responsive-kamuModal").modal({
            keyboard: false,
            show: true,
            backdrop: 'static'
        });
        $(contentholder).empty();
        $.ajax({
            type: method,
            url: url,
            cache: false,
            data: data,
            success: function (response) {
                if (contentholder != null && contentholder != '') {
                    $(contentholder).html(response);
                    $('.mcx-loader').fadeOut("slow");
                }
                returnData = response;
            },
            async: true
        });

        return returnData;
    },
    Navigation: function (controller, url, data, contentholder) {
        $.ajax({
            type: "POST",
            url: "/" + controller + "/" + url,
            data: data,
            async: false,
            success: function (response) {
                $(contentholder).empty();

                if (contentholder != null && contentholder != '') {
                    $(contentholder).html(response);
                    $(contentholder).modal('show');
                    $('.mcx-loader').fadeOut("slow");
                }
            },
            error: function (result) {
            }
        });
    },
    Response: function (controller, url, data) {
        var responseData;
        $.ajax({
            type: "POST",
            url: "/" + controller + "/" + url,
            data: data,
            dataType: "json",
            async: false,
            contentType: false,
            processData: false,
            success: function (result) {
                responseData = result;
            }
        });

        return responseData;
    },
    Generic: function (controller, url, callback, data, async) {
        $.ajax({
            type: "POST",
            url: "/" + controller + "/" + url,
            data: data,
            async: async,
            contentType: false,
            processData: false,
            success: function (result) {
                //if (Object.prototype.toString.call(result) == '[object String]') {
                //    if (result.indexOf("Login/Login.js") > 0) {
                //        window.location.assign("Login/Login");
                //        return;
                //    }
                //}
                if (callback) {
                    callback(result);
                }
            }
        });
    },
    RawUrl: function (url, method, data, async) {
        var responseData;
        $.ajax({
            type: method,
            url: url,
            data: data,
            async: async,
            contentType: false,
            processData: false,
            success: function (result) {
                responseData = result;
            }
        });
        return responseData;
    },
    Request2: function (controller, method, data, callback, onEnd, block) {
        $.ajax({
            type: "POST",
            url: "/" + controller + "/" + method,
            cache: false,
            data: "Json=" + data,
            success: function (response) {
                try {
                    response = JSON.parse(response);
                } catch (e) { /*console.log(e);*/
                }

                if (callback) {
                    callback(response);
                }

                if (onEnd) {
                    eval(onEnd);
                }
            },
            error: function (response) {
                if (callback) {
                    response.RestNotification = {};
                    response.RestNotification.NotificationMessage = "Beklenmedik Bir Hata Oluştu!";
                    callback(response);
                }

                if (onEnd) {
                    eval(onEnd);
                }
            },
            async: true,
            beforeSend: function () {
                if (block) {
                    Util.BlockUI.Block("İşlem Yapılıyor...");
                }
            },
            complete: function () {
                if (block) {
                    Util.BlockUI.UnBlock();
                }
            }
        });
    },
    Request: function (method, data, callback) {
        method = "Method=" + method;
        if (data && data != "") {
            data = method + "&" + data;
        } else {
            data = method;
        }
        $.ajax({
            type: "POST",
            url: "/Data/DataManager",
            cache: false,
            data: data,
            success: function (response) {
                response = JSON.parse(response);

                if (callback) {
                    callback(response);
                }
            },
            async: true
        });
    },
    RequestSync: function (method, data, callback) {
        method = "Method=" + method;
        if (data && data != "") {
            data = method + "&" + data;
        } else {
            data = method;
        }
        $.ajax({
            type: "POST",
            url: "/Data/DataManager",
            cache: false,
            data: data,
            success: function (response) {
                response = JSON.parse(response);

                if (callback) {
                    callback(response);
                }
            },
            async: false
        });
    },
    SelectorData: function (method, data, contentHolder, selectorName, defaultText, multiple, callBackAfterChange, selectorSelectedValue, addOption) {

        if (!callBackAfterChange) {
            callBackAfterChange = "";
        };

        if (!selectorSelectedValue) {
            selectorSelectedValue = 0;
        };

        $.ajax({
            type: "POST",
            url: "/Data/" + method,
            cache: false,
            data: data,
            dataType: "json",
            async: true,
            contentType: false,
            processData: false,
            success: function (response) {
                var data = response.response.ResultObject;

                var selectorDiv = document.getElementById(selectorName);

                if (addOption && selectorDiv) {

                    for (var i = 0; i < data.length; i++) {
                        var value = "";

                        if (data[i].Value != "00000000-0000-0000-0000-000000000000")
                            value = data[i].Value;

                        else if (data[i].ValueString != null)
                            value = data[i].ValueString;

                        else if (data[i].ValueInt != null)
                            value = data[i].ValueInt;

                        var option = document.createElement("option");
                        option.text = data[i].Text;
                        option.value = value;

                        if (selectorSelectedValue == value) {
                            option.selected = "true";
                        }

                        selectorDiv.add(option);
                    }
                }
                else {
                    if (callBackAfterChange) {
                        callBackAfterChange = "onchange=\"" + callBackAfterChange + ";\"";
                    }

                    if (multiple == true) {
                        multiple = "multiple=\"multiple\" style=\"overflow-y:auto\" class=\"select2\"";
                    } else {
                        multiple = " class=\"form-control\"";
                    }

                    var html = "<select " + callBackAfterChange + " " + multiple + "  id=\"" + selectorName + "\" name=\"" + selectorName + "\">";

                    var html;
                    if (defaultText) {
                        html += "<option value=\"0\" selected=\"selected\">" + defaultText + "</option>";
                    }
                    for (var i = 0; i < data.length; i++) {
                        var value = "";

                        if (data[i].Value != "00000000-0000-0000-0000-000000000000")
                            value = data[i].Value;

                        else if (data[i].ValueString != null)
                            value = data[i].ValueString;

                        else if (data[i].ValueInt != null)
                            value = data[i].ValueInt;

                        html += "<option value='" + value;

                        if (selectorSelectedValue !== 0) {

                            if (multiple) {
                                var selectedList = selectorSelectedValue.split(',');
                                for (var k = 0; k < selectedList.length; k++) {
                                    if (selectedList[k] === value)
                                        html += "' selected=\"selected\" ";
                                }
                                html += "'>" + data[i].Text + "</option>";
                            }
                            else {
                                if (selectorSelectedValue === value)
                                    html += "' selected=\"selected\">" + data[i].Text + "</option>";
                                else
                                    html += "'>" + data[i].Text + "</option>";
                            }
                        }
                        else {
                            html += "'>" + data[i].Text + "</option>";
                        }
                    }
                    html += "</select>";

                    $(contentHolder).html(html);

                    $("#" + selectorName).select2();
                }

            }
        });
    },
    SelectorGet: function (controllerName, methodName, data, contentHolder, selectorName, defaultText, multiple, callBackAfterChange, selectorSelectedValue, async, disabled, className) {

        if (!callBackAfterChange) {
            callBackAfterChange = "";
        };

        if (!selectorSelectedValue) {
            selectorSelectedValue = 0;
        };
        if (async == null) {
            async = true;
        };
        if (disabled == null) {
            disabled = false;
        };
        if (!className) {
            className = "";
        }

        $.ajax({
            type: "GET",
            url: "/" + controllerName + "/" + methodName,
            cache: false,
            data: data,
            async: async,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (response) {
                data = response.response;
                var mData;
                if (callBackAfterChange) {
                    callBackAfterChange = "onchange=\"" + callBackAfterChange + ";\"";
                }

                if (multiple == true) {
                    mData = "multiple=\"multiple\" style=\"overflow-y:auto\" class=\"select2 " + className + "\"";
                } else {
                    mData = "class=\"form-control " + className + "\"";
                }

                var html = "<select " + callBackAfterChange + " " + mData + "  id=\"" + selectorName + "\" name=\"" + selectorName + "\">";
                if (defaultText) {
                    html += "<option value=\"\" selected=\"selected\">" + defaultText + "</option>";
                }
                for (var i = 0; i < data.length; i++) {
                    var value = "";

                    if (data[i].Value != "00000000-0000-0000-0000-000000000000")
                        value = data[i].Value;

                    else if (data[i].ValueString != null)
                        value = data[i].ValueString;

                    else if (data[i].ValueInt != null)
                        value = data[i].ValueInt;

                    html += "<option value='" + value;

                    if (selectorSelectedValue === value)
                        html += "' selected=\"selected\">" + data[i].Text + "</option>";
                    else
                        html += "'>" + data[i].Text + "</option>";
                }
                html += "</select>";

                $(contentHolder).html(html);
                $("#" + selectorName).select2();
                if (disabled) {
                    $("#" + selectorName).prop('disabled', disabled);
                }
                if (multiple == true) {
                    $("#" + selectorName).val(selectorSelectedValue);
                }
                $("#" + selectorName).trigger('change');
            }
        });
    },
    Selector: function (controllerName, methodName, data, contentHolder, selectorName, defaultText, multiple, callBackAfterChange, selectorSelectedValue, async, disabled, className) {

        if (!callBackAfterChange) {
            callBackAfterChange = "";
        };

        if (!selectorSelectedValue) {
            selectorSelectedValue = 0;
        };
        if (async == null) {
            async = true;
        };
        if (disabled == null) {
            disabled = false;
        };
        if (!className) {
            className = "";
        }

        $.ajax({
            type: "POST",
            url: "/" + controllerName + "/" + methodName,
            cache: false,
            data: data,
            async: async,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (response) {
                data = response.response;
                var mData;
                if (callBackAfterChange) {
                    callBackAfterChange = "onchange=\"" + callBackAfterChange + ";\"";
                }

                if (multiple == true) {
                    mData = "multiple=\"multiple\" style=\"overflow-y:auto\" class=\"select2 " + className + "\"";
                } else {
                    mData = "class=\"form-control " + className + "\"";
                }

                var html = "<select " + callBackAfterChange + " " + mData + "  id=\"" + selectorName + "\" name=\"" + selectorName + "\">";
                if (defaultText) {
                    html += "<option value=\"\" selected=\"selected\">" + defaultText + "</option>";
                }
                for (var i = 0; i < data.length; i++) {
                    var value = "";

                    if (data[i].Value != "00000000-0000-0000-0000-000000000000")
                        value = data[i].Value;

                    else if (data[i].ValueString != null)
                        value = data[i].ValueString;

                    else if (data[i].ValueInt != null)
                        value = data[i].ValueInt;

                    html += "<option value='" + value;

                    if (selectorSelectedValue === value)
                        html += "' selected=\"selected\">" + data[i].Text + "</option>";
                    else
                        html += "'>" + data[i].Text + "</option>";
                }
                html += "</select>";

                $(contentHolder).html(html);
                $("#" + selectorName).select2();
                if (disabled) {
                    $("#" + selectorName).prop('disabled', disabled);
                }
                if (multiple == true) {
                    $("#" + selectorName).val(selectorSelectedValue);
                }
                $("#" + selectorName).trigger('change');
            }
        });
    },
    SelectorWithNestedOption: function (controllerName, methodName, data, contentHolder, selectorName, defaultText, multiple, callBackAfterChange, selectorSelectedValue, async, disabled, className) {

        if (!callBackAfterChange) {
            callBackAfterChange = "";
        };

        if (!selectorSelectedValue) {
            selectorSelectedValue = 0;
        };
        if (async == null) {
            async = true;
        };
        if (disabled == null) {
            disabled = false;
        };
        if (!className) {
            className = "";
        }

        $.ajax({
            type: "POST",
            url: "/" + controllerName + "/" + methodName,
            cache: false,
            data: data,
            async: async,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (response) {
                data = response.response;
                var mData;
                if (callBackAfterChange) {
                    callBackAfterChange = "onchange=\"" + callBackAfterChange + ";\"";
                }

                if (multiple == true) {
                    mData = "multiple=\"multiple\" style=\"overflow-y:auto\" class=\"select2 " + className + "\"";
                } else {
                    mData = "class=\"form-control " + className + "\"";
                }

                var html = "<select " + callBackAfterChange + " " + mData + "  id=\"" + selectorName + "\" name=\"" + selectorName + "\">";
                if (defaultText) {
                    html += "<option value=\"\" selected=\"selected\">" + defaultText + "</option>";
                }
                for (var i = 0; i < data.length; i++) {
                    var value = "";

                    if (data[i].Value != "00000000-0000-0000-0000-000000000000")
                        value = data[i].Value;

                    else if (data[i].ValueString != null)
                        value = data[i].ValueString;

                    else if (data[i].ValueInt != null)
                        value = data[i].ValueInt;

                    html += "<option value='" + value;

                    if (selectorSelectedValue === value)
                        html += "' selected=\"selected\">" + data[i].Text + "</option>";
                    else
                        html += "'>" + data[i].Text + "</option>";
                }
                html += "</select>";

                $(contentHolder).html(html);
                $("#" + selectorName).select2();
                if (disabled) {
                    $("#" + selectorName).prop('disabled', disabled);
                }
                if (multiple == true) {
                    $("#" + selectorName).val(selectorSelectedValue);
                }
                $("#" + selectorName).trigger('change');
            }
        });
    },
    SelectorValueText: function (method, data, contentHolder, selectorName, defaultText, multiple, callBackAfterChange, selectorSelectedValue) {
        method = "Method=" + method;

        if (!callBackAfterChange) {
            callBackAfterChange = "";
        };

        if (!selectorSelectedValue) {
            selectorSelectedValue = 0;
        };

        if (data && data != "") {
            data = method + "&" + data;
        } else {
            data = method;
        }

        $.ajax({
            type: "POST",
            url: "/Data/DataManager",
            cache: false,
            data: data,
            async: false,
            success: function (response) {
                data = JSON.parse(response).ResultObject;

                if (callBackAfterChange) {
                    callBackAfterChange = "onchange=\"" + callBackAfterChange + ";\"";
                }

                if (multiple == true) {
                    multiple = "multiple=\"multiple\" style=\"overflow-y:auto\" class=\"select2\"";
                } else {
                    multiple = "style=\"width: 100%; border: 1px solid #aaa; border-radius: 5px;\" class=\"select2 form-control\"";
                }

                var html = "<select " + callBackAfterChange + " " + multiple + "  id=\"" + selectorName + "\" name=\"" + selectorName + "\">";

                var html;
                if (defaultText) {
                    html += "<option value=\"0\" selected=\"selected\">" + defaultText + "</option>";
                }
                for (var i = 0; i < data.length; i++) {
                    var value = "";

                    if (data[i].Value != "00000000-0000-0000-0000-000000000000")
                        value = data[i].Value;

                    else if (data[i].ValueString != null)
                        value = data[i].ValueString;

                    else if (data[i].ValueInt != null)
                        value = data[i].ValueInt;

                    html += "<option value='" + value;

                    if (selectorSelectedValue.toString().toUpperCase() == data[i].Text.toString().toUpperCase())
                        html += "' selected=\"selected\">" + data[i].Text + "</option>"
                    else
                        html += "'>" + data[i].Text + "</option>"
                }
                html += "</select>";

                $(contentHolder).html(html);

                $("#" + selectorName).select2();
            }
        });
    },
    Upload: function (controller, url, callback, data, async) {
        if (async == null)
            async = false;

        $.ajax({
            type: 'POST',
            url: "/" + controller + "/" + url,
            data: data,
            async: async,
            processData: false,
            contentType: false,
            success: function (result) {

                if (callback) {
                    callback(result);
                }
            }
        });

    },
    DatatableGenericById: function (url, columns, select, selectFunction, dtbGridId) {
        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var table = $('#' + dtbGridId).DataTable({

            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            columns: columns
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    DatatableGisMap: function (url, columns, select, selectFunction) {

        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var table = $('#datatableTableForGis').DataTable({

            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            columns: columns
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    DatatableVatandasMapParseller: function (url, columns, select, selectFunction) {

        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var table = $('#datatableTableForGisParsel').DataTable({

            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            columns: columns
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    DatatableGisMapEb: function (url, columns, select, selectFunction) {

        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var table = $('#datatableTableForGisEb').DataTable({

            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            columns: columns
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    Datatable: function (url, columns, select, selectFunction) {

        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var table = $('.dataTable-util').DataTable({

            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            columns: columns
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    DatatableNotOrdering: function (url, columns, select, selectFunction) {

        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var table = $('.dataTable-util').DataTable({

            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            columns: columns,
            ordering: false
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    DatatableWithExportButtons: function (url, columns, select, selectFunction) {

        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var table = $('.dataTable-util').DataTable({
            responsive: true,
            "pageLength": 20,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            columns: columns
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    DatatableWithColumnSearch: function (url, columns, select, selectFunction) {

        if (select === null || select === undefined || select === "") {
            select = false;
        }

        $('#datatableTable tfoot th').each(function () {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
        });

        var table = $('.dataTable-util').DataTable({
            responsive: true,
            "pageLength": 20,
            destroy: true,
            orderCellsTop: false,
            fixedHeader: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            initComplete: function () {
                // Apply the search
                this.api().columns().every(function () {
                    var that = this;

                    $('input', this.footer()).on('keyup change clear', function () {
                        if (that.search() !== this.value) {
                            that
                                .search(this.value)
                                .draw();
                        }
                    });
                });
            },
            columns: columns
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }

        table.columns().eq(0).each(function (colIdx) {
            var cell = $('.filters th').eq($(table.column(colIdx).header()).index());
            console.log(cell);
            var title = $(cell).text();
            $(cell).html('<input type="text" placeholder="Search ' + title + '" />');

            $('input', $('.filters th').eq($(table.column(colIdx).header()).index())).off('keyup change').on('keyup change', function (e) {
                e.stopPropagation();
                $(this).attr('title', $(this).val());
                var regexr = '({search})'; //$(this).parents('th').find('select').val();
                table
                    .column(colIdx)
                    .search((this.value != "") ? regexr.replace('{search}', '(((' + this.value + ')))') : "", this.value != "", this.value == "")
                    .draw();

            });

            $('select', $('.filters th').eq($(table.column(colIdx).header()).index())).off('change').on('change', function () {
                $(this).parents('th').find('input').trigger('change');
            });
        });
    },
    DatatableWithFilter: function (url, columns/*, pagesize, pagination, filtering, sorting*/, select, selectFunction, initComplete, uniqNoValueText) {
        $.fn.dataTable.Api.register('column().title()', function () {
            return $(this.header()).text().trim();
        });
        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var noValText = "";
        if (!uniqNoValueText) {
            noValText = "Veri yoktur";
        } else {
            noValText = "'Arıtma Tesisi Alanı' niteliğinde parsel bulunmamaktadır. Parsel niteliğini 'Parsel Listesi' ekranından kontrol edebilirsiniz.";
        }

        var table = $('.dataTable-util').DataTable({
            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: 'POST',
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": noValText,
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                }
            },
            language: {
            },
            columns: columns,
            initComplete: function () {
                this.api().columns().every(function () {
                    var column = this;

                    switch (column.title()) {
                        case 'İl':
                            column.data().unique().sort().each(function (d, j) {
                                $('.kt-input[data-col-index="3"]').append('<option value="' + d + '">' + d + '</option>');
                            });
                            break;
                        case 'İlçe':
                            column.data().unique().sort().each(function (d, j) {
                                $('.kt-input[data-col-index="4"]').append('<option value="' + d + '">' + d + '</option>');
                            });
                            break;
                        case 'Başvuru Durumu':
                            var status = {
                                0: { title: 'Başvuru', 'class': 'kt-badge--brand' },
                                1: { title: 'Onay', 'class': 'kt-badge--brand' },
                                2: { title: 'Revize', 'class': ' kt-badge--danger' },
                                3: { title: 'Ret', 'class': ' kt-badge--primary' },
                                4: { title: 'Nitelik Bilgileri', 'class': ' kt-badge--success' },
                                5: { title: 'Bakanlık Alt Komisyon Görüşü', 'class': ' kt-badge--info' },
                                6: { title: 'Diğer Belgeler', 'class': ' kt-badge--danger' },
                                7: { title: 'Yer Seçim Komisyon Dökümanı', 'class': ' kt-badge--warning' },
                                8: { title: 'Kurum Görüşü', 'class': ' kt-badge--success' },
                                9: { title: 'Ara Talimat', 'class': ' kt-badge--info' },
                                10: { title: 'Ara Talimat OSB', 'class': ' kt-badge--danger' },
                                11: { title: 'Kesin Talimat Sayfası', 'class': ' kt-badge--warning' },
                                24: { title: 'Başvuru', 'class': 'kt-badge--brand' },
                                25: { title: 'Onay', 'class': 'kt-badge--brand' },
                                26: { title: 'Revize', 'class': ' kt-badge--danger' },
                                27: { title: 'Red', 'class': ' kt-badge--primary' }
                            };
                            column.data().unique().sort().each(function (d, j) {
                                $('.kt-input[data-col-index="7"]').append('<option value="' + status[d].title + '">' + status[d].title + '</option>');
                            });
                            break;
                    }
                });
            },
        });
        var filter = function () {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
        };

        var asdasd = function (value, index) {
            var val = $.fn.dataTable.util.escapeRegex(value);
            table.column(index).search(val ? val : '', false, true);
        };

        $('#kt_search').on('click', function (e) {
            e.preventDefault();
            var params = {};
            $('.kt-input').each(function () {
                var i = $(this).data('col-index');
                if (params[i]) {
                    params[i] += '|' + $(this).val();
                }
                else {
                    params[i] = $(this).val();
                }
            });
            $.each(params, function (i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#kt_reset').on('click', function (e) {
            e.preventDefault();
            $('.kt-input').each(function () {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });

        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    DatatableWithId: function (url, method, columns, select, selectFunction, id, heightValue) {
        if (heightValue == null)
            heightValue = 140;
        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var table = $('#' + id).DataTable({
            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                url: url,
                type: method
            },
            "scrollY": heightValue + "px",
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": "Veri yoktur",
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                },
            },
            language: {

            },
            columns: columns
        });
        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    },
    DatatableWithFilterPaging: function (url, columns, select, selectFunction, initComplete, uniqNoValueText) {
        $.fn.dataTable.Api.register('column().title()', function () {
            return $(this.header()).text().trim();
        });
        if (select === null || select === undefined || select === "") {
            select = false;
        }
        var noValText = "";
        if (!uniqNoValueText) {
            noValText = "Veri yoktur";
        } else {
            noValText = "'Arıtma Tesisi Alanı' niteliğinde parsel bulunmamaktadır. Parsel niteliğini 'Parsel Listesi' ekranından kontrol edebilirsiniz.";
        }

        var table = $('.dataTable-util').DataTable({
            processing: true,
            serverSide: true,
            responsive: true,
            destroy: true,
            select: select,
            autoWidth: false,
            ajax: {
                type: 'POST',
                url: url,
                data: {
                    pagination: {
                        perpage: 50,
                    },
                },
            },
            //todo dile göre ingilizce yada türkçe olacak
            oLanguage: {
                "sInfo": "Toplam  _TOTAL_  değerin (_START_ - _END_) görüntüleniyor.",
                "sEmptyTable": noValText,
                "sLengthMenu": " _MENU_ Gösterilecek Değer Sayısı",
                "sLoadingRecords": "Yükleniyor - Lütfen Bekleyin...",
                "sInfoEmpty": "0 Kayıt Gösteriliyor",
                "sZeroRecords": "Kayıt Bulunamadı",
                "sInfoFiltered": "(Toplam _MAX_ kayıttan filtrelendi)",
                "sSearch": "Ara",
                oPaginate: {
                    "sPrevious": 'Geri',
                    "sNext": "İleri"
                }
            },
            language: {
            },
            columns: columns,
            initComplete: function () {
                this.api().columns().every(function () {
                    var column = this;

                    switch (column.title()) {
                        case 'İl':
                            column.data().unique().sort().each(function (d, j) {
                                $('.kt-input[data-col-index="3"]').append('<option value="' + d + '">' + d + '</option>');
                            });
                            break;
                        case 'İlçe':
                            column.data().unique().sort().each(function (d, j) {
                                $('.kt-input[data-col-index="4"]').append('<option value="' + d + '">' + d + '</option>');
                            });
                            break;
                        case 'Başvuru Durumu':
                            var status = {
                                0: { title: 'Başvuru', 'class': 'kt-badge--brand' },
                                1: { title: 'Onay', 'class': 'kt-badge--brand' },
                                2: { title: 'Revize', 'class': ' kt-badge--danger' },
                                3: { title: 'Ret', 'class': ' kt-badge--primary' },
                                4: { title: 'Nitelik Bilgileri', 'class': ' kt-badge--success' },
                                5: { title: 'Bakanlık Alt Komisyon Görüşü', 'class': ' kt-badge--info' },
                                6: { title: 'Diğer Belgeler', 'class': ' kt-badge--danger' },
                                7: { title: 'Yer Seçim Komisyon Dökümanı', 'class': ' kt-badge--warning' },
                                8: { title: 'Kurum Görüşü', 'class': ' kt-badge--success' },
                                9: { title: 'Ara Talimat', 'class': ' kt-badge--info' },
                                10: { title: 'Ara Talimat OSB', 'class': ' kt-badge--danger' },
                                11: { title: 'Kesin Talimat Sayfası', 'class': ' kt-badge--warning' },
                                24: { title: 'Başvuru', 'class': 'kt-badge--brand' },
                                25: { title: 'Onay', 'class': 'kt-badge--brand' },
                                26: { title: 'Revize', 'class': ' kt-badge--danger' },
                                27: { title: 'Red', 'class': ' kt-badge--primary' }
                            };
                            column.data().unique().sort().each(function (d, j) {
                                $('.kt-input[data-col-index="7"]').append('<option value="' + status[d].title + '">' + status[d].title + '</option>');
                            });
                            break;
                    }
                });
            },
        });

        $('#kt_search').on('click', function (e) {
            e.preventDefault();
            var params = {};
            $('.kt-input').each(function () {
                var i = $(this).data('col-index');
                if (params[i]) {
                    params[i] += '|' + $(this).val();
                }
                else {
                    params[i] = $(this).val();
                }
            });
            $.each(params, function (i, val) {
                // apply search params to datatable
                table.column(i).search(val ? val : '', false, false);
            });
            table.table().draw();
        });

        $('#kt_reset').on('click', function (e) {
            e.preventDefault();
            $('.kt-input').each(function () {
                $(this).val('');
                table.column($(this).data('col-index')).search('', false, false);
            });
            table.table().draw();
        });

        if (select === true) {

            table.on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                selectFunction(true, rowData[0].BasvuruDurum);
            })
                .on('deselect', function (e, dt, type, indexes) {
                    selectFunction(false);
                });
            table.select.info(false);
        }
    }

};
Util.URL = {
    Open: function (url) {
        window.open(url, "_blank");
    },
    Redirect: function (url) {
        window.location.assign(url);
    },
    QueryString: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};
Util.Menu = {
    Navigate: function (PageControllerName, PageViewName, data, contentHolder) {
        Util.Ajax.Navigate("/" + PageControllerName + "/" + PageViewName, "POST", data, contentHolder);
    }
};
Util.Modal = {
    OpenModal: function (Url, Size, Percent) {
        $("#responsive-modal").modal({
            keyboard: false,
            show: true,
            backdrop: 'static'
        });
        $("#botasModalContent").css("display", "none");
        $("#botasModalContent").empty();
        $("#botasLargeModalContent").css("display", "none");
        $("#botasLargeModalContent").empty();
        $("#botasSmallModalContent").css("display", "none");
        $("#botasSmallModalContent").empty();
        $("#botasXLargeModalContent").css("display", "none");
        $("#botasXLargeModalContent").empty();
        var contentId;
        $.get(Url, function (data) {
            if (Size === "" || Size === null || Size === SizeForModal.MEDIUM) contentId = "#botasModalContent";
            else if (Size === SizeForModal.LARGE) contentId = "#botasLargeModalContent";
            else if (Size === SizeForModal.SMALL) contentId = "#botasSmallModalContent";
            else if (Size === SizeForModal.XLARGE) contentId = "#botasXLargeModalContent";

            $(contentId).html(data);
            $(contentId).css("display", "block");
        })

        // $.ajax({
        // type: "GET",
        // url: Url,
        // dataType: "json",
        // success: function(data) {
        // if (Size === "" || Size === null || Size === SizeForModal.MEDIUM) contentId = "#botasModalContent";
        // else if (Size === SizeForModal.LARGE) contentId = "#botasLargeModalContent";
        // else if (Size === SizeForModal.SMALL) contentId = "#botasSmallModalContent";
        // else if (Size === SizeForModal.XLARGE) contentId = "#botasXLargeModalContent";

        // $(contentId).html(data);
        // $(contentId).css("display", "block");
        // },
        // error: function(xhr, status, error){
        // window.location.assign("Login/Login");
        // return;
        // }
        // });
    }
}
Util.Elements = {
    Dropzone: function (contentHolder, maxFiles, maxFilesize, addRemoveLinks, acceptedFiles, acceptCallback) {
        if (!addRemoveLinks) {
            addRemoveLinks = true;
        }
        if (!maxFiles) {
            maxFiles = 1;
        }
        if (!maxFilesize) {
            maxFilesize = 50;
        }
        var acceptFlag = false;

        $('#' + contentHolder).dropzone({
            url: "https://keenthemes.com/scripts/void.php",
            paramName: "file",
            maxFiles: maxFiles,
            uploadMultiple: false,
            maxFilesize: maxFilesize,
            addRemoveLinks: addRemoveLinks,
            acceptedFiles: acceptedFiles,
            init: function () {
                $('.dz-progress').css('display', 'none');
                this.on("addedfile", function () {
                    if (this.files[1] != null) {
                        this.removeFile(this.files[0]);
                    }
                });
                this.on("complete", function () {
                    var rejected_files = this.getRejectedFiles();
                    var myDropzone = this;
                    rejected_files.forEach(function (element) {
                        myDropzone.removeFile(element);
                        if (bytesToSize(element.size) > maxFilesize)
                            Util.Notification.Toastr("error", "Dosya boyutu sınırı aşıldı!", "Hata");
                        else
                            Util.Notification.Toastr("error", "Sadece aşağıda belirtilen uzantılı dosyalar yüklenebilir.", "Hata");
                    });
                });
            },
            accept: function (file, done) {
                if (acceptCallback) {
                    acceptCallback(file);
                }
            },
        });
    },
    DropzoneFromName: function (contentHolder, maxFiles, maxFilesize, addRemoveLinks, acceptedFiles, acceptCallback) {
        if (!addRemoveLinks) {
            addRemoveLinks = true;
        }
        if (!maxFiles) {
            maxFiles = 1;
        }
        if (!maxFilesize) {
            maxFilesize = 50;
        }
        var acceptFlag = false;

        $('[name="' + contentHolder + '"]').dropzone({
            url: "https://keenthemes.com/scripts/void.php",
            paramName: "file",
            maxFiles: maxFiles,
            uploadMultiple: false,
            maxFilesize: maxFilesize,
            addRemoveLinks: addRemoveLinks,
            acceptedFiles: acceptedFiles,
            init: function () {
                $('.dz-progress').css('display', 'none');
                this.on("addedfile", function () {
                    if (this.files[1] != null) {
                        this.removeFile(this.files[0]);
                    }
                });
                this.on("complete", function () {
                    var rejected_files = this.getRejectedFiles();
                    var myDropzone = this;
                    rejected_files.forEach(function (element) {
                        myDropzone.removeFile(element);
                        myDropzone.removeFile(element);
                        if (bytesToSize(element.size) > maxFilesize)
                            Util.Notification.Toastr("error", "Dosya boyutu sınırı aşıldı!", "Hata");
                        else
                            Util.Notification.Toastr("error", "Sadece aşağıda belirtilen uzantılı dosyalar yüklenebilir.", "Hata");
                    });
                });
            },
            accept: function (file, done) {
                if (acceptCallback) {
                    acceptCallback(file);
                }
            },
        });
    },
    DropzoneFile: function (contentHolder, maxFiles, maxFilesize, addRemoveLinks, acceptedFiles, acceptCallback) {
        if (addRemoveLinks) {
            addRemoveLinks = true;
        }
        if (!maxFiles) {
            maxFiles = 1;
        }
        if (!maxFilesize) {
            maxFilesize = 50;
        }

        var id = '#' + contentHolder;


        $('#' + contentHolder).dropzone({
            url: "",
            paramName: "file",
            maxFiles: maxFiles,
            uploadMultiple: false,
            maxFilesize: maxFilesize,
            addRemoveLinks: addRemoveLinks,
            acceptedFiles: acceptedFiles,
            init: function () {
                $('.dz-progress').css('display', 'none');
                this.on("addedfile", function () {
                    var rejected_files = this.getRejectedFiles();
                    var myDropzone = this;
                    rejected_files.forEach(function (element) {
                        myDropzone.removeFile(element);
                        myDropzone.removeFile(element);
                        if (bytesToSize(element.size) > maxFilesize)
                            Util.Notification.Toastr("error", "Dosya boyutu sınırı aşıldı!", "Hata");
                        else
                            Util.Notification.Toastr("error", "Sadece aşağıda belirtilen uzantılı dosyalar yüklenebilir.", "Hata");
                    });
                });
            },
            accept: function (file, done) {
                if (acceptCallback) {
                    acceptCallback(file);
                }
            }
        });
    },
    MultiDropzone: function (contentHolder, maxFiles, maxFilesize, addRemoveLinks, acceptedFiles, acceptCallback) {
        if (!addRemoveLinks) {
            addRemoveLinks = true;
        }
        if (!maxFiles) {
            maxFiles = 1;
        }
        if (!maxFilesize) {
            maxFilesize = 50;
        }

        $('#' + contentHolder).dropzone({
            url: "https://keenthemes.com/scripts/void.php",
            paramName: "file",
            maxFiles: maxFiles,
            uploadMultiple: true,
            maxFilesize: maxFilesize,
            addRemoveLinks: addRemoveLinks,
            acceptedFiles: acceptedFiles,
            init: function () {
                $('.dz-progress').css('display', 'none');
                this.on("complete", function () {
                    var rejected_files = this.getRejectedFiles();
                    var myDropzone = this;
                    rejected_files.forEach(function (element) {
                        myDropzone.removeFile(element);
                        myDropzone.removeFile(element);
                        if (bytesToSize(element.size) > maxFilesize)
                            Util.Notification.Toastr("error", "Dosya boyutu sınırı aşıldı!", "Hata");
                        else
                            Util.Notification.Toastr("error", "Sadece aşağıda belirtilen uzantılı dosyalar yüklenebilir.", "Hata");
                    });
                });
            },
            accept: function (file, done) {
                if (acceptCallback) {
                    acceptCallback(file);
                }
            }
        });
    },
    InitDropzone: function () {
        $('.dropzone').each(function () {
            var multi = this.getAttribute("data-multi");
            var extension = this.getAttribute("data-extension");
            if (multi === "true") {
                Util.Elements.MultiDropzone(this.id, 10, null, true, extension);
            } else {
                Util.Elements.Dropzone(this.id, 1, null, true, extension);
            }
        });
    },
    /**
    * Toggle button spinner methods
    * @public
    * @param {element} btn button query element 
    */
    toggleBtnSpinner: function (btn) {
        if (btn.hasClass("kt-spinner"))
            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
        else
            btn.addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
    }
}
Util.Variable = {
    IsNotNull: function (variable) {
        if (variable === undefined || variable === null || variable === "") {
            return false;
        } else {
            return true;
        }
    },
    IsGuidEmpty: function (variable) {
        return variable == '00000000-0000-0000-0000-000000000000';
    }
}